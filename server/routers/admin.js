const Router = require('koa-router');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const Article = require('../models/Articles');
const Recent = require('../models/Recent');
const addToken = require('../tokens/addToken');
const verifyToken = require('../tokens/verifyToken');
const multer = require('@koa/multer');
let adminRouter = new Router();

// 添加管理员账号用（一次性
// adminRouter.post('/add', async ctx => {
//     const admin = new Admin(ctx.request.body);
//         await admin.save();
//         ctx.response.body = {
//             msg: 1
//     }
// });

adminRouter.get('/', verifyToken, async ctx => {
    let articleList = await Article.find();
    articleList = articleList.sort((a, b) => {
        let aTimeString = a.updatedAt;
        let bTimeString = b.updatedAt;
        aTimeString = aTimeString.replace(/-/g, '/');
        bTimeString = bTimeString.replace(/-/g, '/');
        let aTime = new Date(aTimeString).getTime();
        let bTime = new Date(bTimeString).getTime();
        return bTime - aTime;
    });
    ctx.response.body = {
        articleList
    };
});
adminRouter.post('/draft', verifyToken, async ctx => {
    let article = new Article();
    await article.save();
    ctx.response.body = {
        code: 1
    };
});
// adminRouter.put('/draft', verifyToken, async ctx => {
//     const update = ctx.request.body.article;
//     const article = await Article.findById(update._id);
//     article.title = update.title;
//     article.type = update.type;
//     article.tag = update.tag;
//     article.content = update.content;
//     await article.save();
//     ctx.response.body = {
//         code: 1
//     };
// });
adminRouter.put('/publish', verifyToken, async ctx => {
    let article = await Article.findById(ctx.request.body.id);
    article.published = !article.published;
    await article.save();
    ctx.response.body = {
        code: 1
    };
});
adminRouter.post('/recent', verifyToken, async ctx => {
    let list = await Recent.find();
    if (list.length > 0) {
        let first = list[0];
        first.content = ctx.request.body.content;
        await first.save();
    } else {
        const recent = new Recent(ctx.request.body);
        await recent.save();
    }
    ctx.response.body = {
        code: 1,
        msg: `recent updated`
    };
});

var storage = multer.diskStorage({
    // 文件保存路径
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    // 修改文件名称
    filename: function(req, file, cb) {
        var fileFormat = file.originalname.split('.'); // 以点分割成数组，数组的最后一项就是后缀名
        cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1]);
    }
});
// 加载配置
var upload = multer({ storage });
adminRouter.post('/upload', upload.single('file'), verifyToken, async ctx => {
    ctx.body = {
        filename: `http://localhost:3000/${ctx.request.file.filename}`
        // filename: `http://106.53.89.236:3000/${ctx.request.file.filename}`
    };
});

/* blog_next api */
/* 获取管理页文章 */
adminRouter.post(`/getArticles`, verifyToken, async ctx => {
    const { pageIndex, pageSize } = ctx.request.body;
    if (!pageIndex && !pageSize) {
        return (ctx.response.body = {
            status: -1,
            message: `参数错误`
        });
    }
    const totalCount = await Article.countDocuments();
    let resultList = await Article.find()
        .select(['_id', 'updatedAt', 'title', 'type', 'tag', 'published'])
        .sort({ updatedAt: -1 })
        .limit(pageSize)
        .skip((pageIndex - 1) * pageSize);
    ctx.response.body = {
        totalCount,
        status: 0,
        message: `查询成功`,
        resultList
    };
});
/* 删除文章 */
adminRouter.post('/deleteArticle', verifyToken, async ctx => {
    const { id } = ctx.request.body;
    if (!id) {
        return (ctx.response.body = {
            status: -1,
            message: `参数错误`
        });
    }
    try {
        await Article.findByIdAndDelete(id);
        ctx.response.body = {
            status: 0,
            message: `删除成功`
        };
    } catch {
        return (ctx.response.body = {
            status: -1,
            message: `删除失败`
        });
    }
});
/* 更改文章状态 */
adminRouter.post('/changeArticleStatus', verifyToken, async ctx => {
    const { id } = ctx.request.body;
    if (!id) {
        return (ctx.response.body = {
            status: -1,
            message: `参数错误`
        });
    }
    try {
        let article = await Article.findById(ctx.request.body.id);
        article.published = !article.published;
        await article.save();
        ctx.response.body = {
            status: 0,
            message: `${article.published === true ? '发布' : '撤下'}文章成功`
        };
    } catch {
        ctx.response.body = {
            status: -1,
            message: `删除失败`
        };
    }
});
/* 条件搜索文章 */
adminRouter.post(`/searchArticles`, async ctx => {
    let { type, tag, published, pageIndex, pageSize } = ctx.request.body;
    let query = {};
    if (!pageIndex && !pageSize) {
        return (ctx.response.body = {
            status: -1,
            message: '参数错误'
        });
    }
    if (!type && !tag && published) {
        query = { published };
    } else if (!type && published === '' && tag) {
        query = { tag };
    } else if (published === '' && !tag && type) {
        query = { type };
    } else if (!type && tag && published !== '') {
        query = { tag, published };
    } else if (!tag && type && published !== '') {
        query = { type, published };
    } else if (published === '' && tag && type) {
        query = { type, tag };
    } else {
        query = { type, tag, published };
    }
    const totalCount = await Article.countDocuments(query);
    const resultList = await Article.find(query)
        .select(['_id', 'updatedAt', 'title', 'type', 'tag', 'published'])
        .sort({ updatedAt: -1 })
        .limit(pageSize)
        .skip((pageIndex - 1) * pageSize);
    ctx.response.body = {
        totalCount,
        resultList,
        status: 0,
        message: '查询成功'
    };
});

/* 新建文章 */
adminRouter.post('/newArticle', verifyToken, async ctx => {
    try {
        let article = new Article();
        await article.save();
        ctx.response.body = {
            status: 0,
            message: `新建成功`
            // id: article._id
        };
    } catch {
        ctx.response.body = {
            status: -1,
            message: `新建失败`
        };
    }
});
/* 管理员登陆 */
adminRouter.post('/login', async ctx => {
    const account = ctx.request.body.account,
        password = ctx.request.body.password;
    try {
        const admin = await Admin.findOne({ name: account }),
            isMatch = await bcrypt.compare(password, admin.password);
        if (!admin || !isMatch) {
            throw new Error();
        }
        const adminToken = addToken(admin.name);
        ctx.response.body = {
            adminToken,
            status: 0
        };
    } catch {
        ctx.response.body = {
            status: -1,
            message: `账号或密码错误`
        };
    }
});
/* 打开文章草稿 */
adminRouter.get(`/draft`, verifyToken, async ctx => {
    const articleId = ctx.request.query.id;
    try {
        const article = await Article.findById(articleId);
        ctx.response.body = {
            status: 0,
            message: `查询成功`,
            article
        };
    } catch {
        ctx.response.body = {
            status: -1,
            message: `该文章不存在`
        };
    }
});
/* 保存文章 */
adminRouter.put(`/draft`, verifyToken, async ctx => {
    const { article } = ctx.request.body;
    console.log(article);
    try {
        ctx.response.body = {
            status: 0,
            message: `保存成功`
        };
    } catch {
        ctx.response.body = {
            status: -1,
            message: `保存失败`
        };
    }
});

module.exports = adminRouter;

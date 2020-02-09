const Router = require('koa-router');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const Article = require('../models/Articles');
const Comment = require('../models/Comment');
const addToken = require('../tokens/addToken');
const verifyToken = require('../tokens/verifyToken');
const multer = require('@koa/multer');
const dateFormat = require('../utils/dateFormat');
let adminRouter = new Router();

/* 添加管理员账号 */
adminRouter.post('/add', async ctx => {
    const { name, password } = ctx.request.body;
    const admin = new Admin({ name, password });
    await admin.save();
    ctx.response.body = {
        message: `创建成功`,
        status: 0
    };
});

/* 管理员登陆 */
adminRouter.post('/login', async ctx => {
    const { account: name, password } = ctx.request.body;
    try {
        const admin = await Admin.findOne({ name });
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) throw new Error();
        const adminToken = addToken(admin.name);
        ctx.response.body = {
            adminToken,
            name,
            status: 0,
            message: `登陆成功`
        };
    } catch {
        ctx.response.body = {
            status: -1,
            message: `账号或密码错误`
        };
    }
});

/* 修改密码 */
adminRouter.put(`/password`, verifyToken, async ctx => {
    const { name, newPassword, oldPassword } = ctx.request.body;
    try {
        const admin = await Admin.findOne({ name });
        const isMatch = await bcrypt.compare(oldPassword, admin.password);
        if (!isMatch) {
            throw new Error();
        }
        admin.password = newPassword;
        await admin.save();
        ctx.response.body = {
            status: 0,
            message: `修改成功`
        };
    } catch {
        ctx.response.body = {
            status: -1,
            message: `修改失败`
        };
    }
});

/* 上传图片 */
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
        };
    } catch {
        ctx.response.body = {
            status: -1,
            message: `新建失败`
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
    const { article: articleDetails } = ctx.request.body;
    try {
        const article = await Article.findById(articleDetails._id);
        article.title = articleDetails.title;
        article.tag = articleDetails.tag;
        article.type = articleDetails.type;
        article.content = articleDetails.content;
        await article.save();
        ctx.response.body = {
            status: 0,
            message: `保存成功于 ${dateFormat(
                new Date().getTime(),
                'yyyy-MM-dd hh:mm:ss'
            )}`
        };
    } catch {
        ctx.response.body = {
            status: -1,
            message: `保存失败`
        };
    }
});

/* 隐藏/展示评论 */
adminRouter.put(`/comment`, verifyToken, async ctx => {
    const { commentId } = ctx.request.body;
    try {
        let comment = await Comment.findById(commentId);
        comment.published = !comment.published;
        await comment.save();
        ctx.response.body = {
            status: 0,
            message: `隐藏/显示评论成功`
        };
    } catch {
        ctx.response.body = {
            status: -1,
            message: `没有该评论`
        };
    }
});

/* 删除评论 */
adminRouter.delete(`/comment`, verifyToken, async ctx => {
    const { commentId } = ctx.request.query.id;
    try {
        await Comment.findByIdAndDelete(commentId);
        ctx.response.body = {
            status: 0,
            message: `删除成功`
        };
    } catch {
        ctx.response.body = {
            status: -1,
            message: `删除失败`
        };
    }
});

module.exports = adminRouter;

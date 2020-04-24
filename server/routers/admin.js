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

const eventTrack = require('../middlewares/EventTracking');
const Event = require('../models/EventTrack');

const Status = require('../models/Status');

/* 添加管理员账号 */
adminRouter.post('/add', eventTrack(1000), async (ctx) => {
    const { name, password } = ctx.request.body;
    const admin = new Admin({ name, password });
    await admin.save();
    ctx.response.body = {
        message: `创建成功`,
        status: 0,
    };
});

/* 管理员登陆 */
adminRouter.post('/login', eventTrack(1001), async (ctx) => {
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
            message: `登陆成功`,
        };
    } catch {
        ctx.response.body = {
            status: -1,
            message: `账号或密码错误`,
        };
    }
});

/* 修改密码 */
adminRouter.put(`/password`, verifyToken, eventTrack(1002), async (ctx) => {
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
            message: `修改成功`,
        };
    } catch {
        ctx.response.body = {
            status: -1,
            message: `修改失败`,
        };
    }
});

/* 上传图片 */
var storage = multer.diskStorage({
    // 文件保存路径
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    // 修改文件名称
    filename: function (req, file, cb) {
        var fileFormat = file.originalname.split('.'); // 以点分割成数组，数组的最后一项就是后缀名
        cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1]);
    },
});
// 加载配置
var upload = multer({ storage });
adminRouter.post(
    '/upload',
    eventTrack(2010),
    upload.single('file'),
    verifyToken,
    async (ctx) => {
        ctx.body = {
            status: 0,
            message: `上传成功`,
            data: {
                fileName: `http://localhost:3000/${ctx.request.file.filename}`,
                // filename: `http://106.53.89.236:3000/${ctx.request.file.filename}`
            },
        };
    }
);

/* blog_next api */
/* 整合查询和搜索的接口 */
adminRouter.post(`/articles`, verifyToken, eventTrack(2001), async (ctx) => {
    const { pageSize, pageIndex, type, tag, published } = ctx.request.body,
        conditions = { type, tag, published },
        query = {};
    /* 断路运算符 */
    // 如果 && 左边不为falsy，走右边的，否则走左边的
    // 如果 || 左边不为falsy，走左边的，否则走右边的
    // 获取conditions里面的所有key值组成的数组
    Reflect.ownKeys(conditions).map((item) => {
        conditions[item] && (query[item] = conditions[item]);
    });
    const totalCount = await Article.countDocuments(query),
        resultList = await Article.find(query)
            .select(['_id', 'updatedAt', 'title', 'type', 'tag', 'published'])
            .sort({ updatedAt: -1 })
            .limit(pageSize)
            .skip((pageIndex - 1) * pageSize);
    ctx.response.body = {
        totalCount,
        resultList,
        status: 0,
        message: `查询成功`,
    };
});

/* 删除文章 */
adminRouter.delete('/article', verifyToken, eventTrack(2002), async (ctx) => {
    const { id } = ctx.request.query;
    if (!id) {
        return (ctx.response.body = {
            status: -1,
            message: `参数错误`,
        });
    }
    try {
        await Article.findByIdAndDelete(id);
        ctx.response.body = {
            status: 0,
            message: `删除成功`,
        };
    } catch {
        return (ctx.response.body = {
            status: -1,
            message: `删除失败`,
        });
    }
});

/* 更改文章状态 */
adminRouter.put('/article', verifyToken, eventTrack(2003), async (ctx) => {
    const { id } = ctx.request.body;
    if (!id) {
        return (ctx.response.body = {
            status: -1,
            message: `参数错误`,
        });
    }
    try {
        let article = await Article.findById(ctx.request.body.id);
        article.published = !article.published;
        await article.save();
        ctx.response.body = {
            status: 0,
            message: `${article.published === true ? '发布' : '撤下'}文章成功`,
        };
    } catch {
        ctx.response.body = {
            status: -1,
            message: `删除失败`,
        };
    }
});

/* 新建文章 */
adminRouter.post('/draft', verifyToken, eventTrack(2004), async (ctx) => {
    try {
        let article = new Article();
        await article.save();
        ctx.response.body = {
            id: article._id,
            status: 0,
            message: `新建成功`,
        };
    } catch {
        ctx.response.body = {
            status: -1,
            message: `新建失败`,
        };
    }
});

/* 打开文章草稿 */
adminRouter.get(`/draft`, verifyToken, eventTrack(2005), async (ctx) => {
    const articleId = ctx.request.query.id;
    try {
        const article = await Article.findById(articleId);
        ctx.response.body = {
            status: 0,
            message: `查询成功`,
            article,
        };
    } catch {
        ctx.response.body = {
            status: -1,
            message: `该文章不存在`,
        };
    }
});
/* 保存文章 */
adminRouter.put(`/draft`, verifyToken, eventTrack(2006), async (ctx) => {
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
                new Date(),
                'yyyy-MM-dd hh:mm:ss'
            )}`,
        };
    } catch (e) {
        ctx.response.body = {
            status: -1,
            message: `保存失败`,
            e,
        };
    }
});

/* 隐藏/展示评论 */
adminRouter.put(`/comment`, verifyToken, eventTrack(3003), async (ctx) => {
    const { commentId } = ctx.request.body;
    try {
        let comment = await Comment.findById(commentId);
        comment.published = !comment.published;
        await comment.save();
        ctx.response.body = {
            status: 0,
            message: `隐藏/显示评论成功`,
        };
    } catch {
        ctx.response.body = {
            status: -1,
            message: `没有该评论`,
        };
    }
});

/* 删除评论 */
adminRouter.delete(`/comment`, verifyToken, eventTrack(3002), async (ctx) => {
    const { commentId } = ctx.request.query;
    try {
        await Comment.findByIdAndDelete(commentId);
        ctx.response.body = {
            status: 0,
            message: `删除成功`,
        };
    } catch {
        ctx.response.body = {
            status: -1,
            message: `删除失败`,
        };
    }
});

/* 获取评论 */
adminRouter.get(`/comment`, verifyToken, eventTrack(3001), async (ctx) => {
    const { articleId, pageIndex } = ctx.request.query,
        pageSize = 10;
    try {
        const totalCount = await Comment.countDocuments({ articleId });
        const resultList = await Comment.find({ articleId })
            .select([
                `user`,
                `createdAt`,
                `content`,
                `published`,
                `_id`,
                `articleId`,
            ])
            .limit(pageSize)
            .skip((pageIndex - 1) * pageSize)
            .sort({ updatedAt: -1 });
        ctx.response.body = {
            status: 0,
            message: `查询成功`,
            totalCount,
            resultList,
        };
    } catch {
        ctx.response.body = {
            message: `查询失败`,
            status: -1,
        };
    }
});

adminRouter.post(`/eventTrack`, verifyToken, eventTrack(9999), async (ctx) => {
    const { pageIndex } = ctx.request.body;
    try {
        const totalCount = await Event.countDocuments(),
            resultList = await Event.find()
                .select(['eventCode', 'createdAt'])
                .sort({ createdAt: -1 })
                .limit(10)
                .skip((pageIndex - 1) * 10);
        ctx.response.body = {
            totalCount,
            resultList,
            status: 0,
            message: `查询成功`,
        };
    } catch {
        ctx.response.body = {
            message: `查询失败`,
            status: -1,
        };
    }
});

/* 获取最近动态 */
adminRouter.get('/status', verifyToken, eventTrack(4001), async (ctx) => {
    const { pageIndex = 1 } = ctx.request.query;
    try {
        const totalCount = await Status.countDocuments();
        const resultList = await Status.find()
            .sort({ updatedAt: -1 })
            .limit(10)
            .skip((pageIndex - 1) * 10);
        ctx.response.body = {
            totalCount,
            resultList,
            status: 0,
            message: `查询成功`,
        };
    } catch {
        ctx.response.body = {
            message: `查询失败`,
            status: -1,
        };
    }
});

/* 新建最近动态 */
adminRouter.post('/status', verifyToken, eventTrack(4002), async (ctx) => {
    const { content } = ctx.request.body,
        status = new Status({ content });
    try {
        await status.save();
        ctx.response.body = {
            message: `新建成功`,
            status: 0,
        };
    } catch {
        ctx.response.body = {
            message: `新建失败`,
            status: -1,
        };
    }
});

/* 删除最近动态 */
adminRouter.delete('/status', verifyToken, eventTrack(4003), async (ctx) => {
    const { id } = ctx.request.query;
    try {
        await Status.findByIdAndDelete(id);
        ctx.response.body = {
            status: 0,
            message: `删除成功`,
        };
    } catch {
        ctx.response.body = {
            status: -1,
            message: `删除失败`,
        };
    }
});

module.exports = adminRouter;

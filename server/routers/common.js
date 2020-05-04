const Router = require('koa-router');
const Article = require('../models/Articles');
const Comment = require(`../models/Comment`);
const Status = require('../models/Status');
let commonRouter = new Router();

/** blog_next api */
/* 整合查询和搜索的接口 */
commonRouter.post(`/article`, async (ctx) => {
    const published = true,
        { pageIndex, type, tag, keyword } = ctx.request.body,
        conditions = { type, tag, published },
        query = {};
    /* 断路运算符 */
    // 如果 && 左边不为falsy，走右边的，否则走左边的
    // 如果 || 左边不为falsy，走左边的，否则走右边的
    // 获取conditions里面的所有key值组成的数组
    Reflect.ownKeys(conditions).map((item) => {
        conditions[item] && (query[item] = conditions[item]);
    });
    if (keyword) {
        const reg = new RegExp(keyword, 'i');
        Object.assign(query, {
            $or: [{ title: { $regex: reg } }, { content: { $regex: reg } }],
        });
    }
    const totalCount = await Article.countDocuments(query),
        resultList = await Article.find(query)
            .select(['_id', 'updatedAt', 'title', 'type', 'tag'])
            .sort({ updatedAt: -1 })
            .limit(10)
            .skip((pageIndex - 1) * 10);
    ctx.response.body = {
        totalCount,
        resultList,
        status: 0,
        message: `查询成功`,
    };
});

// 获取文章详情
commonRouter.post(`/getArticleDetails`, async (ctx) => {
    const { id } = ctx.request.body;
    if (!id) {
        return (ctx.response.body = {
            status: -1,
            message: `参数错误`,
        });
    }
    try {
        const article = await Article.findById(id);
        ctx.response.body = {
            status: 0,
            message: `查询成功`,
            article,
        };
    } catch {
        ctx.response.body = {
            status: -1,
            message: `查无此文章`,
        };
    }
});

/* 获取文章可见评论 */
commonRouter.get('/comment', async (ctx) => {
    const articleId = ctx.request.query.id;
    const pageSize = 5;
    const query = {
        published: true,
        articleId,
    };
    try {
        const totalCount = await Comment.countDocuments(query);
        const resultList = await Comment.find(query)
            .select(['user', 'updatedAt', 'content'])
            .sort({ updatedAt: -1 })
            .limit(pageSize)
            .skip((pageSize - 1) * pageSize);
        ctx.response.body = {
            totalCount,
            status: 0,
            message: `查询评论成功`,
            resultList,
        };
    } catch {
        ctx.response.body = {
            status: -1,
            message: `查询评论失败`,
        };
    }
});

/* 发布评论 */
commonRouter.post(`/comment`, async (ctx) => {
    const { user, content, articleId } = ctx.request.body;
    try {
        await Article.findById(articleId);
        await Comment.create({
            user,
            content,
            articleId,
        });
        ctx.response.body = {
            status: 0,
            message: `发送评论成功`,
        };
    } catch {
        ctx.response.body = {
            status: -1,
            message: `发送评论失败`,
        };
    }
});

commonRouter.get('/status', async (ctx) => {
    try {
        const resultList = await Status.find()
            .sort({ updatedAt: -1 })
            .limit(4);
        ctx.response.body = {
            resultList,
            status: 0,
            message: `查询成功`,
        };
    } catch(e) {
        console.log(e);
        ctx.response.body = {
            message: `查询失败`,
            status: -1,
            error: e
        };
    }
});

module.exports = commonRouter;

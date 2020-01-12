const Router = require('koa-router');
const Article = require('../models/Articles');
const Recent = require('../models/Recent');
let commonRouter = new Router();
commonRouter.get('/recent', async ctx => {
    let recent = await Recent.find();
    ctx.response.body = {
        recent
    };
});
commonRouter.post('/articles', async ctx => {
    const currentPage = ctx.request.body.currentPage;
    const articleCount = await Article.countDocuments({ published: true });
    let start = (currentPage - 1) * 10;
    let end = currentPage * 10;
    let articles = await Article.find({ published: true });
    articles = articles.sort((a, b) => {
        let aTimeString = a.updatedAt;
        let bTimeString = b.updatedAt;
        aTimeString = aTimeString.replace(/-/g, '/');
        bTimeString = bTimeString.replace(/-/g, '/');
        let aTime = new Date(aTimeString).getTime();
        let bTime = new Date(bTimeString).getTime();
        return bTime - aTime;
    });
    slicedArticles = articles.slice(start, end);
    const pageCount = Math.ceil(articleCount / 10);
    ctx.response.body = {
        pageCount,
        articles: slicedArticles
    };
});
/** blog_next api */
// 获取文章列表
commonRouter.post(`/getCommonArticles`, async ctx => {
    if (ctx.request.body.pageSize && ctx.request.body.pageIndex) {
        const pageSize = ctx.request.body.pageSize;
        const pageIndex = ctx.request.body.pageIndex;
        const totalCount = await Article.countDocuments({ published: true });
        let resultList = await Article.find({ published: true })
            .select(['_id', 'updatedAt', 'title', 'type', 'tag'])
            .sort({ updatedAt: -1 })
            .limit(pageSize)
            .skip((pageIndex - 1) * pageSize);
        ctx.response.body = {
            totalCount,
            status: 0,
            message: `查询成功`,
            resultList
        };
    } else {
        ctx.response.body = {
            status: -1,
            message: `参数错误`
        };
    }
});
commonRouter.post(`/searchCommonArticles`, async ctx => {
    const published = true;
    let { tag, type, pageIndex, pageSize } = ctx.request.body;
    let query = {};
    if (!tag && type) {
        query = {
            type,
            published
        };
    } else if (!type && tag) {
        query = {
            tag,
            published
        };
    } else if (type && tag) {
        query = {
            type,
            tag,
            published
        };
    } else {
        return (ctx.response.body = {
            status: -1,
            message: `参数错误`
        });
    }
    const totalCount = await Article.countDocuments(query);
    const resultList = await Article.find(query)
        .select(['_id', 'updatedAt', 'title', 'type', 'tag'])
        .sort({ updatedAt: -1 })
        .limit(pageSize)
        .skip((pageIndex - 1) * pageSize);
    ctx.response.body = {
        totalCount,
        resultList,
        status: 0,
        message: `查询成功`
    };
});
// 获取文章详情
commonRouter.post(`/getArticleDetails`, async ctx => {
    const { id } = ctx.request.body;
    if (!id) {
        return (ctx.response.body = {
            status: -1,
            message: `参数错误`
        });
    }
    try {
        const article = await Article.findById(id);
        ctx.response.body = {
            status: 0,
            message: `查询成功`,
            article
        };
    } catch {
        ctx.response.body = {
            status: -1,
            message: `查无此文章`
        };
    }
});
/* 搜索标题或者文章关键词 */
commonRouter.post(`/searchKeywords`, async ctx => {
    const { keyword, pageIndex, pageSize } = ctx.request.body;
    const reg = new RegExp(keyword, 'i');
    const resultList = await Article.find({
        published: true,
        title: { $regex: reg }
    })
        .sort({ updatedAt: -1 })
        .limit(pageSize)
        .skip((pageIndex - 1) * pageSize);
    ctx.response.body = {
        status: 0,
        message: `查询成功`,
        resultList,
        totalCount: resultList.length
    };
});
module.exports = commonRouter;

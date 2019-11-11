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
module.exports = commonRouter;

const Router = require('koa-router');

const Article = require('../models/Articles');

let commonRouter = new Router();

commonRouter.get('/articles', async ctx => {
    const articleList = await Article.find({});
    ctx.response.body = {
        articleList
    }
});

module.exports = commonRouter;
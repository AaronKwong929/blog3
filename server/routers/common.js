const Router = require('koa-router');

const Article = require('../models/Articles');

let commonRouter = new Router();

commonRouter.get('/articles', async ctx => {
    let articleList = await Article.find({});
    articleList = articleList
        .filter(item => {
            return item.published === true;
        })
        .sort((a, b) => {
            let aTimeString = a.updatedAt;
            let bTimeString = b.updatedAt;
            aTimeString = aTimeString.replace(/-/g, '/');
            bTimeString = bTimeString.replace(/-/g, '/');
            let aTime = new Date(aTimeString).getTime();
            let bTime = new Date(bTimeString).getTime();
            return bTime - aTime;
        });
    ctx.response.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,HEAD,DELETE,GET,PUT,POST',
        'Access-Control-Allow-Headers':
            'x-requested-with, accept, origin, content-type',
        'Access-Control-Max-Age': 10000,
        'Access-Control-Allow-Credentials': true
    });
    ctx.response.body = {
        articleList
    };
});

module.exports = commonRouter;

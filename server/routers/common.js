const Router = require('koa-router');

const Article = require('../models/Articles');
const Recent = require('../models/Recent');

let commonRouter = new Router();

commonRouter.get('/articles', async ctx => {
    let articleList = await Article.find();
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
    ctx.response.body = {
        articleList
    };
});

commonRouter.get('/recent', async ctx => {
    let recent = await Recent.find();
    ctx.response.body = {
        recent
    }
});

module.exports = commonRouter;

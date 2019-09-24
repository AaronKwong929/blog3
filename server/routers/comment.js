const Router = require('koa-router');
const Article = require('../models/Articles');

let commentRouter = new Router();

commentRouter.post('/publish', async ctx => {
    const user = ctx.request.body.user,
        content = ctx.request.body.content,
        id = ctx.request.body.id,
        article = await Article.findById(id);
    article.comments.push({
        user,
        content
    });
    await article.save();
    ctx.response.body = {
        code: 1,
        msg: 'comment sent'
    }
});

module.exports = commentRouter;

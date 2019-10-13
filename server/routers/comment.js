const Router = require('koa-router');
const Article = require('../models/Articles');
const dateFormat = require('../utils/dateFormat');
let commentRouter = new Router();

commentRouter.post('/publish', async ctx => {
    const from = ctx.request.body.from,
        content = ctx.request.body.content,
        to = ctx.request.body.to,
        id = ctx.request.body.id,
        time = dateFormat(new Date(), 'yyyy-MM-dd hh:mm');
    article = await Article.findById(id);
    article.comments.push({
        from,
        to,
        content,
        time
    });
    await article.save();
    ctx.response.body = {
        code: 1,
        msg: 'comment sent'
    };
});

commentRouter.post('/delete', async ctx => {
    const { articleID } = ctx.request.body;
    const { commentID } = ctx.request.body;
    await Article.findByIdAndUpdate(articleID, {
        $pull: { comments: { _id: commentID } }
    });
    ctx.response.body = {
        code: 1,
        msg: 'comment deleted'
    };
});

module.exports = commentRouter;

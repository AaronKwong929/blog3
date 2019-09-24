const Router = require('koa-router')();
const adminRouter = require('./admin');
const commonRouter = require('./common');
const commentRouter = require('./comment');

Router.use('/admin', adminRouter.routes(), adminRouter.allowedMethods());

Router.use('/common', commonRouter.routes(), commonRouter.allowedMethods());

Router.use('/comment', commentRouter.routes(), commentRouter.allowedMethods());

module.exports = Router;
const Router = require('koa-router')();
const adminRouter = require('./admin');
const commonRouter = require('./common');

Router.use('/admin', adminRouter.routes(), adminRouter.allowedMethods());

Router.use('/common', commonRouter.routes(), commonRouter.allowedMethods());

module.exports = Router;
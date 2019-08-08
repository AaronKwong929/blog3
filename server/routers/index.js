const Router = require('koa-router')();
const adminRouter = require('./admin');

Router.use('/admin', adminRouter.routes(), adminRouter.allowedMethods());

module.exports = Router;
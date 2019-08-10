const Router = require('koa-router');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Admin = require('../models/Admin');
const addToken = require('../tokens/addToken');
const verifyToken = require('../tokens/verifyToken');

let adminRouter = new Router();

// 添加管理员账号用（一次性
adminRouter.post('/add', async ctx => {
    const admin = new Admin(ctx.request.body);
    try {
        await admin.save();
        ctx.response.body = {
            msg: 'succeess'
        };
    } catch (e) {
        ctx.response.body = {
            msg: 'fail'
        };
    }
});

// 管理员登陆、发放token
adminRouter.post('/login', async ctx => {
    const name = ctx.request.body.name,
        password = ctx.request.body.password;
    try {
        const admin = await Admin.findOne({ name }),
            isMatch = await bcrypt.compare(password, admin.password);
        if (!admin || !isMatch) {
            throw new Error();
        }
        const adminToken = addToken(admin.name);
        ctx.response.body = {
            adminToken,
            code: 0
        };
    } catch (e) {
        ctx.response.body = {
            code: 1,
            msg: '账号或密码错误'
        };
    }
});

adminRouter.get('/', verifyToken, async ctx => {
    ctx.response.body = {
        code: 1,
        msg: '获取管理页内容成功！'
    }
});

// 注销？清空state？session？
// adminRouter.post('/logout', async ctx => {

// });

// 保存草稿之后发布？
adminRouter.post('/commit', verifyToken, async ctx => {});

module.exports = adminRouter;

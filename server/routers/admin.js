const Router = require('koa-router');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Admin = require('../models/Admin');
const Article = require('../models/Articles');

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
    const articleList = await Article.find({});
    ctx.response.body = {
        articleList
    }
});

adminRouter.post('/draft', verifyToken, async ctx => {
    let article = new Article();
    await article.save();
    ctx.response.body = {
        article
    };
});

adminRouter.put('/draft', verifyToken, async ctx => {
    const update = ctx.request.body.article;
    // console.log(update);
    // console.log(update._id);
    const article = await Article.findById(update._id)
    article.title = update.title;
    article.type = update.type;
    article.tag = update.tag;
    article.content = update.content;
    await article.save();
    ctx.response.body = { article };
});

adminRouter.post('/delete', verifyToken, async ctx => {
    const id = ctx.request.body.id;
    // console.log(id);
    await Article.findByIdAndDelete(id);
    ctx.response.body = {
        msg: 'success'
    }
});
module.exports = adminRouter;

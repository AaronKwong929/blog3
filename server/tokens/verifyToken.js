const jwt = require('jsonwebtoken');
const { secret } = require('../configs/jwt');

module.exports = async (ctx, next) => {
    // 检验是否存在 token
    const authorization = ctx.request.header.authorization;
    // console.log(authorization);
    if (!authorization) {
        ctx.throw(401, 'Token不存在');
    }
    const token = authorization.split(' ')[1];
    // console.log(token);
    // 检验 token 是否已过期
    try {
        await jwt.verify(token, secret);
    } catch (err) {
        ctx.throw(401, 'Token非法');
    }
    await next();
};

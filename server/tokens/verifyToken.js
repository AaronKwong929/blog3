const jwt = require('jsonwebtoken');
const { secret } = require('../configs/jwt');

module.exports = async (ctx, next) => {
    const authorization = ctx.request.header.authorization;
    const token = authorization.split(' ')[1];
    try {
        jwt.verify(token, secret);
    } catch (err) {
        ctx.throw(401, 'Token非法');
    }
    await next();
};

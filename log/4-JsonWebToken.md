# 关于 jsonwebtoken

## 登陆成功发放 token 时只将 admin.name 注入 token，无敏感信息确保安全

```javascript
const jwt = require('jsonwebtoken');
const { secret } = require('../configs/jwt');

module.exports = adminInfo => {
    const token = jwt.sign(
        {
            name: adminInfo.name
        },
        secret,
        { expiresIn: '1h' }
    );
    return token;
};
```

将验证 token 设置为 koa 中间件

```javascript
const jwt = require('jsonwebtoken');
const { secret } = require('../configs/jwt');

module.exports = async (ctx, next) => {
    const authorization = ctx.request.header.authorization;
    const token = authorization.split(' ')[1];
    try {
        await jwt.verify(token, secret);
    } catch (err) {
        ctx.throw(401, 'Token非法');
    }
    await next();
};
```

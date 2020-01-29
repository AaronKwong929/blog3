# 本篇讲解 server 文件夹内的配置文件

> 避免开发电脑崩溃

mongoose.js

```js
const mongoose = require('mongoose');

mongoose.connect('mongodb://(服务器地址):(端口号默认27017)/(数据库名字)', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

/* 上线版本 */
mongoose.connect(
    'mongodb://(远端数据库用户名):(密码)@localhost:27017/(数据库名字)',
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }
);
```

/jwt.js

```js
module.exports = {
    secret: '(加密密钥)'
};
```

/cors.js

```js
module.exports = {
    origin: function(ctx) {
        if (ctx.url === '/test') {
            return false;
        }
        return '*';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
};
```

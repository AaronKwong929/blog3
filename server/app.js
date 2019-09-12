require('./configs/mongoose');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const compress = require('koa-compress');
const serve = require('koa-static');
const cors = require('koa2-cors');
const path = require('path');
const app = new Koa();
const routers = require('./routers/index');

app.use(bodyParser());

app.use(
    cors({
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
    })
);

app.use(
    compress({
        filter: function(content_type) {
            return /text/i.test(content_type);
        },
        threshold: 128,
        flush: require('zlib').Z_SYNC_FLUSH
    })
);

app.use(async (ctx, next) => {
    ctx.compress = true;
    await next();
});

app.use(routers.routes()).use(routers.allowedMethods());

app.use(serve(path.resolve('dist')));

app.listen(3000, () => {
    console.log(`app started at port 3000`);
});

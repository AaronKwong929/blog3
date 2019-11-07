require('./configs/mongoose');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const compress = require('koa-compress');
const serve = require('koa-static');
const cors = require('koa2-cors');
const path = require('path');
const app = new Koa();
const routers = require('./routers/index');
const corsConfig = require('./configs/cors');

app.use(serve(path.resolve('dist')));

app.use(serve(path.resolve('uploads')));

app.use(bodyParser());

app.use(cors(corsConfig));

app.use(routers.routes()).use(routers.allowedMethods());

app.use(
    compress({
        filter: function(content_type) {
            return /text/i.test(content_type);
        },
        threshold: 128,
        flush: require('zlib').Z_SYNC_FLUSH
    })
);

app.listen(3000, () => {
    console.log(`app started at port 3000`);
});

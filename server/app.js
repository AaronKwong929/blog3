require('./configs/mongoose');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const compress = require('koa-compress');
const serve = require('koa-static');
const path = require('path');
const app = new Koa();
const routers = require('./routers/index');

app.use(bodyParser());

app.use(routers.routes()).use(routers.allowedMethods());

app.use(compress({ threshold: 10240 }));
app.use(serve(path.resolve("dist")));

app.listen(3000, () => {
    console.log(`app started at port 3000`);
});

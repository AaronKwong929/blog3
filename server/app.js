require('./configs/mongoose');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();

const routers = require('./routers/index');
app.use(bodyParser());

app.use(routers.routes()).use(routers.allowedMethods());

app.listen(3000, () => {
    console.log(`app started at port 3000`);
});

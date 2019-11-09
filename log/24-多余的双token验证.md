# 使用双 token 进行登陆持久化验证

> 做出来了才发现没有做的意义，so，记录一下，再删除代码，不过不做出来心里痒痒的睡觉也在想，做出来就做出来

## 何为没有意义？先长后短，先短后长都没有意义，除了增加headers的重量外，还要增加jwt解密的开销，直接设置一个token做完工作即可

## 思路

### 登陆时发放两个 token，一个长 token，一个短时 token，均存入 localStorage 和 vuex

```js
/*  server/routers/admin.js  */
const TokenRelease = require('../tokens/addToken');
///////////
const adminToken = TokenRelease.adminTokenRelease(admin.name);
const longToken = TokenRelease.longTokenRelease(admin.name);
ctx.response.body = {
    adminToken,
    longToken,
    code: 1
};
///////////
```

```js
/*  /server/tokens/addToken.js  */
const jwt = require('jsonwebtoken');
const { secret } = require('../configs/jwt');

module.exports = {
    adminTokenRelease(adminInfo) {
        const token = jwt.sign(
            {
                name: adminInfo.name
            },
            secret,
            { expiresIn: '0.01h' }
        );
        return token;
    },
    /////////////////////////////
    longTokenRelease(adminInfo) {
        const token = jwt.sign(
            {
                name: adminInfo.name
            },
            secret,
            { expiresIn: '0.5h' }
        );
        return token;
    }
    /////////////////////////////
};
```

### 验证 token 的思路：先验证长 token，若长 token 验证过期则 ctx.throw(401); 若没过期就验证短 token，短 token 没过期就重新发放并 ctx.append("longAuthorization", newToken) 加入到 response.headers 中，再在前端部分 axios 拦截 response，刷新 vuex 和 localStorage

```js
/*  server/tokens/verifyToken.js  */
const jwt = require('jsonwebtoken');
const { secret } = require('../configs/jwt');

module.exports = async (ctx, next) => {
    const authorization = ctx.request.header.authorization;
    const longAuthorization = ctx.request.header.longauthorization;
    const token = authorization.split(' ')[1];
    ////////
    const longToken = longAuthorization.split(' ')[1];
    ////////
    jwt.verify(longToken, secret, async (err, decoded) => {
        if (err) {
            await ctx.throw(401, 'Illegeal Token');
        } else {
            jwt.verify(token, secret, async (err, decoded) => {
                if (err) {
                    const newToken = jwt.sign('refuseToken', secret);
                    ctx.response.append('newToken', newToken);
                    console.log(newToken);
                    console.log(err);
                } else {
                    await next();
                }
            });
        }
    });
    await next();
    //////////////////
};
```

```js
/*  /web/axios.js  */

Axios.interceptors.request.use(
    config => {
        if (store.state.token) {
            const token = store.state.token;
            config.headers.common['Authorization'] = `Bearer ${token}`;
        }
        ////////
        if (store.state.longToken) {
            const longToken = store.state.longToken;
            config.headers.common['longAuthorization'] = `Bearer ${longToken}`;
        }
        ////////
        return config;
    }
);

Axios.interceptors.response.use(
    response => {
        ////////
        // console.log(response.headers.newtoken);
        // 此处加入刷新localStorage和vuex的操作，懒得写
        ////////
        return response;
    },
    error => {
        if (error.response.status === 401) {
            router.push('401');
        }
    }
);
```

### vuex做相应操作，不用多说

```js
/*  /web/src/vuex/state.js  */
///////////
    longToken: '',
//////////
```

### app.vue created钩子从localStorage寻找longToken，有则加入headers

```js
/*  /web/src/App.vue  */

created() {
        if (localStorage.getItem("token")) {
            let token = localStorage.getItem("token");
            this.$store.state.token = token;
        }
        ///////////////////
        if (localStorage.getItem("longToken")) {
            let longToken = localStorage.getItem("longToken");
            this.$store.state.longToken = longToken;
        }
        ///////////////////
    }
```

### vuex的actions 添加localStorage和vuex

```js
/*  /web/src/vuex/actions.js  */
async LOGIN({ state }, user) {
        await Axios.post(`${baseURL}/admin/login`, {
            name: user.name,
            password: user.password
        }).then(res => {
            if (res.data.code === 1) {
                state.token = res.data.adminToken;
                localStorage.setItem('token', res.data.adminToken);
                ////////////////
                state.longToken = res.data.longToken;
                localStorage.setItem('longToken', res.data.longToken);
                ///////////////
                router.push('/admin');
            } else {
                state.loginFail = true;
            }
        });
    }
```

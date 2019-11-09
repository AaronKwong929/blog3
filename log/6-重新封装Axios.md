# 重新封装 axios

## 暴露出去的 Axios 在 main.js 内注入axios

```js
import Axios from './axios';
Vue.prototype.$axios = Axios;
```

### request 拦截，检查vuex.store里有没有token，如果有就加在请求头

### response 拦截，正常返回 response 可以写成 return response.data，返回了 error 如果是 401（无授权）则前端路由 push 到 401 页面

```js
import Axios from 'axios';
import store from './vuex/store';
import router from './router';

Axios.interceptors.request.use(config => {
    if (store.state.token) {
        const token = store.state.token;
        config.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

Axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response.status === 401) {
            router.push('401');
        }
    }
);

export default Axios;
```

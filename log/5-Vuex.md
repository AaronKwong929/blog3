# 19/8/10 关于 vuex 的一些东西

引入外部 state getters mutations actions 的方法

```javascript
import vuex from 'vuex';
import Vue from 'vue';

import state from './state.js';
import mutations from './mutations';
import actions from './actions.js';

Vue.use(vuex);

const store = new vuex.Store({ state, mutations, actions });

export default store;
```

## 在 main.js 里注入 vuex ，不再在各 .vue 内重复注入

```js
new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app');
```

### mutations 必须要是同步函数，actions 可以放异步的函数，另外 actions 提交的 mutations

```javascript
// exp.
incCount(state, data) {
        state.count += data;
    }

// 实例化
this.$store.commit('mutation名', 参数);
methods: {
        inc() {
            this.$store.commit('incCount', 1);
        }
    },
```

### actions,mutations 添加函数时，如果需要其他 vuex 模块里的东西，在函数开头添加{ state, commit, dispatch }

```javascript
// 添加了state，可以在方法里面访问实例化vuex的state
let actions = {
    GET_ARTICLES({ state }) {
        Axios.get('/api/admin/').then(res => {
            state.articleList = res.code;
        });
    }
};
```

## 关于 mapstate mapmutations mapgetters mapactions

### 官方文档写错的地方有点多 => [参考这个写的 script](https://m.php.cn/article/399670.html)

### 或者说用了对象[运算展开符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

### 在 computed 中使用...mapstate 将 this.XXX 映射成 state.xxxx

```javascript
computed: {
        ...mapState({
            List: state => {
                return state.articleList;
            }
        })
    },
```

### 在 methods 中使用...mapactions 和 ...mapmutations

```javascript
// web/src/routes/Admin.vue
methods: {
        ...mapMutations({
            logout: 'LOG_OUT'
        }),
        ...mapActions({
            get_articles: 'GET_ARTICLES'
        })
    },
mounted() {
        // this.$store.dispatch("GET_ARTICLES");
        this.get_articles();
        // 与注释作用等同
    }
```

```html
<button @click="logout">注销</button>
```

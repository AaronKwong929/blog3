import Vue from 'vue';
import App from './App.vue';

// import Axios from 'axios';

import Axios from './axios';

import './static/css/style.scss';
import './static/icon/iconfont.css';

import router from './router';
import store from './vuex/store';

Vue.config.productionTip = false;

// Axios.interceptors.response.use(
//     response => {
//         return response.data;
//         // 写成response.data 前端即可直接res而无需res.data
//     },
//     err => {
//         return Promise.resolve(err.response);
//         // throw下 注意是resolve， reject会控制台输出错误
//     }
// );

Vue.prototype.$axios = Axios;

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app');

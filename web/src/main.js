import Vue from 'vue';
import App from './App.vue';

import Axios from './axios';

import './static/css/style.scss';
import './static/icon/iconfont.css';

import router from './router';
import store from './vuex/store';

Vue.config.productionTip = false;

Vue.prototype.$axios = Axios;

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app');

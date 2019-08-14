import Vue from 'vue';
import App from './App.vue';

import Axios from './axios';

import './static/css/style.scss';
import './static/icon/iconfont.css';

import './static/css/atom-one-dark.css';

import router from './router';
import store from './vuex/store';

import hljs from 'highlight.js';

Vue.config.productionTip = false;

Vue.prototype.$axios = Axios;

Vue.directive('highlight', function(el) {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach(block => {
        hljs.highlightBlock(block);
    });
});

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app');

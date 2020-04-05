import Vue from 'vue';
import App from './App.vue';

import './static/css/index.scss';
import './static/css/atom-one-dark.css';

import router from './router/index';
// import store from './vuex/store';
import hljs from 'highlight.js';

import ELEMENT from 'element-ui';
import './static/css/index.css';
Vue.use(ELEMENT);

import VueEditor from 'vue-md-editor';
Vue.use(VueEditor);

Vue.config.productionTip = false;

import * as Axios from './utils/Axios';
Vue.prototype.$axios = Axios;

import * as Api from './Api/api';
Vue.prototype.$api = Api;

import * as login from './utils/Login';
Vue.prototype.$login = login;

Vue.directive('highlight', function(el) {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach(block => {
        hljs.highlightBlock(block);
    });
});

new Vue({
    render: h => h(App),
    router,
    // store
}).$mount('#app');

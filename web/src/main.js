import Vue from 'vue';
import App from './App.vue';

import Axios from './axios';
import dateFormat from './dateFormat';

import './static/css/index.scss'
// import './static/css/style.scss';
// import './static/css/v-html.scss';
import './static/icon/iconfont.css';
import './static/css/atom-one-dark.css';

import router from './router';
import store from './vuex/store';
import hljs from 'highlight.js';

import ELEMENT from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ELEMENT);

Vue.config.productionTip = false;

Vue.prototype.$axios = Axios;
Vue.prototype.$dateFormat = dateFormat;

Vue.directive('highlight', function(el) {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach(block => {
        hljs.highlightBlock(block);
    });
});

Vue.directive('focus', {
    inserted: function(el) {
        el.focus();
    }
});

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app');

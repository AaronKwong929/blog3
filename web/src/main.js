import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import Axios from 'axios';

import './static/css/style.scss';
import './static/icon/iconfont.css';

import Home from './routes/Home.vue';
import Archive from './routes/Archive.vue';
import Classify from './routes/Classify.vue';
import About from './routes/About.vue';
import Login from './routes/Login.vue';
import Logout from './routes/Logout.vue';
import Admin from './routes/Admin.vue';
import Draft from './routes/Draft.vue';
import Commit from './routes/Commit.vue';
import NotFound from './routes/404.vue';

Vue.use(VueRouter);
Vue.config.productionTip = false;
Vue.prototype.$axios = Axios;

const routes = [
    { path: '/', redirect: 'home' },
    { path: '/home', component: Home },
    { path: '/archive', component: Archive },
    { path: '/classify', component: Classify },
    { path: '/about', component: About },
    { path: '/login', component: Login },
    { path: '/logout', component: Logout },
    {
        path: '/admin',
        component: Admin,
        children: [
            { path: 'draft', component: Draft },
            { path: 'commit', component: Commit }
        ]
    },
    { path: '*', redirect: '404' },
    { path: '/404', component: NotFound }
];

const router = new VueRouter({ routes });

new Vue({
    render: h => h(App),
    router
}).$mount('#app');

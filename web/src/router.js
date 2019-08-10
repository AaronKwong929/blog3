import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './vuex/store.js';

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
import Unauthorized from './routes/401.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: 'home' },
    { path: '/home', component: Home },
    { path: '/archive', component: Archive },
    { path: '/classify', component: Classify },
    { path: '/about', component: About },
    { path: '/login', component: Login },
    {
        path: '/admin',
        component: Admin,
        children: [
            { path: 'draft', component: Draft },
            { path: 'commit', component: Commit },
            { path: '/logout', component: Logout }
        ]
    },
    { path: '*', redirect: '404' },
    { path: '/404', component: NotFound },
    { path: '/401', component: Unauthorized }
];

const router = new VueRouter({ routes });

export default router;
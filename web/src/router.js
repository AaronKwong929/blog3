import Vue from 'vue';
import VueRouter from 'vue-router';

import store from './vuex/store';

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
        meta: { requireAuth: true },
        children: [
            { path: 'draft', component: Draft, meta: { requireAuth: true } },
            { path: 'commit', component: Commit, meta: { requireAuth: true } },
            { path: '/logout', component: Logout, meta: { requireAuth: true } }
        ]
    },
    { path: '*', redirect: '404' },
    { path: '/404', component: NotFound },
    { path: '/401', component: Unauthorized }
];

const router = new VueRouter({ routes });

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        const token = store.state.token;
        if (token && token !== null) {
            next();
        } else {
            next('/login');
        }
    } else {
        next();
    }
});

export default router;

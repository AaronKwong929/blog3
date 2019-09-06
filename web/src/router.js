import Vue from 'vue';
import VueRouter from 'vue-router';

import store from './vuex/store';

import Home from './routes/Home.vue';
import Archive from './routes/Archive.vue';
import Type from './routes/Type.vue';
import Tag from './routes/Tag.vue';
import About from './routes/About.vue';
import Article from './routes/Article.vue';
import Login from './routes/Login.vue';
import Admin from './routes/Admin.vue';
import Draft from './routes/Draft.vue';
import NotFound from './routes/404.vue';
import Unauthorized from './routes/401.vue';
import UpdateLog from './routes/UpdateLog.vue';
import SearchResult from './routes/SearchResult.vue'

Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: 'home' },
    { path: '/home', component: Home },
    { path: '/archive', component: Archive },
    { path: '/type', component: Type },
    { path: '/tag', component: Tag },
    { path: '/about', component: About },
    { path: '/article/:id', component: Article },
    { path: '/login', component: Login },
    { path: '/admin', component: Admin, meta: { requireAuth: true } },
    { path: '/draft/:id', component: Draft, meta: { requireAuth: true } },
    { path: '*', redirect: '404' },
    { path: '/404', component: NotFound },
    { path: '/401', component: Unauthorized },
    { path: '/update', component: UpdateLog },
    { path: '/search', component: SearchResult }
];

const router = new VueRouter({
    // mode: 'history',
    routes
});

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

    if (to.fullPath === '/login') {
        const token = store.state.token;
        if (token && token !== null) {
            next('/admin');
        } else {
            next();
        }
    }
});

export default router;

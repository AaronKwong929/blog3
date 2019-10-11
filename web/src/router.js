import Vue from 'vue';
import VueRouter from 'vue-router';

import store from './vuex/store';

Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: 'home' },
    { path: '/home', component: () => import('./routes/Home.vue') },
    { path: '/archive', component: () => import('./routes/Archive.vue') },
    { path: '/type', component: () => import('./routes/Type.vue') },
    { path: '/tag', component: () => import('./routes/Tag.vue') },
    { path: '/about', component: () => import('./routes/About.vue') },
    { path: '/article/:id', component: () => import('./routes/Article.vue') },
    { path: '/login', component: () => import('./routes/Login.vue') },
    { path: '/admin', component: () => import('./routes/Admin.vue'), meta: { requireAuth: true } },
    { path: '/draft/:id', component: () => import('./routes/Draft.vue'), meta: { requireAuth: true } },
    { path: '*', redirect: '404' },
    { path: '/404', component: () => import('./routes/404.vue') },
    { path: '/401', component: () => import('./routes/401.vue') },
    { path: '/update', component: () => import('./routes/UpdateLog.vue') },
    { path: '/search', component: () => import('./routes/SearchResult.vue') }
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

import Vue from 'vue';
import VueRouter from 'vue-router';

import store from './vuex/store';

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: 'home' },
    { path: '/home', component: () => import('./routes/Home.vue') },
    { path: '/archive', component: () => import('./routes/Archive.vue') },
    {
        path: '/about',
        component: () => import('./routes/About.vue'),
        meta: { keepAlive: true }
    },
    {
        path: '/article/:id',
        component: () => import('./routes/NewArticleDetails.vue')
    },
    { path: '/login', component: () => import('./routes/Login.vue') },
    {
        path: '/draft/:id',
        component: () => import('./routes/Draft.vue'),
        meta: { requireAuth: true }
    },
    { path: '*', redirect: '404' },
    {
        path: '/404',
        component: () => import('./routes/404.vue'),
        meta: { keepAlive: true }
    },
    {
        path: '/401',
        component: () => import('./routes/401.vue'),
        meta: { keepAlive: true }
    },
    {
        path: '/update',
        component: () => import('./routes/UpdateLog.vue'),
        meta: { keepAlive: true }
    },
    {
        path: '/searchResult',
        name: 'searchResult',
        component: () => import('./routes/SearchResult.vue')
    },
    {
        path: '/classification',
        name: 'classification',
        component: () => import('./routes/Classification.vue')
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import('./routes/NewAdmin.vue'),
        meta: { requireAuth: true }
    }
];

const router = new VueRouter({
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

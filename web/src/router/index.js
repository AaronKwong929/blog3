import Vue from 'vue';
import VueRouter from 'vue-router';
// import store from '../vuex/store';

Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: 'home' },
    { path: '/home', component: () => import('../views/Home.vue') },
    { path: '/archive', component: () => import('../views/Archive.vue') },
    {
        path: '/about',
        component: () => import('../views/About.vue'),
        meta: { keepAlive: true }
    },
    {
        path: '/article/:id',
        component: () => import('../views/NewArticleDetails.vue')
    },
    { path: '/login', component: () => import('../views/Login.vue') },
    {
        path: '/draft/:id',
        component: () => import('../views/Draft.vue'),
        meta: { requireAuth: true }
    },
    { path: '*', redirect: 'error' },
    {
        path: '/update',
        component: () => import('../views/UpdateLog.vue'),
        meta: { keepAlive: true }
    },
    {
        path: '/searchResult',
        name: 'searchResult',
        component: () => import('../views/SearchResult.vue')
    },
    {
        path: '/classification',
        name: 'classification',
        component: () => import('../views/Classification.vue')
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import('../views/NewAdmin.vue'),
        meta: { requireAuth: true }
    },
    {
        path: '/error',
        name: 'error',
        component: () => import('../views/Error.vue'),
        meta: { requireAuth: false }
    }
];

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        // const token = store.state.token;
        const token = localStorage.getItem(`token`);
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

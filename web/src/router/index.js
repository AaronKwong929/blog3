import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: 'home' },
    {
        path: '/home',
        component: () => import('../views/Home.vue'),
        meta: { isAdmin: false }
    },
    {
        path: '/archive',
        component: () => import('../views/Archive.vue'),
        meta: { isAdmin: false }
    },
    {
        path: '/about',
        component: () => import('../views/About.vue'),
        meta: { keepAlive: true, isAdmin: false }
    },
    {
        path: '/article/:id',
        component: () => import('../views/NewArticleDetails.vue'),
        meta: { isAdmin: false }
    },
    {
        path: '/login',
        component: () => import('../views/Login.vue'),
        meta: { isAdmin: true }
    },
    {
        path: '/draft/:id',
        component: () => import('../views/Draft.vue'),
        meta: { requireAuth: true, isAdmin: true }
    },
    { path: '*', redirect: 'error' },
    {
        path: '/update',
        component: () => import('../views/UpdateLog.vue'),
        meta: { keepAlive: true, isAdmin: false }
    },
    {
        path: '/searchResult',
        name: 'searchResult',
        component: () => import('../views/SearchResult.vue'),
        meta: { isAdmin: false }
    },
    {
        path: '/classification',
        name: 'classification',
        component: () => import('../views/Classification.vue'),
        meta: { isAdmin: false }
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import('../views/NewAdmin.vue'),
        meta: { requireAuth: true, isAdmin: true }
    },
    {
        path: '/error',
        name: 'error',
        component: () => import('../views/Error.vue'),
        meta: { requireAuth: false, isAdmin: false }
    }
];

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
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

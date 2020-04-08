import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: 'home' },
    {
        path: '/home',
        component: () => import('../views/Home.vue'),
        meta: { showAside: false }
    },
    {
        path: '/archive',
        component: () => import('../views/Archive.vue'),
        meta: { showAside: true }
    },
    {
        path: '/about',
        component: () => import('../views/About.vue'),
        meta: { keepAlive: true, showAside: true }
    },
    {
        path: '/article/:id',
        component: () => import('../views/NewArticleDetails.vue'),
        meta: { showAside: true }
    },
    {
        path: '/login',
        component: () => import('../views/Login.vue'),
        meta: { showAside: true }
    },
    {
        path: '/draft/:id',
        component: () => import('../views/Draft.vue'),
        meta: { requireAuth: true, showAside: true }
    },
    { path: '*', redirect: 'error' },
    {
        path: '/update',
        component: () => import('../views/UpdateLog.vue'),
        meta: { keepAlive: true, showAside: true }
    },
    {
        path: '/searchResult',
        name: 'searchResult',
        component: () => import('../views/SearchResult.vue'),
        meta: { showAside: true }
    },
    {
        path: '/classification',
        name: 'classification',
        component: () => import('../views/Classification.vue'),
        meta: { showAside: true }
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import('../views/NewAdmin.vue'),
        meta: { requireAuth: true, showAside: true }
    },
    {
        path: '/error',
        name: 'error',
        component: () => import('../views/Error.vue'),
        meta: { requireAuth: false, showAside: true }
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

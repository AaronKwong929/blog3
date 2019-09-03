import Axios from '../axios';
import router from '../router';

// 上线地址: http://106.53.89.236:3000
// 打包地址: http://127.0.0.1:3000 vue.config.js 注释 devServer.proxy
// 开发地址: /api vue.config.js 取消 devServer.proxy 注释

const actions = {
    async ADMIN_GET_ARTICLES({ state }) {
        await Axios.get('/api/admin').then(res => {
            state.adminArticleList = res.data.articleList;
        });
    },
    async SAVE_ARTICLE({ state, dispatch }) {
        await Axios.put('/api/admin/draft', {
            article: state.articleDetails
        }).then(() => {
            dispatch('ADMIN_GET_ARTICLES');
        });
    },
    async COMMON_GET_ARTICLES({ state }) {
        await Axios.get('/api/common/articles').then(res => {
            state.articleList = res.data.articleList;
        });
    },
    async FIND_ARTICLE({ state }, id) {
        state.articleDetails = await state.articleList.find(item => {
            return item._id === id;
        });
    },
    async DELETE_ARTICLE({ dispatch }, id) {
        await Axios.post('/api/admin/delete', {
            id
        }).then(() => {
            dispatch('ADMIN_GET_ARTICLES');
            dispatch('COMMON_GET_ARTICLES');
        });
    },
    async PUBLISH_ARTICLE({ dispatch }, id) {
        await Axios.put('/api/admin/publish', {
            id
        }).then(() => {
            dispatch('ADMIN_GET_ARTICLES');
            dispatch('COMMON_GET_ARTICLES');
        });
    },
    async NEW_ARTICLE({ dispatch }) {
        await Axios.post('/api/admin/draft').then(() => {
            dispatch('ADMIN_GET_ARTICLES');
            dispatch('COMMON_GET_ARTICLES');
        });
    },
    async LOGIN({ state }, user) {
        await Axios.post('/api/admin/login', {
            name: user.name,
            password: user.password
        }).then(res => {
            if (res.data.code === 0) {
                state.token = res.data.adminToken;
                localStorage.setItem('token', res.data.adminToken);
                router.push('/admin');
            } else {
                state.loginFail = true;
            }
        });
    }
};

export default actions;

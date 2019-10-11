import Axios from '../axios';
import router from '../router';

const baseURL = process.env.VUE_APP_API;

const actions = {
    async ADMIN_GET_ARTICLES({ state }) {
        await Axios.get(`${baseURL}/admin`).then(res => {
            state.adminArticleList = res.data.articleList;
        });
    },
    async SAVE_ARTICLE({ state, dispatch }) {
        await Axios.put(`${baseURL}/admin/draft`, {
            article: state.articleDetails
        }).then(() => {
            dispatch('ADMIN_GET_ARTICLES');
        });
    },
    async COMMON_GET_ARTICLES({ state }) {
        await Axios.get(`${baseURL}/common/articles`).then(res => {
            state.articleList = res.data.articleList;
        });
    },
    async FIND_ARTICLE({ state }, id) {
        state.articleDetails = await state.articleList.find(item => {
            return item._id === id;
        });
    },
    async DELETE_ARTICLE({ dispatch }, id) {
        await Axios.post(`${baseURL}/admin/delete`, {
            id
        }).then(() => {
            dispatch('ADMIN_GET_ARTICLES');
            dispatch('COMMON_GET_ARTICLES');
        });
    },
    async PUBLISH_ARTICLE({ dispatch }, id) {
        await Axios.put(`${baseURL}/admin/publish`, {
            id
        }).then(() => {
            dispatch('ADMIN_GET_ARTICLES');
            dispatch('COMMON_GET_ARTICLES');
        });
    },
    async NEW_ARTICLE({ dispatch }) {
        await Axios.post(`${baseURL}/admin/draft`).then(() => {
            dispatch('ADMIN_GET_ARTICLES');
            dispatch('COMMON_GET_ARTICLES');
        });
    },
    async LOGIN({ state }, user) {
        await Axios.post(`${baseURL}/admin/login`, {
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
    },
    async SEND_COMMENT({ dispatch }, comment) {
        await Axios.post(`${baseURL}/comment/publish`, {
            from: comment.from,
            content: comment.content,
            to: comment.to,
            id: comment.id
        }).then(() => {
            dispatch('COMMON_GET_ARTICLES');
        });
    },
    async DELETE_COMMENT({ dispatch }, comment) {
        await Axios.post(`${baseURL}/comment/delete`, {
            articleID: comment.articleID,
            commentID: comment.commentID
        }).then(() => {
            dispatch('COMMON_GET_ARTICLES');
            dispatch('ADMIN_GET_ARTICLES');
        });
    },
    async GET_RECENT({ state }) {
        await Axios.get(`${baseURL}/common/recent`).then(res => {
            state.recent = res.data.recent[0];
        });
    },
    async UPDATE_RECENT({ dispatch }, content) {
        await Axios.post(`${baseURL}/admin/recent`, {
            content: content.content
        }).then(() => {
            dispatch('GET_RECENT');
        });
    }
};

export default actions;

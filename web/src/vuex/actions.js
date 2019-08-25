import Axios from '../axios';

// 上线地址: http://106.53.89.236:3000
// 打包地址: http://127.0.0.1:3000 vue.config.js 注释 devServer.proxy
// 开发地址: /api vue.config.js 取消 devServer.proxy 注释

const actions = {
    async ADMIN_GET_ARTICLES({ state }) {
        Axios.get('/api/admin').then(res => {
            state.adminArticleList = res.data.articleList;
        });
    },
    SAVE_ARTICLE({ state }) {
        Axios.put('/api/admin/draft', {
            article: state.articleDetails
        }).then(res => {
            state.adminArticleList = res.data.articleList;
        });
    },
    async COMMON_GET_ARTICLES({ state }) {
        Axios.get('/api/common/articles').then(res => {
            state.articleList = res.data.articleList;
        });
    },
    FIND_ARTICLE: ({ state }, id) => {
        state.articleDetails = state.articleList.find(item => {
            return item._id === id;
        });
    }
};

export default actions;

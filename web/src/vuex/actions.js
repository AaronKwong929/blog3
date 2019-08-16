import Axios from '../axios';

const actions = {
    ADMIN_GET_ARTICLES({ state }) {
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
    COMMON_GET_ARTICLES({ state }) {
        Axios.get('/api/common/articles').then(res => {
            state.articleList = res.data.articleList;
        });
    }
    // FIND_ARTICLE: (state, id) => {
    //     return state.articleList.find(item => {
    //         return item._id === id
    //     });
    // }
};

export default actions;

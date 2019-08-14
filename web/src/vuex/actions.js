import Axios from '../axios';

const actions = {
    GET_ARTICLES({ state }) {
        Axios.get('/api/admin')
            .then(res => {
                state.articleList = res.data.articleList;
            })
    },
    SAVE_ARTICLE({ state }) {
        Axios.put('/api/admin/draft', {
            article: state.articleDetails
        });
        this.GET_ARTICLES();
    },
    COMMON_GET_ARTICLES({state}) {
        Axios.get('/api/common/articles')
            .then(res => {
                state.articleList = res.data.articleList;
            })
    },
    // FIND_ARTICLE: (state, id) => {
    //     return state.articleList.find(item => {
    //         return item._id === id
    //     });
    // }
};

export default actions;
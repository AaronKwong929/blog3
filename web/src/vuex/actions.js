import Axios from '../axios';

const actions = {
    GET_ARTICLES({ state }) {
        Axios.get('/api/admin')
            .then(res => {
                if (res.data) {
                    state.articleList = res.data.code + res.data.msg;
                }
            })
    },
    SAVE_ARTICLE({ state }) {
        Axios.put('/api/admin/draft', {
            article: state.articleDetails
        });
    }
};

export default actions;
import router from '../router';
const mutations = {
    LOG_OUT(state) {
        state.token = '';
        localStorage.removeItem('token');
        router.push('login');
    },
    SEARCH_ARTICLES(state) {
        state.searchResults.titleResults = state.articleList.filter(item => {
            return item.title.includes(state.searchTerm);
        });
        state.searchResults.contentResults = state.articleList.filter(item => {
            return item.content.includes(state.searchTerm);
        });
        router.push('/search');
    },
    LOGIN_SUCCESS(state, token) {
        state.token = token;
        localStorage.setItem('token', token)
        router.push('/admin');
    }
};

export default mutations;

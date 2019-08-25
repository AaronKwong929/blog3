import router from '../router';
const mutations = {
    LOG_OUT(state) {
        state.token = '';
        localStorage.removeItem('token');
        router.push('login');
    }
};

export default mutations;
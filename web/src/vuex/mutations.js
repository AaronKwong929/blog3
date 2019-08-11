import router from '../router';
const mutations = {
    LOG_OUT(state) {
        state.token = '';
        router.push('login');
    }
};

export default mutations;
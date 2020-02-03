import router from '../router';
const mutations = {
    LOG_OUT(state) {
        state.token = '';
        localStorage.removeItem('token');
        router.push('login');
    },
    LOGIN_SUCCESS(state, token) {
        state.token = token;
        localStorage.setItem('token', token)
        router.push('/admin');
    }
};

export default mutations;

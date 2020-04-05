import router from '../router/index';

const mutations = {
    LOG_OUT(state) {
        state.token = '';
        localStorage.removeItem('token');
        localStorage.removeItem(`name`);
        router.push(`/login`);
    },
    LOGIN_SUCCESS(state, { token, name }) {
        state.token = token;
        state.name = name;
        localStorage.setItem('token', token);
        localStorage.setItem(`name`, name);
        router.push('/admin');
    }
};

export default mutations;

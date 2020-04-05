import Axios from 'axios';
import store from './vuex/store';
import router from './router/index';

Axios.interceptors.request.use(
    config => {
        if (store.state.token) {
            const token = store.state.token;
            config.headers.common['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }
);

Axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response.status === 401) {
            router.push({
                name: 'error',
                params: {
                    statusCode: 401
                }
            });
        }
    }
);

export default Axios;

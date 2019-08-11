import Axios from 'axios';
import store from './vuex/store';
import router from './router';

Axios.interceptors.request.use(
    config => {
        if (store.state.token) {
            const token = store.state.token; // 记得写成store.state.token，不然爆炸了
            config.headers.common['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        // 用不上
        return Promise.reject(error);
    }
);

Axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response.status === 401) {
            router.push('401');
        }
        ////////// ↓？
        return Promise.reject(error.response.data);
    }
);
export default Axios;

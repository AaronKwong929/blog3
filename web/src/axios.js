import Axios from 'axios';
import store from './vuex/store';
import router from './router';

Axios.interceptors.request.use(
    config => {
        if (store.state.token) {
            const token = store.state.token; // 记得写成store.state.token，不然爆炸了
            config.headers.common['Authorization'] = `Bearer ${token}`;
        }
        // config.headers.common['Access-Control-Allow-Origin'] = '*';
        // config.headers.common['Access-Control-Allow-Methods'] = 'OPTIONS,HEAD,DELETE,GET,PUT,POST';
        // config.headers.common['Access-Control-Allow-Headers'] = 'x-requested-with, accept, origin, content-type';
        // config.headers.common['Access-Control-Max-Age'] = 10000;
        // config.headers.common['Access-Control-Allow-Credentials'] = true;
        return config;
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
    }
);

export default Axios;

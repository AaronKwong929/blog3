import vuex from 'vuex';
import Vue from 'vue';

import state from './state.js';
// import * as getters from "./getters.js";
// import mutations from "./mutations";
// import * as actions from "./actions.js";

import Axios from '../axios';

Vue.use(vuex);

let mutations = {};

let actions = {
    GET_ARTICLES({ state }) {
        Axios.get('/api/admin')
            .then(res => {
                state.articleList = res.data.code + res.data.msg;
            })
    }
};

const store = new vuex.Store({ state, mutations, actions });

export default store;

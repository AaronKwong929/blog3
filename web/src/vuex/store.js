import vuex from 'vuex';
import Vue from 'vue';

Vue.use(vuex);

let state = {
    token: '',
};

let mutations = {};

const store = new vuex.Store({ state, mutations });

export default store;

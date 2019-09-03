import vuex from 'vuex';
import Vue from 'vue';

import state from './state.js';
import mutations from './mutations';
import actions from './actions.js';

Vue.use(vuex);

const store = new vuex.Store({ state, mutations, actions });

export default store;

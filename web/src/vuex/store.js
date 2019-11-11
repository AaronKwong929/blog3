import vuex from 'vuex';
import Vue from 'vue';
import state from './state.js';
import mutations from './mutations';
import actions from './actions';
// import getters from './getters';
Vue.use(vuex);
const store = new vuex.Store({
    state,
    mutations,
    // getters,
    actions
});
export default store;

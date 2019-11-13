import Vue from 'vue'
import Vuex from 'vuex'

import assetsManage from './assets-manage';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    mutations,
    assetsManage,
    
  },
  // actions,
  // mutations
});

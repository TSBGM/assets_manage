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
  state: {
    token: null,
    userInfo: {
      user:{
        userName:"",
        mobile:""
      },
    },
    toast: {
      isShow: false,
      config: {
        msg: '',
        width: '7.6em',
        time: 2000
      }
    }
  },
  // actions,
  // mutations
});
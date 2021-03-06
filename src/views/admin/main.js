// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '../init'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '../../store'
// import 'es6-promise/auto'
import '../../assets/css/main.css';

import './permission.js'

// 注册全局mixin
// import access from 'mixins/access'
// Vue.mixin(access)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store'

import './style/reset.scss';
import './style/base.scss';
import './style/icon.scss';

import { formatDate } from './utils';
Vue.filter('formatDate', formatDate);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

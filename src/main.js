import Vue from 'vue';
import App from './App.vue';
import dateFilter from './filters/date.filter';
import roundToWhole from './filters/roundToWhole.filter';
import store from './store/index';

import 'normalize.css';

Vue.config.productionTip = false;

Vue.filter('dateFilter', dateFilter);
Vue.filter('roundToWhole', roundToWhole);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');

import '@fortawesome/fontawesome-free/css/all.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import querystring from 'querystring';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import Vue from 'vue';
import App from './App.vue';
import axios from './axios';
import vuetify from './plugins/vuetify';
import router from './router';

Vue.use(ElementUI);

Vue.config.productionTip = false
//set axios form-data
Vue.prototype.$qs = querystring;
Vue.prototype.$axios = axios

new Vue({
  vuetify,
  router,
  axios,
  render: h => h(App)
}).$mount('#app')

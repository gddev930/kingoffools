import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false
import messages from './lang'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
import './assets/css/style.css'
import 'vue2-toast/lib/toast.css';
import Toast from 'vue2-toast';
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
Vue.use(Toast)
const i18n = new VueI18n({
  locale: 'zh', // set locale
  messages, // set locale messages
})
new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')

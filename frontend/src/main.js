import Vue from 'vue'

import App from './App'
import router from './config/router'
import './config/bootstrap'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
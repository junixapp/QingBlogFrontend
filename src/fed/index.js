import Vue from 'vue'
import App from '../App'
import router from './router/index'
import store from './store/index'
import log from '../util/logger'

//引入公共CSS
import '../common/css/reset.css'
import '../common/stylus/base.styl'

Vue.config.productionTip = false

Vue.prototype.$log = log

store.init()

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

import Vue from 'vue'
import App from '../App'
import router from './router/index'
import store from './store/index'
import log from '../util/logger'

//引入公共CSS
import '../common/css/reset.css'
import '../common/stylus/base.styl'

import {
  Dialog,
  Menu,MenuItem,
  Select,Option,
  Button, Tag,
  Col,Row,
  Form,FormItem,Input,
  Message,
  Table, TableColumn,
  Pagination,
  Popover, Loading
} from 'element-ui'
Vue.use(Dialog);
Vue.use(MenuItem);
Vue.use(Menu);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
Vue.use(Button);
Vue.use(Tag);
Vue.use(Col);
Vue.use(Row);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Popover);
Vue.use(Loading);
Vue.component(Message.name, Message);
Vue.prototype.$message = Message

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

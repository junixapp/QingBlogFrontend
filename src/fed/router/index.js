import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

Vue.use(Router);

const router = new Router({
  mode: 'hash',
  base:'/',
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import("../../components/index/QBIndex"),
      meta: {
        pageTitle: '李晓俊'
      }
    },

  ]
})

router.beforeEach((to, from, next) => {
  //set html title
  if(to.meta.pageTitle){
    document.title = to.meta.pageTitle
  }


  if (to.name==="login") {
    if(store.state.token){
      router.replace({name: "index"})
      return
    }
  }

  next() // 确保一定要调用 next()
})

export default router

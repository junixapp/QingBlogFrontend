import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base:'/',
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import("../../components/index/QBAdmin"),
      meta: {
        pageTitle: '管理后台'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import("../../components/auth/QBLogin"),
      meta: {
        pageTitle: '登录'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import("../../components/auth/QBRegister"),
      meta: {
        pageTitle: '注册'
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

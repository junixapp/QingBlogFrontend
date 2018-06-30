import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  user: null,
  token: null,
  blog: JSON.parse(localStorage.blog || "{}")
};

const mutations = {
  saveUser(state, user){
    state.user = user
    localStorage.setItem('user', JSON.stringify(user))
  },
  saveToken(state, token){
    state.token = token
    localStorage.setItem('token', token)
  },
  logout(state){
    state.user = null
    state.token = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  },
  saveBlog(state, blog){
    state.blog = blog;
    localStorage.blog = JSON.stringify(blog)
  }
}

Vuex.Store.prototype.init = function () {
  //从localStorage初始化数据
  state.user = JSON.parse(localStorage.getItem('user'))
  state.token = localStorage.getItem('token')
}

export default new Vuex.Store({
  state,
  mutations
})

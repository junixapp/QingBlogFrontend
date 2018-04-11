import axios from './axios_config'
import store from '../store/index'
//登录
function login(username, password, cb) {
  axios.post("/auth/login", {
    username: username,
    password: password
  }).then((response) => {
    cb(response.data)
    // 将token和user存储起来
    store.commit('saveToken',response.headers.token)
    store.commit('saveUser', response.data.data)

  })
}

//注册
function register(username, password, cb) {
  axios.post("/auth/register", {
    username: username,
    password: password
  }).then((response) => {
    cb(response.data)
  })

}

export default {
  login, register
}

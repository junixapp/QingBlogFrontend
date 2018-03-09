import axios from './axios_config'

//登录
function login(username, password, cb) {
  axios.post("/auth/login", {
    username: username,
    password: password
  }).then((response) => {
    cb(response.data)
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

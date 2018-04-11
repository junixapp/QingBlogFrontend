'use strict'
import axios from 'axios'
import { Message} from 'element-ui'
import store from '../store/index'
import router from '../router/index'

//对axios进行统一配置
axios.defaults.baseURL = "/api";

//请求拦截器
axios.interceptors.request.use(config => {
  if(config.method!=="get"){
    //放入token
    config.headers.token = store.state.token
  }
  // element ui Loading方法
  return config
}, error => {
  Message.error({
    message: '加载超时'
  })
  return Promise.reject(error)
})

//axios统一处理请求fail的情况
axios.interceptors.response.use(function (response) {
  //do something when success.
  console.log(response.data);
  return response;
}, function (err) {
  console.error(err.response)
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        let errData = err.response.data
        Message.error(errData.msg)
        if(errData.code === -20){
          //token失效，清除user缓存，跳转登录界面
          store.commit("logout")
          router.replace({name: "login"})
        }
        break;
    }
  }
  return Promise.reject(err);
});

export default axios

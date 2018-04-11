'use strict'
import axios from 'axios'
import log from '../../util/logger'

//对axios进行统一配置
axios.defaults.baseURL = "/api";

//请求拦截器
axios.interceptors.request.use(config => {
  return config
}, error => {
  log(error)
  return Promise.reject(error)
})

//axios统一处理请求fail的情况
axios.interceptors.response.use(function (response) {
  //do something when success.
  log(response.data);
  return response;
}, function (err) {
  log(err.response)
  return Promise.reject(err);
});

export default axios

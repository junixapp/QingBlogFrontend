'use strict'
import axios from './axios_config'

//获取博客列表
function getBlogs(page, cb) {
  axios.get(`/blogs?page=${page}`)
    .then((response)=>{
      cb(response.data)
    })
}


export default {
  getBlogs
}

'use strict'
import axios from './axios_config'

//获取博客列表
function getBlogs(page, cb) {
  axios.get(`/blogs?page=${page}`)
    .then((response)=>{
      cb(response.data)
    })
}

//删除指定博客
function deleteBlog(id, cb) {
  axios.delete(`/blogs?id=${id}`)
    .then((response)=>{
      cb(response.data)
    })
}

//添加博客
function addBlog(blog, cb) {
  axios.post(`/blogs`, blog)
    .then( (response)=>{
      cb(response.data)
    })
}

//更新博客
function updateBlog(id, blog, cb) {
  axios.put(`/blogs?id=${id}`, blog)
    .then( (response)=>{
      cb(response.data)
    })
}

export default {
  getBlogs, deleteBlog, addBlog, updateBlog
}

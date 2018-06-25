'use strict'
import axios from './axios_config'

function getComments(page, blogId, cb) {
  axios.get(`/comments?page=${page}&blogId=${blogId}`)
    .then((response)=>{
      cb(response.data)
    })
}
function createComment(comment, cb) {
  axios.post(`/comments`, comment)
    .then((response)=>{
      cb(response.data)
    })
}


export default {
  getComments, createComment,
}

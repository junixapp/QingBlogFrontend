'use strict'

import axios from './axios_config'


function getCategories(page, cb) {
  axios.get(`/categories?page=${page}`)
    .then((response)=>{
      cb(response.data)
    })
}

function getAllCategories( cb) {
  axios.get(`/categories?isGetAll=true`)
    .then((response)=>{
      cb(response.data)
    })
}


export default {
  getCategories,getAllCategories
}

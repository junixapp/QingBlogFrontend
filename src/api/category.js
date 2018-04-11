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

function addCategory(category, cb) {
  axios.post("/categories", category)
    .then((response)=>{
      cb(response.data)
    })
}


function deleteCategory(id, cb) {
  axios.delete(`/categories?id=${id}`, cb)
    .then((response)=>{
      cb(response.data)
    })
}

function updateCategory(id, category, cb ) {
  axios.put(`/categories?id=${id}`, category)
    .then((response)=>{
      cb(response.data)
    })
}

export default {
  getCategories, addCategory, deleteCategory, updateCategory,getAllCategories
}

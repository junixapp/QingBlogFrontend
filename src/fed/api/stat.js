'use strict'
import axios from './axios_config'

//添加一条访问信息, 统计ip，地区，user_agent，visit_url， visit_time
function addStat(visit_url) {
  let data = {
    visit_ip: returnCitySN["cip"],
    user_agent: navigator.userAgent,
    visit_area: remote_ip_info.country + remote_ip_info.province + remote_ip_info.city,
    visit_url: visit_url,
    visit_time: new Date().getTime()
  };
  axios.post(`/stats`, data)
    .then((response)=>{

    })
}

/**
 * 获取网站访问量
 * @param cb
 */
function getAccessCount(cb) {
  axios.get('/stats/count')
    .then(response=>{
      cb(response.data)
    })
}

export default {
  addStat, getAccessCount
}

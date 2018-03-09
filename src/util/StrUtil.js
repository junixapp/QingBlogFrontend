'use strict'

function toString(s) {
  if(typeof s === "number"){
    s += ""
  }
  return s
}

//验证是否是正确的手机号
function verifyPhone(phone) {
  phone = toString(phone)
  let phoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
  return phoneReg.test(phone)
}

//验证是否是正确的手机号，规则：6-20位字母和数字的组合
function verifyUsername(str) {
  str = toString(str)
  let usernameReg = /^[a-zA-Z0-9]{6,20}$/
  return usernameReg.test(str)
}

//验证是否是正确的密码，规则：6-20位字母和数字的组合
function verifyPassword(psw) {
  psw = toString(psw)
  let pswReg = /^[a-zA-Z0-9]{6,20}$/
  return pswReg.test(psw)
}

//验证昵称是否正确，规则：2-20个字符非空白字符
function verifyNickname(nickname) {
  nickname = toString(nickname)
  let nicknameReg = /^[\S]{2,20}$/
  return nicknameReg.test(nickname)
}

module.exports = {
  verifyPhone,
  verifyUsername,
  verifyPassword
}

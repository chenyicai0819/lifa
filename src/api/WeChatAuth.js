import http from '../axios/config'

/**
 * 绑定微信号（客户）
 * @returns {*}
 */

const JdrWechat = (data) => {
  return http('','post','/wechat/login',data)
}
const JdrOauth = (data) => {
  return http('','post','/wechat/oauth',data)
}

export {
  JdrWechat,JdrOauth
}

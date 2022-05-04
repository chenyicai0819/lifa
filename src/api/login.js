import http from '../axios/config'

const loginapi =function (data){
    return http('','post','login',data)
}
const a="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiLpmYgiLCJjcmVhdGVkIjoxNjM3NDg0ODE4OTI1LCJleHAiOjIwNjk0ODQ4MTh9.PsPmzqJsYCJwRv39vo6x0VXiIKGcujmEQRrOv_FzzTuZr5dQL9cyScjSaytFjWBTxYJj_lIAH6yRQbOHmEFbzA"
const getUser=function (data) {
    return http({'token':a},'get','get/users',data)
}
const logupapi =function (data){
    return http('','post','logup',data)
}
const getUserById =function (data){
    return http('','post','id',data)
}
const logoutApi =function (data){
    return http('','post','logout',data)
}
export {
    loginapi,logupapi,getUser,getUserById,logoutApi
}
import http from '../axios/config'

const loginapi =function (data){
    return http('','post','authentication/login',data)
}
const a="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiLpmYgiLCJjcmVhdGVkIjoxNjM3NDg0ODE4OTI1LCJleHAiOjIwNjk0ODQ4MTh9.PsPmzqJsYCJwRv39vo6x0VXiIKGcujmEQRrOv_FzzTuZr5dQL9cyScjSaytFjWBTxYJj_lIAH6yRQbOHmEFbzA"
const getUser=function (data) {
    return http({'token':a},'get','get/users',data)
}

export {
    loginapi,
    getUser
}
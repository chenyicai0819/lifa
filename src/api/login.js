import http from '../axios/config'

const loginapi =function (data){
    return http('','post','authentication/login',data)
}

export {
    loginapi
}
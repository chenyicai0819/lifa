import http from '../axios/config'

const getComm=function (){
    return http('','get','comm/all',)
}

export{
    getComm,
}
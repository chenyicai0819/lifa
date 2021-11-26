import http from '../axios/config'

const getOrder=function (){
    return http('','get','order/get',)
}

export{
    getOrder,
}
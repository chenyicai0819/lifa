import http from '../axios/config'

const getVips=function (){
    return http('','get','vips/get',)
}

export{
    getVips,
}
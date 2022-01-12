import http from '../axios/config'

const getService=function (){
    return http('','get','service/all',)
}

export{
    getService,
}
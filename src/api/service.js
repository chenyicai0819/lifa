import http from '../axios/config'

const getService=function (){
    return http('','get','service/get',)
}

export{
    getService,
}
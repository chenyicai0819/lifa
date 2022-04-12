import http from '../axios/config'

const getService=function (){
    return http('','get','service/all',)
}
const pageService=function (data){
    return http('','get','service/page',data)
}
const delService=function (data){
    return http('','post','service/del',data)
}
const addServiceApi=function (data){
    return http('','post','service/add',data)
}
export{
    getService,pageService,delService,addServiceApi,
}
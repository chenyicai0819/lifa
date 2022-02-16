import http from '../axios/config'

const getComm=function (){
    return http('','get','comm/all',)
}
const pageGetComm=function (data){
    return http('','get','comm/page',data)
}
const priceGetComm=function (){
    return http('','get','comm/price')
}
const addComm=function (data){
    return http('','post','comm/add',data)
}
const upComm=function (data){
    return http('','post','comm/up',data)
}
const allCommType=function (){
    return http('','get','commtype/all')
}
export{
    getComm,pageGetComm,priceGetComm,allCommType,addComm,upComm,
}
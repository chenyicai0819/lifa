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
const addComm=function (){
    return http('','post','comm/add')
}
const upComm=function (){
    return http('','post','comm/up')
}
const allCommType=function (){
    return http('','get','commtype/all')
}
export{
    getComm,pageGetComm,priceGetComm,allCommType,addComm,upComm,
}
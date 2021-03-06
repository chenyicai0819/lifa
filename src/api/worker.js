import http from '../axios/config'

const getWorker=function (){
    return http('','get','worker/all',)
}
const getInWorker=function (){
    return http('','get','worker/in',)
}
const getSomeWorker=function (data){
    return http('','get','worker/get',data)
}
const addWorkers = (data) => {
    return http('','post','worker/add',data)
}
const getWorkPay = () => {
    return http('','get','worker/getPay',)
}
const getWorkTest = () => {
    return http('','get','worker/gettext',)
}
const getWw = () => {
    return http('','get','worker/getWw',)
}
const getWorkerLevel = () => {
    return http('','get','workerlevel/all',)
}
const payRoll = (data) => {
    return http('','post','worker/pay',data)
}
const upWorker = (data) => {
    return http('','post','worker/up',data)
}
const getWorkForId = (data) => {
    return http('','post','worker/oneforid',data)
}
export{
    getWorker,getWorkPay,getWorkTest,getWw,getWorkerLevel,addWorkers,getSomeWorker,payRoll,upWorker,
    getWorkForId,getInWorker,
}
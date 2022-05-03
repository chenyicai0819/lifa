import http from '../axios/config'

const allOrder=function (){
    return http('','get','order/all',)
}
const addOrder = (data) => {
    return http('','post','order/add',data)
}
const todayOrder = () => {
    return http('','get','order/today')
}
const upOrder = (data) => {
    return http('','post','order/update',data)
}
const numberOrder = (data) => {
    return http('','get','order/number',data)
}
const moneyOrder = (data) => {
    return http('','get','order/money',data)
}
const pageOrder=function (data){
    return http('','get','order/page',data)
}
const getOrderForDay=function (data){
    return http('','get','order/day',data)
}
const getOrderForDayAndOrderName=function (data){
    return http('','get','order/dayforname',data)
}
const getDayOrderForComm=function (data){
    return http('','get','order/dayforcomm',data)
}

export{
    allOrder,addOrder,todayOrder,upOrder,numberOrder,moneyOrder,pageOrder,getOrderForDay,
    getOrderForDayAndOrderName,getDayOrderForComm,
}
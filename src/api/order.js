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

export{
    allOrder,addOrder,todayOrder,upOrder,numberOrder,moneyOrder,
}
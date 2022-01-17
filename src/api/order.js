import http from '../axios/config'

const getOrder=function (){
    return http('','get','order/get',)
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

export{
    getOrder,addOrder,todayOrder,upOrder
}
import http from '../axios/config'

const getBill = () => {
    return http('','get','bill/get')
}
const todayBill = () => {
    return http('','get','bill/today')
}
const getBillInForDay = () => {
    return http('','get','/bill/getinforday')
}
const getBillOutForDay = () => {
    return http('','get','/bill/getoutforday')
}
const addBill = (data) => {
    return http('','post','/bill/add',data)
}
const getOpenBill = (data) => {
    return http('','get','/bill/open',data)
}
const getDayBill = (data) => {
    return http('','get','/bill/day',data)
}

export{
    getBill,getBillInForDay,getBillOutForDay,addBill,todayBill,getOpenBill,getDayBill
}
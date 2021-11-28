import http from '../axios/config'

const getBill = () => {
    return http('','get','bill/get')
}
const getBillInForDay = () => {
    return http('','get','/bill/getinforday')
}
const getBillOutForDay = () => {
    return http('','get','/bill/getoutforday')
}

export{
    getBill,getBillInForDay,getBillOutForDay
}
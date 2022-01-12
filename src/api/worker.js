import http from '../axios/config'

const getWorker=function (){
    return http('','get','worker/all',)
}

const getWorkPay = () => {
    return http('','get','/worker/getPay',)
}
const getWorkTest = () => {
    return http('','get','/worker/gettext',)
}
const getWw = () => {
    return http('','get','/worker/getWw',)
}
export{
    getWorker,getWorkPay,getWorkTest,getWw,
}
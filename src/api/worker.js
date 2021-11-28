import http from '../axios/config'

const getWorker=function (){
    return http('','get','worker/get',)
}

const getWorkPay = () => {
    return http('','get','/worker/getPay',)
}
const getWorkTest = () => {
    return http('','get','/worker/gettext',)
}

export{
    getWorker,getWorkPay,getWorkTest
}
import http from '../axios/config'

const getWorker=function (){
    return http('','get','worker/get',)
}

export{
    getWorker,
}
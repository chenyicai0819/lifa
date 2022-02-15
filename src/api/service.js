import http from '../axios/config'

const getService=function (){
    return http('','get','service/all',)
}
const pageService=function (data){
    return http('','get','service/page',data)
}

export{
    getService,pageService,
}
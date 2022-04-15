// import http from '../axios/config'

const downloadVipTemplate=function (){
    // return http('','get','file/downloadTemplate')
    return window.open(process.env.VUE_APP_BASE_API+'/file/downloadTemplate')
}

export{
    downloadVipTemplate,
}
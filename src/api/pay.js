import http from '../axios/config'

const alipay=function (data){
    return http('','post','alipay',data)
    // return window.open(process.env.VUE_APP_BASE_API+'/file/downloadTemplate')
}

export {
    alipay
}
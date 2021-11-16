// import qs from "qs";
// import {getCurrentInstance} from "vue";
import http from '../axios/config'

// const proxy = getCurrentInstance().appContext.config.globalProperties
//
// // 获取导航栏接口
// export function getTree(data) {
//     return proxy.$axios.post('tree/get', qs.stringify({
//         data
//     }))
// }

const getTree=function (data){
    return http('get','tree/get',data)
}

export{
    getTree,
}
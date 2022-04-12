import axios from 'axios'
import qs from "qs";
//建立axios的一个实例
var instance = axios.create({
    baseURL:'http://localhost:8082/',//接口本地域名
    // baseURL:'http://8.129.212.155:8082/',//接口服务器域名
    // baseURL:'https://www.fastmock.site/mock/8503c017afa982b32ba0af91cd964ccb/lifa/',//mork接口
    timeout: 6000                                                       //设置超时
})


//------------------- 1、请求拦截器 忽略
instance.interceptors.request.use(function (config) {

    return config;
}, function (error) {
    // 对请求错误作些什么

    return Promise.reject(error);
});

//----------------- 2、响应拦截器 忽略
instance.interceptors.response.use(function (response) {

    return response.data;
}, function (error) {
    // 对响应错误作点什么
    console.log('拦截器报错');
    return Promise.reject(error);
});

/**
 * 使用es6的export default导出了一个函数，导出的函数代替axios去帮咱们请求数据，
 * 函数的参数及返回值以下：
 * @param {Object}headers
 * @param {String} method  请求的方法：get、post、delete、put
 * @param {String} url     请求的url:
 * @param {Object} data    请求的参数
 * @returns {Promise}     返回一个promise对象，其实就至关于axios请求数据的返回值
 */
export default function (headers=null,method, url, data = null) {
    method = method.toLowerCase();
    if (method == 'post') {
        return instance.post(url, qs.stringify(data))
    } else if (method == 'get') {
        return instance.get(url, {headers:headers, params: data })
    } else if (method == 'delete') {
        return instance.delete(url, { params: data })
    }else if(method == 'put'){
        return instance.put(url,data)
    }else{
        console.error('未知的method'+method)
        return false
    }
}
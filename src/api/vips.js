import http from '../axios/config'

const getVips=function (){
    return http('','get','vips/get',)
}
const getVipsType = () => {
  return http('','get','viptype/get')
}
const pageGetVips = (data) => {
    return http('','get','vips/page',data)
}
const allVipsType = () => {
    return http('','get','viptype/all')
}
const getVipsIndex = () => {
    return http('','get','/vips/index')
}
const openCardVips = (data) => {
    return http('','post','/vips/add',data)
}
const outAllVips = () => {
    return http('','get','/vips/out')
}
export{
    getVips,getVipsType,getVipsIndex,allVipsType,openCardVips,pageGetVips,outAllVips
}
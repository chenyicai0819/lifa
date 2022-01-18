import http from '../axios/config'

const getVips=function (){
    return http('','get','vips/get',)
}
const getVipsType = () => {
  return http('','get','viptype/get')
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

export{
    getVips,getVipsType,getVipsIndex,allVipsType,openCardVips,
}
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
const delVipsType = (data) => {
    return http('','post','viptype/del',data)
}
const getDiscountById = (data) => {
    return http('','post','viptype/discount',data)
}
const getVipsIndex = () => {
    return http('','get','vips/index')
}
const openCardVips = (data) => {
    return http('','post','vips/add',data)
}
const outAllVips = () => {
    return http('','get','vips/out')
}
const getNowMoney = (data) => {
    return http('','post','vips/getmoney',data)
}
const upVip = (data) => {
    return http('','post','vips/up',data)
}
const getVipByEvery = (data) => {
    return http('','post','vips/getbyevery',data)
}
const getOneForId = (data) => {
    return http('','post','vips/oneforid',data)
}
export{
    getVips,getVipsType,getVipsIndex,allVipsType,openCardVips,pageGetVips,outAllVips,delVipsType,getNowMoney,
    upVip,getVipByEvery,getOneForId,getDiscountById
}
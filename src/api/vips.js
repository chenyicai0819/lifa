import http from '../axios/config'

const getVips=function (){
    return http('','get','vips/get',)
}
const getVipsType = () => {
  return http('','get','vipstype/get')
}

const getVipsIndex = () => {
    return http('','get','/vips/index')
}

export{
    getVips,getVipsType,getVipsIndex,
}
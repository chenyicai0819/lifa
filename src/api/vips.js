import http from '../axios/config'

const getVips=function (){
    return http('','get','vips/get',)
}
const getVipsType = () => {
  return http('','get','vipstype/get')
}

export{
    getVips,getVipsType
}
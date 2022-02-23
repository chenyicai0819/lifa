import http from '../axios/config'

const upSystem = (data) => {
    return http('','post','/systems/up',data)
}
const getSystem = (data) => {
    return http('','post','/systems/get',data)
}

export {
    upSystem,getSystem,
}
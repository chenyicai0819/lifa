import http from '../axios/config'

const getBill = () => {
    return http('','get','bill/get')
}

export{
    getBill
}
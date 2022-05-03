import http from '../axios/config'

const getAllChat=function (){
    return http('','get','chat/all',)
}
const insertChat=function (data){
    return http('','post','chat/add',data)
}
const pushChat=function (data){
    return http('','post','chat/push',data)
}

export{
    getAllChat,insertChat,pushChat
}
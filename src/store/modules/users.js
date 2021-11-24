const users={
    namespaced: true,
    state: {
        username:'登录',
    },
    mutations: {
        // 定义mutations，用于同步修改状态
        upUsername (state, username) {
            state.username = username
        }
    },
    actions: {
        // 定义actions，用于异步修改状态
        upUsernameActions (context, username) {
            context.commit('upUsername', username)
        }
    },
    getters: {
        // 定义一个getters
        // formatNickname (state) {
        //     return 'Hi ' + state.profile.nickname
        // }
    }
}

export default users

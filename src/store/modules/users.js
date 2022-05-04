const users={
    namespaced: true,
    state: {
        id:0,
        username:'未登录',
        worker1Bonus:0.2,
        worker2Bonus:0.1,
        outURL:'http://localhost:8082/',
        // outURL:'http://8.129.212.155:8082/',
    },
    mutations: {
        // 定义mutations，用于同步修改状态
        upUsername (state, username) {
            state.username = username
        },
        upWorker1Bonus (state, worker1Bonus) {
            state.worker1Bonus = worker1Bonus
        },
        upWorker2Bonus (state, worker2Bonus) {
            state.worker2Bonus = worker2Bonus
        },
        upId (state, id) {
            state.id = id
        },
    },
    actions: {
        // 定义actions，用于异步修改状态
        upUsernameActions (context, username) {
            context.commit('upUsername', username)
        },
        upWorker1BonusActions (context, worker1Bonus) {
            context.commit('upWorker1Bonus', worker1Bonus)
        },
        upWorker2BonusActions (context, worker2Bonus) {
            context.commit('upWorker2Bonus', worker2Bonus)
        },
        upIdActions (context, id) {
            context.commit('upId', id)
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

const workerStore={
    namespaced: true,
    state: {
        ServiceBonus:0,
        ShowBouns:0,
    },
    mutations: {
        // 定义mutations，用于同步修改状态
        upServiceBonus (state, ServiceBonus) {
            state.ServiceBonus = ServiceBonus
        },
        upShowBouns (state, ShowBouns) {
            state.ShowBouns = ShowBouns
        },
    },
    actions: {
        // 定义actions，用于异步修改状态
        upServiceBonusActions (context, ServiceBonus) {
            context.commit('upServiceBonus', ServiceBonus)
        },
        upShowBounsActions (context, ShowBouns) {
            context.commit('upShowBouns', ShowBouns)
        },
    },
    getters: {
        // 定义一个getters
        // formatNickname (state) {
        //     return 'Hi ' + state.profile.nickname
        // }
    }
}

export default workerStore
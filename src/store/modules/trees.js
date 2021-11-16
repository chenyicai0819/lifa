// 用户信息模块(局部模块)
const trees= {
    namespaced: true, // 开启命名空间
    state: {
        menuList: [],
    },
    mutations: {
        // 定义mutations，用于同步修改状态
        upmutations (state, menuList) {
            state.menuList = menuList
        }
    },
    actions: {
        // 定义actions，用于异步修改状态
        updatamutations (context, menuList) {
            context.commit('upmutations', menuList)
        }
    },
    getters: {
        // 定义一个getters
        // formatNickname (state) {
        //     return 'Hi ' + state.profile.nickname
        // }
    }
}


export default trees;
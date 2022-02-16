// 用户信息模块(局部模块)
const trees= {
    namespaced: true, // 开启命名空间
    state: {
        menuList: [],
        menuIndex: '1',
    },
    mutations: {
        // 定义mutations，用于同步修改状态
        upmutations (state, menuList) {
            state.menuList = menuList
        },
        upMenuIndex (state, menuIndex) {
            state.menuIndex = menuIndex
        }
    },
    actions: {
        // 定义actions，用于异步修改状态
        updatamutations (context, menuList) {
            context.commit('upmutations', menuList)
        },
        upMenuIndexAtions (context, menuIndex) {
            context.commit('upMenuIndex', menuIndex)
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
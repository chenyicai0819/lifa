const selectItem= {
    namespaced: true, // 开启命名空间
    state: {
        SERVICEITEM: [{value: "1", label: "洗头"},
            {value: "2", label: "剪发"},
            {value: "3", label: "烫发"},
            {value: "4", label: "染发"},
            {value: "5", label: "洗剪吹"}],
        WORKMANS: [],
        GUESTCOMES: [{value: "1", label: "熟人介绍"},
            {value: "2", label: "路过看到"},
            {value: "3", label: "听说"},
            {value: "4", label: "传单"},
            {value: "5", label: "广告"}],
        COMMODITYS:[],
        VIPTYPES:[],
        CURRENCYTYPE:[{value: "1", label: "收入"},
            {value: "2", label: "支出"},
        ],
        STAFFLEVELS:[{value: "1", label: "首席发型师"},
            {value: "2", label: "总监"},
            {value: "3", label: "特级发型师"},
            {value: "4", label: "高级发型师"},
            {value: "5", label: "技师"},
            {value: "6", label: "助理"},
            {value: "7", label: "学徒"}],
    },
    mutations: {
        // 定义mutations，用于同步修改状态
        upserviceitem (state, value) {
            state.SERVICEITEM = value
        },
        upworkman(state,value){
            state.WORKMANS=value
        },
        upcommoditys(state,value){
            state.COMMODITYS=value
        },
        upviptype(state,value){
            state.VIPTYPES=value
        },
        upstafflevels(state,value){
            state.STAFFLEVELS=value
        },
        upguestcomes(state,value){
            state.GUESTCOMES=value
        },
        upcurrencytype(state,value){
            state.CURRENCYTYPE=value
        },
    },
    actions: {
        // 定义actions，用于异步修改状态
        upserviceitemActions (context, value) {
            context.commit('upserviceitem', value)
        },
        upworkmanActions(context, value){
            context.commit('upworkman', value)
        },
        upcommoditysActions(context, value){
            context.commit('upcommoditys', value)
        },
        upviptypeActions(context, value){
            context.commit('upviptype', value)
        },
        upstafflevelsActions(context, value){
            context.commit('upstafflevels', value)
        },
        upguestcomesActions(context, value){
            context.commit('upguestcomes', value)
        },
        upcurrencytypeActions(context, value){
            context.commit('upcurrencytype', value)
        },
    },
    getters: {
        // 定义一个getters
        // formatNickname (state) {
        //     return 'Hi ' + state.profile.nickname
        // }

    }
}

export default selectItem
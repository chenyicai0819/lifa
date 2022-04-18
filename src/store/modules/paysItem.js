const paysItem={
    namespaced: true,
    state: {
        activeName:'',
        form:{},
        serName:'',
    },
    mutations: {
        // 定义mutations，用于同步修改状态
        upForm (state, form) {
            state.form = form
        },
        upActiveName (state, activeName) {
            state.activeName = activeName
        },
        upSerName (state, serName) {
            state.serName = serName
        },
    },
    actions: {
        upActiveNameActions (context, activeName) {
            context.commit('upActiveName', activeName)
        },
        upFormActions (context, form) {
            context.commit('upForm', form)
        },
        upSerNameActions (context, serName) {
            context.commit('upSerName', serName)
        },
    },
    getters: {
    }
}

export default paysItem
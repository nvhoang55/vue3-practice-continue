export default {
    namespaced: true,
    state: () => ({
        detail: null,
        isLogin: false
    }),
    mutations: {
        login(state, payload)
        {
            state.isLogin = true;
            state.detail = payload.user;
        },
        logout(state)
        {
            state.isLogin = false;
            state.detail = null;
        }
    }
};

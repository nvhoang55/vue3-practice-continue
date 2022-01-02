import {createStore} from "vuex";
import user from "./user";

// Create a new store instance.
const store = createStore({
    state: () => ({
       loading: false,
    }),
    mutations: {
      setLoading(state, payload)
      {
          state.loading = payload.isLoading;
      }
    },
    modules: {
        user
    }
});

export default store;

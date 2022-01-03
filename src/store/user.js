import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {auth} from "../Firebase/setup";
import router from "../router";
import {Notify} from "quasar";

export default {
    namespaced: true,
    // section State
    state: () => ({
        user: null,
        isLogin: false,
        errors: {},
        isAuthReady: false
    }),
    getters: {
        hasError(state)
        {
            return Object.keys(state.errors).length !== 0;
        }
    },
    // section Mutations
    mutations: {
        setUser(state, {user})
        {
            state.user = user;
        },
        setLogin(state, {isLogin})
        {
            state.isLogin = isLogin;
        },
        setErrors(state, {errors})
        {
            state.errors = errors;
        },
        setIsAuthReady(state, {isAuthReady})
        {
            state.isAuthReady = isAuthReady;
        }
    },
    actions: {
        // section Register
        async register({commit, state}, {email, password})
        {
            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) =>
                {
                    // Signed in then save user to store
                    commit("setUser", {user: userCredential.user});
                    commit("setLogin", {isLogin: true});

                    // Redirect
                    router.replace({name: "Home"});
                    // Notify
                    Notify.create({
                        message: `Welcome new user, ${state.user.email}`,
                        position: "top",
                        class: "text-lg",
                        timeout: 2000
                    });
                })
                .catch((error) =>
                {
                    // Email is existed
                    if (error.code === "auth/email-already-in-use")
                    {
                        commit("setErrors", {errors: {email: ["This email is already taken. Please try another email."]}});
                    }
                });
        },
        // section Login
        async login({commit, state}, {email, password})
        {
            await signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) =>
                {
                    // Signed in then save user to store
                    commit("setUser", {user: userCredential.user});
                    commit("setLogin", {isLogin: true});

                    // Redirect
                    router.replace({name: "Home"});
                    // Notify
                    Notify.create({
                        message: `Welcome back, ${state.user.email}`,
                        position: "top",
                        class: "text-lg",
                        timeout: 2000
                    });

                })
                .catch((error) =>
                {
                    // Wrong credential
                    if (error.code === "auth/wrong-password")
                    {
                        commit("setErrors", {errors: {email: ["Wrong email or password. Please try again. "]}});
                    }
                });
        },
        // section Logout
        async logout({commit})
        {
            await signOut(auth)
                .then(async () =>
                {
                    // Sign-out successful.
                    commit("setLogin", {isLogin: false});
                    commit("setUser", {user: null});

                    // Redirect
                    await router.replace({name: "Home"})
                        .then(() =>
                        {
                            // Notify
                            Notify.create({
                                message: `Goodbye, see you soon.`,
                                position: "top",
                                class: "text-lg",
                                timeout: 2000
                            });
                        });

                })
                .catch((error) =>
                {
                    // An error happened.
                });
        },
        // section Check auth
        async checkAuthState({commit})
        {
            // onAuthStateChanged return unsub function
            const unsub = await onAuthStateChanged(auth, async (user) =>
            {
                if (user)
                {
                    commit("setUser", {user});
                    commit("setLogin", {isLogin: true});
                }
                else
                {
                    // User is signed out
                    commit("setLogin", {isLogin: false});
                    commit("setUser", {user: null});
                }

                commit("setIsAuthReady", {isAuthReady: true});
                unsub();
            });
        }
    }
};

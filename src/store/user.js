import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {auth} from "../Firebase/setup";

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
        async register(context, {email, password})
        {
            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) =>
                {
                    // Signed in then save user to store
                    context.commit("setUser", {user: userCredential.user});
                    context.commit("setLogin", {isLogin: true});
                })
                .catch((error) =>
                {
                    // Email is existed
                    if (error.code === "auth/email-already-in-use")
                    {
                        context.commit("setErrors", {errors: {email: ["This email is already registered. Please try another email."]}});
                    }
                });
        },
        // section Login
        async login(context, {email, password})
        {
            await signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) =>
                {
                    // Signed in then save user to store
                    context.commit("setUser", {user: userCredential.user});
                    context.commit("setLogin", {isLogin: true});
                })
                .catch((error) =>
                {
                    // Wrong credential
                    if (error.code === "auth/wrong-password")
                    {
                        context.commit("setErrors", {errors: {email: ["Wrong email or password. Please try again. "]}});
                    }
                });
        },
        // section Logout
        async logout(context)
        {
            await signOut(auth)
                .then(() =>
                {
                    // Sign-out successful.
                    context.commit("setLogin", {isLogin: false});
                    context.commit("setUser", {user: null});
                })
                .catch((error) =>
                {
                    // An error happened.
                });
        },
        // section Check auth
        async checkAuthState(context)
        {
            // onAuthStateChanged return unsub function
            const unsub = await onAuthStateChanged(auth, async (user) =>
            {
                if (user)
                {
                    context.commit("setUser", {user});
                    context.commit("setLogin", {isLogin: true});
                }
                else
                {
                    // User is signed out
                    await context.dispatch("logout");
                    context.commit("setLogin", {isLogin: false});
                }

                context.commit("setIsAuthReady", {isAuthReady: true});
                unsub();
            });
        }
    }
};

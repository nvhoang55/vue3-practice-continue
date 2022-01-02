import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {auth} from "../Firebase/setup";

export default {
    namespaced: true,
    state: () => ({
        user: null,
        isLogin: false,
        errors: {}
    }),
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
        }
    },
    actions: {
        async register(context, {email, password})
        {
            // Reset errors each time login
            context.commit("setErrors", {errors: {}});
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
        async login(context, {email, password})
        {
            // Reset errors each time login
            context.commit("setErrors", {errors: {}});
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
        }
    }
};

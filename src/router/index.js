import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import UpdateProfile from "../views/UpdateProfile.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/register",
        name: "Register",
        component: Register
    },
    {
        path: "/update-profile",
        name: "UpdateProfile",
        component: UpdateProfile
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes // short for `routes: routes`
});

export default router;

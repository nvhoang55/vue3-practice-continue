import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import UpdateProfile from "../views/UpdateProfile.vue";
import NotFound from "../views/NotFound.vue";

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
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFound
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes // short for `routes: routes`
});

export default router;

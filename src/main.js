import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//Firebase
import "./Firebase/setup";
//WindiCSS
import "virtual:windi.css";
//Vuestic
import {VuesticPlugin} from "vuestic-ui";
import "vuestic-ui/dist/vuestic-ui.css";

createApp(App)
    .use(router)
    .use(store)
    .use(VuesticPlugin)
    .mount("#app");

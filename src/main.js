import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//Firebase
import "./Firebase/setup";
//WindiCSS
import "virtual:windi.css";
import 'virtual:windi-devtools'
// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
// Quasar
import {Notify, Quasar} from "quasar";
import "quasar/dist/quasar.css";
//Animations from Animate.css:
import "animate.css";

createApp(App)
    .use(Quasar, {
        plugins: {
            Notify
        }
    })
    .use(router)
    .use(store)
    .mount("#app");

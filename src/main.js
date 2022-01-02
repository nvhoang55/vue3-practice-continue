import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//Firebase
import "./Firebase/setup";
//WindiCSS
import "virtual:windi.css";
//Vuestic
import {Quasar} from "quasar";
// Import icon libraries
import "@quasar/extras/roboto-font/roboto-font.css";
// Import Quasar css
import "quasar/dist/quasar.css";
//Animations from Animate.css:
import 'animate.css';

createApp(App)
    .use(Quasar)
    .use(router)
    .use(store)
    .mount("#app");

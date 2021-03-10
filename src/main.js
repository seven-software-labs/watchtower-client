import { createApp } from "vue";
import App from "./App.vue";
import Router from "./router";
import Store from "./store";
import "./assets/app.css";
import RegisterComponents from "./register-components";
import RegisterMixins from "./register-mixins";
import RegisterPlugins from "./register-plugins";

const app = createApp(App);

RegisterComponents(app);
RegisterMixins(app);
RegisterPlugins(app);

app.use(Router);
app.use(Store);
app.mount("#app");

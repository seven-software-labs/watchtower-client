import { createApp } from "vue";
import App from "./App.vue";
import Router from "./router";
import Store from "./store";
import "./assets/app.css";
import RegisterComponents from "./register-components";
import "./register-plugins";

const app = createApp(App);
app.use(Router);
app.use(Store);
app.mount("#app");
RegisterComponents(app);

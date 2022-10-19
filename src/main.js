import App from "./App.vue";
import { createApp } from "vue";
import VueKeyboard from "./VueKeyboardPlugin";

const app = createApp(App);
app.use(VueKeyboard);
app.mount("#app");

import { VueKeyboard } from "./components";

export default {
  install: (app, options) => {
    app.component("VueKeyboard", VueKeyboard);
  },
};

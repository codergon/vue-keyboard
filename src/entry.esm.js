import component from "./VueKeyboard.vue";

export default /*#__PURE__*/ (() => {
  // Get component instance
  const installable = component;

  // Attach install function executed by Vue.use()
  installable.install = app => {
    app.component("VueTailwindDatepicker", installable);
  };
  return installable;
})();

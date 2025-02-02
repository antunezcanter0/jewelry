import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { i18n } from "./plugins/i18n";
import FlagIcon from "vue-flag-icon";

Vue.config.productionTip = false;
Vue.use(FlagIcon);

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount("#app");

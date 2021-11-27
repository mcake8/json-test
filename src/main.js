import Vue from "vue";
import App from "@src//App.vue";
import router from "@src//router";
import store from "@src/store";
import api from "@api";
import mdiVue from "mdi-vue/v2";
import * as mdijs from "@mdi/js";

Vue.config.productionTip = false;
Vue.prototype.$api = api;

Vue.use(mdiVue, {
  icons: mdijs,
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

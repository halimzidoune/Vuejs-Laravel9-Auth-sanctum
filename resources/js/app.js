require('./bootstrap');

import Vue from "vue";
import VueRouter from "vue-router";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";


import App from "./components/App";

import "./globalComponents";

import router from './router';

import VeeValidate from "vee-validate";

import store from "./store";

window.Vue = require('vue').default;

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.use(VueRouter);

Vue.use(VeeValidate, {
  // This is the default
  inject: true,
  // Important to name this something other than 'fields'
  fieldsBagName: "veeFields",
  // This is not required but avoids possible naming conflicts
  errorBagName: "veeErrors",
});

store.dispatch("auth/getUser").then((res) => {
  const app = new Vue({
    el: "#app",
    render: (h) => h(App),
    router,
    store,
  });
});



//resources/js/globalComponents.js
import Vue from "vue";
import App from "./components/App";
Vue.component("App", App);

let currant = new Vue({
    data: {
        $error: false,
        $success: false,
    },
});
Vue.mixin({
    computed: {
        $error: {
            get: function () {
                return currant.$data.$error
            },
            set: function (newVal) {
                currant.$data.$error = newVal;
            }
        },
        $success: {
            get: function () {
                return currant.$data.$success
            },
            set: function (newVal) {
                currant.$data.$success = newVal;
            }
        },
    }
});

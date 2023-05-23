import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
var cesium = require("cesium/Cesium.js");
var widgets = require("cesium//Widgets/widgets.css");
cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiNGNiNTMwMy1iMTM0LTRmNjMtODQ3Zi1mMDEwMTc2N2FmYTkiLCJpZCI6MTM0NTEzLCJpYXQiOjE2ODE5MTAzOTJ9.tiKWDatrDzITuelBgU6GOGvDC9i8Uw-UVWE_2kQmTD4";

Vue.prototype.cesium = cesium;
Vue.prototype.widgets = widgets;

new Vue({
  render: (h) => h(App),
}).$mount("#app");

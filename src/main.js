import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import VueCarousel from "vue-carousel"

const firebase = require("firebase/app")
require("firebase/database")
firebase.initializeApp({
  apiKey: "AIzaSyDz-_4sx0LHmaifJHbaSDy2ctzpX1O7p3Q",
  authDomain: "apollo-studio-web.firebaseapp.com",
  databaseURL: "https://apollo-studio-web.firebaseio.com",
  projectId: "apollo-studio-web",
  storageBucket: "apollo-studio-web.appspot.com",
  messagingSenderId: "114376737455",
})

Vue.use(VueCarousel)

Vue.config.productionTip = false
Vue.axios = Vue.prototype.axios = require("axios")
Vue.fb = Vue.prototype.fb = firebase

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app")

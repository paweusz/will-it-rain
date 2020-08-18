import Vue from 'vue'
import App from './App.vue'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css' // Re-uses images from ~leaflet package
import 'leaflet'
import 'leaflet-defaulticon-compatibility'
import axios from "axios"
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.prototype.$axios = axios.create({
  baseURL: "/api"
})

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

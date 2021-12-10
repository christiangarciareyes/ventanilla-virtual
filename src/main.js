import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import VueSession from 'vue-session'
Vue.use(VueSession)

import Vuetable from 'vuetable-2'
Vue.use(Vuetable)

import VueResource from 'vue-resource'
Vue.use(VueResource)

import VModal from 'vue-js-modal'
Vue.use(VModal)

import VueClip from 'vue-clip'
Vue.use(VueClip)

import JsonExcel from "vue-json-excel";
Vue.component("downloadExcel", JsonExcel);

/*
import Notify from 'vue-notifyjs'
Vue.use(Notify)
*/

import Notifications from 'vue-notification'
import velocity from 'velocity-animate'
Vue.use(Notifications, { velocity })

import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/css/bootstrap.min.css'

import VueTabs from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'
Vue.use(VueTabs)

import VueTheMask from 'vue-the-mask'
Vue.use(VueTheMask)

import LightBootstrap from './globalOficina'

import routes from './routes/routes'
Vue.use(VueRouter)
Vue.use(LightBootstrap)

import store from './store'

const router = new VueRouter({
  routes,
  linkActiveClass: 'nav-item active'
})

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})

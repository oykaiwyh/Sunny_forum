import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import axios from 'axios'
import VueRouter from 'vue-router'
import '@/util/veevalidate/veevalidate.js'
// import '@/util/veevalidate/veevalidate-i18n.js'
import Alert from '@/components/modules/alert'
import Pop from '@/components/modules/pop'
// axios.defaults.baseURL = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : ''
import filters from '@/util/dateconfig/index'
import directives from '@/util/directives'

// Vue.filter('moment', formDate)
Object.keys(filters).forEach(item => {
  Vue.filter(item, filters[item])
})

// directives
Object.keys(directives).forEach(item => {
  Vue.directive(item, directives[item])
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Alert)
Vue.use(Pop)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

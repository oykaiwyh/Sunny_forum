import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载
// 组件中定义name值需要对应的webpackChunkName的值
const Login = () => import( /* webpackChunkName: "login" */ '../views/Login.vue')
const Register = () => import( /* webpackChunkName: "register" */ '../views/Register.vue')
const Reset = () => import( /* webpackChunkName: "reset" */ '../views/Reset.vue')


Vue.use(VueRouter)
const routes = [{
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    component: Register,
    beforeEnter: (to, from, next) => {
      if (from.name === 'Login') {
        next()
      } else {
        next('/login')
      }
    }
  }, {
    path: '/reset',
    name: 'Reset',
    component: Reset
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

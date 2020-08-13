import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载
// 组件中定义name值需要对应的webpackChunkName的值
const Login = () => import( /* webpackChunkName: "login" */ '@/views/Login.vue')
const Register = () => import( /* webpackChunkName: "register" */ '@/views/Register.vue')
const Reset = () => import( /* webpackChunkName: "reset" */ '@/views/Reset.vue')
const Home = () => import( /* webpackChunkName: "home" */ '@/views/Home.vue')
const Index = () =>
  import( /* webpackChunkName: 'index' */ '@/views/changes/index.vue')
const Template = () =>
  import( /* webpackChunkName: 'itemplate' */ '@/views/changes/Template.vue')

Vue.use(VueRouter)
const routes = [{
    path: '/',
    // name: 'home',
    component: Home,
    children: [{
      path: '',
      component: Index
    }, {
      path: '/index/:catalog',
      name: 'catalog',
      component: Template
    }, ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if (from.name === 'login') {
        next()
      } else {
        next('/login')
      }
    }
  },


  {
    path: '/reset',
    name: 'Reset',
    component: Reset
  },
]

const router = new VueRouter({
  //   linkActiveClass: 'layui-this', // 包含
  linkExactActiveClass: 'layui-this', // 完全匹配
  routes
})

export default router

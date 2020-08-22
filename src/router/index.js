import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载
// 组件中定义name值需要对应的webpackChunkName的值
const Login = () => import( /* webpackChunkName: "login" */ '../views/Login.vue')
const Register = () => import( /* webpackChunkName: "register" */ '../views/Register.vue')
const Reset = () => import( /* webpackChunkName: "reset" */ '../views/Reset.vue')
const Home = () => import( /* webpackChunkName: "Home" */ '../views/Home.vue')

const Index = () =>
  import( /* webpackChunkName: 'index' */ '@/views/changes/index.vue')
const Template = () =>
  import( /* webpackChunkName: 'itemplate' */ '@/views/changes/Template.vue')
const Center = () =>
  import( /* webpackChunkName: 'itemplate' */ '@/views/Center.vue')

Vue.use(VueRouter)
const routes = [{
    path: '/',
    // name: 'Home',
    component: Home,
    children: [{
      path: '',
      name: 'index',
      component: Index
    }, {
      path: '/index/:catalog',
      name: 'catalog',
      component: Template
    }, ]
  },
  {
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
  }, {
    path: '/center',
    name: 'Center',
    component: Center
  },
]

const router = new VueRouter({
  mode: 'history',
  //   linkActiveClass: 'layui-this', // 包含
  linkExactActiveClass: 'layui-this', // 完全匹配
  routes
})

export default router

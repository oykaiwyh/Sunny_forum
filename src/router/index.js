import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载
// 组件中定义name值需要对应的webpackChunkName的值
const Login = () => import( /* webpackChunkName: "login" */ '../views/Login.vue')
const Register = () => import( /* webpackChunkName: "register" */ '../views/Register.vue')
const Reset = () => import( /* webpackChunkName: "reset" */ '../views/Reset.vue')
const Home = () => import( /* webpackChunkName: "Home" */ '../views/Home.vue')
const Index = () => import( /* webpackChunkName: 'index' */ '@/views/changes/index.vue')
const Template = () => import( /* webpackChunkName: 'itemplate' */ '@/views/changes/Template.vue')
const Center = () => import( /* webpackChunkName: 'Center' */ '@/views/Center.vue')
const User = () => import( /* webpackChunkName: 'User' */ '@/views/User.vue')
const Selfcenter = () => import( /* webpackChunkName: 'selfcenter' */ '@/components/user/selfcenter.vue')
const Settings = () => import( /* webpackChunkName: 'user-settings' */ '@/components/user/Settings.vue')
const Posts = () => import( /* webpackChunkName: 'user-posts' */ '@/components/user/Posts.vue')
const Others = () => import( /* webpackChunkName: 'user-others' */ '@/components/user/Others.vue')
const Msg = () => import( /* webpackChunkName: 'user-msg' */ '@/components/user/Msg.vue')

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
  },
  {
    path: '/user/:uid',
    name: 'User',
    props: true,
    component: User
  },
  {
    path: '/center',
    // name: 'Center',
    component: Center,
    linkActiveClass: 'layui-this', // 完全匹配
    children: [{
        path: '',
        name: 'Center',
        component: Selfcenter
      }, {
        path: 'set',
        name: 'set',
        component: Settings
      }, {
        path: 'other',
        name: 'others',
        component: Others
      }, {
        path: 'post',
        name: 'post',
        component: Posts
      }, {
        path: 'msg',
        name: 'msg',
        component: Msg
      },

    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  //   linkActiveClass: 'layui-this', // 包含
  linkExactActiveClass: 'layui-this', // 完全匹配
  routes
})

export default router

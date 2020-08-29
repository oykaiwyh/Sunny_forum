import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
import jwt from 'jsonwebtoken'
// import moment from 'moment' //包太大
import moment from 'dayjs'

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

const MyInfo = () => import( /* webpackChunkName: 'info' */ '@/components/user/common/MyInfo.vue')
const PicUpload = () => import( /* webpackChunkName: 'uploadpic' */ '@/components/user/common/PicUpload.vue')
const Passwd = () => import( /* webpackChunkName: 'password' */ '@/components/user/common/Passwd.vue')
const Accounts = () => import( /* webpackChunkName: 'accounts' */ '@/components/user/common/Accounts.vue')
const MyPost = () => import( /* webpackChunkName: 'mypost' */ '@/components/user/common/MyPost.vue')
const MyCollection = () => import( /* webpackChunkName: 'mycollection' */ '@/components/user/common/MyCollection.vue')
const NotFind = () => import( /* webpackChunkName: 'notfind' */ '@/views/NotFind.vue')

Vue.use(VueRouter)
// 解决相同路由跳转问题
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};


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
    meta: {
      requireAuth: true
    },
    linkActiveClass: 'layui-this', // 完全匹配
    children: [{
        path: '',
        name: 'Center',
        component: Selfcenter
      }, {
        path: 'set',
        // name: 'set',
        component: Settings,
        children: [{
            path: '',
            name: 'info',
            component: MyInfo
          },
          {
            path: 'pic',
            name: 'pic',
            component: PicUpload
          },
          {
            path: 'passwd',
            name: 'passwd',
            component: Passwd
          },
          {
            path: 'account',
            name: 'account',
            component: Accounts
          }
        ]
      }, {
        path: 'other',
        name: 'others',
        component: Others
      }, {
        path: 'post',
        // name: 'post',
        component: Posts,
        children: [{
            path: '',
            name: 'mypost',
            component: MyPost
          },
          {
            path: 'mycollection',
            name: 'mycollection',
            component: MyCollection
          }
        ]
      }, {
        path: 'msg',
        name: 'msg',
        component: Msg
      },

    ]
  },
  {
    path: "/404",
    component: NotFind
  }, {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  //   linkActiveClass: 'layui-this', // 包含
  linkExactActiveClass: 'layui-this', // 完全匹配
  routes
})

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  const token = localStorage.getItem('token')
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))



  if (token !== '' && token !== null) {
    const payload = jwt.decode(token)
    // console.log(payload);
    // console.log(moment().isBefore(moment(payload.exp * 1000)));
    if (moment().isBefore(moment(payload.exp * 1000))) {
      store.commit("setIslogin", true);
      store.commit("setToken", token);
      store.commit("setUserInfo", userInfo);
    } else {
      localStorage.clear()
    }
  }
  if (to.matched.some(record => record.meta.requireAuth)) {
    //用户需要登录的页面
    const {
      isLogin
    } = store.state
    if (isLogin) {
      //权限的判断
      next()
    } else {
      next({
        name: 'Login'
      })
    }
  } else {
    //用户不需要登录的页面
    next()
  }


})

export default router

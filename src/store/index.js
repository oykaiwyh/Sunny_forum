import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sid: '',
    isLogin: false,
    token: '',
    userInfo: {}
  },
  mutations: {
    setSid(state, value) {
      state.sid = value
    },
    //设置用户的基本信息
    setUserInfo(state, value) {
      state.userInfo = value
    },
    //设置用户的基本信息
    setIslogin(state, value) {
      state.isLogin = value
    },
  },
  actions: {},
  modules: {}
})

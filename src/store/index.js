import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sid: '',
    isLogin: false,
    isHide: false, //显示需登录组件状态
    token: '',
    userInfo: {}
  },
  mutations: {
    setSid(state, value) {
      state.sid = value
    },
    setToken(state, value) {
      state.token = value
      localStorage.setItem("token", value);

    },
    //设置用户的基本信息
    setUserInfo(state, value) {
      if (value === '') return
      state.userInfo = value
      //   sessionStorage.setItem("setUserInfo", JSON.stringify(res.data));
      localStorage.setItem("userInfo", JSON.stringify(value)); // 清除当前域的数据localStorage.clear()
    },
    //设置用户的基本信息
    setIslogin(state, value) {
      state.isLogin = value
    },
    // 设置container的状态
    setHide(state, value) {
      state.isHide = value
    },
  },
  actions: {},
  modules: {}
})

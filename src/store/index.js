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
  },
  actions: {},
  modules: {}
})

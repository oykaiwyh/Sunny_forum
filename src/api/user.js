import axios from '@/util/axios/axiosrequest'
import store from '@/store/index'
import qs from 'qs'


//用户签到
const userSign = () => {
  //   //定义header
  //   const headers = {
  //     Authorization: 'Bearer ' + store.state.token,
  //     'Content-Type': 'applications/json'
  //   }
  return axios.get('/user/fav')
}

// 更新用户基本资料
const updateUserInfo = (data) => axios.post('/user/basic', data)

// 确认修改用户名
const updateUsername = (data) => {
  return axios.get('/public/resetEmail?' + qs.stringify(data))
}

// 修改用户密码
const changePasswd = (data) => {
  return axios.post('/user/changePassword', data)
}


export {
  userSign,
  updateUserInfo,
  updateUsername,
  changePasswd
}

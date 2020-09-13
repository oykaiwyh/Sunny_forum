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

// 设置取消/收藏
const addCollect = (data) => axios.get('/user/setCollect?' + qs.stringify(data))

// 获取收藏列表
const getCollect = (data) => axios.get('/user/collect?' + qs.stringify(data))

// 获取发表的文章列表
const getPostListByUid = (data) => axios.get('/user/post?' + qs.stringify(data))

// 删除指定的文章
const deletePostByUid = (data) => axios.get('/user/deletePost?' + qs.stringify(data))

// 获取用户的基本信息
const getInfo = (data) => axios.get('/public/info?' + qs.stringify(data))



export {
  userSign,
  updateUserInfo,
  updateUsername,
  changePasswd,
  addCollect,
  getCollect,
  getPostListByUid,
  deletePostByUid,
  getInfo
}

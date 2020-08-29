import axios from '@/util/axios/axiosrequest'
import store from '@/store/index'



//用户签到
const userSign = () => {
  //   //定义header
  //   const headers = {
  //     Authorization: 'Bearer ' + store.state.token,
  //     'Content-Type': 'applications/json'
  //   }
  return axios.get('/user/fav')
}



export {
  userSign,
}

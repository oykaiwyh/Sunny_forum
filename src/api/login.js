import axios from '@/util/axios/axiosrequest'
// const getCode = async () => {
//   let result = ''
//   try {
//     result = await axios.get('/getCaptcha')
//     if (result.status) {
//       return result.data
//     }
//   } catch (error) {
//     console.log('getCaptcha error', error);
//   }
//   return result
// }

/**
 * 验证码
 * @param {*} sid 唯一标识
 */
// 封装axios改写
const getCode = (sid) => {
  //   return axios.get('/getCaptcha?sid=' + sid)
  return axios.get('/getCaptcha', {
    params: {
      sid
    }
  })
}
// const reset = async (options) => {
//   console.log(options);

//   let result = ''
//   try {
//     result = await axios.post('/reset', {
//       ...options
//     })
//     if (result.status) {
//       return result.data
//     }
//   } catch (error) {
//     console.log('reset error', error);
//   }
//   return result
// }

/**
 * 忘记密码
 * @param {*} options 用户信息(邮箱，验证码)
 */
// 封装改写
const reset = (options) => {
  return axios.post('/reset', {
    ...options
  })
}


/**
 * 登录提交
 * @param {*} options 用户信息(邮箱，验证码，密码等)
 */
// 封装改写
const login = (options) => {
  return axios.post('/login', {
    ...options
  })
}

/**
 * 注册提交
 * @param {*} options 注册用户信息(邮箱，验证码，密码等)
 */
// 封装改写
const register = (options) => {
  return axios.post('/register', {
    ...options
  })
}

export {
  getCode,
  reset,
  login,
  register
}

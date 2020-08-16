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
// 封装axios改写
const getCode = () => {
  return axios.get('/getCaptcha')
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

// 封装改写
const reset = (options) => {
  return axios.post('/reset', {
    ...options
  })
}

export {
  getCode,
  reset
}

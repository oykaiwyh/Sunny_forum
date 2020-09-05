import axios from '@/util/axios/axiosrequest'
import qs from 'qs'

/**
 * 读取文章列表
 * @param {Object} options 读取文章列表接口参数
 */
const getList = (options) => {
  // return axios.get('/public/list',{
  //     params:{
  //         catalog:options.catalog
  //     }
  // })
  // qs的引用 字符串的转换
  //   console.log('ssssss', options);
  return axios.get('/public/list?', +qs.stringify(options))
}
// 温馨提醒
const getTips = () => {
  return axios.get('/public/tips')
}

// 本周热议
const getTop = () => {
  return axios.get('/public/topWeek')
}

// 友情链接
const getLinks = () => {
  return axios.get('/public/links')
}

// 图片上传
const uploadImg = (formData) => {
  //   console.log(formData);
  //   自定义headers头部,但是在对axios封装的时候需要对头部的配置 config 参数
  //   const config = {
  //     headers: {
  //       token: 'xxx'
  //     }
  //   }
  //   return axios.post('/content/upload', formData, config)
  return axios.post('/content/upload', formData)
}



export {
  getList,
  getTips,
  getTop,
  getLinks,
  uploadImg
}

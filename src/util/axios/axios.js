/**
 * 封装axios得请求，返回重新封装得数据格式
 * 对错误得统一处理
 */
import axios from 'axios'
import config from '@/config'
import errorHandle from './errorHandle'

const instance = axios.create({
  baseURL: process.env.NODE_ENV == 'development' ? config.baseURL.dev : config.baseURL.pro,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  timeout: 10000,
  //   withCredentials:true  //请求带上cookie
});

// 请求拦截器 Add a request interceptor
instance.interceptors.request.use((config) => {
  // Do something before request is sent
  console.log('config', config);
  return config;
}, (error) => {
  // Do something with request error
  errorHandle(error)
  return Promise.reject(error);
});

// 响应请求得拦截器 Add a response interceptor 
instance.interceptors.response.use((res) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  console.log('cc', res);

  if (res.status === 200) {
    // return Promise.resolve(res.data)
    return res.data
  } else {
    return Promise.reject(res)
  }
  //   return response;
}, (error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  debugger
  errorHandle(error)
  return Promise.reject(error);
});


export default instance

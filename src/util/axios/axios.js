/**
 * 封装axios得请求，返回重新封装得数据格式
 * 对错误得统一处理
 */
import axios from 'axios'
import config from '@/config'
import errorHandle from './errorHandle'

const CancelToken = axios.CancelToken // 定义取消token

// class改写

class HttpRequest {
  constructor(baseURL) {
    this.baseURL = baseURL
    this.cancelapi = {}

  }
  // 获取axios配置
  getInsideConfig() {
    const config = {
      baseUrl: this.baseURL,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      timeout: 10000,
    }
    return config
  }

  removeRequest(key, isRequest = false) {
    if (this.cancelapi[key] && isRequest) {
      this.cancelapi[key]('取消重复请求')
    }
    // console.log('  this.cancelapi[key]', this.cancelapi);
    // console.log(' delete this.cancelapi[key]', delete this.cancelapi[key]);
    delete this.cancelapi[key]
  }

  // 设定拦截器
  interceptors(instance) {

    // 请求拦截器 Add a request interceptor
    instance.interceptors.request.use((config) => {
      // Do something before request is sent
      //   console.log('config', config);

      config.cancelToken = new CancelToken((c) => {
        //   c >>> 是一个可执行的函数，当成形参传递了 
        //  即 c相当于clearTime(timer) 里的timer ，即请求
        // An executor function receives a cancel function as a parameter
        // cancel = c;
        let key = config.url + '&' + config.method
        this.removeRequest(key, true)
        this.cancelapi[key] = c
      })


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

      let key = res.config.url + '&' + res.config.method
      this.removeRequest(key)

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
      errorHandle(error)
      return Promise.reject(error);
    });

  }

  //创建实例
  request(optinos) {
    const instance = axios.create()
    const newOptions = Object.assign(this.getInsideConfig(), optinos)
    this.interceptors(instance)
    // return instance.request(newOptions)
    return instance(newOptions)
  }
  get(url, config) {
    const options = Object.assign({
      method: 'get',
      url: url
    }, config)
    return this.request(options)
  }
  post(url, data) {
    const options = Object.assign({
      method: 'post',
      url: url,
      data: data
    })
    return this.request(options)
  }

}



export default HttpRequest

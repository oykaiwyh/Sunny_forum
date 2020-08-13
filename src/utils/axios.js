// 封装axios的请求，返回重新封装的数据格式
// 对错误的统一处理
import axios from 'axios'
import errorHandle from './errorHandle'
const CancelToken = axios.CancelToken

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    // 取消请求存储
    this.cancelapi = {}
  }
  // 获取axios配置
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      timeout: 10000
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
    // 请求拦截器
    instance.interceptors.request.use((config) => {
      // Do something before request is sent
      config.cancelToken = new CancelToken((c) => {
        //   c >>> 是一个可执行的函数，当成形参传递了 
        //  即 c相当于clearTime(timer) 里的timer ，即请求
        // An executor function receives a cancel function as a parameter
        // cancel = c;
        let key = config.url + '&' + config.method
        this.removeRequest(key, true)
        this.cancelapi[key] = c
      })
      return config
    }, (err) => {
      // debugger
      errorHandle(err)
      // Do something with request error
      return Promise.reject(err)
    })

    // 响应请求的拦截器
    instance.interceptors.response.use((res) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      let key = res.config.url + '&' + res.config.method
      this.removeRequest(key)
      if (res.status === 200) {
        return Promise.resolve(res.data)
      } else {
        return Promise.reject(res)
      }
    }, (err) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      // debugger
      errorHandle(err)
      return Promise.reject(err)
    })
  }
  // 创建实例
  request(options) {
    const instance = axios.create()
    const newOptions = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)
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
    return this.request({
      method: 'post',
      url: url,
      data: data
    })
  }
}

export default HttpRequest

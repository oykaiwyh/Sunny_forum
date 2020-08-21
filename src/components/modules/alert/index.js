import AlertComponent from './Alert.vue'

const Alert = {}
Alert.install = function (Vue, options) {

  const AlertConstructor = Vue.extend(AlertComponent)
  const instance = new AlertConstructor()
  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)


  //   // 1. 添加全局方法或 property
  //   Vue.myGlobalMethod = function () {
  //     // 逻辑...
  //   }

  //   // 2. 添加全局资源
  //   Vue.directive('my-directive', {
  //     bind(el, binding, vnode, oldVnode) {
  //       // 逻辑...
  //     }
  //   })

  //   // 3. 注入组件选项
  //   Vue.mixin({
  //     created: function () {
  //       // 逻辑...
  //     }
  //   })

  // 4. 添加实例方法
  Vue.prototype.$alert = function (msg) {
    // 逻辑...
    instance.type = 'alert'
    instance.msg = msg
    instance.isShow = true
  }
  Vue.prototype.$confirm = function (msg, success, cancel) {
    // 逻辑...
    instance.type = 'confirm'
    instance.msg = msg
    instance.isShow = true
    if (typeof success !== 'undefined') {
      instance.success = success
    }
    if (typeof success !== 'undefined') {
      instance.cancel = cancel
    }

  }
}

export default Alert

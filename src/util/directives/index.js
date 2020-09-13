import {
  escapeHtml
} from '@/util/escapeHtml'

export default {
  'richtext': {
    bind: function (el, binding, vnode) {
      // console.log("bind-el",el);
      // console.log("bind-binding",binding);
      // console.log("bind-vnode",vnode);
      el.innerHTML = escapeHtml(binding.value)
    },
    componentUpdated: function (el, binding, vnode) {
      el.innerHTML = escapeHtml(binding.value)
    }
  }
}

import {
  getCode
} from '@/api/login'
import {
  ValidationProvider,
  ValidationObserver
} from "vee-validate";
import uuid from "uuid/dist/v4"; // 产生随机签名

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      code: '',
      svg: ''
    }
  },
  mounted() {
    let sid = ''
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid')
    } else {
      sid = uuid()
      localStorage.setItem('sid', sid)
    }
    this.$store.commit('setSid', sid)
    this._getCode()
  },
  methods: {
    _getCode() {
      let sid = this.$store.state.sid
      getCode(sid).then((res) => {
        if (res.code === 200) {
          this.svg = res.data
        }
      })
    }
  }
}

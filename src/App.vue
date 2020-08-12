<template>
  <div id="app">
    <div class="layui-container">
      <form class="layui-form layui-form-pane" action>
        <div class="layui-form-item" :class="{ 'form-group--error': $v.name.$error }">
          <label class="layui-form-label">用户名</label>
          <div class="layui-input-inline">
            <!-- <input
              type="text"
              name="title"
              v-model.trim="$v.name.$model"
              required
              lay-verify="required"
              placeholder="请输入标题"
              autocomplete="off"
              class="layui-input"
            />-->
            <input
              type="text"
              name="title"
              v-model.trim="name"
              @input="setName($event.target.value)"
              required
              lay-verify="required"
              placeholder="请输入标题"
              autocomplete="off"
              class="layui-input"
            />
          </div>
          <div class="error layui-form-mid" v-if="!$v.name.required">用户名不能为空</div>
          <div class="error layui-form-mid" v-if="!$v.name.email">用户名格式错误</div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">密码</label>
          <div class="layui-input-block">
            <input
              type="password"
              v-model="password"
              name="title"
              required
              lay-verify="required"
              placeholder="请输入标题"
              autocomplete="off"
              class="layui-input"
            />
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">验证码</label>
          <div class="layui-input-inline">
            <input
              type="text"
              name="title"
              v-model="code"
              required
              lay-verify="required"
              placeholder="请输入标题"
              autocomplete="off"
              class="layui-input"
            />
          </div>
          <div class="layui-form-mid svg" v-html="svg" @click="getCaptcha"></div>
        </div>
        <button type="button" class="layui-btn" @click="checkFrom">立即登录</button>
        <a class="sunny-link" href="http://www.layui.com">忘记密码</a>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { required, minLength, email } from "vuelidate/lib/validators";
export default {
  name: "app",
  data() {
    return {
      svg: "",
      name: "",
      password: "",
      code: "",
      errorMessage: []
    };
  },
  validations: {
    name: {
      required,
      email: minLength(4)
    },
    password: {
      required
    },
    code: {
      required
    }
  },
  mounted() {
    this.getCaptcha();
  },
  methods: {
    setName(value) {
      this.name = value;
      this.$v.name.$touch();
    },
    getCaptcha() {
      axios.get("http://localhost:3000/getcaptcha").then(res => {
        //   console.log(res);
        if (res.status == 200) {
          let obj = res.data;
          if (obj.code === 200) {
            this.svg = obj.data;
          }
        }
      });
    },
    checkFrom() {
      this.errorMessage = [];
      if (!this.name) {
        this.errorMessage.push("登录名为空！");
      }
      if (!this.password) {
        this.errorMessage.push("密码为空！");
      }
      if (!this.code) {
        this.errorMessage.push("验证码为空！");
      }
      console.log(this.errorMessage);
    }
  }
};
</script>

<style lang="scss" scoped>
#app {
  background: #f2f2f2;
}
.layui-container {
  background: #fff;
}
input {
  width: 190px;
}
.sunny-link {
  margin-left: 10px;
  // & sunny-link
  &:hover {
    color: #009688;
  }
}
.svg {
  position: relative;
  top: -15px;
}
.error {
  display: none;
}
.form-group--error {
  .error {
    display: block;
  }
}
</style>

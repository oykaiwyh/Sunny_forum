<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">登入</li>
          <li>
            <router-link :to="{name:'Register'}">注册</router-link>
          </li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
          <validation-observer ref="observer" v-slot="{validate}">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <form method="post">
                  <div class="layui-form-item">
                    <label for="L_email" class="layui-form-label">用户名</label>
                    <validation-provider name="email" rules="required|email" v-slot="{errors}">
                      <div class="layui-input-inline">
                        <input
                          type="text"
                          name="username"
                          v-model="username"
                          placeholder="请输入用户名"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00;">{{errors[0]}}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <label for="L_pass" class="layui-form-label">密码</label>
                    <validation-provider name="password" rules="required|min:6" v-slot="{errors}">
                      <div class="layui-input-inline">
                        <input
                          type="password"
                          name="password"
                          v-model="password"
                          placeholder="请输入密码"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00;">{{errors[0]}}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <validation-provider
                      name="code"
                      ref="procode"
                      rules="required|length:4"
                      v-slot="{errors}"
                    >
                      <div class="layui-row">
                        <label for="L_vercode" class="layui-form-label">人类验证</label>
                        <div class="layui-input-inline">
                          <input
                            type="text"
                            name="code"
                            v-model="code"
                            placeholder="请输入验证码"
                            autocomplete="off"
                            class="layui-input"
                          />
                        </div>
                        <div class="layui-form-mid">
                          <!-- <span style="color: #c00;">{{d.vercode}}</span> -->
                          <span style="color: #c00;" v-html="svg" @click="_getCode" class="svg"></span>
                        </div>
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00;">{{errors[0]}}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <button
                      class="layui-btn"
                      lay-filter="*"
                      lay-submit
                      @click="validate().then(submit)"
                      type="button"
                    >立即登录</button>
                    <span style="padding-left:20px;">
                      <router-link :to="{name:'forget'}">忘记密码</router-link>
                    </span>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者使用社交账号登入</span>
                    <a
                      href
                      onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
                      class="iconfont icon-qq"
                      title="QQ登入"
                    ></a>
                    <a
                      href
                      onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
                      class="iconfont icon-weibo"
                      title="微博登入"
                    ></a>
                  </div>
                </form>
              </div>
            </div>
          </validation-observer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCode, login } from "@/api/login.js";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import uuid from "uuid/dist/v4"; // 产生随机签名
export default {
  name: "login",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      username: "",
      password: "",
      code: "",
      svg: ""
    };
  },
  mounted() {
    // window.vue = this;
    let sid = "";
    if (localStorage.getItem("sid")) {
      sid = localStorage.getItem("sid");
    } else {
      sid = uuid();
      localStorage.setItem("sid", sid);
    }
    this.$store.commit("setSid", sid);
    this._getCode();
  },
  methods: {
    _getCode() {
      let sid = this.$store.state.sid;
      getCode(sid).then(res => {
        if (res.code === 200) {
          this.svg = res.data;
        }
      });
    },
    async submit() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        return;
      }
      login({
        username: this.username,
        password: this.password,
        code: this.code,
        sid: this.$store.state.sid //vuex 的数据是存在内存的 ， 从store里取比较快
      })
        .then(res => {
          if (res.code === 200) {
            //存储用户名
            res.data.username = this.username;

            this.$store.commit("setIslogin", true);
            this.$store.commit("setToken", res.token);
            this.$store.commit("setUserInfo", res.data);
            this.username = "";
            this.password = "";
            this.code = "";
            requestAnimationFrame(() => {
              //   console.log(this.$refs);
              this.$refs.observer ? this.$refs.observer.reset() : "";
            });
            this.$router.push({ name: "index" });
          } else if (res.code === 404) {
            this.$refs.procode.setErrors([res.msg]);
          } else if (res.code === 401) {
            this.$refs.procode.setErrors([res.msg]);
          }
        })
        // .catch(({ response }) => {
        .catch(error => {
          //   console.log(response);
          const { data } = error.response;
          if (data.code === 500) {
            this.$alert("用户名密码校验失败，请重新输入！");
          } else {
            this.$alert("NetWork ERROR！");
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.svg {
  position: relative;
  top: -10px;
}
</style>
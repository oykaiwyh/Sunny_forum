<template>
  <transition name="fade">
    <div
      class="layui-layer layui-layer-page layui-layer-border edit-content"
      v-show="isShow"
      ref="wrapper"
    >
      <div class="layui-layer-title">插入图片</div>
      <div class="layui-layer-content">
        <ul class="layui-form layui-form-pane">
          <li class="layui-form-item">
            <label class="layui-form-label">URL</label>
            <div class="layui-input-inline">
              <input
                type="text"
                id="fileInput"
                placeholder="粘贴图片地址或者点击上传"
                v-model="pic"
                class="layui-input"
              />
            </div>
            <button type="button" class="layui-btn layui-btn-primary">
              <label for="uploadImg">
                <i class="layui-icon layui-icon-upload"></i>上传图片
              </label>
            </button>
            <input
              type="file"
              name="file"
              id="uploadImg"
              class="layui-upload-file"
              @change="upload"
            />
          </li>
          <li class="layui-form-item">
            <button type="button" class="layui-btn" @click="submit()">确认</button>
          </li>
        </ul>
      </div>
      <span class="layui-layer-setwin" @click.stop="close()">
        <a href="javascript:void(0)" class="layui-layer-ico layui-layer-close layui-layer-close1"></a>
      </span>
    </div>
  </transition>
</template>

<script>
import { uploadImg } from "@/api/content";
import config from "@/config";
export default {
  name: "imgUpload",
  props: ["isShow", "ctrl"],
  data() {
    return {
      pic: "",
      formData: ""
    };
  },
  mounted() {
    this.$nextTick(() => {
      //   document.querySelector("body").addEventListener("click", e => {
      //     this.handleOtherClick(e);
      //   });
      document
        .querySelector("body")
        .addEventListener("click", this.handleOtherClick);
    });
  },
  beforeDestroy() {
    document
      .querySelector("body")
      .removeEventListener("click", this.handleOtherClick);
  },
  methods: {
    handleFaceClick(item) {
      this.$emit("addEvent", item);
    },
    handleOtherClick(e) {
      // 触发隐藏本组件的关闭事件
      //判断是否点击到了非控制Icon以外的地方 + 本组件的地方
      e.stopPropagation(); //防止事件冒泡
      if (typeof this.ctrl === "undefined") {
        return;
      }
      if (
        !(this.ctrl.contains(e.target) || this.$refs.wrapper.contains(e.target))
      ) {
        this.$emit("closeEvent");
        this.pic = "";
        this.formData = "";
      }
    },
    close() {
      this.$emit("closeEvent");
      this.pic = "";
      this.formData = "";
    },
    upload(e) {
      let file = e.target.files;
      let formData = new FormData();
      if (file.length > 0) {
        formData.append("file", file[0]);
        this.formData = formData;
      }
      uploadImg(formData).then(res => {
        if (res.code === 200) {
          const baseUrl =
            process.env.NODE_ENV === "production"
              ? config.baseUrl.pro
              : config.baseUrl.dev;
          this.pic = baseUrl + res.data;
        }
        document.getElementById("uploadImg").value = "";
      });
    },
    submit() {
      if (this.pic === "") {
        document.getElementById("fileInput").focus();
        this.$pop("shake", "请上传图片或输入地址");
        return;
      }
      this.$emit("addEvent", this.pic);
      setTimeout(() => {
        //   恢复初始的状态
        this.pic = "";
        this.formData = "";
        this.$emit("closeEvent");
      }, 0);
    }
  }
};
</script>

<style lang="scss" scoped>
.layui-form-item {
  text-align: center;
}
.layui-form-pane {
  margin: 20px;
}
</style>
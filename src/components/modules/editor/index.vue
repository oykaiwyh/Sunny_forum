<template>
  <div class="edit-wrap">
    <div class="layui-form-item layui-form-text">
      <div class="layui-input-block">
        <div class="layui-unselect fly-edit" ref="icons">
          <!-- 表情 -->
          <span @click="()=>{this.faceStatus= !this.faceStatus}">
            <i class="iconfont icon-yxj-expression"></i>
          </span>
          <span @click="()=>{this.imgStatus= !this.imgStatus}">
            <i class="iconfont icon-tupian"></i>
          </span>
          <span @click="()=>{this.linkStatus= !this.linkStatus}">
            <i class="iconfont icon-lianjie"></i>
          </span>
          <span class="quote" @click="choose(3)">”</span>
          <span @click="choose(4)">
            <i class="iconfont icon-emwdaima"></i>
          </span>
          <span @click="addHr()">hr</span>
          <span @click="choose(6)">
            <i class="iconfont icon-yulan1"></i>
          </span>
        </div>
        <textarea class="layui-textarea fly-editor" name="content"></textarea>
      </div>
      <div ref="modal">
        <face
          :isShow="faceStatus"
          :ctrl="this.$refs.face"
          @closeEvent="()=>{this.faceStatus=false}"
        ></face>
        <img-upload
          :isShow="imgStatus"
          :ctrl="this.$refs.img"
          @closeEvent="()=>{this.imgStatus=false}"
        ></img-upload>
        <link-add
          :isShow="linkStatus"
          :ctrl="this.$refs.link"
          @closeEvent="()=>{this.linkStatus=false}"
        ></link-add>
      </div>
    </div>
  </div>
</template>

<script>
import Face from "./Face";
import ImgUpload from "./imgUpload";
import LinkAdd from "./LinkAdd";
export default {
  name: "Editor",
  components: {
    Face,
    ImgUpload,
    LinkAdd
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
  data() {
    return {
      faceStatus: false,
      imgStatus: false,
      linkStatus: false
    };
  },
  methods: {
    handleOtherClick(e) {
      // 触发隐藏本组件的关闭事件
      //判断是否点击到了非控制Icon以外的地方 + 本组件的地方
      e.stopPropagation(); //防止事件冒泡
      if (
        !(
          this.$refs.icons.contains(e.target) ||
          this.$refs.modal.contains(e.target)
        )
      ) {
        this.faceStatus = false;
        this.imgStatus = false;
        this.linkStatus = false;
      }
    },
    choose() {
      //   this.faceStatus = !this.faceStatus;
      this.imgStatus = !this.imgStatus;
    }
  }
};
</script>

<style lang="scss">
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes bounceOut {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.7);
  }
}
.fade-leave-active {
  animation: bounceOut 0.3s;
}
.fade-enter-active,
.fade-enter-to {
  animation: bounceIn 0.3s;
}

.fly-editor {
  height: 260px;
}
.quote {
  font-size: 22px;
  vertical-align: middle;
  position: relative;
  top: 4px;
}
.edit-wrap {
  position: relative;
}
.edit-content {
  position: absolute;
  top: 45px;
  left: 0;
  z-index: 100;
  background: #fff;
}
.icon-emwdaima {
  position: relative;
  top: 2px;
}
.layui-layer-prompt {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
</style>

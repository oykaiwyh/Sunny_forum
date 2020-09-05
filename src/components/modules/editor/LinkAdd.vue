<template>
  <transition name="fade">
    <div class="layui-layer-page layui-layer-prompt edit-content" v-show="isShow" ref="wrapper">
      <div class="layui-layer-title">请输入合法链接</div>
      <div class="layui-layer-content">
        <input type="text" class="layui-layer-input" id="linkInput" v-model="link" />
      </div>
      <span class="layui-layer-setwin" @click="cancel()">
        <a href="javascript:void(0)" class="layui-layer-ico layui-layer-close layui-layer-close1"></a>
      </span>
      <div class="layui-layer-btn">
        <a class="layui-layer-btn0" @click.prevent="submit()">确定</a>
        <a class="layui-layer-btn" @click.prevent="cancel()">取消</a>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "linkadd",
  props: ["isShow", "ctrl"],
  data() {
    return {
      link: ""
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
        this.cancel();
      }
    },
    submit() {
      if (this.link === "") {
        document.getElementById("linkInput").focus();
        this.$pop("shake", "请输入合法的链接");
        return;
      }
      this.$emit("addEvent", this.link);
      setTimeout(() => {
        this.link = "";
        this.$emit("closeEvent");
      }, 0);
    },
    cancel() {
      this.$emit("closeEvent");
      this.link = "";
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
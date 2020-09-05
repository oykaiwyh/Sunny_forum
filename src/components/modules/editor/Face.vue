<template>
  <transition name="fade">
    <div class="layui-layer-tips layui-edit-face edit-content" v-show="isShow">
      <div class="layui-layer-content">
        <ul class="layui-clear">
          <li v-for="(value, key) in lists" :key="key" @click="handleFaceClick(key)">
            <img :src="value" />
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import faces from "@/assets/js/face";
export default {
  name: "face",
  props: ["isShow"],
  data() {
    return {
      lists: faces
    };
  },
  methods: {
    handleFaceClick(item) {
      this.$emit("addEvent", item);
      this.$emit("closeEvent");
    },
    handleOtherClick(e) {
      // 触发隐藏本组件的关闭事件
      //判断是否点击到了非控制Icon以外的地方
      e.stopPropagation(); //防止事件冒泡
      if (typeof this.ctrl === "undefined") {
        return;
      }
      if (!this.ctrl.contains(e.target)) {
        this.$emit("closeEvent");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
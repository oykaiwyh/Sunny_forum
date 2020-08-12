<template>
  <div id="app">
    <sunny-header />
    <router-view />
    <sunny-footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "app",
  components: {
    "sunny-header": Header,
    "sunny-footer": Header
  }
};
</script>

<style lang="scss" scoped>
@import "assets/layui/css/layui.css";
@import "assets/css/global.css";
@import "assets/layui/css/modules/layer/default/layer.css";
</style>

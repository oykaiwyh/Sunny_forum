<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8">
        <sunny-list />
      </div>
      <div class="layui-col-md4">
        <sunny-hotlist />
        <sunny-ads />
        <sunny-links />
      </div>
    </div>
  </div>
</template>

<script>
import Panel from "@/components/Panel";
import Ads from "@/components/sidebar/Ads";
import HotList from "@/components/sidebar/HotList";
import Links from "@/components/sidebar/Links";
import Sign from "@/components/sidebar/Sign";
import List from "@/components/contents/List";

export default {
  name: "itemplate",
  components: {
    "sunny-list": List,
    "sunny-panel": Panel,
    "sunny-ads": Ads,
    "sunny-hotlist": HotList,
    "sunny-links": Links
  }
};
</script>

<style lang="scss" scoped>
</style>
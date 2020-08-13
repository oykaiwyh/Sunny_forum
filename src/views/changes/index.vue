<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8">
        <sunny-top />
        <sunny-list />
      </div>
      <div class="layui-col-md4">
        <sunny-tips />
        <sunny-ads />
        <sunny-hotlist />
        <sunny-sign />
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
import Tips from "@/components/sidebar/Tips";
import List from "@/components/contents/List";
import Top from "@/components/contents/Top";
export default {
  name: "index",
  components: {
    "sunny-panel": Panel,
    "sunny-ads": Ads,
    "sunny-hotlist": HotList,
    "sunny-links": Links,
    "sunny-sign": Sign,
    "sunny-tips": Tips,
    "sunny-list": List,
    "sunny-top": Top
  }
};
</script>

<style lang="scss" scoped>
</style>
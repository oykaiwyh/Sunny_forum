<template>
  <div class="layui-container fly-marginTop fly-user-main">
    <ul class="layui-nav layui-nav-tree" lay-filter="test">
      <!-- 侧边导航: <ul class="layui-nav layui-nav-tree layui-nav-side"> -->
      <li
        class="layui-nav-item layui-nav-itemed"
        v-for="(item,index) in lists"
        :key="'center'+index"
      >
        <a href>
          <i class="iconforum" :class="item.icon"></i>
          {{item.name}}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Center",
  data() {
    return {
      lists: [
        {
          name: "我的主页",
          icon: "icon-home"
        },
        {
          name: "基本设置",
          icon: "icon-Settingscontroloptions"
        },
        {
          name: "我的贴子",
          icon: "icon-doc"
        },
        {
          name: "我的消息",
          icon: "icon-message"
        },
        {
          name: "其它设置",
          icon: "icon-Settingscontroloptions"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/ali_icon/iconfont.css";
.iconforum {
  margin-right: 10px;
}
</style>
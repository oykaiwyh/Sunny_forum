<template>
  <div>
    <div class="panel">
      <div class="layui-container">
        <ul>
          <li>
            <a href>2</a>
          </li>
          <li>
            <a href>2</a>
          </li>
          <li>
            <a href>2</a>
          </li>
          <li>
            <a href>2</a>
          </li>
          <li>
            <a href>2</a>
          </li>
          <li>
            <a href>2</a>
          </li>
          <li>
            <a href>2</a>
          </li>
          <li class="layui-hide-xs">
            <span class="line"></span>
          </li>
          <li class="layui-hide-xs">
            <a href>3</a>
          </li>
          <li class="layui-hide-xs">
            <a href>3</a>
          </li>
        </ul>
        <div class="right layui-hide-xs">
          <span class="layui-icon layui-icon-search"></span>
          <a class="layui-btn">aa</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>

<style lang="scss" scoped>
//最大宽度，即小于768生效
// @media (max-width: 768px) and (min-width: 400px){  //这是一个区间的样式
@media (max-width: 768px) {
  .panel {
    height: auto !important;
  }
  ul {
    li {
      width: 33.3%;
    }
  }
}
.panel {
  position: relative;
  height: 50px;
  line-height: 50px;
  margin-bottom: 15px;
  border-radius: 2px;
  background: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
ul {
  li {
    display: inline-block;
    a {
      padding: 0 20px;
    }
  }
  .line {
    display: inline-block;
    height: 10px;
    width: 1px;
    background: #e2e2e2;
    vertical-align: middle;
    margin: 0 20px;
  }
}
.right {
  position: absolute;
  top: 0;
  right: 0;
  .layui-icon-search {
    margin-right: 10px;
    font-size: 20px;
    &:hover {
      color: #5fb878;
      cursor: pointer;
    }
  }
}
</style>
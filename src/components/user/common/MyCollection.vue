<template>
  <div>
    <table class="layui-table">
      <thead>
        <tr>
          <th class="title">
            <div class="layui-table-cell pl0">
              <span>帖子标题</span>
            </div>
          </th>
          <th>
            <div class="layui-table-cell text-right pr0">
              <span>收藏时间</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in list" :key="'mycollect' + index">
          <td class="title">
            <router-link class="link" :to="{name: 'detail', params: {tid: item.tid}}">{{item.title}}</router-link>
          </td>
          <td class="text-right">{{item.created | moment}}</td>
        </tr>
      </tbody>
    </table>
    <sunny-page
      v-show="total > 1"
      :total="total"
      :current="current"
      :align="'left'"
      :hasTotal="true"
      :hasSelect="true"
      @changeCurrent="handleChange"
    ></sunny-page>
  </div>
</template>

<script>
import { getCollect } from "@/api/user";
import Page from "@/components/modules/pagination/index";

export default {
  name: "my-collection",
  components: {
    "sunny-page": Page
  },
  data() {
    return {
      list: [],
      total: 0,
      current: 0,
      page: 0,
      limit: 10
    };
  },
  mounted() {
    this.getCollectList();
  },
  methods: {
    getCollectList() {
      getCollect({
        page: this.current,
        limit: this.limit
      }).then(res => {
        if (res.code === 200) {
          this.list = res.data;
          this.total = res.total;
        } else {
          this.$pop("shake", res.msg);
        }
      });
    },
    handleChange(val) {
      this.current = val;
      this.getCollectList();
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  width: 70%;
}
</style>

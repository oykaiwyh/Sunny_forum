<template>
  <div class="layui-container">
    <sunny-panel></sunny-panel>
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8 content detail">
        <div class="fly-panel detail-box">
          <h1>{{page.title}}</h1>
          <div class="fly-detail-info">
            <!-- <span class="layui-badge">审核中</span> -->
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-if="page.catalog==='logs'"
            >动态</span>
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog==='share'"
            >分享</span>
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog==='ask'"
            >提问</span>
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog==='advise'"
            >建议</span>
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog==='discuss'"
            >交流</span>
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog==='notice'"
            >公告</span>

            <span
              class="layui-badge"
              style="background-color: #999;"
              v-if="parseInt(page.isEnd)===0"
            >未结</span>
            <span v-else class="layui-badge" style="background-color: #5FB878;">已结</span>

            <span class="layui-badge layui-bg-black">置顶</span>
            <span class="layui-badge layui-bg-red">精帖</span>

            <!-- <div class="fly-admin-box" data-id="123">
              <span class="layui-btn layui-btn-xs jie-admin" type="del">删除</span>

              <span
                class="layui-btn layui-btn-xs jie-admin"
                type="set"
                field="stick"
                rank="1"
                v-show="page.isTop==='1'"
              >置顶</span>

              <span
                class="layui-btn layui-btn-xs jie-admin"
                type="set"
                field="status"
                rank="1"
                v-for="(tag,index) in page.tags"
                :key="'tags'+index"
                :class="tag.class"
              >{{tag.name}}</span>
            </div>-->
            <span class="fly-list-nums">
              <a href="#comment">
                <i class="iconfont" title="回答">&#xe60c;</i>
                {{page.answer}}
              </a>
              <i class="iconfont" title="人气">&#xe60b;</i>
              {{page.reads}}
            </span>
          </div>
          <!-- 作者信息 -->
          <div class="detail-about">
            <a class="fly-avatar" href="../user/home.html">
              <img :src="page.uid?page.uid.pic:'/img/bear-200-200.jpg'" />
            </a>
            <div class="fly-detail-user">
              <a href="../user/home.html" class="fly-link">
                <cite>{{page.uid?page.uid.name:'Undefind'}}</cite>
                <!-- <i class="iconfont icon-renzheng" title="认证信息"></i> -->
                <i
                  class="layui-badge fly-badge-vip mr1"
                  v-if="page.uid && page.uid.isVip!=='0'?page.uid.isVip:false"
                >{{page.uid.isVip}}</i>
              </a>
              <span>{{page.created | moment}}</span>
            </div>
            <div class="detail-hits" id="LAY_jieAdmin" data-id="123">
              <span style="padding-right: 10px; color: #FF7200">悬赏：{{page.fav}}</span>
            </div>
          </div>
          <div class="layui-btn-container fly-detail-admin pt1">
            <a href class="layui-btn layui-btn-sm jie--admin">编辑</a>
            <a href class="layui-btn layui-btn-sm jie--admin jie-admin-collect">收藏</a>
          </div>
          <div class="detail-body photos" v-html="content"></div>
        </div>
        <!-- 回帖部分 -->
        <div class="fly-panel detail-box" id="flyReply">
          <fieldset class="layui-elem-field layui-field-title" style="text-align: center;">
            <legend>回帖</legend>
          </fieldset>

          <ul class="jieda" id="jieda">
            <li data-id="111" class="jieda-daan">
              <a name="item-1111111111"></a>
              <div class="detail-about detail-about-reply">
                <a class="fly-avatar" href>
                  <img
                    src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg"
                    alt=" "
                  />
                </a>
                <div class="fly-detail-user">
                  <a href class="fly-link">
                    <cite>贤心</cite>
                    <i class="iconfont icon-renzheng" title="认证信息：XXX"></i>
                    <i class="layui-badge fly-badge-vip">VIP3</i>
                  </a>

                  <span>(楼主)</span>
                  <!--
                <span style="color:#5FB878">(管理员)</span>
                <span style="color:#FF9E3F">（社区之光）</span>
                <span style="color:#999">（该号已被封）</span>
                  -->
                </div>

                <div class="detail-hits">
                  <span>2017-11-30</span>
                </div>

                <i class="iconfont icon-caina" title="最佳答案"></i>
              </div>
              <div class="detail-body jieda-body photos">
                <p>香菇那个蓝瘦，这是一条被采纳的回帖</p>
              </div>
              <div class="jieda-reply">
                <span class="jieda-zan zanok" type="zan">
                  <i class="iconfont icon-zan"></i>
                  <em>66</em>
                </span>
                <span type="reply">
                  <i class="iconfont icon-svgmoban53"></i>
                  回复
                </span>
                <div class="jieda-admin">
                  <span type="edit">编辑</span>
                  <span type="del">删除</span>
                  <!-- <span class="jieda-accept" type="accept">采纳</span> -->
                </div>
              </div>
            </li>

            <li data-id="111">
              <a name="item-1111111111"></a>
              <div class="detail-about detail-about-reply">
                <a class="fly-avatar" href>
                  <img
                    src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg"
                    alt=" "
                  />
                </a>
                <div class="fly-detail-user">
                  <a href class="fly-link">
                    <cite>贤心</cite>
                  </a>
                </div>
                <div class="detail-hits">
                  <span>2017-11-30</span>
                </div>
              </div>
              <div class="detail-body jieda-body photos">
                <p>蓝瘦那个香菇，这是一条没被采纳的回帖</p>
              </div>
              <div class="jieda-reply">
                <span class="jieda-zan" type="zan">
                  <i class="iconfont icon-zan"></i>
                  <em>0</em>
                </span>
                <span type="reply">
                  <i class="iconfont icon-svgmoban53"></i>
                  回复
                </span>
                <div class="jieda-admin">
                  <span type="edit">编辑</span>
                  <span type="del">删除</span>
                  <span class="jieda-accept" type="accept">采纳</span>
                </div>
              </div>
            </li>

            <!-- 无数据时 -->
            <!-- <li class="fly-none">消灭零回复</li> -->
          </ul>
          <sunny-page
            :showType="'icon'"
            :hasSelect="true"
            :showEnd="true"
            :total="total"
            :size="size"
            :current="current"
            @changeCurrent="changeCurrent"
          ></sunny-page>
          <div class="layui-form layui-form-pane">
            <form>
              <validation-observer ref="observer" v-slot="{ validate }">
                <sunny-editor></sunny-editor>
                <div class="layui-form-item">
                  <validation-provider
                    name="code"
                    ref="codefield"
                    rules="required|length:4"
                    v-slot="{errors}"
                  >
                    <div class="layui-row">
                      <label for="L_vercode" class="layui-form-label">验证码</label>
                      <div class="layui-input-inline">
                        <input
                          type="text"
                          name="code"
                          v-model="code"
                          placeholder="请输入验证码"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                      <div class>
                        <span class="svg" style="color: #c00;" @click="_getCode()" v-html="svg"></span>
                      </div>
                    </div>
                    <div class="layui-form-mid">
                      <span style="color: #c00;">{{errors[0]}}</span>
                    </div>
                  </validation-provider>
                </div>
                <div class="layui-form-item">
                  <button class="layui-btn" type="button" @click="validate().then(submit)">提交回复</button>
                </div>
              </validation-observer>
            </form>
          </div>
        </div>
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
import Ads from "@/components/sidebar/Ads";
import HotList from "@/components/sidebar/HotList";
import Links from "@/components/sidebar/Links";
import Panel from "@/components/Panel";
import Editor from "@/components/modules/editor/index";
import CodeMix from "@/mixin/code";
import Page from "@/components/modules/pagination/index";
import { getDetail } from "@/api/content";
import { getComents } from "@/api/comments";
import { escapeHtml } from "@/util/escapeHtml";

export default {
  name: "detail",
  mixins: [CodeMix],
  props: ["tid"],
  components: {
    "sunny-ads": Ads,
    "sunny-hotlist": HotList,
    "sunny-links": Links,
    "sunny-panel": Panel,
    "sunny-editor": Editor,
    "sunny-page": Page
  },
  data() {
    return {
      code: "",
      total: 101,
      size: 15,
      current: 6,
      page: {},
      comments: [],
      editInfo: {
        content: "",
        code: "",
        sid: ""
      }
    };
  },
  mounted() {
    this.getPostDetail();
    this.getCommentsList();
  },
  computed: {
    content() {
      if (typeof this.page.content === "undefined") {
        return "";
      }
      if (this.page.content.trim() === "") {
        return "";
      }
      return escapeHtml(this.page.content);
    }
  },
  methods: {
    changeCurrent(val) {
      this.current = val;
    },
    getPostDetail() {
      getDetail(this.tid).then(res => {
        if (res.code === 200) {
          this.page = res.data;
        }
      });
    },
    getCommentsList() {
      getComents({
        tid: this.tid,
        page: this.current,
        limit: this.size
      }).then(res => {
        // if (res.code === 200) {
        //   this.comments = res.data
        //   this.total = res.total
        // }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.fly-detail-admin {
  text-align: right;
  border-top: 1px dotted #eaeaea;
  background: #f8f8f8;
}

.fly-detail-info {
  span {
    margin-right: 5px;
  }
}

.fly-admin-box {
  margin-left: 0;
  margin-top: 15px;
}

.jieda-body {
  margin: 25px 0 20px !important;
}
</style>
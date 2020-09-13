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
            <router-link
              class="layui-btn layui-btn-sm jie--admin"
              :to="{name:'edit',params:{tid:tid,page:page}}"
              v-show="page.isEnd==='0'"
            >编辑</router-link>
            <a
              class="layui-btn layui-btn-sm jie--admin jie-admin-collect"
              :class="{'layui-btn-primary': page.isFav}"
              @click="setCollect"
            >{{page.isFav?'取消收藏':'收藏'}}</a>
          </div>
          <div class="detail-body photos" v-html="content"></div>
        </div>
        <!-- 回帖部分 -->
        <div class="fly-panel detail-box" id="flyReply">
          <fieldset class="layui-elem-field layui-field-title" style="text-align: center;">
            <legend>回帖</legend>
          </fieldset>
          <ul class="jieda" id="jieda">
            <li class="jieda-daan" v-for="(item,index) in comments" :key="'comments'+index">
              <div class="detail-about detail-about-reply">
                <a class="fly-avatar" href>
                  <img :src="item.cuid?item.cuid.pic:'/img/bear-200-200.jpg'" />
                </a>
                <div class="fly-detail-user">
                  <a href class="fly-link">
                    <cite>{{item.cuid?item.cuid.name:'Undefined'}}</cite>
                    <i
                      class="layui-badge fly-badge-vip"
                      v-if="item.cuid&&item.cuid.isVip!=='0'?item.cuid.isVip:false"
                    >VIP{{item.cuid.isVip}}</i>
                  </a>

                  <span v-if="index===0">(楼主)</span>
                  <!--
                <span style="color:#5FB878">(管理员)</span>
                <span style="color:#FF9E3F">（社区之光）</span>
                <span style="color:#999">（该号已被封）</span>
                  -->
                </div>

                <div class="detail-hits">
                  <span>{{item.created | moment}}</span>
                </div>

                <i class="iconfont icon-caina" title="最佳答案" v-show="item.isBest === '1'"></i>
              </div>
              <div class="detail-body jieda-body photos" v-richtext="item.content"></div>
              <div class="jieda-reply">
                <span
                  class="jieda-zan"
                  :class="{'zanok':item.handed==='1'}"
                  type="zan"
                  @click="hands(item)"
                >
                  <i class="iconfont icon-zan"></i>
                  <em>{{item.hands}}</em>
                </span>
                <span type="reply" @click="reply(item)">
                  <i class="iconfont icon-svgmoban53"></i>
                  回复
                </span>
                <div class="jieda-admin">
                  <span
                    v-show="page.isEnd==='0'&& User && item.cuid._id === User._id"
                    @click="editComment(item)"
                  >编辑</span>
                  <!-- <span type="del">删除</span> -->
                  <span
                    class="jieda-accept"
                    @click="setBest(item)"
                    v-show="page.isEnd==='0'&& User && page.uid && page.uid._id === User._id"
                  >采纳</span>
                </div>
              </div>
            </li>
            <!-- 无数据时 -->
            <li class="fly-none" v-if="comments.length===0">消灭零回复</li>
          </ul>
          <sunny-page
            v-show="comments.length > 0 && total > 0"
            :showType="'icon'"
            :hasSelect="true"
            :hasTotal="true"
            :showEnd="true"
            :total="total"
            :size="size"
            :current="current"
            @changeCurrent="changeCurrent"
            @changeLimit="changeLimit"
          ></sunny-page>
          <div class="layui-form layui-form-pane">
            <form>
              <validation-observer ref="observer" v-slot="{ validate }">
                <sunny-editor @changeContent="addContent" :initContent="editInfo.content"></sunny-editor>
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
import { addCollect } from "@/api/user";
import {
  getComents,
  addComment,
  updateComment,
  setCommentBest,
  setHands
} from "@/api/comments";
import { escapeHtml } from "@/util/escapeHtml";
import { scrollToElem } from "@/util/common";

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
      total: 0,
      size: 10,
      current: 0,
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
    // window.vue = scrollToElem;
    this.getPostDetail();
    this.getCommentsList();
  },
  watch: {
    tid(newval, oldval) {
      this.getPostDetail();
      this.getCommentsList();
    }
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
    },
    User() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    //   有重复请求事件---待解决
    changeCurrent(val) {
      this.current = val;
      this.getCommentsList();
    },
    changeLimit(val) {
      this.size = val;
      this.getCommentsList();
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
        if (res.code === 200) {
          this.comments = res.data;
          this.total = res.total;
        }
      });
    },
    addContent(val) {
      this.editInfo.content = val;
    },
    // 提交评论
    async submit() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        return;
      }
      //   用户未登录
      const isLogin = this.$store.state.isLogin;
      if (!isLogin) {
        this.$pop("shake", "请先登录");
        return;
      }

      //   用户禁言状态判断
      const user = this.$store.state.userInfo;
      if (user.status !== "0") {
        this.$pop("shake", "用户已经禁言,请联系管理员");
        return;
      }

      this.editInfo.code = this.code;
      this.editInfo.sid = this.$store.state.sid;
      this.editInfo.tid = this.tid;

      // 获取评论用户的信息：图片、昵称、vip
      const cuid = {
        _id: user._id,
        pic: user.pic,
        name: user.name,
        isVip: user.isVip
      };

      if (
        typeof this.editInfo.cid !== "undefined" &&
        this.editInfo.cid !== ""
      ) {
        const obj = { ...this.editInfo };
        delete obj["item"];

        // 判断用户是否修改了内容
        if (this.editInfo.content === this.editInfo.item.content) {
          this.$pop("shake", "确定编辑了内容~~~");
          return;
        }

        // 更新评论
        updateComment(obj).then(res => {
          if (res.code === 200) {
            const temp = this.editInfo.item;
            temp.content = this.editInfo.content;
            this.$pop("shake", "更新评论成功");
            this.code = "";
            this.editInfo.content = "";
            res.data.cuid = cuid;

            // 方法一，只用更新特定的一条的content created， $set
            // 方法二，更新整个数组中的这一条
            this.comments.splice(
              this.comments.indexOf(this.editInfo.item),
              1,
              temp
            );
          } else {
            this.$pop("shake", res.msg);
          }
        });
        return;
      }

      // 添加评论
      addComment(this.editInfo).then(res => {
        if (res.code === 200) {
          this.$pop("shake", "发表评论成功");
          const user = this.$store.state.userInfo;
          //   const cuid = {
          //     _id: user._id,
          //     pic: user.pic,
          //     name: user.name,
          //     isVip: user.isVip
          //   };
          res.data.cuid = cuid;
          //   新增评论到页面
          this.comments.push(res.data);
          // 清空评论内容
          this.code = "";
          this.editInfo.content = "";
          requestAnimationFrame(() => {
            //   console.log(this.$refs);
            this.$refs.observer ? this.$refs.observer.reset() : "";
          });
          //   刷新验证码
          this._getCode();
        } else if (res.code === 500) {
          this.$pop("shake", res.msg);
        }
      });
    },
    // 编辑评论
    editComment(item) {
      this.editInfo.content = item.content;
      //   动态滚动到输入框的位置
      scrollToElem(".layui-input-block", 500, -65);
      document.getElementById("edit").focus();
      //确定需要编辑的记录
      this.editInfo.cid = item._id;
      this.editInfo.item = item;
    },
    // 采纳
    setBest(item, index) {
      this.$confirm(
        "确定采纳为最佳答案吗？",
        () => {
          // 发送采纳最佳答案请求
          setCommentBest({
            cid: item._id,
            tid: this.tid
          }).then(res => {
            if (res.code === 200) {
              this.$pop("", "设置最佳答案成功！");
              item.isBest = "1";
              this.page.isEnd = "1";
            } else {
              this.$pop("", res.msg);
            }
          });
        },
        () => {}
      );
    },
    // 点赞
    hands(item) {
      setHands({ cid: item._id }).then(res => {
        if (res.code === 200) {
          this.$pop("", "点赞成功");
          item.handed = "1";
          item.hands += 1;
        } else {
          this.$pop("", res.msg);
        }
      });
    },
    // 回复
    reply(item) {
      // 插入@ + name 到 content
      // 滚动页面到输入框
      // focus 输入框
      const reg = /^@[\S]+/g;
      if (this.editInfo.content) {
        if (reg.test(this.editInfo.content)) {
          this.editInfo.content = this.editInfo.content.replace(
            reg,
            "@" + item.cuid.name + " "
          );
        } else {
          if (this.editInfo.content !== "") {
            // 非空的情况
            this.editInfo.content = `@${item.cuid.name} ${this.editInfo.content}`;
          }
        }
      } else {
        // 评论框为空
        this.editInfo.content = "@" + item.cuid.name + " ";
      }

      scrollToElem(".layui-input-block", 500, -65);
      document.getElementById("edit").focus();
    },
    // 收藏
    setCollect() {
      // 设置收藏 & 取消收藏
      const isLogin = this.$store.state.isLogin;
      if (isLogin) {
        const collect = {
          tid: this.tid,
          title: this.page.title,
          isFav: this.page.isFav ? 1 : 0
        };
        addCollect(collect).then(res => {
          if (res.code === 200) {
            this.page.isFav = !this.page.isFav;
            this.$pop("", this.page.isFav ? "设置收藏成功" : "取消收藏成功");
          }
        });
      } else {
        this.$pop("shake", "请先登录后再进行收藏！");
      }
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
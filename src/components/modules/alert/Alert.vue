<template>
  <div v-show="isShow">
    <div class="alert">
      <div class="msg">{{msg}}</div>
      <div v-if="type === 'alert'">
        <div class="btnCommon bg" @click="close()">确定</div>
      </div>
      <div v-else class="btconfirm">
        <div class="btnCommon cancel" @click="cancelEvent()">取消</div>
        <div class="btnCommon bg" @click="okEvent()">确定</div>
      </div>
    </div>
    <div class="mask" @click="closeMash()"></div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "alert"
    },
    msg: {
      type: String,
      default: ""
    },
    isShow: {
      type: Boolean,
      default: false
    },
    cancel: {
      type: Function,
      default: () => {
        console.log("已经cancel");
      }
    },
    success: {
      type: Function,
      default: () => {
        console.log("已经ok");
      }
    }
  },
  methods: {
    close() {
      this.isShow = false;
    },
    closeMash() {
      if (this.type === "alert") {
        this.close();
      }
    },
    cancelEvent() {
      this.cancel();
      this.close();
    },
    okEvent() {
      this.success();
      this.close();
    }
  }
};
</script>

<style lang="scss" scoped>
$btn-main: #009688;
$btn-dark: darken($btn-main, 5%);
.alert {
  width: 300px;
  height: 150px;
  position: fixed;
  background: #fff;
  border-radius: 6px;
  top: 50%;
  left: 50%;
  z-index: 100;
  margin-left: -150px;
  margin-top: -75px;
  padding: 20px 10px;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
.msg {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}
.btconfirm {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 0 10px;
}
.btnCommon {
  width: 105px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  border-radius: 6px;
  cursor: pointer;
  &.bg {
    background: $btn-main;
    color: #fff;
    &:hover {
      background: $btn-dark;
    }
  }
  &.cancel {
    background: #ededed;
    color: #333;
  }
}

.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  left: 0;
  top: 0;
  overflow: hidden;
  z-index: 99;
}
</style>
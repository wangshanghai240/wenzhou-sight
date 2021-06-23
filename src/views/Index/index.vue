<template>
  <div class="index-wrapper">
    <div class="top-head-wrapper" :class="headType">
      <div class="left-wrapper">
        <img class="head-logo" style="cursor:pointer;" @click="toHome()" v-if="headType === 'home'"
             src="@/assets/img/logo.png" alt=""/>
        <img class="head-logo" style="cursor:pointer;" @click="toHome()" v-else src="@/assets/img/home/logo-color.jpg"
             alt=""/>
        <div class="head-menu-list">
          <span class="head-menu" @click="$router.push('/index')">大美温州</span>
          <span class="head-menu">动感温州</span>
          <span class="head-menu">魅力温州</span>
        </div>
      </div>
      <div class="right-wrapper">
        <img class="head-msg-img" v-if="headType === 'home'" src="@/assets/img/home/msg.png" alt=""/>
        <img class="head-msg-img" v-else src="@/assets/img/home/message-dark.png" alt=""/>
        <img class="head-upload-img" src="@/assets/img/home/upload.png" alt=""/>
        <div class="personal-center-wrapper">
          <img class="head-personal-img" src="@/assets/img/home/person.png" alt=""/>
          <span>个人中心</span>
        </div>
      </div>
    </div>
    <div class="nav-content-wrapper">
      <router-view></router-view>
    </div>
    <div class="bottom-wrapper">
      <img class="bottom-logo-icon" alt="" src="@/assets/img/home/logo-color.jpg"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  comments: {},
  data: () => {
    return {};
  },
  computed: {
    headType: vm => {
      console.log(vm.$route.path);
      const homePathList = ["/index", "/topic-list"]
      return homePathList.indexOf(vm.$route.path) !== -1 ? 'home' : 'other';
    }
  },
  methods: {
    toHome: function () {
      this.$router.push("/index");
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
.index-wrapper {
  position: relative;

  .top-head-wrapper {

    .left-wrapper {
      z-index: 1;
      position: absolute;
      left: 30px;
      top: 20px;
      display: inline-flex;
      align-items: center;

      .head-logo {
        height: 42px;
        width: 147px;
        margin-right: 90px;
      }

      .head-menu-list {

        .head-menu {
          font-size: 18px;
          font-family: PingFang SC, serif;
          font-weight: bold;
          color: #FFFFFF;
          margin-right: 105px;
		  cursor: pointer;
        }
      }
    }

    .right-wrapper {
      z-index: 1;
      position: absolute;
      right: 30px;
      top: 20px;
      display: inline-flex;
      align-items: center;

      .head-msg-img {
        height: 18px;
        width: 24px;
        margin-right: 44px;
      }

      .head-upload-img {
        height: 36px;
        width: 81px;
        margin-right: 38px;
      }

      .personal-center-wrapper {
        font-size: 14px;
        font-weight: bold;
        color: #FFFFFF;
        display: inline-flex;
        align-items: center;

        .head-personal-img {
          height: 30px;
          width: 30px;
          margin-right: 10px;
        }
      }
    }

  }

  .top-head-wrapper.other {
    height: 80px;
    background: #fff;

    .left-wrapper {


      .head-menu-list {

        .head-menu {
          color: #000;
        }
      }
    }

    .right-wrapper {


      .personal-center-wrapper {
        color: #000;

      }
    }

  }

  .bottom-wrapper {
    height: 200px;
    background: #CDC9C7;
    position: relative;

    .bottom-logo-icon {
      height: 39px;
      width: 133px;
      position: absolute;
      left: 142px;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .nav-content-wrapper {
    background: #F4F5FB;
    min-height: calc(~"100vh - 280px");
  }
}
</style>

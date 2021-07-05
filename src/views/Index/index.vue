<template>
  <div class="index-wrapper">
    <div class="top-head-wrapper" :class="headType">
      <div class="left-wrapper">
        <img class="head-logo" style="cursor:pointer;" @click="toHome()" v-if="headType === 'home'"
             src="@/assets/img/logo.png" alt=""/>
        <img class="head-logo" style="cursor:pointer;" @click="toHome()" v-else src="@/assets/img/home/logo-color.jpg"
             alt=""/>
        <div class="head-menu-list">
         <!-- <span class="head-menu" @click="$router.push('/index')">大美温州</span>
          <span class="head-menu" @click="redirect('http://wenzhou.vcgvip.com/672')">动感温州</span>
          <span class="head-menu" @click="redirect('http://wenzhou.vcgvip.com/844')">魅力温州</span> -->
			<span class="head-menu" @click="gotoCategory(category.id)" v-for="category in categoryList" v-bind:key="category.id">{{category.cname}}</span>
		</div>
      </div>
      <div class="right-wrapper">
        <img class="head-msg-img" v-if="headType === 'home'" src="@/assets/img/home/msg.png" alt=""/>
        <img class="head-msg-img" v-else src="@/assets/img/home/message-dark.png" alt=""/>
		<a-dropdown placement="bottomCenter">
			<img class="head-upload-img" src="@/assets/img/home/upload.png" alt=""/>
			<a-menu slot="overlay">
				<a-menu-item>
					<a target="_blank" rel="noopener noreferrer" href="http://wenzhou.vcgvip.com/upload/picture">图片上传</a>
				</a-menu-item>
				<a-menu-item>
					<a target="_blank" rel="noopener noreferrer" href="http://wenzhou.vcgvip.com/upload/vector">设计素材上传</a>
				</a-menu-item>
				<a-menu-item>
					<a target="_blank" rel="noopener noreferrer" href="http://wenzhou.vcgvip.com/upload/video">视频上传</a>
				</a-menu-item>
				<a-menu-item>
					<a target="_blank" rel="noopener noreferrer" href="http://wenzhou.vcgvip.com/works/upload">文档上传</a>
				</a-menu-item>
				<a-menu-item>
					<a target="_blank" rel="noopener noreferrer" href="http://wenzhou.vcgvip.com/upload/audio">音频上传</a>
				</a-menu-item>
			</a-menu>
		</a-dropdown>
        <div class="personal-center-wrapper">
          <a href="http://wenzhou.vcgvip.com/user/upload-record">
			  <img class="head-personal-img" src="@/assets/img/home/person.png" alt=""/>
		  </a>
          <span>
			<a href="http://wenzhou.vcgvip.com/user/upload-record">个人中心</a>
		  </span>
        </div>
      </div>
    </div>
    <div class="nav-content-wrapper">
      <router-view ref="routerView"></router-view>
    </div>
	<a-back-top>
		<a-button type="danger" shape="circle" icon="up" size="large"/>
	</a-back-top>
    <div class="bottom-wrapper">
      <img class="bottom-logo-icon" alt="" src="@/assets/img/home/logo-color.jpg"/>
    </div>
  </div>
</template>

<script>
import { categories } from '@/api/index'

export default {
  name: "index",
  comments: {},
  data: () => {
    return {
		upoadDivVisible: false,
		categoryList: []
	};
  },
  computed: {
    headType: vm => {
      const homePathList = ["/index", "/topic-list"]
      return homePathList.indexOf(vm.$route.path) !== -1 ? 'home' : 'other';
    }
  },
  methods: {
    toHome: function () {
      this.$router.push("/index");
    },
	redirect(url) {
		window.location.replace(url)
	},
	gotoCategory(categoryId) {
		if(this.$route.path === '/category-list') {
			this.$refs.routerView.changeCategoryId(categoryId)
		} else {
			this.$router.push('/category-list?id=' + categoryId)
		}
	}
  },
  created() {
	  categories().then(res => {
		  this.categoryList = res.data
	  })
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
          // margin-right: 35px;
		  padding: 25px;
		  cursor: pointer;
        }
		
		.head-menu:hover {
			background-color: rgba(0, 0, 0, 0.1);
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
		
		a {
		  color: #FFFFFF;
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

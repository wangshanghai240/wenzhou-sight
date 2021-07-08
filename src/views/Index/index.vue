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
			<span @mouseout="hoverCategoryId=-1" @mouseenter="hoverCategoryId=category.id" :class="{'selected-menu': selectedCategoryId===category.id, 'unhover': hoverCategoryId!==-1 && selectedCategoryId!==hoverCategoryId, 'head-menu': true}" @click="gotoCategory(category.id)" v-for="category in categoryList" v-bind:key="category.id">{{category.cname}}</span>
		</div>
      </div>
      <div class="right-wrapper">
       <!-- <img class="head-msg-img" v-if="headType === 'home'" src="@/assets/img/home/msg.png" alt=""/>
        <img class="head-msg-img" v-else src="@/assets/img/home/message-dark.png" alt=""/> -->
		<!-- <a-dropdown placement="bottomCenter">
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
		</a-dropdown> -->
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
      <router-view ref="routerView" v-on:viewIn="enterView"></router-view>
    </div>
	<a-back-top>
		<a-button type="danger" shape="circle" icon="up" size="large"/>
	</a-back-top>
    <div class="bottom-wrapper">
      <img class="bottom-logo-icon" alt="" src="@/assets/img/home/logo-color.jpg"/>
    </div>
	
	<div class="footer-copyright">
		<a class="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorTextSecondary" target="_blank" href="http://www.beian.miit.gov.cn/">
			  苏ICP备19044258号</a> 
		温州晚报 汉华易美视觉科技有限公司
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
		categoryList: [],
		selectedCategoryId: -1,
		hoverCategoryId: -1,
		headType: 'other'
	}
  },
  computed: {
   //  headType: vm => {
   //    const homePathList = ["/index", "/topic-list"]
   //    return homePathList.indexOf(vm.$route.path) !== -1 ? 'home' : 'other';
   //  }
  },
  watch: {
	  hoverCategoryId(newVal, oldVal) {
		  // console.log(newVal)
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
			this.selectedCategoryId = categoryId
			this.$refs.routerView.changeCategoryId(categoryId)
		} else {
			this.$router.push('/category-list?id=' + categoryId)
		}
	},
	enterView(e) {
		console.log('enterView')
		console.log(e)
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
      z-index: 0;
      position: absolute;
      left: 30px;
      top: 20px;
      display: inline-flex;
      align-items: center;

      .head-logo {
        height: 42px;
        width: 147px;
        margin-right: 30px;
      }

      .head-menu-list {

        .head-menu {
          font-size: 18px;
          font-family: PingFang SC, serif;
          font-weight: bold;
          color: #FFFFFF;
          // margin-right: 35px;
		  padding: 40px;
		  cursor: pointer;
        }
		
		.head-menu:hover {
			background-color: rgba(0, 0, 0, 0.1);
			padding-left: 40px;
			padding-right: 40px;
			padding-top: 30px;
			padding-bottom: 22px;
			overflow: hidden;
			color: #d46666;
		}
		
		.head-menu.selected-menu {
		    background-color: rgba(0, 0, 0, 0.1);
			padding-left: 40px;
			padding-right: 40px;
			padding-top: 30px;
			padding-bottom: 22px;
			overflow: hidden;
			color: #d46666;
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
    height: 70px;
    background: #fff;

    .left-wrapper {
		.head-menu-list {
		
			.head-menu {
				font-size: 18px;
				font-family: PingFang SC, serif;
				font-weight: bold;
				color: #000;
				// margin-right: 35px;
				padding-left: 40px;
				padding-right: 40px;
				padding-top: 30px;
				padding-bottom: 22px;
				overflow: hidden;
				cursor: pointer;
			}
			
			.head-menu:hover {
				background-color: rgba(0, 0, 0, 0.1);
				color: #d46666;
			}
			
			.head-menu.selected-menu {
				background-color: rgba(0, 0, 0, 0.1);
				color: #d46666;
			}
			
			.head-menu.selected-menu.unhover {
				background-color: white;
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
  
  .footer-copyright {
  	background-color: rgba(180, 171, 174, 1);
  	width: 100%;
  	padding: 20px 0px;
  	color: rgba(0, 0, 0, 0.54);
  }
  
  .MuiLink-underlineHover {
      text-decoration: none;
  }
  
  .MuiTypography-colorTextSecondary {
      color: rgba(0, 0, 0, 0.54);
  }

  .nav-content-wrapper {
    background: #F4F5FB;
    min-height: calc(~"100vh - 280px");
	// margin-top: -15px;
  }
}
</style>

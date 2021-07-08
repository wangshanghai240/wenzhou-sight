<template>
  <div class="home-banner-wrapper">
	  <a-carousel arrows autoplay>
		<div
			slot="prevArrow" slot-scope="props" class="custom-slick-arrow"
			style="left: 10px; zIndex: 1">
			<a-icon type="left-circle" :width="'4em'" :height="'4em'" />
		</div>
		<div slot="nextArrow" slot-scope="props" class="custom-slick-arrow" style="right: 40px">
			<a-icon type="right-circle" :width="'4em'" :height="'4em'" />
		</div>
		<div v-for="(carouse,index) of carouseData" v-bind:key="carouse.id">
			<img alt="" class="banner-img" :src="carouse.url"/>
		</div>
	  </a-carousel>
	<!-- <div class="home-banner-move-wrapper" >
		
    </div> -->
    <!-- <div class="process-info-wrapper">
      <span v-for="(carouse,index) of carouseData"
            v-bind:key="carouse.id"
            :class="{ 'active' : currentIndex === index}"
            class="process-info-bar"
            @click="switchPic(index)"></span>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "HomeBanner",
  props: {
	carouseData: {
		type: Array,
		default: () => {
			
		}
	}
  },
  mounted() {
    this.interval = setInterval(()=>{
      this.currentIndex = (this.currentIndex + 1) % this.carouseData.length;
    },5000,5000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  data: () => {
    return {
      currentIndex: 0,
      interval:null
    }
  },
  methods: {
    switchPic: function (index) {
      console.log(index);
      this.currentIndex = index;
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>

.home-banner-wrapper {
  position: relative;
  height: 500px;
  overflow: hidden;
  // background-color: red;
  
  @deep: ~'>>>';
  .ant-carousel {
  	.slick-slide {
  	  text-align: center;
  	  height: 160px;
  	  line-height: 160px;
  	  background: #364d79;
  	  overflow: hidden;
  	}
  	
  	.custom-slick-arrow {
  	  width: 25px;
  	  height: 25px;
  	  font-size: 35px;
  	  color: #fff;
  	  background-color: rgba(31, 45, 61, 0.11);
  	  opacity: 0.6;
	  
	  .anticon svg{
		  width: '4em';
		  height: '4em';
	  }
  	}
  	
  	.custom-slick-arrow:before {
  	  display: none;
  	}
  	
  	.custom-slick-arrow:hover {
  	  opacity: 0.5;
  	}
  	
  	.slick-slide h3 {
  	  color: #fff;
  	}
	
	.banner-img {
	  height: 500px;
	  flex-shrink: 0;
	  width: 100%;
	  object-fit: cover;
	}
  }

  .home-banner-move-wrapper {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    transition: all 2s;

    .banner-img {
      height: 500px;
      flex-shrink: 0;
      width: 100%;
      object-fit: cover;
    }
  }

  .process-info-wrapper {
    position: absolute;
    left: 142px;
    bottom: 37px;
    z-index: 200;

    .process-info-bar {
      width: 44px;
      height: 6px;
      background: rgba(0, 0, 0, 0.2);
      display: inline-block;
      margin-right: 9px;
      transition: all .3s;
      cursor: pointer;
    }

    .process-info-bar.active {
      background: #fff;
    }
  }
}
</style>

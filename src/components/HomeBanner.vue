<template>
  <div class="home-banner-wrapper">
    <div class="home-banner-move-wrapper" :style="{right: 'calc(100% * ' + currentIndex + ')'}">
      <img v-for="carouse of carouseData" v-bind:key="carouse.id" alt="" class="banner-img" :src="carouse.url"/>
    </div>
    <div class="process-info-wrapper">
      <span v-for="(carouse,index) of carouseData"
            v-bind:key="carouse.id"
            :class="{ 'active' : currentIndex === index}"
            class="process-info-bar"
            @click="switchPic(index)"></span>
    </div>
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

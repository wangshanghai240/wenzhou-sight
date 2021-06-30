<template>
  <div class="topic-list-wrapper">
    <HomeBanner :carouseData="carouses"></HomeBanner>

    <div class="topic-list-content-wrapper">
      <SearchInput />
      <div class="topic-info-list-wrapper">
        <div class="topic-desc">
          <span class="c-desc">往期活动</span>
        </div>
        <div class="topic-info-list-box">
          <div class="topic-info-box" @click="toActivityDetail(activity.id)" v-for="activity in list" v-bind:key="activity.id">
			
			<img :key="activity.id" :class="{'contain': activity._reproportion, 'topic-img': true}"
			:style="{
				width: activity._width + 'px',
				height: activity._height + 'px',
				marginRight: '0px',
				marginBottom: '0px'
			}" :src="activity.picture" :alt="activity.eventname"/>
		
            <span class="topic-name">{{activity.eventname}}</span>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import HomeBanner from "@/components/HomeBanner"
import SearchInput from '@/components/SearchInput'
import { activities, carouses } from '@/api/index'
import Gallery from '@/utils/gallery'

export default {
  name: "topic-list",
  components:{
    HomeBanner, SearchInput
  },
  methods:{
	  init: function () {
		  this.list = Gallery({
			  list: this.actives.map(item => {
				  var size = item.dimension.substring(6, item.dimension.length-1).split('x')
				  return {
					  id: item.id,
					  eventname: item.eventname,
					  picture: item.header,
					  pictureHigh: item.header,
					  width: parseInt(size[0]),
					  height: parseInt(size[1]),
					  _maxW: parseInt(size[0]) * 2
				  }
			  }),
			  waperWidth: document.getElementsByClassName('topic-info-list-box')[0].clientWidth,
			  imageHeight: 250,
			  gap: this.gap
		  })
	  },
	  toActivityDetail: function(activityId){
	      this.$router.push("/activity-detail?id=" + activityId);
	  }
  },
  data() {
	  return {
		  hotTopics: [],
		  hotSearchKeywords: [],
		  carouses: [],
		  actives: [],
		  list: [],
		  gap: 15
	  }
  },
  created() {
  	activities().then(res => {
		this.actives = res.data.actives
		this.init()
	})
	carouses().then(res => {
		this.carouses = res.data
	})
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>

.topic-list-wrapper{
  background: #fff;

  .topic-list-content-wrapper{
    max-width: 1400px;
    margin: 0 auto;
    
  }

  .topic-info-list-wrapper{
    margin-bottom: 35px;

    .topic-desc{
      display: flex;
      flex-direction: column;
      text-align: center;
      margin-bottom: 25px;

      .e-desc{
        font-size: 24px;
        font-weight: bold;
        color: #F84949;
        opacity: 0.3;
      }

      .c-desc{
        font-size: 30px;
        font-weight: bold;
        color: #111111;
      }
    }

    .topic-info-list-box{
      text-align: left;
	  display: flex;
	  flex-wrap: wrap;

      .topic-info-box{
        display: inline-block;
        margin-right: 15px;
        // width: calc(~'(100% - 45px) / 4');
        margin-bottom: 15px;
        position: relative;

        .topic-img{
          // height: 250px;
          // width: 100%;
          object-fit: cover;
          border-radius: 6px;
        }

        .topic-name{
          position: absolute;
          left: 15px;
          bottom: 15px;
          font-size: 18px;
          font-weight: 500;
          color: #FFFFFF;
        }
      }

      // .topic-info-box:nth-child(4n){
      //   margin-right: 0;
      // }
    }
  }
}
</style>

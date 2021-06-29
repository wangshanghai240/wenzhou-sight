<template>
  <div class="topic-list-wrapper">
    <HomeBanner :carouseData="carouses"></HomeBanner>

    <div class="topic-list-content-wrapper">
      <div class="search-wrapper">
        <div class="search-box">
          <img alt="" class="search-icon" src="@/assets/img/home/search.png"/>
          <input placeholder="查找大美温州"/>
        </div>
        <div class="hot-search-key-wrapper">
          <span class="desc">热门关键词</span>
          <div class="hot-search-key-box">
            <span class="hot-search-key" v-for="hotKeyword in hotSearchKeywords" v-bind:key="hotKeyword.id">{{hotKeyword.keyword}}</span>
          </div>
        </div>
      </div>
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
import HomeBanner from "@/components/HomeBanner";
import { activities, hotKeywords, carouses } from '@/api/index'
import Gallery from '@/utils/gallery'

export default {
  name: "topic-list",
  components:{
    HomeBanner
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
					  height: parseInt(size[1])
				  }
			  }),
			  waperWidth: document.getElementsByClassName('topic-info-list-box')[0].clientWidth,
			  imageHeight: 300,
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
	hotKeywords().then(res => {
		this.hotSearchKeywords = res.data.records
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
    .search-wrapper {
      padding: 45px 175px 40px 175px;
      margin-bottom: 20px;
      background: #F4F5FB;
      margin-top: 20px;

      .search-box {
        background: #FFFFFF;
        box-shadow: 0 0 20px 0 rgba(131, 157, 186, 0.4);
        height: 60px;
        display: flex;
        align-items: center;

        .search-icon {
          height: 19px;
          width: 19px;
          margin-left: 45px;
          margin-right: 20px;
        }

        input {
          border: none;
          outline: none;
          font-size: 20px;
          font-weight: 800;

        }

        input::-webkit-input-placeholder {
          opacity: 0.5;
        }

        input::-moz-placeholder { /* Mozilla Firefox 19+ */
          opacity: 0.5;
        }

        input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
          opacity: 0.5;
        }

        input:-ms-input-placeholder { /* Internet Explorer 10-11 */
          opacity: 0.5;
        }
      }

      .hot-search-key-wrapper {
        display: flex;
        align-items: center;
        margin-top: 20px;

        .desc {
          font-size: 18px;
          font-weight: 800;
          color: #333333;
          margin-right: 28px;
        }

        .hot-search-key-box {


          .hot-search-key {
            height: 36px;
            padding: 0 20px;
            border-radius: 18px;
            display: inline-block;
            line-height: 36px;
            background: #E4E5EC;
            margin-right: 15px;
            font-size: 18px;
            font-weight: 500;
            color: #111;
          }
        }
      }

    }
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

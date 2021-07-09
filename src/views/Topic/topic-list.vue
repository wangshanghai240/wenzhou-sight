<template>
  <div class="topic-list-wrapper">
    <HomeBanner :carouseData="carouses"></HomeBanner>

    <div class="topic-list-content-wrapper">
      
	  <SearchInput />
	  
      <div class="topic-info-list-wrapper">
        <div class="topic-desc">
          <span class="e-desc">Hot topics</span>
          <span class="c-desc">热门专题</span>
        </div>
        <div class="topic-info-list-box">
          <div class="topic-info-box" @click="toTopicDetail(topic.hotId, topic.picture, topic.title)" v-for="topic in hotTopics" v-bind:key="topic.hotId">
            <img class="topic-img" :src="topic.picture" alt=""/>
            <span class="topic-name">{{topic.title}}</span>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import HomeBanner from "@/components/HomeBanner"
import SearchInput from '@/components/SearchInput'
import { hotTopicList, carouses } from '@/api/index'

export default {
  name: "topic-list",
  components:{
    HomeBanner, SearchInput
  },
  methods:{
	searchResult: function(e) {
		if(e.key == 'Enter') {
			this.$router.push("/search-result?keyword=" + this.searchKeyword);
		}
	},
    toTopicDetail:function(hotId, picture, title){
      this.$router.push("/topic-detail?hotId=" + hotId + "&picture=" + picture + '&title=' + title);
    }
  },
  data() {
	  return {
		  hotTopics: [],
		  carouses: []
	  }
  },
  created() {
  	hotTopicList().then(res => {
		this.hotTopics = res.data
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
	width: 90%;
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

      .topic-info-box{
        display: inline-block;
        margin-right: 15px;
        width: calc(~'(100% - 45px) / 4');
        background: #fff;
        margin-bottom: 15px;
        position: relative;

        .topic-img{
          height: 250px;
          width: 100%;
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

      .topic-info-box:nth-child(4n){
        margin-right: 0;
      }
    }
  }
}
</style>

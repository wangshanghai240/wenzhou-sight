<template>
  <div class="topic-list-wrapper">
    <HomeBanner></HomeBanner>

    <div class="topic-list-content-wrapper">
      <div class="search-wrapper">
        <div class="search-box">
          <img alt="" class="search-icon" src="@/assets/img/home/search.png"/>
          <input placeholder="查找大美温州"/>
        </div>
        <div class="hot-search-key-wrapper">
          <span class="desc">热门关键词</span>
          <div class="hot-search-key-box">
            <span class="hot-search-key">航拍</span>
            <span class="hot-search-key">风景</span>
            <span class="hot-search-key">党建</span>
            <span class="hot-search-key">城市</span>
            <span class="hot-search-key">旅游</span>
          </div>
        </div>
      </div>
      <div class="topic-info-list-wrapper">
        <div class="topic-desc">
          <span class="e-desc">Hot topics</span>
          <span class="c-desc">热门专题</span>
        </div>
        <div class="topic-info-list-box">
          <div class="topic-info-box" @click="toTopicDetail(topic.hotId)" v-for="topic in hotTopics" v-bind:key="topic.hotId">
            <img class="topic-img" :src="topic.picture" alt=""/>
            <span class="topic-name">{{topic.title}}</span>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import HomeBanner from "@/components/HomeBanner";
import { hotTopicList } from '@/api/index'

export default {
  name: "topic-list",
  components:{
    HomeBanner
  },
  methods:{
    toTopicDetail:function(hotId){
      this.$router.push("/topic-detail?hotId=" + hotId);
    }
  },
  data() {
	  return {
		  hotTopics: []
	  }
  },
  created() {
  	hotTopicList().then(res => {
		this.hotTopics = res.data
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

<template>
  <div class="topic-detail-wrapper">
    <div class="topic-intro-wrapper">
      <img alt="" class="topic-img" src="@/assets/img/banner/pic3.jpeg"/>
      <span class="topic-name">-网信发展历程-</span>
      <span class="topic-intro">专题简介</span>
      <span class="back-button" @click="backToTopcList()">返回热门专题</span>
    </div>
    <pic-group-viewer :picGroups="topicPicGroups" :total="total"></pic-group-viewer>
  </div>
</template>

<script>
import PicGroupViewer from '@c/PicGroupViewer'
import { hotTopicDetail } from '@/api/index'

export default {
  name: "topic-detail",
  components:{
    'pic-group-viewer':PicGroupViewer
  },
  methods:{
    backToTopcList:function(){
      this.$router.push("/topic-list")
    }
  },
  data() {
	return {
		topicPicGroups: [
			
		],
		total: 0
	}
  },
  created() {
	const hotId = this.$route.query.hotId
  	hotTopicDetail({type: 1, ids: [hotId], cType: 1}).then(res => {
		this.topicPicGroups = res.data.records.map(topicPicGroup => {return {
			id: topicPicGroup.id,
			num: topicPicGroup.groupTotal,
			picture: topicPicGroup.oss176,
			title: topicPicGroup.title
		}})
		this.total = res.data.total
	})
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
.topic-detail-wrapper {

  .topic-intro-wrapper{
    height: 300px;
    position: relative;

    .topic-img{
      height: 300px;
      width: 100%;
      object-fit: cover;
    }

    .topic-name{
      position: absolute;
      left: 50%;
      top: 40%;
      transform: translate(-50%,-50%);
      font-size: 58px;
      font-weight: 400;
      color: #FFFFFF;
    }
    .topic-intro{
      position: absolute;
      left: 50%;
      top: 60%;
      transform: translate(-50%,-50%);
      font-size: 30px;
      font-weight: 400;
      color: #FFFFFF;
    }

    .back-button{
      cursor: pointer;
      position: absolute;
      display: inline-block;
      color: #fff;
      border: 1px solid rgba(255,255,255,0.8);
      top: 30px;
      right: 20%;
      border-radius: 4px;
      padding: 0 10px;
      font-size: 14px;
      height: 32px;
      line-height: 32px;
    }
  }
}
</style>

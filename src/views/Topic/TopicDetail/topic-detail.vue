<template>
  <div class="topic-detail-wrapper">
    <div class="topic-intro-wrapper">
      <img alt="" class="topic-img" :src="topic.backgroundPic"/>
      <span class="topic-name">-{{topic.title}}-</span>
      <span class="topic-intro">{{topic.details}}</span>
      <span class="back-button" @click="backToTopcList()">返回热门专题</span>
    </div>
	<div style="width: 90%; margin: 0 auto;">
		<pic-group-search-viewer ref="topicPics" :otherParams="otherParams"></pic-group-search-viewer>
	</div>
  </div>
</template>

<script>
import PicGroupSearchViewer from '@c/PicGroupSearchViewer'
import { hotTopicByHotId } from '@/api/index'

export default {
  name: "topic-detail",
  components:{
    'pic-group-search-viewer': PicGroupSearchViewer
  },
  methods:{
    backToTopcList:function(){
      this.$router.push("/topic-list")
    }
  },
  data() {
	return {
		total: 0,
		topic: {
			hotId: 0,
			picture: '',
			title: ''
		},
		otherParams: {
			
		}
	}
  },
  created() {
	var hotId = this.$route.query.hotId
	// var picture = this.$route.query.picture
	// var title = this.$route.query.title
	// this.topic = {
	// 	hotId: hotId,
	// 	picture: picture,
	// 	title: title
	// }
	hotTopicByHotId(hotId).then(res => {
		this.topic = res.data
	})
	this.otherParams={
		ids: [hotId]
	}
	this.$nextTick(() => {
		this.$refs.topicPics.changePicGroupPage(1)
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

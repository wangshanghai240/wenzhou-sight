<template>
  <div class="notice-detail-wrapper">
    <div class="notice-info-wrapper">
      <div class="notice-info-head-wrapper">
        <img alt="" class="notice-bac-img" src="@/assets/img/banner/pic1.jpeg">
        <span class="notice-title">{{noticeDetail.title}}</span>
      </div>
      <div class="notice-content-wrapper">
        <div class="notice-content-box" v-html="noticeDetail.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { announcementDetail } from '@/api/index'

export default {
  name: "notice-detail",
  data:() => {
    return {
      noticeDetail:{
        content: '',
		id: 0,
		title: ''
      }
    }
  },
  created() {
	  var id = this.$route.query.id
	  announcementDetail(id).then(res => {
		  this.noticeDetail = res.data
	  })
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
.notice-detail-wrapper{
  background: #F4F5FB;
  padding: 30px 0;


  .notice-info-wrapper{
    width: calc(~"100vw - 280px");
    background: #fff;
    border-radius: 14px;
    z-index: 1000;
    margin-left: 140px;

   .notice-info-head-wrapper{
     position: relative;
     height: 400px;
     overflow: hidden;

     .notice-bac-img{
       height: 500px;
       width: calc(~"100% + 100px");
       object-fit: cover;
       -webkit-filter: blur(13px); /* Chrome, Safari, Opera */
       filter: blur(13px);
       position: relative;
       left: -50px;
     }

     .notice-title{
       font-weight: bold;
       color: #FBFBFD;
       position: absolute;
       font-size: 40px;
       left: 100px;
       top: 50%;
       transform: translateY(-50%);
     }
   }

    .notice-content-wrapper{
      padding: 30px 100px;
    }
  }
}
</style>

<template>
  <div class="search-detail-wrapper">
    <div class="search-info-wrapper">
      <div class="search-info-head-wrapper">
        <img alt="" class="search-bac-img" src="@/assets/img/banner/pic1.jpeg">
        <span class="search-title">{{searchDetail.title}}</span>
      </div>
      <div class="search-content-wrapper">
        <div class="search-content-box" v-html="searchDetail.content">
			{{searchDetail.content}}
		</div>
      </div>
    </div>
  </div>
</template>

<script>
import { hotSearch } from '@/api/index'

export default {
  name: "search-detail",
  data:()=>{
    return {
      searchDetail:{
        content: '',
		title: ''
      }
    }
  },
  created() {
	  var id = this.$route.query.id
	  hotSearch(id).then(res => {
		  this.searchDetail = res.data
	  })
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
.search-detail-wrapper{
  background: #F4F5FB;
  padding: 30px 0;


  .search-info-wrapper{
    width: calc(~"100vw - 280px");
    background: #fff;
    border-radius: 14px;
    z-index: 1000;
    margin-left: 140px;

    .search-info-head-wrapper{
      position: relative;
      height: 400px;
      overflow: hidden;

      .search-bac-img{
        height: 500px;
        width: calc(~"100% + 100px");
        object-fit: cover;
        -webkit-filter: blur(13px); /* Chrome, Safari, Opera */
        filter: blur(13px);
        position: relative;
        left: -50px;
      }

      .search-title{
        font-weight: bold;
        color: #FBFBFD;
        position: absolute;
        font-size: 40px;
        left: 100px;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .search-content-wrapper{
      padding: 30px 100px;
    }
  }
}
</style>

<template>
  <div class="notice-list-wrapper">
    <div class="blur-back-box">
      <img alt="模糊背景" src="@/assets/img/banner/pic3.jpeg"/>
    </div>
    <div class="notice-item-list-wrapper">
      <div>
        <div class="notice-item-wrapper" @click="seeDetail()">
          <img class="notice-img" alt="公告图片" src="@/assets/img/banner/pic2.jpeg"/>
          <div class="notice-item-content-wrapper">
            <span class="notice-title">1.中国野生生物影像年赛——摄影单元征稿</span>
          </div>
        </div>
        <div class="notice-item-wrapper">
          <img class="notice-img" alt="公告图片" src="@/assets/img/banner/pic2.jpeg"/>
          <div class="notice-item-content-wrapper">
            <span class="notice-title">1.中国野生生物影像年赛——摄影单元征稿</span>
          </div>
        </div>
        <div class="notice-item-wrapper">
          <img class="notice-img" alt="公告图片" src="@/assets/img/banner/pic2.jpeg"/>
          <div class="notice-item-content-wrapper">
            <span class="notice-title">1.中国野生生物影像年赛——摄影单元征稿</span>
          </div>
        </div>
        <div class="notice-item-wrapper">
          <img class="notice-img" alt="公告图片" src="@/assets/img/banner/pic2.jpeg"/>
          <div class="notice-item-content-wrapper">
            <span class="notice-title">1.中国野生生物影像年赛——摄影单元征稿</span>
          </div>
        </div>
        <div class="notice-item-wrapper">
          <img class="notice-img" alt="公告图片" src="@/assets/img/banner/pic2.jpeg"/>
          <div class="notice-item-content-wrapper">
            <span class="notice-title">1.中国野生生物影像年赛——摄影单元征稿</span>
          </div>
        </div>
      </div>

      <div class="pagination-wrapper">
        <a-pagination
            :default-current="1"
            :total="3"
        />
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "notice-list",
  methods:{
    seeDetail:function (){
      this.$router.push("/notice-detail")
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
.notice-list-wrapper {
  background: #F4F5FB;

  .blur-back-box {
    position: relative;
    overflow: hidden;
    height: 200px;

    img {
      height: 300px;
      width: calc(100vw + 100px);
      //object-fit: cover;
      -webkit-filter: blur(13px); /* Chrome, Safari, Opera */
      filter: blur(13px);
      position: relative;
      left: -50px;
    }
  }

  .notice-item-list-wrapper {
    width: calc(~"100vw - 280px");
    background: #fff;
    border-radius: 14px;
    padding: 30px;
    z-index: 1000;
    transform: translateY(-90px);
    margin-left: 140px;
    margin-bottom: -44px;

    .notice-item-wrapper{
      cursor: pointer;
      display: flex;
      padding-bottom: 24px;
      border-bottom: 1px solid #ddd;
      margin-top: 24px;
      .notice-img {
        width: 290px;
        height: 220px;
        border-radius: 10px;
        margin-right: 35px;
      }

      .notice-item-content-wrapper {
        flex-grow: 1;
        font-size: 32px;
        font-weight: bold;
        color: #222222;
        text-align: left;
      }
    }

    .notice-item-wrapper:first-child{
      margin-top: 0;
    }

    .notice-item-wrapper:last-child{
      padding-bottom: 0;
      border: none;
    }


    .pagination-wrapper{
      margin-top: 24px;
      text-align: center;
    }


  }
}
</style>

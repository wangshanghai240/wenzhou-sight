<template>
  <div class="master-wrapper">
    <div class="chosen-master-wrapper">
      <img alt="" class="chosen-master-bac-img" src="@/assets/img/master-bac.png">
      <div class="chosen-master-content-wrapper">
        <img class="chosen-master-img" alt="" src="@/assets/img/banner/pic1.jpeg"/>
        <div class="chosen-master-info-wrapper">
          <span class="master-name">{{masterName}}</span>
          <span class="desc">简介：{{masterDesc}}</span>
        </div>

      </div>
      <span class="back-button">返回大师推荐</span>
    </div>
    <div class="master-list-wrapper">
      <div class="master-list-content-wrapper">
       <div class="master-list-info-mask-wrapper">
         <div class="master-info-box" v-for="(master, index) in masterList" v-bind:key="master.id" @click="showMasterInfo(index)">
           <img alt="" class="master-img" :src="master.avatar"/>
           <span class="master-name">{{master.cname}}</span>
         </div>
       </div>
      </div>
    </div>

    <pic-group-viewer></pic-group-viewer>
  </div>
</template>

<script>
import PicGroupViewer from '@c/PicGroupViewer'
import { masters } from '@/api/index'

export default {
  name: "master",
  components: {
    'pic-group-viewer': PicGroupViewer
  },
  data() {
	  return {
		  masterList: [],
		  masterName: '',
		  masterDesc: ''
	  }
  },
  methods: {
	  showMasterInfo(index) {
		  this.masterName = this.masterList[index].cname
		  this.masterDesc = this.masterList[index].desc
	  }
  },
  created() {
	  masters().then(res => {
		  this.masterList = res.data.masters
	  })
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
.master-wrapper {

  .chosen-master-wrapper {
    height: 220px;
    position: relative;

    .chosen-master-bac-img {
      position: absolute;
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
      z-index: 1;
    }

    .chosen-master-content-wrapper {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      z-index: 2;
      position: relative;
      top: 50%;
      transform: translateY(-50%);

      .chosen-master-img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        margin-right: 20px;
      }

      .chosen-master-info-wrapper {
        display: flex;
        flex-direction: column;
        text-align: left;

        .master-name {
          margin-bottom: 16px;
          font-size: 24px;
          font-weight: bold;
          color: #111111;
        }

        .desc {
          font-size: 16px;
          font-weight: 400;
          color: #111111;
        }
      }


    }

    .back-button {
      cursor: pointer;
      position: absolute;
      display: inline-block;
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.8);
      top: 30px;
      right: 15%;
      border-radius: 4px;
      padding: 0 10px;
      font-size: 14px;
      height: 32px;
      line-height: 32px;
      z-index: 1;
    }
  }

  .master-list-wrapper{
    background: #fff;
    padding: 30px 0;


    .master-list-content-wrapper{
      max-width: 1400px;
      margin: 0 auto;
      text-align: left;
      overflow: hidden;

      .master-list-info-mask-wrapper{
        width: calc(~'100% + 37px');
        margin-bottom: -30px;

        .master-info-box{
          display: inline-flex;
          flex-direction: column;
          margin-right: 37px;
          margin-bottom: 30px;
          align-items: center;
		  cursor: pointer;

          .master-img{
            height: 64px;
            width: 64px;
            border-radius: 50%;
            margin-bottom: 10px;
          }
        }
      }


    }
  }

}
</style>

<template>
  <div class="pic-group-viewer-wrapper">
    <div class="pic-group-viewer-info-wrapper">
      <div class="top-wrapper">
        <div class="left-wrapper">
          <span class="choose-tab">全部(16)</span>
          <span class="choose-tab active">组图(13)</span>
          <span class="choose-tab">单图(3)</span>
        </div>
        <div class="right-wrapper">
          <img class="show-type-icon" alt="" src="@/assets/img/home/arrange-active.png"/>
          <img class="show-type-icon" alt="" src="@/assets/img/home/arrange.png"/>
        </div>
      </div>
      <div class="search-filter-wrapper">
        <div class="search-filter-item">
          <span class="label">入库时间</span>
          <a-date-picker placeholder="开始时间" style="width: 120px" /> ~ <a-date-picker placeholder="结束时间" style="width: 120px" />
        </div>
        <div class="search-filter-item">
          <span class="label">拍摄时间</span>
          <a-date-picker placeholder="开始时间" style="width: 120px" /> ~ <a-date-picker placeholder="结束时间" style="width: 120px" />
        </div>
        <div class="search-filter-item">
          <span class="label">地点</span>
          <a-select :default-value="provinceData[0]" style="width: 120px;margin-right: 4px" @change="handleProvinceChange">
            <a-select-option v-for="province in provinceData" :key="province">
              {{ province }}
            </a-select-option>
          </a-select>
          <a-select v-model="secondCity" style="width: 120px">
            <a-select-option v-for="city in cities" :key="city">
              {{ city }}
            </a-select-option>
          </a-select>
        </div>
        <div class="search-filter-item">
          <span class="label">排序</span>
          <a-select default-value="lucy" style="width: 120px" >
            <a-select-option value="jack">
              时间
            </a-select-option>
            <a-select-option value="lucy">
             地点
            </a-select-option>
            <a-select-option value="disabled" disabled>
              Disabled
            </a-select-option>
            <a-select-option value="Yiminghe">
              yiminghe
            </a-select-option>
          </a-select>
        </div>
        <span class="overview-info">共{{total}}个资源</span>
      </div>
      <div class="pic-group-info-list-wrapper">
        <div class="pic-group-info-wrapper" v-for="picGroup in picGroups" v-bind:key="picGroup.id">
          <img alt="" class="pic-group-img" :src="picGroup.picture">
          <div class="pic-group-info-box">
            <span class="pic-group-name">{{picGroup.title}}</span>
            <span class="pic-group-date">{{picGroup.time}}</span>
            <div class="pic-count-info-box">
              <img alt="" class="pic-info-icon" src="@/assets/img/home/picture.png">
              <span class="value">{{picGroup.num}}</span>
              <span class="unit">张</span>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination-wrapper">
        <a-pagination
            showQuickJumper
            :default-current="1"
            :total="total"
        />
      </div>
    </div>
  </div>
</template>

<script>
const provinceData = ['Zhejiang', 'Jiangsu'];
const cityData = {
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};

export default {
  name: "PicGroupViewer",
  props: {
	  picGroups: {
		  type: Array,
		  default: () => []
	  },
	  total: {
		  type: Number,
		  default: 0
	  }
  },
  data() {
    return {
      provinceData,
      cityData,
      cities: cityData[provinceData[0]],
      secondCity: cityData[provinceData[0]][0],
    };
  },
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
.show-type-icon {
  height: 18px;
  width: 18px;
  margin-right: 22px;
}

.show-type-icon:last-child {
  margin-right: 0;
}

.pic-group-viewer-wrapper{
  padding: 36px 0;
  text-align: left;

  .pic-group-viewer-info-wrapper{
    max-width: 1400px;
    margin: 0 auto;

    .top-wrapper{
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      .left-wrapper{
        flex-grow: 1;

        .choose-tab{
          display: inline-block;
          height: 28px;
          line-height: 28px;
          margin-right: 20px;
          font-size: 14px;
          color: #333333;
          font-weight: 400;
        }

        .choose-tab.active{
          color: #F84949;
          background: rgba(248, 73, 73, 0.1);
          padding: 0 10px;
          border-radius: 4px;
        }
      }
    }

    .search-filter-wrapper{
      position: relative;
      display: flex;
      margin-bottom: 20px;

      .search-filter-item{
        margin-right: 40px;

        .label{
          font-size: 14px;
          display: inline-block;
          margin-right: 8px;
        }
      }

      .overview-info{
        font-size: 14px;
        font-weight: 400;
        color: #333333;
        position: absolute;
        right: 0;
      }
    }
    
    .pic-group-info-list-wrapper{
      margin-bottom: 20px;
      
      .pic-group-info-wrapper{
        display: inline-block;
        margin-right: 15px;
        width: calc(~'(100% - 45px) / 4');
        background: #fff;
        margin-bottom: 15px;

        .pic-group-img{
          background: #fff;
          border-radius: 6px 6px 0px 0px;
          height: 250px;
          width: 100%;
          object-fit: cover;
        }
        
        .pic-group-info-box{
          display: flex;
          flex-direction: column;
          padding: 10px;
          
          .pic-group-name{
            font-size: 18px;
            font-weight: 400;
            color: #333333;
          }
          
          .pic-group-date{
            font-size: 14px;
            font-weight: 400;
            color: #999999;
          }
          
          .pic-count-info-box{
            font-size: 16px;
            font-weight: 500;
            color: #999999;
            display: flex;
            align-items: center;

            .pic-info-icon{
              height: 16px;
              width: 16px;
              margin-right: 8px;
            }


            
          }
        }
      }

      .pic-group-info-wrapper:nth-child(4n){
        margin-right: 0;
      }
    }

    .pagination-wrapper{
      text-align: center;
    }
  }
}
</style>

<template>
  <div class="pic-group-viewer-wrapper">
    <div class="pic-group-viewer-info-wrapper">
      <div class="top-wrapper">
        <div class="left-wrapper">
          <span :class="{'choose-tab': true, 'active': searchType==='ALL'}" @click="switchSearchType('ALL')">全部(16)</span>
          <span :class="{'choose-tab': true, 'active': searchType==='GROUP'}"  @click="switchSearchType('GROUP')">组图(13)</span>
          <span :class="{'choose-tab': true, 'active': searchType==='SINGLE'}"  @click="switchSearchType('SINGLE')">单图(3)</span>
        </div>
        <div class="right-wrapper">
          <svg @click="switchPicShowType('HEIGHT_EQUAL')" class="show-type-icon MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" alt="等高">
          		<path :class="{'selected': picShowType==='HEIGHT_EQUAL'}" d="M1634,2055h8v8h-8v-8Zm10,0h8v8h-8v-8Zm-10-10h18v8h-18v-8Z" transform="translate(-1634 -2035)"></path>
          </svg>
          <svg @click="switchPicShowType('WIDTH_EQUAL')" style="margin-right:20px;" class="show-type-icon MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" alt="等宽">
          		<path :class="{'selected': picShowType==='WIDTH_EQUAL'}" d="M1674,2055h5v8h-5v-8Zm7,0h4v8h-4v-8Zm6,0h5v8h-5v-8Zm-13-10h5v8h-5v-8Zm7,0h4v8h-4v-8Zm6,0h5v8h-5v-8Z" transform="translate(-1674 -2035)"></path>
          </svg>
        </div>
      </div>
      <div class="search-filter-wrapper" ref="searchResultDiv">
        <div class="search-filter-item">
          <span class="label">入库时间</span>
          <a-date-picker @change="changeUploadTimeFrom" placeholder="开始时间" style="width: 120px" />
		  ~ <a-date-picker @change="changeUploadTimeFrom" placeholder="结束时间" style="width: 120px"/>
        </div>
        <div class="search-filter-item" v-show="searchType==='SINGLE'">
          <span class="label">拍摄时间</span>
          <a-date-picker @change="changeShootTimeFrom" placeholder="开始时间" format="YYYY-MM-DD" style="width: 120px" /> 
		  ~ <a-date-picker @change="changeShootTimeTo" placeholder="结束时间" style="width: 120px"/>
        </div>
        <div class="search-filter-item" v-show="searchType==='SINGLE'">
          <span class="label">地点</span>
          <a-select default-value="0" v-model="firstCityIndex" style="width: 120px;margin-right: 4px">
            <a-select-option v-for="(province, index) in provinceData" :key="index">
              {{ province.label }}
            </a-select-option>
          </a-select>
          <a-select @change="changePicGroupPage(1)" default-value="0" v-model="secondCityIndex" style="width: 120px">
            <a-select-option v-for="(city, index) in provinceData[firstCityIndex].children" :key="index">
              {{ city.label }}
            </a-select-option>
          </a-select>
        </div>
        <div class="search-filter-item" v-show="searchType==='SINGLE'">
          <span class="label">排序</span>
          <a-select default-value="1,2" style="width: 120px" v-model="sortStr" @change="changePicGroupPage(1)">
            <a-select-option value="1,2">
              入库时间倒序
            </a-select-option>
			<a-select-option value="1,1">
			  入库时间正序
			</a-select-option>
            <a-select-option value="3,2">
             拍摄时间倒序
            </a-select-option>
			<a-select-option value="3,1">
			 拍摄时间正序
			</a-select-option>
            <a-select-option value="2,2">
              资源类型倒序
            </a-select-option>
			<a-select-option value="2,1">
			  资源类型正序
			</a-select-option>
          </a-select>
        </div>
        <span class="overview-info">共{{total}}个资源</span>
      </div>
      <div class="pic-group-info-list-wrapper">
        <div class="pic-group-info-wrapper" v-for="picGroup in picGroups" v-bind:key="picGroup.id" v-show="picShowType==='WIDTH_EQUAL'">
          <img :alt="picGroup.title" class="pic-group-img" 
		  :src="picGroup.picture" />
		  <!-- v-lazy="picGroup.picture" :key="picGroup.picture" -->
		  
          <div class="pic-group-info-box">
            <span class="pic-group-name">{{picGroup.title}}</span>
            <span class="pic-group-date">{{picGroup.time}}</span>
            <div v-if="searchType !== 'SINGLE'" class="pic-count-info-box">
              <img alt="" class="pic-info-icon" src="@/assets/img/home/picture.png">
              <span class="value">{{picGroup.num}}</span>
              <span class="unit">张</span>
            </div>
          </div>
        </div>
		
		<div class="well-chosen-list-box-height" v-show="picShowType==='HEIGHT_EQUAL'">
			  <div class="well-chosen-info-box-height jss117" v-for="pic in picGroups" v-bind:key="pic.id">
				  <a class="MuiButtonBase-root MuiCardActionArea-root" target="_self">
					 <div class="MuiCardMedia-root jss119" :title="pic.title">
						 <img 
						
						 :src="pic.pictureHeight"
						 class="IMG_HEIGHT lazyload" :alt="pic.title"/>
					 </div> 
					 <div class="MuiCardContent-root picText">
						 <h2 class="MuiTypography-root jss122 MuiTypography-subtitle2">{{pic.title}}</h2>
							<p class="MuiTypography-root MuiTypography-caption MuiTypography-gutterBottom">
								{{pic.time}}
							</p>
					 </div>
					 <span v-if="searchType !== 'SINGLE'" class="MuiTypography-root picNums MuiTypography-caption MuiTypography-gutterBottom">
						 <svg class="MuiSvgIcon-root jss123" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
							 <path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z"></path>
						 </svg>{{pic.num}}
					 </span>
					 <span class="MuiCardActionArea-focusHighlight"></span>
				  </a>
			  </div>
		</div>
      </div>
      <div class="pagination-wrapper">
        <a-pagination
            showQuickJumper
            :default-current="1"
            :total="total"
			:pageSize="30"
			@change="changePicGroupPage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import city from '@/store/area'
import { hotTopicDetail, searchSingles } from '@/api/index'
// import echo from '@/utils/echo'

city.unshift({"value": "-1", "label": "请选择", "children": [{"value": "-1", "label": "请选择"}]})
// Echo.init({
// 	offset: 0,//离可视区域多少像素的图片可以被加载
// 	throttle: 0 //图片延时多少毫秒加载
// })

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
	  },
	  otherParams: {
		  type: Object,
		  default: () => {}
	  }
  },
  methods: {
	  changeUploadTimeFrom(e, f) {
		  this.uploadTimeFrom = f
		  this.changePicGroupPage(1)
	  },
	  changeUploadTimeTo(e, f) {
		  this.uploadTimeTo = f
		  this.changePicGroupPage(1)
	  },
	  changeShootTimeFrom(e, f) {
		  this.shootTimeFrom = f
		  this.changePicGroupPage(1)
	  },
	  changeShootTimeTo(e, f) {
		  this.shootTimeTo = f
		  this.changePicGroupPage(1)
	  },
	  changePicGroupPage(e) {
		  this.pageIndex = e
		  this.search()
	  },
	  adjustImageHeight() {
		  var totalWidth = document.getElementsByClassName('search-filter-wrapper')[0].clientWidth
		  var imgs = document.getElementsByClassName('IMG_HEIGHT')
		  var newLineWidth = 0
		  var newLineIndex = 0
		  var widthHeightRatios = 0
		  for(var i = 0; i < imgs.length; i++) {
		  	newLineWidth += imgs[i].width * 0.6
		  	if(newLineWidth > totalWidth) {
		  		// var maxHeight = 0
		  		// for(var j=newLineIndex; j<i; j++) {
		  		// 	if(maxHeight < imgs[j].height) {
		  		// 		maxHeight = imgs[j].height
		  		// 	}
		  		// }
		  		// var totalWidth = 0
		  		// for(var j=newLineIndex; j<i; j++) {
		  		// 	totalWidth = maxHeight
		  		// }
		  		// for(var j=newLineIndex; j<i; j++) {
		  		// 	imgs[j].height = maxHeight
		  		// }
		  		var height = (totalWidth - (i - newLineIndex) * 11)/widthHeightRatios
		  		for(var j=newLineIndex; j<i; j++) {
					var preRatio = imgs[j].width.toFixed(2) / imgs[j].height
		  			// imgs[j].height = height 
					imgs[j].style.height  =  height + 'px'
					imgs[j].style.width  =  (preRatio * height) + 'px'
					
					imgs[j].setAttribute('height', height + 'px' )
					imgs[j].setAttribute('width', (preRatio * height) + 'px')
					
					// imgs[j].setAttribute('height', height + 'px')
					// imgs[j].setAttribute('width', (preRatio * height) + 'px')
					
					// var image = new Image()
					// image.src = imgs[j].src
					// image.height = height + 'px'
					console.log(imgs[j].width + ':' + imgs[j].height + ':' + height)
		  		}
		  		console.log('--------------')
		  		newLineIndex = i
		  		widthHeightRatios = 0
		  		newLineWidth = 0
		  	}
			widthHeightRatios += imgs[i].width / imgs[i].height
		  }
	  },
	  search() {
		  var areas = ''
		  if(this.firstCityIndex > 0) {
			  areas = city[this.firstCityIndex].label 
			  if(this.secondCityIndex > 0) {
				  areas += ',' + city[this.firstCityIndex].children[this.secondCityIndex].label
			  }
		  }
		  if(areas.length > 0) {
			  areas = '中国,' + areas
		  }
		  var params = {
			  type: 1,
			  cType: 1,
			  curPage: this.pageIndex,
			  size: 30,
			  uploadTimeFrom: this.uploadTimeFrom,
			  uploadTimeTo: this.uploadTimeTo,
			  shootTimeFrom: this.shootTimeFrom,
			  shootTimeTo: this.shootTimeTo,
			  areas: areas
		  }
		  for(var key in this.otherParams) {
			  params[key] = this.otherParams[key]
		  }
		  // this.$emit('changePicGroupPage', ) 
		  if(this.searchType == 'GROUP' || this.searchType == 'ALL' ) {
			  hotTopicDetail(params).then(res => {
				this.picGroups = res.data.records.map(topicPicGroup => {return {
					id: topicPicGroup.id,
					num: topicPicGroup.groupTotal,
					picture: topicPicGroup.oss800,
					pictureHeight: topicPicGroup.oss800,
					title: topicPicGroup.title,
					time: topicPicGroup.createdAt
				}})
				this.total = res.data.total
				// this.$nextTick(() => {
					// this.adjustImageHeight()
				// })
			  })
		  } else {
			  var sortStrs = this.sortStr.split(',')
			  params['sort'] = parseInt(sortStrs[0])
			  params['sortRule'] = parseInt(sortStrs[1])
			  searchSingles(params).then(res => {
				if(res.data) {
					this.picGroups = res.data.groupLists.map(topicPicGroup => {return {
						id: topicPicGroup.id,
						picture: topicPicGroup.oss800,
						pictureHeight: topicPicGroup.oss800,
						title: topicPicGroup.keywords,
						time: topicPicGroup.createdAt
					}})
					this.total = res.data.total
				} else {
					this.picGroups = []
					this.total = 0
				}
				
				// this.$nextTick(() => {
					// this.adjustImageHeight()
				// })
			  })
		  }
	  },
	  switchPicShowType(picShowType) {
		  this.picShowType = picShowType
	  },
	  switchSearchType(searchType) {
		  this.searchType = searchType
		  this.changePicGroupPage(1)
	  }
  },
  data() {
    return {
      provinceData: city,
	  firstCityIndex: 0,
      secondCityIndex: 0,
	  picShowType: 'HEIGHT_EQUAL',
	  searchType: 'ALL',
	  uploadTimeFrom: '',
	  uploadTimeTo: '',
	  shootTimeFrom: '',
	  shootTimeTo: '',
	  sortStr: '1,2',
	  pageIndex: 1
    };
  },
  created() {
  }
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
		justify-content: space-between;

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
  
  
  .well-chosen-list-box-height {
    display: flex;
    flex-wrap: wrap;
	justify-content: space-between;
  
    .well-chosen-info-box-height {
      display: inline-flex;
      flex-direction: column;
  	  height: 300px;
      margin-right: 10px;
      text-align: left;
      margin-bottom: 30px;
  	}
  }
  
  .MuiSvgIcon-root {
  	  width: 2em;
  	  height: 2em;
  	  display: inline-block;
  	  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  	  flex-shrink: 0;
  	  user-select: none;
  	  overflow: unset;
  	  fill: #b3b4c0;
  	  
  	  .selected {
  		  fill: #f84949;
  	  }
  }
  
  .jss117 {
      // width: 386px;
      // height: 100%;
	  width: calc(32%);
      display: flex;
      box-shadow: none;
      border-radius: 0;
      flex-direction: column;
  }
  
  .MuiButtonBase-root {
      color: inherit;
      border: 0;
      cursor: pointer;
      margin: 0;
      display: inline-flex;
      outline: 0;
      padding: 0;
      position: relative;
      align-items: center;
      user-select: none;
      border-radius: 0;
      vertical-align: middle;
      -moz-appearance: none;
      justify-content: center;
      text-decoration: none;
      background-color: transparent;
      -webkit-appearance: none;
      -webkit-tap-highlight-color: transparent;
  }
  
  .MuiCardActionArea-root {
      width: 100%;
      display: block;
      /* text-align: inherit; */
  }
  
  .MuiCardContent-root {
      padding: 16px;
  }
  
  .MuiCardMedia-root {
      display: block;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
  }
  
  .jss119 img {
      width: 100%;
      height: 300px;
      display: block;
      object-fit: cover;
  }
  
  .picText {
      color: #fff;
      width: 100%;
      bottom: 0;
      position: absolute;
      background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.7));
  }
  
  .picNums {
      top: 10px;
      color: #fff;
      left: 10px;
      display: flex;
      padding: 0 6px;
      position: absolute;
      flex-wrap: nowrap;
      align-items: center;
      border-radius: 4px;
      background-color: rgba(0, 0, 0, 0.4);
  }
  
  .MuiTypography-gutterBottom {
      margin-bottom: 0.35em;
  }
  
  .MuiTypography-caption {
      font-size: 0.75rem;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 400;
      line-height: 1.66;
      letter-spacing: 0.03333em;
  }
  
  .jss122 {
      overflow: hidden;
      max-height: 42px;
  }
  
  .MuiTypography-subtitle2 {
  	  color: #fff;
      font-size: 0.875rem;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 500;
      line-height: 1.57;
      letter-spacing: 0.00714em;
  }
  
  .MuiTypography-root {
      margin: 0;
  }
  
  .MuiCardActionArea-focusHighlight {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0;
      overflow: hidden;
      position: absolute;
      transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      border-radius: inherit;
      pointer-events: none;
      background-color: currentcolor;
  }
  
}
</style>

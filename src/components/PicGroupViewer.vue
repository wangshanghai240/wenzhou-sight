<template>
	 <div class="pic-group-info-list-wrapper">
        <div class="pic-group-info-wrapper" @click="showDetail(picGroup.id)" v-for="picGroup in picGroups" v-bind:key="picGroup.id" v-show="picShowType==='WIDTH_EQUAL'">
          <img :alt="picGroup.title" class="pic-group-img" 
		   :src="picGroup.picture"/>
		   
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
		
		<div id="picGroupDiv" class="well-chosen-list-box-height" v-show="picShowType==='HEIGHT_EQUAL'">
			  <div @click="showDetail(pic.id)" class="well-chosen-info-box-height jss117" v-for="(pic, index) in list" v-bind:key="pic.id">
				  <a class="MuiButtonBase-root MuiCardActionArea-root" target="_self">
					 <div class="MuiCardMedia-root jss119" :title="pic.title">
						 <figure
						 	:key="pic.id" :class="{'contain': pic._reproportion}"
						 	:style="{
						 		width: pic._width + 'px',
						 		height: pic._height + 'px',
						 		marginRight: '0px',
						 		marginBottom: '0px'
						 	}">
						 	<img :src="pic.picture" :alt="pic.title"/>
						 </figure>
					 </div> 
					 <div class="MuiCardContent-root picText">
						 <h2 class="MuiTypography-root jss122 MuiTypography-subtitle2">{{pic.title}}</h2>
							<p class="MuiTypography-root MuiTypography-caption MuiTypography-gutterBottom">
								{{pic.time}}
							</p>
					 </div>
					 <span v-if="searchType !== 'SINGLE'" class="MuiTypography-root picNums MuiTypography-caption MuiTypography-gutterBottom">
						 <svg class="MuiSvgIcon-picNum jss123" focusable="false" viewBox="0 0 1024 1024" aria-hidden="true" width="200" height="200" t="1624436923180">
							 <path d="M569.5 733.3L439.8 571.2c-20.5-25.6-57.8-29.7-83.3-9.3-3.4 2.7-6.5 5.9-9.3 9.3L156.3 809.8h711.6L737.4 635.9c-19.6-26.2-56.8-31.5-83-11.9-4.5 3.4-8.5 7.4-11.9 11.9l-73 97.4zM156.3 98.2h711.6c32.7 0 59.3 26.5 59.3 59.3v711.6c0 32.7-26.5 59.3-59.3 59.3H156.3c-32.7 0-59.3-26.5-59.3-59.3V157.5c0-32.7 26.6-59.3 59.3-59.3zM690 454c65.5 0 118.6-53.1 118.6-118.6S755.5 216.8 690 216.8s-118.6 53.1-118.6 118.6S624.5 454 690 454z"></path>
						 </svg>{{pic.num}}张
					 </span>
					 <span class="MuiCardActionArea-focusHighlight"></span>
				  </a>
			  </div>
		  </div>
		
		</div>
</template>

<script>
import Gallery from '@/utils/gallery'
// import echo from '@/utils/echo'

// Echo.init({
// 	offset: 0,//离可视区域多少像素的图片可以被加载
// 	throttle: 0 //图片延时多少毫秒加载
// })

export default {
  name: "PicGroupViewer",
  methods: {
	  init: function () {
		  this.list = Gallery({
			  list: this.picGroups,
			  waperWidth: document.getElementById('picGroupDiv').clientWidth,
			  imageHeight: 300,
			  gap: this.gap
		  })
	  },
	  showDetail(id) {
		  if(this.searchType !== 'SINGLE') {
			  this.$router.push('/group-pictures?id=' + id)
		  }
	  }
  },
  data() {
    return {
	  picShowType: 'HEIGHT_EQUAL',
	  list: [],
	  picGroups: [],
	  searchType: 'ALL',
	  gap: 10
    };
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
figure {
    display: inline-block;
    // width: 160px;
    // height: 160px;
    background-color: #333;
    background-clip: content-box;
    background-size: cover;
    box-sizing: border-box;

    margin: 0;
}

figure img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

figure.contain img {
    object-fit: contain;
}

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
        right: 30px;
      }
    }
    
    .pic-group-info-list-wrapper{
      margin-bottom: 20px;
	  text-align: left;
      
      .pic-group-info-wrapper{
        display: inline-block;
        margin-right: 15px;
        width: calc(~'(100% - 45px) / 4');
        background: #fff;
        margin-bottom: 15px;
		cursor: pointer;

        .pic-group-img{
          background: #fff;
          border-radius: 6px;
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
  }
  
  
  .well-chosen-list-box-height {
    display: flex;
    flex-wrap: wrap;
  
    .well-chosen-info-box-height {
      display: inline-flex;
      flex-direction: column;
  	  // height: 300px;
      margin-right: 10px;
      text-align: left;
      margin-bottom: 30px;
	  cursor: pointer;
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
  
  .MuiSvgIcon-picNum {
  	  width: 2em;
	  height: 2em;
	  padding: 2px;
  	  display: inline-block;
  	  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  	  flex-shrink: 0;
  	  user-select: none;
  	  overflow: unset;
  	  fill: #fff;
	  opacity: 0.8;
  }
  
  .jss117 {
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

.pagination-wrapper{
  text-align: center;
}
</style>

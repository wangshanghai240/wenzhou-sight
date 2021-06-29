<template>
  <div class="home-wrapper">
    <div class="top-menu-wrapper">
      <home-banner :carouseData="carouses"></home-banner>
    </div>

    <div class="home-content-wrapper">
      <div class="home-content-top-wrapper">
        <div class="left-wrapper">

          <div class="search-wrapper">
            <div class="search-box">
              <img alt="" class="search-icon" src="@/assets/img/home/search.png"/>
              <input v-model="searchKeyword" placeholder="查找大美温州" @keydown="searchResult"/>
            </div>
            <div class="hot-search-key-wrapper">
              <span class="desc">热门关键词</span>
              <div class="hot-search-key-box">
                <span class="hot-search-key" v-for="hotSearchKeyword in hotSearchKeywords" v-bind:key="hotSearchKeyword.id">{{hotSearchKeyword.keyword}}</span>
              </div>
            </div>
          </div>

          <div class="info-wrapper topic-wrapper">
            <div class="head-box">
              <div class="head-label-box">
                <span class="head-label">热门专题</span>
              </div>

              <span class="more-button" @click="seeTopicMore()">更多></span>
            </div>
            <div class="content-wrapper">
              <div class="topic-list-box">
                <div class="topic-info-box" @click="seeTopicDetail(hotTopic.hotId)" v-for="hotTopic in hotTopics" v-bind:key="hotTopic.hotId">
                  <img alt="" class="topic-img" :src="hotTopic.picture"/>
                  <span class="topic-name">{{hotTopic.title}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right-wrapper">

          <div class="list-wrapper notice-wrapper">
            <div class="head-wrapper">
              <span class="list-title">公告栏</span>
              <div class="icon-box">
                <img alt="" class="list-icon" src="@/assets/img/home/notice.png"/>
              </div>

              <span class="more-button" @click="seeNoticeMore()">更多></span>
            </div>
            <div class="content-wrapper">
              <div class="link-list-wrapper">
                <span class="link-info" @click="seeNoticeDetail(announcement.id)" v-for="(announcement, index) in announcements" v-bind:key="announcement.id">{{index + 1}}.{{announcement.title}}</span>
              </div>
            </div>
          </div>
          <div class="list-wrapper hot-search-wrapper">
            <div class="head-wrapper">
              <span class="list-title">热门搜索</span>
              <div class="icon-box">
                <img alt="" class="list-icon" src="@/assets/img/home/hot.png"/>
              </div>
              <span class="more-button" @click="seeSearchMore()">更多></span>
            </div>
            <div class="content-wrapper">
              <div class="link-list-wrapper">
                <span class="link-info" @click="seeSearchDetail()" v-for="(hotSearch, index) in hotSearches" v-bind:key="hotSearch.id">{{index + 1}}.{{hotSearch.title}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="home-content-center-wrapper" id="activityMasterDiv">
        <div class="left-wrapper" id="activityDiv">
          <div class="info-wrapper new-activity-wrapper">
            <div class="head-box">
              <div class="head-label-box">
                <span class="head-label">最新活动</span>
              </div>

              <span class="more-button" @click="seeActivitiesMore">更多></span>
            </div>
            <div class="content-wrapper">
              <div class="new-activity-info-wrapper">
                <img alt="" class="new-activity-info-img" :src="newestActivity.activityImgUrl"/>
                <span class="new-activity-name">{{newestActivity.activityTitle}}</span>
              </div>
            </div>
          </div>
          <div class="info-wrapper his-activity-wrapper">
            <div class="head-box">
              <div class="head-label-box">
                <span class="head-label" style="color: #000">往期活动</span>
              </div>

              <span class="more-button" @click="seeActivitiesMore">更多></span>
            </div>
            <div class="content-wrapper">
              <div class="his-activity-list-box">
                <div class="his-activity-info-box" v-for="activity in activities" v-bind:key="activity.id">
                  <img alt="" class="his-activity-img" :src="activity.header"/>
                  <span class="his-activity-name">{{activity.eventname}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right-wrapper" id="masterDiv">
          <div class="info-wrapper master-wrapper">
            <div class="head-box">
              <div class="head-label-box">
                <span class="head-label">大师推荐</span>
              </div>

              <span class="more-button" @click="seeMasterMore()">更多></span>
            </div>
            <div class="content-wrapper">
              <div class="master-list-box">
                <div class="master-info-box" v-for="master in masters" v-bind:key="master.id">
                  <img alt="" class="master-img" :src="master.photo?uploadedFilePrefix + master.photo : default_master_photo"/>
                  <span class="master-name">{{master.name}}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>


      <div class="info-wrapper well-chosen-wrapper">
        <div class="head-box">
          <div class="head-label-box">
            <span class="head-label">精选图片</span>
          </div>
		  
		  <svg @click="switchPicShowType('HEIGHT_EQUAL')" class="show-type-icon MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" alt="等高">
			  <path :class="{'selected': picShowType==='HEIGHT_EQUAL'}" d="M1634,2055h8v8h-8v-8Zm10,0h8v8h-8v-8Zm-10-10h18v8h-18v-8Z" transform="translate(-1634 -2035)"></path>
		  </svg>
		  <svg @click="switchPicShowType('WIDTH_EQUAL')" style="margin-right:20px;" class="show-type-icon MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" alt="等宽">
			  <path :class="{'selected': picShowType==='WIDTH_EQUAL'}" d="M1674,2055h5v8h-5v-8Zm7,0h4v8h-4v-8Zm6,0h5v8h-5v-8Zm-13-10h5v8h-5v-8Zm7,0h4v8h-4v-8Zm6,0h5v8h-5v-8Z" transform="translate(-1674 -2035)"></path>
		  </svg>        
		<!--  <img class="show-type-icon" alt="" src="@/assets/img/home/arrange-active.png"/>
          <img class="show-type-icon" alt="" src="@/assets/img/home/arrange.png"/> -->
          <span class="more-button" @click="seeSearchResult" >更多></span>
        </div>
        <div class="content-wrapper pic-group-viewer-wrapper">
			<div class="pic-group-viewer-info-wrapper">
				<PicGroupViewer ref="searchResultView"></PicGroupViewer>
			</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeBanner from "@/components/HomeBanner";
import PicGroupViewer from '@c/PicGroupViewer'
import { mapState } from 'vuex'
import { index } from '@/api/index'

const default_master_photo = require('@/assets/img/master_default.png')

export default {
  name: "home",
  components: {
  	PicGroupViewer
	,HomeBanner
  },
  data: () => {
    return {
		carouses: [],
		newestActivity: {
			activityImgUrl: '',
			activityTitle: ''
		},
		activities: [{}],
		announcements: [],
		hotSearches: [],
		hotSearchKeywords: [],
		hotTopics: [],
		masters: [],
		picShowType: 'HEIGHT_EQUAL',
		searchKeyword: '',
		default_master_photo: default_master_photo,
		heightInitalized: false
	}
  },
  computed: {
	...mapState(['uploadedFilePrefix']),
  },
  methods: {
    seeNoticeMore: function () {
      this.$router.push("/notice-list");
    },
    seeSearchMore: function () {
      this.$router.push("/search-list");
    },
    seeNoticeDetail: function (id){
      this.$router.push("/notice-detail?id=" + id);
    },
    seeSearchDetail: function (){
      this.$router.push("/search-detail");
    },
	searchResult: function(e) {
		if(e.key == 'Enter') {
			this.$router.push("/search-result?keyword=" + this.searchKeyword);
		}
	},
	seeSearchResult: function (){
	  this.$router.push("/search-result");
	},
    seeTopicDetail:function (){
      this.$router.push("/topic-detail")
    },
    seeTopicMore:function(){
      this.$router.push("/topic-list")
    },
	seeActivitiesMore:function (){
	  this.$router.push("/activity-list")
	},
    seeMasterMore:function(){
      this.$router.push("/master")
    },
	switchPicShowType(picShowType) {
		this.picShowType = picShowType
		this.$refs.searchResultView.picShowType = picShowType
	},
	adjustHeight() {
		if(this.heightInitalized) {
			return;
		}
		this.heightInitalized = true
		var activityHeight = document.getElementById('activityDiv').clientHeight
		// console.log('height-1:' + document.getElementById('activityDiv').height)
		console.log('height0:' + document.getElementById('activityDiv').offsetHeight)
		document.getElementById('activityMasterDiv').style.height = activityHeight + 'px'
		document.getElementById('masterDiv').style.height = activityHeight + 'px'
		document.getElementsByClassName('master-list-box')[0].style.height = (activityHeight - 30) + 'px'
		
		// console.log('height1:' + activityHeight)
		// console.log('height2:' + document.getElementById('masterDiv').style.height)
		// console.log('height2:' + document.getElementById('masterDiv').clientHeight)
	}
  },
  created() {
     index().then(res => {
		const data = res.data
     	this.carouses = data.carouses
		this.activities = data.activities.slice(0, 3)
		this.newestActivity = data.newestActivity
		this.hotSearchKeywords = data.hotKeywords
		this.hotSearches = data.hotSearches
		this.announcements = data.announcements
		this.hotTopics = data.hotTopics.slice(0, 4)
		this.masters = data.masters
		
		this.$refs.searchResultView.picGroups = data.carefullyChosenPics.map(topicPicGroup => {
			var sizes = topicPicGroup.size.split('/')[0].split('x')
			return {
				id: topicPicGroup.id,
				num: topicPicGroup.groupTotal,
				picture: topicPicGroup.oss400,
				pictureHigh: topicPicGroup.oss800,
				width: parseInt(sizes[0]),
				height: parseInt(sizes[1]),
				title: topicPicGroup.title,
				time: topicPicGroup.createdAt
			}
		})
		this.$refs.searchResultView.init()
		// this.$nextTick(this.adjustHeight)
     })
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
.home-wrapper {
  position: relative;
  background: #fff;

  .home-content-wrapper {
    padding: 20px 100px;

    .home-content-top-wrapper {
      display: flex;

      .left-wrapper {
        flex-grow: 1;
        margin-right: 30px;
		width: 73%;

        .search-wrapper {
          padding: 45px 175px 40px 175px;
          margin-bottom: 20px;

          background: #F4F5FB;

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

        .topic-wrapper {
          .topic-list-box {
            display: flex;

            .topic-info-box {
              flex-grow: 1;
              margin-right: 11px;
              position: relative;
			  // width: calc(~'33% - 3px');
              cursor: pointer;

              .topic-img {
                height: 180px;
                // width: 100%;
				object-fit: cover;
                border-radius: 10px;
              }

              .topic-name {
                position: absolute;
                left: 17px;
                bottom: 13px;
                font-size: 18px;
                font-weight: 500;
                color: #FFFFFF;
				text-align: left;
              }
            }

            .topic-info-box:last-child {
              margin-right: 0;
            }
			overflow-x: scroll;
          }
        }
      }

      .right-wrapper {
        flex-shrink: 0;

		

        .list-wrapper {
          width: 360px;
          background: #FFFFFF;
          box-shadow: 0 0 20px 0 rgba(123, 152, 186, 0.4);
          padding: 20px 30px;

          .head-wrapper {
            display: flex;
            align-items: flex-end;

            .list-title {
              font-size: 22px;
              font-weight: bold;
              color: #333333;
              margin-right: 9px;
              line-height: 22px;
            }

            .icon-box {
              flex-grow: 1;
              text-align: left;
            }

            .list-icon {
              height: 27px;
              width: 54px;
            }

            .more-button {
              font-size: 16px;
              font-weight: 500;
              color: #999999;
              cursor: pointer;
            }
          }
        }

        .content-wrapper {
          .link-list-wrapper {
            margin-top: 16px;
            display: flex;
            flex-direction: column;
            text-align: left;

            .link-info {
              font-size: 16px;
              font-weight: 500;
              color: #999999;
              margin-bottom: 10px;
			  cursor: pointer;
            }
          }
        }

        .notice-wrapper {
          height: 220px;
          margin-bottom: 20px;
        }

        .hot-search-wrapper {
          height: 280px;
          margin-bottom: 20px;
        }
      }
    }

    .home-content-center-wrapper {
      display: flex;
	  align-items: stretch;
      width: 100%;
	  
	  min-height: 800px;
	  overflow: hidden;
	  position: relative;

      .left-wrapper {
        flex-grow: 1;
        margin-right: 30px;
		width: 57%;
		position: absolute;

        .new-activity-wrapper {

          .new-activity-info-wrapper {
            position: relative;

            .new-activity-info-img {
              // height: 565px;
              width: 100%;
              border-radius: 10px;
              // object-fit: cover;
            }

            .new-activity-name {
              position: absolute;
              left: 32px;
              bottom: 25px;
              font-size: 24px;
              font-weight: 500;
              color: #FFFFFF;
			  text-align: left;
            }
          }
        }

        .his-activity-wrapper {
          margin-top: 20px;

          .his-activity-list-box {
            display: flex;

            .his-activity-info-box {
              flex-grow: 1;
              margin-right: 10px;
              position: relative;

              .his-activity-img {
                height: 194px;
                // width: 100%;
                border-radius: 10px;
                object-fit: cover;
              }

              .his-activity-name {
                position: absolute;
                left: 18px;
                bottom: 15px;
                font-size: 18px;
                font-weight: 500;
                color: #FFFFFF;
				text-align: left;
              }
            }
			
			overflow-x: scroll;

            .his-activity-info-box:last-child {
              margin-right: 0;
            }
          }
        }
      }

      .right-wrapper {
        // width: 610px;
        flex-shrink: 1;
		width: 40%;
		position: absolute;
		// margin-right: 4px;
		right: 4px;
		// left: calc(~'62% - 14px');
		
        .master-wrapper {

          .master-list-box {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-top: 40px;
			// height: 850px;
			max-height: 800px;
			overflow: scroll;

            .master-info-box {
              display: inline-flex;
              flex-direction: column;
              align-items: center;
              min-width: 30%;
              margin-bottom: 40px;

              .master-img {
                height: 136px;
                width: 136px;
                border-radius: 136px;
                object-fit: cover;
                margin-bottom: 20px;
              }

              .master-name {
                font-size: 20px;
                font-weight: 500;
                color: #111111;
              }
            }
          }

          .master-list-box:nth-last-child(1),
          .master-list-box:nth-last-child(2),
          .master-list-box:nth-last-child(3) {
            margin-bottom: 0;
          }
        }
      }
    }

    .well-chosen-wrapper {

      .show-type-icon {
        // height: 18px;
        // width: 18px;
        margin-right: 10px;
      }

      .show-type-icon:last-child {
        margin-right: 38px;
      }
    }
  }


  .info-wrapper {
    .head-box {
      display: flex;
      border-bottom: 1px solid #DDDDDD;
      align-items: baseline;

      .head-label-box {
        flex-grow: 1;
        text-align: left;

        .head-label {
          height: 42px;
          line-height: 42px;
          display: inline-block;
          background: #E4E5EC;
          border-radius: 6px 6px 0 0;
          font-size: 20px;
          font-weight: bold;
          color: #F84949;
          padding: 0 25px;
        }
      }

      .more-button {
        font-size: 16px;
        font-weight: 500;
        color: #999999;
        cursor: pointer;
      }
    }

    .content-wrapper {
      margin-top: 25px;
    }
  }
  
 //  .well-chosen-list-box-height {
 //    display: flex;
 //    flex-wrap: wrap;
	// justify-content: space-between;
  
 //    .well-chosen-info-box-height {
 //      display: inline-flex;
 //      flex-direction: column;
 //  	  height: 300px;
 //      margin-right: 10px;
 //      text-align: left;
 //      margin-bottom: 30px;
	// }
 //  }
  
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
      height: 100%;
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
  
  // .picText {
  //     color: #fff;
  //     width: 100%;
  //     bottom: 0;
  //     position: absolute;
  //     background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.7));
  // }
  
  // .picNums {
  //     top: 10px;
  //     color: #fff;
  //     left: 10px;
  //     display: flex;
  //     padding: 0 6px;
  //     position: absolute;
  //     flex-wrap: nowrap;
  //     align-items: center;
  //     border-radius: 4px;
  //     background-color: rgba(0, 0, 0, 0.4);
  // }
  
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

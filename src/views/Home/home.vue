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
              <input placeholder="查找大美温州" @keydown="seeSearchResult"/>
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

      <div class="home-content-center-wrapper">
        <div class="left-wrapper">
          <div class="info-wrapper new-activity-wrapper">
            <div class="head-box">
              <div class="head-label-box">
                <span class="head-label">最新活动</span>
              </div>

              <span class="more-button">更多></span>
            </div>
            <div class="content-wrapper">
              <div class="new-activity-info-wrapper">
                <img alt="" class="new-activity-info-img" :src="activities[0].header"/>
                <span class="new-activity-name">{{activities[0].eventname}}</span>
              </div>
            </div>
          </div>
          <div class="info-wrapper his-activity-wrapper">
            <div class="head-box">
              <div class="head-label-box">
                <span class="head-label" style="color: #000">往期活动</span>
              </div>

              <span class="more-button">更多></span>
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
        <div class="right-wrapper">
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
                  <img alt="" class="master-img" src="@/assets/img/master.png"/>
                  <span class="master-name">{{master.cname}}</span>
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
		  
		  <svg @click="switchPicShowType('HEIGHT_EQUAL')" class="show-type-icon MuiSvgIcon-root" focusable="false" viewBox="-7 -7 31 51" width="1em" height="1em" aria-hidden="true"><path :class="{'selected': picShowType==='HEIGHT_EQUAL'}" d="M1634,2055h8v8h-8v-8Zm10,0h8v8h-8v-8Zm-10-10h18v8h-18v-8Z" transform="translate(-1634 -2020)"></path></svg>
		  <svg @click="switchPicShowType('WIDTH_EQUAL')" class="show-type-icon MuiSvgIcon-root" focusable="false" viewBox="-7 -7 31 31" aria-hidden="true"><path :class="{'selected': picShowType==='WIDTH_EQUAL'}" d="M1674,2055h5v8h-5v-8Zm7,0h4v8h-4v-8Zm6,0h5v8h-5v-8Zm-13-10h5v8h-5v-8Zm7,0h4v8h-4v-8Zm6,0h5v8h-5v-8Z" transform="translate(-1674 -2020)"></path></svg>        
		<!--  <img class="show-type-icon" alt="" src="@/assets/img/home/arrange-active.png"/>
          <img class="show-type-icon" alt="" src="@/assets/img/home/arrange.png"/> -->
          <span class="more-button">更多></span>
        </div>
        <div class="content-wrapper">
          <div class="well-chosen-list-box">
            <div class="well-chosen-info-box" v-for="pic in carefullyChosenPics" v-bind:key="pic.id">
              <div class="well-chosen-img-div">
				  <img alt="" class="well-chosen-img" :src="pic.oss176"/>
			  </div>
              <span class="well-chosen-name">{{pic.title}}</span>
              <span class="well-chosen-date">{{pic.createdAt}}</span>
              <div class="well-chosen-pic-info-box">
                <img alt="" class="well-chosen-pic-info-icon" src="@/assets/img/home/picture.png">
                <span class="value">{{pic.groupTotal}}</span>
                <span class="unit">张</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeBanner from "@/components/HomeBanner";
import { index } from '@/api/index'

export default {
  name: "home",
  components: {HomeBanner},
  data: () => {
    return {
		carouses: [],
		activities: [{}],
		announcements: [],
		hotSearches: [],
		hotSearchKeywords: [],
		hotTopics: [],
		masters: [],
		carefullyChosenPics: [],
		picShowType: 'HEIGHT_EQUAL'
	}
  },
  methods: {
    seeNoticeMore: function () {
      this.$router.push("/notice-list");
    },
    seeSearchMore: function () {
      this.$router.push("/search-list");
    },
    seeNoticeDetail: function (){
      this.$router.push("/notice-detail");
    },
    seeSearchDetail: function (){
      this.$router.push("/search-detail");
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
    seeMasterMore:function(){
      this.$router.push("/master")
    },
	switchPicShowType(picShowType) {
		console.log(picShowType)
		this.picShowType = picShowType
	}
  },
  created() {
     index().then(res => {
		const data = res.data
     	this.carouses = data.carouses
		this.activities = data.activities.slice(0, 3)
		this.hotSearchKeywords = data.hotKeywords
		this.hotSearches = data.hotSearches
		this.announcements = data.announcements
		this.hotTopics = data.hotTopics.slice(0, 4)
		this.masters = data.masters
		this.carefullyChosenPics = data.carefullyChosenPics
     })
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
.home-wrapper {
  position: relative;
  background: #fff;

  .home-content-wrapper {
    padding: 20px 140px;

    .home-content-top-wrapper {
      display: flex;

      .left-wrapper {
        flex-grow: 1;
        margin-right: 30px;

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
			  width: calc(25% - 3px);
              cursor: pointer;

              .topic-img {
                height: 230px;
                width: 100%;
                border-radius: 10px;
              }

              .topic-name {
                position: absolute;
                left: 17px;
                bottom: 13px;
                font-size: 18px;
                font-weight: 500;
                color: #FFFFFF;
              }
            }

            .topic-info-box:last-child {
              margin-right: 0;
            }
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
      width: 100%;

      .left-wrapper {
        flex-grow: 1;
        margin-right: 30px;

        .new-activity-wrapper {

          .new-activity-info-wrapper {
            position: relative;

            .new-activity-info-img {
              height: 565px;
              width: 100%;
              border-radius: 10px;
              object-fit: cover;
            }

            .new-activity-name {
              position: absolute;
              left: 32px;
              bottom: 25px;
              font-size: 24px;
              font-weight: 500;
              color: #FFFFFF;
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
                height: 184px;
                width: 100%;
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
              }
            }

            .his-activity-info-box:last-child {
              margin-right: 0;
            }
          }
        }
      }

      .right-wrapper {
        width: 610px;
        flex-shrink: 0;

        .master-wrapper {

          .master-list-box {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-top: 80px;
			height: 850px;
			overflow: scroll;

            .master-info-box {
              display: inline-flex;
              flex-direction: column;
              align-items: center;
              min-width: 30%;
              margin-bottom: 80px;

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
        margin-right: 0px;
      }

      .show-type-icon:last-child {
        margin-right: 38px;
      }

      .well-chosen-list-box {
        display: flex;
        flex-wrap: wrap;

        .well-chosen-info-box {
          display: inline-flex;
          flex-direction: column;
          width: calc(~"25% - 8px");
		  // width: 280px;
		  // height: 350px;
          margin-right: 10px;
          text-align: left;
          margin-bottom: 30px;

		  .well-chosen-img-div {
			  display: inline-flex;
			  flex-direction: column;
			  justify-content: center;
			  // max-width: calc(~"100% - 4px");
			  // height: 300px;
			  overflow: hidden;
			  
			  .well-chosen-img {
			    height: 230px;
				width: 100%;
				
			    object-fit: cover;
			    margin-bottom: 15px;
			    border-radius: 6px;
			  }
		  }

          .well-chosen-name {
            font-size: 22px;
            font-weight: 500;
            color: #333333;
            margin-bottom: 15px;
          }

          .well-chosen-date {
            font-size: 16px;
            font-weight: 500;
            color: #999999;
            margin-bottom: 10px;
          }

          .well-chosen-pic-info-box {
            font-size: 16px;
            font-weight: 500;
            color: #999999;
            display: flex;
            align-items: center;

            .well-chosen-pic-info-icon {
              height: 16px;
              width: 16px;
              margin-right: 8px;
            }
          }
        }

        .well-chosen-info-box:nth-child(4n) {
          margin-right: 0;
        }
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
  
  .MuiSvgIcon-root {
	  width: 1em;
	  height: 1em;
	  display: inline-block;
	  font-size: 3rem;
	  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	  flex-shrink: 0;
	  user-select: none;
	  fill: #b3b4c0;
	  
	  .selected {
		  fill: #f84949;
	  }
  }

}

</style>

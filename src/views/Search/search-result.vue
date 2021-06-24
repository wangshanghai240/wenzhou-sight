<template>
	<div class="topic-list-wrapper">
	
	  <div class="topic-list-content-wrapper">
		<div class="search-wrapper">
		  <div class="search-box">
			<img alt="" class="search-icon" src="@/assets/img/home/search.png"/>
			<input placeholder="查找大美温州"/>
		  </div>
		  <div class="hot-search-key-wrapper">
			<span class="desc">热门关键词</span>
			<div class="hot-search-key-box">
			  <span class="hot-search-key" v-for="hotKeyword in hotSearchKeywords" v-bind:key="hotKeyword.id">{{hotKeyword.keyword}}</span>
			</div>
		  </div>
		</div>
		<div class="search-list-wrapper">
		  <pic-group-search-viewer :otherParams.sync="otherParams" ref="searchResultView"></pic-group-search-viewer>
		</div>
	  </div>
	</div>
</template>

<script>
import { hotTopicDetail, hotKeywords } from '@/api/index'
import PicGroupSearchViewer from '@c/PicGroupSearchViewer'

export default {
	methods: {
	},
	components: {
		'pic-group-search-viewer': PicGroupSearchViewer
	},
	data() {
		return {
			keyword: '',
			otherParams: {keyWord: this.keyword},
			hotSearchKeywords: []
		}
	},
	created() {
		this.keyword = this.$route.query.keyword
		this.otherParams = {keyWord: this.keyword}
		this.$nextTick(() => {
			this.$refs.searchResultView.changePicGroupPage(1)
		})
		
		hotKeywords().then(res => {
			this.hotSearchKeywords = res.data.records
		})
	}
}
</script>

<style lang="less" rel="stylesheet/less" scoped>

.topic-list-wrapper{
  background: #fff;


  .topic-list-content-wrapper{
    max-width: 1400px;
    margin: 0 auto;
	.search-wrapper {
	  padding: 45px 175px 40px 175px;
	  margin-bottom: 20px;
	  background: #F4F5FB;
	  margin-top: 20px;
	
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
  }
}
</style>

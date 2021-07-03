<template>
	<div class="topic-list-wrapper">
	
	  <div class="topic-list-content-wrapper">
		<div class="search-wrapper">
		  <div class="search-box">
		    <div class="search-button">
		  	  <img @click="searchResult" alt="" class="search-icon" src="@/assets/img/home/search.png"/>
		    </div>
		    <input v-model="keyword" placeholder="查找大美温州" @keydown="searchIfEnter"/>
		  </div>
		  
		  <div class="hot-search-key-wrapper">
			<span class="desc">热门关键词</span>
			<div class="hot-search-key-box">
				<a-button @click="keyword = hotSearchKeyword.keyword;searchResult();" type="link" class="hot-search-key"
				 v-for="hotSearchKeyword in hotSearchKeywords" v-bind:key="hotSearchKeyword.id">
					{{hotSearchKeyword.keyword}}
				</a-button>
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
	methods: {
		searchIfEnter(e) {
			if(e.key == 'Enter') {
				this.searchResult()
			}
		},
		searchResult() {
			this.$refs.searchResultView.otherParams = {keyWord: this.keyword}
			this.$refs.searchResultView.changePicGroupPage(1)
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
	  background: #d1d2d8;
	  // #F4F5FB;
	  margin-top: 20px;
	
	  .search-box {
	    background: #FFFFFF;
	    box-shadow: 0 0 20px 0 rgba(131, 157, 186, 0.4);
	    height: 60px;
	    display: flex;
	    align-items: center;
	
	    .search-button {
	        flex: 0 0 auto;
	        color: rgba(0, 0, 0, 0.54);
	        padding: 12px;
	        overflow: visible;
	        text-align: center;
	        transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	        border-radius: 50%;
	    	margin-left: 45px;
	    	margin-right: 20px;
	    	width: 46px;
	    	height: 46px;
	    	
	    	.search-icon {
	    	  height: 19px;
	    	  width: 19px;
	    	  cursor: pointer;
	    	}
	    }
	    .search-button:hover {
	      background-color: rgba(0, 0, 0, 0.04);
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
		  word-break: keep-all;
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

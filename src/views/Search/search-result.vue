<template>
	<div class="search-list-wrapper">
	  <pic-group-viewer 
		:picGroups="searchResult" :total="total"
		@changePicGroupPage="changePicGroupPage"></pic-group-viewer>
	</div>
</template>

<script>
import { hotTopicDetail } from '@/api/index'
import PicGroupViewer from '@c/PicGroupViewer'

export default {
	methods: {
		search() {
			hotTopicDetail({
				keyWord: this.keyword,
				curPage: this.curPage,
				size: this.size,
				type: 1,
				cType: 1
			}).then(res => {
				this.searchResult = res.data.records.map(topicPicGroup => {return {
					id: topicPicGroup.id,
					num: topicPicGroup.groupTotal,
					picture: topicPicGroup.oss176,
					title: topicPicGroup.title
				}})
				this.total = res.data.total
			})
		},
		changePicGroupPage(e) {
			this.curPage = e
			this.search()
		}
	},
	components: {
		'pic-group-viewer': PicGroupViewer
	},
	data() {
		return {
			keyword: '',
			curPage: 1,
			size :10,
			searchResult: [],
			total: 0
		}
	},
	created() {
		this.keyword = this.$route.query.keyword
		this.search()
	}
}
</script>

<style>
</style>

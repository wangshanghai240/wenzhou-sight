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
			this.changePicGroupPage({
				keyWord: this.keyword,
				curPage: this.curPage,
				size: this.size,
				type: 1,
				cType: 1
			})
		},
		changePicGroupPage(params) {
			params.keyWord = this.keyword
			hotTopicDetail(params).then(res => {
				this.searchResult = res.data.records.map(topicPicGroup => {return {
					id: topicPicGroup.id,
					num: topicPicGroup.groupTotal,
					picture: topicPicGroup.oss800,
					pictureHeight: topicPicGroup.oss800,
					title: topicPicGroup.title,
					time: topicPicGroup.createdAt
				}})
				this.total = res.data.total
			})
		}
	},
	components: {
		'pic-group-viewer': PicGroupViewer
	},
	data() {
		return {
			keyword: '',
			curPage: 1,
			size :30,
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

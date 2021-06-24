<template>
	<div class="pic-group-viewer-wrapper">
		<div class="pic-group-viewer-info-wrapper">
			<div class="top-wrapper">
				<div class="left-wrapper">
					<span :class="{'choose-tab': true, 'active': searchType==='ALL'}"
						@click="switchSearchType('ALL')">全部(16)</span>
					<span :class="{'choose-tab': true, 'active': searchType==='GROUP'}"
						@click="switchSearchType('GROUP')">组图(13)</span>
					<span :class="{'choose-tab': true, 'active': searchType==='SINGLE'}"
						@click="switchSearchType('SINGLE')">单图(3)</span>
				</div>
				<div class="right-wrapper">
					<svg @click="switchPicShowType('HEIGHT_EQUAL')" class="show-type-icon MuiSvgIcon-root"
						focusable="false" viewBox="0 0 24 24" aria-hidden="true" alt="等高">
						<path :class="{'selected': picShowType==='HEIGHT_EQUAL'}"
							d="M1634,2055h8v8h-8v-8Zm10,0h8v8h-8v-8Zm-10-10h18v8h-18v-8Z"
							transform="translate(-1634 -2035)"></path>
					</svg>
					<svg @click="switchPicShowType('WIDTH_EQUAL')" style="margin-right:20px;"
						class="show-type-icon MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"
						alt="等宽">
						<path :class="{'selected': picShowType==='WIDTH_EQUAL'}"
							d="M1674,2055h5v8h-5v-8Zm7,0h4v8h-4v-8Zm6,0h5v8h-5v-8Zm-13-10h5v8h-5v-8Zm7,0h4v8h-4v-8Zm6,0h5v8h-5v-8Z"
							transform="translate(-1674 -2035)"></path>
					</svg>
				</div>
			</div>
			<div class="search-filter-wrapper" ref="searchResultDiv">
				<div class="search-filter-item">
					<span class="label">入库时间</span>
					<a-date-picker @change="changeUploadTimeFrom" placeholder="开始时间" style="width: 120px" />
					~
					<a-date-picker @change="changeUploadTimeFrom" placeholder="结束时间" style="width: 120px" />
				</div>
				<div class="search-filter-item" v-show="searchType==='SINGLE'">
					<span class="label">拍摄时间</span>
					<a-date-picker @change="changeShootTimeFrom" placeholder="开始时间" format="YYYY-MM-DD"
						style="width: 120px" />
					~
					<a-date-picker @change="changeShootTimeTo" placeholder="结束时间" style="width: 120px" />
				</div>
				<div class="search-filter-item" v-show="searchType==='SINGLE'">
					<span class="label">地点</span>
					<a-select default-value="0" v-model="firstCityIndex" style="width: 120px;margin-right: 4px">
						<a-select-option v-for="(province, index) in provinceData" :key="index">
							{{ province.label }}
						</a-select-option>
					</a-select>
					<a-select @change="changePicGroupPage(1)" default-value="0" v-model="secondCityIndex"
						style="width: 120px">
						<a-select-option v-for="(city, index) in provinceData[firstCityIndex].children" :key="index">
							{{ city.label }}
						</a-select-option>
					</a-select>
				</div>
				<div class="search-filter-item" v-show="searchType==='SINGLE'">
					<span class="label">排序</span>
					<a-select default-value="1,2" style="width: 150px" v-model="sortStr"
						@change="changePicGroupPage(1)">
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
			
			<pic-group-viewer ref="searchResultView"></pic-group-viewer>
			
		</div>
		<div class="pagination-wrapper">
			<a-pagination showQuickJumper :default-current="1" :total="total" :pageSize="30"
				@change="changePicGroupPage" />
		</div>
	</div>
</template>

<script>
	import { hotTopicDetail, searchSingles } from '@/api/index'
	import city from '@/store/area'
	import PicGroupViewer from '@c/PicGroupViewer'

	city.unshift({
		"value": "-1",
		"label": "请选择",
		"children": [{
			"value": "-1",
			"label": "请选择"
		}]
	})
	// Echo.init({
	// 	offset: 0,//离可视区域多少像素的图片可以被加载
	// 	throttle: 0 //图片延时多少毫秒加载
	// })

	export default {
		name: "PicGroupSearchViewer",
		props: {
			otherParams: {
				type: Object,
				default: () => {}
			}
		},
		components: {
			'pic-group-viewer': PicGroupViewer
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
				
				if (this.searchType == 'SINGLE') {
					var sortStrs = this.sortStr.split(',')
					params['sort'] = parseInt(sortStrs[0])
					params['sortRule'] = parseInt(sortStrs[1])
				}
				
				this.search(params)
			},
			switchPicShowType(picShowType) {
				this.picShowType = picShowType
				this.$refs.searchResultView.picShowType = picShowType
			},
			switchSearchType(searchType) {
				this.searchType = searchType
				this.$refs.searchResultView.searchType = searchType
				this.changePicGroupPage(1)
			},
			search(params) {
				if(this.searchType == 'GROUP' || this.searchType == 'ALL' ) {
				  hotTopicDetail(params).then(res => {
					  if(res.data) {
						  this.$refs.searchResultView.picGroups = res.data.records.map(topicPicGroup => {
						  	var sizes = topicPicGroup.size.split('/')[0].split('x')
						  	return {
						  		id: topicPicGroup.id,
						  		num: topicPicGroup.groupTotal,
						  		picture: topicPicGroup.oss400,
						  		width: parseInt(sizes[0]),
						  		height: parseInt(sizes[1]),
						  		title: topicPicGroup.title,
						  		time: topicPicGroup.createdAt
						  	}
						  })
						  this.total = res.data.total
					  } else {
						this.$refs.searchResultView.picGroups = []
						this.total = 0
					  }
					  this.$refs.searchResultView.init()
				  })
				} else {
				  searchSingles(params).then(res => {
					if(res.data) {
						this.$refs.searchResultView.picGroups = res.data.groupLists.map(topicPicGroup => {
							var sizes = topicPicGroup.size.split('/')[0].split('x')
							return {
								id: topicPicGroup.id,
								picture: topicPicGroup.oss400,
								title: topicPicGroup.keywords,
								time: topicPicGroup.createdAt,
								width: parseInt(sizes[0]),
								height: parseInt(sizes[1])
							}
						})
						this.total = res.data.total
					} else {
						this.$refs.searchResultView.picGroups = []
						this.total = 0
					}
					this.$refs.searchResultView.init()
				})
			}
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
				pageIndex: 1,
				total: 0
			};
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

	.pic-group-viewer-wrapper {
		padding: 36px 0;
		text-align: left;

		.pic-group-viewer-info-wrapper {
			max-width: 1400px;
			margin: 0 auto;

			.top-wrapper {
				display: flex;
				align-items: center;
				margin-bottom: 20px;

				.left-wrapper {
					flex-grow: 1;

					.choose-tab {
						display: inline-block;
						height: 28px;
						line-height: 28px;
						margin-right: 20px;
						font-size: 14px;
						color: #333333;
						font-weight: 400;
					}

					.choose-tab.active {
						color: #F84949;
						background: rgba(248, 73, 73, 0.1);
						padding: 0 10px;
						border-radius: 4px;
					}
				}
			}

			.search-filter-wrapper {
				position: relative;
				display: flex;
				margin-bottom: 20px;

				.search-filter-item {
					margin-right: 40px;

					.label {
						font-size: 14px;
						display: inline-block;
						margin-right: 8px;
					}
				}

				.overview-info {
					font-size: 14px;
					font-weight: 400;
					color: #333333;
					position: absolute;
					right: 30px;
				}
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
	}

	.pagination-wrapper {
		text-align: center;
	}
</style>

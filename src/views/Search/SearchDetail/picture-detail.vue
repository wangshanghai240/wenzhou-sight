<template>
	<main style="position:relative; padding:0; flex: 1; width: 1280px; margin: 0 auto 30px;">
		<div class="nav">
			详情页
		</div>
		<div class="content-wrapper">
			<div class="left-wrapper">
				<div class="layer">
					<div class="favorite">
						<a-button @click="$router.push('/group-pictures?id=' + groupId)" id="backToGroup" size="large" style="display: flex; align-items: center;">
							<!-- <pic-group-icon/> -->
							<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
								<path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z"></path>
							</svg>
							<div class="button-label">
								返回组照
							</div>
						</a-button>
					</div>
					<div class="image-layer" id="imageLayer">
						<a-button :disabled="picIndex===0" v-show="groupId" 
							type="link" size="large" @click="updatePicIndex(picIndex - 1)">
							<a-icon type="left" size="large" :style="{width: '1em', height: '1em', 'font-size': '32px', color: (picIndex===0?'gray':'inherit')}"/>
						</a-button>
						<img :src="picInfo.oss800Watermark"/>
						<a-button :disabled="picIndex === pics.length - 1" v-show="groupId"
							type="link" size="large" @click="updatePicIndex(picIndex + 1)">
							<a-icon type="right" size="large" :style="{width: '1em', height: '1em', 'font-size': '32px', color: (picIndex===pics.length-1?'gray':'inherit')}"/>
						</a-button>
					</div>
					<div class="count">
						<span>下载次数{{picInfo.downloadCount}}</span>
						<span>收藏次数{{picInfo.collectionTimes}}</span>
						<span>浏览次数{{picInfo.viewTimes}}</span>
					</div>
					
					<div class="transparent-layer"></div>
					<div class="blur-layer">
						<img :src="picInfo.oss800Watermark"/>
					</div>
				</div>
			</div>
			<div class="right-wrapper">
				<div class="authDownload">
					<div class="title">
						授权下载
					</div>
					<div class="select-size">
						<a-radio-group v-model="downloadQuality">
							<a-radio :style="radioStyle" value="pre" :disabled="picInfo.isCopyright===1">原图 {{picInfo.picWidth}} x {{picInfo.picHeight}}</a-radio>
							<a-radio :style="radioStyle" value="medium" :disabled="picInfo.isCopyright===1">中图 2048 x {{picInfo.mediumHeight}}</a-radio>
							<a-radio :style="radioStyle" value="small">小图 1024 x {{picInfo.smallHeight}}</a-radio>
						</a-radio-group>
					</div>
					<div class="button-group">
						<a-button @click="download1" type="primary" block icon="download" size="large">图片下载</a-button>
						<a-button @click="downloadPicAndTxt" type="primary" block icon="download" size="large">图文下载</a-button>
					</div>
					<div class="intro-info" v-if="picInfo.caption">
						<!-- <div class="title">基本信息</div> -->
						<div class="intro">
							<span :class="{'open': titleOpen, 'MuiTypography-root': true, 'jss1020': true}">
								{{picInfo.caption}}
								<button @click="switchTitleOpen" v-show="picInfo.caption.length>0" class="MuiButtonBase-root MuiIconButton-root jss1019" tabindex="0" type="button">
									<span class="MuiIconButton-label">
										<svg ref="titleOpenSvg" class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
											<path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
										</svg>
									</span>
								</button>
								<button @click="copy(picInfo.caption)" class="MuiButtonBase-root MuiIconButton-root jss1019" tabindex="0" type="button">
									<span class="MuiIconButton-label">
										<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall" focusable="false" viewBox="0 0 24 24" aria-hidden="true" style="font-size: 14px;">
											<path d="M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14z"></path>
										</svg>
									</span>
								</button>
							</span>
						</div>
					</div>
					<div class="base-info">
						<div class="title">基本信息</div>
						<ul class="info">
							<li>ID：{{picInfo.id}}</li>
							<li>尺寸：{{picInfo.picWidth}}x{{picInfo.picHeight}}</li>
							<li>摄影师：{{picInfo.creditLine}}</li>
							<li>署名：{{picInfo.signature}}</li>
							<li>拍摄时间：{{picInfo.shootTime}}</li>
							<li>图片来源：{{picInfo.sourceDes}}</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		
		<div style="width: 75%; text-align: left;">
			<div class="section_title">
				关键词
			</div>
			<router-link class="a_nodecoration" target="_blank" :to="{path: '/search-result', query: {keyword: keyword}}" v-for="keyword in keywords" v-bind:key="keyword">
				<div class="MuiChip-root jss51">
					<span class="MuiChip-label">
						{{keyword}}
					</span>
				</div>
			</router-link>
		</div>
		
		<div class="group-pics">
			<div class="bar">
				<div class="jss69">
					同组图片
				</div>
			</div>
			<div>
				<pic-group-viewer @updatePicIndex="updatePicIndex" ref="picGroupViewer"></pic-group-viewer>
			</div>
		</div>
		
	</main>
</template>

<script>
	import PicGroupViewer from '@c/PicGroupViewer'
	import { getGroupPics } from '@/api/index'
	import JSZip from "jszip"
	import FileSaver from "file-saver"
	
	// import { PicGroupIcon } from '@/components/icons'
	
	export default {
		data() {
			return {
				picInfo: {
					
				},
				downloadQuality: 'small',
				pics: [],
				keywords: [],
				radioStyle: {
					display: 'block',
					height: '30px',
					lineHeight: '30px',
				 },
				 titleOpen: false,
				 groupId: 0,
				 picIndex: 0
			}
		},
		components: {
			'pic-group-viewer': PicGroupViewer
		},
		methods: {
			updatePicIndex(picIndex) {
				this.picIndex = picIndex
				this.picInfo = this.pics[picIndex]
				// this.picInfo.oss800Watermark = this.picInfo.oss800Watermark + '?' + Math.random()
				this.picInfo.mediumHeight = parseInt(2048*this.picInfo.picHeight/this.picInfo.picWidth)
				this.picInfo.smallHeight = parseInt(1024*this.picInfo.picHeight/this.picInfo.picWidth)
				this.keywords = this.picInfo.keywords.split(',')
				this.$forceUpdate()
			},
			switchTitleOpen() {
				// this.$refs.titleCopyBtn.style.fill = 'rgba(0, 0, 0, 0.54)'
				this.titleOpen = !this.titleOpen
				if(this.titleOpen) {
					this.$refs.titleOpenSvg.setAttribute('d', 'M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z')
				} else {
					this.$refs.titleOpenSvg.setAttribute('d', 'M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z')
				}
			},
			getImageDataURL(image) {
				const canvas = document.createElement('canvas');
				canvas.width = image.width;
				canvas.height = image.height;
				const ctx = canvas.getContext('2d');
				//以图片为背景剪裁画布
				ctx.drawImage(image, 0, 0, image.width, image.height);
				//获取图片后缀名
				const extension = image.src.substring(image.src.lastIndexOf('.') + 1).toLowerCase()
				// 某些图片url可能没有后缀名，默认是png
				return canvas.toDataURL('image/' + extension, 1)
			},
			download1() {
				var url = ''
				var width = 0
				var height = 0
				if(this.downloadQuality == 'small') {
					url = this.picInfo.oss800Watermark
					width = 1024
					height = this.picInfo.smallHeight
				} else if(this.downloadQuality == 'pre') {
					url = this.picInfo.oss800
					width = this.picInfo.picWidth
					height = this.picInfo.picHeight
				} else {
					url = this.picInfo.oss800Watermark
					width = 2048
					height = this.picInfo.mediumHeight
				}
				
				const image = new Image()
				image.src = url
				image.setAttribute('crossOrigin', 'Anonymous')
				image.setAttribute('width', width)
				image.setAttribute('height', height)
				
				const tag = document.createElement('a')
				const suffix = url.substring(url.lastIndexOf('.'))
				tag.setAttribute('download', this.picInfo.id + suffix)
				image.onload = () => {
					tag.href = this.getImageDataURL(image)
					tag.click()
				}
			},
			downloadPicAndTxt() {
				let zip = new JSZip()
				let imgs = zip.folder('图文打包')
				var content = "图片id:" + this.picInfo.id + "\n资源标题:" + this.picInfo.caption + "\n资源说明:" + this.picInfo.caption + "\n"
				imgs.file('图文描述.txt', new Blob([content], {type: "text/txt"}))
				
				var url = ''
				var width = 0
				var height = 0
				if(this.downloadQuality == 'small') {
					url = this.picInfo.oss800Watermark
					width = 1024
					height = this.picInfo.smallHeight
				} else if(this.downloadQuality == 'pre') {
					url = this.picInfo.oss800
					width = this.picInfo.picWidth
					height = this.picInfo.picHeight
				} else {
					url = this.picInfo.oss800Watermark
					width = 2048
					height = this.picInfo.mediumHeight
				}
				
				const image = new Image()
				image.src = url
				image.setAttribute('crossOrigin', 'Anonymous')
				image.setAttribute('width', width)
				image.setAttribute('height', height)
				
				const suffix = url.substring(url.lastIndexOf('.'))
				image.onload = () => {
					imgs.file('图片' + suffix, this.getImageDataURL(image).substring(22), {base64: true})
					zip.generateAsync({type: 'blob'}).then(function(content) {
						FileSaver.saveAs(content, '图文打包.zip')
					})
				}
				
			}
		},
		created() {
			var groupId = this.$route.query.groupId
			this.groupId = groupId
			var picId = this.$route.query.picId
			if(groupId) {
				var params = {
				  type: 1,
				  cType: 1,
				  curPage: 1,
				  size: 30,
				  sort: 1,
				  sortRule: 2
				}
				getGroupPics(groupId, params).then(res => {
					if(!res.data) {
						this.pics = []
					} else {
						this.pics = res.data.groupLists
						for(var i in this.pics) {
							if(this.pics[i].id == picId) {
								this.picInfo = this.pics[i]
								this.picIndex = parseInt(i)
								break
							}
						}
						this.picInfo.mediumHeight = parseInt(2048*this.picInfo.picHeight/this.picInfo.picWidth)
						this.picInfo.smallHeight = parseInt(1024*this.picInfo.picHeight/this.picInfo.picWidth)
						this.keywords = this.picInfo.keywords.split(',')
						
						this.$refs.picGroupViewer.searchType = 'SINGLE'
						this.$refs.picGroupViewer.picGroups = this.pics.map(picGroup => {
							return {
								id: picGroup.id,
								groupIds: groupId,
								num: picGroup.groupTotal,
								picture: picGroup.oss400,
								pictureHigh: picGroup.oss800,
								width: picGroup.picWidth,
								height: picGroup.picHeight,
								title: picGroup.caption,
								time: picGroup.createdAt
							}
						})
						this.$refs.picGroupViewer.init()
					}
				})
				
			}
		}
	}
</script>

<style lang="less" rel="stylesheet/less" scoped>
	.nav {
		width: 1280px;
		// margin: 0 auto 30px;
		margin-left: 20px;
		padding: 25px 0;
		text-align: left;
	}
	.content-wrapper {
		width: 100%;
		display: flex;
		overflow: hidden;
		min-height: 200px;
		justify-content: space-between;
		
		.left-wrapper {
			width: 920px;
			height: auto;
			overflow: hidden;
			
			.layer {
				width: 100%;
				height: 100%;
				display: flex;
				position: relative;
				box-sizing: border-box;
				align-items: center;
				justify-content: center;
				
				.favorite {
				    top: 30px;
				    right: 30px;
				    z-index: 1001;
				    position: absolute;
				}
				
				.count {
					width: 860px;
					bottom: 30px;
					top: 92%;
					z-index: 1002;
					position: absolute;
					text-align: center;
				}
				
				.count span {
					color: #333;
					padding: 0px 30px;
					text-align: center;
				}
				
				.image-layer {
					width: 80%;
					height: 80%;
					display: flex;
					z-index: 1000;
					position: absolute;
					align-items: center;
					justify-content: center;
				}
				
				.image-layer img {
					max-width: 100%;
					max-height: 100%;
					// min-width: 100px;
				}
				
				.image-layer button {
				    height: 80px;
				    // width: 40px;
					margin: 25px;
				}
				
				.image-layer button:hover {
					background-color: rgba(0, 0, 0, 0.04);
				}
				
				.transparent-layer {
				    top: 0;
				    left: 0;
				    right: 0;
				    bottom: 0;
				    opacity: 0.7;
				    z-index: 999;
				    position: absolute;
				    background-color: #fff;
				}
				
				.blur-layer {
				    width: 100%;
				    filter: blur(18px);
				    height: 100%;
				    radius: 10px;
				    display: flex;
				    position: absolute;
				    align-items: center;
				    justify-content: center;
				}
			}
			
		}
		.right-wrapper {
			width: 300px;
			text-align: left;
			.authDownload {
				.title {
				    color: #333333;
				    font-size: 16px;
				    margin-bottom: 20px;
				}
				// .select-size {
				// 	width: 100%;
				// }
				.button-group button{
					margin-top: 8px;
					margin-bottom: 8px;
					// width: 100%;
				}
				// input {
				// 	width: 100%;
				// }
				
				.intro-info {
				    border-top: 1px solid #dcdcdc;
				    margin-top: 25px;
				    padding-top: 20px;
					
					.title {
					    font-size: 16px;
					}
					
					.intro {
					    line-height: 1.5em;
					    padding-top: 15px;
					}
				}
				
				.base-info {
				    border-top: 1px solid #dcdcdc;
				    margin-top: 25px;
				    padding-top: 20px;
					
					.title {
					    font-size: 16px;
					}
					
					.info {
					    padding: 0px 0px 0px 0px;
					    list-style-type: none;
						
						li {
						    line-height: 1.4rem;
						}
					}
				}
			}
		}
		
	}
	
	.group-pics {
		width: 100%;
		margin-top: 30px;
		overflow: hidden;
	}
	
	
	.bar {
	    width: 100%;
	    height: 40px;
	    display: flex;
	    font-size: 24px;
	    margin-bottom: 15px;
	    justify-content: space-between;
	}
	
	.jss69 {
	    color: #222;
	    font-weight: 500;
	}
	
	.section_title {
	    color: #080808;
	    width: 100%;
	    height: 40px;
	    margin: 16px 0 0 0;
	    display: flex;
	    font-size: 24px;
	    font-weight: bold;
	    justify-content: space-between;
	}
	
	.MuiSvgIcon-root {
	    fill: #676767;
	    width: 1em;
	    height: 1em;
	    display: inline-block;
	    font-size: 1.5rem;
	    transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	    flex-shrink: 0;
	    user-select: none;
	}
	#backToGroup:hover .MuiSvgIcon-root {
	    fill: #cf4529;
	}
	.MuiSvgIcon-fontSizeSmall {
	    font-size: 1.25rem;
	}
	.button-label {
		font-weight: 500;
		font-size: 16px;
		// margin-top: 11px;
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
	.MuiIconButton-root {
	    flex: 0 0 auto;
	    color: rgba(0, 0, 0, 0.54);
	    padding: 12px;
	    overflow: visible;
	    font-size: 1.5rem;
	    text-align: center;
	    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	    border-radius: 50%;
	}
	.jss1019 {
	    width: 20px;
	    height: 20px;
	    padding: 0;
	    margin-left: 8px;
	}
	.a_nodecoration {
		text-decoration: none;
	}
	.MuiChip-root {
	    color: rgba(0, 0, 0, 0.87);
	    border: none;
	    cursor: default;
	    height: 32px;
	    display: inline-flex;
	    outline: 0;
	    padding: 0;
	    font-size: 0.8125rem;
	    box-sizing: border-box;
	    transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	    align-items: center;
	    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
	    white-space: nowrap;
	    border-radius: 16px;
	    vertical-align: middle;
	    justify-content: center;
	    text-decoration: none;
	    background-color: #e0e0e0;
	}
	.MuiChip-label {
	    overflow: hidden;
	    white-space: nowrap;
	    padding-left: 12px;
	    padding-right: 12px;
	    text-overflow: ellipsis;
	}
	.jss51 {
	    color: #A6A6A6;
	    border: 1px solid #D7D8DB;
	    cursor: pointer;
	    height: 40px;
	    margin: 16px 12px 0 0;
	    padding: 0 8px;
	    font-size: 16px;
	    border-radius: 18px;
	    background-color: #fff;
	}
</style>

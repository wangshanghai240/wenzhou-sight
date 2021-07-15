<template>
	<div class="pic-group-viewer-wrapper">
	  <div class="pic-group-viewer-info-wrapper" style="position:relative; padding:0; flex:1; max-width:100%; text-align: justify;">
		  
		  <div class="jss232">
			  <div class="MuiContainer-root jss52 MuiContainer-maxWidthLg">
				  <nav class="MuiTypography-root MuiBreadcrumbs-root jss53 MuiTypography-body2 MuiTypography-colorTextSecondary MuiTypography-displayBlock" aria-label="breadcrumb">
					  <ol class="MuiBreadcrumbs-ol">
						  <li class="MuiBreadcrumbs-li"><a class="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-body2 MuiTypography-colorTextPrimary" href="/index">大美温州</a></li>
						  <li aria-hidden="true" class="MuiBreadcrumbs-separator">/</li>
						  <li class="MuiBreadcrumbs-li"><p class="MuiTypography-root MuiTypography-body2 MuiTypography-colorInherit" style="margin-bottom: 0px;">{{group.title}}</p></li>
					  </ol>
				  </nav>
				  <h5 class="MuiTypography-root jss54 MuiTypography-h5 MuiTypography-colorTextPrimary">{{group.title}}</h5>
				  <div :class="{'open': titleOpen, 'jss55': true}">
					  <p class="MuiTypography-root jss56 MuiTypography-body2">{{group.groupCaption}}</p>
					  <button class="MuiButtonBase-root MuiIconButton-root jss57" tabindex="0" type="button">
						  <span class="MuiIconButton-label">
							  <svg ref="titleOpenBtn" @click="switchTitleOpen" class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
								<path ref="titleOpenSvg" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
							  </svg>
						  </span>
					  </button>
					  <button class="MuiButtonBase-root MuiIconButton-root jss57" tabindex="0" type="button"><span class="MuiIconButton-label"><svg ref="titleCopyBtn" @click="copyGroupTitle" class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14z"></path></svg></span></button>
				  </div>
			  </div>
		  </div>
		  
		  <hr class="MuiDivider-root"/>
		  
		  <div class="MuiContainer-root jss47 MuiContainer-maxWidthLg">
		  		<div class="MuiToolbar-root MuiToolbar-regular jss64 jss48 MuiToolbar-gutters">
					<div class="search-filter-wrapper" ref="searchResultDiv">
					  <div class="search-filter-item">
					    <span class="label">入库时间</span>
					    <a-date-picker @change="changeUploadTimeFrom" placeholder="开始时间" style="width: 120px" />
							  ~ <a-date-picker @change="changeUploadTimeTo" placeholder="结束时间" style="width: 120px"/>
					  </div>
					  <div class="search-filter-item">
					    <span class="label">拍摄时间</span>
					    <a-date-picker @change="changeShootTimeFrom" placeholder="开始时间" format="YYYY-MM-DD" style="width: 120px" /> 
							  ~ <a-date-picker @change="changeShootTimeTo" placeholder="结束时间" style="width: 120px"/>
					  </div>
					  <div class="search-filter-item">
					    <span class="label">排序</span>
					    <a-select default-value="1,2" style="width: 150px" v-model="sortStr" @change="changePicGroupPage(1)">
							<a-select-option value="1,2">
							  入库时间倒序
							</a-select-option>
							<a-select-option value="1,1">
							  入库时间正序
							</a-select-option>
							<!-- <a-select-option value="3,2">
							 拍摄时间倒序
							</a-select-option>
							<a-select-option value="3,1">
							 拍摄时间正序
							</a-select-option> -->
					    </a-select>
					  </div>
					  <span class="overview-info">共{{total}}个资源</span>
					</div>
					
		  			<div class="jss92">
		  				  <!-- <span class="MuiButtonBase-root MuiIconButton-root jss97 MuiCheckbox-root MuiCheckbox-colorPrimary jss84 MuiIconButton-colorPrimary" aria-disabled="false">
		  					  <span class="MuiIconButton-label">
		  						  <input type="checkbox" class="jss100" value="checkedAll" data-indeterminate="false" aria-label="secondary checkbox">
								  <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></svg></span></span><span class="jss72">
								  全选
						  </span> -->
						  <a-checkbox :checked="selectedPicIds.length === pics.length" @change="setAllPicIdsSelected" >全选</a-checkbox>
						  <span v-show="selectedPicIds.length > 1">
							共选择 {{selectedPicIds.length}} 张
							<button @click="downloadZip" class="MuiButtonBase-root MuiButton-root MuiButton-contained jss79 MuiButton-containedSizeSmall MuiButton-sizeSmall MuiButton-disableElevation" tabindex="0" type="button">
								<span class="MuiButton-label">
									<svg style="fill: #fff;" class="MuiSvgIcon-root jss80 MuiSvgIcon-fontSizeSmall" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path></svg>
								打包下载</span>
							</button>
						  </span>
					</div>
		  		</div>	 
				<div class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-2">
					  <div @mouseover="hoverPicIndex = index" @mouseout="hoverPicIndex = -1" class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-2 MuiGrid-grid-sm-4 MuiGrid-grid-md-2" v-for="(pic, index) in pics" v-bind:key="pic.id">
						  <div class="MuiPaper-root MuiCard-root jss101 MuiPaper-elevation1 MuiPaper-rounded">
							  <div class="jss102">
								  <a @click="$router.push('/picture-detail?groupId=' + groupId + '&picId=' + pic.id)" class="jss103" target="_blank">
									  <img :src="pic.oss176" class=" ls-is-cached lazyloaded" :alt="pic.caption"/>
								</a>
								<span class="MuiButtonBase-root MuiIconButton-root jss97 MuiCheckbox-root MuiCheckbox-colorPrimary checkbox MuiIconButton-colorPrimary" aria-disabled="false">
									<span class="MuiIconButton-label">
										<a-checkbox class="picIdCheckbox" v-show="selectedPicIds.includes(index) || hoverPicIndex === index" :value="index" :checked="selectedPicIds.includes(index)" @change="changeSelectedPicIds($event, index)"/>
										<!-- <input type="checkbox" class="jss100" :value="pic.id" data-indeterminate="false" aria-label="secondary checkbox"> -->
									</span>
								</span>
								<div class="buttonIconBox">
									<button class="MuiButtonBase-root MuiIconButton-root jss105" @click="download1(pic.oss800Watermark, pic.id)" tabindex="0" type="button">
										<span class="MuiIconButton-label">
											<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
												<path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path>
											</svg>
										</span>
									</button>
									<button class="MuiButtonBase-root MuiIconButton-root jss105" tabindex="0" type="button">
										<span class="MuiIconButton-label">
											<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
												<path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"></path>
											</svg>
										</span>
									</button>
								</div>
							</div>
							<div class="MuiCardContent-root jss106">
								<p class="jss107">{{pic.id}}</p>
								<div class="jss109">{{pic.caption}}</div>
								<div class="jss107">{{pic.createdAt}}</div>
								<div class="jss107">{{pic.size}}</div>
							</div>
						</div>
					</div>
				</div>	
		  </div>
		  
		  <div class="pagination-wrapper">
		    <a-pagination
				v-model="curPage"
		        showQuickJumper
		        :default-current="1"
		        :total="total"
		  		:pageSize="30"
		  		@change="changePicGroupPage"/>
		  </div>
		  
	  </div>
	</div>
	
</template>

<script>
import { getGroupPics } from '@/api/index'
import JSZip from "jszip"
import FileSaver from "file-saver"

export default {
	data() {
		return {
			groupId: 0,
			curPage: 1,
			group: {
				groupCaption: '',
				title: ''
			},
			pics: [],
			total: 0,
			sortStr: '1,2',
			uploadTimeFrom: '',
			uploadTimeTo: '',
			shootTimeFrom: '',
			shootTimeTo: '',
			titleOpen: false,
			selectedPicIds: [],
			hoverPicIndex: -1
		}
	},
	methods: {
		changeSelectedPicIds(e, picId) {
			if(e.target.checked) {
				this.selectedPicIds.push(picId)
			} else {
				this.selectedPicIds.splice(this.selectedPicIds.indexOf(picId), 1)
			}
		},
		downloadZip() {
			let zip = new JSZip()
			let imgs = zip.folder('图片打包')
			var imgList = []
			var _this = this
			for(var i in this.selectedPicIds) {
				var pic = this.pics[this.selectedPicIds[i]]
				
				let image = new Image();
				// 解决跨域 Canvas 污染问题
				image.setAttribute("crossOrigin", "anonymous");
				image.onload = function() {
					let canvas = document.createElement("canvas")
					canvas.width = image.width
					canvas.height = image.height
					let context = canvas.getContext("2d")
					context.drawImage(image, 0, 0, image.width, image.height)
					let url = canvas.toDataURL() // 图片的base64编码数据
					imgList.push(url.substring(22))
					
					if(imgList.length == _this.selectedPicIds.length) {
						for(var index in imgList) {
							imgs.file('photo' + index + '.png', imgList[index], {base64: true})
						}
						zip.generateAsync({type: 'blob'}).then(function(content) {
							FileSaver.saveAs(content, '图片打包.zip')
						})
					}
				}
				image.src = pic.oss800Watermark
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
		download1(url, imgId) {
			const tag = document.createElement('a')
			const suffix = url.substring(url.lastIndexOf('.'))
			tag.setAttribute('download', imgId + suffix)
			
			const image = new Image()
			image.src = url
			image.setAttribute('crossOrigin', 'Anonymous')
			image.onload = () => {
				tag.href = this.getImageDataURL(image)
				tag.click()
			}
		},
		download(url, imgId) {
			// var image = new Image()
			// image.src = url
			const suffix = url.substring(url.lastIndexOf('.'))
			const blob = new Blob([url], {type: 'image/' + suffix})
			//application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'})
			var fileName = imgId + suffix
			if(window.navigator && window.navigator.msSaveOrOpenBlob) {
				window.navigator.msSaveOrOpenBlob(blob, fileName)
			} else {
				const downloadElement = document.createElement('a')
				const href = window.URL.createObjectURL(blob)
				downloadElement.href = href
				downloadElement.download = fileName
				document.body.appendChild(downloadElement)
				downloadElement.click()
				document.body.removeChild(downloadElement)
				window.URL.revokeObjectURL(href)
			}
		},
		setAllPicIdsSelected(e) {
			if(e.target.checked) {
				this.selectedPicIds = this.pics.map((item, index) => index)
			} else {
				this.selectedPicIds = []
			}
		},
		switchTitleOpen() {
			this.$refs.titleCopyBtn.style.fill = 'rgba(0, 0, 0, 0.54)'
			this.titleOpen = !this.titleOpen
			if(this.titleOpen) {
				this.$refs.titleOpenSvg.setAttribute('d', 'M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z')
			} else {
				this.$refs.titleOpenSvg.setAttribute('d', 'M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z')
			}
		},
		copyGroupTitle() {
			this.copy(this.group.title)
		},
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
			this.curPage = e
			var sortStrs = this.sortStr.split(',')
			var params = {
				  type: 1,
				  cType: 1,
				  curPage: this.curPage,
				  size: 30,
				  uploadTimeFrom: this.uploadTimeFrom,
				  uploadTimeTo: this.uploadTimeTo,
				  shootTimeFrom: this.shootTimeFrom,
				  shootTimeTo: this.shootTimeTo,
				  sort: parseInt(sortStrs[0]),
				  sortRule: parseInt(sortStrs[1])
			}
			getGroupPics(this.groupId, params).then(res => {
				if(!res.data) {
					this.pics = []
					this.total = 0
				} else {
					this.pics = res.data.groupLists
					this.pics.forEach(item => {
						var groupIds = item.viewSortStr.split(',')
						var groupIdInts = new Array()
						groupIds.forEach(groupId => {
							if(groupId && !isNaN(groupId)) {
								groupIdInts.push(groupId)
							}
						})
						item.groupId1 = groupIdInts[0]
						item.groupId2 = groupIdInts[1]
					})
					this.total = res.data.group.groupTotal
					this.group = res.data.group
				}
				this.selectedPicIds = []
				
			})
		}
	},
	created() {
		this.groupId = this.$route.query.id
		this.changePicGroupPage(1)
	}
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
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
	
	.pagination-wrapper{
	  text-align: center;
	}
	
	.jss232 {
	    width: 100%;
	    overflow: hidden;
	    // min-height: e("calc(100vh - 120px)");
	    background-color: #fff;
	}
	.MuiBreadcrumbs-ol {
	    margin: 0;
	    display: flex;
	    padding: 0;
	    flex-wrap: wrap;
	    list-style: none;
	    align-items: center;
	}
	
	.MuiBreadcrumbs-separator {
	    display: flex;
	    margin-left: 8px;
	    user-select: none;
	    margin-right: 8px;
	}
	
	.jss52 {
	    display: flex;
	    padding: 32px 8px;
	    flex-direction: column;
	}
	
	@media (min-width: 1366px) {
		.MuiContainer-maxWidthLg {
		    max-width: 1366px;
		}
	}
	
	@media (min-width: 600px) {
		.MuiContainer-root {
		    padding-left: 24px;
		    padding-right: 24px;
		}
	}
	
	.MuiContainer-root {
	    width: 100%;
	    display: block;
	    box-sizing: border-box;
	    margin-left: auto;
	    margin-right: auto;
	    padding-left: 16px;
	    padding-right: 16px;
	}
	
	.jss53 {
	    width: 100%;
	    margin: 0 auto;
	    margin-bottom: 24px;
	}
	
	.MuiTypography-displayBlock {
	    display: block;
	}
	
	.MuiTypography-colorTextSecondary {
	    color: rgba(0, 0, 0, 0.54);
	}
	
	.MuiTypography-body2 {
	    font-size: 0.875rem;
	    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
	    font-weight: 400;
	    line-height: 1.43;
	    letter-spacing: 0.01071em;
	}
	
	.jss54 {
	    width: 100%;
	    margin: 0 auto;
	}
	
	.MuiTypography-colorTextPrimary {
	    color: rgba(0, 0, 0, 0.87);
	}
	
	.MuiTypography-h5 {
	    font-size: 1.5rem;
	    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
	    font-weight: 400;
	    line-height: 1.334;
	    letter-spacing: 0em;
	}
	
	.MuiTypography-body2 {
	    font-size: 0.875rem;
	    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
	    font-weight: 400;
	    line-height: 1.43;
	    letter-spacing: 0.01071em;
	}
	
	.MuiDivider-root {
	    border: none;
	    height: 1px;
	    margin: 0;
	    flex-shrink: 0;
	    background-color: rgba(0, 0, 0, 0.12);
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
	
	.MuiButton-root {
	    color: rgba(0, 0, 0, 0.87);
	    padding: 6px 16px;
	    font-size: 0.875rem;
	    min-width: 64px;
	    box-sizing: border-box;
	    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
	    font-weight: 500;
	    line-height: 1.75;
	    border-radius: 4px;
	    letter-spacing: 0.02857em;
	    text-transform: uppercase;
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
	
	.MuiIconButton-root:hover {
	  background-color: rgba(0, 0, 0, 0.04);
	}
	
	.jss105 .MuiSvgIcon-root{
	  fill: #fff;
	}
	
	.jss105:hover .MuiSvgIcon-root{
	  fill: rgba(0, 0, 0, 0.84);
	}
	
	.MuiIconButton-root.Mui-disabled {
	  color: rgba(0, 0, 0, 0.26);
	  background-color: transparent;
	}
	@media (hover: none) {
	  .MuiIconButton-root:hover {
	    background-color: transparent;
	  }
	}
	
	.jss55.open {
	    height: auto;
	    min-height: 40px;
	}
	
	.jss55 {
	    width: 100%;
	    height: 40px;
	    margin: 24px 0px 0px 0px;
	    overflow: hidden;
	    position: relative;
	    line-height: 20px;
	}
	
	.jss56 {
	    float: left;
	    max-width: 85%;
	    line-height: 20px;
	}
	
	.jss57 {
	    float: left;
	    width: 20px;
	    height: 20px;
	    padding: 0;
	    margin-left: 16px;
	}
	
	
	@media (min-width: 600px) {
		.MuiToolbar-regular {
		    min-height: 64px;
		}
	}
	
	
	@media (min-width: 0px) and (orientation: landscape) {
		.MuiToolbar-regular {
		    min-height: 48px;
		}
	}
	
	.MuiToolbar-regular {
	    min-height: 56px;
	}
	
	@media (min-width: 600px) {
		.MuiToolbar-gutters {
		    padding-left: 24px;
		    padding-right: 24px;
		}
	}
	
	.MuiToolbar-gutters {
	    padding-left: 16px;
	    padding-right: 16px;
	}
	
	.MuiToolbar-root {
	    display: flex;
	    position: relative;
	    align-items: center;
	}
	
	.jss47 {
		padding: 0px 8px;
	}
	
	.jss48 {
	    padding: 24px 0px;
	}
	
	.jss64 {
	    display: block;
	    overflow: hidden;
	    padding-top: 16px;
	    padding-left: 12px;
	    padding-right: 12px;
	    padding-bottom: 16px;
	}
	
	
	
	.jss92 {
	    height: 34px;
	    margin-top: 20px;
	    line-height: 34px;
	}
	
	.MuiButton-contained {
	    color: rgba(0, 0, 0, 0.87);
	    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 20%), 0px 2px 2px 0px rgb(0, 0, 0, 14%), 0px 1px 5px 0px rgb(0, 0, 0, 12%);
	    background-color: #e0e0e0;
	}
	
	.MuiButton-disableElevation {
	    box-shadow: none;
	}
	
	.MuiButton-containedSizeSmall {
	    padding: 4px 10px;
	    font-size: 0.8125rem;
	}
	
	.jss80 {
	    margin-right: 8px;
	}
	
	.jss79 {
	    color: #fff;
	    height: 34px;
	    margin: 0px 8px;
	    box-sing: border-box;
	    background-color: #333;
	}
	
	.jss84 {
	    width: 34px;
	    height: 34px;
	    margin: -2px 0 0 0;
	    padding: 0;
	}
	
	.MuiCheckbox-root {
	    color: rgba(0, 0, 0, 0.54);
	}
	
	.MuiButton-label {
	    width: 100%;
	    display: inherit;
	    align-items: inherit;
	    justify-content: inherit;
	}
	
	.MuiIconButton-label {
	    width: 100%;
	    display: flex;
	    align-items: inherit;
	    justify-content: inherit;
	}
	
	.jss100 {
		top: 0;
		left: 0;
		width: 100%;
		cursor: inherit;
		height: 100%;
		margin: 0;
		// opacity: 0;
		padding: 0;
		z-index: 1;
		position: absolute;
	}
	
	.jss72 {
	    color: #333;
	    font-size: 14px;
	}
	
	.MuiGrid-container {
	    width: 100%;
	    display: flex;
	    flex-wrap: wrap;
	    box-sizing: border-box;
	}
	
	.MuiGrid-item {
	    margin: 0;
	    box-sizing: border-box;
	}
	
	@media (min-width: 600px) {
		.MuiGrid-grid-sm-4 {
		    flex-grow: 0;
		    max-width: 33.333333%;
		    flex-basis: 33.333333%;
		}
	}
	
	@media (min-width: 960px) {
		.MuiGrid-grid-md-2 {
		    flex-grow: 0;
		    max-width: 16.666667%;
		    flex-basis: 16.666667%;
		}
	}
	
	.MuiGrid-spacing-xs-2 {
	    width: e("calc(100% + 16px)");
	    margin: -8px;
	}
	
	.MuiGrid-spacing-xs-2 > .MuiGrid-item {
	    padding: 8px;
	}
	
	.MuiPaper-root {
	    color: rgba(0, 0, 0, 0.87);
	    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	    background-color: #fff;
	}
	
	.MuiPaper-rounded {
	    border-radius: 4px;
	}
	
	.MuiPaper-elevation1 {
	    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0,  20%), 0px 1px 1px 0px rgba(0, 0, 0, 14%), 0px 1px 3px 0px rgba(0, 0, 0, 12%);
	}
	
	.MuiCard-root {
	    overflow: hidden;
	}
	
	.jss101 {
	    float: left;
	    width: 198px;
	    height: 350px;
	    overflow: visible;
	    position: relative;
	}
	
	.jss102 {
	    height: 198px;
	    display: flex;
	    padding: 8px;
	    position: relative;
	    min-width: 182px;
	    box-sizing: border-box;
	    margin-left: 8px;
	    margin-right: 8px;
	    border-bottom: 1px solid #F4F4F4;
	}
	
	.jss103 {
	    margin: auto;
	    overflow: hidden;
	    max-width: 182px;
	    max-height: 182px;
	}
	
	.jss101 .checkbox {
	    top: 0px;
	    left: -8px;
	    // display: none;
	    position: absolute;
	}
	
	.MuiCheckbox-root {
	    color: rgba(0, 0, 0, 0.54);
	}
	
	.jss97 {
	    padding: 9px;
	}
	
	.jss101 .buttonIconBox {
	    left: 0;
	    right: 0;
	    bottom: 8px;
	    display: none;
	    position: absolute;
	    text-align: center;
	}
	
	.jss101:hover .buttonIconBox {
		display: block;
	}
	
	.jss105 {
	    color: #fff;
	    width: 30px;
	    height: 30px;
	    margin: 8px;
	    padding: 0px;
	    background-color: rgba(0,0,0,0.7);
	}
	
	.MuiSvgIcon-root {
	    fill: rgba(0, 0, 0, 0.54);
	    width: 1em;
	    height: 1em;
	    display: inline-block;
	    font-size: 1.5rem;
	    transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	    flex-shrink: 0;
	    user-select: none;
	}
	
	.MuiSvgIcon-fontSizeSmall {
	    font-size: 1.25rem;
	}
	
	.MuiCardContent-root:last-child {
	    padding-bottom: 24px;
	}
	
	.jss106 {
	    padding: 14px 8px 8px 8px;
	}
	
	.jss107 {
	    color: #666;
	    margin: 0 0 8px 0;
	    font-size: 12px;
	}
	
	.jss109 {
	    color: #080808;
	    height: 38px;
	    overflow: hidden;
	    font-size: 12px;
	    word-break: break-all;
	    line-height: 19px;
	    margin-bottom: 8px;
	}
	
	
	
</style>

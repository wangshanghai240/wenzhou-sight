<template>
	<div class="MuiToolbar-root MuiToolbar-regular page_main MuiToolbar-gutters">
		<div class="left_wrapper">
			<div class="header">
				<div style="float:right;" class="head_buttons">
					<a-button type="info" @click="showDeleteImgDialog">删除</a-button>
					<a-button type="info" @click="moveToFirst">置于最前</a-button>
					<a-button type="info" @click="moveToLast">置于最后</a-button>
				</div>
			</div>
			<div class="content">
				<div class="upload-container">
					<div v-for="(image, index) in fileList" v-bind:key="image.uid"
					 :class="{'image-preview': resourceType !=='vector', 'selected': image.uid===selectedImageUid, vector: resourceType==='vector'}" @click="selectImage(image.uid, index)">
					 <!-- <div v-show="imageUrl.length>1" class="image-preview-wrapper">
					    <img :src="imageUrl">
					    <div class="image-preview-action">
					      <i class="el-icon-delete" @click="rmImage" />
					    </div>
					  </div> -->
					  <div class="image-preview-wrapper">
						<button v-if="image.isSurface" class="MuiButtonBase-root MuiButton-root MuiButton-text coverButton isCover MuiButton-textSizeSmall MuiButton-sizeSmall MuiButton-disableElevation Mui-disabled Mui-disabled" tabindex="-1" type="button" disabled="">
							<span class="MuiButton-label">封面</span>
						</button>
						<button v-else class="MuiButtonBase-root MuiButton-root MuiButton-text coverButton isNotCover MuiButton-textSizeSmall MuiButton-sizeSmall MuiButton-disableElevation Mui-disabled Mui-disabled" tabindex="-1" type="button"
							@click="setCover(index)">
							<span class="MuiButton-label">设为封面</span>
						</button>
						<a-popover v-if="resourceType==='vector' && image.url" placement="rightBottom">
							<template slot="content">上传源文件</template>
							<a-button class="pre_file_upload_btn" alt="上传源文件" @click="triggerSourceUpload(image.uid)">
								<a-icon type="upload" :style="{color: '#ffffff'}" alt="上传源文件"></a-icon>
							</a-button>
							<input style="display: none; z-index: -1;" type="file" :ref="'sourceFile' + image.uid" @change="setSourceFile($event, index)"/>
						</a-popover>
						 <img class="vector" v-if="resourceType==='vector'" :src="image.url"/>
						<!-- <button v-if="resourceType==='vector'" class="MuiButtonBase-root MuiButton-root MuiButton-text coverButton isCover MuiButton-textSizeSmall MuiButton-sizeSmall MuiButton-disableElevation Mui-disabled Mui-disabled" tabindex="-1" type="button" disabled="">
						 	<span class="MuiButton-label">设置源图</span>
						 </button> -->
					     <img class="picture" v-if="resourceType==='picture'" :src="image.url"/>
						 <video v-if="resourceType==='video'" :src="image.url" controls="controls">您的浏览器不支持视频播放</video>
					    <!-- <div class="image-preview-action">
					      <i class="el-icon-delete" @click="rmImage(index)" />
					    </div> -->
						<a-progress type="circle" v-if="resourceType!=='vector' && uploading && !image.url"
							style="position: absolute; left: 30px; margin-top: 10px;"
							:percent="uploadPercent"></a-progress>
					  </div>
					</div>
					
				  <el-upload
				    :multiple="true"
				    :http-request="customUpload"
				    :action="fileUpload"
				    :before-upload="beforeUpload"
					:on-progress="uploadProgress"
				    :with-credentials="true"
				    :show-file-list="false"
				    class="avatar-uploader"
				    list-type="picture-card"
				    :file-list="fileList">
				    <div class="choose_picture">
						  <a-icon :style="{marginTop: '56px', height: '0px'}" size="large" type="plus" ></a-icon>
						  <span>
							  请选择{{resourceTypeName}}
						  </span>
					  </div>
				  </el-upload>
				  
				</div>
			</div>
		</div>
		
		<div class="right_wrapper">
			<div class="header">
				<!-- <a-button :disabled="!canCommit" type="danger" style="background-color: #34BF49; border-color: #34BF49;" @click="save(true)">保存草稿</a-button> -->
				<a-button :disabled="!canCommit" type="danger"  @click="save(false)">提交</a-button>
			</div>
			<div class="content">
				<a-form-model ref="uploadInfoForm" :model="uploadInfoForm" :rules="uploadInfoFormRules" style="text-align: left;" >
					<div class="group_title">
						组信息
					</div>
					<a-form-model-item label="组照标题" prop="groupTitle">
						<a-input size="large" v-model="uploadInfoForm.groupTitle" placeholder="请输入组照标题"></a-input>
					</a-form-model-item>
					<a-form-model-item label="组照说明" prop="groupCaption">
						<a-input size="large" v-model="uploadInfoForm.groupCaption" placeholder="请输入组照说明"></a-input>
					</a-form-model-item>
					<a-form-model-item label="组照分类" prop="categoryId">
						<a-select size="large" v-model="uploadInfoForm.categoryId">
							<a-select-option v-for="category in categoryList" @click="setGroupCategory(category.id, category.cname)" v-bind:key="category.id">{{category.cname}}</a-select-option>
						</a-select>
					</a-form-model-item>
					<a-form-model-item label="组照关键词" prop="groupKeywords">
						<div class="keywords_border MuiInputBase-root MuiOutlinedInput-root jss207 jss210 MuiInputBase-formControl MuiInputBase-adornedStart MuiOutlinedInput-adornedStart">
							<div
								v-for="(keyword, index) in uploadInfoForm.groupKeywordArr"
								v-bind:key="keyword"
								class="MuiButtonBase-root MuiChip-root jss221 MuiChip-clickable MuiChip-deletable" tabindex="0" role="button" style="">
								<span class="MuiChip-label">{{keyword}}</span>
								<svg class="MuiSvgIcon-root MuiChip-deleteIcon" focusable="false" viewBox="0 0 24 24" aria-hidden="true" @click="removeKeyword('groupKeywordArr', index)">
									<path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>
								</svg>
							</div>
							
							<a-input size="large" @blur="createKeywordLabel('groupKeywords')" @pressEnter="createKeywordLabel('groupKeywords')" @change="changeKeywords($event, 'groupKeywords')" v-model="uploadInfoForm.groupKeywords" placeholder="请输入关键词,并空格或回车"></a-input>
						</div>
					</a-form-model-item>
					
					<div class="group_title">
						{{resourceTypeName}}信息
					</div>
					<a-form-model-item label="摄影师">
						<a-input size="large" v-model="uploadInfoForm.assetsList[selectedImageIndex].creditLine" placeholder="请输入摄影师"></a-input>
					</a-form-model-item>
					<a-form-model-item label="署名">
						<a-input size="large" v-model="uploadInfoForm.assetsList[selectedImageIndex].signature" placeholder="请输入署名"></a-input>
					</a-form-model-item>
					<a-form-model-item label="拍摄地点">
						<a-select default-value="0" v-model="uploadInfoForm.assetsList[selectedImageIndex].firstCityIndex" style="width: 120px;margin-right: 4px">
							<a-select-option v-for="(province, index) in provinceData" :key="index">
								{{ province.label }}
							</a-select-option>
						</a-select>
						<a-select default-value="0" v-model="uploadInfoForm.assetsList[selectedImageIndex].secondCityIndex"
							style="width: 120px">
							<a-select-option v-for="(city, index) in provinceData[uploadInfoForm.assetsList[selectedImageIndex].firstCityIndex].children" :key="index">
								{{ city.label }}
							</a-select-option>
						</a-select>
						<a-input size="large" v-model="uploadInfoForm.assetsList[selectedImageIndex].location" placeholder="请输入拍摄地点"></a-input>
					</a-form-model-item>
					<a-form-model-item label="拍摄时间">
						<a-date-picker size="large" v-model="uploadInfoForm.assetsList[selectedImageIndex].shootTime" placeholder="请输入拍摄时间" valueFormat="x" />
					</a-form-model-item>
					<a-form-model-item :label="resourceTypeName + '说明'">
						<a-textarea :rows="2" size="large" v-model="uploadInfoForm.assetsList[selectedImageIndex].caption" placeholder="点击输入说明(1000字以内)说明需要包括年、月、日、地点，画面本身的内容"></a-textarea>
					</a-form-model-item>
					<a-form-model-item label="关键词">
						<div class="keywords_border MuiInputBase-root MuiOutlinedInput-root jss207 jss210 MuiInputBase-formControl MuiInputBase-adornedStart MuiOutlinedInput-adornedStart">
							<div
								v-for="(keyword, index) in uploadInfoForm.assetsList[selectedImageIndex].keywordArr"
								v-bind:key="keyword"
								class="MuiButtonBase-root MuiChip-root jss221 MuiChip-clickable MuiChip-deletable" tabindex="0" role="button" style="">
								<span class="MuiChip-label">{{keyword}}</span>
								<svg class="MuiSvgIcon-root MuiChip-deleteIcon" focusable="false" viewBox="0 0 24 24" aria-hidden="true" @click="removeAssetKeyword('keywords', 'keywordArr', index)">
									<path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>
								</svg>
							</div>
							
							<a-input class="ant-input-keyword" size="large" @blur="createAssetKeywordLabel('keywords', 'keywordArr')" @pressEnter="createAssetKeywordLabel('keywords', 'keywordArr')" @change="changeAssetKeywords($event, 'keywords', 'keywordArr')" v-model="uploadInfoForm.assetsList[selectedImageIndex].keywords" placeholder="请输入关键词,并空格或回车"></a-input>
						</div>
					</a-form-model-item>
					<a-form-model-item label="人物关键词">
						<div class="keywords_border MuiInputBase-root MuiOutlinedInput-root jss207 jss210 MuiInputBase-formControl MuiInputBase-adornedStart MuiOutlinedInput-adornedStart">
							<div
								v-for="(keyword, index) in uploadInfoForm.assetsList[selectedImageIndex].peopleArr"
								v-bind:key="keyword"
								class="MuiButtonBase-root MuiChip-root jss221 MuiChip-clickable MuiChip-deletable" tabindex="0" role="button" style="">
								<span class="MuiChip-label">{{keyword}}</span>
								<svg class="MuiSvgIcon-root MuiChip-deleteIcon" focusable="false" viewBox="0 0 24 24" aria-hidden="true" @click="removeAssetKeyword('people' ,'peopleArr', index)">
									<path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>
								</svg>
							</div>
							
							<a-input class='ant-input-personal' size="large" @blur="createAssetKeywordLabel('people', 'peopleArr')" @pressEnter="createAssetKeywordLabel('people', 'peopleArr')" @change="changeAssetKeywords($event, 'people', 'peopleArr')" v-model="uploadInfoForm.assetsList[selectedImageIndex].people" placeholder="请输入关键词,并空格或回车"></a-input>
						</div>
					</a-form-model-item>
				</a-form-model>
			</div>
		</div>
		
		<a-modal title="确定删除" :visible="deleteImgVisible" @ok="deleteImg" @cancel="deleteImgVisible=false">
			您确定要删除该资源？
		</a-modal>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { upload, submitResGroup, myUploads } from '@/api/user'
	import { categories } from '@/api/index'
	import city from '@/store/area'
	
	city.unshift({
		"value": "0",
		"label": "请选择",
		"children": [{
			"value": "-1",
			"label": "请选择"
		}]
	})
	
	const resourceTypeInfos = {
		picture: {
			assetType: 1,
			cname: '图片' 
		},
		vector: {
			assetType: 2,
			cname: '设计素材' 
		},
		video: {
			assetType: 3,
			cname: '视频' 
		}
	}
	
	export default { 
		data() {
			return {
				resourceType: 'picture',
				resourceTypeName: '图片',
				uploading: false,
				uploadPercent: 0,
				
				provinceData: city,
				categoryList: [],
				
				canCommit: false,
				uploadInfoForm: {
					sortStr: '',
					sortName: '',
					surfacePhoto: '',
					groupTitle: '',
					groupCaption: '',
					groupKeywords: '',
					groupKeywordArr: [],
					tagPath: '',
					assetType: 1,
					assetsList: []
				},
				uploadInfoFormRules: {
					groupTitle: [
						{required: true, message: '组照标题不能为空'}
					],
					groupCaption: [
						{required: true, message: '组照说明不能为空'}
					],
					categoryId: [
						{required: true, message: '请选择一个组照分类'}
					],
					groupKeywords: [
						{required: true, message: '请填写组照关键词'}
					],
				},
				loading: false,
				listObj: {},
				fileList: [],
				selectedImageUid: '',
				selectedImageIndex: 0,
				deleteImgVisible: false
			}
		},
		computed: {
			...mapGetters(['fileUpload', 'uploadedFilePrefix', 'token', 'name']),
		},
		methods: {
			// imgChange: function(info) {
			// 	if(info.file.status === 'uploading') {
			// 		this.loading = true
			// 		return
			// 	}
			// 	if(info.file.status === 'done') {
			// 		console.log('done')
			// 	}
			// }
			triggerSourceUpload(uid) {
				this.$refs['sourceFile' + uid][0].click()
			},
			setSourceFile(event, index) {
				if(event.target.files.length > 0) {
					var file  = event.target.files[0]
					upload({file: file}).then(res => {
						const { code, msg, data } = res
						if (code == 200) {
						  this.uploadInfoForm.assetsList[index].source = data
						} else {
						  this.$message.error('上传失败:' + m)
						}
					})
				}
			},
			save(isDraft) {
				this.uploadInfoForm.isDraft = isDraft?1:0
				if(this.uploadInfoForm.assetsList.length === 1 && !this.uploadInfoForm.assetsList[0].ossYuantu) {
					this.$message.error('请至少上传一个资源')
					return
				}
				
				this.uploadInfoForm.groupKeywords = this.uploadInfoForm.groupKeywordArr.join(',')
				
				this.$refs.uploadInfoForm.validate((valid, err)=>{
					// var reallyInValid = this.uploadInfoForm.groupKeywordArr.length == 0
					// for(var i in err) {
					// 	if(i !== 'groupKeywords') {
					// 		reallyInValid = true
					// 	} else if(this.uploadInfoForm.groupKeywordArr.length > 0) {
					// 		this.$refs.uploadInfoForm.clearValidate('groupKeywords')
					// 	}
					// }
					
					if(valid) {
						for(var i in this.uploadInfoForm.assetsList) {
							if(this.uploadInfoForm.assetsList[i].isSurface) {
								this.uploadInfoForm.surfacePhoto = this.uploadInfoForm.assetsList[i].ossYuantu
								break
							}
						}
						
						const assetType = resourceTypeInfos[this.resourceType].assetType
						this.uploadInfoForm.assetsList.forEach((item, index) => {
							item.keywords = item.keywordArr.join(',')
							item.people = item.peopleArr.join(',')
							item.groupIndex = index
							item.assetType = assetType
							item.area = "中国"
							var province = this.provinceData[item.firstCityIndex].label
							var city = this.provinceData[item.firstCityIndex].children[item.secondCityIndex].label
							if(province!=='请选择') {
								item.area += "/" + province
							}
							if(city!=='请选择') {
								item.area += "/" + city
							}
						})
						// this.uploadInfoForm.createTime = this.uploadInfoForm.shootTime
						this.uploadInfoForm.onlineState = 2
						submitResGroup(this.uploadInfoForm).then(res => {
							this.$message.success('上传成功')
							this.uploadInfoForm.groupKeywords = ''
							this.uploadInfoForm.assetsList.forEach(item => {
								item.keywords = ''
								item.people = ''
							})
						})
					}
				})
			},
			setGroupCategory(categoryId, categoryName) {
				this.uploadInfoForm.sortStr = categoryId
				this.uploadInfoForm.sortName = categoryName
			},
			selectImage(uid, index) {
				this.selectedImageUid = uid
				this.selectedImageIndex = index
			},
			customUpload(file) {
			  upload(file).then(res => {
			    const { code, msg, data } = res
			    if (code == 200) {
			      this.handleAvatarSuccess(data, file.file)
			    } else {
			      this.$message.error('上传失败:' + m)
			    }
			  })
			},
			uploadProgress(event, file, fileList) {
				console.log(event)
				console.log(file)
				this.uploadPercent = file.percentage.toFixed(0) * 1
			},
			assureOneAsset() {
				if(this.uploadInfoForm.assetsList.length == 0) {
					this.uploadInfoForm.assetsList.push({
					  creditLine: this.name,
					  signature: this.name,
					  shootTime: '',
					  location: '',
					  area: "",
					  firstCityIndex: 0,
					  secondCityIndex: 0,
					  caption: '',
					  keywords: '',
					  people: '',
					  keywordArr: [],
					  peopleArr: [],
					  ossYuantu: ''
					})
					this.selectedImageIndex = 0
					this.canCommit = false
				}
			},
			rmImage(index) {
			  var temp = this.fileList.splice(index, 1)
			  this.uploadInfoForm.assetsList.splice(index, 1)
			  if(this.fileList.length > 0) {
				this.selectedImageUid = this.fileList[0].uid
				this.selectedImageIndex = 0
			  } else {
				this.selectedImageUid = ''
				this.selectedImageIndex = -1
				this.assureOneAsset()
			  }
			},
			emitInput(val) {
			  // this.$emit('input', val)
			},
			beforeUpload(file) {
			  if(this.resourceType === 'video') {
				  const isLt10M = file.size / 1024 / 1024  < 10;
				  if (['video/mp4', 'video/ogg', 'video/flv','video/avi','video/wmv','video/rmvb'].indexOf(file.type) == -1) {
					  this.$message.error('请上传正确的视频格式');
					  return false;
				  }
				  if (!isLt10M) {
					  this.$message.error('上传视频大小不能超过10MB哦!');
					  return false;
				  }
				  this.uploadPercent = 0
				  const interval = setInterval(() => {
					if (this.uploadPercent >= 99) {
					  clearInterval(interval)
					  return
					}
					this.uploadPercent += 1 //进度条进度
				  }, 200)
				  
			  }
			  
				
			  const fileName = file.uid
			  if(!this.selectedImageUid) {
				this.selectedImageUid = fileName
			  }
			  this.listObj[fileName] = {name: file.name, status: '', hasSuccess: false, uid: file.uid}
			  this.fileList.push({name: file.name, status: '', hasSuccess: false, uid: file.uid})
			  this.uploading = true
			  this.uploadPercent = 0
			  
			  if(this.resourceType === 'picture') {
				  const img = new Image()
				  const _URL = window.URL || window.webkitURL
				  img.src = _URL.createObjectURL(file)
				  this.emitInput(img.src)
				  
				  const _self = this
				  return new Promise((resolve, reject) => {
				    img.onload = function() {
				      _self.listObj[fileName] = { name: file.name, status: '', hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
				    }
				    resolve(true)
				  })
			  } else {
				  return true
			  }
			},
			addUrl(uid, url) {
				if(this.fileList.length === 1) {
				  this.selectedImageIndex = 0
				  this.selectedImageUid = uid
				  this.uploadInfoForm.assetsList[0].ossYuantu = url
				  this.fileList[0].isSurface = true
				  this.uploadInfoForm.assetsList[0].isSurface = true
				  this.canCommit = true
				} else {
				  this.uploadInfoForm.assetsList.push({
					  creditLine: this.name,
					  signature: this.name,
					  shootTime: '',
					  location: '',
					  area: "",
					  firstCityIndex: 0,
					  secondCityIndex: 0,
					  caption: '',
					  keywords: '',
					  people: '',
					  keywordArr: [],
					  peopleArr: [],
					  ossYuantu: url
				  })
				}
			},
			handleAvatarSuccess(data, file, fileList) {
			  if (data) {
			    this.emitInput(data)
			  }
			  var url = this.uploadedFilePrefix + '/' + data
			  
			  // if(this.resourceType === 'video') {
				 //  this.fileList.push({url: url, name: file.name, status: 'ready', hasSuccess: true, uid: file.uid})
				 //  this.addUrl(file.uid, url)
				 //  return
			  // }
			
			  const uid = file.uid
			  const objKeyArr = Object.keys(this.listObj)
			  for (let i = 0, len = objKeyArr.length; i < len; i++) {
			    if (this.listObj[objKeyArr[i]].uid === uid) {
				  this.listObj[objKeyArr[i]].url = url
				  this.listObj[objKeyArr[i]].hasSuccess = true
				  this.listObj[objKeyArr[i]].status = 'ready'
				  this.fileList[this.fileList.length - 1] = this.listObj[objKeyArr[i]]
				  this.addUrl(uid, url)
				  this.uploadPercent = 100
				  // console.log(this.fileList[this.fileList.length - 1])
				  break
			    }
			  }
			  this.uploading = false
			},
			moveToFirst() {
				if(this.fileList.length < 2) {
					return
				}
				if(this.selectedImageIndex<=0) {
					return
				}
				var temp = this.fileList.splice(this.selectedImageIndex, 1)
				this.fileList.unshift(temp[0])
				
				temp = this.uploadInfoForm.assetsList.splice(this.selectedImageIndex, 1)
				this.uploadInfoForm.assetsList.unshift(temp[0])
				this.selectedImageIndex = 0
			},
			moveToLast() {
				if(this.fileList.length < 2) {
					return
				}
				if(this.selectedImageIndex === -1 || this.selectedImageIndex === this.fileList.length-1) {
					return
				}
				var temp = this.fileList.splice(this.selectedImageIndex, 1)
				this.fileList.push(temp[0])
				
				temp = this.uploadInfoForm.assetsList.splice(this.selectedImageIndex, 1)
				this.uploadInfoForm.assetsList.push(temp[0])
				this.selectedImageIndex = this.fileList.length-1
			},
			showDeleteImgDialog() {
				if(this.selectedImageIndex === -1 || this.fileList.length == 0) {
					return
				}
				this.deleteImgVisible = true
			},
			deleteImg() {
				if(this.selectedImageIndex === -1 || this.fileList.length == 0) {
					return
				}
				this.fileList.splice(this.selectedImageIndex, 1)
				this.uploadInfoForm.assetsList.splice(this.selectedImageIndex, 1)
				if(this.fileList.length > 0) {
					this.selectedImageUid = this.fileList[0].uid
					this.selectedImageIndex = 0
				} else {
					this.selectedImageUid = ''
					this.selectedImageIndex = 0
					this.assureOneAsset()
				}
				this.deleteImgVisible = false
				// this.$confirm({
				// 	title: '确定删除',
				// 	content: '您确认要删除该资源？',
				// 	okText: '确定',
				// 	okType: 'danger',
				// 	cancelText: '取消',
				// 	onOk() {
						
				// 	}
				// })
			},
			
			setCover(index) {
				this.fileList.forEach(item => {
					item.isSurface = false
				})
				this.uploadInfoForm.assetsList.forEach(item => {
					item.isSurface = false
				})
				this.fileList[index].isSurface = true
				this.uploadInfoForm.assetsList[index].isSurface = true
				this.$forceUpdate()
			},
			
			changeKeywords(e, keywordField) {
				if(e.data === ' ') {
					this.createKeywordLabel(keywordField)
				}
			},
			createKeywordLabel(keywordField) {
				if(!this.uploadInfoForm.groupKeywords.trim()) {
					return
				}
				this.uploadInfoForm[keywordField.substring(0, keywordField.length-1) + 'Arr'].push(this.uploadInfoForm.groupKeywords.trim())
				this.uploadInfoForm[keywordField] = ''
			},
			removeKeyword(keywordField, index) {
				this.uploadInfoForm[keywordField].splice(index, 1)
			},
			changeAssetKeywords(e, keywordField, keywordArrField) {
				if(e.data === ' ') {
					this.createAssetKeywordLabel(keywordField, keywordArrField)
				}
			},
			createAssetKeywordLabel(keywordField, keywordArrField) {
				var asset = this.uploadInfoForm.assetsList[this.selectedImageIndex]
				if(!asset[keywordField].trim()) {
					return
				}
				asset[keywordArrField].push(asset[keywordField].trim())
				asset[keywordField] = ''
			},
			removeAssetKeyword(keywordField, keywordArrField, index) {
				var asset = this.uploadInfoForm.assetsList[this.selectedImageIndex]
				asset[keywordArrField].splice(index, 1)
			}
			
		},
		created() {
			categories().then(res => {
				this.categoryList = res.data
			})
			this.assureOneAsset()
			if(this.$route.query.resourceType) {
				this.resourceType = this.$route.query.resourceType
			}
			this.uploadInfoForm.assetType = resourceTypeInfos[this.resourceType].assetType
			this.resourceTypeName = resourceTypeInfos[this.resourceType].cname
		}
	}
</script>

<style lang="less" rel="style/less">
	.page_main {
		display: flex;
		
		.left_wrapper {
			width: 66%;
			flex: 1;
			height: 100%;
			border: 1px solid #eeeff2;
			border-top: none;
			
			.head_buttons > button {
				margin: 6px;
			}
			
			.content {
				.ant-upload-list-picture-card-container {
					// width: 200px;
					// height: 200px;
					// margin: 0 8px 8px 20px;
					width: 25%;
				}
				.ant-upload-list-picture .ant-upload-list-item, .ant-upload-list-picture-card .ant-upload-list-item {
					width: 100%;
					height: 100%;
				}
				
				.ant-upload.ant-upload-select-picture-card {
					// width: 200px;
					// height: 200px;
					width: 25%;
					margin: 8px 8px 8px 20px;
				}
			}
			
		}
		
		.right_wrapper {
			width: 34%;
			
			.header > button {
				margin: 5px;
				width: 40%;
				float: left;
				margin-left: 35px;
				margin-top: 20px;
			}
			
			.group_title {
				font-size: 1rem;
				font-family: "Roboto", "Helvetica", "Arial", sans-serif;
				font-weight: 400;
				line-height: 1.75;
				letter-spacing: 0.00938em;
			}
			
			.content {
				background-color: White;
				
				.ant-form {
					padding: 30px;
					
					.MuiInputBase-root {
					    color: rgba(0, 0, 0, 0.87);
					    cursor: text;
					    display: inline-flex;
					    position: relative;
					    font-size: 1rem;
					    box-sizing: border-box;
					    align-items: center;
					    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
					    font-weight: 400;
					    line-height: 1.1876em;
					    letter-spacing: 0.00938em;
					}
					
					.MuiFormControl-root {
					    border: 0;
					    margin: 0;
					    display: inline-flex;
					    padding: 0;
					    position: relative;
					    min-width: 0;
					    flex-direction: column;
					    vertical-align: top;
						
					}
					
					.jss209 {
					    cursor: text;
					    display: flex;
					    flex-flow: row wrap;
					    min-height: 40px;
					    margin-bottom: -2px;
					}
					
					.jss161>div .MuiInputBase-root {
					    padding-top: 8px;
					}
					
					.MuiOutlinedInput-adornedStart {
					    padding-left: 14px;
					}
					
					.jss221 {
					    float: left;
					    margin: 6px 8px 8px 0;
					}
					
					.MuiChip-clickable {
					    cursor: pointer;
					    user-select: none;
					    -webkit-tap-highlight-color: transparent;
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
					
					.MuiChip-deleteIcon {
					    color: rgba(0, 0, 0, 0.26);
					    width: 22px;
					    cursor: pointer;
					    height: 22px;
					    margin: 0 5px 0 -6px;
					    -webkit-tap-highlight-color: transparent;
					}
					
					.MuiSvgIcon-root {
					    fill: currentColor;
					    width: 1em;
					    height: 1em;
					    display: inline-block;
					    font-size: 1.5rem;
					    transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
					    flex-shrink: 0;
					    user-select: none;
					}
					
					.keywords_border {
						width: 100%;
						border-radius: 3px;
						border: solid 1px #c4c4c4;
						
						input {
							background:#ffffff !important;
							border: none !important;
							outline: none !important;
						}
						input:focus {
							background:#ffffff !important;
							border: none !important;
							outline: none !important;
						}
						
						input::selection { 
						    background:#ffffff !important;
						    color: #ffffff !important;
							border: none !important;
							outline: none !important;
						    // color: var(--antd-wave-shadow-color); // ant design vue,可根据主题色修改
						}
						input::-moz-selection { 
						    background:#ffffff; 
							color: #ffffff;
							border: none;
							outline: none;
						}
						input::-webkit-selection { 
						    background:#ffffff; 
							color: #ffffff;
							border: none;
							outline: none;
						}
					}
					.ant-input-keyword{
						outline:none;
					}
					.ant-input-personal{
						outline:none;
					}
				}
			}
			
			
		}
	}
	
	.header {
		// padding: 0 25px;
		line-height: 60px;
		border-top: 1px solid #eeeff2;
		
		height: 60px;
		padding: 0;
		min-height: 40px;
		background-color: #fff;
		
	}
	
	.avatar-uploader {
		float: left;
		margin: 10px;
		
		.el-upload.el-upload--picture-card {
			width: 200px;
			height: 200px;
		}
		
		.el-upload-list--picture-card .el-upload-list__item {
			float: left;
		}
	}
	.choose_picture {
		color: #2789EE;
		display: flex;
		flex-direction: column;
	}
	.anticon.anticon-plus > svg {
		color: #2789EE;
		width: 2em;
		height: 2em;
	}
	.upload-container {
	    width: 100%;
	    position: relative;
		
		.pre_file_upload_btn {
			position: absolute;
			top: 20px;
			right: 30px;
			z-index: 100;
			// opacity: 0.5;
			background: transparent;
		}
		
		// .pre_file_upload_btn:hover:after {
		// 	content: '上传源文件';
		// }
		
		// .pre_file_upload_btn:hover > svg {
		// 	color: rgb(255,77,80);
		// }
		
	    &:after {
	      content: "";
	      display: table;
	      clear: both;
	    }
		
	    .image-uploader {
	        width: 60%;
	        float: left;
	    }
	    .image-preview {
	        width: 200px;
	        height: 200px;
	        position: relative;
	        border: 1px dashed #d9d9d9;
	        float: left;
	        margin: 10px;
			border-radius: 3%;
			
	        .image-preview-wrapper {
				display: flex;
				justify-content: center;
	            position: relative;
	            width: 100%;
	            height: 100%;
				border: 2px;
	            img {
	                width: 97%;
	                height: 97%;
					margin: auto;
					margin-top: 1%;
					object-fit: contain;
	            }
				video {
					width: 97%;
					height: 97%;
					margin: auto;
					margin-top: 1%;
					object-fit: contain;
				}
	        }
	        // .image-preview-action {
	        //     position: absolute;
	        //     width: 100%;
	        //     height: 100%;
	        //     left: 0;
	        //     top: 0;
	        //     cursor: default;
	        //     text-align: center;
	        //     color: #fff;
	        //     opacity: 0;
	        //     font-size: 20px;
	        //     background-color: rgba(0, 0, 0, .5);
	        //     transition: opacity .3s;
	        //     cursor: pointer;
	        //     text-align: center;
	        //     line-height: 200px;
	        //     .el-icon-delete {
	        //         font-size: 36px;
	        //     }
	        // }
	        // &:hover {
	        //     .image-preview-action {
	        //         opacity: 1;
	        //     }
	        // }
			
			.isNotCover {
				opacity: 0;
				display: block;
			}
			
			&:hover {
			    .isNotCover {
			        opacity: 1;
			    }
			}
			
	    }
		
		.vector{
			height: 200px;
			position: relative;
			border: 1px dashed #d9d9d9;
			float: left;
			margin: 10px;
			border-radius: 3%;
			
			.image-preview-wrapper {
				display: flex;
				justify-content: center;
				position: relative;
				height: 100%;
				border: 2px;
				img {
					height: 97%;
					margin: auto;
					margin-top: 1%;
					object-fit: contain;
				}
			}
			.isNotCover {
				opacity: 0;
				display: block;
			}
			
			&:hover {
			    .isNotCover {
			        opacity: 1;
			    }
			}
		}			
		
		.image-preview.selected {
			border: 2px solid #556cd6;
		}
		
		.cover.selected {
			border: 2px solid #556cd6;
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
		
		.MuiButton-textSizeSmall {
		    padding: 4px 5px;
		    font-size: 0.8125rem;
		}
		
		.MuiButton-label {
		    width: 100%;
		    display: inherit;
		    align-items: inherit;
		    justify-content: inherit;
		}
		
		.coverButton {
		    color: #fff;
		    bottom: 20px;
		    margin: 0 auto;
		    display: none;
		    z-index: 999;
		    position: absolute;
		    background-color: rgba(1,1,1,0.7);
		}
		
		.isCover {
			display: block;
		}
	}
</style>

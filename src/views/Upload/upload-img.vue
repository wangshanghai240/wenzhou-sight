<template>
	<div class="MuiToolbar-root MuiToolbar-regular page_main MuiToolbar-gutters">
		<div class="left_wrapper">
			<div class="header">
				<div style="float:right;" class="head_buttons">
					<a-button type="info" @click="deleteImg">删除</a-button>
					<a-button type="info" @click="moveToFirst">置于最前</a-button>
					<a-button type="info" @click="moveToLast">置于最后</a-button>
				</div>
			</div>
			<div class="content">
				<div class="upload-container">
					<div v-for="(image, index) in fileList" v-bind:key="image.uid"
					 :class="{'image-preview': true, 'selected': image.uid===selectedImageUid}" @click="selectImage(image.uid)">
					 <!-- <div v-show="imageUrl.length>1" class="image-preview-wrapper">
					    <img :src="imageUrl">
					    <div class="image-preview-action">
					      <i class="el-icon-delete" @click="rmImage" />
					    </div>
					  </div> -->
					  <div class="image-preview-wrapper">
					    <img :src="image.url">
					    <div class="image-preview-action">
					      <i class="el-icon-delete" @click="rmImage(index)" />
					    </div>
					  </div>
					</div>
					
				  <el-upload
				    :multiple="true"
				    :http-request="customUpload"
				    :action="fileUpload"
				    :before-upload="beforeUpload"
				    :with-credentials="true"
				    :show-file-list="false"
				    class="avatar-uploader"
				    list-type="picture-card"
				    :file-list="fileList">
				    <div class="choose_picture">
						  <a-icon :style="{marginTop: '56px', height: '0px'}" size="large" type="plus" ></a-icon>
						  <span>
							  请选择图片
						  </span>
					  </div>
				  </el-upload>
				  
				</div>
			</div>
		</div>
		
		<div class="right_wrapper">
			<div class="header">
				<a-button type="danger">保存草稿</a-button>
				<a-button :disabled="!canCommit" type="danger">提交</a-button>
			</div>
			<div class="content">
				<a-form-model :model="uploadInfoForm" style="text-align: left;" >
					<div class="group_title">
						组信息
					</div>
					<a-form-model-item label="组照标题">
						<a-input size="large" v-model="uploadInfoForm.groupTitle" placeholder="请输入组照标题"></a-input>
					</a-form-model-item>
					<a-form-model-item label="组照说明">
						<a-input size="large" v-model="uploadInfoForm.groupCaption" placeholder="请输入组照说明"></a-input>
					</a-form-model-item>
					<a-form-model-item label="组照分类">
						<a-select size="large" v-model="uploadInfoForm.categoryId">
							<a-select-option v-for="category in categoryList" v-bind:key="category.id">{{category.cname}}</a-select-option>
						</a-select>
					</a-form-model-item>
					<a-form-model-item label="组照关键词">
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
							
							<a-input size="large" @pressEnter="createKeywordLabel('groupKeywords')" @change="changeKeywords($event, 'groupKeywords')" v-model="uploadInfoForm.groupKeywords" placeholder="请输入关键词,并空格或回车"></a-input>
						</div>
					</a-form-model-item>
					
					<div  class="group_title">
						图片信息
					</div>
					<a-form-model-item label="摄影师">
						<a-input size="large" v-model="uploadInfoForm.desc" placeholder="请输入摄影师"></a-input>
					</a-form-model-item>
					<a-form-model-item label="署名">
						<a-input size="large" v-model="uploadInfoForm.desc" placeholder="请输入署名"></a-input>
					</a-form-model-item>
					<a-form-model-item label="拍摄时间">
						<a-date-picker size="large" v-model="uploadInfoForm.createdAt" placeholder="请输入拍摄时间" />
					</a-form-model-item>
					<a-form-model-item label="图片说明">
						<a-input size="large" v-model="uploadInfoForm.desc" placeholder="点击输入说明(1000字以内)说明需要包括年、月、日\地点，画面本身的内容"></a-input>
					</a-form-model-item>
				</a-form-model>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { upload } from '@/api/user'
	import { categories } from '@/api/index'
	
	export default { 
		data() {
			return {
				categoryList: [],
				canCommit: false,
				uploadInfoForm: {
					groupKeywordArr: []
				},
				loading: false,
				listObj: {},
				fileList: [],
				selectedImageUid: ''
			}
		},
		computed: {
			...mapGetters(['fileUpload', 'uploadedFilePrefix', 'token']),
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
			// customUpload(file) {
			//   upload(file).then(res => {
			//     const { code, msg, data } = res
			//     if (code == 200) {
			// 		console.log("data:" + data)
			// 		console.log(file.file)
			//       this.fileList.push({uid: file.file.uid, name: file.file.filename, status: 'done', url: this.$store.state.uploadedFilePrefix + data})
			//     } else {
			//       this.$message.error('上传失败:' + m)
			//     }
			//   })
			// }
			selectImage(uid) {
				this.selectedImageUid = uid
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
			handleAvatarSuccess(data, file, fileList) {
			  if (data) {
			    this.emitInput(data)
			  }
			
			  const uid = file.uid
			  const objKeyArr = Object.keys(this.listObj)
			  for (let i = 0, len = objKeyArr.length; i < len; i++) {
			    if (this.listObj[objKeyArr[i]].uid === uid) {
			      this.listObj[objKeyArr[i]].url = this.uploadedFilePrefix + '/' + data
			      this.listObj[objKeyArr[i]].hasSuccess = true
				  this.listObj[objKeyArr[i]].status = 'ready'
				  this.fileList.push(this.listObj[objKeyArr[i]])
			      return
			    }
			  }
			},
			rmImage(index) {
			  var temp = this.fileList.splice(index, 1)
			  if(this.fileList.length > 0) {
				this.selectedImageUid = this.fileList[0].uid
				// console.log('enter 1')
			  } else {
				this.selectedImageUid = ''
			  }
			  // console.log(this.selectedImageUid === this.fileList[0].uid)
			  // this.$forceUpdate()
			},
			moveToFirst() {
				if(this.fileList.length < 2) {
					return
				}
				var index = -1
				for(var i in this.fileList) {
					if(this.fileList[i].uid === this.selectedImageUid) {
						index = parseInt(i)
						break
					}
				}
				if(index<=0) {
					return
				}
				var temp = this.fileList.splice(index, 1)
				this.fileList.unshift(temp[0])
			},
			moveToLast() {
				if(this.fileList.length < 2) {
					return
				}
				var index = -1
				for(var i in this.fileList) {
					if(this.fileList[i].uid === this.selectedImageUid) {
						index = parseInt(i)
						break
					}
				}
				if(index === -1 || index === this.fileList.length-1) {
					return
				}
				var temp = this.fileList.splice(index, 1)
				this.fileList.push(temp[0])
			},
			deleteImg() {
				var index = -1
				for(var i in this.fileList) {
					if(this.fileList[i].uid === this.selectedImageUid) {
						index = parseInt(i)
						break
					}
				}
				if(index === -1) {
					return
				}
				this.fileList.splice(index, 1)
				if(this.fileList.length > 0) {
					this.selectedImageUid = this.fileList[0].uid
				} else {
					this.selectedImageUid = ''
				}
			},
			emitInput(val) {
			  // this.$emit('input', val)
			},
			beforeUpload(file) {
			  const _self = this
			  const _URL = window.URL || window.webkitURL
			  // console.log(file)
			  const fileName = file.uid
			  if(!this.selectedImageUid) {
				this.selectedImageUid = fileName
			  }
			  this.listObj[fileName] = {}
			  const img = new Image()
			  img.src = _URL.createObjectURL(file)
			  this.emitInput(img.src)
			  console.log(file)
			
			  return new Promise((resolve, reject) => {
			    const img = new Image()
			    img.src = _URL.createObjectURL(file)
			    img.onload = function() {
			      _self.listObj[fileName] = { name: file.name, status: '', hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
			    }
			    resolve(true)
			  })
			},
			changeKeywords(e, keywordField) {
				if(e.data === ' ') {
					this.createKeywordLabel(keywordField)
				}
			},
			createKeywordLabel(keywordField) {
				this.uploadInfoForm[keywordField.substring(0, keywordField.length-1) + 'Arr'].push(this.uploadInfoForm.groupKeywords.trim())
				this.uploadInfoForm[keywordField] = ''
			},
			removeKeyword(keywordField, index) {
				this.uploadInfoForm[keywordField].splice(index, 1)
			}
		},
		created() {
			categories().then(res => {
				this.categoryList = res.data
			})
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
	            position: relative;
	            width: 100%;
	            height: 100%;
				border: 2px;
	            img {
	                width: 97%;
	                height: 97%;
					margin: auto;
					margin-top: 1%;
	            }
	        }
	        .image-preview-action {
	            position: absolute;
	            width: 100%;
	            height: 100%;
	            left: 0;
	            top: 0;
	            cursor: default;
	            text-align: center;
	            color: #fff;
	            opacity: 0;
	            font-size: 20px;
	            background-color: rgba(0, 0, 0, .5);
	            transition: opacity .3s;
	            cursor: pointer;
	            text-align: center;
	            line-height: 200px;
	            .el-icon-delete {
	                font-size: 36px;
	            }
	        }
	        &:hover {
	            .image-preview-action {
	                opacity: 1;
	            }
	        }
			
	    }
		
		.image-preview.selected {
			border: 2px solid #556cd6;
		}
	}
	
	
	
</style>

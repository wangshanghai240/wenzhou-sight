<template>
	<div class="MuiToolbar-root MuiToolbar-regular page_main MuiToolbar-gutters">
		<div class="left_wrapper">
			<div class="header">
				<div style="float:right;" class="head_buttons">
					<a-button type="info">删除</a-button>
					<a-button type="info">置于最前</a-button>
					<a-button type="info">置于最后</a-button>
				</div>
			</div>
			<div class="content">
				<Upload v-model="file" :multiple="true"></Upload>
				<!-- <a-upload
					name="pics"
					list-type="picture-card"
					class="picture-uploader"
					:show-upload-list="true"
					:file-list="fileList"
					:customRequest="customUpload">
					<div v-if="fileList.length < 8">
						<a-icon type="plus"/>
						<div class="ant-upload-text">Upload</div>
					</div>
				</a-upload> -->
			</div>
		</div>
		
		<div class="right_wrapper">
			<div class="header">
				<a-button type="danger">保存草稿</a-button>
				<a-button :disabled="!canCommit" type="danger">提交</a-button>
			</div>
			<div class="content">
				<a-form-model :model="uploadInfoForm" style="text-align: left; padding: 6px;" >
					<div class="group_title">
						组信息
					</div>
					<a-form-model-item label="组照标题">
						<a-input v-model="uploadInfoForm.groupTitle" placeholder="请输入组照标题"></a-input>
					</a-form-model-item>
					<a-form-model-item label="组照说明">
						<a-input v-model="uploadInfoForm.groupCaption" placeholder="请输入组照说明"></a-input>
					</a-form-model-item>
					<a-form-model-item label="组照关键词">
						<a-input v-model="uploadInfoForm.groupKeywords" placeholder="请输入关键词并回车"></a-input>
					</a-form-model-item>
					
					<div  class="group_title">
						图片信息
					</div>
					<a-form-model-item label="摄影师">
						<a-input v-model="uploadInfoForm.desc" placeholder="请输入摄影师"></a-input>
					</a-form-model-item>
					<a-form-model-item label="署名">
						<a-input v-model="uploadInfoForm.desc" placeholder="请输入署名"></a-input>
					</a-form-model-item>
					<a-form-model-item label="拍摄时间">
						<a-input v-model="uploadInfoForm.desc" placeholder="请输入组照说明"></a-input>
					</a-form-model-item>
					<a-form-model-item label="图片说明">
						<a-input v-model="uploadInfoForm.desc" placeholder="请输入组照说明"></a-input>
					</a-form-model-item>
				</a-form-model>
			</div>
		</div>
	</div>
</template>

<script>
	import Upload from '@/components/Common/SingleImageUpload'
	// import { upload } from '@/api/user'
	
	export default {
		components: {
			Upload
		},
		data() {
			return {
				canCommit: false,
				uploadInfoForm: {
					
				},
				fileList: [],
				loading: false
			}
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
		},
		created() {
			// if()
		}
	}
</script>

<style lang="less" rel="style/less" scoped>
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
	
	.content {
		
		
		.picture-uploader {
			background-color: #C12008;
			
			.ant-upload{
				// width: 200px;
				// height: 200px;
				width: 25%;
				margin: 8px 8px 8px 20px;
			}
		}
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
		
		
	}
	.picture-uploader {
		.ant-upload-list {
			.ant-upload-list-picture-card-container {
				// width: 200px;
				// height: 200px;
				// margin: 0 8px 8px 20px;
				width: 25%;
			}
		}
		
		.ant-upload.ant-upload-select.ant-upload-select-picture-card {
			// width: 200px;
			// height: 200px;
			width: 25%;
			margin: 8px 8px 8px 20px;
		}
	}
	
	
	
	
</style>

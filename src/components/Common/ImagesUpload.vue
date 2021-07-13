<template>
  <div class="upload-container">
	<div v-for="image in fileList" v-bind:key="image.uid"
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
	      <i class="el-icon-delete" @click="rmImage" />
	    </div>
	  </div>
	</div>
	
    <el-upload
      :multiple="multiple"
      :http-request="customUpload"
      :action="fileUpload"
      :before-upload="beforeUpload"
      :disabled="disabled"
      :with-credentials="true"
      :show-file-list="false"
      class="avatar-uploader"
      list-type="picture-card"
      :file-list="fileList"
	  :files="fileList">
      <div class="choose_picture">
		  <a-icon :style="{marginTop: '56px', height: '0px'}" size="large" type="plus" ></a-icon>
		  <span>
			  请选择图片
		  </span>
	  </div>
    </el-upload>
    
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { upload } from '@/api/user'

export default {
  name: 'SingleImageUpload',
  props: {
    width: {
      type: String,
    },
	
    disabled: {
      type: Boolean,
      default: false
    },
	
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      listObj: {},
	  fileList: [],
	  selectedImageUid: ''
    }
  },
  computed: {
    ...mapGetters(['fileUpload', 'uploadedFilePrefix', 'token']),
    // imageUrl() {
    //   if (this.value) {
    //     if(this.value.startsWith('blob:')) {
    //       return this.value
    //     }
    //     return this.uploadedFilePrefix + '/' + this.value
    //   }
    //   return ''
    // },
    // fileList() {
      // if (this.value) {
      //   if (this.value.startsWith('blob:')) {
      //     return [{url: this.value}]
      //   }
      //   return [{url: this.uploadedFilePrefix + '/' + this.value}]
      // }
      // return []
	  // const results = []
	  // for(var i in this.listObj) {
		 //  results.push(this.listObj[i])
	  // }
	  // return results
   //  }
  },
  methods: {
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
    rmImage() {
      // this.emitInput('')
      // this.value = null
    },
    emitInput(val) {
      // this.$emit('input', val)
    },
    beforeUpload(file) {
      const _self = this
      const _URL = window.URL || window.webkitURL
      // console.log(file)
      const fileName = file.uid
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
    }
  }
}
</script>

<style lang="less">
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
			border: 2px solid #556cd6
		}
    }
</style>

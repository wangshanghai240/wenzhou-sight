<template>
  <div class="upload-container">
     <!-- action="https://httpbin.org/post" -->
    <!-- :action="fileUpload" -->
    <!-- :show-file-list="true"
    :file-list="fileList" -->
    <el-upload
      ref="width"
      :multiple="multiple"
      :http-request="customUpload"
      :action="fileUpload"
      :before-upload="beforeUpload"
      :disabled="disabled"
      :with-credentials="true"
      :show-file-list="true"
      class="avatar-uploader"
      list-type="picture"
      :file-list="fileList">
      <a-button size="small" type="primary">点击上传</a-button>
    </el-upload>
    <!-- <div class="image-preview">
      <div v-show="imageUrl.length>1" class="image-preview-wrapper">
        <img :src="imageUrl">
        <div class="image-preview-action">
          <i class="el-icon-delete" @click="rmImage" />
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { upload } from '@/api/user'

export default {
  name: 'SingleImageUpload',
  props: {
    value: {
      type: String,
      default: ''
    },
	
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
      listObj: {}
    }
  },
  mounted() {
    this.$refs.width.$el.style.setProperty('--width', this.width)
    this.$refs.width.$el.style.width = this.width
  },
  computed: {
    ...mapGetters(['fileUpload', 'token']),
    imageUrl() {
      if (this.value) {
        if(this.value.startsWith('blob:')) {
          return this.value
        }
        return this.uploadFilePreffix + '/' + this.value
      }
      return ''
    },
    fileList() {
      if (this.value) {
        if (this.value.startsWith('blob:')) {
          return [{url: this.value}]
        }
        return [{url: this.uploadFilePreffix + '/' + this.value}]
      }
      return []
    }
  },
  methods: {
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
      if (data && data.url) {
        this.emitInput(data.url)
      }

      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          console.log(this.uploadFilePreffix + '/' + data.url)
          this.listObj[objKeyArr[i]].url = this.uploadFilePreffix + '/' + data.url
          this.listObj[objKeyArr[i]].hasSuccess = true
          return
        }
      }
    },
    rmImage() {
      this.emitInput('')
      this.value = null
    },
    emitInput(val) {
      this.$emit('input', val)
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

      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function() {
          _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
        }
        resolve(true)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "~@/assets/styles/mixin.scss";
    .upload-container {
        width: 100%;
        position: relative;
        @include clearfix;
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
            margin-left: 50px;
            .image-preview-wrapper {
                position: relative;
                width: 100%;
                height: 100%;
                img {
                    width: 100%;
                    height: 100%;
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
    }
</style>

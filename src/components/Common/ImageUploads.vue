<!-- <template>
	<a-upload
		name="pics"
		list-type="picture-card"
		class="picture-uploader"
		:show-upload-list="true"
		:file-list="fileList">
		<div v-if="fileList.length < 8">
			<a-icon type="plus"/>
			<div class="ant-upload-text">Upload</div>
		</div>
	</a-upload>
	<a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
		<img style="width: 100%" :src="previewImage"/>
	</a-modal>
	
</template>

<script>
	export default {
		data() {
			return {
				previewVisible: false,
				previewImage: '',
				fileList: []
			}
		}
	}
</script>

<style>
</style>
 -->
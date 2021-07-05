<template>
	<!-- <div class="custom-icons-list"> -->
		<!-- <PicGroupIcon></PicGroupIcon> -->
	<!-- </div> -->
	<pic-group-icon></pic-group-icon>
</template>

<script>
	const PicGroupSvg = {
		template: `<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
			<path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z"></path>
			</svg>`
	}
	const PicGroupIcon = {
		template: `<a-icon :component="PicGroupSvg"/>`,
		data() {
			return {
				PicGroupSvg
			}
		}
	}
	export default {
		components: {
			PicGroupIcon
		}
	}
</script>

<style lang="less" rel="stylesheet/less" scoped>
	/* .custom-icons-list >>> .anticon {
	  margin-right: 6px;
	} */
	.MuiSvgIcon-root {
	    fill: black;
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
</style>

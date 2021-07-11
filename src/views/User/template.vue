<template>
	<div class="main">
		<img class="left_img" src="@/assets/img/login_left.jpeg" />
		<div class="right_div">
			
			<router-view ref="routerView"></router-view>
			
			<div class="footer-copyright">
				<a class="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorTextSecondary" target="_blank" href="http://www.beian.miit.gov.cn/">
					  苏ICP备19044258号</a> 
				温州晚报 汉华易美视觉科技有限公司
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
		}
	}
</script>

<style lang="less" rel="stylesheet/less" scoped>
	.main {
		display: flex;
		flex-direction: row;
	}
	.left_img {
		width: 58%;
		height: 100%;
	}
	.right_div {
		overflow: hidden;
		min-width: 600px;
		width: 41%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.footer-copyright {
		margin-top: 40px;
	}
	.MuiLink-underlineHover {
	    text-decoration: none;
	}
	
	.MuiTypography-colorTextSecondary {
	    color: rgba(0, 0, 0, 0.54);
	}
	
</style>

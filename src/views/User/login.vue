<template>
	<div class="login_div">
		<h1 class="login_header">登录</h1>
		<a-form :form="loginForm" :label-col="{span:0}" :wrapper-col="{span:24}" @submit="login">
			<a-form-item label="account">
				<a-input class="input_field" size="large" v-decorator="['account']"
					placeholder="请输入注册手机号码或邮箱">
				</a-input>
			</a-form-item>
			<a-form-item label="pwd">
				<a-input-password class="input_field" size="large"  v-decorator="['pwd']"
					placeholder="请输入密码">
				</a-input-password>
			</a-form-item>
			<a-form-item>
				<a-button size="large" style="height: 56px; background-color: #5986ff; border-color: #5986ff;" font-size="25" class="input_field" type="primary" html-type="submit">
					登录
				</a-button>
			</a-form-item>
		</a-form>
		
		<div class="create_account_div">
			<div>
				<router-link class="MuiTypography-root MuiLink-root MuiLink-underlineHover aclass" to="reset-password" >忘记密码？</router-link>
			</div>
			<div>
				<router-link class="MuiTypography-root MuiLink-root MuiLink-underlineHover aclass" to="register" >没有账户? 注册</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import { login } from '@/api/user'
	
	export default {
		data() {
			return {
				loginForm: this.$form.createForm(this, { name: 'coordinated' })
			}
		},
		methods: {
			login(e) {
				e.preventDefault();
				this.loginForm.validateFields((err, values) => {
					if(!err) {
						this.$store.dispatch('login', values).then(() => {
						  this.$router.push({ path: this.$route.query.redirect || '/' })
						}).catch(e => {
							console.log(e)
						})
						// login(values).then(res => {
						// 	console.log(res)
						// 	if(res.code === 200) {
						// 		if(this.$route.query.redirect) {
						// 			this.$router.push(this.$route.query.redirect)
						// 		} else {
						// 			this.$router.push('/index')
						// 		}
						// 	} else {
						// 		this.$message.error(res.msg)
						// 	}
						// })
					} else {
						this.$message.error(err)
					}
				})
			}
		}
	}
</script>

<style lang="less" rel="stylesheet/less" scoped>
	.login_div {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		.login_header {
		    color: #202437;
		    font-size: 16px;
		    margin-top: 15%;
		    text-align: center;
		    font-weight: bold;
		    border-bottom: 3px solid #5986ff;
		    margin-bottom: 40px;
		    padding-bottom: 5px;
			width: 50px;
		}
		
		.input_field {
			width: 50%;
			height: 50px;
			line-height: 56px;
			font-weight: 500;
		}
		
		.ant-form {
			display: flex;
			flex-direction: column;
			width: 100%;
			align-items: center;
		}
		
		.ant-row {
			width: 100%;
		}
		
		.create_account_div {
			margin-top: 20px;
		}
		
		.create_account_div > div {
			margin-top: 20px;	
		}
		
		.aclass {
			color: #3f51b5;
			font-weight: 400;
		}
	}
	.MuiLink-underlineHover {
	    text-decoration: none;
	}
	
	.MuiTypography-colorTextSecondary {
	    color: rgba(0, 0, 0, 0.54);
	}
	
</style>

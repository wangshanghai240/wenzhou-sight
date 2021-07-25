<template>
	<div class="login_div">
		<h1 class="login_header">注册</h1>
		<a-form :form="registerForm" :label-col="{span:0}" :wrapper-col="{span:24}" @submit="register">
			<a-form-item label="realName">
				<a-input class="input_field" size="large" v-decorator="['realName', {rules:[{required: true, message: '姓名不能为空'}]}]"
					placeholder="请输入您的真实姓名">
				</a-input>
			</a-form-item>
			<a-form-item label="number">
				<a-input class="input_field" size="large" v-decorator="['number', {rules: [{required: true, message: '手机号码不能为空'}, {validator: mobilephoneValidate}] }]"
					placeholder="请输入您的手机号">
				</a-input>
			</a-form-item>
			<a-form-item label="mobileVilidateCode">
				<div style="display: flex; justify-content: center;">
					<a-input class="input_field" style="width: 30%; border-bottom-right-radius: 0; border-top-right-radius: 0;" size="large"  v-decorator="['mobileVilidateCode', {rules:[{required: true, message: '验证码不能为空'}]}]"
						placeholder="请输入手机验证码">
					</a-input>
					<a-button @click="sendSMS" :disabled="smsSentTimeLeft>0" class="input_field" style="width: 20%; padding-left:5px; border-bottom-left-radius: 0; border-top-left-radius: 0;" size="large">
						{{sendSMSBtnLabel}}
					</a-button>
				</div>
			</a-form-item>
			<a-form-item label="password">
				<a-popover title="密码至少包含:" :visible="passCheckVisible" @click="passCheckVisible=true"  trigger="click" placement="rightBottom">
					<template slot="content">
						<div>
							<ul class="password_checks">
								<li v-for="(passCheckItem, i) in passCheckItems" v-bind:key="passCheckItem.name">
									<svg :class="{'password_check_correct': passCheckItemStatuses[i], 'password_check_error': !passCheckItemStatuses[i], 'password_check_status': true, 'MuiSvgIcon-root': true, 'MuiSvgIcon-fontSizeLarge': true}" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
										<path v-if="!passCheckItemStatuses[i]" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
										<path v-if="passCheckItemStatuses[i]" d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
									</svg>{{passCheckItem.tip}}
								</li>
							</ul>
						</div>
					</template>
					<a-input-password class="input_field" size="large" v-model="passwordVal"  v-decorator="['password']"
						placeholder="请输入密码">
					</a-input-password>
				</a-popover>
			</a-form-item>
			<a-form-item>
				<a-button size="large" style="height: 56px; background-color: #5986ff; border-color: #5986ff;" font-size="25" class="input_field" type="primary" html-type="submit">
					注册
				</a-button>
			</a-form-item>
		</a-form>
		
		<div class="create_account_div">
			<div>
				<router-link class="MuiTypography-root MuiLink-root MuiLink-underlineHover aclass" to="/login" >已经有一个账户？登录</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import { login, register, smsSend } from '@/api/user'
	
	export default {
		data() {
			return {
				registerForm: this.$form.createForm(this, { name: 'coordinated' }),
				sendSMSBtnLabel: '获取验证码',
				smsSentTimeLeft: 0,
				passwordVal: '',
				passCheckItems: [
					{ tip: '8~14个字符', name: 'word_limit', checkFunc: a => a.length>=8 && a.length<=14, status: false},
					{ tip: '数字', name: 'digit', checkFunc: a => a.search(/\d+/)>=0 , status:false},
					{ tip: '大写字母', name: 'upper_case', checkFunc: a => a.search(/[A-Z]+/)>=0 , status:false},
					{ tip: '小写字母', name: 'lower_case', checkFunc: a => a.search(/[a-z]+/)>=0 , status:false}
				],
				passCheckVisible: false
			}
		},
		computed: {
			passCheckItemStatuses() {
				var password = this.passwordVal
				// this.registerForm.getFieldValue('password')
				// console.log(password)
				var passed = true
				const passCheckItemStatuses = this.passCheckItems.map(item => {
					const checkStatus = item.checkFunc(password)
					passed = passed && checkStatus
					return checkStatus
				})
				return passCheckItemStatuses
			}
		},
		methods: {
			 /**
			   *手机号码格式验证
			   * @param str
			   * @returns {boolean}
			   */
			testMobilephone: function (str) {
				const regex = /^1[3456789]\d{9}$/
				if (!regex.test(str)) {
				  return false
				} else {
				  return true
				}
			},
			mobilephoneValidate (rule, value, callback) {
			  // 主要就是添加一个对undefined和空串的判断
			  if (typeof (value) === 'undefined' || value === '') {
				callback()
			  } else {
				if (!this.testMobilephone(value)) {
				 callback(new Error('请输入正确手机格式'))
				}
				callback()
			  }
			},
			sendSMS(e) {
				var number = this.registerForm.getFieldValue('number')
				if(!number) {
					this.$message.error('请先填写手机号码!')
					return
				}
				
				smsSend({number: number}).then(res => {
					this.$message.success('验证码发送成功')
					this.sendSMSBtnLabel = '60S后重新获取'
					this.smsSentTimeLeft = 60
					var _that = this
					var smsTimeout = setInterval(function() {
						_that.smsSentTimeLeft--
						if(_that.smsSentTimeLeft===0) {
							clearInterval(smsTimeout)
							_that.sendSMSBtnLabel = '获取验证码'
						} else {
							_that.sendSMSBtnLabel = _that.smsSentTimeLeft + 'S后重新获取'
						}
					}, 1000)
				})
			},
			register(e) {
				e.preventDefault();
				this.passCheckVisible = !this.passCheckItemStatuses.reduce((a, b) => a && b)
				if(this.passCheckVisible) {
					this.$message.error('请填写符合格式要求的密码')
					return
				}
				this.registerForm.validateFields((err, values) => {
					if(!err) {
						register(values).then(res => {
							console.log(res)
							if(res.code === 200) {
								if(this.$route.query.redirect) {
									this.$router.push(this.$route.query.redirect)
								} else {
									this.$router.push('/index')
								}
							} else {
								this.$message.error(res.msg)
							}
						})
					} 
					// else {
					// 	console.log(err)
					// 	this.$message.error(err)
					// }
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
			margin: 5px;
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
		
		.ant-btn:hover {
			color: rgb(89, 134, 255);
			border-color: rgb(89, 134, 255);
		}
		
		.password_checks {
		    padding: 0;
		    list-style: none;
		}
		
		.password_checks > li {
		    display: flex;
		    font-size: 12px;
		    align-items: center;
		    font-weight: 500;
		    line-height: 30px;
		}
	}
	
	.password_checks {
	    padding: 0;
	    list-style: none;
	}
	
	.password_checks > li {
	    display: flex;
	    font-size: 12px;
	    align-items: center;
	    font-weight: 500;
	    line-height: 30px;
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
	
	.password_check_status {
		color: #fff;
		font-size: 16px;
		margin-left: 2px;
		margin-right: 8px;
		border-radius: 2px;
	}
	
	.password_check_error {
		background: #e43b3b;
	}
	
	.password_check_correct {
		// color: #1cba4f;
		background: #1cba4f;
	}
	
	.MuiLink-underlineHover {
	    text-decoration: none;
	}
	
	.MuiTypography-colorTextSecondary {
	    color: rgba(0, 0, 0, 0.54);
	}
	
</style>

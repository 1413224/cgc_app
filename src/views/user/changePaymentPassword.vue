<template>
	<div class="zf-box1">
		<settingHeader :title="title"></settingHeader>
		<div v-if="isRemember == 3">
			<div class="tips">
				<div>您是否记得账号<span>{{phone}}</span></div>
				<div>当前使用的支付密码</div>
			</div>
			<div class="two-btn">
				<div @click="remember">记得</div>
				<div @click="forget">忘记了</div>
			</div>
		</div>
		<div class="content bounceInRight animated" v-if="isRemember == 0">
			<group gutter="0" class="input-div">
				<input class="input-item" ref="phone" v-model="phone" placeholder="输入手机号码" type="tel" disabled maxlength="11" @on-change="phoneChange" />
				<div class="pr">
					<input class="input-item" type="tel" ref="code" v-model="code" maxlength="4" placeholder="验证码" @on-change="codeChange" />
					<button class="codeBtn" @click="sendCode" :disabled="sendFlag">{{codeText}}</button>
				</div>
			</group>
			<div class="tip">
				<x-button class="add-btn" @click.native="submit" :show-loading="showLoading">下一步</x-button>
			</div>
		</div>
		<div class="content bounceInRight animated" v-if="isRemember == 1">
			<group gutter="0" class="input-div">
				<x-input class="input-item" ref="oldpassword" v-model="oldpassword" placeholder="输入旧密码" type="password" :max="6" @on-change="oldpasswordChange"></x-input>
			</group>
			<div class="tip">
				<x-button class="add-btn" @click.native="submit2" :show-loading="showLoading">下一步</x-button>
			</div>
		</div>
	</div>
</template>

<script>
	// import { AlertModule } from 'vux'
	import settingHeader from '../../components/setting_header'
	export default {
		data() {
			return {
				title: '设置支付密码', //头部标题
				phone: '', //手机号码
				code: '', //验证码
				regText: '提示',
				codeText: '发送验证码',
				num: 60,
				sendFlag: false,
				showLoading: false,
				isRemember: 3,
				oldpassword: '',
				hasP: false
			}
		},
		created() {
			this.getUserPayPassword()
			this.getUserInfo()
		},
		mounted() {

		},
		methods: {
			getUserInfo() {
				var _this = this
				//获取用户信息
				_this.$http.get(_this.url.user.getBasicInfo, {
					params: {
						userId: _this.$store.state.user.userId
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.phone = res.data.data.mobile
					}
				})
			},
			//检测是否设置支付密码
			getUserPayPassword() {
				var _this = this
				_this.$http.get(_this.url.user.getUserPayPassword, {
					params: {
						userId: _this.$store.state.user.userId
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						if(res.data.data == 2) {
							_this.isRemember = 0
						} else if(res.data.data == 1) {
							_this.hasP = true
						}
					}
				})
			},
			remember() {
				var _this = this
				_this.isRemember = 1
			},
			forget() {
				var _this = this
				_this.isRemember = 0
			},
			submit() {
				var _this = this
				if(_this.code) {
					_this.$http.post(_this.url.user.authVerification, {
						type: 102,
						mobile: _this.phone,
						code: _this.code
					}).then((res) => {
						if(res.data.status == "00000000") {
							if(res.data.data) {
								_this.$router.push({
									path: '/user/changePaymentPassword2',
									query: {
										code: _this.code,
										hasP: _this.hasP
									}
								})
							} else {
								_this.$vux.toast.show({
									width: '50%',
									type: 'text',
									position: 'middle',
									text: '验证码不正确'
								})
							}
						}
					})
				} else {
					_this.$vux.toast.show({
						width: '50%',
						type: 'text',
						position: 'middle',
						text: '请输入正确的验证码'
					})
				}
			},
			submit2() {
				var _this = this
				if(_this.oldpassword.length == 6) {
					_this.$http.post(_this.url.user.authPayPassword, {
						userId: _this.$store.state.user.userId,
						payPassword: _this.MD5(_this.oldpassword)
					}).then((res) => {
						if(res.data.status == "00000000") {
							if(res.data.data == 1) {
								_this.$router.push({
									path: '/user/changePaymentPassword2',
									query: {
										oldPayPassword: _this.MD5(_this.oldpassword)
									}
								})
							} else {
								_this.$vux.toast.show({
									width: '50%',
									type: 'text',
									position: 'middle',
									text: '旧的支付密码不正确'
								})
							}
						}
					})
				} else {
					_this.$vux.toast.show({
						width: '60%',
						type: 'text',
						position: 'middle',
						text: '请输入旧的6位数字支付密码'
					})
				}
			},
			oldpasswordChange(val) {
				if(val.length == 6) {
					if(/^[0-9]+$/.test(val)) {
						this.$refs.oldpassword.blur()
					} else {
						this.$vux.toast.show({
							width: '60%',
							type: 'text',
							position: 'middle',
							text: '请输入6位纯数字的支付密码'
						})
					}
					this.$refs.oldpassword.blur()
				}
			},
			codeChange(val) {
				if(val.length == 4) {
					this.$refs.code.blur()
				}
			},
			phoneChange(val) {
				if(val.length == 11) {
					this.$refs.phone.blur()
				}
			},
			//发送验证码
			sendCode() {
				var _this = this
				_this.code = ''
				if(_this.mainApp.isphone(_this.phone)) {
					_this.$refs.code.focus()
					_this.$http.post(this.url.user.getVerificationCode1, {
						userId: _this.$store.state.user.userId,
						type: 102
					}).then(function(res) {
						if(res.data.status == "00000000") {
							_this.$vux.toast.show({
								width: '50%',
								type: 'text',
								position: 'middle',
								text: '验证码发送成功'
							})

							_this.reduce()
						}
					})
				} else {
					_this.$vux.toast.show({
						width: '50%',
						type: 'text',
						position: 'middle',
						text: '手机号码格式不正确'
					})
					_this.$refs.phone.focus()
				}
			},
			//倒计时
			reduce() {
				var _this = this
				if(_this.num == 0) {
					_this.codeText = "重新发送验证码";
					_this.num = 60;
					_this.sendFlag = false
					return;
				} else {
					_this.num--
						_this.codeText = '重新发送验证码' + "(" + _this.num + ")"
					_this.sendFlag = true
				}

				setTimeout(function() {
					_this.reduce()
				}, 1000)
			}
		},
		components: {
			settingHeader,
		}
	}
</script>

<style lang="less" scoped>
	.zf-box1 {
		.input-div {
			.pr {
				width: 100%;
				height: 100%;
				position: relative;
				button {
					position: absolute;
					right: 0%;
					top: 50%;
					transform: translate(-50%, -50%);
					background-color: white;
					color: #256fff;
					border: none;
					    font-size: 0.28rem;
				}
			}
			.pr:after {
				content: " ";
				position: absolute;
				left: 0;
				top: 0;
				right: 0;
				height: 1px;
				border-top: 1px solid #E1E1E1;
				color: #E1E1E1;
				-webkit-transform-origin: 0 0;
				transform-origin: 0 0;
				-webkit-transform: scaleY(0.5);
				transform: scaleY(0.5);
				left: 15px;
			}
		}
		.tips {
			height: 2.22rem;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			background-color: white;
			font-size: 0.28rem;
			font-family: MicrosoftYaHei;
			color: rgba(144, 162, 199, 1);
			div {
				margin-bottom: 0.1rem;
				span {
					font-size: 0.32rem;
					color: #1A2642;
				}
			}
		}
		.two-btn {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 0.90rem;
			margin-top: 0.30rem;
			box-sizing: border-box;
			div {
				width: 2.7rem;
				height: 0.88rem;
				line-height: 0.88rem;
				margin-top: 0.6rem;
				font-size: 0.28rem;
				text-align: center;
				border-radius: 2px;
				font-family: MicrosoftYaHei;
			}
			div:nth-child(1) {
				border: 1px solid #ddd;
				color: rgba(26, 38, 66, 1);
			}
			div:nth-child(2) {
				background: rgba(51, 111, 255, 1);
				color: rgba(255, 255, 255, 1);
			}
		}
		.input-item {
			width: 100%;padding: 10px 15px;
			height: 1.02rem;
			font-family: PingFangSC-Regular;
			font-size: 0.28rem;
			letter-spacing: 0;
			box-sizing: border-box;
			color: #1A2642;
			.codeBtn {
				background-color: white;
				color: #256fff;
				padding-right: 0;
			}
			.codeBtn:active {
				color: #256FFF;
				background-color: transparent!important;
			}
		}
		.tip {
			padding: 10px 15px;
			ont-family: PingFangSC-Regular;
			font-size: 0.28rem;
			color: #90A2C7;
			letter-spacing: 0;
			text-align: center;
		}
		.add-btn {
			height: 0.88rem;
			margin-top: 0.55rem;
			ont-family: PingFangSC-Regular;
			font-size: 0.28rem;
			color: #FFFFFF!important;
			letter-spacing: 0;
			background-color: #336FFF!important;
			border-radius: 0!important;
		}
		.login-re {
			padding: 10px 15px;
			display: flex;
			justify-content: space-between;
			span {
				color: #10aeff;
			}
		}
	}
</style>
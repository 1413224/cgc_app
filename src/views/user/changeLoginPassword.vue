<template>
	<div class="loginps-box">
		<settingHeader :title="title"></settingHeader>
		<div class="content">
			<group gutter="0" class="input-div">
				<input class="input-item" ref="phone" v-model="phone" placeholder="输入手机号码" :disabled="$route.query.isLogin" type="tel" maxlength="11" @on-change="phoneChange" />
				<div class="pr">
					<input class="input-item" type="tel" ref="code" maxlength="4" v-model="code" placeholder="验证码" @on-change="codeChange" />
					<button class="codeBtn" @click="sendCode" :disabled="sendFlag">{{codeText}}</button>
				</div>
			</group>
			<div class="tip">
				<x-button class="add-btn" @click.native="submit" :show-loading="showLoading">下一步</x-button>
			</div>
		</div>
	</div>
</template>

<script>
	import settingHeader from '../../components/setting_header'
	export default {
		data() {
			return {
				title: '设置登录密码', //头部标题
				phone: '', //手机号码
				code: '', //验证码
				regText: '提示',
				codeText: '发送验证码',
				num: 60,
				sendFlag: false,
				showLoading: false
			}
		},
		created() {
			if(this.$route.query.isLogin) {
				this.getUserInfo()
			}
			if(this.$route.query.mobile){
				this.phone = this.$route.query.mobile
			}
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
			submit() {
				var _this = this
				if(_this.mainApp.isphone(_this.phone) && _this.code.length == 4) {
					_this.$http.post(_this.url.user.authVerification, {
						type: 2,
						mobile: _this.phone,
						code: _this.code
					}).then((res) => {
						if(res.data.status == "00000000") {
							if(res.data.data) {
								_this.$router.push({
									path: '/user/changeLoginPassword2',
									query: {
										mobile: _this.phone,
										code: _this.code
									}
								})
							} else {
								_this.mainApp.showMessage('验证码不正确','middle')
							}
						}
					})
				} else {
					_this.mainApp.showMessage('手机号码或验证码不正确','middle')
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
					_this.$http.post(this.url.user.getVerificationCode, {
						mobile: _this.phone,
						type: 2
					}).then(function(res) {
						if(res.data.status == "00000000") {
							_this.mainApp.showMessage('验证码发送成功','middle')
							_this.reduce()
						}
					})
				} else {
					_this.mainApp.showMessage('手机号码格式不正确','middle')
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
			settingHeader
		}
	}
</script>

<style lang="less">
	.loginps-box {
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
		.input-item {
			height: 1.02rem;
			font-family: PingFangSC-Regular;
			font-size: 0.28rem;
			letter-spacing: 0;
			box-sizing: border-box;
			width: 100%;
			padding: 10px 15px;
			.codeBtn {
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
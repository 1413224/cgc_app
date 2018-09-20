<template>
	<div class="login_box">
		<settingHeader title="大健康产业联盟"></settingHeader>
		<div class="bg_white">
			<div class="title" v-if="isReg == 1">{{isCp?'登录':'登录 / 注册'}}</div>
			<div class="title" v-if="isReg == 0">注册</div>
			<div class="input_box">
				<div class="label">手机号</div>
				<div class="input">
					<input type="tel" ref="phone" v-model="mobile" :max="11" @input="nameChange" placeholder="请输入手机号" />
				</div>
			</div>
			<div class="input_box">
				<div class="label">密码</div>
				<div class="input">
					<input ref="password" v-model="password" :max="25" :placeholder="isReg == 0 || isReg == 3?'请输入6~25位数的登录密码':'请输入登录密码'" type="password" />
				</div>
			</div>
			<div class="input_box fadeInDown animated" v-if="isReg == 0 || posReg">
				<div class="label">验证码</div>
				<div class="input">
					<input type="tel" ref="code" v-model="code" @input="codeChange" placeholder="请输入4位验证码" />
					<x-button class="set_code_btn" slot="right" type="primary" mini @click.native="sendCode" :disabled="sendFlag">{{codeText}}</x-button>
				</div>
			</div>
			<div class="agreement_tip" v-if="isReg == 0 || posReg">点击按钮表示同意 <i @click="$router.push({path:'/member/setting/agreement'})">《CGC平台注册协议》</i></div>
			<div class="submit_btn" @click="submit" v-if="isReg == 1">{{isCp?'立即登录':'登录 / 注册'}}</div>
			<div class="submit_btn" @click="reg" v-if="isReg == 0">立即注册</div>
			<div class="submit_btn" @click="toPosReg" v-if="posReg">立即激活</div>

			<div class="login-re" v-if="isReg == 1 && !posReg">
				<router-link to="/user/changeLoginPassword"><span class="left">忘记密码？</span></router-link>
				<!--<router-link to=""><span>短信验证登录</span></router-link>-->
			</div>
			<div class="login-re" v-else>
				<span @click="backLogin" class="left">返回登录</span>
			</div>
		</div>
	</div>
</template>
<script>
	import { XButton } from 'vux'
	import settingHeader from '@/components/setting_header'
	import agreement from '@/views/member/setting/agreement'
	import { base64_encode, base64_decode } from '../../global/course.js'
	export default {
		name: 'login',
		data() {
			return {
				title: '用户登录/注册', //头部标题
				mobile: '', //手机号码
				password: '', //密码
				code: '', //验证码
				show: false,
				regText: '提示',
				btnText: '立即登录',
				isReg: 1, //判断是否注册
				codeText: '发送验证码',
				num: 60,
				sendFlag: false,
				showLoading: false,
				token: '',
				isAgree: true,
				parentId: '',
				frompath: '',
				isCp: false,
				pid: '',
				posReg: false
			}
		},
		created() {
			
			if(this.mainApp.getCs('parentId')){
				this.parentId = this.mainApp.getCs('parentId')
			}else{
				this.parentId = sessionStorage['parentUserId']
			}

			
			
			if(this.$route.query.mobile) {
				this.mobile = this.$route.query.mobile
			}
		},
		beforeRouteEnter(to, from, next) {
			next(vm => {
				vm.frompath = from.path
			})
		},
		methods: {
			submit() {
				var _this = this

				if(_this.mobile.length != 11) {
					_this.$vux.toast.show({
						width: '60%',
						type: 'text',
						position: 'top',
						text: '手机号码长度不符合要求'
					})
					return false
				}

				if(!_this.mainApp.isphone(_this.mobile)) {
					_this.$vux.toast.show({
						width: '60%',
						type: 'text',
						position: 'top',
						text: '手机号码格式不符合要求'
					})
					return false
				}

				if(_this.password.length < 6 || _this.password.length > 25) {
					_this.$vux.toast.show({
						width: '60%',
						type: 'text',
						position: 'top',
						text: '密码长度不符合要求'
					})
					return false
				}

				_this.showLoading = true
				_this.isCheckLogin()
				_this.showLoading = false
			}, //注册
			reg() {
				var _this = this

				if(_this.mobile.length != 11) {
					_this.$vux.toast.show({
						width: '60%',
						type: 'text',
						position: 'top',
						text: '手机号码长度不符合要求'
					})
					return false
				}

				if(!_this.mainApp.isphone(_this.mobile)) {
					_this.$vux.toast.show({
						width: '60%',
						type: 'text',
						position: 'top',
						text: '手机号码格式不符合要求'
					})
					return false
				}

				if(_this.password.length < 6 || _this.password.length > 25) {
					_this.$vux.toast.show({
						width: '60%',
						type: 'text',
						position: 'top',
						text: '密码长度不符合要求'
					})
					return false
				}

				if(_this.code.length != 4) {
					_this.$vux.toast.show({
						width: '60%',
						type: 'text',
						position: 'top',
						text: '验证码长度不符合要求'
					})
					return false
				}

				_this.$http.post(this.url.user.userRegister, {
					mobile: _this.mobile,
					password: _this.MD5(_this.password),
					smsVerificationCode: _this.code,
					platformId: _this.url.platformId,
					parentUserId: _this.parentId,
					unionid: sessionStorage['_openid_'],
				}).then(function(res) {
					if(res.data.status == "00000000") {
						//sessionStorage.setItem('regFirst',true)
						_this.$vux.toast.show({
							width: '50%',
							type: 'text',
							position: 'middle',
							text: '注册成功'
						})

						setTimeout(function() {
							_this.$vux.toast.show({
								width: '50%',
								type: 'text',
								position: 'middle',
								text: '正在登录...',
								onHide() {
									_this.login()
								}
							})
						}, 500)
					}
				})
			},
			////检测用户是否注册
			isCheckLogin() {
				var _this = this
				_this.$nextTick(function() {
					_this.$http.post(_this.url.user.checkUserExistsByMobile, {
						mobile: _this.mobile
					}).then(res => {
						if(res.data.status == "00000000") {
							if(res.data.data == '0') {
								_this.isReg = 0
								_this.isCp = false
								_this.posReg = false
								_this.$vux.toast.show({
									width: '60%',
									type: 'text',
									position: 'top',
									text: '该账户未注册,请先完成注册'
								})

							} else if(res.data.data == '1') {
								//已注册
								_this.isReg = 1
								_this.posReg = false
								_this.isCp = true
								_this.login()
							} else if(res.data.data == '2') {
								//pos用户
								_this.isReg = 3
								_this.posReg = true
							}
						}
					})
				})

			},
			toPosReg() {
				var _this = this

				let params = {
					mobile: _this.mobile,
					platformId: _this.url.platformId,
					newPassword: _this.MD5(_this.password),
					smsVerificationCode: _this.code
				}

				_this.$http.post(_this.url.user.forgetPassword, params).then(function(res) {
					if(res.data.status == "00000000") {
						_this.login()
					}
				})
			},
			//登录
			login() {
				var _this = this

				let pid = sessionStorage['_openid_']

				let params = {
					audience: 'user',
					platformId: _this.url.platformId,
					mobile: _this.mobile,
					password: _this.MD5(_this.password),
					terminal: _this.url.client
				}
				if(pid) {
					params.type = 1;
					params.unionid = pid;
				}

				_this.$http.post(this.url.user.userLogin, params).then(function(res) {
					if(res.data.status == "00000000") {

						let hash = base64_encode(res.data.data)

						_this.$store.state.user.userId = res.data.data.id

						localStorage.setItem('_HASH_', hash)

						localStorage.setItem('isLogin', true)

						_this.$vux.toast.show({
							width: '50%',
							type: 'text',
							position: 'middle',
							text: '登录成功'
						})

						//获取用户信息
						_this.$http.get(_this.url.user.getBasicInfo, {
							params: {
								userId: res.data.data.id
							}
						}).then((res) => {
							if(res.data.status == "00000000") {
								localStorage.setItem('userInfo', JSON.stringify(res.data.data))
							}
						})

						setTimeout(function() {
							if(window.sessionStorage.length > 2) {
								if(_this.frompath) {
									if(_this.frompath != '/user/changeLoginPassword2') {
										//_this.$router.replace({
										//  path: _this.frompath
										//})
										_this.$router.go(-1)
									} else {
										_this.$router.replace({
											path: '/index'
										})
									}
								} else {
									_this.$router.replace({
										path: '/index'
									})
								}
							} else {
								_this.$router.replace({
									path: '/index'
								})
							}
						}, 500)
					}
				})
			},
			//验证码输入改变时
			codeChange(val) {
				if(val.length == 4) {
					this.$refs.code.blur()
				}
			},
			//用户名输入改变时
			nameChange(val) {
				var _this = this

				_this.isReg = 1

				_this.posReg = false

				_this.codeText = "发送验证码"
				_this.num = 60
				_this.sendFlag = false
				clearTimeout(_this.Timeout)

				if(_this.mobile.length == 11) {
					_this.$refs.phone.blur()
					//_this.$refs.password.focus()

					if(_this.mobile.length != 11) {
						_this.$vux.toast.show({
							width: '60%',
							type: 'text',
							position: 'top',
							text: '手机号码长度不符合要求'
						})
						return false
					}

					if(!_this.mainApp.isphone(_this.mobile)) {
						_this.$vux.toast.show({
							width: '60%',
							type: 'text',
							position: 'top',
							text: '手机号码格式不符合要求'
						})
						return false
					}

					_this.$nextTick(function() {
						_this.$http.post(_this.url.user.checkUserExistsByMobile, {
							mobile: _this.mobile
						}).then(res => {
							if(res.data.status == "00000000") {
								if(res.data.data == '0') {
									_this.isReg = 0
									_this.isCp = true
									_this.posReg = false
									_this.$vux.toast.show({
										width: '60%',
										type: 'text',
										position: 'top',
										text: '该账户未注册,请先完成注册'
									})
								} else if(res.data.data == '1') {
									//已注册
									_this.isReg = 1
									_this.posReg = false
									_this.isCp = true
								} else if(res.data.data == '2') {
									//pos用户
									_this.isReg = 3
									_this.posReg = true
									console.log(_this.posReg)
								}
							}
						})
					})
				}
			},
			//发送验证码
			sendCode() {
				var _this = this
				_this.code = ''
				if(_this.mainApp.isphone(_this.mobile)) {
					_this.$refs.code.focus()
					_this.$http.post(this.url.user.getVerificationCode, {
						mobile: _this.mobile,
						type: _this.posReg ? 2 : 1
					}).then(function(res) {
						if(res.data.status == "00000000") {
							_this.$vux.toast.show({
								width: '50%',
								type: 'text',
								position: 'top',
								text: '验证码发送成功'
							})

							_this.reduce()
						}
					})
				} else {
					_this.$vux.toast.show({
						width: '50%',
						type: 'text',
						position: 'top',
						text: '手机号码格式不正确'
					})
					_this.$refs.phone.focus()
				}
			},
			//倒计时
			reduce() {
				var _this = this
				if(_this.num == 0) {
					_this.codeText = "重新发送验证码"
					_this.num = 60;
					_this.sendFlag = false
					return;
				} else {
					_this.num--
						_this.codeText = '重新发送验证码' + "(" + _this.num + ")"
					_this.sendFlag = true
				}

				_this.Timeout = setTimeout(function() {
					_this.reduce()
				}, 1000)
			},
			backLogin() {
				this.isCp = false
				this.isReg = 1
				this.posReg = false
			}
		},
		components: {
			settingHeader,
			XButton,
		}
	}
</script>
<style lang="less" scoped>
	.login_box {
		background-color: white;
		height: 100%;
		.bg_white {
			padding: 0.70rem 0.80rem 0;
			box-sizing: border-box;
			position: relative;
			.title {
				font-size: 0.48rem;
				font-family: PingFangSC-Medium;
				color: rgba(26, 38, 66, 1);
				letter-spacing: 1px;
				margin-bottom: 0.70rem;
			}
			.input_box {
				position: relative;
				margin-bottom: 0.40rem;
				.label {
					font-size: 0.28rem;
					font-family: PingFangSC-Regular;
					color: rgba(144, 162, 199, 1);
				}
				.input {
					height: 0.85rem;
					padding: 0.20rem 0;
					box-sizing: border-box;
					position: relative;
					.set_code_btn {
						font-size: 0.28rem;
						font-family: PingFangSC-Regular;
						color: rgba(51, 111, 255, 1);
						position: absolute;
						top: 50%;
						right: 0.20rem;
						transform: translate(-0.20rem, -50%);
					}
					.set_code_btn {
						background-color: white;
						color: #256fff;
						padding-right: 0;
					}
					.set_code_btn:active {
						color: #256FFF;
						background-color: transparent!important;
					}
					.weui-btn:after {
						border: 1px solid transparent!important;
					}
					input {
						width: 100%;
						height: 100%;
						font-size: 0.28rem;
						font-family: PingFangSC-Regular;
						color: #1A2642;
					}
					input::-webkit-input-placeholder {
						color: #A0A0A0 !important; // WebKit browsers 
					}
					input:-moz-placeholder {
						color: #A0A0A0 !important; // Mozilla Firefox 4 to 18 
					}
					input::-moz-placeholder {
						color: #A0A0A0 !important; //Mozilla Firefox 19+ /
					}
					input:-ms-input-placeholder {
						color: #A0A0A0 !important; //Internet Explorer 10+ */
					}
				}
			}
			.input_box:after {
				content: " ";
				position: absolute;
				left: 0;
				bottom: 0;
				right: 0;
				height: 1px;
				border-top: 1px solid #E1E1E1;
				color: #E1E1E1;
				-webkit-transform-origin: 0 0;
				transform-origin: 0 0;
				-webkit-transform: scaleY(0.5);
				transform: scaleY(0.5);
				left: 0px;
			}
			.agreement_tip {
				font-size: 0.24rem;
				font-family: PingFangSC-Regular;
				color: rgba(160, 160, 160, 1);
				text-align: center;
				margin: 0.30rem auto 0.55rem;
				i {
					color: #336FFF;
				}
			}
			.submit_btn {
				width: 100%;
				height: 0.88rem;
				line-height: 0.88rem;
				text-align: center;
				background: rgba(56, 137, 255, 1);
				box-shadow: 0px 2px 20px 0px rgba(41, 120, 235, 0.4);
				font-size: 0.28rem;
				font-family: PingFangSC-Regular;
				color: rgba(255, 255, 255, 1);
			}
			.login-re {
				margin: 0.30rem 0;
				display: flex;
				justify-content: space-between;
				.left {
					font-size: 0.28rem;
					font-family: PingFangSC-Regular;
					color: rgba(144, 162, 199, 1);
				}
			}
		}
		.bg_white:after {
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
			left: 0px;
		}
	}
</style>
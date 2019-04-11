<template>
	<div class="login_box">
		<settingHeader title="大健康产业联盟"></settingHeader>
		<div class="bg_white">
			<div class="title" v-if="isReg == 1 || isReg == 3">{{isCp?'登录':'登录 / 注册'}}</div>
			<div class="title" v-if="isReg == 0">注册</div>

			<div class="input_box">
				<div class="label">手机号</div>
				<div class="input">
					<input type="tel" ref="phone" v-model="mobile" maxlength="11" @input="nameChange" placeholder="请输入手机号" />
				</div>
			</div>

			<div class="input_box" v-if="usepass">
				<div class="label">密码</div>
				<div class="input">
					<input ref="password" v-model="password" maxlength="25" :placeholder="isReg == 0 || isReg == 3?'请输入6~25位数的登录密码':'请输入登录密码'" type="password" />
				</div>
			</div>

			<!-- 升级登录注册 -->
			<div v-if="!usepass">
				<div class="input_box fadeInDown animated aaa" v-if="isReg == 1 && !posReg">
					<div class="label">验证码</div>
					<div class="input">
						<input type="tel" ref="code" maxlength="4" v-model="code" @input="codeChange" placeholder="请输入4位验证码" />
						<x-button class="set_code_btn" slot="right" type="primary" mini @click.native="sendCode" :disabled="sendFlag">{{codeText}}</x-button>
					</div>
				</div>
			</div>
			<!-- 升级登录注册end -->

			<div v-if="!usepass">
				<div class="input_box fadeInDown animated sss" v-if="isReg == 0 || posReg">
					<div class="label">验证码</div>
					<div class="input">
						<input type="tel" maxlength="4" ref="code" v-model="code" @input="codeChange" placeholder="请输入4位验证码" />
						<x-button class="set_code_btn" slot="right" type="primary" mini @click.native="sendCode" :disabled="sendFlag">{{codeText}}</x-button>
					</div>
				</div>
			</div>

			<div class="agreement_tip" v-if="isReg == 0">点击按钮表示同意
				<i @click="$router.push({path:'/member/setting/agreement'})">《CGC平台注册协议》</i>
			</div>
			<div class="submit_btn" @click="submit" v-if="isReg == 1">{{isCp?'立即登录':'登录 / 注册'}}</div>
			<div class="submit_btn" @click="reg" v-if="isReg == 0">立即注册</div>
			<div class="submit_btn" @click="login" v-if="posReg">立即登录</div>
			<!-- <div class="submit_btn" @click="toPosReg" v-if="posReg">立即激活</div> -->

			<div class="login-re" v-if="(isReg == 1 || isReg==3) && isCp">
				<span class="left" @click="forget()">忘记密码？</span>
				<span v-show="!ispass" @click="useYzmLogin">短信验证码登录</span>
				<span v-show="ispass" @click="userPassLogin">密码登录</span>
			</div>
			<!-- <div class="login-re" v-else>
               <span @click="backLogin" class="left">返回登录</span>
           </div> -->
		</div>
	</div>
</template>
<script>
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
				parentId: null,
				frompath: '',
				isCp: false,
				pid: '',
				posReg: null,
				oReg: null,
				allianceId: '',
				eid: '',
				ispass: true, //判断使用验证码或密码登录 btnn
				usepass: false,
				articleId: '', //文章id
				equipNumber: '', //设备编号
			}
		},
		created() {
			//alert(sessionStorage['parentUserId'])
			var _this = this;
			if(_this.mainApp.getCs('parentId')) {
				_this.parentId = _this.mainApp.getCs('parentId')
			} else {
				_this.parentId = sessionStorage['parentUserId']
			}

			// console.log(_this.parentId)

			if(_this.$route.query.mobile) {
				_this.mobile = _this.$route.query.mobile
			}
			_this.$store.state.page.isLogin = 'false'

		},
		beforeRouteEnter(to, from, next) {
			next(vm => {
				vm.frompath = from.path
				//console.log(from)
				if(from.path == "/member/article/detail") {
					this.articleId = from.query.id
				} else if(from.path == "/share/instrumentCode") {
					this.equipNumber = from.query.n
				}
				//用户设置完登录密码或支付密码后，重新登录
				if(from.path == "/user/changeLoginPassword2") {
					vm.usepass = true
					vm.ispass = false
					vm.nameChange()
				}

			})
		},
		beforeRouteLeave(to, from, next) {
			if((to.path == "/multi_user_mall/confirm_order" 
				|| to.path == "/share/comfirmOrder") 
				&& this.$store.state.page.isLogin == 'true') {
				// this.$router.go(-1)
				next({
					path: localStorage['_buyCommodityFullPath_'],
					replace: true
				})
			} else if(this.$store.state.page.isLogin != 'true' && !to.meta.isNoLogin){
				this.$router.go(-1)
			}else{
				next()
			}
		},
		methods: {
			forget(){
				this.$router.push({
					path:'/user/changeLoginPassword',
					query:{
						'mobile':this.mobile
					}
				})
			},
			userPassLogin() {
				var _this = this;
				_this.usepass = true
				_this.ispass = false
			},
			useYzmLogin() {
				var _this = this;
				_this.ispass = true
				_this.usepass = false
			},
			submit() {
				var _this = this
				// alert(1)
				if(_this.mobile.length != 11) {
					_this.mainApp.showMessage('手机号码长度不符合要求')
					return false
				}

				if(!_this.mainApp.isphone(_this.mobile)) {
					_this.mainApp.showMessage('手机号码格式不符合要求')
					return false
				}
				if(_this.usepass == true) {
					if(_this.password.length < 6 || _this.password.length > 25) {
						_this.mainApp.showMessage('密码长度不符合要求')
						return false
					}
				}
				if(!_this.usepass) {
					if(_this.code == "") {
						_this.mainApp.showMessage('验证码不能为空')
						return false
					}
				}

				_this.showLoading = true
				_this.isCheckLogin()
				_this.showLoading = false
			}, //注册
			reg() {
				var _this = this,
					// eid = localStorage['_eid_'],
					chainsid = localStorage['_chainsid_'],
					allianceid = localStorage['_allianceid_'];

				if(_this.mobile.length != 11) {
					_this.mainApp.showMessage('手机号码长度不符合要求')
					return false
				}

				if(!_this.mainApp.isphone(_this.mobile)) {
					_this.mainApp.showMessage('手机号码格式不符合要求')
					return false
				}

				if(!_this.usepass) {
					if(_this.code == "") {
						_this.mainApp.showMessage('验证码不能为空')
						return false
					}
				}

				_this.parentId = _this.parentId == "null" ? null : _this.parentId

				var params = {
					mobile: _this.mobile,
					// password: _this.MD5(_this.password),
					smsVerificationCode: _this.code,
					platformId: _this.url.platformId,
					parentUserId: _this.parentId,
					unionid: localStorage['_openid_'],
					terminal: _this.url.client
				};
				if(allianceid) {
					params.allianceId = allianceid
				}
				if(chainsid) {
					params.chainsId = chainsid
				}

				if(/MicroMessenger/.test(window.navigator.userAgent) ||
					/AlipayClient/.test(window.navigator.userAgent)) {
					if(!localStorage['_openid_']) {
						//微信或支付宝浏览器中，未获取到唯一标识码，则直接跳转重新授权
						//获取不同环境的授权地址
						let wbekitUrl = _this.mainApp.getOrizaUrl();
						//存入用户注册信息，调用再次授权成功后，则自动帮用户请求注册接口，无需用户输入两次
						// _this.mainApp.saveRegInfo(params);
						window.location.href = wbekitUrl;
						return false;
					}
				}

				_this.userRegister(params)
				/*if(eid){
					params = _this.getRegAllianceId(eid,params);
				}*/

				/*if(eid) {
						_this.getRegAllianceId(eid,params);
				} else {
				    _this.userRegister(params)
				}*/
			},
			userRegister(params) {
				var _this = this;
				// alert(params.allianceId)
				_this.$http.post(_this.url.user.userRegister, params).then(function(res) {
					if(res.data.status == "00000000") {
						//sessionStorage.setItem('regFirst',true)
						_this.mainApp.showMessage('注册成功','middle')

						let hash = base64_encode(res.data.data)

						_this.$store.state.user.userId = res.data.data.userId //保存userId

						localStorage.setItem('_HASH_', hash)

						localStorage.setItem('isLogin', true)

						_this.getUserInfo()

					}
				})
			},
			//登录
			login() {
				let _this = this,
					pid = localStorage['_openid_'],
					accessCode = localStorage['_accessCode_'],
					allianceid = localStorage['_allianceid_'],
					chainsid = localStorage['_chainsid_'];

				_this.parentId = _this.parentId == "null" ? null : _this.parentId
				// alert(_this.ispass)
				// alert(_this.usepass)  //true
				if(!_this.ispass) {
					// alert(2)
					if(_this.password.length < 6 || _this.password.length > 25) {
						_this.mainApp.showMessage('密码长度不符合要求')
						return false
					}
				}

				/*if(/MicroMessenger/.test(window.navigator.userAgent) 
				  || /AlipayClient/.test(window.navigator.userAgent)){
				    if(!localStorage['_openid_']){
				      //微信或支付宝浏览器中，未获取到唯一标识码，则直接跳转重新授权
				      //获取不同环境的授权地址
				      let wbekitUrl = _this.mainApp.getOrizaUrl();
				      window.location.href = wbekitUrl;
				      return false;
				    }
				 }*/

				// return;
				let params = {
					audience: 'user',
					platformId: _this.url.platformId,
					mobile: _this.mobile,
					// password: _this.MD5(_this.password),
					smsVerificationCode: _this.code,
					terminal: _this.url.client,
					parentUserId: _this.parentId
				}
				if(pid) {
					params.type = 1
					params.unionid = pid
					params.accessCode = accessCode
				}
				if(allianceid) {
					params.allianceId = allianceid
				}
				if(chainsid) {
					params.chainsId = chainsid
				}

				if(_this.password && !_this.ispass) {
					let pass = _this.MD5(_this.password)
					params.password = pass
				}
				_this.userLogin(params)

				/*if(eid){
						_this.getLogAllianceId(eid,params);
				}else{
					_this.userLogin(params)
				}*/
			},
			userLogin(params) {
				var _this = this,
					requrl = '';

				if(params.password) {
					requrl = _this.url.user.loginPAS
				} else {
					requrl = _this.url.user.userLogin
				}

				_this.$http.post(requrl, params).then(function(res) {
					if(res.data.status == "00000000") {

						let hash = base64_encode(res.data.data)

						_this.$store.state.user.userId = res.data.data.userId //保存userId
						_this.$store.state.user.token = res.data.data.token //保存token

						localStorage.setItem('_HASH_', hash)

						localStorage.setItem('isLogin', true)

						//判断是否要设置登录密码

						_this.mainApp.showMessage('登录成功','middle')

						_this.getUserInfo();

					}
				})
			},
			//注册登录成功后，获取用户信息，跳转
			getUserInfo() {
				var _this = this;
				//获取用户信息
				_this.$http.get(_this.url.user.getBasicInfo, {
					params: {
						// userId: res.data.data.userId
						userId: _this.$store.state.user.userId
					}
				}).then((res) => {
					if(res.data.status == "00000000") {

						localStorage.setItem('userInfo', JSON.stringify(res.data.data))
						_this.$store.state.page.isLogin = 'true'

						setTimeout(function() {
							/*_this.$router.replace({
                             path: '/index'
                         })*/
							if(window.sessionStorage.length > 2) {
								if(_this.frompath) {
									//alert(_this.frompath)
									if(_this.frompath != '/user/changeLoginPassword2' && _this.frompath != '/member/oriza') {
										if(_this.articleId) {
											_this.$router.replace({
												path: _this.frompath,
												query: {
													id: _this.articleId
												}
											})
											_this.$router.go(-1)
										} else if(_this.equipNumber) {
											_this.$router.replace({
												path: _this.frompath,
												query: {
													n: _this.equipNumber
												}
											})
											_this.$router.go(-1)
										} else {
											// alert(0)
											/*_this.$router.replace({
											    path: _this.frompath
											  })*/
											if(_this.frompath == '/user/changeLoginPassword2') {
												_this.$router.replace({
													path: '/index'
												})
											} else {
												_this.$router.replace({
													path: _this.frompath
												})
											}

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
							} else {
								_this.$router.replace({
									path: '/index'
								})
							}
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

							_this.mainApp.showMessage('该账户未注册,请先完成注册')

							} else if(res.data.data == '1') {
								//已注册
								_this.isReg = 1
								_this.posReg = false
								_this.isCp = true
								_this.login()
							} else if(res.data.data == '2') {
								//pos用户
								_this.isReg = 3
								_this.isCp = true
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
						_this.mainApp.showMessage('手机号码长度不符合要求')
						return false
					}

					if(!_this.mainApp.isphone(_this.mobile)) {
						_this.mainApp.showMessage('手机号码格式不符合要求')
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
									_this.oReg = false
									_this.mainApp.showMessage('该账户未注册,请先完成注册')
									// 使用验证码
									_this.ispass = true
									_this.usepass = false
									// 使用验证码end
								} else if(res.data.data == '1') {
									//已注册
									_this.isReg = 1
									_this.posReg = false

									_this.oReg = true
									_this.isCp = true

									_this.userPassLogin()
								} else if(res.data.data == '2') {
									//pos用户
									_this.isReg = 3

									_this.posReg = true
									_this.isCp = true
									_this.oReg = true

									_this.$dialog.show({
										type: 'warning',
										// headMessage:"是否开启设备？",
										message: '您的账户暂未设置登录密码，是否设置？',
										buttons: ['确定', '取消'],
										canel() {
											// console.log('你点击了取消')
										},
										confirm() {
											_this.$router.push({
												path: '/user/changeLoginPassword',
												query: {
													'mobile': _this.mobile
												}
											})

										},
									});

									// console.log(_this.posReg)
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
				// alert(_this.oReg)
				// return;
				if(_this.mainApp.isphone(_this.mobile)) {
					_this.$refs.code.focus()
					_this.$http.post(this.url.user.getVerificationCode, {
						mobile: _this.mobile,
						type: _this.oReg ? 4 : 1 //4登录  1注册
					}).then(function(res) {
						if(res.data.status == "00000000") {
							_this.mainApp.showMessage('验证码发送成功')
							_this.reduce()
						}
					})
				} else {
					_this.mainApp.showMessage('手机号码格式不正确')
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
			//注册时获取到allianceId
			getRegAllianceId(eid, params) {
				var _this = this

				_this.$http.get(_this.url.qy.getBasicInfo, {
					params: {
						enterpriseId: eid
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						if(res.data.data.allianceId) {
							_this.allianceId = res.data.data.allianceId
							params.allianceId = _this.allianceId
							// alert(params.allianceId+'   000111')
						}
						// _this.userRegister(params)
					}
				})
			},
			//登录时获取到allianceId
			getLogAllianceId(eid, params) {
				var _this = this

				_this.$http.get(_this.url.qy.getBasicInfo, {
					params: {
						enterpriseId: eid
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						if(res.data.data.allianceId) {
							_this.allianceId = res.data.data.allianceId
							params.allianceId = _this.allianceId
							// alert(params.allianceId+'   000111')
						}
						_this.userLogin(params)
					}
				})
			}
			/*backLogin() {
			    this.isCp = false
			    this.isReg = 1
			    this.posReg = false
			}*/
		},
		components: {
			settingHeader,
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
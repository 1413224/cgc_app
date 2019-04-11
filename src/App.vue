<template>
	<div id="app" ref="fBox">
		<!--动画  页面缓存-->
		<transition :name="viewTransition" :css="!!direction">
			<keep-alive :include="includeList">
				<router-view @getPlatformId="getPlatformId"></router-view>
			</keep-alive>
		</transition>

		<!-- <settingFooter v-if="$route.meta.navShow && showDefaultNav"></settingFooter> -->
		<settingFooter v-if="$route.meta.navShow && showDefaultNav"></settingFooter>

		<!-- 自定义底部菜单 -->
		<footnav-comp 
			v-if="$route.meta.navShow && platformId" 
			:codeArrya="codeArrya" 
			:platformId="platformId">
		</footnav-comp>
		<!-- 自定义底部菜单end -->

		<div v-transfer-dom class="dia">
			<x-dialog v-model="orientation" class="dialog-demo" hide-on-blur>
				<div class="img-box">
					<img src="../static/images/orientation.jpg" style="max-width:100%">
				</div>
				<div @click="orientation=false">
					<!-- <span class="vux-close"></span> -->
				</div>
			</x-dialog>
		</div>

		<!-- 设备数开始 -->
		<div v-show="equipmentShow && !show" class="wfg-box" ref="moveDiv" @mousedown="down" @touchstart="down" @mousemove="move" @touchmove="move" @mouseup="end" @touchend="end" @click="goDetail">
			<img :src="'./static/images/wfgImg.png'" alt="" />
			<p>{{equipmentNum}}台</p>
		</div>
		<!-- 设备数结束 -->

		<masker v-if="isOpen" @click.native="close" :fullscreen="true" color="222222" :opacity="0.5"></masker>
		<div v-show="show" class="navigation_box" :class="{'r0':isOpen}" ref="moveDiv2" @mousedown="down2" @touchstart="down2" @mousemove="move2" @touchmove="move2" @mouseup="end2">
			<div class="open" v-if="!isOpen" @click="open">
				<img :src="'./static/images/zhankai.png'" alt="" />
				<div>
					<p>快速</p>
					<p>导航</p>
				</div>
				<span class="tip" v-if="equipmentNum > 0"></span>
			</div>
			<div class="close" v-if="isOpen" @click="close">
				<div class="left">
					<img :class="{'r180':isOpen}" :src="'./static/images/zhankai.png'" alt="" />
					<div>
						<p>收回</p>
					</div>
				</div>
			</div>
			<div class="nav_list">
				<ul>
					<li v-for="(item,index) in navList" :key="index" @click="navClick(index)">
						<img :src="item.logo" />
						<p>{{item.title}}</p>
						<div class="tip" v-if="item.tip && item.tip != 0">{{item.tip}}</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import codeArrya from '@/global/code.js'
	import settingFooter from '@/components/setting_footer'
	import footnavComp from '@/components/custom/footnavComp'
	// import { ButtonTab, ButtonTabItem, Masker } from 'vux'
	import { mapState } from 'vuex'
	import equipment from '@/mixin/equipment'
	import fastnav from '@/mixin/fastnav'
	export default {
		name: 'App',
		mixins:[equipment,fastnav],
		computed: {
			...mapState({
				direction: state => state.page.direction,
				includeList: state => state.page.includeList,
				isWx: state => state.page.isWx,
				userid: state => state.user.userId,
				isLogin: state => state.page.isLogin,
				showDefaultNav: state => state.user.showDefaultNav,
				platformMenuId: state => state.user.platformMenuId,
				shoePlatformMenu: state => state.user.shoePlatformMenu
			}),
			viewTransition() {
				if(!this.direction) return ''
				return 'vux-pop-' + (this.direction === 'forward' ? 'in' : 'out')
			},
		},
		data() {
			return {
				id: '001',
				orientation: false,
				flags: false,
				position: {
					x: 0,
					y: 0
				},
				nx: '',
				ny: '',
				dx: '',
				dy: '',
				xPum: '',
				yPum: '',
				equipmentNum: '',
				equipmentShow: false,
				isOpen: false,
				show: false,
				navList: [{
						title: '首页',
						logo: './static/images/nav-one.png',
					},
					{
						title: '设备管理',
						logo: './static/images/nav-two.png',
						tip: '0'
					},
					{
						title: '产业联盟',
						logo: './static/images/nav-three.png'
					},
					{
						title: '个人中心',
						logo: './static/images/nav-four.png'
					}
				],
				footnavConfig: {},
				codeArrya: codeArrya,
				platformId: '',
				href: ''
			}
		},
		created() {
			var _this = this
			window.onorientationchange = function() {
				if(window.orientation == 90 || window.orientation == -90) {
					_this.orientation = true;
				} else {
					_this.orientation = false;
				}
			}
			//设置微信头部标题
			if(this.$router.app._route.meta.title) {
				document.title = this.$router.app._route.meta.title
			}
		},
		mounted() {
			// 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据
			/*window.onbeforeunload = function(e){
				// alert(localStorage['beforeLoginUrl'])
				if(localStorage['beforeLoginUrl']){
					var storage = window.localStorage;
					// storage.removeItem('beforeLoginUrl')
					// storage.removeItem('_openid_')
					// console.log(localStorage['beforeLoginUrl'])
				}
			}*/
			window.onunload = function(e){
				if(localStorage['_chainsid_']){
					localStorage.removeItem('_chainsid_')
				}
				if(localStorage['_allianceid_']){
					localStorage.removeItem('_allianceid_')
				}
				if(localStorage['_buyCommodityFullPath_']){
					localStorage.removeItem('_buyCommodityFullPath_')
				}
			}
		},
		components: {
			// ButtonTab,
			// ButtonTabItem,
			settingFooter,
			// Masker,
			// XDialog,
			footnavComp
		},
		methods: {
			fx() {
				var _this = this,
					appId = '',
					uri = window.location.href.split('#')[0], //截取#前面的路径
					params = {
						url: uri
					};

				if(location.host == _this.url.health) {
					params.mchId = _this.url.mchIdHealth
					appId = _this.url.appIdHealth
				} else if(location.host == _this.url.cgc) {
					params.mchId = _this.url.mchIdCgc
					appId = _this.url.appIdCgc
				} else if(location.host == _this.url.test) {
					params.mchId = _this.url.mchIdTest
					appId = _this.url.appIdTest
				} else {
					params.mchId = _this.url.mchIdTest
					appId = _this.url.appIdTest
				}
				_this.$http.post(_this.url.zf.wxScan, params).then((res) => {

					wx.config({
						debug: false,
						appId: appId,
						timestamp: res.data.data.timestamp,
						nonceStr: res.data.data.nonceStr,
						signature: res.data.data.signature,
						jsApiList: ['checkJsApi', 'scanQRCode', 'onMenuShareTimeline', 'onMenuShareAppMessage']
					})

					wx.ready(function() {
						//分享给好友
						wx.onMenuShareAppMessage({
							title: 'CGC全球智慧产业联盟', // 分享标题
							desc: '注册即可获1000信用积分，1：1当钱花', // 分享描述
							link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
							imgUrl: 'http://domain.cgc999.com:8080/group1/M00/00/6D/rBL0CVv7wamAIl75AAAsglR_VP0222.png', // 自定义图标
							type: 'link', // 分享类型,music、video或link，不填默认为link
							dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
							success: function() {
								// 用户确认分享后执行的回调函数
								//alert('分享给朋友成功')
							},
							cancel: function() {
								// 用户取消分享后执行的回调函数
								//alert('取消分享')
							}
						});
					})
				})
			},
			open() {
				this.isOpen = !this.isOpen
			},
			close() {
				this.isOpen = !this.isOpen
			},
			navClick(index) {
				var _this = this

				this.isOpen = !this.isOpen

				if(index == 0) {
					_this.$router.push({
						path: '/'
					})
				} else if(index == 1) {
					if(_this.equipmentNum == 0) {
						if(this.$store.state.page.isLogin == 'false') {
							_this.mainApp.showMessage('请登录管理设备')

							_this.$router.push({
								path: '/user/login'
							})
						} else {
							_this.mainApp.showMessage('暂无设备')

						}
					} else {
						_this.$router.push({
							path: '/share/usetime',
							query: {
								id: _this.$store.state.user.userId
							}
						})
					}
				} else if(index == 2) {
					_this.$router.push({
						path: '/share/storelist'
					})
				} else {
					_this.$router.push({
						path: '/member/index'
					})
				}
			},
			//检测是否设置支付密码
			//			getUserPayPassword() {
			//				var _this = this
			//				_this.$http.get(_this.url.user.getUserPayPassword, {
			//					params: {
			//						userId: _this.$store.state.user.userId
			//					}
			//				}).then((res) => {
			//					if(res.data.status == "00000000") {
			//						if(res.data.data == 2) {
			//							sessionStorage.setItem('isPay', 1)
			//							_this.$popup.show({
			//								showPay: true
			//							})
			//						}
			//					}
			//				})
			//			},
			
			goDetail() {
				var _this = this
				if(_this.equipmentNum == 0) {
					_this.mainApp.showMessage('暂无设备')
				} else {
					this.$router.push({
						path: '/share/usetime',
						query: {
							id: _this.$store.state.user.userId
						}
					})
				}

			},
			//获取行业平台menuid
			getPlatformId(id) {
				// console.log(id+'gggg')
				this.platformId = id
			},
			getPublicNotice() {
				var _this = this
				if(_this.$store.state.page.isLogin == 'true') {
					_this.$http.get(_this.url.user.getPublicNotice, {
						params: {
							userId: _this.$store.state.user.userId
						}
					}).then((res) => {
						if(res.data.status == "00000000") {
							//控制新人奖励弹窗
							if(res.data.data.type == 1) {
								_this.$popup.show({
									showZj: true,
									showData: res.data.data
								})
							} else if(res.data.data.type == 2 && (res.data.data.points > 0 || res.data.data.balance > 0)) {
								_this.$popup.show({
									showSr: true,
									showData: res.data.data
								})
							}
						}
					})
				}
			}
		},
		watch: {
			'$route' (to, from, next) {
				var _this = this
				// 排除文章详情页
				if(to.path != '/member/article/detail') {
					_this.fx()
				}
				//判断是否微信端   奖励弹窗  
				if(_this.isWx) {

					if(localStorage['_openid_']) {

						if((sessionStorage['parentUserId'] == undefined 
							|| sessionStorage['parentUserId'] == null) 
							&& (_this.$store.state.user.userId != _this.mainApp.getCs('parentId'))) 
						{
							sessionStorage.setItem('parentUserId', _this.mainApp.getCs('parentId'))
						}

						if(_this.$store.state.page.isLogin == 'true') {
							/*_this.$router.replace({
								query: _this.merge(_this.$route.query, {
									'parentId': _this.$store.state.user.userId
								})
							})*/
							var pid = _this.mainApp.getCs('parentId')
							if(!pid){
								_this.$router.replace({
									query: _this.merge(_this.$route.query, {
										'parentId': _this.$store.state.user.userId
									})
								})
							}
							
						}

						//显示快速导航
						if(!_this.$route.meta.navShow && _this.$route.path != "/user/login") {
							_this.show = true
							_this.isOpen = false
						} else {
							_this.show = false
							_this.isOpen = false
						}

						if(
							_this.$store.state.page.isLogin == 'true' 
							&& _this.$route.path != "/share/usetime"
							&& _this.$route.path != "/user/login") {
							_this.getEquipment()
						} else {
							_this.equipmentShow = false
						}
						//控制弹窗
						if(to.path == '/index' && from.path == "/index") {
							_this.getPublicNotice()
						}
						//控制新人奖励弹窗
						if(sessionStorage.getItem('isZc')) {
							_this.$popup.hide()
						} else {
							if(_this.$store.state.page.isLogin != 'true' && to.path != '/user/login' && to.path != '/custom' && to.path != '/multi_user_mal') {
								sessionStorage.setItem('isZc', 1)
								_this.$popup.show({
									showZc: true
								})
							}
						}
						//控制设置密码弹窗
						if(sessionStorage.getItem('isPay')) {
							_this.$popup.hide()
						} else {
							if(_this.$store.state.page.isLogin == 'true' && to.path != '/user/login') {
								sessionStorage.setItem('isPay', 1)
								//_this.getUserPayPassword()
							}
						}

					}
				} else {
					if((sessionStorage['parentUserId'] == undefined || sessionStorage['parentUserId'] == null) && (_this.$store.state.user.userId != _this.mainApp.getCs('parentId'))) {
						sessionStorage.setItem('parentUserId', _this.mainApp.getCs('parentId'))
					}

					if(_this.$store.state.page.isLogin == 'true') {

						var pid = _this.mainApp.getCs('parentId')
						if(!pid){
							_this.$router.replace({
								query: _this.merge(_this.$route.query, {
									'parentId': _this.$store.state.user.userId
								})
							})
						}
					}

					//显示快速导航
					if(!_this.$route.meta.navShow && _this.$route.path != "/user/login") {
						_this.show = true
						_this.isOpen = false
					} else {
						_this.show = false
						_this.isOpen = false
					}
					//控制弹窗
					_this.getPublicNotice()
					//控制新人奖励弹窗
					if(sessionStorage.getItem('isZc')) {
						_this.$popup.hide()
					} else {
						if(_this.$store.state.page.isLogin != 'true' && to.path != '/user/login' && to.path != '/custom') {
							sessionStorage.setItem('isZc', 1)
							_this.$popup.show({
								showZc: true
							})
						}
					}
					//控制设置密码弹窗
					if(sessionStorage.getItem('isPay')) {
						_this.$popup.hide()
					} else {
						if(_this.$store.state.page.isLogin == 'true' && to.path != '/user/login') {
							sessionStorage.setItem('isPay', 1)
							//_this.getUserPayPassword()
						}
					}

					if(_this.$store.state.page.isLogin == 'true' 
						&& _this.$route.path != "/share/usetime" 
						&&_this.$route.path != "/user/login") {
						_this.getEquipment()
					} else {
						_this.equipmentShow = false
					}

				}

				//路由切换返回顶部
				document.body.scrollTop = 0
				document.documentElement.scrollTop = 0

				//设置微信端头部标题
				if(this.$route.meta.title) {
					document.title = this.$route.meta.title
				} else {
					document.title = 'CGC全球智慧产业联盟'
				}

				//自定义组件关闭
				this.$code.hide() //验证码  支付密码框
				this.$dialog.hide() //提示框
				this.$scImg.hide() //上传图片截图框
			},
			//未登录 删除缓存个人信息
			isLogin() {
				if(this.isLogin == false) {
					localStorage.removeItem('userInfo')
				}
			},

		},

	}
</script>

<style lang='less'>
	.skeleton-wrapper {
		background: #ccc;
		width: 100%;
		height: 100px;
	}
	
	* {
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	}
	
	.weui-dialog {
		background-color: transparent !important;
		z-index: 10001;
	}
	
	.weui-mask {
		z-index: 9998;
	}
	
	.add-btn {
		border-radius: 2px!important;
	}
	
	#app {
		height: 100%;
		background-color: #F5F6FA;
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	
	[v-cloak] {
		display: none !important;
	}
	
	.vux-pop-out-enter-active,
	.vux-pop-out-leave-active,
	.vux-pop-in-enter-active,
	.vux-pop-in-leave-active {
		will-change: transform;
		transition: all .5s cubic-bezier(.55, 0, .1, 1);
		height: 100%;
		width: 100%;
		top: 0;
		width: 100%;
		position: absolute;
		backface-visibility: hidden;
		perspective: 1000;
	}
	
	.vux-pop-out-enter {
		transform: translate3d(-100%, 0, 0);
	}
	
	.vux-pop-out-leave-active {
		transform: translate3d(100%, 0, 0);
	}
	
	.vux-pop-in-enter {
		transform: translate3d(100%, 0, 0);
	}
	
	.vux-pop-in-leave-active {
		transform: translate3d(-100%, 0, 0);
	}
	/*弹窗 取消  确定  按钮颜色*/
	
	.weui-dialog__btn_primary {
		color: #f90!important;
	}
	
	.weui-dialog__btn_default {
		color: #353535!important;
	}
	/*单选框颜色*/
	
	.vux-check-icon>.weui-icon-success:before,
	.vux-check-icon>.weui-icon-success-circle:before {
		color: #1c70f1!important;
	}
	/*地址选择框 完成按钮 颜色*/
	
	.vux-popup-header-right {
		color: #336fff!important;
	}
	/*input框架  高度100%*/
	
	.input-div {
		.weui-cell__bd {
			height: 100%;
			input {
				height: 100%;
			}
		}
	}
	/*设备数*/
	
	.wfg-box {
		position: fixed;
		bottom: 2.26rem;
		right: 0.20rem;
		z-index: 999999;
		width: 1.26rem;
		height: 1.26rem;
		background: rgba(18, 183, 245, 1);
		box-shadow: 0px 4px 12px 0px rgba(18, 183, 245, 0.5);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-bottom: 0.39rem;
		margin-right: 0.20rem;
		img {
			width: 0.66rem;
			height: 0.33rem;
		}
		p {
			font-size: 0.24rem;
			font-family: PingFangSC-Regular;
			color: rgba(255, 255, 255, 1);
		}
	}
	
	.r0 {
		right: 0rem!important;
	}
	
	.navigation_box {
		position: fixed;
		bottom: 1.80rem;
		right: -5.20rem;
		height: 1.22rem;
		z-index: 11115;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease-in-out;
		.open,
		.close .left {
			width: 0.90rem;
			height: 0.70rem;
			background: rgba(26, 38, 66, 0.70);
			border-radius: 4px 0px 0px 4px;
			display: flex;
			align-items: center;
			justify-content: center;
			img {
				width: 0.20rem;
				height: 0.20rem;
				margin-right: 0.08rem;
			}
			p {
				font-size: 0.22rem;
				font-family: PingFangSC-Regular;
				color: rgba(255, 255, 255, 1);
			}
		}
		.open {
			position: relative;
			span {
				width: 0.14rem;
				height: 0.14rem;
				border-radius: 50%;
				display: inline-block;
				background: rgba(242, 48, 48, 1);
				position: absolute;
				right: 0.02rem;
				top: 0.05rem;
			}
		}
		.open div {
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
		}
		.close {
			display: flex;
			align-items: center;
			justify-content: center;
			.left .r180 {
				transform: rotate(-180deg);
			}
		}
		.nav_list {
			width: 5.20rem;
			height: 1.22rem;
			background: rgba(255, 255, 255, 1);
			border-radius: 4px 0px 0px 4px;
			ul {
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				li {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					position: relative;
					img {
						width: 0.46rem;
						height: 0.46rem;
						margin-bottom: 0.05rem;
					}
					p {
						font-size: 0.20rem;
						font-family: PingFangSC-Regular;
						color: rgba(26, 38, 66, 1);
					}
					.tip {
						width: 0.26rem;
						height: 0.26rem;
						line-height: 0.26rem;
						text-align: center;
						background: rgba(242, 48, 48, 1);
						font-size: 0.20rem;
						font-family: PingFangSC-Regular;
						color: rgba(255, 255, 255, 1);
						position: absolute;
						top: 0;
						right: 0.28rem;
						border-radius: 50%;
					}
				}
			}
		}
	}
</style>
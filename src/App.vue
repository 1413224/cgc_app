<template>
	<div id="app" ref="fBox" v-cloak>
		<!--动画  页面缓存-->
		<transition :name="viewTransition" :css="!!direction">
			<keep-alive :include="includeList">
				<router-view></router-view>
			</keep-alive>
		</transition>
		<settingFooter v-if="$route.meta.navShow"></settingFooter>
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
		<div v-if="equipmentShow" class="wfg-box" ref="moveDiv" @mousedown="down" @touchstart="down" @mousemove="move" @touchmove="move" @mouseup="end" @touchend="end" @click="goDetail">
			<img :src="'./static/images/wfgImg.png'" alt="" />
			<p>{{equipmentNum}}台</p>
		</div>
		<!-- 设备数结束 -->

	</div>
</template>

<script>
	import settingFooter from '@/components/setting_footer'
	import { ButtonTab, ButtonTabItem } from 'vux'
	import { mapState } from 'vuex'
	export default {
		name: 'App',
		computed: {
			...mapState({
				direction: state => state.page.direction,
				includeList: state => state.page.includeList,
				isWx: state => state.page.isWx,
				isLogin: state => state.page.isLogin
			}),
			viewTransition() {
				if(!this.direction) return ''
				return 'vux-pop-' + (this.direction === 'forward' ? 'in' : 'out')
			}
		},
		data() {
			return {
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
				equipmentShow: false

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
		components: {
			ButtonTab,
			ButtonTabItem,
			settingFooter
		},
		mounted() {

		},
		methods: {
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
							sessionStorage.setItem('isPay', 1)
							_this.$popup.show({
								showPay: true
							})
						}
					}
				})
			},
			getEquipment() {
				var _this = this
				if(_this.$store.state.page.isLogin == 'true') {
					_this.$http.get(_this.url.share.getMyEquipmentNotice, {
						params: {
							userId: _this.$store.state.user.userId
						}
					}).then((res) => {
						if(res.data.status == "00000000") {
							if(res.data.data) {
								_this.equipmentNum = res.data.data.num
								_this.equipmentShow = res.data.data.num > 0 ? true : false
							}
						}
					})
				} else {
					_this.equipmentShow = false
				}

			},
			goDetail() {
				var _this = this
				if(_this.equipmentNum == 0) {
					this.$vux.toast.text('暂无设备', 'top')
				} else {
					this.$router.push({
						path: '/share/usetime',
						query: {
							id: _this.$store.state.user.userId
						}
					})
				}

			},
			// 实现移动端拖拽
			down() {
				this.flags = true;
				var touch;
				if(event.touches) {
					touch = event.touches[0];
				} else {
					touch = event;
				}
				this.position.x = touch.clientX;
				this.position.y = touch.clientY;
				this.dx = this.$refs.moveDiv.offsetLeft;
				this.dy = this.$refs.moveDiv.offsetTop;
			},
			move() {
				if(this.flags) {
					var touch;
					if(event.touches) {
						touch = event.touches[0];
					} else {
						touch = event;
					}
					this.nx = touch.clientX - this.position.x;
					this.ny = touch.clientY - this.position.y;
					this.xPum = this.dx + this.nx;
					this.yPum = this.dy + this.ny;

					if(this.xPum >= Number(document.body.clientWidth / 6) && this.xPum < Number(document.body.clientWidth - 70)) {
						this.$refs.moveDiv.style.left = this.xPum + "px";
					} else if(this.xPum < 0) {
						this.$refs.moveDiv.style.left = Number(document.body.clientWidth / 6) + "px";
					}
					var h = this.$route.meta.navShow ? Number(document.body.clientHeight - 120) : Number(document.body.clientHeight - 70)
					if(this.yPum >= 0 && this.yPum < h) {
						this.$refs.moveDiv.style.top = this.yPum + "px";
					} else if(this.yPum < 0) {
						this.$refs.moveDiv.style.top = 0 + "px";
					}
					//阻止页面的滑动默认事件
					//					document.addEventListener("touchmove", function() {
					event.preventDefault();
					//					}, false);
				}
			},
			//鼠标释放时候的函数
			end() {
				this.flags = false;
			}
		},
		watch: {
			'$route' (to, from, next) {
				var _this = this

				console.log(this.includeList)

				//判断是否微信端   奖励弹窗  
				if(_this.isWx) {

					if(sessionStorage['_openid_']) {

						if(_this.$store.state.page.isLogin == 'true' && _this.$route.path != "/share/usetime") {
							_this.getEquipment()
						} else {
							_this.equipmentShow = false
						}

						//控制新人奖励弹窗
						if(sessionStorage.getItem('isZc')) {
							_this.$popup.hide()
						} else {
							if(_this.$store.state.page.isLogin != 'true' && to.path != '/user/reg') {
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
							if(_this.$store.state.page.isLogin == 'true' && to.path != '/user/reg') {
								sessionStorage.setItem('isPay', 1)
								_this.getUserPayPassword()
							}
						}
					}
				} else {
					//控制新人奖励弹窗
					if(sessionStorage.getItem('isZc')) {
						_this.$popup.hide()
					} else {
						if(_this.$store.state.page.isLogin != 'true' && to.path != '/user/reg') {
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
						if(_this.$store.state.page.isLogin == 'true' && to.path != '/user/reg') {
							sessionStorage.setItem('isPay', 1)
							_this.getUserPayPassword()
						}
					}

					if(_this.$store.state.page.isLogin == 'true' && _this.$route.path != "/share/usetime") {
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
					document.title = '大健康App'
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
			}
		}
	}
</script>

<style lang='less'>
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
</style>
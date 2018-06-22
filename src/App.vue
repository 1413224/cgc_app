<template>
	<div id="app" ref="fBox" v-cloak>
		<!--动画  页面缓存-->
		<transition :name="viewTransition" :css="!!direction">
			<keep-alive :include="includeList">
				<router-view></router-view>
			</keep-alive>
		</transition>
		<!--图片预览插件-->
		<lg-preview v-if="$store.state.page.ispreview"></lg-preview>
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

		<div class="tc-box">
			<!--购物奖励弹窗-->
			<x-dialog v-model="showNew" class="xrBox" :dialog-style="transparent">
				<div class="p_box">
					<img @click="showNew = false" class="xr_img" :src="'./static/images/xr_bg.png'" alt="" />

					<div class="p_content">
						<p>本次消费奖励</p>
						<p>7.20 <span>通用积分</span></p>
						<p>通用积分将自动存入您的资产余额</p>
					</div>

					<img @click="showNew = false" class="gb_img" :src="'./static/images/xr_gb.png'" alt="" />
				</div>
			</x-dialog>

			<!--新人奖励弹窗-->
			<x-dialog v-model="showNew2" class="zcBox" :dialog-style="transparent">
				<div class="zc_box">
					<div class="zc_content">
						<div class="item_box" v-for="(item,index) in zcList" :key="index">
							<div>
								<p>{{item.jf}}</p>
								<p>自动存入通用积分</p>
							</div>
							<div>
								<p>¥ <span>{{item.money}}</span></p>
								<p>{{item.mk}}</p>
							</div>
						</div>
						<div class="zc-btn" @click="toReg">
							立即注册
						</div>
					</div>
				</div>
				<img @click="showNew2 = false" class="gb_img" :src="'./static/images/xr_gb.png'" alt="" />
			</x-dialog>
		</div>
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
				isWx: '',
				orientation: false,
				showNew: false, //购物奖励弹窗
				showNew2: true, //新人奖励弹窗
				zcList: [{
						jf: '通用积分',
						money: '10',
						mk: '无门槛全场使用'
					},
					{
						jf: '通用积分',
						money: '20',
						mk: '满50减10'
					},
					{
						jf: '通用积分',
						money: '30',
						mk: '无门槛全场使用'
					}
				]
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

			if(sessionStorage.getItem('isPopup')) {
				_this.showNew2 = false

			} else {
				//奖励弹窗
				sessionStorage.setItem('isPopup', 1)

				if(_this.$store.state.page.isLogin != 'true' && _this.$route.path != '/user/reg') {
					_this.showNew2 = true
				} else {
					_this.showNew2 = false
				}
			}

		},
		components: {
			ButtonTab,
			ButtonTabItem,
			settingFooter
		},
		methods: {
			toReg() {
				this.showNew2 = false
				this.$router.push({
					path: '/user/reg'
				})
			}
		},
		watch: {
			'$route' (to, from, next) {

				var _this = this

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
				this.$code.hide()
				this.$dialog.hide()
				this.$scImg.hide()
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
	
	.zcBox {
		.weui-dialog {
			width: 5.5rem;
			max-width: 100%;
		}
	}
</style>
<style lang="less" scoped>
	.zcBox {
		.zc_box {
			.zc-btn {
				width: 5.16rem;
				height: 0.8rem;
				line-height: 0.8rem;
				background: rgba(255, 204, 9, 1);
				border-radius: 4px;
				font-size: 0.34rem;
				font-family: PingFangSC-Semibold;
				color: rgba(209, 14, 22, 1);
				margin: 0 auto;
				margin-top: 0.2rem;
			}
			.zc_content {
				padding: 1.8rem 0.2rem 0.35rem 0.2rem;
				box-sizing: border-box;
				background: url(../static/images/zc_bg.png) no-repeat;
				background-size: 100% 100%;
				position: relative;
				.item_box {
					background: url(../static/images/it_bg.png) no-repeat;
					background-size: 100% 100%;
					padding: 0.2rem;
					box-sizing: border-box;
					display: flex;
					margin-bottom: 0.2rem;
					div:nth-child(1) {
						width: 3rem;
						display: flex;
						flex-direction: column;
						align-items: flex-start;
						justify-content: space-between;
						p:nth-child(1) {
							font-size: 0.28rem;
							font-family: PingFangSC-Medium;
							color: rgba(15, 24, 45, 1);
						}
						p:nth-child(2) {
							font-size: 0.24rem;
							font-family: PingFangSC-Regular;
							color: rgba(115, 134, 173, 1);
						}
					}
					div:nth-child(2) {
						flex: 1;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: space-between;
						height: 100%;
						p:nth-child(1) {
							font-size: 0.26rem;
							font-family: PingFangSC-Regular;
							color: rgba(242, 48, 48, 1);
							span {
								font-size: 0.6rem;
								font-family: PingFangSC-Medium;
								color: rgba(242, 48, 48, 1);
							}
						}
						p:nth-child(2) {
							font-size: 0.24rem;
							font-family: PingFangSC-Regular;
							color: rgba(115, 134, 173, 1);
						}
					}
				}
				.item_box:last-child {
					margin-bottom: 0px!important;
				}
			}
		}
		.gb_img {
			width: 0.6rem;
			height: 0.6rem;
			margin-top: 0.2rem;
		}
	}
	
	.xrBox {
		.p_box {
			position: relative;
			.xr_img {
				width: 100%;
				height: auto;
			}
			.p_content {
				width: 100%;
				position: absolute;
				top: 49%;
				left: 50%;
				transform: translate(-50%, -50%);
				p:nth-child(1) {
					font-size: 0.28rem;
					font-family: PingFangSC-Regular;
					color: rgba(164, 113, 57, 1);
				}
				p:nth-child(2) {
					font-size: 0.68rem;
					font-family: PingFangSC-Semibold;
					color: rgba(242, 48, 48, 1);
					span {
						font-size: 0.24rem;
						font-family: PingFangSC-Regular;
						color: rgba(242, 48, 48, 1);
					}
				}
				p:nth-child(3) {
					font-size: 0.22rem;
					font-family: PingFangSC-Regular;
					color: rgba(164, 113, 57, 1);
				}
			}
			.gb_img {
				width: 0.82rem;
				height: 0.82rem;
				margin-top: 0.33rem;
			}
		}
	}
</style>
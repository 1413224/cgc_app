<template>
	<div class="qrcode-box">
		<settingHeader :title="title"></settingHeader>
		<div class="hym" v-if="qrcodeIndex == 0">
			<div class="middle-box">
				<div class="bw-box" v-if="noOpen">
					<div class="box">
						<img :src="'./static/qrcode/code.png'" alt="" />
						<p class="tip">扫码付全面升级，欢迎体验</p>
						<p class="xy">点击下方按钮即同意 <span>《CGC全球智慧产业联盟扫码付款用户协议》</span></p>
						<div class="btn" @click="open">立即开启</div>
					</div>
				</div>
				<div class="bw-box2" v-else>
					<div class="da">
						<div class="top">
							<img v-if="userInfo.avatar" :src="userInfo.avatar.original" alt="" />
							<img v-else :src="'./static/images/mrtx.png'" alt="" />
							<p>{{userInfo.mobile}}</p>
						</div>
						<div class="bottom">
							<p class="tip">向营业员出示会员码完成会员积分或付款</p>
							<barcode :value="barcodes" :options="barcode_option" tag="svg"></barcode>
						</div>
					</div>
					<div class="tip-box">
						<img :src="'./static/qrcode/laba.png'" alt="" /> 买单报手机号，赢5000元大奖！
					</div>
				</div>

				<div class="bottom-tip">
					<p>请在标记有</p>
					<img :src="'./static/qrcode/e-logo.png'" alt="" />
					<p>的商户使用</p>
				</div>
			</div>
		</div>
		<div class="tgm" v-if="qrcodeIndex == 1">
			<div class="bw-box3">
				<div class="all">
					<div class="top">
						<qrcode :value="qrcodeVal" :size="width" type="img" class="qrcode"></qrcode>
					</div>
					<div class="bottom">
						<img class="tx" v-if="userInfo.avatar" :src="userInfo.avatar.original" alt="" />
						<img class="tx" v-else :src="'./static/images/mrtx.png'" alt="" />
						<p class="name">{{userInfo.mobile}}</p>
					</div>
				</div>
				<p class="tip">让好友扫二维码或长按保存图片后发送给好友</p>
			</div>
		</div>

		<div class="qrcode-f" :class="qrcodeIndex == 0?'blue':'red'">
			<div @click="qrcodeClick(0,'会员码')">
				<img :src="qrcodeIndex == 0?'./static/qrcode/hym-in.png':'./static/qrcode/hym.png'" alt="" />
				<p :class="qrcodeIndex == 0?'white':''">会员码</p>
			</div>
			<div @click="qrcodeClick(1,'推广码')">
				<img :src="qrcodeIndex == 1?'./static/qrcode/tgm-in.png':'./static/qrcode/tgm.png'" alt="" />
				<p :class="qrcodeIndex == 1?'white':''">推广码</p>
			</div>
			<div @click="scan">
				<img :src="'./static/qrcode/sys.png'" alt="" />
				<p>扫一扫</p>
			</div>
			<div @click="$router.push({path:'/member/purse/commercial'})">
				<img :src="'./static/qrcode/zcsh.png'" alt="" />
				<p>支持商户</p>
			</div>
		</div>
	</div>
</template>

<script>
	import { Qrcode } from 'vux'
	import settingHeader from '../../../components/setting_header'
	import VueBarcode from '@xkeshi/vue-barcode'
	export default {
		data() {
			return {
				title: '我的二维码',
				grade: 1,
				width: '',
				userInfo: {},
				images: '',
				qrcodeIndex: 0,
				barcode_option: {
					format: "CODE128",
					displayValue: true, //是否默认显示条形码数据
					textPosition: 'bottom', //条形码数据显示的位置
					textAlign: 'center',
					background: '#fff', //条形码背景颜色
					valid: function(valid) {

					},
					width: '3',
					fontSize: '26px', //字体大小,
					text: ''
				},
				barcodes: '',

				noOpen: true,
			}
		},
		created() {

//			if(this.$store.state.page.isLogin == 'false') {
//				this.$vux.toast.show({
//					width: '60%',
//					type: 'text',
//					position: 'middle',
//					text: '请先登录再体验此功能'
//				})
//				this.$router.replace({
//					path: '/user/reg'
//				})
//			}

			this.qrcodeIndex = this.$route.query.index ? this.$route.query.index : 0
			document.title = this.$route.query.text ? this.$route.query.text : '会员码'
			this.title = this.$route.query.text ? this.$route.query.text : '会员码'

			this.qrcodeVal = 'http://www.cgc999.com/new/index.html#/user/reg?parentId=' + this.$store.state.user.userId
			this.width = Number(document.body.clientWidth * 0.6866666666666666)

			this.getUserInfo()
		},
		methods: {
			open() {
				var _this = this
				_this.noOpen = false
			},
			scan() {
				//微信扫一扫
				var _this = this

				var uri = window.location.href.split('#')[0] //截取#前面的路径

				_this.$http.post(_this.url.zf.wxScan, {
					appid: 'wx7a4933a7a3c33ec8',
					url: uri
				}).then((res) => {
					wx.config({
						debug: false,
						appId: 'wx7a4933a7a3c33ec8',
						timestamp: res.data.data.timestamp,
						nonceStr: res.data.data.nonceStr,
						signature: res.data.data.signature,
						jsApiList: ['checkJsApi', 'scanQRCode']
					})

					wx.ready(function() {
						//点击按钮扫描二维码
						wx.scanQRCode({
							needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
							scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
							success: function(res) {
								alert(res)
							},
							fail: function(res) {
								_this.$vux.toast.show({
									width: '50%',
									type: 'text',
									position: 'middle',
									text: '使用失败'
								})
							}
						})
					})
				})
			},
			qrcodeClick(index, text) {
				var _this = this
				_this.qrcodeIndex = index

				_this.$router.replace({
					query: _this.merge(_this.$route.query, {
						'index': index,
						'text': text
					})
				})

				_this.$nextTick(function() {
					document.title = text
					_this.title = text
				})
			},
			getUserInfo() {
				var _this = this
				//获取用户信息
				_this.$http.get(_this.url.user.getBasicInfo, {
					params: {
						userId: _this.$store.state.user.userId
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.userInfo = res.data.data
						_this.barcodes = res.data.data.mobile
						_this.barcode_option.text = res.data.data.mobile
					}
				})
			},
		},
		components: {
			settingHeader,
			Qrcode,
			'barcode': VueBarcode
		},
		watch: {
			qrcodeIndex() {
				if(this.qrcodeIndex == 0) {
					document.title = '会员码'
					this.title = '会员码'
				} else {
					document.title = '推荐码'
					this.title = '推荐码'
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.qrcode-box {
		height: 100%;
		overflow: hidden;
		.hym {
			height: 100%;
			position: relative;
			background: linear-gradient(#5EC3FF, #106FE3);
			.middle-box {
				position: absolute;
				top: 20%;
				left: 50%;
				transform: translate(-50%, -20%);
				.bw-box {
					width: 6.93rem;
					height: 7.92rem;
					background: rgba(255, 255, 255, 1);
					border-radius: 5px;
					padding: 0.46rem 0.58rem;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					justify-content: center;
					.box {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						img {
							width: 1.8rem;
							height: 1.8rem;
							margin-bottom: 0.68rem;
							margin-top: 0.5rem;
						}
						.tip {
							font-size: 0.34rem;
							font-family: PingFang-SC-Medium;
							color: rgba(26, 38, 66, 1);
							margin-bottom: 1.13rem;
						}
						.xy {
							font-size: 0.32rem;
							font-family: PingFang-SC-Medium;
							color: rgba(26, 38, 66, 1);
							text-align: center;
							margin-bottom: 0.45rem;
							span {
								color: #336FFF;
							}
						}
						.btn {
							width: 5.76rem;
							height: 0.82rem;
							line-height: 0.82rem;
							background: rgba(203, 24, 28, 1);
							border-radius: 3px;
							font-size: 0.32rem;
							font-family: PingFang-SC-Medium;
							color: rgba(255, 255, 255, 1);
							text-align: center;
						}
					}
				}
				.bw-box2 {
					background: rgba(255, 255, 255, 1);
					border-radius: 5px;
					position: relative;
					overflow: hidden;
					.da {
						width: 6.93rem;
						height: 7.92rem;
						padding: 0.12rem;
						display: flex;
						align-items: center;
						justify-content: space-between;
						flex-direction: column;
						box-sizing: border-box;
					}
					.tip-box {
						position: absolute;
						bottom: 0;
						left: 0;
						width: 100%;
						height: 0.66rem;
						background-color: rgb(250, 221, 219);
						display: flex;
						align-items: center;
						font-size: 0.28rem;
						font-family: PingFang-SC-Medium;
						color: rgba(227, 41, 33, 1);
						img {
							width: 0.32rem;
							height: auto;
							margin: 0 0.30rem 0 0.38rem;
						}
					}
					.top {
						width: 100%;
						height: 2.25rem;
						position: relative;
						display: flex;
						align-items: center;
						padding: 0 0.56rem;
						box-sizing: border-box;
						img {
							width: 1.37rem;
							height: 1.37rem;
							margin-right: 0.31rem;
						}
						p {
							font-size: 0.38rem;
							font-family: PingFang-SC-Heavy;
							color: rgba(26, 38, 66, 1);
						}
					}
					.top:after {
						content: " ";
						position: absolute;
						left: 0;
						bottom: 0;
						right: 0;
						height: 1px;
						border-bottom: 1px solid #D9D9D9;
						color: #D9D9D9;
						-webkit-transform-origin: 0 100%;
						transform-origin: 0 100%;
						-webkit-transform: scaleY(0.5);
						transform: scaleY(0.5);
					}
					.bottom {
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: center;
						flex-direction: column;
						width: 100%;
						.tip {
							font-size: 0.24rem;
							font-family: PingFang-SC-Medium;
							color: rgba(144, 162, 199, 1);
						}
						svg {
							width: 100%;
							height: 2rem;
						}
						text {
							font-size: 0.32rem;
							font-family: PingFang-SC-Medium;
							color: rgba(26, 38, 66, 1);
						}
					}
				}
				.bottom-tip {
					display: flex;
					font-size: 0.24rem;
					font-family: PingFang-SC-Medium;
					color: rgba(255, 255, 255, 1);
					margin-top: 0.35rem;
					justify-content: center;
					p {
						opacity: 0.5;
					}
					img {
						width: 0.68rem;
						height: 0.32rem;
						margin: 0 0.15rem;
					}
				}
			}
		}
		.tgm {
			height: 100%;
			background: url(../../../../static/qrcode/tgm-bg.png) no-repeat;
			background-size: 100% 100%;
			position: relative;
			padding-bottom: 1rem;
			.bw-box3 {
				position: absolute;
				top: 48%;
				left: 50%;
				transform: translate(-50%, -50%);
				.all {
					display: flex;
					align-items: center;
					justify-content: space-between;
					flex-direction: column;
					padding: 0.39rem 0.46rem;
					width: 6.08rem;
					background: rgba(255, 255, 255, 1);
					border-radius: 5px;
					box-sizing: border-box;
					.bottom {
						width: 100%;
						display: flex;
						align-items: center;
						position: relative;
						margin-top: 0.17rem;
						.tx {
							width: 0.95rem;
							height: 0.95rem;
							border-radius: 50%;
							margin-right: 0.43rem;
						}
						.name {
							font-size: 0.28rem;
							font-family: PingFang-SC-Medium;
							color: rgba(26, 38, 66, 1);
						}
					}
				}
				.tip {
					font-size: 0.24rem;
					font-family: PingFang-SC-Regular;
					color: rgba(255, 255, 255, 1);
					margin-top: 0.26rem;
					text-align: center;
				}
			}
		}
		.qrcode-f {
			position: fixed;
			bottom: 0%;
			width: 100%;
			display: flex;
			padding: 0.21rem 0;
			box-sizing: border-box;
			z-index: 15;
			div {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				font-size: 0.24rem;
				font-family: PingFangSC-Regular;
				color: rgba(144, 162, 199, 1);
				img {
					width: 0.6rem;
					height: auto;
					margin-bottom: 0.12rem;
				}
				p {
					font-size: 0.24rem;
					font-family: PingFang-SC-Medium;
					color: rgba(255, 255, 255, 1);
					opacity: 0.5;
				}
				.white {
					color: white;
					color: rgba(255, 255, 255, 1);
					opacity: 1;
				}
			}
		}
		/*.blue{
			background-color: #106FE3;
		}
		.red{
			background-color: rgb(254,73,65);
		}*/
	}
</style>
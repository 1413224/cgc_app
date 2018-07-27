<template>
	<div class="qrcode-box">
		<div style="position: relative;height: 100%;">
			<settingHeader :title="title"></settingHeader>
			<!--付款码-->
			<div class="tgm" :class="$store.state.page.isWx?'top0':''" v-if="grade>=1 && qrcodeIndex == 0">
				<div class="top">
					<div>
						<img :src="images?images:'./static/images/mrtx.png'" alt="" />
						<p class="m">{{userInfo.mobile}}</p>
						<div class="g">{{userInfo.levelName?userInfo.levelName:'暂无等级'}}</div>
					</div>
				</div>
				<div class="printOrder" v-for="(v,index) in list" :key="index">
					<div v-if="$store.state.page.isLogin == 'true'">
						<p class="tip">向营业员出示会员码完成会员积分或付款</p>
						<barcode :value="v.barcodes" :options="barcode_option" tag="svg"></barcode>
					</div>
					<p v-else>请先登录再体验此功能</p>
				</div>
			</div>

			<!--推广码-->
			<div style="padding-bottom: 1.2rem;height: 100%;" v-if="grade>=1 && qrcodeIndex == 1">
				<div class="bg" :class="!$store.state.page.isWx?'top46':''">
					<div>
						<div class="b-w1">
							<qrcode v-if="$store.state.page.isLogin == 'true'" :value="qrcodeVal" :size="width" type="img" class="qrcode"></qrcode>
							<div style="text-align: center;margin: 0 auto;" v-else :style="{ width: width + 'px',height: width + 'px',lineHeight: width + 'px'}">请先登录再体验此功能</div>
							<div class="bottom">
								<img :src="images?images:'./static/images/mrtx.png'" alt="" />
								<div>
									<p>{{userInfo.nickname}}</p>
									<!--<p>{{userInfo.mobile}}</p>-->
								</div>
							</div>
						</div>
						<p class="tip2" @click="$router.push({path:'/member/benefits/index'})">赚积分攻略 <i class="icon iconfont icon-arrow-right"></i></p>
					</div>
				</div>
			</div>
			<!--未获得赚钱码-->
			<div class="bg-w" v-if="grade == 0">
				<div class="img-box">
					<img src="../../../assets/images/member/IMG_3708@2x.png" />
				</div>
				<div class="middle">
					<p>暂未满足条件</p>
					<p>专享3大权益 每月预计可赚2000+</p>
					<div @click="$router.push({path:'/member/purse/hasqrcode'})">
						查看条件 <i class="icon iconfont icon-arrow-right"></i>
					</div>
				</div>
				<div class="bottom">
					<div class="title">
						权益一 · 每月优惠券
					</div>
					<div class="bg-y">
						<div class="one">
							<span>120</span><span>元</span>
						</div>
						<div class="two">
							<p>威健康体验卷</p>
							<p>全国通用</p>
						</div>
						<div class="three">
							<i></i>
							<div>领取礼卷</div>
						</div>
					</div>
				</div>
			</div>

			<div class="qrcode-f">
				<div @click="qrcodeClick(0,'付款码')">
					<img :src="qrcodeIndex == 0?'./static/images/fkm-in.png':'./static/images/fkm.png'" alt="" />
					<p :class="qrcodeIndex == 0?'blue':''">付款码</p>
				</div>
				<div @click="qrcodeClick(1,'推广码')">
					<img :src="qrcodeIndex == 1?'./static/images/tgm-in.png':'./static/images/tgm2.png'" alt="" />
					<p :class="qrcodeIndex == 1?'blue':''">推广码</p>
				</div>
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
				title: '付款码',
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
					height: '55',
					fontSize: '28px', //字体大小,
					text: ''
				},
				list: [{
					barcodes: ''
				}]
			}
		},
		created() {

			if(this.$store.state.page.isLogin == 'false') {
				this.$vux.toast.show({
					width: '60%',
					type: 'text',
					position: 'middle',
					text: '请先登录再体验此功能'
				})
				this.$router.replace({
					path: '/user/reg'
				})
			}

			this.getUserInfo()
			this.qrcodeVal = 'http://www.cgc999.com/new/index.html#/user/reg?parentId=' + this.$store.state.user.userId
			this.width = Number(document.body.clientWidth * 0.66)

			this.qrcodeIndex = this.$route.query.index ? this.$route.query.index : 0
			document.title = this.$route.query.text ? this.$route.query.text : '付款码'
			this.title = this.$route.query.text ? this.$route.query.text : '付款码'
		},
		methods: {
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
						_this.list[0].barcodes = res.data.data.mobile
						_this.barcode_option.text = res.data.data.mobile
						if(_this.userInfo.avatar.original) {
							_this.images = _this.userInfo.avatar.original
						}
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
					document.title = '付款码'
					this.title = '付款码'
				} else {
					document.title = '推荐码'
					this.title = '推荐码'
				}
			}
		}
	}
</script>

<style lang="less">
	.qrcode-box {
		height: 100%;
		font-family: PingFangSC-Medium;
		.top0 {
			top: 0!important;
		}
		.tgm {
			position: relative;
			position: absolute;
			width: 100%;
			bottom: 1.2rem;
			top: 46px;
			.top {
				height: 2.6rem;
				background: url(../../../../static/member/record-bg.png) no-repeat;
				background-size: 100% 100%;
				text-align: center;
				display: flex;
				align-items: center;
				justify-content: center;
				img {
					width: 0.88rem;
					height: 0.88rem;
				}
				.m {
					font-size: 0.36rem;
					font-family: PingFangSC-Medium;
					color: rgba(255, 255, 255, 1);
				}
				.g {
					font-size: 0.22rem;
					font-family: PingFangSC-Regular;
					color: rgba(255, 255, 255, 1);
				}
			}
			.printOrder {
				text-align: center;
				padding: 0 0.5rem;
				box-sizing: border-box;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 100%;
				.tip {
					font-size: 0.26rem;
					font-family: PingFangSC-Regular;
					color: rgba(144, 162, 199, 1);
					margin-bottom: 0.2rem;
				}
				svg {
					width: 100%;
					height: 1.6rem;
				}
			}
		}
		.qrcode-f {
			position: fixed;
			bottom: 0%;
			width: 100%;
			height: 1.20rem;
			background: rgba(228, 235, 251, 1);
			display: flex;
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
					width: 0.4rem;
					height: 0.4rem;
					margin-bottom: 0.12rem;
				}
				.blue {
					color: rgba(51, 111, 255, 1);
				}
			}
		}
		.qrcode {
			text-align: center;
		}
		/*2*/
		.bg-w {
			height: 100%;
			background: white;
			position: relative;
			.img-box {
				height: 3.75rem;
				position: relative;
				img {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: -webkit-fill-available;
					height: auto;
				}
			}
			.middle {
				font-family: PingFangSC-Medium;
				color: rgba(26, 38, 66, 1);
				text-align: center;
				padding: 0.23rem;
				p:nth-child(1) {
					font-size: 0.36rem;
					margin-bottom: 0.11rem;
				}
				p:nth-child(2) {
					font-size: 0.28rem;
				}
				div {
					width: 6rem;
					height: 0.9rem;
					line-height: 0.9rem;
					text-align: center;
					margin: 0.67rem auto;
					background: linear-gradient(90deg, rgba(94, 195, 255, 1), rgba(16, 111, 227, 1));
					border-radius: 45px;
					color: white;
				}
			}
			.bottom {
				font-family: PingFangSC-Regular;
				padding: 0 0.46rem;
				.title {
					font-size: 0.32rem;
					color: rgba(26, 38, 66, 1);
				}
				.bg-y {
					width: 100%;
					height: 1rem;
					margin-top: 0.31rem;
					background: rgba(216, 223, 240, 1);
					border-radius: 6px;
					padding: 0 0.24rem;
					display: flex;
					align-items: center;
					font-family: PingFangSC-Regular;
					color: rgba(26, 38, 66, 1);
					box-sizing: border-box;
					.one {
						padding-right: 0.24rem;
						border-right: 1px dashed #1A2642;
						span:nth-child(1) {
							font-size: 0.48rem;
						}
						span:nth-child(2) {
							font-size: 0.20rem;
						}
					}
					.two {
						padding: 0 0.24rem;
						color: rgba(26, 38, 66, 1);
						p:nth-child(1) {
							font-size: 0.28rem;
							font-family: PingFangSC-Medium;
						}
						p:nth-child(2) {
							font-size: 0.24rem;
							font-family: PingFangSC-Regular;
						}
					}
					.three {
						flex: 1;
						div {
							width: 1.34rem;
							height: 0.46rem;
							line-height: 0.46rem;
							text-align: center;
							color: white;
							background: rgba(26, 38, 66, 1);
							border-radius: 23px;
							float: right;
							padding: 0.05rem 0.19rem;
						}
					}
				}
			}
		}
		.bg-w:before {
			content: " ";
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			height: 1px;
			border-top: 1px solid #D9D9D9;
			color: #D9D9D9;
			-webkit-transform-origin: 0 0;
			transform-origin: 0 0;
			-webkit-transform: scaleY(0.5);
			transform: scaleY(0.5);
			left: 0px;
		}
		/*1*/
		.b-y {
			padding: 0 0.44rem 2.56rem 0.44rem;
			background: #ff7e09;
			.tip-box {
				.title {
					height: 0.75rem;
					font-size: 0.30rem;
					font-family: PingFangSC-Medium;
					color: rgba(255, 255, 255, 1);
					position: relative;
				}
				.text-box,
				.text-box1 {
					padding: 0.18rem 0.18rem 0.34rem 0.18rem;
					font-size: 0.28rem;
					font-family: PingFangSC-Regular;
					color: rgba(255, 255, 255, 1);
					position: relative;
					.item {
						display: flex;
						div:nth-child(1) {
							width: 1.2rem;
						}
						div:nth-child(2) {
							flex: 1;
						}
					}
					.item:nth-child(2) {
						margin: 0.25rem 0;
					}
				}
				.title:after,
				.text-box:after {
					content: " ";
					position: absolute;
					left: 0;
					bottom: 0;
					right: 0;
					height: 1px;
					border-top: 1px solid white;
					color: #D9D9D9;
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: scaleY(0.5);
					transform: scaleY(0.5);
					left: 0px;
				}
			}
		}
		.top46 {
			top: 46px!important;
		}
		.bg {
			position: absolute;
			top: 0;
			bottom: 1.2rem;
			width: 100%;
			height: 110%;
			padding: 60px 0.44rem 0rem 0.44rem;
			box-sizing: border-box;
			background: url(../../../../static/images/qrcode-bg.png) no-repeat;
			background-size: 100% 100%;
			.title {
				font-size: 0.36rem;
				color: rgba(26, 38, 66, 1);
				margin: 0.6rem 0 0.2rem 0.1rem;
			}
			.tip2 {
				text-align: center;
				font-size: 0.30rem;
				font-family: PingFangSC-Medium;
				color: rgba(255, 255, 255, 1);
				margin-top: 0.3rem;
				height: 2rem;
			}
			.b-w1 {
				width: 5.78rem;
				border-radius: 5px;
				background-color: white;
				margin: 0 auto;
				padding: 0.5rem 0.29rem;
				margin-top: 1rem;
				.code {
					width: 100%;
					height: auto;
				}
				.bottom {
					display: flex;
					align-items: center;
					margin-top: 0.5rem;
					position: relative;
					padding-top: 0.32rem;
					img {
						width: 1rem;
						height: 1rem;
						margin-right: 0.22rem;
						border-radius: 50%;
					}
					div {
						font-family: PingFangSC-Regular;
						p:nth-child(1) {
							font-size: 0.32rem;
							color: rgba(26, 38, 66, 1);
						}
						p:nth-child(2) {
							font-size: 0.28rem;
							color: rgba(115, 134, 173, 1);
						}
					}
				}
				.bottom:before {
					content: " ";
					position: absolute;
					left: 0;
					top: 0;
					right: 0;
					height: 1px;
					border-top: 1px solid #D9D9D9;
					color: #D9D9D9;
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: scaleY(0.5);
					transform: scaleY(0.5);
					left: 0px;
				}
			}
		}
	}
</style>
<template>
	<div class="share-box">
		<setting-header :title="title"></setting-header>
		<div class="top">
			<img class="logo" :src="'./static/share/cgc.png'" alt="" />
			<p class="big-title">大健康共享设备</p>
			<div class="tip-list">
				<div>
					<img :src="'./static/share/jgsh.png'" />
					<p>价格实惠</p>
				</div>
				<div>
					<img :src="'./static/share/zljs.png'" />
					<p>专利技术</p>
				</div>
				<div>
					<img :src="'./static/share/aqfx.png'" />
					<p>安全放心</p>
				</div>
				<div>
					<img :src="'./static/share/xgxz.png'" />
					<p>疗效显著</p>
				</div>
			</div>
			<!-- <div class="swiper-inner">
				<swiper :options="swiperOption" ref="mySwiper">
					<swiper-slide v-for="(item,index) in swiperList" :key="index">
						<img :src="item" alt="" />
					</swiper-slide>
				</swiper>
				<div class="swiper-pagination"></div>
			</div> -->
			
			<div class="wrapswiper">
				<swiper :options="swiperOption">
					<swiper-slide v-for="(item,index) in swiperList" key="index">
						<img :src="item" alt="">
					</swiper-slide>
					<div class="swiper-pagination" slot="pagination"></div>
				</swiper>
			</div>


		</div>

		<!-- <div class="face">
			<button @click="faceid">人脸测试</button>
		</div> -->


		<div class="middle">
			<div class="all">
				<div class="left" @click="$router.push('/share/pintroduce')">
					<p>设备介绍</p>
					<img :src="'./static/share/weifaguang.png'" />
				</div>
				<div class="right">
					<div class="one" @click="$router.push('/share/guidance')">
						<p>治理指导</p>
						<img :src="'./static/share/waiguoren.png'" />
					</div>
					<div class="two" @click="$router.push('/share/join')">
						<p>我要加盟</p>
						<img :src="'./static/share/yijiao.png'" />
					</div>
				</div>
			</div>
			<div class="btn" @click="scan">
				<img :src="'./static/share/xiangji.png'" />
				<p>开启设备</p>
			</div>
		</div>
		<div class="bottom-box" v-if="1>2">
			<div class="title">
				<p>附件商家</p>
				<p @click="$router.push({path:'/share/storelist'})">更多<i class="iconfont icon-arrow-right"></i></p>
			</div>
			<div class="pr-box">
				<div class="list">
					<div class="item">
						<img :src="'./static/share/shop1.png'" alt="" />
						<div>
							<p class="name">蛙来哒（番禺天安科技园店）</p>
							<p class="type">快速简餐 l 特色美食</p>
							<p class="address"><span>番禺大道北55号天安节能科技园</span><span>5km</span></p>
							<p class="sf"><span class="lm">联盟企业</span><span class="ly">联营企业</span></p>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import { Scroller, XButton } from 'vux'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import settingHeader from '../../components/setting_header'
	import Qs from 'qs'

	export default {
		data() {
			return {
				title: '共享设备',
				/*swiperOption: {
					// 所有的参数同 swiper 官方 api 参数
					autoplay: {
						delay: 5000,
					},
					effect: 'coverflow', //3D翻转效果
					centeredSlides: true, //active slide会居中，而不是默认状态下的居左。
					slidesPerView: 'auto',
					loop: true,
					// loopedSlides: 6,
					coverflowEffect: {
						rotate: 50,
						stretch: 0,
						depth: 100,
						modifier: 1,
						slideShadows: false //开启阴影效果
					},
					on: {
						slideChange: function() {
							//console.log(this.realIndex) //设置循环需要使用realIndex获取真实下标
						}
					},
					pagination: {
						el: '.swiper-pagination',
					}
				},*/
				swiperOption:{
					loop:true,
					effect: 'coverflow',
					grabCursor: true,
					centeredSlides: true,
					slidesPerView: 'auto',
					coverflowEffect:{
						rotate:50,
						stretch:0,
						depth:100,
						modifier:1,
						slideShadows:true
					},
					pagination:{
						el:'.swiper-pagination'
					}
				},
				swiperList: ['./static/share/lb1.png', './static/share/lb1.png', './static/share/lb1.png'],
			}
		},
		components: {
			settingHeader,
			Scroller,
			XButton,
			swiper,
			swiperSlide
		},
		created() {},
		methods: {
			scan() {
				//微信扫一扫
				var _this = this

				var uri = window.location.href.split('#')[0] //截取#前面的路径

				_this.$http.post(_this.url.zf.wxScan, {
					mchId: '1388332102',
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
								var url = res.resultStr.split('#')[1]
								_this.$router.push({
									path: url
								})
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
			faceid(){
				var params={
					api_key:'7HgROj7yzjaYsf4kyCyDOL24is5vljyo',
					api_secret:'GZEyEYObEn9bjIa7GhYOIy_Y0N60jABs',
				}
				let cont = Qs.stringify(params)

				this.$http.post('https://api.megvii.com/faceid/lite/get_token',cont).then((res) => {
					console.log(res)
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.share-box {
		padding-bottom: 1.50rem;
		background-color: #F5F6FA;
		.top {
			width: 100%;
			height: 8.49rem;
			background: url(../../../static/share/top-bg.png) no-repeat;
			background-size: cover;
			display: flex;
			align-items: center;
			flex-direction: column;
			.logo {
				width: 2.93rem;
				height: auto;
				margin-top: 0.39rem;
			}
			.big-title {
				font-size: 0.84rem;
				font-family: PingFangSC-Medium;
				color: rgba(255, 255, 255, 1);
				margin-top: 0.08rem;
			}
			.tip-list {
				width: 100%;
				display: flex;
				padding: 0 1.15rem;
				box-sizing: border-box;
				margin-top: 0.30rem;
				div {
					width: 25%;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					img {
						width: 0.40rem;
						height: auto;
						margin-bottom: 0.09rem;
					}
					p {
						font-size: 0.24rem;
						font-family: PingFangSC-Regular;
						color: rgba(255, 255, 255, 1);
					}
				}
			}
		}
		.middle {
			width: 100%;
			height: 5rem;
			padding: 0.25rem 0.30rem 0 0.30rem;
			box-sizing: border-box;
			.all {
				display: flex;
				.left {
					width: 3.08rem;
					height: 2.90rem;
					background-color: white;
					position: relative;
					margin-right: 0.11rem;
					p {
						padding: 0.48rem 0 0 0.19rem;
						font-size: 0.32rem;
						font-family: PingFangSC-Semibold;
						color: rgba(26, 38, 66, 1);
					}
					img {
						width: 2.04rem;
						height: 1.82rem;
						position: absolute;
						right: 0.16rem;
						bottom: 0;
					}
				}
				.right {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.one,
					.two {
						width: 3.70rem;
						height: 1.40rem;
						background-color: white;
						display: flex;
						align-items: center;
						position: relative;
						p {
							font-size: 0.32rem;
							font-family: PingFangSC-Semibold;
							color: rgba(26, 38, 66, 1);
							margin-left: .21rem;
						}
						img {
							position: absolute;
							right: 0.16rem;
							bottom: 0;
						}
					}
					.one>img {
						width: 1.15rem;
						height: 1.20rem;
					}
					.two>img {
						width: 1.99rem;
						height: 0.91rem;
					}
				}
			}
			.btn {
				width: 5.65rem;
				height: 0.94rem;
				background: linear-gradient(-90deg, rgba(72, 186, 254, 1), rgba(22, 117, 255, 1));
				box-shadow: 0px 2px 20px 0px rgba(41, 120, 235, 0.4);
				border-radius: 47px;
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 0.40rem auto;
				p {
					font-size: 0.28rem;
					font-family: PingFangSC-Regular;
					color: rgba(255, 255, 255, 1);
				}
				img {
					width: 0.28rem;
					height: auto;
					margin-right: 0.32rem;
				}
			}
		}
		.bottom-box {
			.title {
				height: 1.04rem;
				background: rgba(255, 255, 255, 1);
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 0.26rem;
				box-sizing: border-box;
				p:nth-child(1) {
					font-size: 0.36rem;
					font-family: PingFangSC-Medium;
					color: rgba(26, 38, 66, 1);
				}
				p:nth-child(2) {
					font-size: 0.28rem;
					font-family: PingFangSC-Regular;
					color: rgba(115, 134, 173, 1);
					display: flex;
					align-items: center;
					i {
						font-size: 0.40rem;
					}
				}
			}
		}
		.pr-box {
			box-sizing: border-box;
			h2 {
				padding-left: 3%;
				font-size: .36rem;
				color: #141C33;
				font-weight: 600;
				margin-top: .4rem;
				span {
					font-weight: normal;
					color: #60719D;
					font-size: .28rem;
					display: block;
					vertical-align: bottom;
					padding-right: .2rem;
				}
			}
			.list {
				padding: 0.30rem 0.19rem;
				box-sizing: border-box;
				border-top: 1px solid rgba(216, 223, 240, 1);
				background-color: white;
				.item {
					display: flex;
					img {
						width: 2.06rem;
						height: 1.62rem;
						margin-right: 0.18rem;
					}
					div {
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						.name {
							font-size: 0.32rem;
							font-family: PingFangSC-Medium;
							color: rgba(26, 38, 66, 1);
						}
						.type {
							font-size: 0.24rem;
							font-family: PingFangSC-Regular;
							color: rgba(115, 134, 173, 1);
						}
						.address {
							display: flex;
							justify-content: space-between;
							span:nth-child(1) {
								width: 3.41rem;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								-webkit-line-clamp: 1;
								-webkit-box-orient: vertical;
							}
							span {
								font-size: 0.24rem;
								font-family: PingFangSC-Regular;
								color: rgba(115, 134, 173, 1);
							}
						}
						.sf {
							span {
								display: inline-block;
								width: 1.02rem;
								height: 0.34rem;
								line-height: 0.34rem;
								text-align: center;
								border-radius: 3px;
								font-size: 0.22rem;
								font-family: PingFangSC-Regular;
								margin-right: 0.20rem;
							}
							.lm {
								color: #336FFF;
								background: rgba(51, 111, 255, 0.1);
								border: 1px solid rgba(51, 111, 255, 1);
							}
							.ly {
								color: #FF5365;
								background: rgba(255, 83, 101, 0.1);
								border: 1px solid rgba(255, 83, 101, 1);
							}
						}
					}
				}
			}
		}
	}
</style>
<style lang="less">
	.share-box {
		/* .swiper-inner {
			width: 100%;
			height: 3.5rem;
			margin-top: 0.62rem;
			.swiper-slide {
				width: 6.30rem;
				width: 90%;
				height: 4.24rem;
				img {
					width: 100%;
					height: 100%;
					display: block;
				}
			}
			.swiper-pagination {
				width: 100%;
				margin-top: 0.15rem;
				.swiper-pagination-bullet {
					width: 8px;
					height: 8px;
					margin-right: 0.20rem;
					background: rgba(255, 255, 255, 0.50);
					border-radius: 50%;
				}
				.swiper-pagination-bullet-active {
					background: rgba(255, 255, 255, 1);
					border-radius: 50%;
				}
			}
		} */
	}
	.wrapswiper{
		margin-top: .5rem;
		width: 100%;
		overflow: hidden;
		.swiper-slide{
			text-align: center;
			height: 100px;
			border: 1px solid #fff;
			width: 5.8rem;
			height: 4.24rem;
			img{
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
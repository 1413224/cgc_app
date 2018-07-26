<template>
	<section class='multi_user_mall_box'>
		<settingHeader :title="title"></settingHeader>
		<div class="swiper-inner">
			<swiper :options="swiperOption">
				<swiper-slide v-for="(item, index) in demoList" :key="index">
					<router-link :to="item.url">
						<img :src="item.img">
					</router-link>
				</swiper-slide>
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>
		</div>
		<div class="summary-box">
			<div class="one">
				<div class="left">
					<img :src="'./static/share/shop1.png'" alt="" />
				</div>
				<div class="right">
					<div>
						<p class="title">蛙来哒娃娃要来啦（番禺天安科技园店）蛙来哒娃娃要来</p>
						<p class="sf"><span class="lm">联盟企业</span><span class="ly">联营企业</span></p>
					</div>
					<p class="num">NO：2523515</p>
				</div>
			</div>
			<div class="two">
				<div class="bottom" style="border-top: none;">
					<p>店铺编号</p>
					<p>252423ffd3235325afasdfz42fa2324</p>
				</div>
				<div class="top">
					<div class="left">
						<img :src="'./static/images/dibiao.png'" alt="" />
						<p>番禺区大夫山南门对面马路直走200米右转(距您100.6km)</p>
					</div>
					<div class="right">
						<img :src="'./static/images/dianhua.png'" alt="" />
					</div>
				</div>
				<!--<div class="middle">
					<div class="title">
						<p>店铺二维码(<span>扫码进入店铺</span>)</p>
						<p><i class="iconfont icon-arrow-right"></i></p>
					</div>
					<div class="qrcode-box">
						<qrcode :value="storeUrl" :size="qrcodeWidth" type="img"></qrcode>
					</div>
				</div>-->
				<div class="bottom">
					<p>开店时间</p>
					<p>2018-04-14 </p>
				</div>
				<div class="bottom" @click="$router.push({path:'/multi_user_mall/store_qrcode'})">
					<p>店铺二维码</p>
					<p class="code"><img src="../../assets/images/multi_user_mall/qrcode.png" alt=""><i class="iconfont icon-arrow-right"></i></p>
				</div>
			</div>
		</div>
		<div class="wfg-box">
			<img :src="'./static/images/wfgImg.png'" alt="" />
			<p>2台</p>
		</div>
		<div class="back-index" @click="$router.push({path:'/share/storelist'})">
			<p>返回</p>
			<p>首页</p>
		</div>
		<div class="foot-box">
			<ul>
				<!--<li v-for="(item,index) in navList" :key="index" @click="navActive(index)">
						<img :src="navIndex == index?item.activeLogo:item.logo" alt="" />
						<p :class="{'blue':navIndex == index}">{{item.navTitle}}</p>
					</li>-->
				<li @click="navActive(0)">
					<img :src="navIndex == 0?'./static/images/shop-bottom1-in.png':'./static/images/shop-bottom1.png'" alt="" />
					<p :class="{'blue':navIndex == 0}">首页</p>
				</li>
				<li @click="navActive(1)">
					<img :src="navIndex == 1?'./static/images/shop-bottom2-in.png':'./static/images/shop-bottom2.png'" alt="" />
					<p :class="{'blue':navIndex == 1}">商品</p>
				</li>
				<li @click="navActive(2)">
					<img :src="navIndex == 2?'./static/images/shop-bottom3-in.png':'./static/images/shop-bottom3.png'" alt="" />
					<p :class="{'blue':navIndex == 2}">服务</p>
				</li>
				<li @click="navActive(3)">
					<img :src="navIndex == 3?'./static/images/shop-bottom4-in.png':'./static/images/shop-bottom4.png'" alt="" />
					<p :class="{'blue':navIndex == 3}">简介</p>
				</li>
			</ul>
		</div>
	</section>
</template>

<script>
	import settingHeader from '@/components/setting_header'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import { Qrcode } from 'vux'
	export default {
		data() {
			return {
				title: "店铺详情",
				swiperOption: {
					loop: true,
					autoplay: {
						delay: 5000,
					},
					pagination: {
						el: '.swiper-pagination',
						type: 'fraction'
					},
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev'
					}
				},
				qrcodeWidth: 0,
				navIndex: 0,
				navList: [{
						navTitle: '首页',
						logo: './static/images/shop-bottom1.png',
						activeLogo: './static/images/shop-bottom1-in.png'
					},
					{
						navTitle: '商品',
						logo: './static/images/shop-bottom2.png',
						activeLogo: './static/images/shop-bottom2-in.png'
					},
					{
						navTitle: '服务',
						logo: './static/images/shop-bottom3.png',
						activeLogo: './static/images/shop-bottom3-in.png'
					},
					{
						navTitle: '简介',
						logo: './static/images/shop-bottom4.png',
						activeLogo: './static/images/shop-bottom4-in.png'
					},
				],
				demoList: [{
						img: './static/index/index_banner1.png',
						url: '/member/vip/right'
					},
					{
						img: './static/index/index_banner2.png',
						url: '/member/vip/index'
					},
					{
						img: './static/index/index_banner3.png',
						url: '/draw'
					}
				],
			}
		},
		components: {
			settingHeader,
			swiper,
			swiperSlide,
			Qrcode
		},
		created() {
			this.title = this.mainApp.getCs('title')
			this.type = this.mainApp.getCs('type')
			this.storeUrl = 'http://www.cgc999.com/new/index.html#/multi_user_mall?id=' + this.mainApp.getCs('enterpriseId')

			this.qrcodeWidth = Number(document.body.clientWidth * 0.31)
		},
		methods: {
			navActive(index) {
				this.navIndex = index
				console.log(index)
			}
		}
	}
</script>
<style lang="less" scoped>
	.multi_user_mall_box {
		background-color: #F5F6FA;
		padding-bottom: 1.33rem;
		.swiper-inner {
			position: relative;
			z-index: 11;
			.swiper-slide {
				height: 4.20rem;
				img {
					width: 100%;
					height: 100%;
					display: block;
				}
			}
			.swiper-pagination-fraction {
				position: absolute;
				left: 5.80rem!important;
				bottom: 0.78rem;
				width: 1.5rem;
				height: 0.60rem;
				background: rgba(26, 38, 66, 0.8);
				border-radius: 15px;
				display: flex;
				align-items: center;
				justify-content: center;
				color: white;
			}
		}
		.summary-box {
			position: relative;
			z-index: 15;
			padding: 0 0.18rem;
			margin-top: -0.67rem;
			.one {
				width: 7.14rem;
				height: 2.30rem;
				background: rgba(255, 255, 255, 1);
				box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
				border-radius: 4px;
				padding: 0.15rem 0.38rem 0.15rem 0.15rem;
				box-sizing: border-box;
				display: flex;
				.left {
					width: 2.0rem;
					height: 2.0rem;
					margin-right: 0.15rem;
					background: rgba(255, 255, 255, 1);
					border-radius: 3px;
					border: 1px solid rgba(216, 223, 240, 1);
					display: flex;
					align-items: center;
					justify-content: center;
					img {
						width: 90%;
						height: auto;
					}
				}
				.right {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					div {
						.title {
							font-size: 0.32rem;
							font-family: PingFangSC-Medium;
							color: rgba(26, 38, 66, 1);
							margin-bottom: 0.18rem;
							word-wrap: break-word;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
							word-break: break-all;
							overflow: hidden;
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
					.num {
						text-align: right;
						font-size: 0.28rem;
						font-family: PingFangSC-Regular;
						color: rgba(144, 162, 199, 1);
					}
				}
			}
			.two {
				width: 7.14rem;
				/*height: 4.34rem;*/
				background: rgba(255, 255, 255, 1);
				border-radius: 2px;
				margin-top: 0.15rem;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.top {
					height: 1.27rem;
					border-top: 1px solid #D8DFF0;
					padding: 0.40rem 0rem 0.27rem 0.18rem;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					.left {
						flex: 1;
						display: flex;
						align-items: center;
						img {
							width: 0.34rem;
							height: 0.34rem;
							margin-right: 0.1rem;
						}
						p {
							font-size: 0.28rem;
							font-family: PingFangSC-Regular;
							color: rgba(26, 38, 66, 1);
							word-wrap: break-word;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
							word-break: break-all;
							overflow: hidden;
						}
					}
					.right {
						width: 1.09rem;
						display: flex;
						align-items: center;
						justify-content: center;
						border-left: 1px solid rgba(216, 223, 240, 1);
						box-sizing: border-box;
						img {
							width: 0.40rem;
							height: auto;
						}
					}
				}
				.middle {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.title {
						height: 0.8rem;
						display: flex;
						align-items: center;
						padding: 0 0.18rem 0 0.28rem;
						box-sizing: border-box;
						p:nth-child(1) {
							font-size: 0.28rem;
							font-family: PingFangSC-Medium;
							color: rgba(26, 38, 66, 1);
							span {
								font-size: 0.28rem;
								font-family: PingFangSC-Regular;
								color: rgba(144, 162, 199, 1);
							}
						}
					}
					.qrcode-box {
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
				.bottom {
					height: 1rem;
					border-top: 1px solid rgba(216, 223, 240, 1);
					padding: 0 0.28rem;
					box-sizing: border-box;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					justify-content: space-between;
					p {
						font-size: 0.28rem;
						font-family: PingFangSC-Regular;
						color: rgba(26, 38, 66, 1);
					}
					.code {
						display: flex;
						align-items: center;
						img {
							width: 0.36rem;
							height: 0.36rem;
							margin-right: 0.40rem;
						}
						i {
							font-size: 0.50rem;
						}
					}
				}
			}
		}
		.wfg-box {
			position: fixed;
			bottom: 2.26rem;
			right: 0.20rem;
			z-index: 16;
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
		.back-index {
			position: fixed;
			bottom: 1.26rem;
			right: 0.20rem;
			z-index: 16;
			width: 0.86rem;
			height: 0.86rem;
			background: rgba(26, 38, 66, 0.35);
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			font-size: 0.24rem;
			font-family: PingFangSC-Regular;
			color: rgba(255, 255, 255, 1);
			border-radius: 50%;
			margin-bottom: 0.11rem;
			margin-right: 0.20rem;
		}
		.foot-box {
			position: fixed;
			bottom: 0;
			right: 0;
			width: 100%;
			height: 1.20rem;
			background: rgba(255, 255, 255, 1);
			ul {
				width: 100%;
				height: 100%;
				display: flex;
				li {
					flex: 1;
					display: flex;
					align-items: center;
					flex-direction: column;
					justify-content: center;
					img {
						width: 0.46rem;
						height: 0.46rem;
						margin-bottom: 0.06rem;
					}
					p {
						font-size: 0.24rem;
						font-family: PingFangSC-Regular;
						color: rgba(26, 38, 66, 1);
					}
					.blue {
						color: #336FFF;
					}
				}
			}
		}
	}
</style>
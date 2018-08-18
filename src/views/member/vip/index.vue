<template>
	<div class="vip-box" ref="vipBox">
		<!--<settingHeader :title="title"></settingHeader>-->
		<div class="banner-img">
			<img :src="'./static/vip/banner.png'" />
		</div>
		<sticky>
			<div class="tab-box">
				<tab v-model="tabIndex" lineWidth="2" active-color="#E4472C" custom-bar-width="1.1rem">
					<tab-item selected @on-item-click="onItemClick">六大好处</tab-item>
					<tab-item @on-item-click="onItemClick">加入会员</tab-item>
					<tab-item @on-item-click="onItemClick">权益介绍</tab-item>
				</tab>
			</div>
		</sticky>

		<div class="title-box" ref="one">
			<img :src="'./static/vip/title-img.png'" />
			<p>会员六大增值好处</p>
			<img :src="'./static/vip/title-img.png'" />
		</div>
		<div class="swiper-inner">
			<swiper :options="swiperOption" ref="mySwiper">
				<swiper-slide v-for="(item,index) in swiperList" :key="index">
					<img :src="item" alt="" />
				</swiper-slide>
			</swiper>
		</div>
		<div class="pad-box" ref="two">
			<div class="title-box">
				<img :src="'./static/vip/title-img.png'" />
				<p>如何成为会员?</p>
				<img :src="'./static/vip/title-img.png'" />
			</div>
			<div class="join-box3">
				<div class="dis-div">
					<div>
						<img :src="'./static/vip/join1.png'" />
					</div>
					<div>
						<img :src="'./static/vip/join2.png'" />
					</div>
				</div>
				<div class="join-p">
					<p class="one">关注平台微信公众号</p>
					<p class="one">在标记有e消费的线下商户买单报手机号码</p>
				</div>
			</div>
			<div class="join-box">
				<div class="dis-div">
					<div>
						<img :src="'./static/vip/android.png'" />
					</div>
					<div>
						<img :src="'./static/vip/ios.png'" />
					</div>
				</div>
				<div class="join-p">
					<p class="two">在安卓各大应用市场及App store下载注册官方app</p>
				</div>
			</div>
			<div class="btn-box">
				<div v-if="$store.state.page.isLogin == 'false'" class="left" @click="$router.push({path:'/user/reg'})">
					<img :src="'./static/vip/reg-img.png'" /> 立即注册
				</div>
				<div class="right">
					<img :src="'./static/vip/app-img.png'" /> APP下载
				</div>
			</div>
			<div class="title-box" ref="three">
				<img :src="'./static/vip/title-img.png'" />
				<p>会员好处</p>
				<img :src="'./static/vip/title-img.png'" />
			</div>
			<div class="join-box2">
				<div class="benefit">
					<p class="one-title">注册赠送200信用积分</p>
					<img class="one-img" :src="'./static/vip/200.png'" />
					<p class="zhu">注：信用积分可在商城部分商品抵现金用</p>
				</div>
			</div>
			<div class="join-box2">
				<div class="benefit">
					<p class="one-title">购物省钱+奖励</p>
					<img class="two-img" :src="'./static/vip/gouwu.png'" />
					<div class="zhu">
						<p>注：</p>
						<p>根据大数据精准推算，平均可为每个消费者一年节省8000元 具体价格和奖励积分以实际商品详情页为准</p>
					</div>
				</div>
			</div>
			<div class="join-box2">
				<div class="benefit">
					<p class="one-title">分享赚钱</p>
					<img class="three-img" :src="'./static/vip/fenx.png'" />
					<div class="zhu">
						<p>注：</p>
						<p>推荐会员在联盟企业和APP商城消费即可获得分红奖励；上不封顶。</p>
					</div>
				</div>
			</div>
			<div class="join-box2">
				<div class="benefit">
					<p class="one-title">笔笔消费抽大奖</p>
					<div class="bottom-img-box">
						<img class="three-img" :src="'./static/vip/5000.png'" />
						<img class="three-img" :src="'./static/vip/lw.png'" />
					</div>
					<div class="bottom-tip-box">
						<p>累计已有 <span>76w+</span>人中奖</p>
						<p>累计奖金达到 <span>7000w+</span>元</p>
					</div>
					<div class="zhu">
						<p>注：</p>
						<p>会员所有消费都可参与幸运大抽奖；每周周末开奖，请留意官方短信或微信公众号查询结果</p>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import settingHeader from '../../../components/setting_header'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import { Sticky } from 'vux'
	export default {
		data() {
			return {
				title: "会员权益",
				tabIndex: 0,
				swiperOption: {
					// 所有的参数同 swiper 官方 api 参数
					autoplay: {
						delay: 5000,
					},
					effect: 'coverflow', //3D翻转效果
					centeredSlides: true, //active slide会居中，而不是默认状态下的居左。
					slidesPerView: 'auto',
					loop: true,
					loopedSlides: 6,
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
					}
				},
				isfix: false,
				isActive: false,
				startY: 0,
				swiperList: [
				'./static/vip/swiper1.png',
				'./static/vip/swiper2.png',
				'./static/vip/swiper3.png',
				'./static/vip/swiper4.png',
				'./static/vip/swiper5.png', 
				'./static/vip/swiper6.png'
				]
			}
		},
		mounted() {
			var _this = this
			
			window.addEventListener('scroll', this.handleScroll)

		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.swiper
			}
		},
		components: {
			settingHeader,
			swiper,
			swiperSlide,
			Sticky
		},
		methods: {
			onItemClick(index) {
				var _this = this

				_this.isfix = true
				_this.isActive = true

				if(index == 0) {
					_this.$refs.one.scrollIntoView()
				} else if(index == 1) {
					_this.$refs.two.scrollIntoView()
				} else if(index == 2) {
					_this.$refs.three.scrollIntoView()
				}
				document.body.scrollTop = document.body.scrollTop - 44
			},
			handleScroll() {
				var _this = this
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				// var oneOffsetTop = _this.$refs.one.offsetTop
				var oneOffsetTop = _this.$refs.one.getBoundingClientRect().top
				var twoOffsetTop = _this.$refs.two.offsetTop
				var threeOffsetTop = _this.$refs.three.offsetTop

				if(scrollTop >= oneOffsetTop - 44 && scrollTop < twoOffsetTop - 44) {
					_this.tabIndex = 0
				} else if(scrollTop >= twoOffsetTop - 44 && scrollTop < threeOffsetTop - 44) {
					_this.tabIndex = 1
				} else if(scrollTop > threeOffsetTop - 44) {
					_this.tabIndex = 2
				}
			}
		}
	}
</script>

<style lang='less' scoped>
	.vip-box {
		background: rgba(255, 255, 255, 1);
		.banner-img {
			img {
				width: 100%;
				height: auto;
				display: block;
			}
		}
		.swiper-inner {
			width: 100%;
			height: 3.5rem;
		}
		.swiper-slide {
			width: 5.62rem;
			height: 4.18rem;
			img {
				width: 100%;
				height: 100%;
				display: block;
			}
		}
		.isfix {
			position: fixed;
			width: 100%;
			top: 0;
			left: 0;
			background-color: white;
			z-index: 15;
		}
		.title-box {
			font-size: 0.36rem;
			font-family: PingFangSC-Semibold;
			color: rgba(51, 51, 51, 1);
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 0.27rem;
			padding-top: 0.53rem;
			p {
				margin: 0 0.28rem;
			}
			img {
				width: 0.45rem;
				height: 0.35rem;
			}
		}
		.top1 {
			padding-top: 1rem;
		}
		.pad-box {
			padding: 0 0.29rem;
			box-sizing: border-box;
			.join-box {
				height: 4rem;
			}
			.join-box,
			.join-box3 {
				padding-top: 0.70rem;
				box-sizing: border-box;
				border-bottom: 1px dashed rgba(228, 71, 44, 1);
				display: flex;
				justify-content: space-between;
				flex-direction: column;
				.dis-div {
					display: flex;
					align-items: center;
					div {
						width: 50%;
						text-align: center;
						img {
							width: 2.10rem;
							height: 2.10rem;
						}
					}
				}
				.join-p {
					display: flex;
					justify-content: space-between;
					margin-bottom: 0.44rem;
					.one {
						flex: 1;
						display: flex;
						justify-content: center;
						font-size: 0.24rem;
						font-family: PingFangSC-Semibold;
						color: rgba(51, 51, 51, 1);
						margin-top: 0.35rem;
						text-align: center;
					}
					.two {
						flex: 1;
						font-size: 0.24rem;
						font-family: PingFangSC-Semibold;
						color: rgba(51, 51, 51, 1);
						text-align: center;
					}
				}
			}
			.join-box2 {
				box-sizing: border-box;
				border-bottom: 1px dashed rgba(228, 71, 44, 1);
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-direction: column;
				text-align: center;
				.benefit {
					.one-title {
						font-size: 0.32rem;
						font-family: PingFangSC-Semibold;
						color: rgba(51, 51, 51, 1);
						margin-top: 0.27rem;
						margin-bottom: 0.38rem;
					}
					.one-img {
						width: 4.5rem;
						height: 2.1rem;
						margin-bottom: 0.3rem;
					}
					.two-img {
						width: 6.74rem;
						height: 3.6rem;
						margin-bottom: 0.3rem;
					}
					.three-img {
						width: 6.17rem;
						height: 4.75rem;
						margin-bottom: 0.3rem;
					}
					.zhu {
						font-size: 0.24rem;
						font-family: PingFangSC-Regular;
						color: rgba(160, 160, 160, 1);
						margin-bottom: 0.36rem;
						display: flex;
						text-align: left;
					}
					.bottom-img-box {
						img:nth-child(1) {
							width: 5.87rem;
							height: 0.63rem;
						}
						img:nth-child(2) {
							width: 2.05rem;
							height: 2.07rem;
						}
					}
					.bottom-tip-box {
						font-size: 0.28rem;
						font-family: PingFangSC-Semibold;
						color: rgba(51, 51, 51, 1);
						margin-bottom: 0.22rem;
						span {
							color: #F23030;
						}
					}
				}
			}
			.join-box2:last-child {
				border-bottom: none;
				padding-bottom: 1.25rem;
			}
			.btn-box {
				display: flex;
				padding: 0.5rem 0.46rem;
				box-sizing: border-box;
				justify-content: space-between;
				font-size: 0.28rem;
				font-family: PingFangSC-Medium;
				.left {
					flex: 1;
					height: 0.9rem;
					border-radius: 45px;
					border: 1px solid rgba(242, 48, 48, 1);
					display: flex;
					align-items: center;
					justify-content: center;
					color: rgba(245, 64, 46, 1);
					box-sizing: border-box;
					margin-right:0.30rem;
					img {
						width: 0.4rem;
						height: 0.4rem;
						margin-right: 0.12rem;
					}
				}
				.right {
					flex: 1;
					height: 0.9rem;
					border-radius: 45px;
					background: rgba(245, 64, 46, 1);
					display: flex;
					align-items: center;
					justify-content: center;
					color: white;
					img {
						width: 0.4rem;
						height: 0.4rem;
						margin-right: 0.12rem;
					}
				}
			}
		}
	}
</style>
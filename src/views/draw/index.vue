<template>
	<section style="height: 100%;">
		<div class="draw_index">
			<settingHeader :title="title"></settingHeader>

			<div class="wrapper" ref="wrapper">
				<div class="content">
					<!--轮播图-->
					<!--<swiper :options="swiperOption" class="swiper">
				        <swiper-slide v-for="(item,index) in demoList" :key="index">
				        	<img :src="item">
				        </swiper-slide>
				        <div class="swiper-pagination" slot="pagination"></div>
			        </swiper>-->

					<div class="new">
						<img class="banner-img" @click="$router.push({path: '/draw/rule'})" :src="'./static/draw/banner4.png'" />

						<div class="pd-box">
							<div class="bw-box">
								<div class="top">
									<img class="left-img" :src="'./static/draw/left.png'" />
									<p>截止2018年3月，在e消费平台</p>
									<img class="right-img" :src="'./static/draw/left.png'" />
								</div>
								<div class="middle">
									<div class="left">
										<p>累计中奖人数（人）</p>
										<p>{{tweenedNumber1}}</p>
									</div>
									<div>
										<p>累计奖金金额（元）</p>
										<p>{{tweenedNumber2}}</p>
									</div>
								</div>
								<div class="bottom" v-if="recommendMessage.length > 0">
									<div class="swiper-inner">
										<swiper :options="swiperOption" class="swiper">
											<swiper-slide v-for="(item,index) in info.recommendMessage" :key="index">
												<div class="one">
													<img v-if="item.logo.original" class="tx" :src="item.logo.original" />
													<img v-else class="tx" :src="'./static/images/mrtx.png'" />
													<div class="user"><img :src="'./static/draw/ren.png'" /> {{item.mobile}}</div>
													<p class="hua">{{item.message}}</p>
													<div class="bt">{{item.bonus}}元</div>
												</div>
											</swiper-slide>
										</swiper>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="head">
						<!-- <img src="../../assets/images/draw/lottery_index1.png"> -->
						<div class="list">
							<p class="has">我的中奖</p>
							<ul class="ul-list">
								<li @click="toLuckyrank(0)">
									<p class="status">中奖次数</p>
									<p class="money">{{userLottery.lotteryNum}}</p>
								</li>
								<li>
									<p class="status">待领奖金</p>
									<p class="money">{{userLottery.lotteryWaitBonus}}</p>
								</li>
								<li @click="toLuckyrank(1)">
									<p class="status">中奖总额</p>
									<p class="money">{{userLottery.lotteryBonus}}</p>
								</li>
							</ul>

							<div class="navList">
								<ul>
									<!--<li class="li-nav" @click="$router.push({path: '/draw/record'})">
										<span>参与记录</span>
									</li>-->
									<li class="li-nav" @click="$router.push({path: '/draw/winning'})">
										<span>中奖记录</span>
									</li>
									<li class="li-nav" @click="$router.push({path: '/draw/luckyrank'})">
										<span>幸运排行</span>
									</li>
								</ul>
								<!--<div class="btn" @click="$router.push({path: '/draw/review'})">
									<span>往期回顾</span>
								</div>-->
								<div class="round1"></div>
								<div class="round2"></div>
							</div>
						</div>
					</div>

					<div class="drawList">
						<p class="wonderful">
							精彩推荐
							<span @click="$router.push({path:'/draw/review'})">更多历史纪录<i class="icon iconfont icon-arrow-right "></i></span>
						</p>
						<ul class="commodity" v-if="recommendLottery.length > 0">
							<group v-for="(item,index) in recommendLottery" :key="index">
								<cell>
									<li @click="goPastevents(item.lotteryId)">
										<div class="img">
											<img v-if="item.thumb" :src="item.thumb.original" alt="">
											<div class="arrow">
												<img src="../../assets/images/draw/lottery_index8.png" alt="">
											</div>
										</div>
										<div class="container flex">
											<p class="lucky">{{ item.title}}</p>
											<p class="num">参加人数:{{ item.userNum}}</p>
											<p class="bonusPool">奖金池:<span>￥{{ item.bonus}}</span></p>
										</div>
									</li>
								</cell>
							</group>
						</ul>
						<loading v-if="show"></loading>
						<noMore v-if="showNomore"></noMore>
						<noData v-if="recommendLottery.length == 0" :status="2" :stateText="'暂无精彩推荐'"></noData>
					</div>
					<div class="clear"></div>
				</div>
			</div>
		</div>

	</section>
</template>

<script>
	import BScroll from 'better-scroll'
	import Loading from '@/components/loading'
	import noMore from '@/components/noMore'
	import noData from '@/components/noData'
	import settingHeader from '@/components/setting_header'
	import url from '@/config/url'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import TweenMax from 'gsap'
	export default {
		components: {
			Loading,
			noMore,
			noData,
			settingHeader,
			swiper,
			swiperSlide
		},
		data() {
			return {
				show: false,
				showNomore: false,
				reviewData: {},
				title: '幸运大抽奖',
				page: 1,
				swiperOption: {
					slidesPerView: 'auto',
					autoplay: false
				},

				info: {},
				animatedNumber1: 0,
				animatedNumber2: 0,
				curPage: 1,
				pageSize: 10,
				userLottery: {},
				recommendLottery: [],
				recommendMessage: []
			}
		},
		created() {
			this.getStatInfo()
			this.getRecommendLottery()
		},
		mounted() {
			this.InitScroll()
		},
		computed: {
			tweenedNumber1: function() {
				return this.animatedNumber1.toFixed(0);
			},
			tweenedNumber2: function() {
				return this.animatedNumber2.toFixed(0);
			}
		},
		methods: {
			getStatInfo() {
				var _this = this

				_this.$http.get(_this.url.lottery.getStatInfo, {
					params: {
						userId: _this.$store.state.user.userId,
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.info = res.data.data
						_this.userLottery = _this.info.userLottery
						_this.recommendMessage = _this.info.recommendMessage
						//数字动画
						TweenMax.to(_this.$data, 1.5, {
							animatedNumber1: _this.info.totalNums //累计中奖人数
						})
						TweenMax.to(_this.$data, 1.5, {
							animatedNumber2: _this.info.totalBonus //累计奖金金额
						})
					}
				})
			},
			getRecommendLottery() {
				var _this = this

				_this.$http.get(_this.url.lottery.getRecommendLottery, {
					params: {
						curPage: _this.curPage,
						pageSize: _this.pageSize
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						if(res.data.data.list.length > 0) {
							_this.recommendLottery = res.data.data.list
						}
					}
				})
			},
			InitScroll() {
				var _this = this
				this.$nextTick(() => {
					if(!this.scroll) {
						this.scroll = new BScroll(this.$refs.wrapper, {
							click: true,
							scrollY: true,
							pullUpLoad: {
								threshold: -30, // 负值是当上拉到超过低部 70px；正值是距离底部距离 时，                    
							}
						})
						this.scroll.on('pullingUp', (pos) => {
							if(_this.recommendLottery.length > 0) {
								this.LoadData()
							}
							this.$nextTick(function() {
								this.scroll.finishPullUp();
								this.scroll.refresh();
							});
						})
					} else {
						this.scroll.refresh()
					}
				})

			},
			LoadData() {
				var _this = this

				_this.curPage++

					_this.$http.get(_this.url.lottery.getRecommendLottery, {
						params: {
							curPage: _this.curPage,
							pageSize: _this.pageSize,
							islist: true
						}
					}).then((res) => {
						if(res.data.status == "00000000") {
							if(res.data.data.list.length > 0) {
								_this.show = true
								_this.showNomore = false
								_this.recommendLottery = _this.recommendLottery.concat(res.data.data.list)
							} else {
								_this.show = false
								_this.showNomore = true
							}
						}
					})
			},
			goPastevents(lotteryId) {
				this.$router.push({
					path: '/draw/pastevents',
					query: {
						'lotteryId': lotteryId
					}
				})
			},
			toLuckyrank(index) {
				var _this = this
				_this.$router.push({
					path: '/draw/luckyrank',
					query: {
						index: index
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.draw_index {
		height: 100%;
		background: #E32921;
	}
	
	.new {
		.banner-img {
			width: 100%;
			height: auto;
			display: block;
		}
		.pd-box {
			padding: 0 0.2rem;
			box-sizing: border-box;
			.bw-box {
				background: rgba(255, 255, 255, 1);
				box-shadow: 0px 2px 10px 0px rgba(146, 9, 0, 0.4);
				border-radius: 0.08rem;
				padding: 0.42rem 0 0.2rem 0;
				box-sizing: border-box;
				.top {
					display: flex;
					justify-content: center;
					align-items: center;
					p {
						font-size: 0.36rem;
						font-family: PingFangSC-Medium;
						color: rgba(51, 51, 51, 1);
						margin: 0 0.11rem;
					}
					img {
						width: 0.24rem;
						height: 0.24rem;
					}
					.right-img {
						transform: scaleX(-1);
					}
				}
				.middle {
					display: flex;
					border-bottom: 1px solid rgba(230, 230, 230, 1);
					padding: 0.24rem 0;
					.left {
						border-right: 1px solid #eee;
						box-sizing: border-box;
					}
					div {
						flex: 1;
						text-align: center;
						p:nth-child(1) {
							font-size: 0.28rem;
							font-family: PingFangSC-Regular;
							color: rgba(103, 103, 103, 1);
							margin-bottom: 0.07rem;
						}
						p:nth-child(2) {
							font-size: 0.48rem;
							font-family: Arial-BoldMT;
							color: rgba(227, 41, 34, 1);
						}
					}
				}
				.bottom {
					padding: 0.2rem 0.2rem 0 0.2rem;
					.swiper-inner {
						width: 100%;
						height: 3.5rem;
					}
					.swiper-slide {
						width: 2.53rem;
						height: 3.5rem;
						margin-right: 0.2rem;
						background: rgba(242, 48, 48, 0.1);
						border-radius: 5px;
						border: 1px solid rgba(255, 193, 193, 1);
						padding: 0.30rem 0.20rem;
						box-sizing: border-box;
						.one {
							display: flex;
							align-items: center;
							justify-content: center;
							flex-direction: column;
							.tx {
								width: 1rem;
								height: 1rem;
								border-radius: 50%;
							}
							.hua {
								font-size: 0.24rem;
								font-family: PingFangSC-Regular;
								color: rgba(103, 103, 103, 1);
								word-wrap: break-word;
								display: -webkit-box;
								-webkit-line-clamp: 3;
								-webkit-box-orient: vertical;
								word-break: break-all;
								overflow: hidden;
								height: 1rem;
							}
							.user {
								font-size: 0.22rem;
								font-family: PingFangSC-Regular;
								color: rgba(103, 103, 103, 1);
								display: flex;
								align-items: center;
								margin: 0.15rem 0;
								img {
									width: 0.24rem;
									height: 0.24rem;
									margin-right: 0.07rem;
								}
							}
							.bt {
								width: 100%;
								display: flex;
								align-items: center;
								justify-content: center;
								font-size: 0.22rem;
									font-family: PingFangSC-Semibold;
									color: rgba(242, 48, 48, 1);
							}
						}
					}
				}
			}
		}
	}
	
	.settingHeader~.wrapper {
		position: absolute;
		top: .9rem;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		background: #E32921;
	}
	
	.wrapper {
		// height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		background: #E32921;
	}
	
	.head {
		width: 100%;
		padding-top: 0.2rem;
		img {
			width: 100%;
			display: block;
			margin: 0;
			padding: 0;
		}
		.list {
			width: 94.7%;
			margin: 0 auto;
			background: #fff;
			padding-bottom: 0.48rem;
			border-radius: 0.08rem;
			.has {
				font-size: 0.36rem;
				font-family: PingFangSC-Medium;
				color: rgba(50, 50, 50, 1);
				padding-top: 0.37rem;
				padding-bottom: 0.09rem;
				text-align: center;
			}
			.ul-list {
				display: flex;
				margin: 0 0.1rem;
				border-bottom: 1px solid #E6E6E6;
				padding-top: 0.28rem;
				padding-bottom: 0.15rem;
				li {
					flex: 1;
					text-align: center;
					padding-bottom: 0.2rem;
					border-right: 1px solid #eee;
					.money {
						font-size: .6rem;
						font-weight: 500;
						color: #1A2642;
						margin-top: 0.12rem;
					}
					.status {
						font-size: 0.24rem;
						color: #666666;
					}
				}
				li:nth-child(3) {
					border: none;
				}
			}
			.navList {
				width: 100%;
				margin-top: 0.39rem;
				background-color: #FFF;
				position: relative;
				ul {
					display: flex;
					justify-content: space-between;
					padding: 0 0.67rem;
					box-sizing: border-box;
					.li-nav {
						text-align: center;
						border-radius: 0.48rem;
						border: 1px solid #FF2D4F;
						color: #FF3B5A;
						font-size: 0.32rem;
						width: 2.56rem;
						height: 0.96rem;
						line-height: 0.96rem;
					}
					li:nth-child(2) {
						background: linear-gradient(-90deg, rgba(255, 92, 52, 1), rgba(255, 42, 75, 1));
						box-shadow: 0px 2px 30px 0px rgba(255, 81, 58, 0.5);
						color: white;
					}
				}
				.btn {
					width: 81.5%;
					background: linear-gradient(-90deg, rgba(255, 92, 52, 1), rgba(255, 42, 75, 1));
					box-shadow: 0px 0px 30px 0px rgba(255, 81, 58, 0.5);
					border-radius: 0.48rem;
					color: #fff;
					text-align: center;
					font-size: 0.32rem;
					/*padding: 0.25rem 0;*/
					margin: 0 auto;
					margin-top: 0.32rem;
					height: 0.96rem;
					line-height: 0.96rem;
				}
				.round1 {
					position: absolute;
					background-color: #E32921;
					border-radius: 50%;
					width: 0.24rem;
					height: 0.24rem;
					top: -55%;
					left: -0.12rem;
				}
				.round2 {
					position: absolute;
					background-color: #E32921;
					border-radius: 50%;
					width: 0.24rem;
					height: 0.24rem;
					top: -53%;
					right: -0.12rem;
				}
			}
		}
	}
	
	.drawList {
		margin: 0.2rem;
		background: #fff;
		border-radius: 0.08rem;
		padding: 0.2rem 0;
		.wonderful {
			text-align: center;
			width: 100%;
			font-size: 0.36rem;
			color: #333;
			position: relative;
			span {
				position: absolute;
				right: 0;
				top: 50%;
				transform: translate(0%, -50%);
				font-size: 0.24rem;
				font-family: PingFangSC-Regular;
				color: rgba(227, 41, 33, 1);
				display: flex;
				align-items: center;
			}
		}
		li {
			padding-top: 0.29rem;
			position: relative;
			padding-bottom: 0.3rem;
			border-bottom: 1px solid #E6E6E6;
			display: flex;
			justify-content: space-between;
			.flex {
				flex: 1;
			}
			.img {
				position: relative;
				width: 2.42rem;
				height: auto;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.left {
				float: left;
			}
			.arrow {
				width: 0.33rem;
				position: absolute;
				bottom: 0;
				right: 0.15rem;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.container {
				margin-left: 0.3rem;
				line-height: .36rem;
				.lucky {
					font-size: .3rem;
					color: #1A2642;
					margin-bottom: 0.4rem;
					margin-top: 0.05rem;
					word-wrap: break-word;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					word-break: break-all;
					height: 0.65rem;
					overflow: hidden;
				}
				.num {
					font-size: .26rem;
					color: #666666;
				}
				.bonusPool {
					font-size: .26rem;
					color: #666666;
					span {
						color: #E32921;
						font-size: 0.3rem;
					}
				}
			}
		}
	}
</style>

<style lang="less">
	.draw_index .swiper-pagination-bullet-active {
		background: #fff;
	}
	
	.commodity {
		padding: 0 0.2rem 0 0.2rem;
		box-sizing: border-box;
		.weui-cells {
			margin-top: 0;
		}
		.vux-no-group-title {
			margin-top: 0;
		}
		.weui-cells:before {
			border-top: none;
		}
		.weui-cell {
			padding: 0;
		}
		.weui-cell__ft {
			text-align: left;
			width: 100%;
		}
		.weui-cell_access .weui-cell__ft {
			width: 100%;
		}
		.weui-cell_access .weui-cell__ft:after {
			width: 0.2rem;
			height: 0.2rem;
			right: 0.2rem;
			border-width: 0.04rem 0.04rem 0 0;
			border-color: #D8DFF0;
		}
		.weui-cells:after {
			border-bottom: solid 1px #D8DFF0;
		}
	}
</style>
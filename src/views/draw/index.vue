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
								<div class="bottom">
									<div class="swiper-inner">
										<swiper :options="swiperOption" class="swiper">
											<swiper-slide v-for="(item,index) in demoList" :key="index">
												<div class="one">
													<img class="tx" :src="item.img" />
													<p class="hua">{{item.say}}</p>
													<div class="bt">
														<div>
															<img :src="'./static/draw/ren.png'" /> {{item.name}}
														</div>
														<p>5000元</p>
													</div>
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
									<p class="money">5</p>
								</li>
								<li>
									<p class="status">待领奖金</p>
									<p class="money">5000</p>
								</li>
								<li @click="toLuckyrank(1)">
									<p class="status">中奖总额</p>
									<p class="money">25000</p>
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
						<ul class="commodity">
							<group v-for="(item,index) in reviewData.lists" :key="index">
								<cell>
									<li @click="$router.push({path: '/draw/pastevents'})">
										<div class="img">
											<img :src="item.thumb" alt="">
											<div class="arrow">
												<img src="../../assets/images/draw/lottery_index8.png" alt="">
											</div>
										</div>
										<div class="container flex">
											<p class="lucky">{{ item.title}}</p>
											<p class="num">参加人数:{{ item.user}}</p>
											<p class="bonusPool">奖金池:<span>￥{{ item.bonusPool}}</span></p>
										</div>
									</li>
								</cell>
							</group>
						</ul>
						<loading v-if="show"></loading>
						<noMore v-if="showNomore"></noMore>
					</div>
					<div class="clear"></div>
				</div>
			</div>
		</div>

	</section>
</template>

<script>
	import BScroll from 'better-scroll'
	import Loading from '../../components/loading'
	import noMore from '../../components/noMore'
	import settingHeader from '../../components/setting_header'
	import url from '../../config/url'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import TweenMax from 'gsap';
	export default {
		components: {
			Loading,
			noMore,
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
				demoList: [{
						name: '徐先生',
						say: '我在万舜银楼e消费中了5000元大奖，太感谢e消费了！',
						img: './static/draw/rw1.png'
					},
					{
						name: '朱先生',
						say: '我是在云亭禾美生活超市e消费中大奖的！',
						img: './static/draw/rw2.png'
					},
					{
						name: '沈女士',
						say: '我在虹桥路美的专卖店e消费中5000元大奖！',
						img: './static/draw/rw3.png'
					},
					{
						name: '陈先生',
						say: '我刚注册在顾山欧特福超市买了188元就中了大奖！',
						img: './static/draw/rw4.png'
					},
					{
						name: '戴女士',
						say: '我在红豆周庄店买一套男装没想到中了大奖！',
						img: './static/draw/rw5.png'
					},
					{
						name: '刘先生',
						say: '我在元祖食品e消费中大奖了！之前就中过奖',
						img: './static/draw/rw6.png'
					},
					{
						name: '鲁女士',
						say: '我在无锡王兴记店买小笼馒头中的大奖！我都难以置信',
						img: './static/draw/rw7.png'
					},
					{
						name: '杨先生',
						say: '我在港下亿家福给宝宝买奶粉没想到第一次e消费就中了！',
						img: './static/draw/rw8.png'
					},
					{
						name: '梁先生',
						say: '我在明云超市买香烟中了5000元大奖，很开心！',
						img: './static/draw/rw9.png'
					},
					{
						name: '谢先生',
						say: '我在红星美凯龙e消费中5000元大奖了！下次还会选择！',
						img: './static/draw/rw10.png'
					},
				],
				swiperOption: {
					slidesPerView: 'auto',
					autoplay: false
				},
				num1: 764924,
				animatedNumber1: 0,
				num2: 70054320,
				animatedNumber2: 0
			}
		},
		mounted() {
			this.getData()
			this.InitScroll()

			TweenMax.to(this.$data, 1.5, {
				animatedNumber1: this.num1
			})
			TweenMax.to(this.$data, 1.5, {
				animatedNumber2: this.num2
			})
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
			InitScroll() {
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
							this.LoadData()
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
			goPastevents() {
				this.$router.push({
					path: '/draw/pastevents'
				})
			},
			LoadData() {
				this.page++;
				var _this = this
				_this.show = true
				if(_this.showNomore) {
					_this.show = false;
				} else {
					setTimeout(function() {
						_this.show = false;
						let len = _this.reviewData.lists.length;
						let par = new URLSearchParams()
						par.append('page', _this.page)
						_this.$http.post(url.draw.getReviewLists, par).then(function(response) {
							if(response.status == 200 && response.data != null && response.data.result.page == _this.page) {
								_this.reviewData.lists = _this.reviewData.lists.concat(response.data.result.lists)
							}
							if(len == _this.reviewData.lists.length) {
								_this.showNomore = true;
							}
						}).catch(function(error) {})
					}, 3000)
				}
			},
			getData() {
				let _this = this;
				this.$http.post(url.draw.getReviewLists, {}).then(function(response) {
					if(response.status == 200 && response.data != null) {
						_this.reviewData = response.data.result
					}
				}).catch(function(error) {});
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
								margin-bottom: 0.2rem;
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
							}
							.bt {
								width: 100%;
								display: flex;
								align-items: center;
								justify-content: space-between;
								margin-top: 0.36rem;
								div {
									font-size: 0.22rem;
									font-family: PingFangSC-Regular;
									color: rgba(103, 103, 103, 1);
									display: flex;
									align-items: center;
									img {
										width: 0.24rem;
										height: 0.24rem;
										margin-right: 0.07rem;
									}
								}
								p {
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
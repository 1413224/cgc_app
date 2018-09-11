<template>
	<section class="review" style="height: 100%;">
		<div class="wrapper" ref="wrapper">
			<div class="content">
				<settingHeader :title="title"></settingHeader>
				<!-- 轮播 -->
				<!--<swiper :options="swiperOption" class="swiper">
			        <swiper-slide v-for="(item,index) in imgList" :key="index">
			        	<img :src="item">
			        </swiper-slide>
			        <div class="swiper-pagination" slot="pagination"></div>
		        </swiper>-->
				<img class="banner-img" :src="'./static/draw/banner5.png'" />

				<div class="drawList">
					<p class="wonderful">往期回顾</p>
					<ul class="commodity2" v-if="showList">
						<group v-for="(item,index) in historyLottery" :key="index">
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
										<p class="num">参加人数:{{ item.orderNum}}</p>
										<p class="bonusPool">奖金池:<span>￥{{ item.bonus}}</span></p>
									</div>
								</li>
							</cell>
						</group>
					</ul>
					<loading v-if="show"></loading>
					<noMore v-if="showNomore"></noMore>
					<Null v-if="!showList && !inloading" status="zwsj" text="暂无往期回顾"></Null>
					<Null v-if="!showList && inloading" status="loading" text="加载中"></Null>
				</div>
				<div class="clear"></div>
			</div>
		</div>
	</section>
</template>

<script>
	import BScroll from 'better-scroll'
	import Loading from '@/components/loading'
	import noMore from '@/components/noMore'
	import Null from '@/components/null'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import settingHeader from '@/components/setting_header'
	import url from '@/config/url'
	export default {
		components: {
			Loading,
			noMore,
			Null,
			swiper,
			swiperSlide,
			settingHeader
		},
		data() {
			return {
				title: '幸运大抽奖',
				show: false,
				showNomore: false,
				reviewData: {},
				imgList: [
					'./static/draw/lottery_index1.png',
					'./static/draw/banner2.png',
					'./static/draw/banner3.png'
				],
				swiperOption: {
					pagination: {
						el: '.swiper-pagination'
					},
					autoplay: true,
					loop: true
				},
				page: 1,

				curPage: 1,
				pageSize: 10,
				historyLottery: [],
				showList: false,
				inloading: true
			}
		},
		create() {},
		mounted() {
			this.InitScroll()
			this.getHistoryLottery()
		},
		methods: {
			goPastevents(lotteryId) {
				this.$router.push({
					path: '/draw/pastevents',
					query: {
						'lotteryId': lotteryId
					}
				})
			},
			getHistoryLottery() {
				var _this = this

				_this.$http.get(_this.url.lottery.getHistoryLottery, {
					params: {
						curPage: _this.curPage,
						pageSize: _this.pageSize
					}
				}).then((res) => {
					if(res.data.status == "00000000") {

						_this.showList = res.data.data.list.length > 0 ? true : false
						_this.inloading = false

						if(res.data.data.list.length > 0) {
							_this.historyLottery = res.data.data.list
						}
					}
				})
			},
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
			LoadData() {
				var _this = this

				_this.curPage++

					_this.$http.get(_this.url.lottery.getHistoryLottery, {
						params: {
							curPage: _this.curPage,
							pageSize: _this.pageSize,
							islist: true
						}
					}).then((res) => {
						if(res.data.status == "00000000") {
							if(res.data.data.list.length > 0) {
								_this.historyLottery = _this.historyLottery.concat(res.data.data.list)
								_this.showNomore = false
								_this.show = true
							} else {
								_this.showNomore = true
								_this.show = false
							}
						}
					})
			},
		}
	}
</script>

<style lang='less' scoped>
	@img: 3.56rem;
	.review {
		.swiper {
			height: @img;
		}
		img {
			width: 7.5rem;
			height: @img;
		}
	}
</style>

<style lang="less" scoped>
	.wrapper {
		height: 100%;
		overflow: hidden;
		background-color: #E32921;
		.content {
			.banner-img {
				width: 100%;
				height: auto;
				display: block;
			}
		}
	}
	
	.head {
		width: 100%;
		img {
			width: 100%;
			display: block;
			margin: 0;
			padding: 0;
		}
	}
	
	.drawList {
		margin: 0 0.2rem;
		padding: 0 0.02rem;
		background: #fff;
		border-radius: 0.08rem;
		padding-top: 0.36rem;
		.null_box {
			margin-top: 0.20rem;
			padding: 0.30rem 0;
			box-sizing: border-box;
			position: relative;
		}
		.null_box:after {
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
		.wonderful {
			text-align: center;
			width: 100%;
			font-size: 0.36rem;
			color: #333;
		}
		li {
			padding-top: 0.29rem;
			position: relative;
			padding-bottom: 0.3rem;
			margin-right: 0.24rem;
			border-bottom: 1px solid #E6E6E6;
			display: flex;
			.img {
				position: relative;
				width: 2.42rem;
				height: auto;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.flex {
				flex: 1;
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
					height: 0.7rem;
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
	.review .content .swiper-pagination-bullet-active {
		background: #fff;
	}
	
	.commodity2 {
		padding: 0 0.2rem 0 0.3rem;
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
<template>
	<section style="height: 100%;" class="pastwrap">
		<div class="wrapper" ref="wrapper">
			<div class="content">
				<settingHeader :title="title"></settingHeader>

				<div class="item">
					<div class="periodVideo">第{{ info.number}}期 抽奖视频</div>
					<div class="player" v-if="!isNoVideo">
						<d-player ref="player" @fullscreen="fs" @pause="stop" @play="playerStop = false" :options="options"></d-player>
						<img @click="bf" v-if="playerStop" :src="'./static/draw/kongzhi.png'" alt="" />
					</div>
					<img style="width: 100%;height: auto;" v-show="isNoVideo" :src="'./static/draw/video_bg.png'" />
				</div>

				<div class="container">
					<div class="bs">
						<div class="show-down">
							<group gutter="0">
								<cell>
									<div class="title">
										<div class="wz1">
											<div>{{info.title}}</div>
											<div class="period">{{info.number}}期</div>
										</div>
										<div class="money">奖金池共 : <span>￥{{info.bonus}}</span></div>
									</div>
								</cell>
							</group>
						</div>
						<div class="award-set">
							<div class="set-title">奖品设置</div>
							<ul class="ul-set">
								<li v-for="i in info.awardList" :key="i">
									<div class="jiangx">{{i.awardName}}</div>
									<div class="flex">
										<div>{{i.bonus}}<span class="small">元</span></div>
										<div class="left num">{{i.number}}名</div>
									</div>
								</li>
							</ul>
						</div>

						<div class="wz-periods">
							<div class="wz-period">抽奖期数</div>

							<div class="period">
								<swiper :options="swiperOption1" ref="mySwiper">
									<swiper-slide @click.native="periodActive(index,item.lotteryId)" v-for="(item,index) in data3" :key="index" :class="{'btn-active':act3==index}">
										<div class="btn0">
											{{item.number}}
										</div>
									</swiper-slide>
								</swiper>
							</div>
						</div>
					</div>
				</div>
				<div class="clear"></div>

				<div class="winList">
					<!-- 中奖人员 -->
					<div class="win-person">
						<div class="wz-period">中奖名单</div>
						<div style="padding: 0 0.4rem;box-sizing: border-box;">
							<swiper :options="swiperOption2">
								<swiper-slide v-for="(item,index) in info.awardList" :key="index">
									<div class="wz-award" :class="{'wz-award-active':act1==index}" @click="actice(index,item.awardId)">{{item.awardName}}</div>
								</swiper-slide>
							</swiper>
						</div>
					</div>

					<!-- 一等奖数据列表 -->
					<div class="web">
						<!--数据列表-->
						<div class="item" v-for="(item,index) in personList" v-if="showList">
							<div class="left">
								<img v-if="item.thumb" :src="item.thumb.original" alt="">
								<img v-else :src="'./static/images/mrtx.png'" alt="">
							</div>
							<div class="right">
								<div>
									<p v-if="item.nickname != ''">{{item.nickname}}</p>
									<p v-else style="color: #ccc;">未设置昵称</p>
									<p><span>{{item.bonus}}</span>元</p>
								</div>
								<p class="num">{{item.mobile}}</p>
								<p class="tip">{{item.message}}</p>
							</div>
						</div>
						<Null v-if="!showList && !inloading" status="zwsj" text="暂无中奖名单"></Null>
						<Null v-if="!showList && inloading" status="loading" text="加载中"></Null>
					</div>

					<Loading v-if="show"></Loading>
					<noMore v-if="showNomore"></noMore>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	// import videojs from 'video.js'
	import BScroll from 'better-scroll'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import settingHeader from '@/components/setting_header'
	import Loading from '@/components/loading'
	import noMore from '@/components/noMore'
	import Null from '@/components/null'

	import VueDPlayer from 'vue-dplayer'
	import 'vue-dplayer/dist/vue-dplayer.css'
	export default {
		components: {
			swiper,
			swiperSlide,
			settingHeader,
			Loading,
			noMore,
			Null,
			'd-player': VueDPlayer
		},
		data() {
			return {
				options: {},
				show: false,
				showNomore: false,
				swiperOption: {
					autoHeight: true,
					slidesPerView: 'auto',
					spaceBetween: 10
				},
				title: '往期回顾',
				showContent: false,
				list: [],
				swiperOption1: {
					autoHeight: true,
					slidesPerView: 'auto',
					spaceBetween: 10,
					centeredSlides: true,
				},
				act1: 0,
				data1: [],
				data3: [],
				act3: 0,
				personList: [],
				swiperOption2: {
					autoHeight: true,
					slidesPerView: 'auto',
					spaceBetween: 10
				},

				player: {},
				playerStop: true,

				curPage: 1,
				pageSize: 10,
				list: [],
				info: {},
				awardId: '',
				awardListLength: 0,
				showList: false,
				inloading: true,
				isNoVideo: true
			}
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.swiper
			}
		},
		created() {
			this.getInfoById()
		},
		mounted() {
			this.InitScroll()
		},
		methods: {
			getInfoById() {
				var _this = this

				_this.$http.get(_this.url.lottery.getInfoById, {
					params: {
						lotteryId: _this.$route.query.lotteryId,
						userId: _this.$store.state.user.userId,
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.info = res.data.data

						var indexLottery = [{
							'lotteryId': _this.$route.query.lotteryId,
							'number': _this.info.number
						}]

						_this.data3 = _this.info.beforeLottery.concat(indexLottery)
						_this.data3 = _this.data3.concat(_this.info.afterLottery)

						_this.data3.forEach((value, index, Array) => {
							if(value.number == _this.info.number) {
								_this.act3 = index
								this.$refs.mySwiper.swiper.slideTo(_this.act3, 10, false)
							}
						})

						if(res.data.data.awardList.length > 0) {
							if(_this.info.videoUrl != '') {
								_this.options = {
									autoplay: false, //自动播放
									theme: '#FADFA3', //主体颜色
									loop: false, //循环播放
									lang: 'zh-cn', //语言
									screenshot: false, //视频截图
									hotkey: false, //启动热键
									logo: './static/images/video.jpg', //左上角logo
									volume: 0.7, //音量
									mutex: true, //多个视频同时播放
									video: {
										url: _this.info.videoUrl,
										pic: _this.info.thumb ? _this.info.thumb.original : './static/draw/video_bg.png'
									}
								}

								_this.isNoVideo = false
								_this.$nextTick(function() {
									_this.player = _this.$refs.player.dp
									document.getElementsByClassName('dplayer-full-in-icon')[0].style.display = 'none'
									console.log(_this.player)
								})
							} else {
								_this.isNoVideo = true
							}

							_this.awardListLength = _this.info.awardList.length

							_this.actice(0, _this.info.awardList[0].awardId)
						} else {
							_this.inloading = false
							_this.personList = []
						}
					}
				})
			},
			fs() {
				this.player.fullScreen.request('browser')
			},
			bf() {
				this.player.play()
				this.playerStop = false
			},
			stop() {
				this.playerStop = true
			},
			periodActive(index, id) {
				var _this = this

				_this.act3 = index

				_this.$router.replace({
					query: _this.merge(_this.$route.query, {
						'lotteryId': id
					})
				})
				_this.getInfoById()
			},
			//中奖人员 一等奖
			actice(index, id) {
				var _this = this

				_this.personList = []
				_this.showList = false
				_this.inloading = true
				_this.curPage = 1

				_this.act1 = index
				_this.awardId = id

				_this.$http.get(_this.url.lottery.getAwardUserList, {
					params: {
						lotteryId: _this.$route.query.lotteryId,
						awardId: id,
						curPage: _this.curPage,
						pageSize: _this.pageSize
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						if(res.data.data.list) {
							_this.showList = res.data.data.list.length > 0 ? true : false
							if(res.data.data.list.length > 0) {
								_this.personList = res.data.data.list
							}
						}
						_this.inloading = false
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
				if(this.personList.length > 0) {
					var _this = this
					_this.curPage++;

					_this.$http.get(_this.url.lottery.getAwardUserList, {
						params: {
							lotteryId: _this.$route.query.lotteryId,
							awardId: _this.awardId,
							curPage: _this.curPage,
							pageSize: _this.pageSize,
							islist: true
						}
					}).then((res) => {
						if(res.data.status == "00000000") {
							if(res.data.data.list) {
								if(res.data.data.list.length > 0) {
									_this.show = true
									_this.showNomore = false
									_this.personList = _this.personList.concat(res.data.data.list)
								} else {
									_this.show = false
									_this.showNomore = true
								}
							} else {
								_this.show = false
								_this.showNomore = true
							}
						}
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.wrapper {
		height: 100%;
		overflow: hidden;
		.content {
			padding-bottom: 0.2rem;
			background: #E32921;
			color: #1A2642;
		}
	}
	
	.left {
		float: left;
	}
	
	.container {
		padding: 0.2rem 0.2rem 0 0.2rem;
		box-sizing: border-box;
		.bs {
			border-radius: 0.08rem;
			width: 100%;
			background-color: #fff;
			padding: 0 0.1rem;
			box-sizing: border-box;
		}
		.title {
			padding: 0.4rem 0.2rem 0.2rem 0.2rem;
			.wz1 {
				width: 100%;
				font-size: 0.36rem;
				font-family: PingFang-SC-Medium;
				color: rgba(51, 51, 51, 1);
				display: flex;
				.period {
					color: #fff;
					font-size: 0.26rem;
					background: linear-gradient(-121.4deg, #AF51FF, #9013FE);
					border-radius: 0.04rem;
					text-align: center;
					padding: 0.05rem 0.07rem;
					margin-left: 0.12rem;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
			.money {
				clear: both;
				letter-spacing: 0.02rem;
				color: #666666;
				font-size: 0.26rem;
				margin-top: 0.22rem;
				span {
					font-size: 0.26rem;
					font-family: PingFang-SC-Medium;
					color: #E32921;
				}
			}
		}
		.award-set {
			padding: 0.4rem 0.2rem;
			border-bottom: 1px solid #E6E6E6;
			overflow: hidden;
			padding-bottom: 0.3rem;
			border-top: 1px solid #E6E6E6;
			box-sizing: border-box;
			.set-title {
				color: #333333;
				font-size: 0.36rem;
			}
			.ul-set {
				margin-top: 0.3rem;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				li {
					list-style: none;
					background: linear-gradient(-121.4deg, #FF5C34, #FF2A4B);
					color: #fff;
					font-size: 0.26rem;
					border-radius: 0.04rem;
					text-align: center;
					width: 3.20rem;
					/*height: 0.78rem;*/
					/*display: flex;*/
					margin-bottom: 0.1rem;
					align-items: center;
					padding: 0 0.18rem;
					box-sizing: border-box;
					.jiangx{
						text-align: left;
						padding-top: 4px;
						font-size: .12rem;
					}
					.flex {
						display: flex;
						div:nth-child(1) {
							line-height: 0.64rem;
							margin-right: 0.1rem;
							color: #FFEEB3;
							font-size: 0.42rem;
							flex: 2;
							text-align: left;
							.small {
								font-size: 0.12rem;
								padding-left: 2px;
								display: inline-block;
							}
						}
						div:nth-child(2) {
							color: #fff;
							font-size: .12rem;
							flex: 1;
							
						}
					}
					.num {
						padding-left: 0.15rem;
						margin: auto;
						margin-left: 0.15rem;
						border-left: 1px solid #fff;
					}
				}
				li:nth-of-type(even) {
					margin-right: 0;
				}
			}
		}
		.wz-periods {
			padding: 0.4rem 0.2rem;
			box-sizing: border-box;
			.period {
				color: #fff;
				padding-bottom: 0.19rem;
				.swiper-slide {
					height: 0.66rem;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 0.3rem;
					background-color: #E1E1E1;
					border-radius: 3px;
					max-width: 2rem;
				}
				/* 抽奖期数*/
				.btn-active {
					background-color: #E32921;
				}
			}
			.wz-period {
				font-size: 0.32rem;
				margin-bottom: 0.4rem;
			}
		}
	}
	
	.winList {
		width: 94.7%;
		background-color: #fff;
		margin: 0.2rem;
		border-radius: 0.06rem;
		.win-person {
			border-bottom: 1px solid #E6E6E6;
			.wz-period {
				color: #333333;
				font-size: 0.36rem;
				text-align: center;
				padding-top: 0.33rem;
				padding-bottom: 0.3rem;
			}
			.swiper-slide {
				width: 1.3rem;
				height: auto;
			}
			.wz-award {
				/*width: 1.1rem;*/
				color: #1A2642;
				font-size: 0.3rem;
				text-align: center;
				padding-bottom: 0.3rem;
				box-sizing: border-box;
				border-bottom: solid 3px #fff;
			}
			.wz-award-active {
				color: #E32921;
				border-bottom: solid 3px #E32921;
			}
		}
	}
	
	.wz-red {
		color: #E32921;
		font-size: 0.32rem;
	}
	
	.wz-black {
		color: #1A2642;
		font-size: 0.25rem;
		line-height: 0.6rem;
	}
	
	.yuan {
		font-size: 0.18rem;
	}
	
	.wz-red2 {
		color: #E32921;
		font-size: 0.36rem;
	}
	
	.personlist {
		width: 100%;
		.img-left {
			width: 20%;
			float: left;
			margin: 0.1rem 0.21rem 0.1rem 0;
			img {
				width: 100%;
			}
		}
		.user-right {
			margin: 0.3rem 0 0 0;
			color: #1A2642;
			font-size: 0.26rem;
			.wz-gray2 {
				color: #666666;
				margin-top: 0.1rem;
			}
		}
	}
	
	.fr {
		float: right;
		margin-right: 0.15rem;
	}
</style>

<style lang="less">
	.show-down {
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
			/*padding-right: 2.7rem;*/
		}
		.weui-cells:after {
			border-bottom: none;
		}
	}
	
	.pastwrap {
		.item {
			width: 100%;
			.periodVideo {
				background-color: rgba(0, 0, 0, 0);
				height: 0.5rem;
				color: #bdbdbd;
				position: absolute;
				top: 0.1rem;
				left: 0.1rem;
				z-index: 11;
				font-size: 0.3rem;
				line-height: 0.5rem;
			}
			.player {
				width: 100%;
				/*height: 4.2rem;*/
				position: relative;
				img {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 1rem;
					height: 1rem;
				}
			}
		}
	}
	
	.web {
		padding: 0 0.30rem;
		box-sizing: border-box;
		.null_box {
			padding: 0.20rem;
			box-sizing: border-box;
		}
		.item {
			display: flex;
			align-items: center;
			padding: 0.37rem 0;
			box-sizing: border-box;
			border-bottom: 1px solid #E6E6E6;
			.left {
				margin-right: 0.2rem;
				img {
					width: 0.96rem;
					height: 0.96rem;
					border-radius: 50%;
				}
			}
			.right {
				flex: 1;
				div {
					display: flex;
					align-items: center;
					justify-content: space-between;
					p:nth-child(1) {
						font-size: 0.24rem;
						font-family: PingFang-SC-Regular;
						color: rgba(51, 51, 51, 1);
					}
					p:nth-child(2) {
						font-size: 0.18rem;
						font-family: PingFang-SC-Bold;
						color: rgba(227, 41, 33, 1);
						span {
							font-size: 0.36rem;
						}
					}
				}
				.num {
					font-size: 0.32rem;
					font-family: PingFang-SC-Medium;
					color: rgba(227, 41, 33, 1);
					margin: 0.05rem 0;
				}
				.tip {
					font-size: 0.24rem;
					font-family: PingFang-SC-Regular;
					color: rgba(160, 160, 160, 1);
				}
			}
		}
	}
</style>
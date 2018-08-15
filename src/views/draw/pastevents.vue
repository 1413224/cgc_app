<template>
	<section style="height: 100%;" class="pastwrap">
		<div class="wrapper" ref="wrapper">
			<div class="content">
				<settingHeader :title="title"></settingHeader>

				<div class="item">
					<div class="periodVideo">{{ periodVideo}}</div>
					<div class="player">
						<d-player ref="player" @fullscreen="fs" @pause="stop" @play="playerStop = false" :options="options"></d-player>
						<img @click="bf" v-if="playerStop" :src="'./static/draw/kongzhi.png'" alt="" />
					</div>
				</div>

				<div class="container">
					<div class="bs">
						<div class="show-down">
							<group gutter="0">
								<cell>
									<div class="title">
										<div class="wz1">
											<div>国美白云店第1期(已揭晓)</div>
											<div class="period">1564期</div>
										</div>
										<div class="money">奖金池共 : <span>￥800,000</span></div>
									</div>
								</cell>
							</group>
						</div>
						<div class="award-set">
							<div class="set-title">奖品设置</div>
							<ul class="ul-set">
								<li v-for="i in 4" :key="i">
									<div class="flex">
										<div style="flex: 1">一等奖</div>
										<div>5000<span class="small">元</span></div>
									</div>
									<div class="left num">30名</div>
								</li>
							</ul>
						</div>

						<div class="wz-periods">
							<div class="wz-period">抽奖期数</div>

							<div class="period">
								<swiper :options="swiperOption1">
									<swiper-slide v-for="(item,index) in data3" :key="index" :class="{'btn-active':act3==index}">
										<div class="btn0" @click="periodActive(index)">
											{{item}}
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
								<swiper-slide v-for="(item,index) in data1" :key="index">
									<div class="wz-award" :class="{'wz-award-active':act1==index}" @click="actice(index)">{{item}}</div>
								</swiper-slide>
							</swiper>
						</div>
					</div>

					<!-- 一等奖数据列表 -->
					<div class="web">
						<!--数据列表-->
						<div class="item" v-for="(item,index) in personList">
							<div class="left">
								<img src="../../assets/images/draw/photo0.png" alt="">
							</div>
							<div class="right">
								<div>
									<p>手机用户</p>
									<p><span>{{item.bonus}}</span>元</p>
								</div>
								<p class="num">{{item.phoneNum}}</p>
								<p class="tip">{{item.speech}}</p>
							</div>
						</div>
						<loading v-if="show"></loading>
						<noMore v-if="showNomore"></noMore>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import videojs from 'video.js'
	import BScroll from 'better-scroll'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import settingHeader from '../../components/setting_header'
	import Loading from '../../components/loading'
	import noMore from '../../components/noMore'

	import VueDPlayer from 'vue-dplayer'
	import 'vue-dplayer/dist/vue-dplayer.css'
	export default {
		components: {
			swiper,
			swiperSlide,
			settingHeader,
			Loading,
			noMore,
			'd-player': VueDPlayer
		},
		data() {
			return {
				periodVideo: '第1235期 抽奖视频',
				options: {
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
						url: './static/video/movie.mp4',
						pic: './static/images/video.jpg'
					}
				},
				show: false,
				showNomore: false,
				swiperOption: {
					autoHeight: true,
					slidesPerView: 'auto',
					spaceBetween: 10
				},
				title: '往期回顾',
				showContent: false,
				list: [{
						bonus: '5000元',
						award: '一等奖',
						number: '共40名'
					},
					{
						bonus: '1000元',
						award: '二等奖',
						number: '共800名'
					},
					{
						bonus: '200元',
						award: '三等奖',
						number: '共4000名'
					},
					{
						bonus: '200元',
						award: '三等奖',
						number: '共4000名'
					}
				],
				swiperOption1: {
					autoHeight: true,
					slidesPerView: 'auto',
					spaceBetween: 10
				},
				act1: 0,
				data1: ['一等奖', '二等奖', '三等奖', '四等奖', '特等奖', '幸运奖'],
				data3: [1234, 1235, 1236, 1237, 1238, 1239, 1240, 1241, 1242, 1243],
				act3: 0,
				personList: [{
						bonus: '5000',
						phoneNum: '130****0124',
						speech: '第一次抽奖就中了一等奖，好高兴啊！'
					},
					{
						bonus: '5000',
						phoneNum: '130****0124',
						speech: '第一次抽奖就中了一等奖，好高兴啊！'
					},
					{
						bonus: '5000',
						phoneNum: '130****0124',
						speech: '第一次抽奖就中了一等奖，好高兴啊！'
					},
					{
						bonus: '5000',
						phoneNum: '130****0124',
						speech: '第一次抽奖就中了一等奖，好高兴啊！'
					},
					{
						bonus: '5000',
						phoneNum: '130****0124',
						speech: '第一次抽奖就中了一等奖，好高兴啊！'
					},
					{
						bonus: '5000',
						phoneNum: '130****0124',
						speech: '第一次抽奖就中了一等奖，好高兴啊！'
					},
					{
						bonus: '5000',
						phoneNum: '130****0124',
						speech: '第一次抽奖就中了一等奖，好高兴啊！'
					}
				],
				swiperOption2: {
					autoHeight: true,
					slidesPerView: 'auto',
					spaceBetween: 10
				},

				player: {},
				playerStop: true,

				curPage: 1,
				pageSize: 10,
				list:[]
			}
		},
		computed: {
			player() {
				return this.$refs.videoPlayer.player
			}
		},
		created() {

			this.getInfoById()
			this.getAwardUserList()
		},
		mounted() {
			this.InitScroll()

			this.player = this.$refs.player.dp
			document.getElementsByClassName('dplayer-full-in-icon')[0].style.display = 'none'
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
						console.log(res.data.data)
					}
				})
			},
			getAwardUserList() {
				var _this = this

				_this.$http.get(_this.url.lottery.getAwardUserList, {
					params: {
						lotteryId: _this.$route.query.lotteryId,
						awardId: 1,
						curPage: _this.curPage,
						pageSize: _this.pageSize
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						console.log(res.data.data)
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
			periodActive(index) {
				console.log('[][', index)
				this.act3 = index
			},
			//中奖人员 一等奖
			actice(index) {
				this.act1 = index
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
				if(_this.showNomore) {
					_this.show = false;
					return
				}
				_this.show = true;
				setTimeout(function() {
					_this.show = false;
					_this.showNomore = true;
				}, 3000)
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
					height: 0.78rem;
					display: flex;
					margin-bottom: 0.1rem;
					align-items: center;
					padding: 0 0.18rem;
					box-sizing: border-box;
					.flex {
						display: flex;
						flex: 1;
						div:nth-child(1) {
							line-height: 0.64rem;
						}
						div:nth-child(2) {
							color: #FFEEB3;
							font-size: 0.42rem;
							.small {
								font-size: 0.2rem;
							}
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
					width: 1.128rem;
					height: 0.66rem;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 0.3rem;
					background-color: #E1E1E1;
					border-radius: 3px;
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
				width: 1.1rem;
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
				height: 4.2rem;
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
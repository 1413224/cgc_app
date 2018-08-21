<template>
	<section style="background-color: #E32921;height: 100%;">
		<div class="luckyrank">
			<settingHeader :title="title"></settingHeader>
			<tab class="tab_box" active-color="#E32921" custom-bar-width="80px" default-color="#333">
				<tab-item :selected="tabIndex == 0" @on-item-click="showTab">中奖次数</tab-item>
				<tab-item :selected="tabIndex == 1" @on-item-click="showTab">中奖累计金额</tab-item>
			</tab>
			<div class="wrapper" ref="wrapper" :class="{'wrapper-top':!$store.state.page.isWx}">
				<div class="content">
					<div class="top">
						<div class="one_box">
							<span>奖励排名</span><span>{{tabIndex == 0 ?'奖励次数':'奖励金额(元)'}}</span>
						</div>
						<div class="two_box">
							<div class="left">
								<img v-if="userRank.thumb" :src="userRank.thumb.original" />
								<img v-else :src="'./static/images/mrtx.png'" alt="">
								<div>
									<p>排名：第{{userRank.ranking}}</p>
									<p>我</p>
								</div>
							</div>
							<p class="pm" v-if="$store.state.page.isLogin == 'true'">{{tabIndex == 0 ?userRank.number:userRank.lotteryBonus}}</p>
							<div v-else class="login_btn" @click="$router.push({path:'/user/reg'})">点击登录</div>
						</div>
					</div>
					<div class="bottom">
						<div class="item_box" v-for="(item,index) in numberList">
							<div class="left">
								<div>
									<img v-if="item.thumb" class="tx" :src="item.thumb.original" alt="">
									<img v-else class="tx" :src="'./static/images/mrtx.png'" alt="">
									<img class="pa_img" v-if="index == 0" :src="'./static/draw/diyi.png'" alt="">
									<img class="pa_img" v-if="index == 1" :src="'./static/draw/dier.png'" alt="">
									<img class="pa_img" v-if="index == 2" :src="'./static/draw/disan.png'" alt="">
								</div>
								<div>
									<div class="diyi" :class="index<3 ? 'diyi'+Number(index+1) : 'color'">NO.{{ item.ranking}}</div>
									<p>{{item.mobile}}</p>
								</div>
							</div>
							<div class="right">{{tabIndex == 0 ?item.number : item.lotteryBonus}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import { ButtonTab, ButtonTabItem } from 'vux'
	import BScroll from 'better-scroll'
	import Loading from '../../components/loading'
	import noMore from '../../components/noMore'
	import settingHeader from '../../components/setting_header'
	import url from '../../config/url'
	import Qs from 'qs'
	export default {
		data() {
			return {
				title: '幸运排行',
				rankData: [0],
				tab1: true,
				tab2: false,
				rankList: {
					lists: []
				},
				show: false,
				showNomore: false,
				moneyList: {},
				numberList: {},
				userRank: {},
				page: 1,
				tabIndex: 0,
			}
		},
		components: {
			ButtonTab,
			ButtonTabItem,
			Loading,
			noMore,
			settingHeader
		},
		created() {
			this.tabIndex = this.$route.query.index || 0
			this.getLotteryRankByNums()
		},
		mounted() {
			this.InitScroll()
		},
		watch: {
			tabIndex() {
				if(this.tabIndex == 0) {
					this.getLotteryRankByNums()
				} else {
					this.getLotteryRankByBonus()
				}
			}
		},
		methods: {
			showTab(val) {
				this.tabIndex = val
			},
			getLotteryRankByNums() {
				var _this = this

				_this.$http.get(_this.url.lottery.getLotteryRankByNums, {
					params: {
						userId: _this.$store.state.user.userId,
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.numberList = res.data.data.rankList
						_this.userRank = res.data.data.userRank
					}
				})
			},
			getLotteryRankByBonus() {
				var _this = this

				_this.$http.get(_this.url.lottery.getLotteryRankByBonus, {
					params: {
						userId: _this.$store.state.user.userId,
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.numberList = res.data.data.rankList
						_this.userRank = res.data.data.userRank
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
					} else {
						this.scroll.refresh()
					}
				})

			}
		}
	}
</script>
<style lang="less">
	.luckyrank {
		.tab_box .vux-tab .vux-tab-item {
			font-size: 0.36rem;
			font-family: PingFang-SC-Medium;
			color: rgba(227, 41, 33, 1);
		}
	}
</style>
<style lang="less" scoped>
	.luckyrank {
		padding: 0 0.3rem;
		box-sizing: border-box;
		position: relative;
		height: 100%;
		.wrapper {
			position: absolute;
			top: 0.8rem;
			left: 0;
			bottom: 0;
			width: 100%;
			padding: 0 0.30rem;
			box-sizing: border-box;
			overflow: hidden;
			.content {
				background: rgba(255, 245, 245, 1);
				.top {
					height: 2.27rem;
					background-color: white;
					padding: 0 0.20rem;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					.one_box {
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;
						font-size: 0.24rem;
						font-family: PingFang-SC-Medium;
						color: rgba(160, 160, 160, 1);
					}
					.two_box {
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-top: 0.30rem;
						.left {
							display: flex;
							img {
								width: 0.89rem;
								height: 0.89rem;
								margin-right: 0.30rem;
								border-radius: 50%;
							}
							p:nth-child(1) {
								font-size: 0.26rem;
								font-family: PingFang-SC-Medium;
								color: rgba(160, 160, 160, 1);
							}
							p:nth-child(2) {
								font-size: 0.32rem;
								font-family: PingFang-SC-Medium;
								color: rgba(26, 38, 66, 1);
							}
						}
						.pm {
							font-size: 0.32rem;
							font-family: GillSansMT;
							color: rgba(227, 41, 33, 1);
						}
						.login_btn {
							width: 1.64rem;
							height: 0.58rem;
							line-height: 0.58rem;
							text-align: center;
							background: linear-gradient(0deg, rgba(255, 42, 75, 1), rgba(255, 92, 52, 1));
							border-radius: 29px;
							box-shadow: 0px 9px 33px 3px rgba(255, 53, 70, 0.4);
							font-size: 0.24rem;
							font-family: PingFang-SC-Regular;
							color: rgba(255, 255, 255, 1);
						}
					}
				}
				.bottom {
					margin-top: 0.20rem;
					background-color: white;
					padding: 0.1rem 0.30rem 0.1rem;
					box-sizing: border-box;
					.item_box {
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-bottom: 0.30rem;
						.left {
							display: flex;
							align-items: center;
							div:nth-child(1) {
								display: flex;
								align-items: center;
								position: relative;
								img {
									width: 0.89rem;
									height: 0.89rem;
									border-radius: 50%;
									position: relative;
									z-index: 15;
								}
								.pa_img {
									width: 0.42rem;
									height: 0.37rem;
									position: absolute;
									top: -12%;
									left: -15%;
									z-index: 11;
								}
							}
							div:nth-child(2) {
								margin-left: 0.30rem;
								.diyi {
									width: 1.0rem;
									height: 0.34rem;
									display: flex;
									align-items: center;
									justify-content: center;
									font-size: 0.26rem;
									font-family: DINOT-Medium;
									color: rgba(255, 255, 255, 1);
									margin-bottom: 0.10rem;
								}
								.diyi1 {
									background: url(../../../static/draw/diyi_bg.png) no-repeat;
									background-size: 100% 100%;
								}
								.diyi2 {
									background: url(../../../static/draw/dier_bg.png) no-repeat;
									background-size: 100% 100%;
								}
								.diyi3 {
									background: url(../../../static/draw/disan_bg.png) no-repeat;
									background-size: 100% 100%;
								}
								.color {
									font-size: 0.26rem;
									font-family: DINOT-Medium;
									color: rgba(0, 0, 0, 1);
								}
								p {
									font-size: 0.26rem;
									font-family: PingFang-SC-Medium;
									color: rgba(160, 160, 160, 1);
								}
							}
						}
						.right {
							font-size: 0.26rem;
							font-family: PingFang-SC-Medium;
							color: #E32921;
						}
					}
				}
			}
		}
		.wrapper-top {
			top: 1.63rem!important;
		}
	}
</style>
<template>
	<section class="win-box">
		<settingHeader :title="title"></settingHeader>
		<div class="wrapper" ref="wrapper" :class="{'wrapper-top':!$store.state.page.isWx}">
			<div class="content" v-if="list.length>0">
				<div class="record-item" v-for="(item,index) in list" :key="index">
					<div class="top">
						<div>{{item.number}}</div>
						<p>{{item.title}}</p>
					</div>
					<div class="middle">
						<div class="left">
							<p>中奖金额</p>
							<p><i>￥</i>{{item.userBonus}}</p>
						</div>
						<div class="btn" :class="{'jz':item.status != 60 && item.status != 70}" @click="toReceive(item.id,item.status)">
							<p v-if="item.status == 10">领奖</p>
							<p v-if="item.status == 20">待审核</p>
							<p v-if="item.status == 30">立即领取</p>
							<p v-if="item.status == 40">审核失败</p>
							<p v-if="item.status == 50">待线下领奖</p>
							<p v-if="item.status == 60">已领奖</p>
							<p v-if="item.status == 70">已过期</p>
						</div>
					</div>
					<div class="bottom">
						<ul>
							<li>
								<span>开奖时间</span><span>{{item.orderCreateTime}}</span>
							</li>
							<li class="bg_red">
								<span>参与人数</span><span>{{item.orderNum}} 人</span>
							</li>
							<li>
								<span>奖金池</span><span>{{item.bonus}}</span>
							</li>
						</ul>
					</div>
					<!--<img class="zj-img" :src="item.isReceive?'./static/draw/ylq.png':'./static/draw/yzj.png'" />-->
				</div>

				<loading v-if="showLoading"></loading>
				<noMore v-if="showNomore"></noMore>
			</div>
			<div class="no_data_box" v-else>
				<div class="bw-box">
					<div>
						<img :src="'./static/draw/no-data-img.png'" alt="" />
						<p>您还没有中奖记录</p>
					</div>
					<div>
						<div @click="$router.push({path:'/share/storelist'})">我要抽奖</div>
						<p class="tip1">温馨提示：</p>
						<p class="tip2">只要在平台上消费任意一笔订单，就能参加周末幸运大抽奖</p>
					</div>
				</div>
			</div>
		</div>

		<!-- 弹出框 -->
		<div v-transfer-dom class="win-tc-box">
			<x-dialog v-model="showDialog" :hide-on-blur="true">
				<div class="tc-box">
					<div class="top">
						<p>第12期 周末幸运大抽奖</p>
						<p>恭喜您赢得大奖</p>
					</div>
					<div class="bottom">
						<p>奖金领取成功</p>
						<img :src="'./static/draw/dian.png'" alt="" />
						<p class="money">￥<span>5000</span></p>
						<div @click="$router.push({path:'/member/purse/wallet'})">查看我的资产</div>
					</div>
				</div>
				<div class="close" @click="showDialog=false"><img src="../../assets/images/draw/open.png"></div>
			</x-dialog>
		</div>
	</section>
</template>

<script>
	import { ButtonTab, ButtonTabItem, XDialog } from 'vux'
	import BScroll from 'better-scroll'
	import Loading from '../../components/loading'
	import noMore from '../../components/noMore'
	import settingHeader from '../../components/setting_header'
	export default {
		components: {
			ButtonTab,
			ButtonTabItem,
			Loading,
			noMore,
			settingHeader,
			XDialog
		},
		data() {
			return {
				title: '中奖记录',
				showLoading: false,
				showNomore: false,
				showDialog: false,
				recordList: [],

				curPage: 1,
				pageSize: 10,
				list: []
			}
		},
		created() {
			this.getUserLotteryRecord()
		},
		mounted() {
			if(this.recordList.length > 0) {
				this.InitScroll()
			}
		},
		methods: {
			getUserLotteryRecord() {
				var _this = this

				_this.$http.get(_this.url.lottery.getUserLotteryRecord, {
					params: {
						userId: _this.$store.state.user.userId,
						curPage: _this.curPage,
						pageSize: _this.pageSize
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						if(res.data.data.list.length > 0) {
							_this.list = res.data.data.list
						}
					}
				})
			},
			//领奖
			toReceive(id, status) {
				//				if(!Boolean) {
				//					this.showDialog = true
				//				}

				var _this = this

				if(status == 10 || status == 30) {
					_this.$http.post(_this.url.lottery.getBonus, {
						userId: _this.$store.state.user.userId,
						id: 2
					}).then((res) => {
						if(res.data.status == "00000000") {
							var message = ''
							var buttons = []
							if(res.data.data.status == 10) {
								message = '您仍尚未实名认证'
								buttons =  ['马上认证', '取消']
							}else if(res.data.data.status == 20){
								message = '您仍需完善资料'
								buttons =  ['前去完善', '取消']
							}else if(res.data.data.status == 30){
								message = '您仍需绑定银行卡'
								buttons =  ['马上绑定', '取消']
							}else if(res.data.data.status == 50){
								message = '审核中'
							}else if(res.data.data.status == 60){
								message = '您需要线下领奖'
							}else if(res.data.data.status == 70){
								message = '已经过了领取截止时间'
							}else if(res.data.data.status == 80){
								message = '领取成功'
							}

							_this.$dialog.show({
								type: 'warning',
								headMessage: '提示',
								message:message,
								buttons:buttons,
								canel() {

								},
								confirm() {

								}
							})
						}
					})
				}
			},
			InitScroll() {
				this.$nextTick(() => {
					if(!this.scroll) {
						this.scroll = new BScroll(this.$refs.wrapper, {
							click: true,
							scrollY: true,
							pullUpLoad: {
								threshold: -30
							}
						})
						this.scroll.on('pullingUp', (pos) => {
							//							this.LoadData()
							//
							//							this.showLoading = true

							this.$nextTick(function() {
								this.scroll.finishPullUp()
								this.scroll.refresh()
							})
						})

					} else {
						this.scroll.refresh()
						this.scroll2.refresh()
					}
				})

			},
			LoadData() {
				var _this = this

				_this.recordList = _this.recordList.concat({
					form: '国美番禺店大抽奖',
					periods: '1238期',
					time: '2018-03-12 20',
					peopleNum: '600',
					allMoney: '80000.00',
					has: '2000.00',
					isReceive: false
				})
				setTimeout(function() {
					_this.showLoading = false
				}, 1000)
			}
		}

	}
</script>
<style lang="less">
	.win-tc-box {
		.weui-dialog {
			width: 5.90rem;
			max-width: 5.90rem;
			.tc-box {
				width: 5.90rem;
				height: 6.95rem;
				background: url(../../../static/draw/zhongjiang-bg.png) no-repeat;
				background-size: 100% 100%;
				display: flex;
				flex-direction: column;
				.top {
					height: 1.44rem;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					p:nth-child(1) {
						font-size: 0.3rem;
						font-family: PingFang-SC-Medium;
						color: rgba(255, 255, 255, 1);
					}
					p:nth-child(2) {
						font-size: 0.42rem;
						font-family: PingFang-SC-Bold;
						color: rgba(255, 255, 255, 1);
						font-weight: bold;
					}
				}
				.bottom {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: space-between;
					flex-direction: column;
					padding: 0.75rem 0.37rem 0.92rem;
					img {
						width: 3.16rem;
						height: 0.04rem;
					}
					p:nth-child(1) {
						font-size: 0.32rem;
						font-family: PingFang-SC-Medium;
						color: rgba(51, 51, 51, 1);
					}
					.money {
						font-size: 0.28rem;
						font-family: PingFang-SC-Bold;
						color: rgba(227, 41, 33, 1);
						span {
							font-size: 1.1rem;
							font-family: PingFang SC;
						}
					}
					div {
						width: 5.17rem;
						height: 0.79rem;
						line-height: 0.79rem;
						text-align: center;
						background: linear-gradient(45deg, rgba(255, 92, 52, 1), rgba(255, 42, 75, 1));
						border-radius: 40px;
						box-shadow: 7px 9px 27px rgba(255, 53, 70, 0.4);
						font-size: 0.28rem;
						font-family: PingFang-SC-Medium;
						color: rgba(255, 255, 255, 1);
					}
				}
			}
			.close {
				text-align: center;
				img {
					width: 0.75rem;
					height: 1.25rem;
				}
			}
		}
	}
</style>
<style lang="less" scoped>
	.win-box {
		.wrapper-top {
			top: 6%!important;
		}
		.wrapper {
			position: absolute;
			top: 0;
			bottom: 0;
			width: 100%;
			height: 100%;
			overflow: hidden;
			background-color: #E32922;
			padding: 0 0.2rem;
			box-sizing: border-box;
			.content {
				padding: 0.2rem 0;
				.record-item {
					width: 7.10rem;
					background: rgba(255, 255, 255, 1);
					border-radius: 8px;
					/*padding: 0 0.1rem;
					box-sizing: border-box;*/
					margin-bottom: 0.2rem;
					position: relative;
					overflow: hidden;
					.zj-img {
						position: absolute;
						top: -7%;
						right: -0.05%;
						width: 1.53rem;
						height: 1.53rem;
					}
					.top {
						height: 1.14rem;
						display: flex;
						align-items: center;
						padding-left: 0.43rem;
						border-bottom: 1px solid #F3F3F3;
						p {
							font-size: 0.36rem;
							font-family: PingFang-SC-Medium;
							color: rgba(51, 51, 51, 1);
							margin-left: 0.15rem;
						}
						div {
							width: 0.97rem;
							height: 0.38rem;
							line-height: 0.38rem;
							background: linear-gradient(-121.4deg, #AF51FF, #9013FE);
							border-radius: 3px;
							font-size: 0.26rem;
							font-family: PingFang-SC-Medium;
							color: rgba(255, 255, 255, 1);
							text-align: center;
							margin-left: 0.1rem;
						}
					}
					.middle {
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 0.30rem 0.43rem;
						border-bottom: 1px solid #F3F3F3;
						.left {
							p:nth-child(1) {
								font-size: 0.26rem;
								font-family: PingFang-SC-Medium;
								color: rgba(160, 160, 160, 1);
							}
							p:nth-child(2) {
								font-size: 0.72rem;
								font-family: PingFang-SC-Medium;
								color: rgba(227, 41, 33, 1);
								margin-top: 0.45rem;
								i {
									font-size: 0.48rem;
								}
							}
						}
						.btn {
							width: 1.96rem;
							height: 0.96rem;
							line-height: 0.96rem;
							text-align: center;
							background: rgba(225, 225, 225, 1);
							border-radius: 48px;
							font-size: 0.32rem;
							font-family: PingFang-SC-Medium;
							color: rgba(255, 255, 255, 1);
						}
						.jz {
							box-shadow: 7px 9px 27px rgba(255, 53, 70, 0.4);
							background: linear-gradient(-121.4deg, #FF5C34, #FF2A4B);
						}
					}
					.bottom {
						padding: 0.30rem 0rem;
						display: flex;
						justify-content: space-between;
						align-items: center;
						p {
							font-size: 0.26rem;
							font-family: PingFang-SC-Medium;
							color: rgba(102, 102, 102, 1);
							span {
								color: #E32921;
							}
						}
						ul {
							width: 100%;
							li {
								height: 0.87rem;
								display: flex;
								align-items: center;
								padding: 0 .43rem;
								box-sizing: border-box;
								span:nth-child(1) {
									width: 1.2rem;
									font-size: 0.26rem;
									font-family: PingFang-SC-Medium;
									color: rgba(160, 160, 160, 1);
									display: inline-block;
								}
								span:nth-child(2) {
									margin-left: 0.50rem;
									color: #666666;
									font-family: PingFang-SC-Medium;
								}
							}
							.bg_red {
								background: rgba(255, 245, 245, 1);
							}
						}
					}
				}
			}
			.no_data_box {
				width: 100%;
				height: 100%;
				background-color: #E32922;
				padding: 0.2rem;
				box-sizing: border-box;
				.bw-box {
					/*width: 7.10rem;*/
					height: 8.07rem;
					margin-top: .5rem;
					background: rgba(255, 255, 255, 1);
					border-radius: 4px;
					padding: 0.6rem;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					justify-content: space-between;
					flex-direction: column;
					div:nth-child(1) {
						img {
							width: 2.74rem;
							height: 2.74rem;
							margin-bottom: 0.27rem;
						}
						p {
							font-size: 0.32rem;
							font-family: PingFang-SC-Medium;
							color: rgba(51, 51, 51, 1);
						}
					}
					div:nth-child(2) {
						div {
							width: 6.30;
							height: 0.96rem;
							line-height: 0.96rem;
							text-align: center;
							background: linear-gradient(-121.4deg, #FF2A4B, #FF5C34);
							border-radius: 48px;
							box-shadow: 7px 9px 27px rgba(255, 53, 70, 0.4);
							font-size: 0.36rem;
							font-family: PingFang-SC-Medium;
							color: rgba(255, 255, 255, 1);
							margin-bottom: 0.32rem;
						}
						.tip1 {
							font-size: 0.2rem;
							font-family: PingFang-SC-Medium;
							color: rgba(227, 41, 33, 1);
						}
						.tip2 {
							color: #A0A0A0;
							font-family: PingFang-SC-Medium;
							font-size: 0.2rem;
							margin-top: 0.05rem;
						}
					}
				}
			}
		}
	}
</style>
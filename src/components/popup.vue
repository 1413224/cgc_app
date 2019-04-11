<template>
	<div class="tc-box">
		<!-- 中奖弹出框 -->
		<div class="win-tc-box">
			<x-dialog v-model="showZj" class="zjBox" :hide-on-blur="true">
				<div class="tc-box" v-if="show && showZj">
					<div class="top">
						<p>周末幸运大抽奖</p>
					</div>
					<div class="bottom">
						<p>中奖金额</p>
						<img :src="'./static/draw/dian.png'" alt="" />
						<p class="money">
							<span>{{showData.bonus}}</span>元
						</p>
						<p style="color: #10aeff;">您已累计中奖{{showData.bonusNums}}次</p>
						<div @click="toWining">立即领取</div>
					</div>
				</div>
				<div class="close" @click="showZj=false">
					<img src="../assets/images/draw/open.png">
				</div>
			</x-dialog>
		</div>
		<!--购物奖励弹窗-->
		<x-dialog v-model="showSr" class="xrBox" :hide-on-blur="true">
			<div class="p_box" v-if="show  && showSr">
				<img @click="showNew = false" class="xr_img" :src="'./static/images/xr_bg.png'" alt="" />
				<div class="p_content">
					<div class="top">您已经累计了 <i>{{showData.nums}}</i> 笔收益</div>
					<div class="bottom">
						<div class="hp">
							<p class="red" v-if="showData.balance > 0"><i>+ </i>{{showData.balance}}<span> 通用积分</span></p>
							<p class="red" v-if="showData.points > 0"><i>+ </i>{{showData.points}}<span> 信用积分</span></p>
						</div>
						<p>通用积分将自动存入您的资产余额</p>
						<p @click="toWallet">查看明细<i class="iconfont icon-arrow-right"></i></p>
					</div>
				</div>
				<img @click="showSr = false" class="gb_img" :src="'./static/images/xr_gb.png'" alt="" />
			</div>
		</x-dialog>

		<!--新人奖励弹窗-->
		<x-dialog v-model="showZc" class="zcBox" :hide-on-blur="true">
			<div class="zc_box">
				<div class="zc_content">
					<!-- <div style="min-height: 3rem;">
						<div class="item_box" v-for="(item,index) in zcList" :key="index">
							<div>
								<p>{{item.jf}}</p>
								<p>自动存入信用积分</p>
							</div>
							<div>
								<p>¥ <span>{{item.money}}</span></p>
								<p>{{item.mk}}</p>
							</div>
						</div>
					</div>
					<div class="zc-btn" @click="toReg">
						立即注册
					</div> -->
					<div class="close" @click="showZc = false"><img src="../../static/images/close.png" alt=""></div>
					<div class="gozc" @click="toReg"><img src="../../static/images/gozc.png" alt=""></div>
				</div>
			</div>
			<!-- <img @click="showZc = false" class="gb_img" :src="'./static/images/xr_gb.png'" alt="" /> -->
		</x-dialog>

		<!--设置支付密码弹窗-->
		<x-dialog v-model="showPay" class="payBox" :hide-on-blur="true">
			<div class="pay_box">
				<div class="pay_content">
					<img :src="'./static/images/payphone.png'" />
					<p class="one">请设置支付密码</p>
					<p class="two">用于交易、付款、收货等操作</p>
					<div class="pay-btn" @click="toPay">
						立即设置
					</div>
				</div>
			</div>
			<img @click="showPay = false" class="gb_img" :src="'./static/images/xr_gb.png'" alt="" />
		</x-dialog>
	</div>
</template>

<script>
	import { XDialog } from 'vux'
	export default {
		props: {
			showSr: {
				type: Boolean,
				default: false
			},
			showZc: {
				type: Boolean,
				default: false
			},
			showPay: {
				type: Boolean,
				default: false
			},
			showZj: {
				type: Boolean,
				default: false
			},
		},
		components: {
			XDialog
		},
		data() {
			return {
				zcList: [{
					jf: '信用积分',
					money: '1000',
					mk: '1:1现金使用'
				}],
				show: false
			}
		},
		created() {

		},
		mounted() {
			var _this = this
			setTimeout(function() {
				_this.show = true
			}, 1000)
		},
		methods: {
			toReg() {
				this.vm.$router.push({
					path: '/user/login'
				})
			},
			toPay() {
				this.vm.$router.push({
					path: '/user/changePaymentPassword'
				})
			},
			toWining() {
				this.vm.$router.push({
					path: '/draw/winning'
				})
			},
			toWallet() {
				this.vm.$router.push({
					path: '/member/purse/wallet'
				})
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
				background: url(../../static/draw/zhongjiang-bg.png) no-repeat;
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
<style lang='less'>
	.zcBox {
		.weui-dialog {
			width: 80%!important;
			max-width: 80%!important;
		}
	}
	
	.payBox {
		.weui-dialog {
			width: 6.10rem;
			height: 6.33rem;
			max-width: 100%;
		}
	}
</style>
<style lang="less" scoped>
	.payBox {
		.pay_content {
			padding: 0.44rem 0.23rem;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			align-items: center;
			background: rgba(255, 255, 255, 1);
			border-radius: 3px;
			img {
				width: 4.33rem;
				height: 2.66rem;
			}
			.one {
				font-size: 0.32rem;
				font-family: PingFangSC-Medium;
				color: rgba(26, 38, 66, 1);
				margin: 0.26rem 0 0.14rem 0;
			}
			.two {
				font-size: 0.26rem;
				font-family: PingFangSC-Regular;
				color: rgba(144, 162, 199, 1);
			}
			.pay-btn {
				width: 5.71rem;
				height: 0.8rem;
				line-height: 0.8rem;
				background: rgba(51, 111, 255, 1);
				font-size: 0.32rem;
				font-family: PingFangSC-Medium;
				color: rgba(255, 255, 255, 1);
				margin-top: 0.6rem;
				border-radius: 3px;
			}
		}
		.gb_img {
			width: 0.82rem;
			height: 0.82rem;
			margin-top: 0.33rem;
		}
	}
	
	.zcBox {
		.zc_box {
			width: 100%;
			height: 100%;
			.zc-btn {
				width: 5.16rem;
				height: 0.8rem;
				line-height: 0.8rem;
				background: rgba(255, 204, 9, 1);
				border-radius: 4px;
				font-size: 0.34rem;
				font-family: PingFangSC-Semibold;
				color: rgba(209, 14, 22, 1);
				margin: 0 auto;
				margin-top: 0.2rem;
			}
			.zc_content {
				box-sizing: border-box;
				background:url(../../static/images/zc2.png) no-repeat;
				background-size: 100% 100%;
				position: relative;
				border-radius: 6px;
				width: 100%;
				height: 5.8rem;
				.close {
					position: absolute;
					top: 0rem;
					right: .6rem;
					width: 0.5rem;
					height: .5rem;
					img {
						width: 100%;
						height: 100%;
					}
				}
				.gozc {
					position: absolute;
					bottom: 1.1rem;
					left: 2.0rem;
					width: 2.3rem;
					height: 0.6rem;
					img {
						width: 100%;
						height: 100%;
					}
				}
				.item_box {
					background: url(../../static/images/it_bg.png) no-repeat;
					background-size: 100% 100%;
					padding: 0.2rem;
					box-sizing: border-box;
					display: flex;
					margin-bottom: 0.2rem;
					div:nth-child(1) {
						width: 3rem;
						display: flex;
						flex-direction: column;
						align-items: flex-start;
						justify-content: space-between;
						p:nth-child(1) {
							font-size: 0.28rem;
							font-family: PingFangSC-Medium;
							color: rgba(15, 24, 45, 1);
						}
						p:nth-child(2) {
							font-size: 0.24rem;
							font-family: PingFangSC-Regular;
							color: rgba(115, 134, 173, 1);
						}
					}
					div:nth-child(2) {
						flex: 1;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: space-between;
						height: 100%;
						p:nth-child(1) {
							font-size: 0.26rem;
							font-family: PingFangSC-Regular;
							color: rgba(242, 48, 48, 1);
							span {
								font-size: 0.6rem;
								font-family: PingFangSC-Medium;
								color: rgba(242, 48, 48, 1);
							}
						}
						p:nth-child(2) {
							font-size: 0.24rem;
							font-family: PingFangSC-Regular;
							color: rgba(115, 134, 173, 1);
						}
					}
				}
				.item_box:last-child {
					margin-bottom: 0px!important;
				}
			}
		}
		.gb_img {
			width: 0.6rem;
			height: 0.6rem;
			margin-top: 0.2rem;
		}
	}
	
	.xrBox {
		.p_box {
			position: relative;
			.xr_img {
				width: 100%;
				height: auto;
			}
			.p_content {
				height: 2.54rem;
				width: 100%;
				position: absolute;
				top: 46%;
				left: 50%;
				transform: translate(-50%, -46%);
				display: flex;
				flex-direction: column;
				.top {
					height: 0.78rem;
					line-height: 0.78rem;
					text-align: center;
					font-size: 0.28rem;
					font-family: PingFangSC-Semibold;
					color: rgba(164, 113, 57, 1);
					i {
						color: #F23030;
						font-family: PingFangSC;
					}
				}
				.bottom {
					flex: 1;
					.hp {
						height: 1.2rem;
						display: flex;
						align-items: center;
						flex-direction: column;
						justify-content: center;
						.red {
							font-size: 0.40rem;
							font-family: PingFangSC-Semibold;
							color: rgba(242, 48, 48, 1);
							span {
								font-size: 0.24rem;
								font-family: PingFangSC-Regular;
								color: rgba(242, 48, 48, 1);
							}
							i {
								font-family: PingFangSC-Semibold;
								color: rgba(242, 48, 48, 1);
							}
						}
					}
					p:nth-child(2) {
						font-size: 0.22rem;
						font-family: PingFangSC-Regular;
						color: rgba(164, 113, 57, 1);
					}
					p:nth-child(3) {
						font-size: 0.24rem;
						font-family: PingFangSC-Medium;
						color: rgba(164, 113, 57, 1);
						display: flex;
						align-items: center;
						justify-content: center;
						margin-top: 0.2rem;
					}
				}
			}
			.gb_img {
				width: 0.82rem;
				height: 0.82rem;
				margin-top: 0.33rem;
			}
		}
	}
</style>
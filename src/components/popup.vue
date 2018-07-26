<template>
	<div class="tc-box">
		<!--购物奖励弹窗-->
		<x-dialog v-model="showSr" class="xrBox">
			<div class="p_box">
				<img @click="showNew = false" class="xr_img" :src="'./static/images/xr_bg.png'" alt="" />
				<div class="p_content">
					<div class="top">您又到账了 <i>5</i> 笔收益</div>
					<div class="bottom">
						<p><i>+ </i>7.20 <span>通用积分</span></p>
						<p>通用积分将自动存入您的资产余额</p>
						<p>查看明细<i class="iconfont icon-arrow-right"></i></p>
					</div>
				</div>
				<img @click="showSr = false" class="gb_img" :src="'./static/images/xr_gb.png'" alt="" />
			</div>
		</x-dialog>

		<!--新人奖励弹窗-->
		<x-dialog v-model="showZc" class="zcBox">
			<div class="zc_box">
				<div class="zc_content">
					<div class="item_box" v-for="(item,index) in zcList" :key="index">
						<div>
							<p>{{item.jf}}</p>
							<p>自动存入通用积分</p>
						</div>
						<div>
							<p>¥ <span>{{item.money}}</span></p>
							<p>{{item.mk}}</p>
						</div>
					</div>
					<div class="zc-btn" @click="toReg">
						立即注册
					</div>
				</div>
			</div>
			<img @click="showZc = false" class="gb_img" :src="'./static/images/xr_gb.png'" alt="" />
		</x-dialog>

		<!--新人奖励弹窗-->
		<x-dialog v-model="showPay" class="payBox">
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
		},
		components: {
			XDialog
		},
		data() {
			return {
				zcList: [{
						jf: '通用积分',
						money: '10',
						mk: '无门槛全场使用'
					},
					{
						jf: '通用积分',
						money: '20',
						mk: '满50减10'
					},
					{
						jf: '通用积分',
						money: '30',
						mk: '无门槛全场使用'
					}
				]
			}
		},
		created() {

		},
		mounted() {

		},
		methods: {
			toReg() {
				this.vm.$router.push({
					path: '/user/reg'
				})
			},
			toPay() {
				this.vm.$router.push({
					path: '/user/changePaymentPassword'
				})
			},
		}
	}
</script>

<style lang='less'>
	.zcBox {
		.weui-dialog {
			width: 5.5rem;
			max-width: 100%;
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
				padding: 1.8rem 0.2rem 0.35rem 0.2rem;
				box-sizing: border-box;
				background: url(../../static/images/zc_bg.png) no-repeat;
				background-size: 100% 100%;
				position: relative;
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
					p:nth-child(1) {
						font-size: 0.68rem;
						font-family: PingFangSC-Semibold;
						color: rgba(242, 48, 48, 1);
						span {
							font-size: 0.24rem;
							font-family: PingFangSC-Regular;
							color: rgba(242, 48, 48, 1);
						}
						i {
							font-size: 0.48rem;
							font-family: PingFangSC-Semibold;
							color: rgba(242, 48, 48, 1);
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
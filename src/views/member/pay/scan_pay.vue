<template>
	<div class="scan_pay_box">

		<settingHeader title="向商家付款"></settingHeader>
		<div class="b-w">
			<div class="shop_info_box">
				<img class="shop_logo" :src="'./static/images/shopLogo.png'" />
				<p class="shop_name">付款给商户 <span>7-Eleven(番天2店)</span></p>
			</div>
			<div class="input_box">
				<p class="tip">付款金额：</p>
				<div class="input-div">
					<x-input title="¥" v-model="moneyNum" type="number" ref="input" placeholder="请输入付款金额" :show-clear="false"></x-input>
				</div>
			</div>

			<div class="coupon-box">
				<div class="left">优惠券</div>
				<div class="right" @click="showCoupon = true">
					<p>- ¥0.2</p>
					<img class="right-img" :src="'./static/images/b-right.png'" />
				</div>
			</div>
		</div>
		<div class="integral-box">
			<div class="left">
				<div class="top">
					<div>
						<img :src="'./static/images/qian.png'" />
						<p>通用积分</p>
					</div>
					<p class="money">可用：876000.50</p>
				</div>
				<div class="bottom" @click="$router.push({path:'/member/earnings/rule'})">
					<p>使用规则</p>
					<img :src="'./static/images/taihao.png'" />
				</div>
			</div>
			<div class="right" @click="showIntegral = true">
				<p>- ¥0.2</p>
				<img :src="'./static/images/b-right.png'" />
			</div>
		</div>
		<div class="money-box">
			<p>小计: <span> ¥</span> <i>3.9</i></p>
		</div>
		<div class="pay-btn">确认支付</div>
		<div v-transfer-dom>
			<popup v-model="showIntegral">
				<div class="integral_popup">
					<div class="pd">
						<p class="title">通用积分使用</p>
						<div class="tip">
							<p>使用金额</p>
							<p>可用：876000.50</p>
						</div>
						<div class="input-div">
							<x-input title="¥" type="number" v-model="integralNum" placeholder="请输入积分数" :show-clear="false"></x-input>
						</div>
						<p class="gz" @click="$router.push({path:'/member/earnings/rule'})">通用积分规则</p>
					</div>
					<div class="btn" @click="integralSure">确定</div>
				</div>
			</popup>
		</div>

		<div v-transfer-dom>
			<popup class="coupon-popup" v-model="showCoupon">
				<div class="pr-box">
					<div class="header">
						<div class="all">
							<p>优惠券</p>
						</div>
					</div>
					<div class="couponlist-box">
						<div v-for="(item,index) in coupon" :key="index" class="bs" @click="sure(index,item.name,item.denomination,item.type,item.condition)">
							<div class="blue" v-if="sureIndex == index && item.show">
								<div class="pr-box">
									<img class="sureImg" v-if="sureIndex == index && item.show" :src="'./static/share/gou.png'" />
								</div>
							</div>
							<div class="bg">
								<div class="top">
									<div>
										<div class="one">
											<div class="type-btn" v-if="item.type == 0">满减券</div>
											<div class="type-btn" v-if="item.type == 10">体验券</div>
											<div class="type-btn" v-if="item.type == 20">满减券</div>
											<div class="type-btn" v-if="item.type == 30">折扣券</div>
											<div class="type-btn" v-if="item.type == 40">运费券</div>
											<div class="type-btn" v-if="item.type == 50">现金券</div>
											<span>{{item.name}}</span>
										</div>
										<p>使用期限：{{item.startTime | getDate2}} 至 {{item.endTime | getDate2}}</p>
									</div>
									<div class="money">
										<div v-if="item.type == 0 || item.type == 10 || item.type == 20 || item.type == 50">
											<span>{{item.denomination}}</span>元
											<br />
											<i>满{{item.condition}}元可用</i>
										</div>
										<div v-if="item.type == 30">
											<span>{{item.denomination}}</span>折
											<br />
											<i>满{{item.condition}}元可用</i>
										</div>
									</div>
								</div>
							</div>
							<div class="bottom show">
								<span class="shang">{{item.content?item.content:'暂无详细说明'}}</span>
								<img class="r180" :src="'./static/images/xia.png'" alt="" />
							</div>
						</div>

					</div>
					<div class="btn" @click="showCoupon = false">确定</div>
				</div>
			</popup>
			<payMode :options="payOptions"></payMode>
		</div>
	</div>
</template>

<script>
	import settingHeader from '@/components/setting_header'
	import { XInput, Popup } from 'vux'
	import payMode from '@/components/payMode'
	export default {
		data() {
			return {
				showIntegral: false,
				showCoupon: false,
				moneyNum: '', //输入的金额
				integralNum: '', //输入的积分
				sureIndex: 100,
				userCouponId: '',
				payOptions: {},
				couponName: '',
				denomination: 0,
				type: 0,
				condition: 0,
				recommendBalance: 0,
				coupon: [{
					condition: "0.00",
					content: "消费即送价值120元威健康体验券",
					denomination: "5.00",
					discount: "0.00",
					endTime: 1539398519,
					name: "威健康体验券",
					startTime: 1531880406,
					status: 1,
					type: 50,
					userCouponId: "userCoupon140612098400000001",
					show: false
				}, {
					condition: "0.00",
					content: "消费即送价值120元威健康体验券",
					denomination: "5.00",
					discount: "0.00",
					endTime: 1539398519,
					name: "威健康体验券",
					startTime: 1531880406,
					status: 1,
					type: 50,
					userCouponId: "userCoupon140612098400000002",
					show: false
				}, {
					condition: "0.00",
					content: "消费即送价值120元威健康体验券",
					denomination: "5.00",
					discount: "0.00",
					endTime: 1539398519,
					name: "威健康体验券",
					startTime: 1531880406,
					status: 1,
					type: 50,
					userCouponId: "userCoupon140612098400000003",
					show: false
				}, {
					condition: "0.00",
					content: "消费即送价值120元威健康体验券",
					denomination: "5.00",
					discount: "0.00",
					endTime: 1539398519,
					name: "威健康体验券",
					startTime: 1531880406,
					status: 1,
					type: 50,
					userCouponId: "userCoupon140612098400000004",
					show: false
				}]
			}
		},
		components: {
			settingHeader,
			XInput,
			Popup
		},
		created() {

		},
		mounted() {

		},
		methods: {
			integralSure() {
				console.log(this.integralNum)
			},
			//  优惠券  下标 名字 减去金额 类型  使用门槛 
			sure(index, name, denomination, type, condition) {
				this.sureIndex = index

				let sureCouponList = []

				for(var i = 0; i < this.coupon.length; i++) {
					if(i != index) {
						this.coupon[i].show = false
					} else {
						this.coupon[i].show = this.coupon[index].show
					}
				}

				this.coupon[index].show = !this.coupon[index].show

				for(var i = 0; i < this.coupon.length; i++) {
					if(this.coupon[i].show) {
						this.userCouponId = this.coupon[i].userCouponId
						sureCouponList.push(this.coupon[i])
					}

				}

				if(sureCouponList.length > 0) {
					this.couponName = name
					this.denomination = denomination
					this.type = type
					this.condition = condition
				} else {
					this.userCouponId = ''
					this.couponName = ''
					this.denomination = 0
					this.type = 0
					this.condition = 0
				}
			},
		},

	}
</script>
<style lang="less">
	.scan_pay_box,
	.integral_popup {
		.input-div {
			width: 100%;
			height: 0.8rem;
			margin-top: 0.15rem;
			.weui-cell {
				width: 100%;
				height: 100%;
				padding: 0!important;
				.weui-cell__hd .weui-label {
					font-size: 0.36rem;
					font-family: DINOT-Bold;
					color: rgba(53, 53, 53, 1);
					text-align: center;
				}
				input {
					font-size: 0.5rem;
					/*font-family: DINOT-Bold;*/
					color: rgba(53, 53, 53, 1);
				}
			}
		}
	}
</style>
<style lang="less" scoped>
	.integral_popup {
		height: 8.36rem;
		background-color: white;
		position: relative;
		.pd {
			padding: 0 0.30rem;
			box-sizing: border-box;
		}
		.title {
			font-size: 0.32rem;
			font-family: Adobe Heiti Std R;
			color: rgba(34, 34, 34, 1);
			text-align: center;
			padding: 0.40rem 0;
		}
		.tip {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 0.30rem;
			p:nth-child(1) {
				font-size: 0.28rem;
				font-family: Adobe Heiti Std R;
				color: rgba(34, 34, 34, 1);
			}
			p:nth-child(2) {
				font-size: 0.28rem;
				color: rgba(160, 160, 160, 1);
			}
		}
		.input-div {
			padding-bottom: 0.10rem;
			position: relative;
		}
		.input-div:after {
			content: " ";
			position: absolute;
			left: 0;
			bottom: 0;
			right: 0;
			height: 1px;
			border-top: 1px solid #E1E1E1;
			color: #E1E1E1;
			-webkit-transform-origin: 0 0;
			transform-origin: 0 0;
			-webkit-transform: scaleY(0.5);
			transform: scaleY(0.5);
			left: 0px;
		}
		.gz {
			text-align: right;
			margin-top: 0.15rem;
			font-size: 0.24rem;
			font-family: Adobe Heiti Std R;
			color: rgba(46, 106, 255, 1);
		}
		.btn {
			height: 0.90rem;
			line-height: 0.90rem;
			text-align: center;
			background: rgba(51, 111, 255, 1);
			position: absolute;
			bottom: 0;
			width: 100%;
			font-size: 0.32rem;
			font-family: PingFang-SC-Medium;
			color: rgba(254, 254, 254, 1);
		}
	}
	
	.scan_pay_box {
		height: 100%;
		overflow: hidden;
		background-color: white;
		.b-w {
			background-color: #F5F6FA;
		}
		.shop_info_box:after {
			content: " ";
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			height: 1px;
			border-top: 1px solid #E1E1E1;
			color: #E1E1E1;
			-webkit-transform-origin: 0 0;
			transform-origin: 0 0;
			-webkit-transform: scaleY(0.5);
			transform: scaleY(0.5);
			left: 0px;
		}
		.coupon-box:after,
		.integral-box:after {
			content: " ";
			position: absolute;
			left: 0;
			bottom: 0;
			right: 0;
			height: 1px;
			border-top: 1px solid #E1E1E1;
			color: #E1E1E1;
			-webkit-transform-origin: 0 0;
			transform-origin: 0 0;
			-webkit-transform: scaleY(0.5);
			transform: scaleY(0.5);
			left: 0px;
		}
		.shop_info_box {
			background-color: white;
			height: 2.29rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			position: relative;
			.shop_logo {
				width: 1.04rem;
				height: auto;
			}
			.shop_name {
				margin-top: 0.25rem;
				font-size: 0.32rem;
				font-family: PingFang SC;
				color: #353535;
				span {
					color: #000001;
					font-family: PingFang-SC-Medium;
					font-weight: bold;
				}
			}
		}
		.input_box {
			height: 2.14rem;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;
			background-color: white;
			margin-top: 0.20rem;
			padding: 0 0.30rem;
			box-sizing: border-box;
			margin-bottom: 0.20rem;
			.tip {
				font-size: 0.28rem;
				font-family: PingFang SC;
				color: rgba(53, 53, 53, 1);
			}
		}
		.coupon-box {
			height: 1.0rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 0.30rem;
			box-sizing: border-box;
			background-color: white;
			position: relative;
			.left {
				font-size: 0.28rem;
				/*font-family: PingFang-SC-Medium;*/
				color: rgba(53, 53, 53, 1);
			}
			.right {
				display: flex;
				align-items: center;
				font-size: 0.32rem;
				/*font-family: DINOT-Medium;*/
				color: rgba(242, 48, 48, 1);
				img {
					width: 0.25rem;
					margin-left: 0.15rem;
				}
			}
		}
		.integral-box {
			height: 1.50rem;
			display: flex;
			justify-content: space-between;
			background-color: white;
			padding: 0 0.30rem;
			box-sizing: border-box;
			position: relative;
			.left {
				display: flex;
				justify-content: center;
				flex-direction: column;
				.top {
					display: flex;
					align-items: center;
					div {
						width: 1.28rem;
						height: 0.46rem;
						background: rgba(242, 48, 48, 1);
						border-radius: 23px;
						border: 1px solid rgba(242, 48, 48, 1);
						display: flex;
						align-items: center;
						justify-content: center;
						img {
							width: 0.22rem;
							height: 0.22rem;
							margin-right: 0.07rem;
						}
						p {
							font-size: 0.20rem;
							font-family: Helvetica;
							color: rgba(255, 255, 255, 1);
						}
					}
					.money {
						margin-left: 0.20rem;
						font-size: 0.28rem;
						font-family: PingFangSC-Regular;
						color: rgba(53, 53, 53, 1);
					}
				}
				.bottom {
					display: flex;
					align-items: center;
					margin-top: 0.18rem;
					p {
						font-size: 0.24rem;
						font-family: Adobe Heiti Std R;
						color: rgba(168, 168, 168, 1);
					}
					img {
						width: 0.25rem;
						height: auto;
						margin-left: 0.05rem;
					}
				}
			}
			.right {
				display: flex;
				align-items: center;
				font-size: 0.32rem;
				/*font-family: DINOT-Medium;*/
				color: rgba(242, 48, 48, 1);
				img {
					width: 0.25rem;
					margin-left: 0.15rem;
				}
			}
		}
		.money-box {
			margin-top: 0.35rem;
			text-align: right;
			padding: 0 0.30rem;
			box-sizing: border-box;
			p {
				font-size: 0.28rem;
				font-family: PingFang-SC-Medium;
				color: rgba(53, 53, 53, 1);
				span {
					font-size: 0.30rem;
					font-family: PingFang SC;
					margin-left: 0.1rem;
				}
				i {
					font-size: 0.48rem;
					/*font-family: DINOT-Medium;*/
					color: rgba(53, 53, 53, 1);
				}
			}
		}
		.pay-btn {
			margin: 0 auto;
			margin-top: 1.85rem;
			height: 0.88rem;
			line-height: 0.88rem;
			width: 6.18rem;
			text-align: center;
			background: rgba(51, 111, 255, 1);
			font-size: 0.32rem;
			font-family: PingFang-SC-Medium;
			color: rgba(254, 254, 254, 1);
			box-sizing: border-box;
			border-radius: 2px;
		}
	}
	
	.coupon-popup {
		box-sizing: border-box;
		background: white;
		.pr-box {
			position: relative;
		}
		.header {
			height: 1.25rem;
			padding: 0 0.20rem;
			/*position: absolute;
			top: 0;
			width: 100%;*/
			background-color: white;
			.all {
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;
				z-index: 15;
				height: 100%;
				img {
					width: 0.25rem;
					height: 0.25rem;
					position: absolute;
					top: 50%;
					right: 0%;
					transform: translate(0%, -50%);
				}
			}
		}
		.btn {
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 0.88rem;
			background: rgba(51, 111, 255, 1);
			font-size: 0.30rem;
			font-family: PingFang-SC-Medium;
			color: rgba(255, 255, 255, 1);
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0 auto;
			z-index: 15;
		}
		.couponlist-box {
			padding: 0 0.20rem;
			position: relative;
			height: 7rem;
			z-index: 11;
			overflow-y: auto;
			padding-bottom: 0.88rem;
			padding-top: 0.24rem;
			.bs {
				box-shadow: 2px 0px 20px rgba(217, 223, 240, 1);
				margin-bottom: 0.24rem;
				position: relative;
				box-sizing: border-box;
				border-radius: 3px;
				background: #F5F6FA;
				.blue {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					border: 2px solid #336fff;
					border-radius: 3px;
					box-sizing: border-box;
					.pr-box {
						position: relative;
						.sureImg {
							position: absolute;
							top: 0;
							right: 0;
							width: 0.68rem;
							height: 0.68rem;
						}
					}
				}
			}
			.bg {
				height: 2.04rem;
				display: flex;
				flex-direction: column;
				overflow: hidden;
				/*background: url(../../assets/images/member/coupon-bg.png) no-repeat;*/
				background-size: cover;
				img {
					position: absolute;
					top: -0.15rem;
					right: -0.07rem;
					width: 1.2rem;
					height: 1.2rem;
				}
				.top {
					flex: 1;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 0.40rem;
					box-sizing: border-box;
					.one {
						display: flex;
						.type-btn {
							width: 0.88rem;
							height: 0.32rem;
							background: rgba(51, 111, 255, 1);
							border-radius: 16px;
							font-size: 0.22rem;
							font-family: PingFang-SC-Medium;
							color: rgba(255, 255, 255, 1);
							display: flex;
							align-items: center;
							justify-content: center;
						}
						span:nth-child(2) {
							font-size: 0.28rem;
							font-family: PingFang-SC-Medium;
							color: rgba(26, 38, 66, 1);
							margin-left: 0.1rem;
						}
					}
					p {
						margin-top: 0.23rem;
						font-size: 0.24rem;
						font-family: PingFang-SC-Medium;
						color: rgba(26, 38, 66, 1);
					}
					.money {
						font-size: 0.24rem;
						font-family: PingFang-SC-Bold;
						color: rgba(51, 111, 255, 1);
						span {
							font-size: 0.68rem;
							color: rgba(51, 111, 255, 1);
						}
						i {
							font-size: 0.20rem;
							font-family: PingFang-SC-Medium;
							color: rgba(51, 111, 255, 1);
						}
					}
				}
			}
			.bottom {
				font-size: 0.22rem;
				font-family: PingFang-SC-Medium;
				color: rgba(144, 162, 199, 1);
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0.18rem 0.40rem;
				background: rgb(249, 250, 255);
				box-sizing: border-box;
				border-radius: 3px;
				.shang {
					display: inline-block;
					width: 5.84rem;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
				}
				.xia {
					display: inline-block;
					width: 5.84rem;
				}
				img {
					width: 0.19rem;
					height: auto;
				}
			}
			.show {
				span {
					white-space: pre-wrap!important;
				}
			}
			.r180 {
				transform: rotate(-180deg);
			}
		}
	}
</style>
<template>
	<div class="payMode-box">
		<div v-if="1<0">
			<popup class="payMode-popup" v-model="options.showPayMode" @on-hide="hide" @on-show="show">
				<div class="pay-box">
					<div class="pay-header ">
						<img @click="options.showPayMode = false" :src="'./static/images/xx.png'" />
						<p>选择支付方式</p>
					</div>
					<div class="pay-list">
						<ul>
							<li v-for="(item,index) in payList" :key="index" @click="changePayMode(index)">
								<div class="left">
									<div class="img-box">
										<img v-if="item.logo" :src="item.logo" alt="" />
									</div>
									<p>{{item.title}}</p>
								</div>
								<check-icon :value.sync="item.isChoice"></check-icon>
							</li>
						</ul>
					</div>
					<div class="pay-btn" @click="options.toPay(payModeIndex)">立即支付</div>
				</div>
			</popup>
		</div>

		<div class="pay-box" v-else>
			<popup class="payMode-popup" height="100%" v-model="options.showPayMode" @on-hide="hide" @on-show="show">
				<div class="pr-box" v-if="options.showPayMode">
					<div class="bt" @click="options.showPayMode = !options.showPayMode">
						<i class="iconfont icon-arrow-right"></i>
						<p>支付收银台</p>
					</div>
					<div class="money_box">
						<p>需支付</p>
						<p>{{Number(options.data.money).toFixed(2)}}元</p>
					</div>
					<div class="time_box" v-if="1>2">
						<p>支付剩余时间</p>
						<div class="num-box">
							<ul>
								<li class="bg">{{timeNum[0]}}</li>
								<li class="bg">{{timeNum[1]}}</li>
								<li>:</li>
								<li class="bg">{{timeNum[2]}}</li>
								<li class="bg">{{timeNum[3]}}</li>
							</ul>
						</div>
					</div>
					<div class="pay-list">
						<ul>
							<li v-for="(item,index) in payList" :key="index" @click="changePayMode(index,item.payType)">
								<div class="left">
									<div class="img-box">
										<img :src="item.logo.original" alt="" />
									</div>
									<p>{{item.payTypeName}}</p>
								</div>
								<check-icon :value.sync="item.isChoice"></check-icon>
							</li>
						</ul>
					</div>
					<div class="sure-btn" @click="options.toPay(payModeType)">
						<p>确认支付</p>
						<p>{{Number(options.data.money).toFixed(2)}}元</p>
					</div>
				</div>
			</popup>
		</div>
	</div>
</template>

<script>
	import { Popup, CheckIcon, Countup } from 'vux'
	export default {
		data() {
			return {
				payList: [
					//				{
					//						logo: './static/images/zfbPay.png',
					//						title: '支付宝支付',
					//						isChoice: true
					//					},
					//					{
					//						logo: './static/images/wxPay.png',
					//						title: '微信支付',
					//						isChoice: false
					//					}, {
					//						logo: './static/images/qqPay.png',
					//						title: 'QQ钱包支付',
					//						isChoice: false
					//					}, {
					//						logo: './static/images/jdPay.png',
					//						title: '京东支付',
					//						isChoice: false
					//					},
					//					{
					//						logo: './static/images/ylPay.png',
					//						title: '银联支付',
					//						isChoice: false
					//					}
				],
				payModeIndex: 0,
				payModeType: 0,
				timeNum: [0, 6, 0, 0],
				time: 360
			}
		},
		components: {
			Popup,
			CheckIcon,
			Countup
		},
		created() {
			var _this = this

			var i = 0
			if(_this.timeNum[i] != 0) {
				_this.reduce(_this.timeNum[i++])
			}
			_this.countdown(_this.time)

			this.getPaymentList()

		},
		mounted() {

		},
		props: {
			options: {
				type: Object,
				default: {
					showPayMode: false,
					changePay() {},
					toPay() {},
					hide() {},
					show() {},
					data: {
						money: 0
					}
				}
			}
		},
		methods: {
			//获取支付渠道
			getPaymentList() {
				var _this = this
				_this.$http.get(_this.url.user.getPaymentList, {
					params: {
						platformId: _this.url.platformId
					}
				}).then((res) => {
					if(res.data.status == "00000000") {

						//重置默认值
						_this.payList = res.data.data.lists

						_this.payList.forEach(function(index, value, array) {
							_this.payList[value].isChoice = false
							_this.payList[0].isChoice = true
							_this.payModeType = _this.payList[0].payType
						})
					}
				})
			},
			//关闭弹窗
			hide() {
				this.options.hide()
			},
			//开启弹窗
			show() {
				var _this = this
				_this.options.show()
				//重置默认值
				
				_this.payList.forEach(function(index, value, array) {
					_this.payList[value].isChoice = false
					_this.payList[0].isChoice = true
				})
			},
			//支付方式改变时
			changePayMode(i, type) {
				var _this = this
				
				_this.payList.forEach(function(index, value, array) {
					_this.payList[value].isChoice = false
					_this.payList[i].isChoice = true
				})
				
				this.$forceUpdate()
				
				_this.payModeType = type

				_this.payModeIndex = i
				
				_this.options.changePay(type)

				
			},
			//倒计时
			countdown(item) {
				if(item < 0) return
				let vm = this
				let m = (Math.floor(item / 60) + '').padStart(2, '0')
				let t = (item % 60 + '').padStart(2, '0')
				let arr = (m + t).split('')
				item -= 1
				setTimeout(() => {
					vm.countdown(item)
				}, 1000)
				vm.timeNum = arr
			}
		}
	}
</script>
<style lang='less' scoped>
	.payMode-box {
		.pay-box {
			.payMode-popup {
				.pr-box {
					width: 100%;
					height: 100%;
					position: relative;
					.bt {
						height: 0.88rem;
						display: flex;
						align-items: center;
						padding: 0 0.2rem;
						font-size: 0.32rem;
						font-family: PingFang-SC-Medium;
						color: rgba(26, 38, 66, 1);
						position: relative;
						border-bottom: 1px solid #E1E1E1;
						background-color: white;
						p {
							position: absolute;
							left: 50%;
							top: 50%;
							transform: translate(-50%, -50%);
						}
						i {
							font-size: 0.60rem;
							transform: rotate(-180deg);
						}
					}
					.money_box {
						height: 1.22rem;
						display: flex;
						align-items: center;
						justify-content: space-between;
						border-bottom: 1px solid #E1E1E1;
						padding: 0 0.15rem;
						box-sizing: border-box;
						background-color: white;
						p:nth-child(1) {
							font-size: 0.32rem;
							/*font-family: PingFang-SC-Medium;*/
							color: rgba(26, 38, 66, 1);
							margin-left: 0.25rem;
						}
						p:nth-child(2) {
							font-size: 0.32rem;
							font-family: PingFang-SC-Bold;
							color: rgba(255, 83, 101, 1);
							margin-right: 0.25rem;
						}
					}
					.time_box {
						/*height: 1.6rem;*/
						padding: 0.30rem 0.15rem;
						display: flex;
						align-items: center;
						justify-content: center;
						flex-direction: column;
						margin-bottom: 0.20rem;
						background-color: white;
						.num-box {
							margin-top: 0.15rem;
							ul {
								display: flex;
								align-items: center;
								li {
									color: #8496BB;
									height: 0.44rem;
									line-height: 0.44rem;
									text-align: center;
									margin-right: 0.15rem;
								}
								li:last-child {
									margin-right: 0;
								}
								.bg {
									width: 0.44rem;
									background: rgba(132, 150, 187, 1);
									border-radius: 3px;
									font-size: 0.24rem;
									font-family: PingFang-SC-Medium;
									color: rgba(255, 255, 255, 1);
								}
							}
						}
					}
					.sure-btn {
						width: 7.49rem;
						height: 0.99rem;
						background: rgba(51, 111, 255, 1);
						display: flex;
						align-items: center;
						justify-content: center;
						position: absolute;
						left: 0;
						bottom: 0;
						width: 100%;
						p:nth-child(1) {
							font-size: 0.36rem;
							/*font-family: PingFang-SC-Medium;*/
							color: rgba(255, 255, 255, 1);
							margin-right: 0.1rem;
						}
						p:nth-child(2) {
							font-size: 0.36rem;
							font-family: PingFang SC;
							color: rgba(255, 255, 255, 1);
						}
					}
				}
			}
			.pay-header {
				height: 1rem;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 0.27rem 0 0.46rem;
				box-sizing: border-box;
				position: relative;
				img {
					width: 0.28rem;
					height: 0.28rem;
				}
				p {
					font-size: 0.28rem;
					font-family: PingFangSC-Regular;
					color: rgba(34, 34, 34, 1);
				}
			}
			.pay-header:after {
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
		}
		.pay-list {
			padding: 0 0.23rem 0 0.23rem;
			box-sizing: border-box;
			background-color: white;
			ul>li {
				height: 1.22rem;
				display: flex;
				align-items: center;
				justify-content: space-between;
				position: relative;
				.left {
					display: flex;
					align-items: center;
					.img-box {
						width: 1rem;
						height: 1rem;
						display: flex;
						align-items: center;
						justify-content: center;
						margin-right: 0.35rem;
						img {
							width: 66%;
							height: auto;
						}
					}
					p {
						font-size: 0.32rem;
						color: rgba(34, 34, 34, 1);
					}
				}
			}
			ul>li:not(:last-child):after {
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
		}
		.pay-btn {
			height: 0.9rem;
			line-height: 0.9rem;
			margin-top: 1rem;
			text-align: center;
			font-size: 0.28rem;
			font-family: PingFang-SC-Medium;
			color: rgba(255, 255, 255, 1);
			background: rgba(51, 111, 255, 1);
		}
	}
</style>
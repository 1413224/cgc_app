<template>
	<div class="payMode-box">
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
									<img :src="item.logo" alt="" />
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
</template>

<script>
	import { Popup, CheckIcon } from 'vux'
	export default {
		data() {
			return {
				payList: [{
						logo: './static/images/zfbPay.png',
						title: '支付宝支付',
						isChoice: true
					},
					{
						logo: './static/images/wxPay.png',
						title: '微信支付',
						isChoice: false
					}, {
						logo: './static/images/qqPay.png',
						title: 'QQ钱包支付',
						isChoice: true
					}, {
						logo: './static/images/jdPay.png',
						title: '京东支付',
						isChoice: true
					},
					{
						logo: './static/images/ylPay.png',
						title: '银联支付',
						isChoice: false
					}
				],
				payModeIndex: 0,
			}
		},
		components: {
			Popup,
			CheckIcon
		},
		created() {

		},
		props: {
			options: {
				type: Object,
				default: {
					showPayMode: false,
					changePay() {},
					toPay() {},
					hide() {},
					show() {}
				}
			}
		},
		methods: {
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
			changePayMode(i) {
				var _this = this
				_this.payModeIndex = i
				_this.options.changePay(i)
				_this.payList.forEach(function(index, value, array) {
					_this.payList[value].isChoice = false
					_this.payList[i].isChoice = true
				})
			}
		}
	}
</script>
<style lang='less' scoped>
	.payMode-box {
		.pay-box {
			background-color: white;
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
			padding: 0 0.25rem 0 0.42rem;
			box-sizing: border-box;
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
			ul>li:after {
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
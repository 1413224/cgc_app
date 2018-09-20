<template>
	<popup height="100%" v-model="options.showIntegralMode">
		<div class="integral_box">
			<div class="bt" @click="options.showIntegralMode = false">
				<i class="iconfont icon-arrow-right"></i>
				<p>企业通用积分</p>
			</div>
			<ul class="list_box">
				<li v-for="(item,index) in cardList">
					<div class="top">
						<div class="t_box">
							<img :src="item.canUseBalance > 0 ?'./static/images/yuanquan-in.png':'./static/images/yuanquan.png'" />
							<span>{{item.name}}</span>
						</div>
						<div class="b_box">
							<div class="input">
								<!--<x-input ref="input" show-clear="false" @on-click-clear-icon="reset(index)" @on-change="setBalance(index)" placeholder="请输入使用金额" type="number" v-model="item.canUseBalance" /></x-input>-->
								<input ref="input" @input="setBalance(index)" placeholder="请输入使用金额" type="number" v-model="item.canUseBalance" />
							</div>
							<div @click="reset(index)">
								<img :src="'./static/images/gb.png'" />
								<span>修改金额</span>
							</div>
						</div>
					</div>
					<div class="bottom">
						<span>企业通用积分余额：</span><span>{{item.balance}}</span>
					</div>
				</li>
			</ul>
		</div>
	</popup>
</template>

<script>
	import { Popup, XInput } from 'vux'
	import settingHeader from '@/components/setting_header.vue'
	export default {
		props: {
			payMoney: "",
			options: {
				type: Object,
				default: {
					showIntegralMode: false,
					data: {}
				}
			},
			topIntegral: 0
		},
		data() {
			return {
				title: '使用企业通用积分',
				cardList: [],
				list: [], //深度复制的初始化数组
				balance: 0,
				topBalance: 0,
				totalUseEnterpriseBalance: 0,
				enterpriseCards: []
			}
		},
		mounted() {
			var _this = this
			_this.list = JSON.parse(JSON.stringify(this.options.data.cardList))
			_this.cardList = _this.options.data.cardList

			this.list.forEach((value) => {
				_this.balance += Number(value.canUseBalance)
				if(value.canUseBalance != 0 || value.canUseBalance != '') {
					var obj = {}
					obj.userCardId = value.userCardId
					obj.balance = value.canUseBalance
					_this.enterpriseCards.push(obj)
				}

			})

			var data = {
				balance: _this.balance,
				enterpriseCards: _this.enterpriseCards
			}

			_this.$emit('watch', data)
		},
		watch: {
			value: function(val) {
				if(!val) return
				if(!/^\d*\.?\d{0,2}$/.test(val)) {
					return ''
				}
			},
			topIntegral(newValue, oldValue) {
				this.balance = newValue
			}
		},
		methods: {
			setBalance(index) {
				var _this = this

				var topBalance = 0
				_this.cardList.forEach((value, i) => {

					if(value.canUseBalance < 0) {
						value.canUseBalance = 0
					}

					if(index != i) {
						topBalance += Number(value.canUseBalance)
					}
					_this.topBalance = Number(_this.balance) - Number(topBalance)

					if(Number(_this.cardList[index].balance) > Number(_this.topBalance)) {
						if(Number(_this.cardList[index].canUseBalance) > Number(_this.topBalance)) {
							_this.cardList[index].canUseBalance = _this.topBalance
						}
					} else {
						if(Number(_this.cardList[index].canUseBalance) > Number(_this.cardList[index].balance)) {
							_this.cardList[index].canUseBalance = _this.cardList[index].balance
						}
					}
				})

				_this.totalUseEnterpriseBalance = 0
				_this.enterpriseCards = []

				this.cardList.forEach((value) => {
					_this.totalUseEnterpriseBalance += Number(value.canUseBalance)
					if(value.canUseBalance != 0 || value.canUseBalance != '') {
						var obj = {}
						obj.userCardId = value.userCardId
						obj.balance = value.canUseBalance
						_this.enterpriseCards.push(obj)
					}
				})

				var data = {
					totalUseEnterpriseBalance: _this.totalUseEnterpriseBalance,
					enterpriseCards: _this.enterpriseCards
				}

				_this.$emit('set', data)
			},
			//修改金额
			reset(index) {
				var _this = this
				_this.totalUseEnterpriseBalance = 0
				_this.enterpriseCards = []
				_this.options.data.cardList[index].canUseBalance = ''
				_this.$refs.input[index].focus()

				_this.$forceUpdate()

				this.cardList.forEach((value) => {
					_this.totalUseEnterpriseBalance += Number(value.canUseBalance)
					if(value.canUseBalance != 0 || value.canUseBalance != '') {
						var obj = {}
						obj.userCardId = value.userCardId
						obj.balance = value.canUseBalance
						_this.enterpriseCards.push(obj)
					}
				})
				var data = {
					totalUseEnterpriseBalance: _this.totalUseEnterpriseBalance,
					enterpriseCards: _this.enterpriseCards
				}

				_this.$emit('set', data)
			}
		},
		components: {
			settingHeader,
			Popup,
			XInput
		}
	}
</script>
<style lang="less">
	.integral_box {
		.input {
			.weui-cell {
				width: 100%!important;
				padding: 0!important;
			}
		}
	}
</style>
<style lang="less" scoped>
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}
	
	input[type="number"] {
		-moz-appearance: textfield;
	}
	
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
	
	.integral_box {
		/*		padding: 0.20rem 0;*/
		box-sizing: border-box;
		background-color: #F5F8F9;
		height: 100%;
		position: relative;
		z-index: 11;
		.list_box {
			background-color: #F5F8F9;
			padding-bottom: 1.60rem;
			li {
				padding-left: 0.30rem;
				box-sizing: border-box;
				background-color: white;
				.top {
					padding-top: 0.25rem;
					position: relative;
					.t_box {
						display: flex;
						align-items: center;
						font-size: 0.28rem;
						font-family: PingFangSC-Regular;
						color: rgba(26, 38, 66, 1);
						img {
							width: 0.36rem;
							height: 0.36rem;
							margin-right: 0.20rem;
						}
					}
					.b_box {
						padding-right: 0.30rem;
						box-sizing: border-box;
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-top: 0.20rem;
						div {
							height: 100%;
							display: flex;
							align-items: center;
							font-size: 0.28rem;
							font-family: PingFangSC-Regular;
							color: rgba(51, 111, 255, 1);
							img {
								width: 0.25rem;
								height: 0.25rem;
								margin-right: 0.15rem;
							}
						}
						.input {
							width: 5rem;
							padding: 0.20rem 0;
							input {
								width: 100%;
								font-size: 0.32rem;
								color: #336fff;
								font-family: PingFangSC-Regular;
								/*color: rgba(26, 38, 66, 1);*/
							}
						}
					}
				}
				.top:after {
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
				.bottom {
					height: 0.88rem;
					line-height: 0.88rem;
					font-size: 0.28rem;
					font-family: PingFangSC-Regular;
					span:nth-child(1) {
						color: rgba(160, 160, 160, 1);
					}
					span:nth-child(2) {
						color: #1A2642;
					}
				}
			}
			li:not(:last-child) {
				margin-bottom: 0.20rem;
			}
		}
	}
</style>
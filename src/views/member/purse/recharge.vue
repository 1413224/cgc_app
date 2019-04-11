<template>
	<div class="recharge-box">
		<settingHeader :title="title"></settingHeader>
		<div class="item">
			<!-- <div>
				<span>当前平台</span><span>{{info.name}}</span>
			</div>
			<div>
				<span>当前积分</span><span>{{userInfo.availablePoints}}</span>
			</div> -->
			<div class="jifen">
				<div class="price">{{userInfo.balance}}<span>通用积分</span></div>
				<div class="ptai">当前平台：<span>{{info.name?info.name:'当前平台不可用'}}</span></div>
			</div>
		</div>
		<div class="change-box">
			<div class="change-tip">
				<span>通用积分充值</span><span @click="record">充值记录</span>
			</div>
			<div class="change-row">
				<div v-for="(item,index) in moneyList" :key="index" class="row-item" :class="{'moneyActive':index == moneyIndex}" @click="changeMoney(index,item.rechargeId)" v-if="moneyList.length>0">
					<div class="box" :class="{'nohas':item.null}">
						<p>{{item.money}} <i>元</i></p>
						<p>赠送{{item.integral}}积分</p>
					</div>
				</div>
				<div v-if="moneyList.length == 0">
					<p class="gy">暂无充值套餐</p>
				</div>
			</div>

			<div class="btn-box" v-if="moneyList.length != 0">
				<x-button class="add-btn" @click.native="submit">确认充值</x-button>
			</div>
		</div>
		<div class="recharge_tip">
			<p class="gy-title">通用积分说明</p>
			<p class="gy">1.CGC通用积分充值后会即时到达会员账户钱包，不会过期，但无法提现或转赠他人；</p>
			<p class="gy">2.CGC通用积分可以在全球联盟企业和e消费任何APP商城1:1抵现金通用，没有额度限制；</p>
		</div>
		<payMode :options="payOptions"></payMode>
	</div>
</template>

<script>
	import { PopupHeader, Checklist } from 'vux'
	import settingHeader from '@/components/setting_header'
	import payMode from '@/components/payMode'
	export default {
		name: 'recharge',
		data() {
			return {
				title: '通用积分充值',
				moneyIndex: 0, //套餐默认选中
				ptIndex: 0,
				list: [{
					icon: './static/member/bandCard.png',
					key: '1',
					value: '银行卡支付'
				}, {
					icon: './static/member/treasure.png',
					key: '2',
					value: '支付宝支付'
				}, {
					icon: './static/member/wechapaid.png',
					key: '3',
					value: '微信支付'
				}],
				show1: false,
				moneyList: [],
				info: {},
				userInfo: {},
				payOptions: {},
				parentOrderSn: '',
				payParmars: {},
			}
		},
		created() {
			var _this = this

			if(localStorage['userInfo']) {
				this.userInfo = JSON.parse(localStorage['userInfo'])
			}

			if(this.$route.params.reload) {
				location.reload()
			}

			this.getRechargeList()

			this.payOptions = {
				showPayMode: false,
				data: {
					money: 0,
				},
				changePay(index) {

				},
				toPay(type) {
					var params = {
						userId: _this.$store.state.user.userId,
						platformId: _this.url.platformId,
						rechargeId: _this.moneyList[_this.moneyIndex].rechargeId,
						payType: type,
						openId: localStorage['_openid_'],
						parentOrderSn: _this.parentOrderSn
					}
					if(location.host == _this.url.health) {
						params.payConfigId = _this.url.IdHealth
					} else if(location.host == _this.url.cgc) {
						params.payConfigId = _this.url.IdCgc
					} else if(location.host == _this.url.test) {
						params.payConfigId = _this.url.IdTest
					}

					_this.$http.post(_this.url.user.rechargeBalance, params).then((res) => {
						if(res.data.status == "00000000") {
							_this.parentOrderSn = res.data.data.parentOrderSn
							if(type == 1) {
								wx.config({
									debug: false,
									appId: res.data.data.appId,
									timestamp: res.data.data.timeStamp,
									nonceStr: res.data.data.nonceStr,
									signature: res.data.data.signature,
									jsApiList: [
										'checkJsApi',
										'startRecord',
										'stopRecord',
										'translateVoice',
										'scanQRCode',
										'openCard',
										'chooseWXPay'
									]
								})

								wx.chooseWXPay({
									appId: res.data.data.appId,
									timestamp: res.data.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符  
									nonceStr: res.data.data.nonceStr, // 支付签名随机串，不长于 32 位  
									package: res.data.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）  
									signType: res.data.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'  
									paySign: res.data.data.paySign, // 支付签名  
									success: function(res) {
										_this.payOptions.showPayMode = false
										_this.$vux.toast.show({
											text: '支付成功',
											type: 'text',
											position: 'top',
											width: '50%'
										})
										_this.parentOrderSn = ""
										_this.getRechargeList()
									},
									error: function() {
										_this.$vux.toast.show({
											text: '支付失败',
											type: 'text',
											position: 'top',
											width: '50%'
										})
									},
									cancel: function() {
										_this.$vux.toast.show({
											text: '您已取消了支付',
											type: 'text',
											position: 'top',
											width: '50%'
										})
									}
								})
							} else if(type == 2) {
								_this.$router.push({
									name: 'alipay',
									params: {
										'orderStr': res.data.data.orderStr
									}
								})
								return false;
								document.write(res.data.data.orderStr)
								//const div = document.createElement('div')
								//div.innerHTML = res.data.data.orderStr
								//document.body.appendChild(div)
								//_this.$nextTick(function(){
								//document.forms[0].submit()
								//})
							}
						}
					})
				},
				hide() {

				},
				show() {

				}
			}
		},
		methods: {
			getRechargeList() {
				var _this = this
				_this.$http.get(_this.url.user.getRechargeList, {
					params: {
						platformId: _this.url.platformId,
						curPage: _this.curPage,
						pageSize: _this.pageSize
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.info = res.data.data
						_this.moneyList = res.data.data.pageBean.list
					}
				})
			},
			changeMoney(index, id) {
				this.moneyIndex = index
				this.parentOrderSn = ''
			},
			changePt(index) {
				this.ptIndex = index
			},
			submit() {
				this.payOptions.showPayMode = true
				this.payOptions.data.money = this.moneyList[this.moneyIndex].money
			},
			change(value, label) {
				console.log('change:', value, label)
			},
			pay() {
				var _this = this
				_this.show1 = false
				_this.$code.show({
					type: 'pay',
					showCode: true,
					change() {
						_this.$code.hide()
						this.$dialog.show({
							type: 'success',
							headMessage: '提示',
							message: '支付成功',
							buttons: ['我知道了'],
							delay: 2000,
							canel() {
								console.log(123)
							},
							confirm() {
								console.log(123)
							}
						})
					},
					ishide() {
						console.log('关闭了支付窗口')
					}
				})
			},
			record() {
				this.$router.push({
					name: 'currencyreward',
					query: {
						title: '通用积分',
						type: 3
					}
				})
			}
		},
		components: {
			settingHeader,
			PopupHeader,
			Checklist,
			payMode
		}
	}
</script>

<style lang="less">
	.recharge-box {
		// height: 100%;
		position: relative;
		font-family: PingFangSC-Medium;
		// background-color: #F5F6FA;
		background-color: #fff;
		.item {
			padding: 0.31rem 0.22rem;
			box-sizing: border-box;
			height: 1.97rem;
			background-color: white;
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			margin-bottom: 0.2rem;
			// div {
			// 	display: flex;
			// 	align-items: center;
			// 	justify-content: space-between;
			// 	font-size: 0.28rem;
			// 	span:nth-child(1) {
			// 		color: rgba(144, 162, 199, 1);
			// 	}
			// 	span:nth-child(2) {
			// 		color: #1A2642
			// 	}
			// }
			.jifen {
				text-align: center;
				.price {
					font-size: .82rem;
					font-weight: bold;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					span {
						font-weight: bold;
						font-size: .38rem;
						display: inline-block;
						margin-left: .1rem;
					}
				}
				.ptai {
					color: #90A2C7;
					font-size: .28rem;
					margin-top: .1rem;
					span {
						color: #333;
					}
				}
			}
		}
		.recharge_tip {
			padding: 0.4rem 0.22rem 0.4rem 0.22rem;
			background-color: white;
			.gy-title {
				font-size: 0.32rem;
				font-family: PingFangSC-Medium;
				color: rgba(26, 38, 66, 1);
				margin-bottom: 0.4rem;
			}
			.gy {
				font-size: 0.28rem;
				font-family: PingFangSC-Regular;
				color: rgba(144, 162, 199, 1);
			}
			.gy:last-child {
				margin-top: 0.35rem;
			}
		}
		.change-box {
			padding: 0 0.22rem 0.56rem 0.22rem;
			background-color: white;
			border-top: 1px solid #EBEFF7;
			border-bottom: 1px solid #EBEFF7;
			box-sizing: border-box;
			.change-tip {
				height: 1.13rem;
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: rgba(26, 38, 66, 1);
				span:nth-child(1) {
					font-size: 0.32rem;
				}
				span:nth-child(2) {
					font-size: 0.24rem;
					/*color: #90A2C7;*/
				}
			}
			.change-row {
				display: flex;
				background: white;
				flex-wrap: wrap;
				.row-item {
					width: 33.333%;
					max-width: 33.333%;
					div {
						margin: 0.1rem auto;
						display: flex;
						align-items: center;
						justify-content: center;
						flex-direction: column;
						height: 1.3rem;
						border-radius: 3px;
						color: #C6CCDA;
						p:nth-child(1) {
							font-size: 0.42rem;
						}
						p:nth-child(2) {
							font-size: 0.20rem;
							text-align: center;
							margin-top: 0.1rem;
						}
						img {
							width: 0.4rem;
							height: 0.4rem;
						}
					}
					.box {
						width: 2.18rem;
						height: 1.60rem;
						background: white;
						/*box-shadow: 0px 2px 10px 0px rgba(26, 38, 66, 0.4);*/
						border: 1px solid #336FFF;
						border-radius: 3px;
						color: #336FFF;
						padding: 0 0.1rem;
						box-sizing: border-box;
						p:nth-child(1) {
							i {
								font-size: 0.20rem;
							}
						}
						p:nth-child(2) {
							font-size: 0.20rem;
							color: #90A2C7;
						}
					}
					.nohas {
						background: #90a2c7!important;
					}
				}
				.moneyActive {
					.box {
						color: white;
						background: #336fff;
						transition: all 0.2s linear;
						border: none;
						p:nth-child(2) {
							color: white;
						}
					}
				}
				.ptActive {
					div {
						border: 1px solid #1c7ff3;
						color: #26a2ff;
						background: transparent;
						background: transparent!important;
					}
				}
			}
		}
		.btn-box {
			margin-top: 0.68rem;
			box-sizing: border-box;
			background: #fff;
			.add-btn {
				width: 6.18rem;
				height: 0.88rem;
				line-height: 0.88rem;
				background: rgba(51, 111, 255, 1);
				font-size: 0.28rem;
				text-align: center;
				font-family: MicrosoftYaHei;
				color: rgba(255, 255, 255, 1);
				border-radius: 2px;
			}
		}
	}
</style>
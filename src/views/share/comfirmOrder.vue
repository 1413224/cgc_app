<template>
	<section class="sure-box">
		<settingHeader :title="title"></settingHeader>
		<div class="order-box">
			<div class="order_top">
				<div class="left">
					<img :src="'./static/images/shopLogo.png'" alt="" />
					<p @click="toDetail(info.enterpriseId)">{{info.name}}</p>
					<i class="icon iconfont icon-arrow-right"></i>
				</div>
			</div>
			<div class="order_middle">
				<div class="left">
					<img v-if="info.logo" :src="info.logo.original" alt="" />
				</div>
				<div class="middle">
					<div>
						<p class="name">{{info.shortName}} ({{$route.query.equipNumber}})</p>
						<p class="pinfo">{{info.skuName}}:{{info.serviceTime}}</p>
					</div>
					<p class="price">¥{{info.price}}</p>
				</div>
			</div>
			<div class="order_bottom">
				<p>优惠券选择</p>
				<p @click="showCouponList" v-if="couponName">{{couponName}}<i class="iconfont icon-arrow-right"></i></p>
				<p @click="showCouponList" v-else>{{info.availableCouponNums ? info.availableCouponNums + '张可用' : '0张可用'}}<i class="iconfont icon-arrow-right"></i></p>
			</div>
		</div>
		<div class="fix-box">
			<!--<div class="one">
				<div class="left">
					
					<img :src="'./static/share/tyjf.png'" alt="" />
				</div>
				<div class="right">
					<p class="ky">可用：{{info.availableBalance}} </p>
					<x-switch title="" v-model="value"></x-switch>
				</div>
			</div>
			<div class="two" v-if="value">
				<input type="number" v-model="info.recommendBalance" @input="inputChange" placeholder="请输入使用的通用积分" />
			</div>-->
			<div class="three">
				<div class="left">
					<p>需付款：</p>
					<p><i>¥ </i>{{info.payPrice}}</p>
				</div>
				<div class="right" @click="submit()">确认提交</div>
			</div>
		</div>
		<!--通用积分-->
		<div class="middle2 pr" @click="showIntegral = true">
			<div class="left">
				<div>
					<img :src="'./static/images/qian.png'" />
					<p>通用积分</p>
				</div>
				<p class="money">可用：{{info.availableBalance}}</p>
			</div>
			<div class="right">
				<p>已抵用<i class="money">¥ {{Number(info.recommendBalance).toFloor(2)}}</i></p>
				<i class="iconfont icon-arrow-right rj"></i>
			</div>
		</div>

		<popup v-model="showIntegral">
			<div class="integral_popup">
				<div class="pd">
					<p class="title">通用积分使用</p>
					<div class="tip">
						<p>使用金额</p>
						<p>可用：{{info.availableBalance}}</p>
					</div>
					<div class="input-div">
						<p>¥</p>
						<input type="number" v-model="info.recommendBalance" @input="inputChange" @blur="inputBlur" placeholder="请输入通用积分数">
					</div>
					<p class="gz" @click="$router.push({path:'/member/earnings/rule'})">通用积分规则</p>
				</div>
				<div class="btn" @click="showIntegral = false">确定</div>
			</div>
		</popup>

		<popup class="coupon-popup" v-model="show">
			<div class="pr-box">
				<div class="header">
					<div class="all">
						<p>优惠券</p>
						<img @click="show = false" :src="'./static/images/guanbi.png'" />
					</div>
				</div>
				<div class="couponlist-box">
					<div v-for="(item,index) in info.availableCoupon" :key="index" class="bs" @click="sure(index,item)">
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
									<div>
										<span>{{Number(item.denomination).toFloor(0)}}</span>元
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
				<div class="btn" @click="show = false">确定</div>
			</div>

		</popup>
		<payMode :options="payOptions" :orderSn="orderSn" :cancleSn="cancleSn"></payMode>
	</section>
</template>

<script>
	import settingHeader from '../../components/setting_header'
	import payMode from '@/components/payMode'
	export default {
		data() {
			return {
				title: "确认订单",
				value: true,
				info: {},
				show: false,
				sureIndex: 100,
				userCouponId: '',
				max: 0,
				maxPayPrice: 0,
				payOptions: {},
				couponName: '',
				denomination: 0,
				couponType: 0,
				condition: 0,
				discount: 0,
				recommendBalance: 0,
				payParmars: {},
				showIntegral: false,
				orderSn: '', //订单编号
				cancleSn: 1
			}
		},
		components: {
			settingHeader,
			payMode
		},
		created() {

			var _this = this

			this.getEquipmentOrderConfirmInfo(this.$route.query.equipNumber, this.$route.query.skuId)

			this.payOptions = {
				showPayMode: false,
				data: {
					money: 0,
				},
				changePay(index) {
					console.log(index)
				},
				toPay(type) {
					var params = {
						body: _this.payParmars.body,
						feeType: 'CNY',
						outTotalFee: _this.payParmars.payPrice,
						spbillCreateIp: _this.payParmars.ip,
						tradeType: 'JSAPI',
						openId: localStorage['_openid_'],
						parentOrderSn: _this.payParmars.parentOrderSn,
						userId: _this.$store.state.user.userId
					}
					if(location.host == _this.url.health) {
						params.id = _this.url.IdHealth
					} else if(location.host == _this.url.cgc) {
						params.id = _this.url.IdCgc
					} else if(location.host == _this.url.test) {
						params.id = _this.url.IdTest
					}

					if(type == 1) {
						_this.$http.post(_this.url.zf.pay, params).then((res) => {
							if(res.data.status == "00000000") {
								var data = res.data.data
								wx.config({
									debug: false,
									appId: data.appId,
									timestamp: data.timeStamp,
									nonceStr: data.nonceStr,
									signature: data.signature,
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
									appId: data.appId,
									timestamp: data.timeStamp,
									nonceStr: data.nonceStr,
									package: data.package,
									signType: data.signType,
									paySign: data.paySign,
									success: function(res) {
										router.replace({
											path: '/share/usetime'
										})
									},
									error: function() {
										Vue.$vux.toast.show({
											text: '支付失败',
											type: 'text',
											position: 'top',
											width: '50%'
										})
									},
									cancel: function() {
										Vue.$vux.toast.show({
											text: '您已取消了支付',
											type: 'text',
											position: 'top',
											width: '50%'
										})
									}
								})
							}
						})
					} else if(type == 2) {
						if(location.host == _this.url.test) {
							var cgcPayId = 500003,
								returnUrl = "http://www.cgc999.com/new/index.html#/shop/my_order2";
						} else if(location.host == _this.url.health) {
							var cgcPayId = 500000,
								returnUrl = "https://health.cgc999.com/web/new/index.html#/shop/my_order2";
						} else if(location.host == _this.url.cgc) {
							var cgcPayId = 500000,
								returnUrl = "https://health.cgc999.com/web/new/index.html#/shop/my_order2";
						}

						_this.$http.post(_this.url.zf.alipay, {
							cgcPayId: cgcPayId,
							parentOrderSn: _this.payParmars.parentOrderSn,
							body: _this.payParmars.body,
							goodsType: "1",
							subject: _this.payParmars.body,
							outTotalAmount: Number(_this.payParmars.payPrice).toFloor(2),
							userId: _this.$store.state.user.userId,
							returnUrl: returnUrl
						}).then((res) => {
							if(res.data.status == "00000000") {
								_this.tradeNo = res.data.data.tradeNo
								document.write(res.data.data.orderStr);
							} else if(res.data.status == "ALIPAY_0002") {
								_this.$router.replace({
									path: '/index',
									query: {
										no: sessionStorage['_cno_']
									}
								})
							} else if(res.data.status == "ALIPAY_1004") {
								_this.$router.replace({
									path: '/index',
									query: {
										no: sessionStorage['_cno_']
									}
								})
							}
						})
					}
				},
				hide() {
					console.log('hide')
				},
				show() {
					console.log('show')
				}
			}
		},
		mounted() {

		},
		computed: {

		},
		watch: {
			value() {
				//false时重置商品所需金额
				if(!this.value) {

					return this.info.payPrice = this.info.price - this.denomination
				}
				this.inputChange()
			}
		},
		methods: {
			inputBlur() {
				document.body.scrollTop = document.body.scrollTop - 1
			},
			submit() {
				var _this = this

				//当输入积分为空 变成0
				if(this.info.recommendBalance == "") {
					this.info.recommendBalance = 0
				}

				_this.$http.post(_this.url.share.createEquipmentOrder, {
					userId: _this.$store.state.user.userId,
					platformId: _this.url.platformId,
					equipNumber: this.$route.query.equipNumber,
					skuId: this.$route.query.skuId,
					enterprisePrice: 0,
					balance: _this.value ? _this.info.recommendBalance : 0,
					userCouponId: _this.userCouponId
				}).then((res) => {
					if(res.data.status == "00000000") {
						if(res.data.data.status == 1) {
							_this.$vux.toast.show({
								width: '50%',
								type: 'text',
								position: 'middle',
								text: '支付成功'
							})
							setTimeout(function() {
								_this.$router.push({
									path: '/share/usetime'
								})
							}, 1000)
						} else if(res.data.data.status == 2) {
							_this.payOptions.showPayMode = true
							_this.payOptions.data.money = res.data.data.payPrice
							_this.payParmars.payPrice = res.data.data.payPrice
							_this.payParmars.body = res.data.data.body
							_this.payParmars.ip = res.data.data.ip
							_this.payParmars.parentOrderSn = res.data.data.orderSn

							_this.orderSn = res.data.data.orderSn

							_this.payParmars.enterpriseName = _this.info.name
							_this.payParmars.toUrl = '/share/usetime'
						}
					}
				})
			},
			inputChange() {

				if(Number(this.info.recommendBalance) < 0) {
					this.info.recommendBalance = 0
				} else {
					var reg = /^(([0-9][0-9]*)|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2})))$/
					if(!reg.test(this.info.recommendBalance)) {
						if(Number(this.info.recommendBalance) > 0) {
							this.info.recommendBalance = Number(this.info.recommendBalance).toFloor(2)
						} else {
							this.info.recommendBalance = ''
						}
					}
				}

				var recommendBalance = this.info.recommendBalance == '' ? 0 : this.info.recommendBalance

				if(this.couponType == 20) { //满减券
					if(Number(this.info.price) >= Number(this.condition)) {
						this.info.payPrice = Number(this.info.price) - Number(this.denomination)
					}
				} else if(this.couponType == 30) { //折扣券
					if(Number(this.info.price) >= Number(this.condition)) {
						var minMoney = Number(this.info.price) * (1 - Number(this.discount))
						if(minMoney < Number(this.denomination)) {
							this.info.payPrice = this.info.payPrice - minMoney
						} else {
							this.info.payPrice = this.info.payPrice - Number(this.denomination)
						}
					}
				} else if(this.couponType == 50) { //现金券
					this.info.payPrice = Number(this.info.price) - Number(this.denomination)
				} else {
					this.info.payPrice = Number(this.info.price)
				}

				var minAllMoney = Number(this.info.payPrice).toFloor(2)

				//可用通用积分大于商品价格
				if(Number(this.info.availableBalance) >= Number(minAllMoney)) {
					if(Number(this.info.recommendBalance) > Number(minAllMoney)) {
						this.info.recommendBalance = minAllMoney
						recommendBalance = minAllMoney
					}

					this.info.payPrice = (Number(minAllMoney) - Number(recommendBalance)).toFloor(2)
				}

				//可用通用积分小于商品价格
				if(Number(this.info.availableBalance) < Number(minAllMoney)) {
					if(Number(this.info.recommendBalance) > Number(this.info.availableBalance)) {
						this.info.recommendBalance = this.info.availableBalance
						recommendBalance = this.info.availableBalance
					}

					this.info.payPrice = (Number(minAllMoney) - Number(recommendBalance)).toFixed(2)
				}
			},
			getEquipmentOrderConfirmInfo(id, num) {
				var _this = this

				_this.$http.get(_this.url.share.getEquipmentOrderConfirmInfo, {
					params: {
						userId: _this.$store.state.user.userId,
						platformId: _this.url.platformId,
						equipNumber: id,
						skuId: num
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						res.data.data.serviceTime = _this.setServiceTime(res.data.data.serviceTime)
						_this.max = res.data.data.availableBalance
						_this.maxPayPrice = res.data.data.payPrice
						_this.recommendBalance = res.data.data.recommendBalance

						if(res.data.data.availableCoupon) {
							for(var i = 0; i < res.data.data.availableCoupon.length; i++) {
								res.data.data.availableCoupon[i].show = false
							}
						}

						_this.info = res.data.data
						_this.info.payPrice = Number(_this.info.price)

						_this.inputChange()
					}
				})
			},
			setServiceTime(serviceTime) {
				var time_str = '';
				if(serviceTime >= 3600) {
					var hour = Math.floor(serviceTime / 3600);
					time_str += hour + '小时';
					serviceTime -= hour * 3600;
				}
				if(serviceTime >= 60) {
					var minute = Math.floor(serviceTime / 60);
					time_str += minute + '分钟';
					serviceTime -= minute * 60;
				}
				if(serviceTime > 0) {
					time_str += serviceTime + '秒';
				}
				return time_str;
			},
			showCouponList() {
				var _this = this
				if(_this.info.availableCouponNums > 0) {
					_this.show = true
				} else {
					_this.$vux.toast.show({
						width: '50%',
						type: 'text',
						position: 'middle',
						text: '暂无可用优惠券'
					})
				}
			},
			//  优惠券  下标 名字 减去金额 类型  使用门槛 
			sure(index, item) {

				this.sureIndex = index

				let sureCouponList = []
				this.userCouponId = ''

				for(var i = 0; i < this.info.availableCoupon.length; i++) {
					if(i != index) {
						this.info.availableCoupon[i].show = false
					} else {
						this.info.availableCoupon[i].show = this.info.availableCoupon[index].show
					}
				}

				this.info.availableCoupon[index].show = !this.info.availableCoupon[index].show

				for(var i = 0; i < this.info.availableCoupon.length; i++) {
					if(this.info.availableCoupon[i].show) {
						this.userCouponId = this.info.availableCoupon[i].userCouponId
						sureCouponList.push(this.info.availableCoupon[i])
					}

				}

				if(sureCouponList.length > 0) {
					this.discount = item.discount
					this.couponType = item.type
					this.couponName = item.name //优惠券标题
					this.denomination = item.denomination //优惠券减去金额
					this.condition = item.condition //优惠券满足门槛
				} else {
					this.couponType = ''
					this.userCouponId = ''
					this.couponName = ''
					this.denomination = 0
					this.condition = 0
				}

				this.info.payPrice = this.info.price //重置需要支付金额

				this.inputChange()
			},
			toDetail(id) {
				this.$router.push({
					path: '/multi_user_mall',
					query: {
						id: id
					}
				})
			}
		}
	}
</script>
<style lang="less">
	.integral_popup {
		.input-div {
			width: 100%;
			height: 0.8rem;
			margin-top: 0.15rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			p {
				font-size: 0.36rem;
				font-family: PingFangSC-Regular;
				color: rgba(53, 53, 53, 1);
				margin-right: 0.20rem;
			}
			input {
				flex: 1;
				height: 100%;
				font-size: 0.50rem;
			}
		}
	}
	
	.number-box .weui-cell {
		padding-left: 0!important;
		padding-right: 0!important;
	}
	
	.number-box .weui-cell:before {
		border-top: none;
	}
</style>
<style lang="less" scoped>
	.pr {
		position: relative;
	}
	
	.pr:after {
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
	
	.middle2 {
		height: 1.40rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 0.20rem;
		box-sizing: border-box;
		background-color: white;
		.left {
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
		.right {
			display: flex;
			align-items: center;
			p {
				font-size: 0.28rem;
				font-family: PingFangSC-Regular;
				color: rgba(53, 53, 53, 1);
				.money {
					color: #F23030;
				}
			}
			.rj {
				font-size: 0.40rem;
				color: #7386ad;
			}
		}
	}
	
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
			margin-top: 0.20rem;
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
	
	.coupon-popup {
		box-sizing: border-box;
		/*background: #F5F6FA;*/
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
	
	.sure-box {
		.settingHeader {
			border-bottom: 1px solid rgba(225, 225, 225, 1);
		}
		.order-box {
			background-color: white;
			.order_top {
				height: 0.8rem;
				display: flex;
				justify-content: space-between;
				box-sizing: border-box;
				padding: 0.17rem 0.30rem;
				.left {
					width: 65%;
					display: flex;
					align-items: center;
					img {
						width: 0.36rem;
						height: 0.36rem;
						margin-right: 0.23rem;
					}
					p {
						font-size: 0.28rem;
						font-family: PingFangSC-Regular;
						color: rgba(26, 38, 66, 1);
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
					}
					i {
						font-size: 0.5rem;
					}
				}
			}
			.order_middle {
				display: flex;
				background: rgba(245, 246, 250, 1);
				position: relative;
				padding: 0.14rem 0.25rem;
				box-sizing: border-box;
				.left {
					width: 1.50rem;
					height: 1.50rem;
					display: flex;
					align-items: center;
					justify-content: center;
					img {
						width: 100%;
						height: 100%;
					}
				}
				.middle {
					flex: 1;
					display: flex;
					justify-content: space-between;
					flex-direction: column;
					margin-left: 0.27rem;
					.name {
						font-size: 0.28rem;
						font-family: PingFangSC-Regular;
						color: rgba(26, 38, 66, 1);
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					.pinfo {
						font-size: 0.24rem;
						font-family: PingFangSC-Regular;
						color: rgba(144, 162, 199, 1);
						margin-top: 0.05rem;
					}
					.price {
						font-size: 0.32rem;
						font-family: PingFangSC-Medium;
						color: rgba(242, 48, 48, 1);
					}
				}
			}
			.order_bottom {
				height: 1.02rem;
				background: rgba(255, 255, 255, 1);
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 0.20rem;
				box-sizing: border-box;
				p:nth-child(1) {
					font-size: 0.28rem;
					font-family: PingFangSC-Regular;
					color: rgba(26, 38, 66, 1);
				}
				p:nth-child(2) {
					font-size: 0.30rem;
					font-family: PingFangSC-Regular;
					color: #1A2642;
					display: flex;
					align-items: center;
					i {
						font-size: 0.40rem;
						color: rgba(115, 134, 173, 1);
					}
				}
			}
		}
		.fix-box {
			position: fixed;
			bottom: 0;
			width: 100%;
			background-color: white;
			.one {
				height: 1.02rem;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 0.24rem;
				box-sizing: border-box;
				.left {
					width: 1.64rem;
					height: 0.46rem;
					/*line-height: 0.46rem;
					text-align: center;
					background: rgba(51, 111, 255, 0.21);
					border-radius: 4px;
					border: 1px solid rgba(51, 111, 255, 1);
					font-size: 0.24rem;
					font-family: TRENDS;
					color: rgba(51, 111, 255, 1);*/
					img {
						width: 100%;
						height: 100%;
					}
				}
				.right {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					.ky {
						font-size: 0.28rem;
						font-family: PingFangSC-Regular;
						color: rgba(144, 162, 199, 1);
						margin-right: 0.16rem;
						.weui-cell:before {
							border-top: none;
						}
					}
				}
			}
			.two {
				height: 1.02rem;
				padding: 0 0.24rem;
				box-sizing: border-box;
				width: 100%;
				position: relative;
				input {
					width: 100%;
					height: 100%;
					font-size: 0.24rem;
					font-family: PingFangSC-Regular;
					color: rgba(160, 160, 160, 1);
				}
				input::-webkit-outer-spin-button,
				input::-webkit-inner-spin-button {
					-webkit-appearance: none !important;
					margin: 0;
				}
			}
			.two:before,
			.three:before {
				content: " ";
				position: absolute;
				left: 0;
				top: 0;
				right: 0;
				height: 1px;
				border-top: 1px solid #D8DFF0;
				color: #D8DFF0;
				-webkit-transform-origin: 0 0;
				transform-origin: 0 0;
				-webkit-transform: scaleY(0.5);
				transform: scaleY(0.5);
				left: 0px;
			}
			.three {
				width: 100%;
				height: 1rem;
				display: flex;
				position: relative;
				.left {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					padding-right: 0.20rem;
					box-sizing: border-box;
					p:nth-child(1) {
						font-size: 0.28rem;
						font-family: PingFangSC-Regular;
						color: rgba(34, 34, 34, 1);
					}
					p:nth-child(2) {
						font-size: 0.38rem;
						font-family: PingFangSC-Medium;
						color: rgba(242, 48, 48, 1);
						i {
							font-size: 0.24rem;
						}
					}
				}
				.right {
					width: 2.4rem;
					height: 1rem;
					line-height: 1rem;
					background: rgba(51, 111, 255, 1);
					text-align: center;
					font-size: 0.28rem;
					font-family: PingFangSC-Regular;
					color: rgba(255, 255, 255, 1);
				}
			}
		}
	}
</style>
<style lang="less">
	.sure-box {
		.fix-box {
			.right {
				.weui-cell:before {
					border-top: none!important;
				}
			}
		}
	}
</style>
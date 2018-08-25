<template>
	<section class="commodity_order_box">
		<settingHeader :title="title"></settingHeader>
		<div v-if="address != ''" class="address-box" @click="selectAddress">
			<img class="left-img" :src="'./static/images/dibiao.png'">
			<div>
				<p class="user-tip"><span>{{address.name}}</span><span>{{address.mobile}}</span></p>
				<p class="user-address">{{address.province+address.city+address.area+address.address}}</p>
			</div>
			<img class="right-img" :src="'./static/images/b-right.png'" />
		</div>
		<div v-else class="address-box" @click="addAddress">
			<img class="left-img" :src="'./static/images/dibiao.png'">
			<div class="null_address">
				<p>暂无收货地址</p>
				<p>去设置</p>
			</div>
			<img class="right-img" :src="'./static/images/b-right.png'" />
		</div>
		<img class="fenjiexian" :src="'./static/images/fenjiexian.png'" />
		<div class="pay_type">
			<span>支付方式</span>
			<span>在线支付</span>
		</div>
		<div class="order_item">
			<div class="order_top">
				<div class="left">
					<img :src="'./static/images/shopLogo.png'" alt="" />
					<p>{{goodsInfo.enterpriseName}}</p>
				</div>
			</div>
			<div class="order_middle">
				<div class="left">
					<img v-if="goodsInfo.goodsLogo" :src="goodsInfo.goodsLogo" />
					<img v-else :src="'./static/images/pr.png'" />
				</div>
				<div class="middle">
					<p class="name">{{goodsInfo.goodsName}}</p>
					<p class="pinfo">{{goodsInfo.skuName}}</p>
					<!--<p class="tip">信用积分最多可抵40元</p>-->
				</div>
				<div class="right">
					<p class="price">¥{{goodsInfo.minPrice}}</p>
					<p class="oldprice">¥{{goodsInfo.minOriginPrice}}</p>
					<p class="num">x {{goodsInfo.goodsNum}}</p>
				</div>
			</div>
		</div>
		<div class="number-box pr">
			<p>购买数量</p>
			<x-number v-model="goodsInfo.goodsNum" :min="1" width="50px" button-style="round" @on-change="numC"></x-number>
		</div>
		<div class="goods-spec pr">
			<div>优惠券</div>
			<div @click="show = true">
				<p v-if="couponName">{{couponName}}</p>
				<p v-else>{{availableCoupon.length}}张可用</p>
				<img :src="'./static/images/b-right.png'" />
			</div>
		</div>
		<div class="goods-spec pr">
			<div>发票</div>
			<div>
				<p>不需要</p>
				<img :src="'./static/images/b-right.png'" />
			</div>
		</div>
		<div class="goods-spec">
			<div>卖家留言</div>
			<div class="input-box">
				<input type="text" v-model="remark" class="input" placeholder="选填:填写内容已和卖家协商确认" />
			</div>
		</div>
		<div class="integral-box">
			<div class="top pr" v-if="1>2">
				<div class="left">
					<div class="one">
						<div>信用积分</div><span>可用：10000.00</span><img :src="'./static/images/taihao.png'" />
					</div>
					<p>信用积分最多可抵40元</p>
				</div>
				<div class="right">
					<p>已抵用<i>¥ 40.00</i></p>
					<img :src="'./static/images/b-right.png'" />
				</div>
			</div>
			<div class="middle">
				<div class="left">
					<div>
						<img :src="'./static/images/qian.png'" />
						<p>通用积分</p>
					</div>
					<p class="money">可用：{{availableBalance}}</p>
				</div>
				<div class="right" @click="showIntegral = true">
					<p>已抵用<i>¥ {{Number(integralNum).toFixed(2)}}</i></p>
					<img :src="'./static/images/b-right.png'" />
				</div>
			</div>
		</div>
		<div class="fixed_box">
			<div class="bottom-btn">
				<div class="left">
					共 <i>{{goodsInfo.goodsNum}}</i> 件，总计 <span>¥ {{payMoney}}</span>
				</div>
				<div class="right" @click="payNow">立即支付</div>
			</div>
		</div>
		<div v-transfer-dom>
			<popup class="coupon-popup" v-model="show">
				<div class="pr-box">
					<div class="header">
						<div class="all">
							<p>优惠券</p>
							<img @click="show = false" :src="'./static/images/guanbi.png'" />
						</div>
					</div>
					<div class="couponlist-box">
						<div v-for="(item,index) in availableCoupon" :key="index" class="bs" @click="sure(index,item)">
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
											<span>{{item.denomination}}</span>元
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
			<popup v-model="showIntegral">
				<div class="integral_popup">
					<div class="pd">
						<p class="title">通用积分使用</p>
						<div class="tip">
							<p>使用金额</p>
							<p>可用：{{availableBalance}}</p>
						</div>
						<div class="input-div">
							<p>¥</p>
							<input type="number"  v-model="integralNum" @input="integralNumChange" placeholder="请输入通用积分数">
						</div>
						<p class="gz" @click="$router.push({path:'/member/earnings/rule'})">通用积分规则</p>
					</div>
					<div class="btn" @click="showIntegral = false">确定</div>
				</div>
			</popup>
		</div>
		<payMode :options="payOptions"></payMode>
		<addressMode :options="addressOptions" @watch="select"></addressMode>
	</section>
</template>

<script>
	import settingHeader from '@/components/setting_header'
	import { Popup, Group, Cell, XNumber, XInput } from 'vux'
	import payMode from '@/components/payMode'
	import addressMode from '@/views/member/address/select_address'
	export default {
		components: {
			settingHeader,
			Popup,
			Group,
			Cell,
			XNumber,
			XInput,
			payMode,
			addressMode
		},
		data() {
			return {
				title: '确认订单',
				payOptions: {},
				addressOptions: {
					showAddressMode: false
				},
				address: {},
				addressId: '',
				goodsInfo: {},
				availableCoupon: [],
				show: false,
				showIntegral: false,
				sureIndex: 1115,
				userCouponIds: [],
				couponName: '',
				denomination: 0,
				condition: 0,
				integralNum: '',
				remark: '',
				availableBalance: 0,
				maxBalance: 0,
				payMoney: 0,
				allMoney: 0,
				discount: 0,
				couponType: 0,
			}
		},
		created() {
			var _this = this
			//商品信息
			this.goodsInfo = {
				'enterpriseName': this.$route.query.enterpriseName,
				'goodsLogo': this.$route.query.goodsLogo,
				'goodsName': this.$route.query.goodsName,
				'skuName': this.$route.query.skuName,
				'minPrice': this.$route.query.minPrice,
				'minOriginPrice': this.$route.query.minOriginPrice,
				'goodsNum': this.$route.query.goodsNum,
				'skuId': this.$route.query.skuId
			}

			this.payOptions = {
				showPayMode: false,
				data: {
					time: 900,
					money: this.payMoney,
				},
				changePay(index) {
					console.log(index)
				},
				toPay(index) {
					if(index == 1) {
						_this.$router.push({
							path: '/member/pay/wxgzhpay'
						})
					}
				},
				close() {
					_this.$dialog.show({
						type: 'warning',
						headMessage: '提示',
						message: '亲，确定取消付款吗?',
						buttons: ['继续支付', '取消支付'],
						canel() {
							_this.$router.replace({
								path: '/shop/my_order2',
								query: {
									status: 1,
									tabIndex: 1
								}
							})
						},
						confirm() {

						}
					})
				},
				hide() {

				},
				show() {

				}
			}

			this.allMoney = this.goodsInfo.minPrice * this.goodsInfo.goodsNum

			this.getEquipmentOrderConfirmInfo()
		},
		mounted() {

		},
		methods: {
			numC() {

				var _this = this

				_this.$router.replace({
					query: _this.merge(_this.$route.query, {
						'goodsNum': _this.goodsInfo.goodsNum
					})
				})

				this.allMoney = this.goodsInfo.minPrice * this.goodsInfo.goodsNum
				
				if(Number(this.integralNum) < 0){
					this.integralNum = 0
				}

				var inputNum = this.integralNum == '' ? 0 : this.integralNum
				
				//强制保留两位小数点
				var regStrs = [
					['^0(\\d+)$', '$1'], //禁止录入整数部分两位以上，但首位为0
					['[^\\d\\.]+$', ''], //禁止录入任何非数字和点
					['\\.(\\d?)\\.+', '.$1'], //禁止录入两个以上的点
					['^(\\d+\\.\\d{2}).+', '$1'] //禁止录入小数点后两位以上
				]
				
				var num = this.integralNum.toString()
				
				for(var i = 0; i < num.length; i++) {
					var reg = new RegExp(regStrs[i][0])
					this.integralNum =  num.replace(reg, regStrs[i][1])
				}
				
				//优先减去优惠券满足金额
				if(this.couponType == 20) { //满减券
					if(Number(this.allMoney) >= Number(this.condition)) {
						this.payMoney = Number(this.allMoney) - Number(this.denomination) //选择优惠券减去的钱
					}
				} else if(this.couponType == 30) { //折扣券
					if(Number(this.allMoney) >= Number(this.condition)) {
						var minMoney = Number(this.allMoney) * (1 - Number(this.discount))
						if(minMoney < Number(this.denomination)) {
							this.payMoney = Number(this.allMoney) - minMoney
						} else {
							this.payMoney = Number(this.allMoney) - Number(this.denomination)
						}

					}
				} else if(this.couponType == 50) { //现金券
					this.payMoney = Number(this.allMoney) - Number(this.denomination)
				} else {
					this.payMoney = Number(this.allMoney)
				}

				var minAllMoney = Number(this.payMoney).toFixed(2)

				//再减去通用积分
				if(Number(minAllMoney) <= Number(this.availableBalance)) {
					this.integralNum = Number(minAllMoney)
					inputNum = Number(minAllMoney)
					if(Number(this.integralNum) > Number(minAllMoney)) {
						this.integralNum = Number(minAllMoney)
						inputNum = Number(minAllMoney)
					}
					this.payMoney = Number(minAllMoney) - Number(inputNum)
				}

				if(Number(minAllMoney) > Number(this.availableBalance)) {
					this.integralNum = Number(this.availableBalance)
					inputNum = Number(this.availableBalance)
					if(Number(this.integralNum) > Number(this.availableBalance)) {
						this.integralNum = Number(this.availableBalance)
						inputNum = Number(this.availableBalance)
					}

					this.payMoney = Number(minAllMoney) - Number(inputNum)
				}

				this.payMoney = Number(this.payMoney).toFixed(2)

				console.log(this.payMoney)
			},
			select(addressItem) {
				if(addressItem) {
					this.address = addressItem
					this.addressId = addressItem.addressId
				} else {
					this.address = {}
					this.addressId = ''
				}

			},
			addAddress() {
				this.$router.push({
					path: '/member/address/edit'
				})
			},
			selectAddress() {
				this.addressOptions.showAddressMode = true
			},
			payNow() {
				var _this = this

				_this.$http.post(_this.url.goods.buynow, {
					userId: _this.$store.state.user.userId,
					platformId: _this.url.platformId,
					addressId: _this.addressId,
					balance: _this.integralNum != '' ? _this.integralNum : 0,
					enterprisePrice: _this.payMoney,
					nums: _this.goodsInfo.goodsNum,
					skuId: _this.goodsInfo.skuId,
					userCouponIds: _this.userCouponIds,
					remark: _this.remark
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
									path: '/shop/o_success'
								})
							}, 1000)
						} else if(res.data.data.status == 2) {
							_this.payOptions.showPayMode = true
							_this.payOptions.data.money = res.data.data.payPrice
						}
					}
				})
			},
			integralNumChange(e) {
				
				if(Number(this.integralNum) < 0){
					this.integralNum = 0
				}

				var inputNum = this.integralNum == '' ? 0 : this.integralNum
				
				//强制保留两位小数点
				var regStrs = [
					['^0(\\d+)$', '$1'], //禁止录入整数部分两位以上，但首位为0
					['[^\\d\\.]+$', ''], //禁止录入任何非数字和点
					['\\.(\\d?)\\.+', '.$1'], //禁止录入两个以上的点
					['^(\\d+\\.\\d{2}).+', '$1'] //禁止录入小数点后两位以上
				]
				
				var num = this.integralNum.toString()
				
				for(var i = 0; i < num.length; i++) {
					console.log(regStrs[i][0])
					var reg = new RegExp(regStrs[i][0])
					this.integralNum =  num.replace(reg, regStrs[i][1])
				}
				
				//优先减去优惠券满足金额
				if(this.couponType == 20) { //满减券
					if(Number(this.allMoney) >= Number(this.condition)) {
						this.payMoney = Number(this.allMoney) - Number(this.denomination) //选择优惠券减去的钱
					}
				} else if(this.couponType == 30) { //折扣券
					if(Number(this.allMoney) >= Number(this.condition)) {
						var minMoney = Number(this.allMoney) * (1 - Number(this.discount))
						if(minMoney < Number(this.denomination)) {
							this.payMoney = Number(this.allMoney) - minMoney
						} else {
							this.payMoney = Number(this.allMoney) - Number(this.denomination)
						}
					}
				} else if(this.couponType == 50) { //现金券
					this.payMoney = Number(this.allMoney) - Number(this.denomination) //选择优惠券减去的钱
				} else {
					this.payMoney = Number(this.allMoney)
				}

				var minAllMoney = Number(this.payMoney).toFixed(2)

				//再减去通用积分
				if(Number(minAllMoney) <= Number(this.availableBalance)) {
					if(Number(this.integralNum) > Number(minAllMoney)) {
						this.integralNum = Number(minAllMoney)
						inputNum = Number(minAllMoney)
					}
					this.payMoney = Number(minAllMoney) - Number(inputNum)
				}

				if(Number(minAllMoney) > Number(this.availableBalance)) {

					if(Number(this.integralNum) > Number(this.availableBalance)) {
						this.integralNum = Number(this.availableBalance)
						inputNum = Number(this.availableBalance)
					}

					this.payMoney = Number(minAllMoney) - Number(inputNum)
				}

				this.payMoney = Number(this.payMoney).toFixed(2)
			},
			//获取优惠券列表
			getEquipmentOrderConfirmInfo(id, num) {
				var _this = this

				_this.$http.get(_this.url.share.getEquipmentOrderConfirmInfo, {
					params: {
						userId: _this.$store.state.user.userId,
						platformId: _this.url.platformId,
						equipNumber: 60009,
						skuId: 2
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						for(var i = 0; i < res.data.data.availableCoupon.length; i++) {
							res.data.data.availableCoupon[i].show = false
						}
						_this.availableCoupon = res.data.data.availableCoupon
						_this.availableBalance = res.data.data.availableBalance

						this.integralNum = Number(this.availableBalance) > Number(this.goodsInfo.minPrice) ? Number(this.goodsInfo.minPrice) * Number(this.$route.query.goodsNum) : Number(this.availableBalance)

						this.payMoney = (Number(this.$route.query.minPrice) * Number(this.$route.query.goodsNum) - Number(this.integralNum)).toFixed(2)
					}
				})
			},
			//  优惠券  下标 名字 减去金额 类型  使用门槛 
			sure(index, item) {
				this.sureIndex = index

				let sureCouponList = []

				for(var i = 0; i < this.availableCoupon.length; i++) {
					if(i != index) {
						this.availableCoupon[i].show = false
					} else {
						this.availableCoupon[i].show = this.availableCoupon[index].show
					}
				}

				this.availableCoupon[index].show = !this.availableCoupon[index].show

				for(var i = 0; i < this.availableCoupon.length; i++) {
					if(this.availableCoupon[i].show) {
						this.userCouponIds.push(this.availableCoupon[i].userCouponId)
						sureCouponList.push(this.availableCoupon[i])
					}
				}

				if(sureCouponList.length > 0) {
					this.couponType = item.type //获取优惠券类型
					this.couponName = item.name //获取优惠券标题
					this.denomination = item.denomination //获取优惠券减去金额
					this.condition = item.condition //获取优惠券门槛金额
					this.discount = item.discount //获取优惠券折扣
				} else {
					this.userCouponIds = []
					this.couponName = ''
					this.denomination = 0
					this.condition = 0
					this.discount = 0
				}

				this.allMoney = this.goodsInfo.minPrice * this.goodsInfo.goodsNum

				this.integralNumChange()
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
	
	.commodity_order_box {
		padding-bottom: 1.80rem;
		background-color: #F5F6FA;
		.address-box {
			display: flex;
			align-items: center;
			height: 1.92rem;
			padding: 0 0.20rem;
			background-color: white;
			position: relative;
			.null_address {
				width: 100%;
				display: flex;
				justify-content: space-between;
				padding-right: 0.25rem;
				font-size: 0.28rem;
				font-family: PingFangSC-Regular;
				color: rgba(160, 160, 160, 1);
				p:nth-child(2) {
					color: rgba(51, 51, 51, 1)!important;
				}
			}
			.left-img {
				width: 0.32rem;
				height: auto;
				margin-right: 0.25rem;
			}
			.user-tip {
				font-size: 0.28rem;
				font-family: PingFangSC-Regular;
				color: rgba(51, 51, 51, 1);
				span:nth-child(1) {
					margin-right: 0.40rem;
				}
			}
			.user-address {
				margin-top: 0.1rem;
				font-size: 0.28rem;
				font-family: PingFangSC-Regular;
				color: rgba(51, 51, 51, 1);
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				padding-right: 0.2rem;
			}
			.right-img {
				width: 0.2rem;
				margin-left: 0.50rem;
				position: absolute;
				top: 50%;
				right: 0%;
				transform: translate(-0.2rem, -50%);
			}
		}
		.fenjiexian {
			width: 100%;
			height: 0.12rem;
			display: block;
		}
		.pay_type {
			height: 1.02rem;
			background: rgba(255, 255, 255, 1);
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 0.28rem;
			font-family: PingFangSC-Regular;
			color: rgba(53, 53, 53, 1);
			padding: 0 0.20rem;
			box-sizing: border-box;
		}
		.order_item {
			background: white;
			margin-top: 0.20rem;
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
				}
				.right {
					width: 35%;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					font-size: 0.26rem;
					font-family: PingFangSC-Medium;
					color: rgba(51, 111, 255, 1);
				}
			}
			.order_middle {
				height: 1.70rem;
				display: flex;
				background: rgba(245, 246, 250, 1);
				position: relative;
				.left {
					width: 1.70rem;
					height: 1.70rem;
					display: flex;
					align-items: center;
					justify-content: center;
					img {
						width: 80%;
						height: auto;
					}
				}
				.middle {
					width: 3.8rem;
					padding: 0.18rem;
					box-sizing: border-box;
					.name {
						font-size: 0.24rem;
						font-family: PingFangSC-Regular;
						color: rgba(26, 38, 66, 1);
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						margin-top: 0.20rem;
					}
					.pinfo {
						font-size: 0.24rem;
						font-family: PingFangSC-Regular;
						color: rgba(144, 162, 199, 1);
						margin-top: 0.05rem;
						margin-bottom: 0.05rem;
					}
					.tip {
						font-size: 0.24rem;
						font-family: PingFangSC-Regular;
						color: rgba(51, 111, 255, 1);
					}
				}
				.right {
					flex: 1;
					text-align: right;
					padding: 0.18rem 0.30rem 0rem 0rem;
					box-sizing: border-box;
					.price {
						font-size: 0.24rem;
						font-family: PingFangSC-Regular;
						color: rgba(26, 38, 66, 1);
					}
					.oldprice {
						text-decoration: line-through;
						font-size: 0.24rem;
						font-family: PingFangSC-Regular;
						color: rgba(144, 162, 199, 1);
						margin-top: 0.05rem;
					}
					.num {
						font-size: 0.24rem;
						font-family: PingFangSC-Regular;
						color: rgba(144, 162, 199, 1);
						margin-top: 0.05rem;
					}
				}
			}
		}
		.pr {
			position: relative;
		}
		.pr:after {
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
		.number-box {
			padding: 0 0.20rem;
			box-sizing: border-box;
			box-sizing: border-box;
			height: 1rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: white;
			p:nth-child(1) {
				font-size: 0.28rem;
				font-family: PingFangSC-Regular;
				color: rgba(26, 38, 66, 1);
			}
		}
		.goods-spec {
			height: 1rem;
			background: rgba(255, 255, 255, 1);
			background-color: white;
			padding: 0 0.30rem;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			div:nth-child(1) {
				font-size: 0.28rem;
				font-family: PingFangSC-Regular;
				color: rgba(26, 38, 66, 1);
			}
			div:nth-child(2) {
				display: flex;
				align-items: center;
				p {
					font-size: 0.28rem;
					font-family: PingFangSC-Regular;
					color: rgba(53, 53, 53, 1);
					margin-right: 0.25rem;
				}
				img {
					width: 0.2rem;
					height: auto;
				}
			}
			.input-box {
				display: flex;
				align-items: center;
				height: 100%;
				flex: 1;
				p {
					font-size: 0.28rem;
					font-family: PingFangSC-Regular;
					color: rgba(53, 53, 53, 1);
					margin-right: 0.25rem;
				}
				img {
					width: 0.2rem;
					height: auto;
				}
				.input {
					width: 100%;
					margin-left: 0.20rem;
					height: 100%;
					text-align: right;
				}
			}
		}
		.integral-box {
			margin-top: 0.20rem;
			background-color: white;
			.top {
				height: 1.40rem;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 0.20rem;
				box-sizing: border-box;
				.left {
					display: flex;
					justify-content: center;
					flex-direction: column;
					.one {
						display: flex;
						align-items: center;
						justify-content: center;
						div {
							width: 0.90rem;
							height: 0.26rem;
							line-height: 0.26rem;
							text-align: center;
							background: linear-gradient(-134.5deg, rgba(12, 74, 234, 0.99), rgba(57, 115, 255, 0.9));
							border-radius: 12px;
							font-size: 0.20rem;
							font-family: PingFangSC-Regular;
							color: rgba(255, 255, 255, 1);
						}
						span {
							font-size: 0.28rem;
							font-family: PingFangSC-Regular;
							color: rgba(53, 53, 53, 1);
							margin: 0 0.10rem;
						}
						img {
							width: 0.26rem;
						}
					}
					p {
						margin-top: 0.10rem;
						font-size: 0.24rem;
						font-family: PingFangSC-Regular;
						color: rgba(46, 106, 255, 1);
					}
				}
				.right {
					display: flex;
					align-items: center;
					p {
						font-size: 0.28rem;
						font-family: PingFangSC-Regular;
						color: rgba(160, 160, 160, 1);
						i {
							color: #F23030;
						}
					}
					img {
						width: 0.20rem;
						margin-left: 0.25rem;
					}
				}
			}
			.middle {
				height: 1.40rem;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 0.20rem;
				box-sizing: border-box;
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
						i {
							color: #F23030;
						}
					}
					img {
						width: 0.20rem;
						margin-left: 0.25rem;
					}
				}
			}
		}
		.fixed_box {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			background-color: white;
			.bottom-btn {
				height: 1.0rem;
				display: flex;
				align-items: center;
				position: relative;
				.left {
					flex: 1;
					height: 100%;
					line-height: 1.0rem;
					font-size: 0.24rem;
					font-family: PingFangSC-Regular;
					color: rgba(34, 34, 34, 1);
					text-align: right;
					padding-right: 0.26rem;
					i {
						color: #F23030;
					}
					span {
						color: #F23030;
						font-size: 0.32rem;
					}
				}
				.right {
					width: 2.40rem;
					height: 100%;
					font-size: 0.28rem;
					font-family: PingFangSC-Regular;
					color: rgba(255, 255, 255, 1);
					display: flex;
					align-items: center;
					justify-content: center;
					background: rgba(51, 111, 255, 1);
				}
			}
			.bottom-btn:after {
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
		}
	}
</style>
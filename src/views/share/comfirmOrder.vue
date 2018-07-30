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
						<p class="name">{{info.shortName}}</p>
						<p class="pinfo">{{info.skuName}}:{{info.serviceTime}}</p>
					</div>
					<p class="price">¥{{info.price}}</p>
				</div>
			</div>
			<div class="order_bottom">
				<p>优惠券选择</p>
				<p @click="showCouponList">{{couponName?couponName:info.availableCouponNums+'张可用'}}<i class="iconfont icon-arrow-right"></i></p>
			</div>
		</div>
		<div class="fix-box">
			<div class="one">
				<div class="left">
					<!--通用积分-->
					<img :src="'./static/share/tyjf.png'" alt="" />
				</div>
				<div class="right">
					<p class="ky">可用：{{info.availableBalance}} </p>
					<x-switch title="" v-model="value"></x-switch>
				</div>
			</div>
			<div class="two" v-if="value">
				<input type="number" v-model="info.recommendBalance" @input="inputChange" placeholder="请输入使用的通用积分" />
			</div>
			<div class="three">
				<div class="left">
					<p>需付款：</p>
					<p><i>¥ </i>{{info.payPrice}}</p>
				</div>
				<div class="right" @click="submit()">确认提交</div>
			</div>
		</div>

		<popup class="coupon-popup" v-model="show">
			<div class="pr-box">
				<div class="header">
					<div class="all">
						<p>优惠券</p>
						<img @click="show = false" :src="'./static/images/guanbi.png'" />
					</div>
				</div>
				<div class="couponlist-box">
					<div v-for="(item,index) in info.availableCoupon" :key="index" class="bs" @click="sure(index,item.name,item.denomination,item.type,item.condition)">
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
									<div v-if="item.type == 0 || item.type == 10 || item.type == 20 || item.type == 50"><span>{{item.denomination}}</span>元</div>
									<div v-if="item.type == 30"><span>{{item.denomination}}</span>折</div>
								</div>
							</div>
						</div>
						<div class="bottom show">
							<span class="shang">{{item.content?item.content:'暂无详细说明'}}</span>
							<img class="r180" :src="'./static/images/xia.png'" alt="" />
						</div>
					</div>

				</div>
				<div class="btn" @click="show = false">关闭</div>
			</div>

		</popup>
		<payMode :options="payOptions"></payMode>
	</section>
</template>

<script>
	import settingHeader from '../../components/setting_header'
	import { XSwitch, Popup } from 'vux'
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
				type: 0,
				condition: 0
			}
		},
		components: {
			settingHeader,
			XSwitch,
			Popup,
			payMode
		},
		created() {

			this.getEquipmentOrderConfirmInfo(this.$route.query.equipNumber, this.$route.query.skuId)

			this.payOptions = {
				showPayMode: false,
				data: {
					money: 0,
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
					return this.info.payPrice = this.info.price
				} else {
					//true时计算 输入的积分 和 所选优惠券  金额
					this.inputChange()
				}
			}
		},
		methods: {
			submit() {
				var _this = this

				//当输入积分为空 变成0
				if(this.info.recommendBalance == "") {
					this.info.recommendBalance = 0
				}

				console.log(this.info.recommendBalance)
				console.log(_this.userCouponId)
				return false
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
							_this.payOptions.data.money = _this.info.payPrice
						}
					}
				})
			},
			inputChange() {
				//当拥有积分大于等于商品所需支付金额  输入积分不能大于商品所需支付金额
				if(Number(this.max) >= Number(this.info.price)) {
					if(Number(this.info.recommendBalance) <= Number(this.info.price)) {
						this.info.payPrice = this.info.price - this.info.recommendBalance
					} else {
						this.info.recommendBalance = this.info.price
						this.info.payPrice = this.maxPayPrice
					}
				}
				//当拥有积分小于等于商品所需支付金额  输入积分不能大于拥有积分
				if(Number(this.max) <= Number(this.info.price)) {
					if(Number(this.info.recommendBalance) <= Number(this.max)) {
						this.info.payPrice = this.info.price - this.info.recommendBalance
					} else {
						this.info.recommendBalance = this.max
						this.info.payPrice = this.maxPayPrice
					}
				}
				//当选择了优惠券  类型不为打折券时：
				if(this.info.payPrice > 0 && (this.type == 0 || this.type == 20 || this.type == 50)) {
					let money = (this.info.payPrice - this.denomination) > 0 ? this.info.payPrice - this.denomination : 0
					this.info.payPrice = money.toFixed(2)
				} else if(this.info.payPrice > 0 && this.type == 30) {
					//当选择了优惠券  类型为打折券且满足使用门槛时：
					if(this.info.payPrice > 0 && this.info.price >= this.condition) {
						let money = (this.info.payPrice - this.denomination) > 0 ? this.info.payPrice - this.denomination : 0
						this.info.payPrice = money.toFixed(2)
					}
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
						res.data.data.serviceTime = _this.getTime(res.data.data.serviceTime)
						_this.max = res.data.data.availableBalance
						_this.maxPayPrice = res.data.data.payPrice

						for(var i = 0; i < res.data.data.availableCoupon.length; i++) {
							res.data.data.availableCoupon[i].show = false
						}

						_this.info = res.data.data

					}
				})
			},
			getTime(value) {
				var secondTime = parseInt(value); // 秒
				var minuteTime = 0; // 分
				var hourTime = 0; // 小时
				if(secondTime > 60) { //如果秒数大于60，将秒数转换成整数
					//获取分钟，除以60取整数，得到整数分钟
					minuteTime = parseInt(secondTime / 60);
					//获取秒数，秒数取佘，得到整数秒数
					secondTime = parseInt(secondTime % 60);
					//如果分钟大于60，将分钟转换成小时
					if(minuteTime > 60) {
						//获取小时，获取分钟除以60，得到整数小时
						hourTime = parseInt(minuteTime / 60);
						//获取小时后取佘的分，获取分钟除以60取佘的分
						minuteTime = parseInt(minuteTime % 60);
					}
				}
				var result = "" + parseInt(secondTime) + "秒";

				if(minuteTime > 0) {
					result = "" + parseInt(minuteTime) + "分钟";
				}
				if(hourTime > 0) {
					result = "" + parseInt(hourTime) + "小时";
				}
				return result;
			},
			showCouponList() {
				var _this = this
				_this.show = true
			},
			//  优惠券  下标 名字 减去金额 类型  使用门槛 
			sure(index, name, denomination, type, condition) {
				this.sureIndex = index
				
				let sureCouponList = []

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
				
				console.log(sureCouponList)

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

<style lang="less" scoped>
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
					}
				}
			}
			.no {
				.type-btn {
					background: rgba(144, 162, 199, 1)!important;
				}
				.money {
					color: rgba(144, 162, 199, 1)!important;
					span {
						color: rgba(144, 162, 199, 1)!important;
					}
				}
				.top .one span:nth-child(2),
				.top p {
					color: rgba(144, 162, 199, 1)!important;
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
				padding: 0 0.26rem;
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
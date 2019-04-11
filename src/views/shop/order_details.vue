<template>
	<div class="order-details-box">
		<settingHeader :title="title"></settingHeader>
		<div class="count-down" v-if="orderDetail.payStatus == 2 && orderDetail.status == 0">
			<div class="left">
				<img :src="'./static/images/djs.png'" />
				<p>等待付款</p>
			</div>
			<div class="right" v-if="showStatus == 0">
				<p>剩余：{{countDownTime}}</p>
				<!--<p>需付款：{{orderDetail.payPrice}}</p>-->
			</div>
			<div class="right2" v-else>已取消</div>
		</div>
		<div v-if="orderDetail.addressInfo" class="address-box">
			<img class="left-img" :src="'./static/images/dibiao.png'">
			<div>
				<p class="user-tip"><span>{{orderDetail.addressInfo.name}}</span><span>{{orderDetail.addressInfo.mobile}}</span></p>
				<p class="user-address">{{orderDetail.addressInfo.address}}</p>
			</div>
		</div>
		<div class="order_item" v-if="orderDetail.payStatus == 1">
			<div class="order_top">
				<div class="left" @click="goshop(orderDetail.enterpriseId)">
					<img :src="'./static/images/shopLogo.png'" alt="" />
					<p>{{orderDetail.shopName}}</p>
					<i class="icon iconfont icon-arrow-right"></i>
				</div>
			</div>

			<div>
				<div class="order_middle" v-for="(item,index) in orderDetail.items" :key="index" :class="{'m':(index != orderDetail.items.length - 1)}">
					<div class="left">
						<img v-if="item.thumb" :src="item.thumb.original" />
						<img v-else :src="'./static/images/pr.png'" />
					</div>
					<div class="middle">
						<p class="name">{{item.goodsName}}</p>
						<p class="pinfo">{{item.skuName}}</p>
					</div>
					<div class="right">
						<p class="price">¥ {{item.pieceTruePrice}}</p>
						<p class="oldprice">¥{{item.originPrice}}</p>
						<p class="num">x {{item.number}}</p>
					</div>
				</div>
				<div class="order_bottom">
					<div class="top">
						<div>
							<span>商品原价</span><span>¥ {{orderDetail.originPrice}}</span>
						</div>
						<div>
							<span>优惠金额</span><span>¥ {{orderDetail.discountPrice}}</span>
						</div>
						<div v-if="Number(orderDetail.freight) > 0">
							<span>运费</span><span>¥ {{orderDetail.freight}}</span>
						</div>
					</div>
					<div class="bottom" v-if="orderDetail.type==14">
						<span>需付款</span><span class="red">¥ {{orderDetail.actualPrice}}</span>
					</div>
					<div class="bottom" v-else-if="orderDetail.type==2">
						<span>需付款</span><span class="red">¥ {{orderDetail.actualPrice}}</span>
					</div>
					<div class="bottom" v-else>
						<span>需付款</span><span class="red">¥ {{orderDetail.payPrice}}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="order_item" v-if="orderDetail.payStatus == 2" v-for="(item,index) in orderDetail.subOrder" :key="index">
			<div class="order_top">
				<div class="left" @click="goshop(item.enterpriseId)">
					<img :src="'./static/images/shopLogo.png'" alt="" />
					<p>{{item.shopName}}</p>
					<i class="icon iconfont icon-arrow-right"></i>
				</div>
			</div>

			<div v-for="(goods,index) in item.items" :key="i">
				<div class="order_middle" :class="{'m':(i != item.items.length - 1)}">
					<div class="left">
						<img v-if="goods.thumb" :src="goods.thumb.original" />
						<img v-else :src="'./static/images/pr.png'" />
					</div>
					<div class="middle">
						<p class="name">{{goods.goodsName}}</p>
						<p class="pinfo">{{goods.skuName}}</p>
					</div>
					<div class="right">
						<p class="price">¥ {{goods.pieceTruePrice}}</p>
						<p class="oldprice">¥{{goods.originPrice}}</p>
						<p class="num">x {{goods.number}}</p>
					</div>
				</div>
				<div class="order_bottom">
					<div class="top">
						<div>
							<span>商品原价</span><span>¥ {{goods.originPrice}}</span>
						</div>
						<div>
							<span>优惠金额</span><span>¥ {{orderDetail.discountPrice}}</span>
						</div>
					</div>
					<div class="bottom" v-if="goods.type==14">
						<span>需付款</span><span class="red">¥ {{goods.actualPrice}}</span>
					</div>
					<div class="bottom" v-else-if="goods.type==2">
						<span>需付款</span><span class="red">¥ {{goods.actualPrice}}</span>
					</div>
					<div class="bottom" v-else>
						<span>需付款</span><span class="red">¥ {{goods.pieceTruePrice}}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="pay-box" v-if="orderDetail.payStatus == 1">
			<div>
				<span>支付方式</span>
				<span v-if="orderDetail.payType == 0">余额支付</span>
				<span v-if="orderDetail.payType == 1">微信支付</span>
				<span v-if="orderDetail.payType == 2">支付宝支付</span>
				<span v-if="orderDetail.payType == 3">网银支付</span>
				<span v-if="orderDetail.payType == 4">快捷支付</span>
				<span v-if="orderDetail.payType == 5">其他</span>
			</div>
			<div>
				<span>实际付款</span><span>¥ {{orderDetail.payPrice}}</span>
			</div>
			<div v-if="orderDetail.balance > 0">
				<span>使用通用积分</span><span>{{orderDetail.balance}}</span>
			</div>
			<div v-if="orderDetail.points > 0">
				<span>使用信用积分</span><span>{{orderDetail.points}}</span>
			</div>
			<div class="last" v-if="orderDetail.enterprisePrice > 0">
				<span>
					<p class="one">使用企业余额</p>
					<p class="two" v-if="orderDetail.subOrder">({{orderDetail.subOrder.shopName}})</p>
				</span>
				<span>¥ {{orderDetail.enterprisePrice}}</span>
			</div>
		</div>
		<div class="time-box">
			<div v-if="orderDetail.payStatus == 1">订单编号：{{orderDetail.orderSn}}</div>
			<div v-if="orderDetail.payStatus == 2">订单编号：{{orderDetail.parentOrderSn}}</div>
			<div>创建时间：{{orderDetail.createTime | getDate}}</div>
			<div v-if="orderDetail.payStatus == 1">付款时间：{{orderDetail.payTime | getDate}}</div>
			<slot v-if="orderDetail.type == 3">
				<div>开启时间：{{good.startTime | getDate}}</div>
				<div>累计计时：{{good.useTime}}</div>
				<div>结束时间：{{good.finishTime | getDate}}</div>
			</slot>
		</div>
		<div class="zf-box" v-if="orderDetail.payStatus == 1">
			<div class="btn">信用积分</div>
			<div>奖励<span>{{orderDetail.rewardPoints}}</span>信用积分</div>
		</div>
		<div class="order_bth_box" v-if="orderDetail.payStatus == 1">
			<!--线下门店-->
			<div class="b-top" v-if="orderDetail.type == 1 || orderDetail.type == 12 || orderDetail.type == 13">
				<div class="btn" v-if="orderDetail.status == 70">
					<div @click="deleteOrder(orderDetail.orderSn)">删除订单</div>
					<!--<div>评价订单 </div>-->
				</div>
			</div>
			<!--企业云商城-->
			<div class="b-top" v-if="orderDetail.type == 2">
				<!--待付款-->
				<div class="btn" v-if="orderDetail.status == 0">
					<div @click="cancelOrder(orderDetail.orderSn)">取消订单</div>
					<div>立即付款</div>
				</div>
				<!--待发货-->
				<div class="btn" v-if="orderDetail.status == 10">
					<div @click="cancelOrder(orderDetail.orderSn)">取消订单</div>
					<!--<div>我要催单</div>-->
					<div @click="toLogistics(orderDetail.orderSn)">查看物流</div>
				</div>
				<!--待收货-->
				<div class="btn" v-if="orderDetail.status == 20">
					<div @click="finishOrder(orderDetail.orderSn)">确认收货</div>
					<!--<div>我要催单</div>-->
					<div @click="toLogistics(orderDetail.orderSn)">查看物流</div>
					<!--<div>申请售后</div>-->
				</div>
				<!--待取货-->
				<div class="btn" v-if="orderDetail.status == 30">
					<!--<div>确认取货</div>-->
				</div>
				<!--已完成-->
				<div class="btn" v-if="orderDetail.status == 70">
					<div @click="deleteOrder(orderDetail.orderSn)">删除订单</div>
					<!--<div>评价晒单</div>-->
					<!--<div>查看发票</div>-->
				</div>
				<!--待使用-->
				<div class="btn" v-if="orderDetail.status == 80 ||orderDetail.status == 90 ||orderDetail.status == 110 ||orderDetail.status == 120 ||orderDetail.status == 130 ||orderDetail.status == 140 ||orderDetail.status == 150 ">
					<div @click="toShopDetail(orderDetail.enterpriseId)">联系商家</div>
					<div @click="deleteOrder(orderDetail.orderSn)">删除订单</div>
				</div>
			</div>
			<!--共享服务-->
			<div class="b-top" v-if="orderDetail.type == 3">
				<!--待付款-->
				<div class="btn" v-if="orderDetail.status == 0">
					<div @click="cancelOrder(orderDetail.orderSn)">取消订单</div>
					<div>立即付款</div>
				</div>
				<!--待使用-->
				<div class="btn" v-if="orderDetail.status == 40">
					<div @click="toShopDetail(orderDetail.enterpriseId)">联系商家</div>
					<div @click="$router.push({path: '/share/usetime'})">立即使用</div>
				</div>
				<!--设备挂单-->
				<div class="btn" v-if="orderDetail.status == 50">
					<div @click="toShopDetail(orderDetail.enterpriseId)">联系商家</div>
					<div @click="$router.push({path: '/share/usetime'})">继续使用</div>
				</div>
				<!--使用中-->
				<div class="btn" v-if="orderDetail.status == 60">
					<div @click="$router.push({path: '/share/usetime'})">设备管理</div>
				</div>
				<!--已完成-->
				<div class="btn" v-if="orderDetail.status == 70">
					<div @click="deleteOrder(orderDetail.orderSn)">删除订单</div>

					<!--<div>查看发票</div>-->
					<!--<div>评价晒单</div>-->
				</div>
				<!--使用失败-->
				<div class="btn" v-if="orderDetail.status == 100 || orderDetail.status == 101 || orderDetail.status == 102">
					<div @click="toShopDetail(orderDetail.enterpriseId)">联系商家</div>
					<div @click="$router.push({path: '/share/usetime'})">继续使用</div>
				</div>
				<!--订单超时-->
				<div class="btn" v-if="orderDetail.status == 130">
					<div @click="deleteOrder(orderDetail.orderSn)">删除订单</div>
				</div>
				<!--已取消-->
				<div class="btn" v-if="orderDetail.status == 140">
					<div @click="deleteOrder(orderDetail.orderSn)">删除订单</div>
				</div>
			</div>
		</div>
		<div class="order_bth_box" v-if="orderDetail.payStatus == 2">
			<div class="b-top" v-if="orderDetail.status == 0 && showStatus == 0">
				<div class="btn">
					<div @click="cancelOrder(orderDetail.orderSn)">取消订单</div>
					<div @click="deleteOrder(orderDetail.orderSn)">删除订单</div>
					<div>立即付款</div>
				</div>
			</div>
			<div class="b-top" v-else>
				<div class="btn">
					<div @click="deleteOrder(orderDetail.orderSn)">删除订单</div>
				</div>
			</div>
		</div>
		<actionsheet v-model="isCancelOrder" :menus="cancelReason" @on-click-menu="cancelReasonClick">
			<p slot="header">请选择取消原因</p>
		</actionsheet>
	</div>
</template>

<script>
	import settingHeader from '../../components/setting_header'
	import { Actionsheet } from 'vux'

	export default {
		data() {
			return {
				showStatus: 1,
				countDownTime: '',
				title: '订单详情',
				orderSn: '',
				orderDetail: {},
				good: {},
				isCancelOrder: false,
				cancelReason: [{
						label: '正常',
						value: 0
					},
					{
						label: '订单不能按预计时间送达',
						value: 1
					}, {
						label: '操作有误（商品、地址等选错）',
						value: 2
					},
					{
						label: '重复下单/误下单',
						value: 3
					}, {
						label: '其他渠道价格更低',
						value: 4
					}, {
						label: '该商品降价了',
						value: 5
					},
					{
						label: '不想买了',
						value: 6
					}, {
						label: '商品无货',
						value: 7
					},
					{
						label: '其他',
						value: 8
					},
				],
			}
		},
		components: {
			settingHeader,
			Actionsheet
		},
		created() {
			this.orderSn = this.$route.query.orderSn
			this.getOrderDetail()
		},
		methods: {
			countdowm() {
				var _this = this
				var t = _this.orderDetail.payDeadline - Date.parse(new Date()) / 1000
				if(t < 0) {
					this.showStatus = 1
				} else {
					this.showStatus = 0
				}
				var d = Math.floor(t / 60 / 60 / 24)
				var hour = Math.floor(t / 60 / 60 % 24)
				var min = Math.floor(t / 60 % 60)
				var sec = Math.floor(t % 60)
				if(hour < 10) {
					hour = "0" + hour
				}
				if(min < 10) {
					min = "0" + min
				}
				if(sec < 10) {
					sec = "0" + sec
				}
				_this.countDownTime = hour + "小时" + min + "分" + sec + '秒'
				setTimeout(_this.countdowm, 1000)
			},
			//查看物流
			toLogistics(orderSn) {
				this.$router.push({
					path: '/shop/logistics_detail',
					query: {
						'orderSn': orderSn
					}
				})
			},
			getOrderDetail() {
				var _this = this

				_this.$http.get(_this.url.order.getOrderDetail, {
					params: {
						userId: _this.$store.state.user.userId,
						orderSn: _this.orderSn
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.orderDetail = res.data.data.data
						_this.orderDetail.addressInfo = JSON.parse(_this.orderDetail.addressInfo)
						_this.countdowm()
						//_this.good = res.data.data.data.items[0] //设备商品
					} else {
						_this.$router.back(-1)
					}
				})
			},
			//删除订单
			deleteOrder(orderSn) {
				var _this = this
				_this.$dialog.show({
					type: 'warning',
					headMessage: '提示',
					message: '亲,您确定要删除该订单？',
					buttons: ['确定', '取消'],
					canel() {

					},
					confirm() {
						_this.$http.post(_this.url.order.deleteOrderByOrderSn, {
							userId: _this.$store.state.user.userId,
							orderSn: orderSn,
						}).then((res) => {
							if(res.data.status == "00000000") {
								_this.$vux.toast.show({
									width: '50%',
									type: 'text',
									position: 'middle',
									text: '删除成功'
								})
								_this.$router.back(-1)
							}
						})
					}
				})
			},
			goshop(id) {
				this.$router.push({
					path: '/multi_user_mall',
					query: {
						eid: id,
						// oIndex:3
					}
				})
			},
			//取消订单
			cancelOrder(orderSn) {
				var _this = this
				this.orderSn = orderSn
				this.isCancelOrder = true
			},
			cancelReasonClick(val) {
				var _this = this
				_this.$http.post(_this.url.order.cancelOrderByOrderSn, {
					userId: _this.$store.state.user.userId,
					orderSn: _this.orderSn,
					cancelReason: val
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.$vux.toast.show({
							width: '50%',
							type: 'text',
							position: 'middle',
							text: '取消成功'
						})
						_this.getOrderList()
					}
				})
			},
			//确认收货
			finishOrder(orderId) {
				var _this = this;
				_this.$dialog.show({
					type: 'warning',
					headMessage: "是否确认收货？",
					// message: '是否开启设备？',
					buttons: ['确定', '取消'],
					canel() {
						// console.log('你点击了取消')
					},
					confirm() {
						_this.sureFinishOrder(orderId)
					}
				});
			},
			sureFinishOrder(orderId) {
				var _this = this;
				_this.$http.post(_this.url.order.confirmReceipt, {
					orderSn: orderId,
					userId: _this.$store.state.user.userId
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.$vux.toast.show({
							width: '50%',
							type: 'text',
							position: 'middle',
							text: '完成订单成功'
						})
						_this.getOrderDetail()
					}
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.order-details-box {
		background-color: #F5F6FA;
		padding-bottom: 1.2rem;
		.count-down {
			padding: 0.20rem;
			background-color: #256fff;
			box-sizing: border-box;
			color: white;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.left {
				display: flex;
				align-items: center;
				img {
					width: 0.40rem;
					height: auto;
					margin-right: 0.15rem;
				}
			}
			.right {
				text-align: right;
			}
			.right2 {
				background-color: #90a2c7;
				padding: 0px 5px;
				border-radius: 2px;
			}
		}
		.address-box {
			display: flex;
			align-items: center;
			height: 1.92rem;
			padding: 0 0.20rem;
			background-color: white;
			position: relative;
			margin: 0.20rem 0;
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
		}
		.order_item {
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
						width: auto;
						height: auto;
						max-width: 80%;
						max-height: 80%;
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
					}
					.pinfo {
						font-size: 0.24rem;
						font-family: PingFangSC-Regular;
						color: rgba(144, 162, 199, 1);
						margin-top: 0.05rem;
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
						font-size: 0.24rem;
						font-family: PingFangSC-Regular;
						color: rgba(142, 160, 204, 1);
						text-decoration: line-through
					}
					.num {
						font-size: 0.24rem;
						font-family: PingFangSC-Regular;
						color: rgba(144, 162, 199, 1);
						margin-top: 0.05rem;
					}
				}
			}
			.m:after {
				content: " ";
				position: absolute;
				left: 0;
				bottom: 0;
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
			.order_bottom {
				height: 2.77rem;
				background: rgba(255, 255, 255, 1);
				padding: 0 0.20rem;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				.top {
					height: 1.74rem;
					padding: 0.33rem 0;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					border-bottom: 1px solid rgba(225, 225, 225, 1);
					div {
						display: flex;
						align-items: center;
						justify-content: space-between;
						span {
							font-size: 0.28rem;
							font-family: PingFangSC-Regular;
							color: rgba(26, 38, 66, 1);
						}
					}
				}
				.bottom {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: space-between;
					span {
						font-size: 0.28rem;
						font-family: PingFangSC-Regular;
						color: rgba(26, 38, 66, 1);
					}
					.red {
						color: #F23030;
					}
				}
			}
		}
		.pay-box {
			background: rgba(255, 255, 255, 1);
			margin-top: 0.20rem;
			padding: 0.40rem 0.20rem;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			div {
				margin-bottom: 0.33rem;
				display: flex;
				align-items: flex-start;
				justify-content: space-between;
				span,
				.one {
					font-size: 0.28rem;
					font-family: PingFangSC-Regular;
					color: rgba(26, 38, 66, 1);
				}
			}
			div:last-child {
				margin-bottom: 0;
			}
			.last {
				.two {
					font-size: 0.24rem;
					font-family: PingFangSC-Regular;
					color: rgba(144, 162, 199, 1);
				}
			}
		}
		.time-box {
			margin-top: 0.20rem;
			background: rgba(255, 255, 255, 1);
			padding: 0.40rem 0.20rem;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			div {
				margin-bottom: 0.33rem;
				display: flex;
				align-items: center;
				font-size: 0.28rem;
				font-family: PingFangSC-Regular;
				color: rgba(26, 38, 66, 1);
			}
			div:last-child {
				margin-bottom: 0;
			}
		}
		.zf-box {
			margin-top: 0.20rem;
			height: 1rem;
			background: rgba(255, 255, 255, 1);
			padding: 0.40rem 0.20rem;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			.btn {
				width: 1.1rem;
				height: 0.40rem;
				line-height: 0.40rem;
				text-align: center;
				background: linear-gradient(-90deg, rgba(255, 122, 128, 1), rgba(255, 83, 101, 1));
				border-radius: 2px;
				margin-right: 0.15rem;
				font-size: 0.24rem;
				font-family: PingFangSC-Regular;
				color: rgba(255, 255, 255, 1);
			}
			div:nth-child(2) {
				font-size: 0.28rem;
				font-family: PingFangSC-Regular;
				color: rgba(144, 162, 199, 1);
				span {
					color: #336FFF;
				}
			}
		}
		.order_bth_box {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 1rem;
			.b-top {
				position: relative;
				padding: 0.18rem;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				background-color: white;
				height: 100%;
			}
			.b-top:before {
				content: " ";
				position: absolute;
				left: 0;
				top: 0;
				right: 0;
				height: 1px;
				border-top: 1px solid #d5d5d6;
				color: #D9D9D9;
				-webkit-transform-origin: 0 0;
				transform-origin: 0 0;
				-webkit-transform: scaleY(0.5);
				transform: scaleY(0.5);
				left: 0px;
			}
			.btn {
				display: flex;
				justify-content: flex-end;
				div {
					display: flex;
					align-items: center;
					text-align: center;
					height: 0.56rem;
					padding: 0.18rem;
					box-sizing: border-box;
					border: 1px solid rgba(144, 162, 199, 1);
					border-radius: 2px;
					margin-left: 0.53rem;
					font-size: 0.26rem;
					font-family: PingFangSC-Medium;
					color: rgba(144, 162, 199, 1);
				}
				div:last-child {
					border: 1px solid rgba(51, 111, 255, 1);
					color: rgba(51, 111, 255, 1);
				}
			}
		}
	}
</style>
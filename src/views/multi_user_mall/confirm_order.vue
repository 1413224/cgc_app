<template>
	<section class="commodity_order_box">
		<settingHeader :title="title"></settingHeader>
		<div class="address-box">
			<img class="left-img" :src="'./static/images/dibiao.png'">
			<div>
				<p class="user-tip"><span>张生</span><span>185****6787</span></p>
				<p class="user-address">广东佛山市南海区桂城街道佛平路与宝翠路交 界万科金色领域界</p>
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
					<p>优衣库服饰（番禺店）</p>
				</div>
			</div>
			<div class="order_middle">
				<div class="left">
					<img :src="'./static/images/pr.png'" />
				</div>
				<div class="middle">
					<p class="name">女装U宽腿牛仔裤(水洗产品)</p>
					<p class="pinfo">颜色:蓝色；尺码:L/170修身</p>
					<p class="tip">信用积分最多可抵40元</p>
				</div>
				<div class="right">
					<p class="price">¥69.00</p>
					<p class="oldprice">¥82.00</p>
					<p class="num">x4</p>
				</div>
			</div>
		</div>
		<div class="number-box pr">
			<p>购买数量</p>
			<x-number v-model="num" @on-change="numChange" :min="0" width="50px" button-style="round"></x-number>
		</div>
		<div class="goods-spec pr">
			<div>规格</div>
			<div>
				<p>4张可用</p>
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
				<input type="text" class="input" placeholder="选填:填写内容已和卖家协商确认" />
			</div>
		</div>
		<div class="integral-box">
			<div class="top pr">
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
					<p class="money">可用：876000.50</p>
				</div>
				<div class="right">
					<p>已抵用<i>¥ 40.00</i></p>
					<img :src="'./static/images/b-right.png'" />
				</div>
			</div>
		</div>
		<div class="fixed_box">

			<div class="bottom-btn">
				<div class="left">
					共 <i>4</i> 件，总计 <span>¥ 0.00</span>
				</div>
				<div class="right">立即支付</div>
			</div>
		</div>
	</section>
</template>

<script>
	import settingHeader from '@/components/setting_header'
	import { Popup, Group, Cell, XNumber, XInput } from 'vux'
	export default {
		components: {
			settingHeader,
			Popup,
			Group,
			Cell,
			XNumber,
			XInput
		},
		data() {
			return {
				title: '确认订单',

			}
		},
		created() {

		},
		mounted() {},
		computed: {},
		methods: {
			numChange(val) {
				console.log(val)
			},
		}
	}
</script>
<style type="less">
	.number-box .weui-cell{ padding-left: 0!important; padding-right: 0!important; } .number-box .weui-cell:before{ border-top: none; }
</style>
<style lang="less" scoped>
	.commodity_order_box {
		padding-bottom: 1.80rem;
		background-color: #F5F6FA;
		.address-box {
			display: flex;
			align-items: center;
			height: 1.92rem;
			padding: 0 0.20rem;
			background-color: white;
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
			}
			.right-img {
				width: 0.2rem;
				margin-left: 0.50rem;
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
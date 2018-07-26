<template>
	<section class="sure-box">
		<settingHeader :title="title"></settingHeader>
		<div class="order-box">
			<div class="order_top">
				<div class="left">
					<img :src="'./static/images/shopLogo.png'" alt="" />
					<p>成高成大健康</p>
					<i class="icon iconfont icon-arrow-right"></i>
				</div>
			</div>
			<div class="order_middle">
				<div class="left">
					<img :src="'./static/images/cai2.png'" />
				</div>
				<div class="middle">
					<div>
						<p class="name">威伐光 - 750W </p>
						<p class="pinfo">套餐:30分钟</p>
					</div>
					<p class="price">¥120</p>
				</div>
			</div>
			<div class="order_bottom">
				<p>优惠券选择</p>
				<p>4张可用<i class="iconfont icon-arrow-right"></i></p>
			</div>
		</div>
		<div class="fix-box">
			<div class="one">
				<div class="left">
					通用积分
				</div>
				<div class="right">
					<p class="ky">可用：23400 </p>
					<x-switch title="" v-model="value"></x-switch>
				</div>
			</div>
			<div class="two">
				<input type="number" placeholder="请输入使用的通用积分" />
			</div>
			<div class="three">
				<div class="left">
					<p>需付款：</p>
					<p><i>¥</i>120</p>
				</div>
				<div class="right" @click="$router.push({path:'/share/orderSuccess'})">确认提交</div>
			</div>
		</div>
	</section>
</template>

<script>
	import settingHeader from '../../components/setting_header'
	import { XSwitch } from 'vux'

	export default {
		data() {
			return {
				title: "确认订单"
			}

		},
		components: {
			settingHeader,
			XSwitch
		},
		created() {

		},
		mounted() {

		},
		computed: {

		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
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
					line-height: 0.46rem;
					text-align: center;
					background: rgba(51, 111, 255, 0.21);
					border-radius: 4px;
					border: 1px solid rgba(51, 111, 255, 1);
					font-size: 0.24rem;
					font-family: TRENDS;
					color: rgba(51, 111, 255, 1);
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
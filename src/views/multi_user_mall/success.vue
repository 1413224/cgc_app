<template>
	<div class="success_box">
		<settingHeader title="支付成功"></settingHeader>
		<div class="bg_white border_top">
			<img :src="'./static/images/success.png'" />
			<p>支付成功</p>
		</div>
		<ul class="list_box border_top">
			<li>
				<span>收款店铺</span><span>{{params.enterpriseName}}</span>
			</li>
			<li>
				<span>实际付款</span><span>¥{{Number(params.pay).toFixed(2)}}</span>
			</li>
			<li>
				<span>获得通用积分</span><span class="blue">{{Number(params.returnBalance).toFixed(2)}}</span>
			</li>
			<li>
				<span>获得信用积分</span><span>{{Number(params.returnPoints).toFixed(2)}}</span>
			</li>
		</ul>
		<!-- <div class="draw_box">
			<p>消费福利</p>
			<img :src="'./static/images/draw.png'" />
		</div> -->
		<div class="order" @click="goOrder">我的订单</div>
	</div>
</template>

<script>
	import { Cell, Group } from 'vux'
	import settingHeader from '@/components/setting_header'
	export default {
		data() {
			return {
				params:''
			}
		},
		created() {},
		mounted() {
			this.getRoute()
		},
		methods: {
			getRoute(){
				var _this = this
				_this.params = _this.$route.query
			},
			goOrder(){
				this.$router.push({
					path:'/shop/my_order2'
				})
			}
		},
		components: {
			settingHeader
		}
	}
</script>

<style lang="less" scoped>
	.success_box {
		background-color: #F5F6FA;
		.bg_white {
			height: 2.0rem;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			position: relative;
			background-color: white;
			img {
				width: 0.64rem;
				height: 0.64rem;
				margin-bottom: 0.20rem;
			}
			p {
				font-size: 0.36rem;
				font-family: PingFangSC-Semibold;
				font-weight: 600;
				color: rgba(26, 38, 66, 1);
			}
		}
		.list_box {
			padding: 0.30rem 0.20rem;
			box-sizing: border-box;
			margin-top: 0.20rem;
			position: relative;
			background-color: white;
			li {
				display: flex;
				align-items: center;
				justify-content: space-between;
				span:nth-child(1) {
					font-size: 0.28rem;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(144, 162, 199, 1);
				}
				span:nth-child(2) {
					font-size: 0.28rem;
					font-family: PingFangSC-Medium;
					font-weight: 500;
					color: rgba(26, 38, 66, 1);
				}
				.blue{
					color: #336FFF!important;
				}
			}
			li:not(:last-child) {
				margin-bottom: 0.35rem;
			}
		}
		.draw_box {
			margin-top: 0.20rem;
			padding: 0 0.25rem;
			box-sizing: border-box;
			background-color: white;
			p {
				font-size: 0.28rem;
				font-family: PingFangSC-Medium;
				font-weight: 500;
				color: rgba(26, 38, 66, 1);
				padding: 0.25rem 0;
			}
			img{
				width: 100%;
				height: auto;
			}
		}
		.border_top:after {
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
		.order{
			/*border:1px solid ;*/
			height: 0.88rem;
			width: 3rem;
			margin:1rem auto;
			line-height: 0.88rem;
			box-shadow: 0px 2px 20px 0px rgba(41, 120, 235, 0.4);
			border-radius: .2rem;
			text-align: center;
			background:#3889ff;
			color: #fff;
		}
	}
</style>
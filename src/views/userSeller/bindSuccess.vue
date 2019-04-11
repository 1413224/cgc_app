<template>
	<div class="bind-success-box">
		<img :src="'./static/images/bind-success.png'" />
		<p class="black-p">绑定成功</p>
		<p class="gary-p">恭喜您!已成功绑定为该企业的店员！</p>
		<p class="gary-p">立即推广供应链产品，赚取佣金吧！</p>
		<div class="btn-box">
			<div class="confirm-btn" @click="$router.push({path:'/member/supply/productList'})">供应链云商城</div>
			<div class="canel-btn" @click="$router.push({path:'/member/vip/index'})">赚钱攻略</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {

			}
		},
		components: {

		},
		mounted() {

		}
	}
</script>
<style lang="less" scoped>
	.bind-success-box {
		height: 100%;
		background-color: white;
		padding-top: 0.50rem;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		flex-direction: column;
		position: relative;
		img {
			width: 3.0rem;
			height: auto;
		}
		.black-p {
			font-size: 0.48rem;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
			letter-spacing: 1px;
			margin: 0.20rem 0;
		}
		.gary-p {
			font-size: 0.28rem;
			font-family: PingFangSC-Regular;
			color: rgba(158, 158, 158, 1);
			letter-spacing: 1px;
		}
		.btn-box {
			padding-bottom: 0.88rem;
			text-align: center;
			position: absolute;
			bottom: 0;
			width: 100%;
			.confirm-btn {
				width: 6.0rem;
				height: 1.0rem;
				line-height: 1.0rem;
				text-align: center;
				color: white;
				background: rgba(51, 111, 255, 1);
				border-radius: 50px;
				font-size: 0.34rem;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				letter-spacing: 1px;
				margin: 0.8rem auto;
			}
			.canel-btn {
				width: 6.0rem;
				height: 1.0rem;
				line-height: 1.0rem;
				text-align: center;
				color: #336FFF;
				border: 2px solid rgba(51, 111, 255, 1);
				border-radius: 50px;
				font-size: 0.34rem;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				letter-spacing: 1px;
				margin: 0 auto;
			}
		}
	}
</style>
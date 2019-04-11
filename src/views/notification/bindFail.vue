<template>
	<div class="bind-fail-box">
		<img :src="'./static/images/bind-fail.png'" />
		<p class="black-p">绑定失败</p>
		<p class="gary-p">{{msg}}</p>
		<div class="btn-box">
			<div class="confirm-btn" @click="$router.push({path:'/index'})">CGC联盟首页</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				msg: ''
			}
		},
		components: {

		},
		mounted() {
			this.msg = this.$route.query.msg
		}
	}
</script>
<style lang="less" scoped>
	.bind-fail-box {
		background-color: white;
		padding-top: 1.50rem;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		flex-direction: column;
		position: relative;
		height: 100%;
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
			padding: 0 1.5rem;
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
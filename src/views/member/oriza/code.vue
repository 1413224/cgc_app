<template>
	<div class="auth-qrcode">
		<div class="m-div">
			<p>账号登录</p>
			<p>网络技术开放平台</p>
			<qrcode :value="qrcodeVal" :size="width" type="img" class="qrcode"></qrcode>
			<p class="tip">长按或截图识别二维码</p>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				qrcodeVal: '',
				width: ''
			}
		},
		created() {
			this.loginAuthCode()
			this.width = Number(document.body.clientWidth * 0.5866666666666666)
		},
		methods: {
			loginAuthCode() {
				var _this = this
				_this.$http.get(_this.url.origin.loginAuthCode, {
					params: {
						userId: _this.$store.state.user.userId
					}
				}).then((res) => {
					if(res.data.message == "success") {
						_this.qrcodeVal = res.data.data
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.auth-qrcode {
		height: 100%;
		width: 100%;
		background-color: #222222;
		position: relative;
		.m-div {
			padding: 0.4rem;
			background: rgba(255, 255, 255, 1);
			position: absolute;
			border-radius: 8px;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			p:nth-child(1) {
				font-size: 0.48rem;
				font-family: PingFangSC-Medium;
				color: rgba(53, 53, 53, 1);
				line-height: 0.67rem;
				margin-bottom: 0.10rem;
			}
			p:nth-child(2) {
				font-size: 0.28rem;
				font-family: PingFangSC-Regular;
				color: rgba(53, 53, 53, 1);
				line-height: 0.40rem;
				margin-bottom: 0.35rem;
			}
			.tip {
				font-size: 0.24rem;
				font-family: PingFangSC-Regular;
				color: rgba(26, 38, 66, 1);
				margin-top: 0.50rem;
				text-align: center;
			}
		}
	}
</style>
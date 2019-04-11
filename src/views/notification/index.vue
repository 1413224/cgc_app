<template>
	<div class="notification-box">
		<div class="qy-img-box">
			<img v-if="userLogo != ''" :src="userLogo" />
			<img v-else :src="'./static/images/qytx.png'" />
		</div>
		<div class="btn-box">
			<p>尊敬的{{mobile}}会员，您是否确认绑定为{{enterpriseName}}的通知人？</p>
			<div class="confirm-btn" @click="bind">确认绑定</div>
			<div class="canel-btn" @click="noBind">暂不绑定</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				userLogo: '',
				mobile: '',
				enterpriseName: ''
			}
		},
		created() {
			this.getNotificationInfo()
		},
		methods: {
			getNotificationInfo() {
				var _this = this
				_this.$http.get(this.url.user.getNotificationInfo, {
					params: {
						notificationId: _this.mainApp.getCs('notificationId'),
						userId: _this.$store.state.user.userId
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						if(res.data.data.userLogo) {
							_this.userLogo = res.data.data.userLogo.original
						} else {
							_this.userLogo = ''
						}
						_this.mobile = res.data.data.mobile
						_this.enterpriseName = res.data.data.enterpriseName
						if(res.data.data.status == 1) {
							_this.$router.push({
								path: '/notification/bind_fail',
								query: {
									'msg': '您已经是该角色的通知人，请勿重复绑定'
								}
							})
						}
					}
				})
			},
			bind() {
				var _this = this
				_this.$http.post(this.url.user.bindNotificationUser, {
					userId: _this.$store.state.user.userId,
					notificationId:_this.mainApp.getCs('notificationId')
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.$router.push({
							path: '/notification/bind_success'
						})
					} else {
						_this.$router.push({
							path: '/notification/bind_fail',
							query: {
								'msg': res.data.message
							}
						})
					}
				})
			},
			noBind() {
				this.$router.push({
					path: '/index'
				})
			}
		}
	}
</script>
<style lang="less" scoped>
	.notification-box {
		.qy-img-box {
			height: 3.62rem;
			display: flex;
			align-items: center;
			justify-content: center;
			img {
				width: 2.40rem;
				height: auto;
				border-radius: 50%;
			}
		}
		.btn-box {
			margin-top: 0.88rem;
			padding-bottom: 0.88rem;
			text-align: center;
			p {
				font-size: 0.48rem;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
				line-height: 0.67rem;
				letter-spacing: 1px;
				padding: 0 0.3rem;
			}
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
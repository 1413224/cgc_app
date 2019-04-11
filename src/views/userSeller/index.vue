<template>
	<div class="bind-box">
		<!--<settingHeader title="店员绑定"></settingHeader>-->
		<div class="qy-img-box">
			<img v-if="info.enterpriseLogo" :src="info.enterpriseLogo.original" />
			<img v-else :src="'./static/images/qytx.png'" />
		</div>
		<ul class="qy-info-box">
			<li>
				<span>企业名称</span>
				<span>{{info.enterpriseName}}</span>
			</li>
			<li>
				<span>企业简称</span>
				<span>{{info.enterpriseShortName}}</span>
			</li>
			<li>
				<span>企业地址</span>
				<span class="address">{{info.address}}</span>
			</li>
		</ul>
		<div class="btn-box">
			<p>您是否确定成为该门店会员？</p>
			<div class="confirm-btn" @click="bind">确认绑定</div>
			<div class="canel-btn" @click="noBind">暂不绑定</div>
		</div>
	</div>
</template>
<script>
	import settingHeader from '@/components/setting_header'
	export default {
		data() {
			return {
				info: {}
			}
		},
		components: {
			settingHeader
		},
		created() {
			this.getSellerInfoByUserId()
		},
		methods: {
			getSellerInfoByUserId() {
				var _this = this
				_this.$http.get(this.url.user.getSellerInfoByUserId, {
					params: {
						allianceId: _this.mainApp.getCs('allianceId'),
						userId: _this.$store.state.user.userId
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.info = res.data.data
						if(_this.mainApp.getCs('allianceId') == _this.info.bindAllianceInfo.allianceId) {
							_this.$router.push({
								path: '/user_seller/bind_success'
							})
						} else {
							_this.$router.push({
								path: '/user_seller/bind_fail',
								query: {
									'msg': '你已经绑定了其他企业，请勿重复绑定',
									'allianceId': _this.info.bindAllianceInfo.enterpriseId
								}
							})
						}
					}
				})
			},
			bind() {
				var _this = this
				_this.$http.post(this.url.user.bindSeller, {
					allianceId: _this.info.allianceId,
					userId: _this.$store.state.user.userId
				}).then((res) => {
					if(res.data.status == "00000000") {
						this.$router.push({
							path: '/user_seller/bind_success',
							query: {
								'allianceId': _this.info.allianceId
							}
						})
					} else {
						this.$router.push({
							path: '/user_seller/bind_fail',
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
	.bind-box {
		height: 100%;
		background-color: white;
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
		.qy-info-box {
			li {
				height: 0.9rem;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0.30rem;
				box-sizing: border-box;
				font-size: 0.28rem;
				font-family: PingFangSC-Regular;
				color: rgba(102, 102, 102, 1);
				letter-spacing: 1px;
				.address {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					width: 4rem;
				}
			}
			li:nth-child(2n-1) {
				background: rgba(249, 249, 249, 1);
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
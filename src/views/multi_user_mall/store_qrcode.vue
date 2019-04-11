<template>
	<section class="qrcode">
		<settingHeader :title="info.enterpriseName"></settingHeader>
		<div class="blue">
			<div class="content">
				<div class="store">
					<div class="name">{{info.enterpriseName}}</div>
					<!--<div>联盟企业</div>-->
					<div class="mt">
						<qrcode :value="storeUrl" :size="250" type="img"></qrcode>
					</div>
					<div class="btn">扫描二维码</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import settingHeader from '../../components/setting_header'
	import { Qrcode } from 'vux'
	export default {
		components: {
			settingHeader,
			Qrcode
		},
		data() {
			return {
				info: {}
			}
		},
		created() {
			this.getBasicInfo()

			if(location.host == "health.cgc999.com") {
				this.storeUrl = 'https://health.cgc999.com/web/new/index.html#/multi_user_mall?eid=' + this.$route.query.eid + '&offLine=1'
			} else if(location.host == "cgc.cgc999.com"){
				this.storeUrl = 'https://cgc.cgc999.com/web/new/index.html#/multi_user_mall?eid=' + this.$route.query.eid + '&offLine=1'
			}
			else{
				this.storeUrl = 'http://www.cgc999.com/new/index.html#/multi_user_mall?eid=' + this.$route.query.eid + '&offLine=1'
			}
		},
		methods: {
			// 获取企业详情
			getBasicInfo() {
				var _this = this

				_this.$http.get(_this.url.qy.getBasicInfo, {
					params: {
						// enterpriseId: _this.$route.query.enterpriseId
						enterpriseId: _this.$route.query.eid
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.info = res.data.data
						document.title = _this.info.enterpriseName || '二维码'
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.qrcode {
		background: #90A2C7;
		height: 100%;
		.blue {
			padding-top: 1.19rem;
			.content {
				width: 88.8%;
				background: #fff;
				margin: 0 auto;
				padding-top: 0.72rem;
				border-radius: 0.08rem;
				.store {
					width: 5.06rem;
					margin: auto;
					color: #1A2642;
					font-size: 0.28rem;
					padding-bottom: 0.91rem;
					text-align: center;
					.name {
						font-size: 0.44rem;
						margin-bottom: 0.02rem;
					}
					.mt {
						margin-top: 0.35rem;
					}
					.btn {
						margin-top: 0.72rem;
						font-size: 0.24rem;
						color: #90A2C7;
						text-align: center;
					}
				}
			}
		}
	}
</style>
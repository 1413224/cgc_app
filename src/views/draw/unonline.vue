<template>
	<div class="unonline_box">
		<settingHeader title="线下领奖"></settingHeader>
		<div class="record-item">
			<div class="top">
				<div>第{{info.number}}期</div>
				<p class="ellipsis">{{info.title}}</p>
			</div>
			<div class="bottom">
				<ul>
					<li>
						<span>中奖名称</span>
						<span>{{info.awardName}}</span>
					</li>
					<li>
						<span>价值金额</span>
						<span>￥{{info.bonus}}</span>
					</li>
					<li>
						<span>奖品</span>
						<span>{{info.goodsName}}</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="code_box">
			<div class="bg_w">
				<div class="top">
					<!--<p class="tip1">还剩19时27分截止领奖</p>-->
					<qrcode :value="info.code" :size="width" type="img" class="qrcode"></qrcode>

				</div>
				<div class="bottom">
					<span>核销码: {{info.code}}</span>
				</div>
			</div>
		</div>
		<div class="tip_box">
			<div class="title">
				<span></span>
				<span>领奖时间</span>
			</div>
			<div class="text">
				{{info.getAwardDeadline | getDate}}
			</div>
			<div class="title">
				<span></span>
				<span>领奖地点</span>
			</div>
			<div class="text">
				{{info.getAwardInfo}}
			</div>
			<div class="title">
				<span></span>
				<span>领奖事项</span>
			</div>
			<div class="text">
				1.请在规定时间内到指定地点领取。<br /> 2.请带好相关证件前去领取，如当事人无法到场，代领人员需提供身份证明及与当事人身份关系相关证明 方可发放。<br /> 3.商品不可兑现不可改换。
			</div>
		</div>
	</div>
</template>

<script>
	import settingHeader from '@/components/setting_header'
	export default {
		components: {
			settingHeader
		},
		data() {
			return {
				qrcodeVal: '7259 3671',
				info:{}
			}
		},
		computed: {
			width() {
				return Number(document.body.clientWidth * 0.45)
			}
		},
		created(){
			this.getAwardCode()
		},
		methods: {
			getAwardCode() {
				var _this = this

				_this.$http.get(_this.url.lottery.getAwardCode, {
					params: {
						userId: _this.$store.state.user.userId,
						id: _this.$route.query.id
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.info = res.data.data
					}
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.unonline_box {
		.record-item {
			background: rgba(255, 255, 255, 1);
			overflow: hidden;
			.top {
				height: 1.14rem;
				display: flex;
				align-items: center;
				padding-left: 0.43rem;
				border-bottom: 1px solid #F3F3F3;
				p {
					font-size: 0.30rem;
					font-family: PingFang-SC-Medium;
					font-weight: bold;
					color: rgba(51, 51, 51, 1);
					margin-left: 0.15rem;
					width: 5rem;
				}
				div {
					height: 0.38rem;
					line-height: 0.38rem;
					background: linear-gradient(90deg, rgba(255, 42, 75, 1) 0%, rgba(255, 92, 52, 1) 100%);
					border-radius: 6px;
					border-radius: 3px;
					font-size: 0.26rem;
					font-family: PingFang-SC-Medium;
					color: rgba(255, 255, 255, 1);
					text-align: center;
					margin-left: 0.15rem;
					padding: 0 0.1rem;
				}
			}
			.bottom {
				padding: 0.30rem 0rem;
				display: flex;
				justify-content: space-between;
				align-items: center;
				p {
					font-size: 0.26rem;
					font-family: PingFang-SC-Medium;
					color: rgba(102, 102, 102, 1);
					span {
						color: #E32921;
					}
				}
				ul {
					width: 100%;
					li {
						height: 0.87rem;
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 0 .43rem;
						box-sizing: border-box;
						span:nth-child(1) {
							width: 1.2rem;
							font-size: 0.26rem;
							font-family: PingFang-SC-Medium;
							color: rgba(160, 160, 160, 1);
							display: inline-block;
						}
						span:nth-child(2) {
							color: #666666;
							font-family: PingFang-SC-Medium;
						}
					}
					.bg_red {
						background: rgba(255, 245, 245, 1);
					}
				}
			}
		}
		.code_box {
			padding: 0.22rem 0.41rem;
			box-sizing: border-box;
			border-radius: 6px;
			.bg_w {
				width: 100%;
				height: 100%;
				background-color: white;
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-direction: column;
				.top {
					width: 100%;
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					padding: 0.40rem 0;
					.tip1 {
						font-size: 0.32rem;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(255, 129, 28, 1);
						margin-bottom: 0.20rem;
					}
				}
				.bottom {
					width: 100%;
					height: 1.40rem;
					line-height: 1.40rem;
					text-align: center;
					border-top: 1px dashed #E1E1E1;
					font-size: 0.32rem;
					font-family: PingFang-SC-Medium;
					font-weight: bold;
					color: rgba(51, 51, 51, 1);
					span {
						font-size: 0.26rem;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
					}
				}
			}
		}
		.tip_box {
			background-color: white;
			padding: 0.55rem 0.30rem;
			box-sizing: border-box;
			.title {
				display: flex;
				align-items: center;
				span:nth-child(1) {
					width: 0.13rem;
					height: 0.13rem;
					border-radius: 50%;
					display: inline-block;
					background-color: rgba(51, 51, 51, 1);
				}
				span:nth-child(2) {
					font-size: 0.32rem;
					font-family: PingFang-SC-Medium;
					font-weight: bold;
					color: rgba(51, 51, 51, 1);
					margin-left: 0.10rem;
				}
			}
			.text {
				font-size: 0.26rem;
				font-family: PingFang-SC-Medium;
				color: rgba(160, 160, 160, 1);
				margin: 0.35rem 0;
				line-height: 0.48rem;
			}
		}
	}
</style>
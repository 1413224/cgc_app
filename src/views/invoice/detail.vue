<template>
	<section class="invoice_detail_box">
		<settingHeader title="发票详情"></settingHeader>
		<div class="bg">
			<div class="dis">
				<div class="yuan"></div>
				<p class="from">{{info.invoiceAddress}}</p>
			</div>
			<img class="logo" :src="'./static/images/ptInvoice.png'" />
			<ul class="items_box">
				<li>
					<div class="left">收款方</div>
					<div class="right">{{info.invoicePayee}}</div>
				</li>
				<li>
					<div class="left">付款方</div>
					<div class="right">{{info.invoiceCheckName}}</div>
				</li>
				<li>
					<div class="left">发票金额</div>
					<div class="right">{{info.taxAmount}}</div>
				</li>
				<li>
					<div class="left">开票日期</div>
					<div class="right">{{info.dctime}}</div>
				</li>
				<!--<li>
					<div class="left">发票代码</div>
					<div class="right">{{info.invoiceNum}}</div>
				</li>-->
				<li>
					<div class="left">发票号码</div>
					<div class="right">{{info.invoiceNum}}</div>
				</li>
			</ul>
		</div>
		<ul class="btn_box">
			<li class="blue" @click="toEmail">发送到邮箱</li>
			<li class="white" @click="pdf">查看PDF</li>
		</ul>
	</section>
</template>

<script>
	import settingHeader from '@/components/setting_header'
	export default {
		components: {
			settingHeader
		},
		data() {
			return {
				info: {}
			}
		},
		created() {
			this.queryInvoiceInfoByNum()
		},
		methods: {
			toEmail() {
				this.$router.push({
					path: '/invoice/send',
					query:{
						'info':JSON.stringify(this.info)
					}
				})
			},
			queryInvoiceInfoByNum() {
				var _this = this
				_this.$http.post(_this.url.user.queryInvoiceInfoByNum, {
					num: _this.$route.query.invoiceNum
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.info = res.data.data
					}
				})
			},
			pdf() {
				var _this = this
				_this.$http.post(_this.url.user.checkBlueInvoice, {
					invoiceId: _this.info.invoiceId
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.$showPDF.show(res.data.data.pdfCode)
					}
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.invoice_detail_box {
		padding: 0.15rem;
		box-sizing: border-box;
		.bg {
			height: 7.32rem;
			background: url(../../../static/images/invoice-detail-bg.png) no-repeat;
			background-size: 100% 100%;
			padding: 0 0.60rem;
			box-sizing: border-box;
			.dis {
				display: flex;
				align-items: center;
				font-size: 0.32rem;
				font-family: PingFang-SC-Medium;
				color: rgba(51, 51, 51, 1);
				height: 1.26rem;
				border-bottom: 1px dashed #D9DFF0;
				.yuan {
					width: 0.59rem;
					height: 0.59rem;
					background: rgba(236, 105, 65, 1);
					border-radius: 50%;
					margin-right: 0.30rem;
				}
			}
			.logo {
				width: 2.49rem;
				height: auto;
				margin: 0.3rem auto;
				display: block;
			}
			.items_box {
				li {
					display: flex;
					align-items: center;
					.left {
						width: 1.5rem;
						font-size: 0.28rem;
						font-family: PingFang-SC-Medium;
						color: rgba(160, 160, 160, 1);
						margin-right: 0.50rem;
					}
					.right {
						font-size: 0.28rem;
						font-family: PingFang-SC-Medium;
						color: rgba(51, 51, 51, 1);
					}
				}
				li:not(:last-child) {
					margin-bottom: 0.35rem;
				}
			}
		}
		.btn_box {
			margin-top: 0.50rem;
			padding: 0 0.30rem;
			box-sizing: border-box;
			li {
				height: 0.88rem;
				line-height: 0.88rem;
				text-align: center;
				background: rgba(51, 111, 255, 1);
				border-radius: 2px;
				font-size: 0.28rem;
				font-family: PingFang-SC-Medium;
			}
			.blue {
				color: white;
				background-color: #336FFF;
				margin-bottom: 0.30rem;
			}
			.white {
				color: #A0A0A0;
				background-color: white;
			}
		}
	}
</style>
<template>
	<section class="invoice_send_box">
		<settingHeader title="下载发票"></settingHeader>
		<div class="b_white">
			<p class="tip">邮箱地址</p>
			<div class="input">
				<input type="text" placeholder="请输入您的邮箱地址" />
			</div>
		</div>
		<div class="send_btn" @click="$router.push({path:'/invoice/result'})">发送</div>
	</section>
</template>

<script>
	import settingHeader from '@/components/setting_header'
	import { XInput } from 'vux'
	export default {
		components: {
			settingHeader,
			XInput
		},
		data() {
			return {
				email: ''
			}
		},
		mounted() {

		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.invoice_send_box {
		padding-top: 0.30rem;
		.b_white {
			background-color: white;
			padding: 0.30rem;
			box-sizing: border-box;
			font-size: 0.32rem;
			font-family: PingFang-SC-Medium;
			color: rgba(51, 51, 51, 1);
			.tip {
				margin-bottom: 0.40rem;
			}
			.input {
				width: 100%;
				border-bottom: 1px solid rgba(225, 225, 225, 1);
				padding-bottom: 0.05rem;
				box-sizing: border-box;
				input {
					height: 0.6rem;
					line-height: 0.6rem;
				}
			}
		}
		.send_btn {
			width: 6.18rem;
			height: 0.88rem;
			line-height: 0.88rem;
			text-align: center;
			background: rgba(51, 111, 255, 1);
			border-radius: 2px;
			font-size: 0.28rem;
			font-family: PingFang-SC-Medium;
			color: white;
			background-color: #336FFF;
			margin: 0.40rem auto 0;
		}
	}
</style>
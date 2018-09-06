<template>
	<section class="invoice_result_box">
		<settingHeader title="下载发票"></settingHeader>
		<div class="b_white">
			<img :src="'./static/images/s_success.png'" />
			<p class="tip">发送成功</p>
			<div class="back_btn" @click="$router.replace({path:'/member/index'})">返回</div>
		</div>
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

			}
		},
		mounted() {

		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.invoice_result_box {
		height: 100%;
		background-color: white;
		.b_white {
			padding-top: 0.60rem;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			position: relative;
			img {
				width: 2.09rem;
				height: auto;
			}
			.tip {
				font-size: 0.36rem;
				font-family: PingFang-SC-Medium;
				color: rgba(26, 38, 66, 1);
				margin: 0.60rem 0;
			}
			.back_btn {
				width: 2.42rem;
				height: 0.72rem;
				line-height: 0.72rem;
				text-align: center;
				border: 1px solid rgba(168, 168, 168, 1);
				border-radius: 5px;
				font-size: 0.36rem;
				font-family: PingFang-SC-Medium;
				color: rgba(168, 168, 168, 1);
			}
		}
	}
	
	/*.b_white:before {
		content: " ";
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		height: 1px;
		border-top: 1px solid #D9D9D9;
		color: #D9D9D9;
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		left: 0px;
	}*/
</style>
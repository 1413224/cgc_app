<template>
	<section class="join_result_box">
		<settingHeader title="招商加盟"></settingHeader>
		<div class="top">
			<img :src="'./static/images/s_success.png'" />
			<p class="tip1">申请成功</p>
			<p class="tip2">客服中心会在7个工作日内与您联系</p>
		</div>
		<ul class="list_box">
			<li><span>企业名称</span><span>上海宝尊电子商务有限公司</span></li>
			<li><span>申请人</span><span>金**</span></li>
			<li><span>联系电话</span><span>189****7958</span></li>
			<li><span>申请时间</span><span>2026.06.13</span></li>
		</ul>
		<div class="btn" @click="$router.push({path:'/'})">返回</div>
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
	.join_result_box {
		.top {
			height: 4.38rem;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			margin-bottom: 0.20rem;
			background-color: white;
			img {
				width: 2.10rem;
				height: auto;
			}
			.tip1 {
				font-size: 0.36rem;
				font-family: PingFang-SC-Medium;
				color: rgba(51, 51, 51, 1);
				margin: 0.30rem 0;
			}
			.tip2 {
				font-size: 0.30rem;
				font-family: PingFang-SC-Medium;
				color: rgba(160, 160, 160, 1);
			}
		}
		.list_box {
			background-color: white;
			li {
				height: 1.02rem;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 0.30rem;
				box-sizing: border-box;
				font-size: 0.30rem;
				position: relative;
				span:nth-child(1) {
					color: rgba(51, 51, 51, 1);
				}
				span:nth-child(2) {
					color: #A0A0A0;
				}
			}
			li:not(:last-child):after {
				content: " ";
				position: absolute;
				left: 0;
				bottom: 0;
				right: 0;
				height: 1px;
				border-top: 1px solid #D9D9D9;
				color: #D9D9D9;
				-webkit-transform-origin: 0 0;
				transform-origin: 0 0;
				-webkit-transform: scaleY(0.5);
				transform: scaleY(0.5);
				left: 0px;
			}
		}
		.btn {
			width: 6.18rem;
			height: 0.88rem;
			line-height: 0.88rem;
			text-align: center;
			background: rgba(51, 111, 255, 1);
			border-radius: 3px;
			box-shadow: 2px 0px 20px rgba(51, 111, 255, 0.25);
			font-size: 0.36rem;
			color: rgba(255, 255, 255, 1);
			margin: 0.6rem auto 0;
		}
	}
</style>
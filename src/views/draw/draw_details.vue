<template>
	<section class="draw_detail_box">
		<settingHeader :title="title"></settingHeader>
		<div class="top">
			<p>番禺国美店周末幸运大抽奖</p>
			<div>356期</div>
		</div>
		<div class="bottom">
			<div>
				<p>开奖时间 </p>
				<p>2018-03-20 20</p>
			</div>
			<div>
				<p>参与时间 </p>
				<p>2018-01-20 20</p>
			</div>
			<div>
				<p>参与方式 </p>
				<p>2018国美电器旗舰店购买了一套家具</p>
			</div>
			<div>
				<p>状态 </p>
				<p :class="{'zj':isZj}">已中奖</p>
			</div>
		</div>
		<div class="btn" @click="$router.push({path:'/draw/awards'})">
			发表感言
		</div>
	</section>
</template>

<script>
	import settingHeader from '../../components/setting_header'
	export default {
		components: {
			settingHeader
		},
		data() {
			return {
				title: '抽奖详情',
				isZj: true
			}
		}
	}
</script>

<style lang="less" scoped>
	.draw_detail_box {
		.top {
			height: 1rem;
			display: flex;
			align-items: center;
			height: 1rem;
			background: rgba(255, 255, 255, 1);
			padding: 0 0.3rem;
			box-sizing: border-box;
			p {
				font-size: 0.36rem;
				font-family: PingFang-SC-Medium;
				color: rgba(51, 51, 51, 1);
			}
			div {
				width: 0.97rem;
				height: 0.38rem;
				line-height: 0.38rem;
				background: linear-gradient(-121.4deg, #AF51FF, #9013FE);
				border-radius: 3px;
				font-size: 0.26rem;
				font-family: PingFang-SC-Medium;
				color: rgba(255, 255, 255, 1);
				text-align: center;
				margin-left: 0.1rem;
			}
		}
		.bottom {
			margin-top: 0.4rem;
			height: 2.97rem;
			background: rgba(255, 255, 255, 1);
			padding: 0.47rem 0.3rem;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			div {
				display: flex;
				align-items: center;
				justify-content: space-between;
				p:nth-child(1) {
					font-size: 0.28rem;
					font-family: PingFang-SC-Medium;
					color: rgba(102, 102, 102, 1);
					width: 1.5rem;
				}
				p:nth-child(2) {
					flex: 1;
					font-size: 0.28rem;
					font-family: PingFang-SC-Medium;
					color: rgba(160, 160, 160, 1);
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					text-align: right;
				}
				.zj {
					color: #E32921!important;
				}
			}
		}
		.btn {
			margin-top: 0.27rem;
			height: 0.96rem;
			line-height: 0.96rem;
			text-align: center;
			background: rgba(255, 255, 255, 1);
			font-size: 0.36rem;
			font-family: PingFang-SC-Medium;
			color: rgba(227, 41, 33, 1);
		}
	}
</style>
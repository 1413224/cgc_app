<template>
	<div class="about-box">
		<scoreheader :title="title"></scoreheader>
		<div class="img-top">
			<img :src="'./static/member/login-img.png'" class="image" />
		</div>
		<group>
			<cell title="当前版本" value="V 1.0" class="about-cell"></cell>
			<cell title="用户协议及隐私" is-link class="about-cell"></cell>
		</group>
	</div>
</template>

<script>
	import scoreheader from '../../../components/setting_header'
	export default {
		components: {
			scoreheader,
			Group,
			Cell
		},
		data() {
			return {
				title: '关于我们'
			}
		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.about-box {
		height: 100%;
		background: #F5F8F9;
		.img-top {
			position: relative;
			height: 3.74rem;
			.image {
				width: 2rem;
				height: auto;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
			}
		}
		.about-cell {
			font-family: PingFangSC-Regular;
			font-size: 0.28rem;
			color: #1A2642;
			letter-spacing: 0;
			height: 1.02rem;
			padding-top: 0!important;
			padding-bottom: 0!important;
		}
	}
</style>
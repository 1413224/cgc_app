<template>
	<div class="about-box">
		<scoreheader :title="title"></scoreheader>
		<img :src="'./static/member/login-img.png'" class="image"/>
		<group>
			<cell title="当前版本" value="V1.0" class="about-cell"></cell>
			<cell title="用户协议及隐私" is-link class="about-cell"></cell>
		</group>
	</div>
</template>

<script>
	import scoreheader from '../../../components/setting_header'
	import { Group, Cell } from 'vux'
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
		.image {
			display: block;
			width: 2rem;
			height: auto;
			margin: 0.71rem auto 0.88rem;
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
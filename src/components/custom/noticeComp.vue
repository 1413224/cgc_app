<template>
	<div class="notice-wrap">
		<img :src="noticeConfig.content.imgUrl" alt="">
		<div class="wap" style="padding-left: 0.16rem">
			<marquee>
				<marquee-item :duration='3000' class="align-middle"><span :style="{color:noticeConfig.content.color}">滚动的快讯</span></marquee-item>
				<marquee-item :duration='3000' class="align-middle"><span>滚动的快讯3</span></marquee-item>
				<marquee-item :duration='3000' class="align-middle"><span>滚动的快讯2</span></marquee-item>
			</marquee>
		</div>
	</div>
</template>

<script>
	import { Marquee,MarqueeItem } from 'vux'
	export default {
		props: {
			noticeConfig:{
				type:Object,
				default:{}
			}
		},
		data() {
			return {

			}
		},
		created() {

		},
		mounted() {
			// console.log(this.noticeConfig)
		},
		methods: {


		},
		components: {
			MarqueeItem,
			Marquee
		}
	}
</script>

<style lang="less" scoped>
.notice-wrap {
	width: 100%;
	height: 0.8rem;
	padding: 0rem 0.30rem;
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 0.2rem;
	font-family: PingFangSC-Light;
	color: #425884;
	font-size: 0.24rem;
	box-sizing: border-box;
	.vux-marquee {
		width: 5rem !important;
		line-height: 32px;
		font-size: 0.26rem;
		font-family: PingFangSC-Regular;
		color: rgba(26, 38, 66, 1);
		.align-middle {
			// display: inline-block;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
	img {
		width: 0.76rem;
		height: 0.38rem;
		border-right: 1px solid #E1E1E1;
		padding-right: 0.21rem;
	}
	i {
		margin-left: 0.3rem;
		font-size: 0.5rem;
		color: #90A2C7;
	}
}
</style>
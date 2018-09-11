<template>
	<section class="comsuccess_box">
		<settingHeader title="评价成功"></settingHeader>
		<div class="bg_white">
			<img :src="'./static/images/s_success.png'" />
			<p>感谢您的评论!</p>
			<div class="btn">分享评论</div>
		</div>
		<div class="title_box">接着评下去吧</div>
		<ul class="goods_box">
			<li v-for="(item,index) in goodsList" :key="index">
				<img src="../../assets/images/shop/shop4.png">
				<p>Dove 多芬氨基酸洁面泡泡慕斯泡沫洗面奶洁面乳160...</p>
				<div>去评价</div>
			</li>
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
				goodsList:[1,2,3,4,5,6,7,8]
			}
		},
		created() {

		},
		watch: {

		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.comsuccess_box {
		.bg_white {
			background-color: white;
			text-align: center;
			padding:0.65rem 0;
			img {
				width: 2.09rem;
				height: auto;
			}
			p {
				font-size: 0.36rem;
				font-family: PingFang-SC-Medium;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
				margin: 0.25rem 0;
			}
			div {
				width: 2.40rem;
				height: 0.70rem;
				line-height: 0.70rem;
				text-align: center;
				background: rgba(51, 111, 255, 1);
				border-radius: 5px;
				margin: 0 auto;
				font-size: 0.28rem;
				font-family: PingFang-SC-Medium;
				font-weight: bold;
				color: rgba(255, 255, 255, 1);
			}
		}
		.title_box {
			height: 0.90rem;
			line-height: 0.90rem;
			text-align: center;
			background-color: rgb(248, 247, 245);
			font-size: 0.28rem;
			font-family: PingFang-SC-Medium;
			color: rgba(160, 160, 160, 1);
			position: relative;
		}
		.title_box:before {
			content: " ";
			position: absolute;
			top: 50%;
			height: 1px;
			border-top: 1px solid #E1E1E1;
			color: #E1E1E1;
			-webkit-transform-origin: 0 0;
			transform-origin: 0 0;
			-webkit-transform: scaleY(50%);
			transform: scaleY(50%);
			left: 0.25rem;
			width: 1.94rem;
		}
		.title_box:after {
			content: " ";
			position: absolute;
			top: 50%;
			right: 0.25rem;
			height: 1px;
			border-top: 1px solid #E1E1E1;
			color: #E1E1E1;
			-webkit-transform-origin: 0 0;
			transform-origin: 0 0;
			-webkit-transform: scaleY(50%);
			transform: scaleY(50%);
			width: 1.94rem;
		}
		.goods_box {
			background-color: white;
			li {
				display: flex;
				align-items: center;
				padding: 0.25rem;
				box-sizing: border-box;
				img {
					width: 1.30rem;
					height: 1.30rem;
					margin-right: 0.15rem;
				}
				p {
					font-size: 0.28rem;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
					flex: 1;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
				div {
					width: 1.53rem;
					height: 0.56rem;
					line-height: 0.56rem;
					text-align: center;
					font-size: 0.24rem;
					color: #336FFF;
					border: 1px solid rgba(51, 111, 255, 1);
					border-radius: 5px;
					margin-left: 0.50rem;
					box-sizing: border-box;
				}
			}
			li:not(:last-child) {
				border-bottom: 1px solid rgba(225, 225, 225, 1);
			}
		}
	}
</style>
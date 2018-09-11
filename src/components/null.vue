<template>
	<section class="null_box">
		<img :src="'./static/null/'+ status +'.png'" alt="">
		<p>{{ text}}</p>
	</section>
</template>

<script>
	export default {
		props: {
			status: String,
			text: String
		},
		data() {
			return {

			}
		}
	}
</script>

<style lang="less" scoped>
	.null_box {
		text-align: center;
		background-color: white;
		img {
			width: 2.77rem;
			height: 2.77rem;
		}
		p {
			font-size: 0.32rem;
			font-family: PingFang-SC-Medium;
			color: rgba(26, 38, 66, 1);
			margin-top: 0.55rem;
		}
	}
</style>
<template>
	<div class="swiperTop" @click="$router.push({path:'/multi_user_mall/search'})">
		<div>
			<icon type="search"></icon>
			<input type="text" readonly="readonly" placeholder="搜索你想要的" />
		</div>
	</div>
</template>

<script>
	import { Icon } from 'vux'
	export default {
		props: {

		},
		data() {
			return {

			}
		},
		created() {

		},
		mounted() {

		},
		methods: {


		},
		components: {
			Icon
		}
	}
</script>

<style lang="less" scoped>
.swiperTop{
	/*border: 1px solid #333;*/
	padding: .1rem 0;
	div{
		width: 90%;
		height: 35px;
		line-height: 35px;
		margin:0 auto;
		/*position:relative;*/
		background: #fff;
		border-radius: .1rem;
		padding-left: 5px;
		/*border: 1px solid #f00;*/
		input{
			width:80%;
			height: 35px;
			line-height: 35px;
		}
	}
}
</style>
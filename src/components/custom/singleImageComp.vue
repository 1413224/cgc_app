<template>
	<div class="singlewrap" :style="singleImageConfig.style">
		<img :src="singleImageConfig.content.src" alt="">
	</div>
</template>

<script>
	export default {
		props: {
			singleImageConfig:{
				type:Array,
				default:[]
			}
		},
		data() {
			return {
				// src:'./static/vip/swiper4.png'
			}
		},
		created() {

		},
		mounted() {

		},
		methods: {


		},
		components: {

		}
	}
</script>

<style lang="less" scoped>
.singlewrap{
	/*width: 100%;*/
	img{
		width: 100%;
	}
}
</style>
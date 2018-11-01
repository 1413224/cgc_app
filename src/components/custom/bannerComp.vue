<template>
	<div class="banner-wrap">
		<swiper :options="swiperOption">
			<swiper-slide><img :src="bannerConfig.content.imgUrl" alt=""></swiper-slide>
			<swiper-slide>图片2</swiper-slide>
			<swiper-slide>图片3</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		props: {
			bannerConfig:{
				type:Object,
				default:{}
			}
		},
		data() {
			return {
				swiperOption: {
					pagination: {
						el: '.swiper-pagination'
					},
					autoplay: true,
					loop: true
				},
			}
		},
		created() {

		},
		mounted() {

		},
		methods: {


		},
		components: {
			swiper,
			swiperSlide
		}
	}
</script>

<style lang="less" scoped>
.banner-wrap{
	width: 100%;
	img{
		width: 100%;
	}
}
</style>
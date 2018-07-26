<template>
	<div class="producte-box">
		<settingHeader :title="title"></settingHeader>
		<!--<img style="width: 100%;height: auto;" :src="'./static/images/producted.png'" alt="">-->
		<div class="swiper-inner">
			<swiper :options="swiperOption" ref="mySwiper">
				<swiper-slide v-for="(item,index) in swiperList" :key="index">
					<img :src="item" alt="" />
				</swiper-slide>
			</swiper>
			<transition enter-active-class="zoomInDown animated" leave-active-class="zoomOutDown animated" :duration="1000">
				<div v-if="show" @click="nextSwiper()">
					<img class="jt-img" :class="{'rightan':show}" :src="'./static/images/sjt.png'" />
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
	import settingHeader from '../../components/setting_header'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		data() {
			return {
				title: "威伐光介绍",
				swiperList: [
					'./static/vip/swiper1.png',
					'./static/vip/swiper2.png',
					'./static/vip/swiper3.png',
					'./static/vip/swiper4.png',
					'./static/vip/swiper5.png',
					'./static/vip/swiper6.png'
				],
				show: true,
				realIndex: 0,
				swiperOption: {}
			}

		},
		components: {
			settingHeader,
			swiper,
			swiperSlide
		},
		created() {
			var _this = this
			_this.swiperOption = {
				// 所有的参数同 swiper 官方 api 参数
				direction: 'vertical',
				autoplay: false,
				effect: 'coverflow', //3D翻转效果
				slidesPerView: 'auto',
				coverflowEffect: {
					rotate: 50,
					stretch: 0,
					depth: 100,
					modifier: 1,
					slideShadows: false //开启阴影效果
				},
				on: {
					slideChange: function() {
						_this.realIndex = this.realIndex //设置循环需要使用realIndex获取真实下标
					}
				}
			}
		},
		watch: {
			realIndex() {
				var _this = this
				if(this.realIndex == (this.swiperList.length - 1)) {
					setTimeout(function() {
						_this.show = false
					}, 1000)
				} else {
					setTimeout(function() {
						_this.show = true
					}, 1000)
				}
			}
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.swiper
			}
		},
		methods: {
			nextSwiper() {
				this.swiper.slideNext()
			}
		}
	}
</script>

<style lang="less" scoped>
	.producte-box {
		width: 100%;
		height: 100%;
		background-color: white;
		.swiper-inner {
			width: 100%;
			height: 100%;
			position: relative;
			z-index: 11;
			.jt-img {
				width: 0.48rem;
				height: 0.48rem;
			}
			@-webkit-keyframes rightan {
				from {
					bottom: 11%;
					opacity: 0;
				}
				to {
					bottom: 0.8rem;
					opacity: 1;
				}
			}
			.rightan {
				animation: rightan 1.8s infinite;
				animation-fill-mode: both;
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translate(-50%, 0%);
				z-index: 15;
			}
		}
		.swiper-container {
			width: 100%;
			height: 100%;
		}
		.swiper-slide {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			img {
				width: 100%;
				height: auto;
				display: block;
			}
		}
	}
</style>
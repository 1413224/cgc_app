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
			<transition enter-active-class="fadeIn animated" leave-active-class="fadeOut animated">
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
					'./static/share/introduce1.png',
					'./static/share/introduce2.png',
					'./static/share/introduce3.png',
					'./static/share/introduce4.png'
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
				slidesOffsetBefore: 0,
				autoplay: false,
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
					}, 100)
				} else {
					setTimeout(function() {
						_this.show = true
					}, 100)
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
				width: 0.8rem;
				height: 0.8rem;
			}
			@-webkit-keyframes rightan {
				0% {
					bottom: 15%;
					opacity: 1;
				}
				80% {
					bottom: 0;
					opacity: 0;
				}
				100% {
					bottom: 15%;
					opacity: 0;
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
		.swiper-slide{
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			img {
				width: 100%;
				height: auto;
				display: block;
			}
		}
	}
</style>
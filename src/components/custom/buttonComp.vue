<template>
	<div class="button-wrap">
		<swiper :options="swiperOption">
			<swiper-slide v-for="(page,index) in pages" :key="index">
				<div class="iconitem">
					<div class="icon" v-for="(item,index) in page" :key="item.id">
						<div class="icon-img">
							<img :src="item.imgUrl" alt="">
						</div>
						<p class="icon-des" :style="{color:item.color}">{{item.desc}}</p>
					</div>
				</div>
			</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		props: {
			buttonConfig:{
				type:Object,
				default:{}
			}
		},
		data() {
			return {
				swiperOption:{
					pagination:{
						el:'.swiper-pagination'
					}
				}
			}
		},
		created() {

		},
		mounted() {
			// console.log(this.buttonConfig)
		},
		methods: {

		},
		components: {
			swiper,
			swiperSlide,
		},
		computed:{
			pages(){
				var pages = []
				this.buttonConfig.content.iconList.forEach((item,index) => {
					var page = Math.floor(index/8)
					if(!pages[page]){
						pages[page]=[]
					}
					pages[page].push(item)
				})
				return pages
			}
		}
	}
</script>

<style lang="less" scoped>
.iconitem{
	.icon{
		width: 25%;
		display: inline-block;
		text-align: center;
		box-sizing: border-box;
		.icon-img{
			img{
				width: 100%;
				height: 100%;
			}
		}
	}
}

</style>
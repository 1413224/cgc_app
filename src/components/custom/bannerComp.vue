<template>
	<div class="banner-wrap" :class="bClassObject">
		<swiper :options="swiperOption">
			<swiper-slide 
				v-for="(item,index) in bannerConfig.data.imgList" 
				:key="index"
				>
				<img :src="item.imgUrl" alt="" @click.stop="goUrl(item.url,item.url.code)">
			</swiper-slide>
			<!-- 判断轮播点 -->
			<div 
				:class="swiperObject"
				class="swiper-pagination"
				slot="pagination"
				:style="styleObject">
			</div>
			<!-- <div 
				v-if="bannerConfig.data.position == 1" 
				class="swiper-pagination" 
				slot="pagination">
			</div>
			<div 
				v-if="bannerConfig.data.position == 2" 
				class="swiper-pagination" 
				style="text-align: right;" 
				slot="pagination">
			</div> -->
			<!-- 判断轮播点end -->
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
			},
			codeArrya:{
				type:Object,
				default:{}
			}
		},
		data() {
			var _this = this;
			return {
				bgColor:'#fff',
				swiperOption: {
					pagination: {
						el: '.swiper-pagination',
						renderBullet:function(index,className){
							return `<li class="${className}" style="background: ${_this.bannerConfig.data.buttonBackgroundColor}; opacity: ${_this.bannerConfig.data.buttonOpacity/100};"></li>`;
						}
					},
					autoplay: {
						disableOnInteraction:false,
						delay:2000
					},
					loop: true,
					
				},
				styleObject:{
					left: this.bannerConfig.data.position == '0' ? this.bannerConfig.data.marginHorizontal+'px' : 0,
					right: this.bannerConfig.data.position == '2' ? this.bannerConfig.data.marginHorizontal+'px' : 0,
					bottom: this.bannerConfig.data.marginBottom + 'px'
				}
			}
		},
		created() {
			
		},
		mounted() {
			// console.log(this.bannerConfig)
			// console.log(this.codeArrya)
		},
		computed:{
			bClassObject(){
				let ua = window.navigator.userAgent.toLowerCase()
				if(ua.match(/MicroMessenger/i) == 'micromessenger') {
					return {
						wxbanner:true
					}
				}else{
					return {
						noWxbanner:true
					}
				}
			},
			swiperObject(){
				return {
					borderRadius0:this.bannerConfig.data.borderRadius == '0',
					borderRadius1:this.bannerConfig.data.borderRadius == '1',
					borderRadius2:this.bannerConfig.data.borderRadius == '2',
					posit0:this.bannerConfig.data.position == '0',
					posit1:this.bannerConfig.data.position == '1',
					posit2:this.bannerConfig.data.position == '2',
				}
			},
		},
		methods: {
			goUrl(httpurl,code){
				let _this = this;
				if(code==""){
					return;
				}
				if(Number(code)==50000){
					window.location.href = httpurl.url
				}
				let temp = _this.codeArrya.find(obj => obj.code == code)
				let param = {
					path: temp.src,
					query: {}
				}
				if(temp.query) {
					param.query[temp.query] = httpurl.id
				} 
				_this.$router.push(param)
			}
		},
		components: {
			swiper,
			swiperSlide
		}
	}
</script>
<style lang="less">

.banner-wrap .borderRadius0 /deep/ .swiper-pagination-bullet{
	width: 10px !important;
	height: 4px !important;
	border-radius: 0 !important;
}
.banner-wrap .borderRadius1 /deep/ .swiper-pagination-bullet{
	width: 4px !important;
	height: 4px !important;
	border-radius: 0 !important;
}
.banner-wrap /deep/ .posit0{
	text-align: left;
}
.banner-wrap /deep/ .posit1{
	text-align: center;
}
.banner-wrap /deep/ .posit2{
	text-align: right;
}
.banner-wrap /deep/ .swiper-pagination-bullets{
	width: auto;
}

.banner-wrap .swiper-pagination-bullet-active {
	opacity: 1 !important;
}

</style>
<style lang="less" scoped>
/* .noWxbanner{
	padding-top: 46px;
} */
.banner-wrap{
	width: 100%;
	.swiper-slide{
		width: 100%;
		height: 3.6rem;
		overflow: hidden;
	}
	img{
		width: 100%;
		height: 100%;
	}
}
</style>
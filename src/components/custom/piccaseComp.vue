<template>
	<div class="piccase" :style="{backgroundColor:piccaseConfig.data.backgroundColor}">
		<!-- 橱窗样式开始 -->
		<div :class="wrapObject" 
				 v-if="piccaseConfig.data.layoutMode==1">
			<ul class="clearfix">
				<li 
					v-for="(item,index) in piccaseConfig.data.imgList"
					:style="{padding:piccaseConfig.data.paddingHorizontal + 'px'}">
					<img :src="item.imgurl" alt=""></li>
			</ul>
		</div>
		<!-- 橱窗样式结束 -->
		<!-- 堆积两列 -->
		<div class="twocol" v-if="piccaseConfig.data.layoutMode==2 && piccaseConfig.data.isPaging==1">
			<ul class="clearfix">
				<swiper :options="swiperOption">
					<swiper-slide v-for="(page,index) in pages" :key="index">
						<li v-for="(item,index) in page" :key="index">
							<img :src="item.imgurl" alt="">
						</li>
					</swiper-slide>
					<div class="swiper-pagination" slot="pagination"></div>
				</swiper>
			</ul>
		</div>
		<div class="threecol clearfix" v-else-if="piccaseConfig.data.layoutMode==2 && piccaseConfig.data.isPaging==0">
			<ul>
				<li v-for="(item,index) in piccaseConfig.data.imgList"><img :src="item.imgurl" alt=""></li>
			</ul>
		</div>
		<!-- 堆积两列 -->
		<!-- 堆积三列 -->
		<div class="threecol" v-if="piccaseConfig.data.layoutMode==3 && piccaseConfig.data.isPaging==1">
			<ul>
				<swiper :options="swiperOption">
					<swiper-slide v-for="(page,index) in pages" :key="index">
						<li v-for="(item,index) in page" :key="index">
							<img :src="item.imgurl" alt="">
						</li>
					</swiper-slide>
					<div class="swiper-pagination" slot="pagination"></div>
				</swiper>
			</ul>
		</div>
		<div class="threecol clearfix" v-else-if="piccaseConfig.data.layoutMode==3 && piccaseConfig.data.isPaging==0">
			<ul>
				<li v-for="(item,index) in piccaseConfig.data.imgList"><img :src="item.imgurl" alt=""></li>
			</ul>
		</div>
		<!-- 堆积三列结束 -->
		<div class="fourcol" v-if="piccaseConfig.data.layoutMode==4 && piccaseConfig.data.isPaging==1">
			<ul>
				<swiper :options="swiperOption">
					<swiper-slide v-for="(page,index) in pages" :key="index">
						<li v-for="(item,index) in page" :key="index">
							<img :src="item.imgurl" alt="">
						</li>
					</swiper-slide>
					<div class="swiper-pagination" slot="pagination"></div>
				</swiper>
			</ul>
		</div>
		<div class="fourcol clearfix" v-else-if="piccaseConfig.data.layoutMode==4 && piccaseConfig.data.isPaging==0">
			<ul>
				<li v-for="(item,index) in piccaseConfig.data.imgList"><img :src="item.imgurl" alt=""></li>
			</ul>
		</div>
	</div>
</template>

<script>
	// import { XInput, Group, XButton, Popup, XHeader } from 'vux'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		props: {
			piccaseConfig:{
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
			// console.log(this.piccaseConfig)
		},
		computed:{
			wrapObject(){
				var _this = this,
						imgLength = _this.piccaseConfig.data.imgList.length,
						type = _this.piccaseConfig.data.layoutMode

				if(imgLength==2 && type=="1"){
					return {
						wrap2:true
					}
				}else if(imgLength==3 && type=="1"){
					return {
						wrap3:true
					}
				}else if(imgLength==4 && type=="1"){
					return {
						wrap4:true
					}
				}
			},
			pages(){
				var _this = this,
						isPaging = _this.piccaseConfig.data.isPaging,
						layoutMode = _this.piccaseConfig.data.layoutMode,
						imgLen = _this.piccaseConfig.data.imgList.length,
						line = _this.piccaseConfig.data.line;//每页行数

				if(isPaging == "1" && layoutMode == "2"){//分页显示，堆积两列
					var pages = []
					_this.piccaseConfig.data.imgList.forEach((item,index)=>{
						var page = Math.floor(index/(line*2))
						if(!pages[page]){
							pages[page]=[]
						}
						pages[page].push(item)
					})
					return pages;
				}else if(isPaging == "1" && layoutMode == "3"){
					var pages=[]
					_this.piccaseConfig.data.imgList.forEach((item,index)=>{
						var page = Math.floor(index/(line*3))
						if(!pages[page]){
							pages[page] = []
						}
						pages[page].push(item)
					})
					return pages;
				}else if(isPaging == "1" && layoutMode == "4"){
					var pages=[]
					_this.piccaseConfig.data.imgList.forEach((item,index)=>{
						var page = Math.floor(index/(line*4))
						if(!pages[page]){
							pages[page] = []
						}
						pages[page].push(item)
					})
					return pages;
				}
			}
		},
		methods: {
			getpages(line){
				var pages=[],
						_this = this;
					_this.piccaseConfig.data.imgList.forEach((item,index)=>{
						var page = Math.floor(index/(line*4))
						if(!pages[page]){
							pages[page] = []
						}
						pages[page].push(item)
					})
					return pages;
			}
		},
		components: {
			swiper,
			swiperSlide
		}
	}
</script>

<style lang="less" scoped>
.piccase{
	width: 100%;
	.wrap2{
		li:nth-child(2),
			li:nth-child(4n+2) {
				float: left;
				width: 50% !important;
				height: 3rem !important;
			}
	}
	.wrap4{
		li:nth-child(3),
			li:nth-child(4),
			li:nth-child(4n+3),
			li:nth-child(4n+4) {
				float: left;
				width: 25% !important;
				height: 1.5rem !important;
			}
	}
	.wrap3,.wrap2,.wrap4{
		li{
			box-sizing: border-box;
		}
		ul{
			li{
				overflow: hidden;
			}
			img{
				width: 100%;
				height: 100%;
				display: block;
			}
			li:nth-child(1),
			li:nth-child(4n+1) {
				float: left;
				width: 50%;
				height: 3rem;
			}
			li:nth-child(2),
			li:nth-child(4n+2) {
				float: left;
				width: 50%;
				height: 1.5rem;
			}
			li:nth-child(3),
			li:nth-child(4),
			li:nth-child(4n+3),
			li:nth-child(4n+4) {
				float: left;
				width: 50%;
				height: 1.5rem;
			}
		}
	}
		
	.twocol{
		li{
			float: left;
			width: 50%;
			height: 2rem;
			img{
				width: 100%;
				height: 100%;
			}
		}
	}
	.threecol{
		li{
			float: left;
			width: 33.3%;
			height: 2rem;
			img{
				width: 100%;
				height: 100%;
			}
		}
	}
	.fourcol{
		li{
			float: left;
			width: 25%;
			height: 2rem;
			img{
				width: 100%;
				height: 100%;
			}
		}
	}
}

</style>
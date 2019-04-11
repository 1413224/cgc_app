<template>
	<div :style="buttonStyleObj" class="buttonWrapper">
		<div class="button-wrap" v-if="buttonConfig.data.isPaging==1">
			<swiper :options="swiperOption">
				<swiper-slide v-for="(page,index) in pages" :key="index">
					<div class="iconitem">
						<div class="icon" :class="iconObj" 
								 v-for="(item,index) in page" 
								 :key="index"
								 @click.stop="goUrl(item.url,item.url.code)">
							<div class="icon-img">
								<img :src="item.imgUrl" alt="" :class="classObject">
							</div>
							<p class="icon-des" :style="{color:item.color}">{{item.text || '按钮文字'}}</p>
						</div>
					</div>
				</swiper-slide>
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>
		</div>
		<div class="button-wrap" v-else>
			<div class="iconitem">
				<div 
					class="icon" :class="iconObj"
					 v-for="(item,index) in buttonConfig.data.buttonList"
					 @click.stop="goUrl(item.url,item.url.code)"
					 :key="index">
					<div class="icon-img">
						<img :src="item.imgUrl" alt="" :class="classObject">
					</div>
					<p class="icon-des" :style="{color:item.color}">{{item.text || '按钮文字'}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	// import codeArrya from '@/global/code.js'
	export default {
		props: {
			buttonConfig:{
				type:Object,
				default:{}
			},
			codeArrya:{
				type:Array,
				default:[]
			}
		},
		data() {
			var _this = this;
			return {
				swiperOption:{
					pagination:{
						el: _this.buttonConfig.data.showPaging == '1' ? '.swiper-pagination' : null,
						// bulletActiveClass:'my-active',
						/*renderBullet:function(index,className){
							return '<li class="' + className + '" style="background:'+_this.buttonConfig.data.buttonBackgroundColor+'"></li>';
						}*/
					}
				},
				// showPage:true
			}
		},
		created() {
		},
		mounted() {
			// console.log(this.buttonConfig)
			// console.log(codeArrya)
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
			swiperSlide,
		},
		computed:{
			pages(){
				var _this = this,
						isPaging = _this.buttonConfig.data.isPaging,
						line = _this.buttonConfig.data.line,
						lineNumber = Number(_this.buttonConfig.data.lineNumber);

				if(isPaging == '1'){
					var pages=[]
					_this.buttonConfig.data.buttonList.forEach((item,index)=>{
						var page = Math.floor(index/(line*lineNumber))
						if(!pages[page]){
							pages[page] = []
						}
						pages[page].push(item)
					})
					return pages;
				}
			},
			iconObj(){
				var _this = this,
						imgLength = _this.buttonConfig.data.buttonList.length,
						lineNumber = _this.buttonConfig.data.lineNumber; //每行数量
				if(lineNumber == '3'){
					return {
						icon3:true
					}
				}else if(lineNumber == '4'){
					return {
						icon4:true
					}
				}else if(lineNumber == '5'){
					return {
						icon5:true
					}
				}
			},
			classObject(){
				var _this = this,
						borderRadius = _this.buttonConfig.data.borderRadius;
				if(borderRadius == '0'){
					return {
						radius1:true
					}
				}else if(borderRadius == '1'){
					return {
						radius2:true
					}
				}else if(borderRadius == '2'){
					return {
						radius3:true
					}
				}
			},
			buttonStyleObj(){
				if(this.buttonConfig.data.isInheritBackgroundColor=="1"){
					return {
						backgroundColor:this.buttonConfig.data.backgroundColor
					}
				}else{
					return {
						backgroundColor:this.buttonConfig.data.allBackgroundColor
					}
				}
			}

		}
	}
</script>
<style>
.swiper-pagination-bullet{
	/*background: none !important;*/
}
</style>
<style lang="less" scoped>

.buttonWrapper{
	padding: 10px 0;
	.swiper-container-horizontal > .swiper-pagination-bullets {
		bottom: -5px;
		left: 0;
		width: 100%;
	}
}
.iconitem{
	.icon{
		margin:4px 0;
		.icon-des{
			padding: 5px 0;
		}
	}
	.icon3{
		width: 33.33%;
		display: inline-block;
		text-align: center;
		box-sizing: border-box;
		.icon-img{
			width: 1.2rem;
			height: 1.2rem;
			margin:0 auto;
			img{
				width: 100%;
				height: 100%;
			}
		}
	}

	.icon4{
		width: 25%;
		display: inline-block;
		text-align: center;
		box-sizing: border-box;
		.icon-img{
			width: .85rem;
			height: .85rem;
			margin:0 auto;
			img{
				width: 100%;
				height: 100%;
			}
		}
	}

	.icon5{
		width: 20%;
		display: inline-block;
		text-align: center;
		box-sizing: border-box;
		.icon-img{
			width: .8rem;
			height: .8rem;
			margin:0 auto;
			img{
				width: 100%;
				height: 100%;
			}
		}
	}

	.radius1{
		border-radius: 0;
	}
	.radius2{
		border-radius: 10px;
	}
	.radius3{
		border-radius: 50%;
	}

}

</style>
<template>
	<div class="piccase" :style="[piccaseObject,bgObj]">
		<!-- 橱窗样式开始 -->
		<div class="wrap" 
			v-if="piccaseConfig.data.layoutMode==1">
			<ul class="clearfix">
				<template v-for="(item,index) in piccaseConfig.data.imgList">
					<li 
						:key="index"
						:style="paddingVal + cabinetSytle(index)"
						@click.stop="goUrl(item.url,item.url.code)">
						<img :src="item.imgUrl" alt="">
					</li>
				</template>
			</ul>
		</div>
		<!-- 橱窗样式结束 -->
		<!-- 堆积两列 -->
		<div class="twocol" v-if="piccaseConfig.data.layoutMode==2 && piccaseConfig.data.isPaging==1">
			<ul class="clearfix">
				<swiper :options="swiperOption">
					<swiper-slide v-for="(page,index) in pages" :key="index">
						<li 
							v-for="(item,index) in page" 
							:key="index"
							:style="paddingVal"
							@click.stop="goUrl(item.url,item.url.code)">
							<img :src="item.imgUrl" alt="">
						</li>
					</swiper-slide>
					<div class="swiper-pagination" slot="pagination"></div>
				</swiper>
			</ul>
		</div>
		<div class="twocol clearfix" v-else-if="piccaseConfig.data.layoutMode==2 && piccaseConfig.data.isPaging==0">
			<ul>
				<li 
					:style="paddingVal"
					v-for="(item,index) in piccaseConfig.data.imgList"
					:key="index"
					@click.stop="goUrl(item.url,item.url.code)">
					<img :src="item.imgUrl" alt="">
				</li>
			</ul>
		</div>
		<!-- 堆积两列 -->
		<!-- 堆积三列 -->
		<div class="threecol" v-if="piccaseConfig.data.layoutMode==3 && piccaseConfig.data.isPaging==1">
			<ul>
				<swiper :options="swiperOption">
					<swiper-slide v-for="(page,index) in pages" :key="index">
						<li 
							v-for="(item,index) in page" 
							:key="index"
							:style="paddingVal"
							@click.stop="goUrl(item.url,item.url.code)">
							<img :src="item.imgUrl" alt="">
						</li>
					</swiper-slide>
					<div class="swiper-pagination" slot="pagination"></div>
				</swiper>
			</ul>
		</div>
		<div class="threecol clearfix" v-else-if="piccaseConfig.data.layoutMode==3 && piccaseConfig.data.isPaging==0">
			<ul class="clearfix">
				<li 
					v-for="(item,index) in piccaseConfig.data.imgList"
					:style="paddingVal"
					:key="index"
					@click.stop="goUrl(item.url,item.url.code)">
					<img :src="item.imgUrl" alt="">
				</li>
			</ul>
		</div>
		<!-- 堆积三列结束 -->
		<div class="fourcol" v-if="piccaseConfig.data.layoutMode==4 && piccaseConfig.data.isPaging==1">
			<ul>
				<swiper :options="swiperOption">
					<swiper-slide v-for="(page,index) in pages" :key="index">
						<li 
							v-for="(item,index) in page" 
							:key="index"
							:style="paddingVal"
							@click.stop="goUrl(item.url,item.url.code)">
							<img :src="item.imgUrl" alt="">
						</li>
					</swiper-slide>
					<div class="swiper-pagination" slot="pagination"></div>
				</swiper>
			</ul>
		</div>
		<div class="fourcol clearfix" v-else-if="piccaseConfig.data.layoutMode==4 && piccaseConfig.data.isPaging==0">
			<ul>
				<li 
					v-for="(item,index) in piccaseConfig.data.imgList"
					:style="paddingVal"
					:key="index"
					@click.stop="goUrl(item.url,item.url.code)">
					<img :src="item.imgUrl" alt="">
				</li>
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
			},
			codeArrya:{
				type:Object,
				default:{}
			}
		},
		data() {
			return {
				piccaseObject:{
					// backgroundColor:this.piccaseConfig.data.backgroundColor,
					/*paddingLeft:this.piccaseConfig.data.paddingHorizontal +  'px',
					paddingRight:this.piccaseConfig.data.paddingHorizontal + 'px',*/
					paddingTop:this.piccaseConfig.data.paddingVertical + 'px',
					paddingBottom:this.piccaseConfig.data.paddingVertical + 'px'
				},
				twocolObject:{
					paddingLeft:this.piccaseConfig.data.paddingHorizontal +  'px',
					paddingRight:this.piccaseConfig.data.paddingHorizontal + 'px',
					paddingLeft:this.piccaseConfig.data.paddingHorizontal + 'px',
					paddingRight:this.piccaseConfig.data.paddingHorizontal + 'px',
				},
				swiperOption:{
					pagination:{
						el: this.piccaseConfig.data.showPaging == '1' ? '.swiper-pagination' : null
					}
				},
				active:false,
			}
		},
		created() {

		},
		mounted() {
			// console.log(this.piccaseConfig.data)
		},
		computed:{
			pages(){
				var _this = this,
					isPaging = _this.piccaseConfig.data.isPaging,
					layoutMode = _this.piccaseConfig.data.layoutMode,
					imgLen = _this.piccaseConfig.data.imgList.length,
					line = _this.piccaseConfig.data.line,//每页行数
					type = Number(layoutMode);//布局类型

				if(isPaging == "1" && layoutMode == "2"){//分页显示，堆积两列

					return _this.getpages(line,type)
				}else if(isPaging == "1" && layoutMode == "3"){

					return _this.getpages(line,type)
				}else if(isPaging == "1" && layoutMode == "4"){

					return _this.getpages(line,type)
				}
			},
			piccasePages(){
				let piccasePages = [],
						_this = this;
				_this.piccaseConfig.data.imgList.forEach((item,index)=>{
					var page = Math.floor(index/4)
					if(!piccasePages[page]){
						piccasePages[page] = []
					}
					piccasePages[page].push(item)
				})
				return piccasePages;
			},
			bgObj(){
				if(this.piccaseConfig.data.isInheritBackgroundColor=="1"){
					return {
						backgroundColor:this.piccaseConfig.data.backgroundColor,
					}
				}else{
					return {
						backgroundColor:this.piccaseConfig.data.allBackgroundColor,
					}
				}
			},
			paddingVal() {
				return `padding: ${this.piccaseConfig.data.paddingVertical/50}rem ${this.piccaseConfig.data.paddingHorizontal/50}rem; height: ${this.piccaseConfig.data.height/50}rem;`
			},
			/*cabinetSytle(){
		
				console.log(this.piccaseConfig.data.imgList)
				let height = this.piccaseConfig.data.height
				let ylen = this.piccaseConfig.data.imgList.length

				this.piccaseConfig.data.imgList.map((item,index)=>{
					console.log(index)
					if((index)%4==2){
						return `width: 50%; height: ${height/100}rem;`
					}
				})
			}*/
		},
		methods: {
			cabinetSytle (index) {
				let height = this.piccaseConfig.data.height
				let len = this.piccaseConfig.data.imgList.length
				let _index = (index+1)%4
				// console.log(_index)
				if(len==2){
					return `width: 50%; height: ${height/50}rem;`
				}
				if((len==3 || len==4) && _index==1){
					return `width: 50%; height: ${height/50}rem;`
				}
				if(len==3 && (_index==2 || _index==3)){
					return `width: 50%; height: ${height/100}rem;`
				}

				if(len==4 && _index==2){
					return `width: 50%; height: ${height/100}rem;`
				}
				if(len==4 && (_index==3 || _index==0)){
					return `width: 25%; height: ${height/100}rem;`
				}

			},
			
			getpages(line,type){
				var pages=[],
				_this = this;
				_this.piccaseConfig.data.imgList.forEach((item,index)=>{
					var page = Math.floor(index/(line*type))
					if(!pages[page]){
						pages[page] = []
					}
					pages[page].push(item)
				})
				return pages;
			},
			goUrl(httpurl,code){
				let _this = this;
				if(code==""){
					return;
				}
				if(Number(code)==50000){
					window.location.href = httpurl.url
				}
				// console.log(_this.codeArrya)
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

<style lang="less" scoped>
.piccase{
	width: 100%;
	li {
		box-sizing: border-box;
	}
	.wrap{
		ul{
			li{
				overflow: hidden;
				float: left;
			}
			img {
				width: 100%;
				height: 100%;
				display: block;
			}
		}
	}
		
	.twocol{
		width: 100%;
		ul{
			width: 100%;
		}
		li{
			float: left;
			width: 50%;
			img{
				width: 100%;
				height: 100%;
				vertical-align: middle;
			}
		}
	}
	.threecol{
		li{
			float: left;
			width: 33.3%;
			img{
				width: 100%;
				height: 100%;
				vertical-align: middle
			}
		}
	}

	.fourcol{
		li{
			float: left;
			width: 25%;
			img{
				width: 100%;
				height: 100%;
			}
		}
	}
}

</style>
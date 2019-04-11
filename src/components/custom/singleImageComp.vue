<template>
	<div class="singlewrap" :style="[classObject,bgObj]">
		<template v-for="(item,index) in singleImageConfig.data.imgList">
			<img @click.stop="goUrl(item.url,item.url.code)" :src="item.imgUrl" alt="" :style="imgPadding">
		</template>
	</div>
</template>

<script>
	export default {
		props: {
			singleImageConfig:{
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
				// src:'./static/vip/swiper4.png'
				classObject:{
					// backgroundColor:this.singleImageConfig.data.backgroundColor,
					paddingLeft:this.singleImageConfig.data.paddingHorizontal + 'px',
					paddingRight:this.singleImageConfig.data.paddingHorizontal + 'px',
					// paddingTop:this.singleImageConfig.data.paddingVertical + 'px',
					// paddingBottom:this.singleImageConfig.data.paddingVertical + 'px'
				}
			}
		},
		created() {

		},
		mounted() {
			// console.log(this.singleImageConfig)
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
		computed:{
			bgObj(){
				if(this.singleImageConfig.data.isInheritBackgroundColor=="1"){
					return {
						backgroundColor:this.singleImageConfig.data.backgroundColor,
					}
				}else{
					return {
						backgroundColor:this.singleImageConfig.data.allBackgroundColor,
					}
				}
			},
			imgPadding() {
				return `padding: ${this.singleImageConfig.data.paddingVertical}px 0`
			}
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
		vertical-align: middle;
	}
}
</style>
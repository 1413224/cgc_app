<template>
	<div 
		class="titlebox" 
		:style="[styleObject,bgObject]"
		@click.stop="goUrl(titlebarConfig.data.url,titlebarConfig.data.url.code)"><i :class="titlebarConfig.data.icon"></i>{{titlebarConfig.data.text}}</div>
</template>


<script>
	export default {
		props: {
			titlebarConfig:{
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
				styleObject:{
					color:this.titlebarConfig.data.color,
					// backgroundColor:this.titlebarConfig.data.backgroundColor,
					textAlign:this.titlebarConfig.data.textAlign,
					fontSize: this.titlebarConfig.data.fontSize/100 + 'rem',
					fontWeight:this.titlebarConfig.data.fontWeight,
					paddingLeft:this.titlebarConfig.data.paddingHorizontal/50 + 'rem',
					paddingRight:this.titlebarConfig.data.paddingHorizontal/50 + 'rem',
					paddingTop:this.titlebarConfig.data.paddingVertical/50 + 'rem',
					paddingBottom:this.titlebarConfig.data.paddingVertical/50 + 'rem',
				}
			}
		},
		created() {
			// console.log(this.titlebarConfig)
		},
		mounted() {
			// console.log(this.titlebarConfig)
		},
		computed:{
			bgObject(){
				if(this.titlebarConfig.data.isInheritBackgroundColor=="1"){
					return {
						backgroundColor:this.titlebarConfig.data.backgroundColor
					}
				}else{
					return {
						backgroundColor:this.titlebarConfig.data.allBackgroundColor
					}
				}
			}
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

		}
	}
</script>

<style lang="less" scoped>
@import '//at.alicdn.com/t/font_912483_lcojf3qe8m.css';
.titlebox{
/* 	width: 100%;
height: 1rem;
line-height: 1rem;
font-size: 0.38rem;
text-align: center;
background: #fff;
color: #1a2642; */
}

</style>
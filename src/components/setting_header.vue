<template>
	<div v-if='show' style="height:46px;" class="settingHeader">
		<x-header  
			:left-options="{backText: '',preventGoBack: true}" 
			style="background:#fff;" 
			class="header" 
			@on-click-back="changeBack">{{ title }}
		</x-header>

<!-- 		<x-header 
			v-else
			:left-options="{backText: '',preventGoBack: true}" 
			style="background:#fff;" 
			class="header" 
			@on-click-back="changeBack">{{ headerConfig.data.title }}
		</x-header> -->
	</div>
</template>

<script>
	// import 
	export default {
		props: {
			/*headerConfig:{
				type:Object,
				default:{}
			},*/
			title: String //定义传值的类型<br> 
		},
		data() {
			return {
				show: ''
				
			}
		},
		created() {
			var ua = navigator.userAgent.toLowerCase();
			var isWeixin = ua.indexOf('micromessenger') != -1;
			if(isWeixin) {
				this.show = false;
				return true;
			} else {
				this.show = true;
				return false;
			}
			
		},
		mounted(){
			// console.log(this.headerConfig)
			// console.log(this.title)
			document.title = this.title
		},
		methods: {
			changeBack() {
				var _this = this
				if(sessionStorage['_fullpath_']){
					this.$router.replace({
						path:sessionStorage['_fullpath_']
					})
				}else{
					_this.$router.go(-1)
					
						/*this.$store.commit('UPDATE_DACK', {
							back: true
						})*/
				}
			}
		}
	}
</script>
<style lang='less'>
	.settingHeader {
		/*position: fixed;
		top: 0;
		z-index: 999;*/
		width: 100%;
		max-width: 640px;
		.vux-header .vux-header-left .left-arrow:before {
			border: 1px solid #222;
			border-width: 1px 0 0 1px;
		}
		.vux-header .vux-header-title {
			color: #333;
			font-size: 0.32rem;
		}
		 .header {
			position: fixed!important;
			top: 0;
			/*left: 0;*/
			width: 100%;
			max-width: 640px;
			z-index: 111;
		} 
	}
</style>
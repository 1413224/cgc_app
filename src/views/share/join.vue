<template>
	<div class="producte">
		<settingHeader :title="title"></settingHeader>
		<div class="wap">
			<img src="../../assets/images/share/jiameng.png" alt="">
			<div class="hot" @click="gobottom"></div>
		</div>
	</div>
</template>

<script>
	import settingHeader from '../../components/setting_header'


	export default {
		data() {
			return {
				title:"招商加盟",
			}
				
		},
		components:{
			settingHeader,
		},
		/*created(){

		},*/
		mounted(){
			
		},
		computed:{
			
		},
		methods:{
			 gobottom(){
				window.scrollTo(0,document.body.scrollHeight);
			 }
			
		}
	}
</script>

<style lang="less" scoped>
	@import url('../../../static/css/global');
	.producte{
		width: 100%;
		
		.wap{
			position: relative;
			img{
				width: 100%;
				display: block;
				margin: 0;
				padding: 0;
			}
			.hot{
				width: 2.2rem;
				height: .5rem;
				position: absolute;
				top: 2.2rem;
				left: 1.3rem;
				z-index: 2;
			}
		}
		
	}
</style>
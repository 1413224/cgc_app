<template>
	<div class="producte">
		<settingHeader :title="title"></settingHeader>
		<!--<img style="width: 100%;height: auto;" :src="'./static/share/long.png'" alt="">-->
		<img style="width: 100%;height: auto;display: block;" v-for="(item,index) in 22" :key="index" :src="'./static/share/'+ Number(index+1) +'.jpg'"/>
	</div>
</template>

<script>
	import settingHeader from '../../components/setting_header'
	export default {
		data() {
			return {
				title:"治疗指导"
			}
				
		},
		components:{
			settingHeader
		},
		mounted(){
		},
		computed:{
			
		},
		methods:{
			
		}
	}
</script>

<style lang="less" scoped>
	
</style>
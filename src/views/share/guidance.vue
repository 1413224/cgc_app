<template>
	<div class="producte">
		<settingHeader :title="title"></settingHeader>
		<img style="width: 100%;height: auto;" :src="'./static/images/treatment.png'" alt="">
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
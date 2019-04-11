<template>
	<div class="blankwrap" :style="[blankStyleObject,bgObj]"></div>
</template>

<script>
	export default {
		props: {
			blankConfig:{
				type:Object,
				default:{}
			}
		},
		data() {
			return {
				blankStyleObject:{
					// backgroundColor:this.blankConfig.data.backgroundColor,
					height:this.blankConfig.data.height + 'px'
				}
			}
		},
		created() {

		},
		mounted() {

		},
		computed:{
			bgObj(){
				if(this.blankConfig.data.isInheritBackgroundColor=="1"){
					return {
						backgroundColor:this.blankConfig.data.backgroundColor,
					}
				}else{
					return {
						backgroundColor:this.blankConfig.data.allBackgroundColor,
					}
				}
			}
		},
		methods: {


		},
		components: {
		}
	}
</script>

<style lang="less" scoped>


</style>
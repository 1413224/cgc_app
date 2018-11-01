<template>
	<div v-html="richtextConfig.data.cont">
	</div>
</template>

<script>
	export default {
		props: {
			richtextConfig:{
				type:Object,
				default:{}
			}
		},
		data() {
			return {

			}
		},
		created() {

		},
		mounted() {
			// console.log(this.richtextConfig)
		},
		methods: {


		},
		components: {
		}
	}
</script>

<style lang="less" scoped>


</style>
<template>
	<div class="richtext-comp" v-html="richtextConfig.data.contnet">
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

<style lang="less">
.richtext-comp {
	width: 100%;
	overflow: hidden;
	* {
		max-width: 100%;
	}
}
</style>
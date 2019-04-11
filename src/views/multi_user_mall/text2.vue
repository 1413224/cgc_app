<template>
	<div class="wrap">
		<iframe :src="src"></iframe>
	</div>
</template>

<script>
	
export default {
	data() {
		return {
			src:''
		}
	},
	components: {

	},
	created() {

	},
	mounted() {
		this.src = this.$route.query.src
		console.log(this.src)
	},
	methods: {

	}
}
</script>
<style lang="less" scoped>

</style>
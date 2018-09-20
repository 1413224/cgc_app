<template>

</template>

<script>
	export default {
		data() {
			return {

			}
		},
		created() {
			console.log(this.$route.params.orderStr)
			if(this.$route.params.orderStr) {
				const div = document.createElement('div')
				div.innerHTML = this.$route.params.orderStr
				document.body.appendChild(div)
				this.$nextTick(function() {
					document.forms[0].submit()
				})
			}else{
				this.$router.push({
					name:'recharge',
					params:{
						reload:true
					}
				})
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
<template>
	<div class="titlebox" :style="titlebarConfig.style"><i></i>{{titlebarConfig.content.text}}</div>
</template>


<script>
	export default {
		props: {
			titlebarConfig:{
				type:Object,
				default:{}
			}
		},
		data() {
			return {

			}
		},
		created() {
			// console.log(this.titlebarConfig)
		},
		mounted() {

		},
		methods: {


		},
		components: {

		}
	}
</script>

<style lang="less" scoped>

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
<template>
	<!-- <button @click="aa">测试接口</button> -->
	<div>
		<div class="header">我是头部</div>
		<div class="wrapper" ref="wrapper">
			<div>
				<div class="wz">文字哦</div>
				<div class="wz">文字哦</div>
				<div class="wz">文字哦</div>
				<div class="wz">文字哦</div>
				<div class="wz">文字哦</div>
				<div class="wz">文字哦</div>
				<div class="wz">文字哦</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'

	export default {
		
		data(){
			return {

			}
		},
		mounted(){
			this.scroll = new BScroll(this.$refs.wrapper,{

			});
		},
		methods:{
			aa(){
				var _this=this;
				_this.$http.get('http://www.cgc999.com/app/index.php?i=2&c=entry&m=mx_shop&do=mobile&r=art',{

				}).then(function(res){
					
						alert(res)
					
				}).catch(function(err){
					alert(err)
				});
			},

		}
	}
</script>

<style lang="less" scoped>
	button{
		width: 100px;
		height: 100px;
	}
	.header{
		height: 50px;
		border: 1px solid #ccc;
	}
	.wrapper{
		box-sizing: border-box;
		position: absolute;
		top: 50px;
		left:0;
		right:0;
		bottom:0;
		width: 100%;
		overflow: hidden;
		.wz{
			box-sizing: border-box;
			width: 100%;
			height: 200px;
			border: 1px solid #333;
		}
	}
	
</style>
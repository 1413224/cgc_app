<template>
	<div class="wrap">
		测试子路由
		<router-view></router-view>
		<div class="footer">
			<ul>
				<li @click="gourl(1)">菜单一</li>
				<li @click="gourl(2)">菜单二</li>
				<li>菜单三</li>
				<li>菜单三</li>
			</ul>
		</div>
	</div>
</template>

<script>
	
export default {
	data() {
		return {
		}
	},
	components: {

	},
	created() {

	},
	mounted() {

	},
	methods: {
		gourl(data){
			var _this = this;
			if(data==1){
				_this.$router.push({
					path:'/multi_user_mall/text'
				})
			}else if(data==2){
				_this.$router.push({
					/*path:'/multi_user_mall/text/text2',
					params:'https://www.baidu.com/'*/
					name:'text2',
					query:{
						src:'https://www.baidu.com/'
					}
				})
			}
		}
	}
}
</script>
<style lang="less" scoped>
.footer{
	width: 100%;
	height: 50px;
	background: #fff;
	box-sizing: border-box;
	position: fixed;
	bottom: 0;
	border: 1px solid #333;
	ul{
		display: flex;
		li{
			flex: 1;
			height: 50px;
			line-height: 50px;
			text-align: center;
			border-right: 1px solid #ccc;
		}
	}
	
}
</style>
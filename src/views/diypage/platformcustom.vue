<template>
	<div class="wrap">
		<page-index :showList="showList" :customMenuId="customMenuId"></page-index>
	</div>
</template>

<script>
 import pageIndex from './index.vue'
	export default {
		props: {

		},
		computed:{

		},
		data() {
			return {
				showList:[],
				tabType:'',
				customMenuId:'',
			}
		},
		created() {
			this.getDiypage()
		},
		mounted() {

		},
		/*beforeRouteLeave(to,from,next){
			this.$store.commit('changeShowDefaultNav',true)//显示默认底部菜单栏
			//隐藏底部菜单
			next()
		},*/
		methods: {
			getDiypage(){
				var _this = this,
						diyPageId = _this.mainApp.getCs('id');
				_this.$http.get(_this.url.user.platformDiypage,{
					params:{
						diyPageId:diyPageId,
						platformId:_this.url.platformId,
						type:2
					}
				}).then((res)=>{
					if(res.data.status=="00000000"){
						_this.showList = JSON.parse(res.data.data.content)
						_this.tabType = _this.showList[0].data.tabType
						// console.log(_this.tabType)
						if(_this.tabType=="0"){
							_this.$store.commit('changeShowDefaultNav',false) //隐藏默认(系统)底部导航
						}

						if(res.data.data.menuId){
							_this.customMenuId = res.data.data.menuId
							// console.log(_this.customMenuId)
						}


					}
				})
			}
		},
		components: {
			pageIndex
		}
	}
</script>

<style lang="less" scoped>

</style>
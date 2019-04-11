	<template>
	<div class="wrap" :style="{background:bgColor}">
		<page-index :showList="showList"></page-index>
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
				menuId:'',
				bgColor:''
			}
		},
		created() {
			this.getDiypage()
		},
		mounted() {

		},
		methods: {
			getDiypage(){
				var _this = this
						// diyPageId = _this.mainApp.getCs('id');

				_this.$http.get(_this.url.user.platformDiypage,{
					params:{
						// diyPageId:diyPageId,
						platformId:_this.url.platformId,
						type:1
					}
				}).then((res)=>{
					if(res.data.status=="00000000"){
						_this.showList = JSON.parse(res.data.data.content)
						// console.log(_this.showList)
						_this.bgColor = _this.showList[0].data.backgroundColor

						_this.tabType = _this.showList[0].data.tabType
						_this.menuId = res.data.data.menuId

						if(_this.tabType=="0"){
							
							_this.$store.commit('changeShowDefaultNav',false) //隐藏默认(系统)底部导航
						}

						if(_this.menuId){
							// _this.$store.commit('changeShowDefaultNav',false) //隐藏默(系统)认底部导航

							// _this.$store.commit('changePlatformId',_this.menuId) //修改行业平台menuId
							_this.$emit('getPlatformId',_this.menuId)
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
.wrap{
	width: 100%;
	min-height: 100%;
}
</style>
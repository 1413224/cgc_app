<template>
	<div class="wrap">
		<div class="item" v-for="(item,index) in showList">
			<setting-header v-if="item.type==0" :headerConfig="item"></setting-header>
			<titlebar-comp v-if="item.type==5" :titlebarConfig="item" :codeArrya="codeArrya"></titlebar-comp>
			<single-image-comp v-if="item.type==11" :singleImageConfig="item" :codeArrya="codeArrya"></single-image-comp>
			<blank-comp v-if="item.type==6" :blankConfig="item"></blank-comp>
			<button-comp v-if="item.type==7" :buttonConfig="item" :codeArrya="codeArrya"></button-comp>
			<notice-comp v-if="item.type==4" :noticeConfig="item"></notice-comp>
			<banner-comp v-if="item.type==9" :bannerConfig="item" :codeArrya="codeArrya"></banner-comp>
			<piccase-comp v-if="item.type==10" :piccaseConfig="item"></piccase-comp>
			<richtext-comp v-if="item.type==8" :richtextConfig="item"></richtext-comp>
		</div>
	</div>
</template>

<script>
	// import { XInput, Group, XButton, Popup, XHeader } from 'vux'
	import codeArrya from '@/global/code.js'
	import settingHeader from '@/components/setting_header'
	import searchComp from '@/components/custom/searchComp'  //搜索框
	import titlebarComp from '@/components/custom/titleBarComp'  //标题栏   5  
	import singleImageComp from '@/components/custom/singleImageComp'  //单图组  11  
	import blankComp from '@/components/custom/blankComp'  //辅助空白  6  
	import buttonComp from '@/components/custom/buttonComp'  //按钮组  7    
	import noticeComp from '@/components/custom/noticeComp'  //公告  4  
	import bannerComp from '@/components/custom/bannerComp'  //图片轮播  9  
	import piccaseComp from '@/components/custom/piccaseComp' //图片橱窗  10 
	import richtextComp from '@/components/custom/richtextComp' //富文本  8  
	// import footnavComp from '@/components/custom/footnavComp'  //底部导航
	// 
	import { mapState } from 'vuex'
	export default {
		props: {

		},
		computed:{
			...mapState({
				platformMenuId: state => state.user.platformMenuId,
				shoePlatformMenu: state => state.user.shoePlatformMenu
			})
		},
		data() {
			return {
				codeArrya:codeArrya,
				showList:[],
				diyStyleObject:{
					backgroundColor:""
				},
				tabType:"",
				menuId:""
			}
		},
		created() {
			// this.$store.commit('changePlatformId',"")  //充值platformId
			/*console.log(this.platformMenuId)
			console.log(this.shoePlatformMenu)*/
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
						console.log(_this.showList)
						_this.tabType = _this.showList[0].data.tabType
						_this.menuId = res.data.data.menuId

						if(_this.tabType=="1"){

						}else if(_this.tabType=="0"){
							_this.$store.commit('changeShowDefaultNav',false) //隐藏默认(系统)底部导航
						}

						if(_this.menuId){
							_this.$store.commit('changeShowDefaultNav',false) //隐藏默(系统)认底部导航

							_this.$store.commit('changePlatformId',_this.menuId) //修改行业平台menuId
							_this.$emit('getPlatformId',_this.menuId)
						}

					}
				})
			}

		},
		components: {
			/*XInput,
			Group,
			XButton,
			Popup,
			XHeader*/
			settingHeader,
			searchComp,
			titlebarComp,
			singleImageComp,
			blankComp,
			buttonComp,
			noticeComp,
			bannerComp,
			piccaseComp,
			richtextComp
		}
	}
</script>

<style lang="less" scoped>
.item /deep/ video {
	width: 100% !important;
}
.wrap{
	padding-bottom: 70px;
	.item{

	}
}
</style>
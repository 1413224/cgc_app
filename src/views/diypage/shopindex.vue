<template>
	<div class="wrap">
		<div class="item" v-for="(item,index) in contentList">
			<setting-header v-if="item.type==0" :title="item.data.title"></setting-header>
			<titlebar-comp v-if="item.type==5" :titlebarConfig="item" :codeArrya="codeArrya"></titlebar-comp>
			<single-image-comp v-if="item.type==11" :singleImageConfig="item" :codeArrya="codeArrya"></single-image-comp>
			<blank-comp v-if="item.type==6" :blankConfig="item"></blank-comp>
			<button-comp v-if="item.type==7" :buttonConfig="item" :codeArrya="codeArrya"></button-comp>
			<notice-comp v-if="item.type==4" :noticeConfig="item"></notice-comp>
			<banner-comp v-if="item.type==9" :bannerConfig="item" :codeArrya="codeArrya"></banner-comp>
			<piccase-comp v-if="item.type==10" :piccaseConfig="item" :codeArrya="codeArrya"></piccase-comp>
			<richtext-comp v-if="item.type==8" :richtextConfig="item"></richtext-comp>
			<shop-comp v-if="item.type==1" :shopConfig="item"></shop-comp>
			<video-comp v-if="item.type==15" :videoConfig="item"></video-comp>
		</div>
	</div>
</template>

<script>
	import codeArrya from '@/global/code.js'
	import titlebarComp from '@/components/custom/titleBarComp'  //标题栏   5  
	import singleImageComp from '@/components/custom/singleImageComp'  //单图组  11  
	import blankComp from '@/components/custom/blankComp'  //辅助空白  6  
	import buttonComp from '@/components/custom/buttonComp'  //按钮组  7   
	import noticeComp from '@/components/custom/noticeComp'  //公告  4  
	import bannerComp from '@/components/custom/bannerComp'  //图片轮播  9  
	import piccaseComp from '@/components/custom/piccaseComp' //图片橱窗  10 
	import richtextComp from '@/components/custom/richtextComp' //富文本  8 


	import shopComp from '@/components/custom/shopComp'  //商品组
	import videoComp from '@/components/custom/videoComp'  //视频组

	export default {
		props: {
			
		},
		data() {
			return {
				codeArrya:codeArrya,
				contentList:[],
				menuId:'',
				tabType:'',
				menuContent:'',
				info:{}
			}
		},
		created() {
			// console.log(this.allianceContent)
			this.getAllianceDiypage()
		},
		mounted() {
		},
		methods: {
			getAllianceDiypage(){
				var _this = this
				_this.$http.get(_this.url.user.diyPage,{
					params:{
						allianceId:_this.$route.query.allianceId,
						type:1
					}
				}).then((res)=>{
					if(res.data.status=="00000000"){
						if(res.data.data !==""){
							_this.contentList = JSON.parse(res.data.data.content)
							_this.menuId = res.data.data.menuId
							_this.tabType = _this.contentList[0].data.tabType

							// console.log(_this.contentList)
							// tabType=1:系统默认
							// tabType=0:不显示
							if(_this.menuId){
								_this.$emit('getMenuId',_this.menuId)
							}
							if(_this.tabType=="1"){
								_this.$emit('defaultMenu','default')
								_this.getBasicInfo()
							}
							if(_this.tabType=="0"){
								_this.$emit('nodefaultMenu','nodefault')
								_this.getBasicInfo()
							}


						}
					}
				})
			},
			getBasicInfo(){
				var _this = this
				_this.$http.get(_this.url.qy.getBasicInfo,{
					params:{
						enterpriseId: _this.$route.query.eid
					}
				}).then((res)=>{
					if(res.data.status == "00000000"){
						_this.info = res.data.data
						// console.log(_this.info)
						_this.$emit('getAllianceCont',_this.info)
					}
				})
			}
		},
		watch: {


		},
		components: {
			titlebarComp,
			singleImageComp,
			blankComp,
			buttonComp,
			noticeComp,
			bannerComp,
			piccaseComp,
			richtextComp,
			shopComp,
			videoComp
		}
	}
</script>

<style lang="less" scoped>



</style>
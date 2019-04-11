<template>
	<div class="wrap">
		<div class="item" v-for="(item,index) in this.showList">
			<setting-header v-if="item.type==0" :title="item.data.title"></setting-header>
			<titlebar-comp v-if="item.type==5" :titlebarConfig="item" :codeArrya="codeArrya"></titlebar-comp>
			<single-image-comp v-if="item.type==11" :singleImageConfig="item" :codeArrya="codeArrya"></single-image-comp>
			<blank-comp v-if="item.type==6" :blankConfig="item"></blank-comp>
			<button-comp v-if="item.type==7" :buttonConfig="item" :codeArrya="codeArrya"></button-comp>
			<notice-comp v-if="item.type==4" :noticeConfig="item"></notice-comp>
			<banner-comp v-if="item.type==9" :bannerConfig="item" :codeArrya="codeArrya"></banner-comp>
			<piccase-comp v-if="item.type==10" :piccaseConfig="item" :codeArrya="codeArrya"></piccase-comp>
			<shop-comp v-if="item.type==1" :shopConfig="item"></shop-comp>
			<video-comp v-if="item.type==15" :videoConfig="item"></video-comp>
			<richtext-comp v-if="item.type==8" :richtextConfig="item"></richtext-comp>
		</div>
		<footnav-comp 
			v-if="this.customMenuId" 
			:specialMenuId="this.customMenuId"
			:codeArrya="codeArrya"></footnav-comp>
		<!-- <example v-if="!this.customMenuId"></example> -->
		<!-- <div v-if="this.customMenuId">测试底部菜单</div> -->
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
	import footnavComp from '@/components/custom/footnavComp'  //底部导航
	import shopComp from '@/components/custom/shopComp'  //商品组
	import videoComp from '@/components/custom/videoComp'  //视频组
	// import example from '@/components/custom/example'//测试页面，可忽略

	export default {
		props: {
			showList:{
				type:Array,
				default:[]
			},
			customMenuId:{
				type:String,
				default:''
			}
		},
		computed:{

		},
		data() {
			return {
				codeArrya:codeArrya
			}
		},
		created() {
		},
		mounted() {
			// console.log(this.customMenuId)
		},
		methods: {


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
			richtextComp,
			footnavComp,
			shopComp,
			videoComp
			// example
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
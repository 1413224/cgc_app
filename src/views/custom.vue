<template>
	<div class="wrap">
		<div class="item" v-for="(item,index) in showList">
			<!-- <search-comp></search-comp> -->
			<titlebar-comp v-if="item.typecomp==5" :titlebarConfig="item"></titlebar-comp>
			<single-image-comp v-if="item.typecomp==11" :singleImageConfig="item"></single-image-comp>
			<blank-comp v-if="item.typecomp==6" :blankConfig="item"></blank-comp>
			<button-comp v-if="item.typecomp==7" :buttonConfig="item"></button-comp>
			<notice-comp v-if="item.typecomp==4" :noticeConfig="item"></notice-comp>
			<banner-comp v-if="item.typecomp==9" :bannerConfig="item"></banner-comp>
			<piccase-comp v-if="item.type==10" :piccaseConfig="item"></piccase-comp>
			<richtext-comp v-if="item.type==8" :richtextConfig="item"></richtext-comp>
		</div>
		
	</div>
</template>

<script>
	// import { swiper, swiperSlide } from 'vue-awesome-swiper'
	// import { Card, Marquee, MarqueeItem } from 'vux'
	// import BScroll from 'better-scroll'
	// import url from '../config/url'
	// import Qs from 'qs'
	import searchComp from '@/components/custom/searchComp'  //搜索框
	import titlebarComp from '@/components/custom/titleBarComp'  //标题栏
	import singleImageComp from '@/components/custom/singleImageComp'  //单图组
	import blankComp from '@/components/custom/blankComp'  //辅助空白
	import buttonComp from '@/components/custom/buttonComp'  //按钮组
	import noticeComp from '@/components/custom/noticeComp'  //公告
	import bannerComp from '@/components/custom/bannerComp'  //图片轮播
	import piccaseComp from '@/components/custom/piccaseComp' //图片橱窗
	import richtextComp from '@/components/custom/richtextComp' //富文本
	export default {
		data() {
			return {
				showList:[
					{
						typecomp:5,//标题栏
						style:{
							color:'#f00',
							background:'#fff',
							height:'40px',
							lineHeight:'40px',
							textAlign:'center'
						},
						content:{
							text:'我是文字'
						}
					},
					{
						typecomp:11,//单图组
						style:{
							padding:'10px 10px'
						},
						content:{
							src:'./static/vip/swiper4.png'
						}
					},
					{
						typecomp:6,//辅助空白
						style:{
							background:'#999',
							height:'10px'
						}
					},
					{
						typecomp:7,//按钮组
						style:{},
						content:{
							iconList:[
								{
				  				id:'0001',
				  				imgUrl:'http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png',
				  				desc:'景点门票',
				  				color:'#f00'
				  			},
				  			{
				  				id:'0002',
				  				imgUrl:'http://img1.qunarzz.com/piao/fusion/1804/ff/fdf170ee89594b02.png',
				  				desc:'必游榜单'
				  			},
				  			{
				  				id:'0003',
				  				imgUrl:'http://img1.qunarzz.com/piao/fusion/1803/76/eb88861d78fb9902.png',
				  				desc:'动植物园'
				  			},
				  			{
				  				id:'0004',
				  				imgUrl:'http://img1.qunarzz.com/piao/fusion/1803/54/35899492b1302802.png',
				  				desc:'公园'
				  			},
				  			{
				  				id:'0005',
				  				imgUrl:'http://img1.qunarzz.com/piao/fusion/1803/89/55083b0f1951f302.png',
				  				desc:'游船游艇'
				  			},
				  			{
				  				id:'0006',
				  				imgUrl:'http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png',
				  				desc:'景点门票'
				  			},
				  			{
				  				id:'0007',
				  				imgUrl:'http://img1.qunarzz.com/piao/fusion/1804/ff/fdf170ee89594b02.png',
				  				desc:'必游榜单'
				  			},
				  			{
				  				id:'0008',
				  				imgUrl:'http://img1.qunarzz.com/piao/fusion/1803/76/eb88861d78fb9902.png',
				  				desc:'动植物园'
				  			},
				  			{
				  				id:'0009',
				  				imgUrl:'http://img1.qunarzz.com/piao/fusion/1803/54/35899492b1302802.png',
				  				desc:'公园'
				  			}
							]
						}
					},
					{
						typecomp:4,//公告
						style:{},
						content:{
							imgUrl:'./static/index/index_notice.png',
							speed:3000,
							color:'#f00'
						}
					},
					{
						typecomp:9,//轮播图
						style:{},
						content:{
							imgUrl:'./static/images/mxqy2.png'
						}
					},
					{
						data:{
							backgroundColor:'#fff',
							isPaging:'0',
							layoutMode:'4',
							line:1,
							paddingHorizontal:5,
							paddingVertical:5,
							imgList:[
								{
									imgurl:'./static/images/mxqy.png',
									imgHref:''
								},
								{
									imgurl:'./static/images/mxqy2.png',
									imgHref:''
								},
								{
									imgurl:'./static/images/mxqy2.png',
									imgHref:''
								},
								{
									imgurl:'./static/images/mxqy2.png',
									imgHref:''
								},
								{
									imgurl:'./static/images/mxqy2.png',
									imgHref:''
								}
							]
						},
						label:'图片橱窗',
						type:10
					},
					{
						data:{
							cont:"<div>我是富文本<div>"
						},
						type:8
					}
				],
	


			}
		},
		created() {

		},
		mounted() {


		},

		methods: {

		},
		components: {
			/*swiper,
			swiperSlide,
			Marquee,
			MarqueeItem,
			Card*/
			searchComp,
			titlebarComp,
			singleImageComp,
			blankComp,
			buttonComp,
			noticeComp,
			bannerComp,
			piccaseComp,
			richtextComp
		},
	}
</script>
<style lang="less" scoped>
	/*@import '~vux/src/styles/1px.less';*/
	.wrap{
		padding-bottom: 200px;
		background-color: #F5F6FA;
	}
</style>
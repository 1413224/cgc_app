<template>
	<div class="wrap">
		<search-comp></search-comp>
		<template v-for="(item,index) in titlebarConfig">
			<titlebar-comp :titlebarConfig="item"></titlebar-comp>
		</template>

		<template v-for="(item,index) in singleImageConfig">
			<single-image-comp :singleImageConfig="item"></single-image-comp>
		</template>

		<template v-for="(item,index) in blankConfig">
			<blank-comp :blankConfig="item"></blank-comp>
		</template>

		<template v-for="(item,index) in buttonConfig">
			<button-comp :buttonConfig="item"></button-comp>
		</template>

		<template v-for="(item,index) in noticeConfig">
			<notice-comp :noticeConfig="item"></notice-comp>
		</template>

		<template v-for="(item,index) in bannerConfig">
			<banner-comp :bannerConfig="item"></banner-comp>
		</template>

		
	</div>
</template>

<script>
	// import { swiper, swiperSlide } from 'vue-awesome-swiper'
	// import { Card, Marquee, MarqueeItem } from 'vux'
	// import BScroll from 'better-scroll'
	// import url from '../config/url'
	// import Qs from 'qs'
	import searchComp from '@/components/custom/searchComp'  //搜索框
	import titlebarComp from '@/components/custom/titlebarComp'  //标题栏
	import singleImageComp from '@/components/custom/singleImageComp'  //单图组
	import blankComp from '@/components/custom/blankComp'  //辅助空白
	import buttonComp from '@/components/custom/buttonComp'  //按钮组
	import noticeComp from '@/components/custom/noticeComp'  //公告
	import bannerComp from '@/components/custom/bannerComp'  //图片轮播
	export default {
		data() {
			return {
				//标题栏
				titlebarConfig:[
					{
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
					}
				],
				//单图组
				singleImageConfig:[
					{
						style:{
							padding:'10px 10px'
						},
						content:{
							src:'./static/vip/swiper4.png'
						}
					}
				],
				//辅助空白
				blankConfig:[
					{
						style:{
							background:'#999',
							height:'10px'
						}
					}
				],
				//按钮组
				buttonConfig:[
					{
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
					}
				],
				//公告
				noticeConfig:[
					{
						style:{},
						content:{
							imgUrl:'./static/index/index_notice.png',
							speed:3000,
							color:'#f00'
						}
					}
				],
				//轮播图
				bannerConfig:[
					{
						style:{},
						content:{
							imgUrl:'./static/images/mxqy2.png'
						}
					}
				]
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
			bannerComp
		},
	}
</script>
<style lang="less" scoped>
	/*@import '~vux/src/styles/1px.less';*/
	.wrap{
		padding-bottom: 100px;
		background-color: #F5F6FA;
	}
</style>
<template>
	<div class="wrap" :class="{hei50:isPadding}" :style="diyStyleObject">
		<div class="item" v-for="(item,index) in showList">
			<!-- <search-comp></search-comp> -->
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
			<footnav-comp v-if="specialId" :specialMenuId="specialId" :codeArrya="codeArrya"></footnav-comp>
			<!-- v-if="item.type==20" -->
	</div>
</template>

<script>
	// import { swiper, swiperSlide } from 'vue-awesome-swiper'
	// import { Card, Marquee, MarqueeItem } from 'vux'
	// import BScroll from 'better-scroll'
	// import url from '../config/url'
	// import Qs from 'qs'
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

	export default {
		data() {
			return {
				showList:[
					/*{
						data:{
							color:'#f00',
							backgroundColor:'#fff',
							textAlign:'center',
							text:'标题栏'
						},
						label:'标题栏',
						type:5
					},
					{
						data:{
							imgList:[
								{
									imgurl:'./static/vip/swiper4.png'
								}
							]
						},
						label:'单图组',
						type:11
					},
					{
						data:{
							backgroundColor:'#999',
							height:'10px'
						},
						label:'辅助空白',
						type:6
					},
					{
						data:{
							backgroundColor:'#f00',
							lineNumber:'4',
							isPaging:'0',
							line:2,
							buttonList:[
								{
									color:"#f00",
									text:'景点门票',
									imgurl:'http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png'
								},
								{
				  				color:"#333",
				  				imgurl:'http://img1.qunarzz.com/piao/fusion/1804/ff/fdf170ee89594b02.png',
				  				text:'必游榜单'
				  			},
				  			{
				  				color:'#333',
				  				imgurl:'http://img1.qunarzz.com/piao/fusion/1803/76/eb88861d78fb9902.png',
				  				text:'动植物园'
				  			},
				  			{
				  				color:'#333',
				  				imgurl:'http://img1.qunarzz.com/piao/fusion/1803/54/35899492b1302802.png',
				  				text:'公园'
				  			},
				  			{
				  				color:'#333',
				  				imgurl:'http://img1.qunarzz.com/piao/fusion/1803/89/55083b0f1951f302.png',
				  				text:'游船游艇'
				  			},
				  			{
				  				color:'#333',
				  				imgurl:'http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png',
				  				text:'景点门票'
				  			},
				  			{
				  				color:'#333',
				  				imgurl:'http://img1.qunarzz.com/piao/fusion/1804/ff/fdf170ee89594b02.png',
				  				text:'必游榜单'
				  			},
				  			{
				  				color:'#333',
				  				imgurl:'http://img1.qunarzz.com/piao/fusion/1803/76/eb88861d78fb9902.png',
				  				text:'动植物园'
				  			},
				  			{
				  				color:'#333',
				  				imgurl:'http://img1.qunarzz.com/piao/fusion/1803/54/35899492b1302802.png',
				  				text:'公园'
				  			}
							]
						},
						label:'按钮组',
						type:7
					},
					{
						data:{
							// backgroundColor:"#f00",
							color:"#f00",
							icon:'./static/index/index_notice.png',
							contentType:'1',
							noticeList:[
								{
									text:'快讯1',
								},
								{
									text:'快讯2'
								},
								{
									text:'快讯3'
								}
							],
							speed:2,
							total:10
						},
						label:'公告',
						type:4
					},
					{
						data:{
							imgList:[
								{
									imgurl:'./static/images/mxqy2.png'
								}
							]
						},
						label:'轮播图',
						type:9
					},
					{
						data:{
							backgroundColor:'#fff',
							isPaging:'0',
							layoutMode:'1',
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
								
							]
						},
						label:'图片橱窗',
						type:10
					},
					{
						data:{
							cont:"<div>我是富文本<div>"
						},
						label:'富文本',
						type:8
					},
					{
						data:{

						},
						label:'底部菜单',
						type:20
					},*/
					/*{
						data:{

						},
						label:'商品组',
						type:21
					}*/
				],
				codeArrya:codeArrya,
				diyStyleObject:{
					backgroundColor:""
				},
				specialId:"",
				tabType:"",
				isPadding:false
			}
		},
		created() {
			this.diyPage()
			// console.log(1)
		},
		mounted() {
			// console.log(codeArrya)
			
		},
		beforeRouteLeave(to,from,next){
			this.$store.commit('changeShowDefaultNav',true)//显示默认底部菜单栏
			next()
		},

		methods: {
			diyPage(){
				var _this = this,
					diyPageId = _this.mainApp.getCs('id')

				_this.$http.get(_this.url.user.diyPage,{
					params:{
							type:2,
							diyPageId:diyPageId
						}
				}).then((res)=>{
					if(res.data.status == "00000000"){
						
						var pageData = JSON.parse(res.data.data.content),
								menuId = res.data.data.menuId,
								len = pageData.length;

						_this.showList = pageData;
						_this.tabType = _this.showList[0].data.tabType;//自定义菜单选项

						_this.diyStyleObject.backgroundColor = _this.showList[0].data.backgroundColor

						if(_this.tabType=="1"){
							// _this.$store.commit('changeShowDefaultNav',true)
							_this.isPadding = true  //当默认为系统底部导航时，防止导航遮住内容

						}else if(_this.tabType=="0"){
							_this.$store.commit('changeShowDefaultNav',false) //隐藏默认底部导航
						}

						if(menuId){
							//自定义页面【专题页】的底部菜单
							_this.specialId = menuId
							// 
							_this.$store.commit('changeMenuId',menuId)
							_this.$store.commit('showMenu',true)
							
						}

					console.log(_this.showList)
							// _this.showList = pageData;
					}
				})
			},
		},
		components: {
			/*swiper,
			swiperSlide,
			Marquee,
			MarqueeItem,
			Card*/
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
		},
	}
</script>
<style lang="less" scoped>
	/*@import '~vux/src/styles/1px.less';*/
	.wrap{
		background-color: #F5F6FA;
		min-height: 100%;
	}
	.hei50{
		padding-bottom: 50px;
	}
</style>
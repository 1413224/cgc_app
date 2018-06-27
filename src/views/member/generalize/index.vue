<template>
	<div class="wrap">
		<settingHeader :title="title"></settingHeader>
		<div class="alerts-tob">
			<swiper :options="swiperOption" class="swiper">
		        <swiper-slide v-for="(item, index) in tabData" :key="index">
		        	<div class="tab-item" :class="{'tab-item-active':actTab == index}" @click="onLoadDataFirst(index,item.cateid)">
	                    {{item.name}}
	                </div>
		        </swiper-slide>
		    </swiper>
	        <div class="white"></div>
       </div>
       <div class="wrapper" ref="wrapper">
			<div class="content">
		       <div class="news">   
					<noData v-if="showNull" :status="2" stateText="暂无数据"></noData>

					<div class="new" :class="{'oneImage':item.imgs.length>0}" v-for="(item,index) in articleList" :key="index">
						<a :href="item.url">
							<p class="newTitle">{{item.name}}</p>
							<!-- ../../../assets/images/member/index01.jpg -->
							<div class="right" v-if="item.imgs.length"><img :src='item.imgs[0]' alt=""></div>
							<p class="newBottom">{{item.cateName}} &nbsp;<span>{{item.addTime}}</span></p>
							<div class="clear"></div>
						</a>
					</div>

					<!-- <div class="new oneImage">
						<p class="newTitle">CGC区块链共享经济引领传统产业规模化转型升级</p >
						<div class="right"><img src="../../../assets/images/member/index01.jpg" alt=""></div>
						<p class="newBottom">共享经济 &nbsp;<span>2018.5.7 &nbsp;12：00</span></p >
						<div class="clear"></div>
					</div> -->

			    </div>
			    <loading v-if="show"></loading>
		    	<noMore v-if="showNomore"></noMore>
			</div>
		</div>
	</div>
</template>
<script>
	import settingHeader from '../../../components/setting_header'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import BScroll from 'better-scroll'
	import noData from '../../../components/noData'
	import Loading from '../../../components/loading'
	import noMore from '../../../components/noMore'
	import url from '../../../config/url'
	import Qs from 'qs'
	// import { setTimeout } from 'timers';
	export default {
		data(){
			return {
				title:'推广助手',
				// tabData:['新闻类','活动类','品牌类','视频推广','领导关怀'],
				tabData:[
					{
						cateid:'1',
						name:'快讯'
					}
				],
				firseId:0,
				swiperOption:{
					slidesPerView : 'auto',
					spaceBetween : 20,
				},
				actTab:0,
				articleList: [],
				page:1,
				cateid:0,
				showNull:false,
				show:false,
				showNomore: false,
			}
		},
		components:{
			settingHeader,
			swiper,
			swiperSlide,
			Loading,
			noMore,
			noData
		},
		mounted() {
			this.InitScroll();
			this.getArticleCategory();
		},
		methods:{
			
			InitScroll() {
				var _this = this
				this.$nextTick(() => {
					if(!this.scroll) {
						this.scroll = new BScroll(this.$refs.wrapper, {
							click: true,
							scrollY: true,
							pullUpLoad: {
								threshold: 0, // 负值是当上拉到超过低部 70px；正值是距离底部距离 时，                    
							}
						})
						this.scroll.on('pullingUp', (pos) => {
							// this.show = true;
							_this.page++;
							// alert(_this.page)
							_this.onLoadData(_this.actTab,_this.cateid)
							this.$nextTick(function() {
								this.scroll.finishPullUp();
								this.scroll.refresh();
							});
						})
					} else {
						this.scroll.refresh()
					}
				})
			},
			onLoadData(index,id) {
				var _this = this
					_this.show = true

				if(_this.showNomore){
					_this.show = false;
				}else{
					setTimeout(() => {
						// let len = _this.articleList.length;
						var params={
							cateid:id,
							page:_this.page,
							pagesize:10,
							islist:true
						}
						let par = Qs.stringify(params)

						_this.$http.post(url.article.getArticleLists,par).then((res) => {
							if(res.status == 200 && res.data != null){

								_this.show = false

								_this.articleList = _this.articleList.concat(res.data.result.lists)

								if(_this.articleList.length == 0){
									_this.showNull = true
								}else{
									_this.showNull = false
								}

								// if(len == _this.articleList.length){
								// 	_this.showNomore = true;
								// }
								if(res.data.result.lists.length < 10){
									// _this.show = false
									_this.showNomore = true
								}

							}
						});
					},1500)
				}
			},
			getArticleCategory(){
				var _this = this
				_this.$http.post(url.article.getArticleCategory).then((res) => {
					if(res.status == 200 && res.data != null){
						_this.tabData = res.data.result.lists
						_this.firseId = JSON.parse(res.data.result.lists[0].cateid)
						// alert(_this.firseId)
						_this.onLoadDataFirst(0,_this.firseId)
						// console.log(res)
					}
				});
			},
			onLoadDataFirst(index,id){
				let _this = this
				_this.actTab = index 
				_this.show = false
				_this.showNomore = false
				_this.page = 1
				_this.cateid = id

				var params={
					cateid:id,
					page:1,
					pagesize:10
				}

				let par = Qs.stringify(params)
				_this.$http.post(url.article.getArticleLists,par).then((res) => {
					if(res.status == 200 && res.data != null){
						_this.articleList = res.data.result.lists

						if(_this.articleList.length == 0){
							_this.showNull = true
						}else{
							_this.showNull = false
						}

					}
				});
			}
		}
	}
</script>

<style lang='less' scoped>
	.wrap{
		height: 100%;
		padding: 0 0.1rem;
		background: #fff;
		.wrapper {
			// height: 91.8%;
			position: absolute;
			top: 2rem;
			left: 0;
			right: 0;
			bottom: 0;
			overflow: hidden;
			/*padding-bottom: 1rem;*/
		}
		.alerts-tob{
		    position: relative;
		    width: 100%;
		    text-align: center;
		    background: white;
		    color: #1B2642;
		    font-size: 0.28rem;
		    height: auto;
		    border-bottom: 1px solid #D8DFF0;
		    box-shadow:0.03rem 0.13rem 0.08rem rgba(216,223,240,0.2);
		    .white{
			    position: absolute;
			    background: white;
			    width: 0.4rem;
			    height: 0.4rem;
			    content: '';
			    top: 0.28rem;
			    right: 0;
			    z-index: 2;
			    box-shadow:-0.15rem 0 0.2rem rgba(255,255,255,0.8);
			    border-bottom-left-radius: 20%;
			}
			/* 横向滚动*/
			.swiper-container{
				height: 1rem;
				line-height: 1rem;
				font-size: 0.3rem;
				color: #1A2642;
				.tab-item{
				    width:auto;
				}
				.swiper-slide {
				    -webkit-flex-shrink: 0;
				    -ms-flex: 0 0 auto;
				    flex-shrink: 0;
				    width: auto;
				    border: 0;
				    position: relative;
				    margin-left: 0.25rem;
				    padding-right: 0.2rem;
				}
				.swiper-slide:last-child{
				    margin-right: 0.4rem;
				}

				.tab-item-active{
				    color: #7386AD;
				}
			}
		}
		.news{
		    height: 100%;
		    padding-top: 0;
		    position: relative;
		    .new{
			    border-bottom: 1px solid #D8DFF0;
			    padding-bottom: 0.2rem;
			    padding-left:0.24rem;
			    padding-right: 0.16rem;
			    .newTitle{
				    float: left;
				    margin: 0.24rem 0.5rem 0.18rem 0;
				    font-size: 0.34rem;
				    color: #1A2642;
				    line-height: 0.45rem;
				    width: 100%;
				}
				.newBottom{
				    color: #7386AD;
				    font-size: 0.26rem;
				    float:left;
				    span{
					    color: #7386AD;
					}
				}
				.right{
					img{
						width:2.2rem;
					    height:1.2rem;
					    margin-top: 0.35rem;
					}
				    
				}
				
				.imgList{
				    width: 100%;
				    display: flex;
				    flex-wrap: nowrap;
				    margin-bottom: 0.18rem;
				    img{
					    width: 33%;
					    height: 1.1rem;
					    margin-right: 0.8%;
					}
				}
			}
			.oneImage {
				.newTitle{
				    width: 3.9rem;
				    margin: 0.24rem 0.72rem 0.36rem 0;
				}
			}
		}
	}
</style>
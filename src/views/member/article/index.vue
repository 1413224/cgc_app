<template>
	<div class="wrap">
		<settingHeader :title="title"></settingHeader>
		<!-- <div class="alerts-tob">
			<swiper :options="swiperOption" class="swiper">
		        <swiper-slide v-for="(item, index) in tabData" :key="index">
		        	<div class="tab-item" :class="{'tab-item-active':actTab == index}" @click="actTab = index">
	                    {{item}}
	                </div>
		        </swiper-slide>
		    </swiper>
	        <div class="white"></div>
       </div> -->
       <div class="wrapper" ref="wrapper">
			<div class="content">
		       <div class="news">

				   <noData v-if="showNull" :status="2" stateText="暂无数据"></noData>

					<div class="new" v-for="(item,index) in articleList" :key="index"  :class="item.thumb.length==1?'oneImage':''" @click="goDetail(item.articleId)">
					<!-- :href="item.url" -->
						<p class="newTitle">{{item.title}}</p>
						<div class="right" v-if="item.thumb.length==1"><img :src="item.thumb[0].original" alt=""></div>
						<!-- <div class="imgList" v-show="item.thumbthumb.length>1">
							<img :src="img" alt="" v-for="(img,index) in item.thumb" v-if='index<=2' :key="index">
						</div> -->
						<p class="newBottom">{{item.author}} &nbsp;<span>{{item.createTime | getDate}}</span></p>
						<div class="clear"></div>
					</div>
			                
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
	import Loading from '../../../components/loading'
	import noMore from '../../../components/noMore'
	import noData from '../../../components/noData'
	import url from '../../../config/url'
	import Qs from 'qs'
	export default {
		data(){
			return {
				title:'快讯列表',
				tabData:['成功商学院','活动通告','新品发布','品牌故事','新闻中心'],
				swiperOption:{
					slidesPerView : 'auto',
					spaceBetween : 20,
				},
				showNull:false,
				actTab:0,
				show:false,
				showNomore: false,
				articleList: [],
				page: 1,
				flag:true
			}
		},
		components:{
			settingHeader,
			swiper,
			swiperSlide,
			Loading,
			noData,
			noMore
		},
		mounted() {
			this.InitScroll()
			this.getData()
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
								threshold: 10, // 负值是当上拉到超过低部 70px；正值是距离底部距离 时，                    
							}
						})
						this.scroll.on('pullingUp', (pos) => {
							// _this.flag = true
							
								if(_this.flag==true){
									_this.flag = false
									this.LoadData()
								}
								// this.LoadData()
							
							this.$nextTick(function() {
								// _this.flag = false
								this.scroll.finishPullUp();
								
								this.scroll.refresh();
							});
						})
					} else {
						this.scroll.refresh()
					}
				})
			},
			LoadData() {
				var _this = this
				_this.show = true

				/*if(_this.showNomore){
					_this.show = false;
				}else{
						_this.page ++;
						let len = _this.articleList.length;
						let parJson = {
							pagesize:6,
							page: _this.page
						}
						let par = Qs.stringify(parJson)
						_this.$http.post(url.article.getArticleLists,par).then(function (response) {
							_this.show = false
							if( response.status == 200 && response.data != null&&response.data.result.page == _this.page){
								_this.articleList = _this.articleList.concat(response.data.result.lists)
							}
							// console.log(_this.articleList);

							if(_this.articleList.length == 0){
									_this.showNull = true
								}else{
									_this.showNull = false
								}

							if(len == _this.articleList.length){
								_this.showNomore = true;
							}
						}).catch(function (error) {
							console.log(error);
						});
					_this.flag = true
				}*/
				if(_this.showNomore){
					_this.show = false;
				}else{
						_this.page ++;
						let len = _this.articleList.length;
						

						_this.$http.get(_this.url.user.getLists,{
							params:{
								type:1,
								curPage:_this.page,
								pageSize:10
							}
						}).then(function (response) {
							_this.show = false
							if( response.status == 200 && response.data.data != null&&response.data.data.page == _this.page){
								_this.articleList = _this.articleList.concat(response.data.data.list)
							}
							// console.log(_this.articleList);

							if(_this.articleList.length == 0){
									_this.showNull = true
								}else{
									_this.showNull = false
								}

							if(len == _this.articleList.length){
								_this.showNomore = true;
							}
						}).catch(function (error) {
							console.log(error);
						});
					_this.flag = true
				}
			},
			getData(){
				/*let _this = this;
				let parJson = {
					pagesize:10,
					page: 1
				}
				let par = Qs.stringify(parJson)
				_this.$http.post(url.article.getArticleLists,par).then(function (response) {
					if( response.status == 200 && response.data != null){
						_this.articleList = response.data.result.lists
					}
					// console.log(_this.articleList);
				}).catch(function (error) {
					console.log(error);
				});*/

				var _this = this
				_this.$http.get(_this.url.user.getLists,{
					params:{
						type:1,
						curPage:1,
						pageSize:10
					}
				}).then((res) => {
					if(res.data.status == "00000000"){

						_this.articleList = res.data.data.list

						console.log(_this.articleList)

						if(_this.articleList.length == 0){
							_this.showNull = true
						}else{
							_this.showNull = false
						}
					}
				})

			},
			goDetail(id){
				this.$router.push({
					path:'/member/article/detail',
					query:{
						id:id
					}
				})
			}
		}
	}
</script>

<style lang='less' scoped>
	.wrap{
		height: 100%;
		padding: 0 0.1rem;
		background: #fff;
		.settingHeader ~ .wrapper{
			position: fixed;
			top: 46px;
			bottom: 0;
			width: 100%;
			overflow: hidden;
		}
		.wrapper {
			position: fixed;
			top: 0;
			bottom: 0;
			width: 100%;
			overflow: hidden;
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
				    margin-left: 0.2rem;
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
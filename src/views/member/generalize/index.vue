<template>
	<div class="wrap">
		<settingHeader :title="title"></settingHeader>
		<div class="alerts-tob">
			<swiper :options="swiperOption" class="swiper">
				<swiper-slide v-for="(item, index) in tabData" :key="index">
					<div class="tab-item" :class="{'tab-item-active':actTab == index}" @click="onLoadDataFirst(index,item.cateId)">
						{{item.name}}
					</div>
				</swiper-slide>
			</swiper>
			<div class="white"></div>
		</div>
		<div class="wrapper" ref="wrapper">
			<div class="content" :class="{'pr_box':!showNull}">
				<Null status="zwsj" text="暂无文章" v-if="!showNull && !inloading"></Null>
				<Null status="loading" text="加载中" v-if="!showNull && inloading"></Null>
				<div class="news" v-if="showNull">
					<!-- <div class="new" :class="{'oneImage':item.imgs.length>0}" v-for="(item,index) in articleList" :key="index">
						<a :href="item.url">
							<p class="newTitle">{{item.title}}</p>
							../../../assets/images/member/index01.jpg
							<div class="right" v-if="item.imgs.length"><img :src='item.imgs[0]' alt=""></div>
							<p class="newBottom">{{item.author}} &nbsp;<span>{{item.createTime}}</span></p>
							<div class="clear"></div>
						</a>
					</div> -->
					<template v-for="(item,index) in articleList">
						<div v-if="item.thumb && item.thumb.length>1" class="new" :key="index" @click="goDetail(item.articleId)">
							<p class="newTitle">{{item.title}}</p>
							<div class="tuwap clearfix">
								<div class="imgs" v-for="(itemimg,index) in item.thumb">
									<img :src="itemimg.original" alt="">
								</div>
							</div>
							<p class="newBottom">{{item.author}} &nbsp;<span>{{item.createTime | getDate}}</span></p>
						</div>
						<div class="new clearfix" v-else :key="index" @click="goDetail(item.articleId)">
							<div class="left">
								<p class="newTitle">{{item.title}}</p>
								<p class="newBottom">{{item.author}} &nbsp;<span>{{item.createTime | getDate}}</span></p>
							</div>
							<div class="right">
								<div class="imgs" v-for="(itemimg,index) in item.thumb">
									<img :src="itemimg.original" alt="">
								</div>
							</div>
						</div>
					</template>
				</div>
				<loading v-if="show"></loading>
				<noMore v-if="showNomore"></noMore>
			</div>
		</div>
	</div>
</template>
<script>
	import settingHeader from '@/components/setting_header'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import BScroll from 'better-scroll'
	import Null from '@/components/null'
	import Loading from '@/components/loading'
	import noMore from '@/components/noMore'
	import Qs from 'qs'
	// import { setTimeout } from 'timers';
	export default {
		data() {
			return {
				title: '推广助手',
				// tabData:['新闻类','活动类','品牌类','视频推广','领导关怀'],
				tabData: [{
					cateid: '',
					name: ''
				}],
				firseId: 0,
				swiperOption: {
					slidesPerView: 'auto',
					spaceBetween: 20,
				},
				actTab: 0,
				articleList: [],
				page: 1,
				cateid: 0,
				showNull: false,
				inloading: true,
				show: false,
				showNomore: false,
				flage: true
			}
		},
		components: {
			settingHeader,
			swiper,
			swiperSlide,
			Loading,
			noMore,
			Null
		},
		mounted() {

			this.actTab = this.$route.query.tabIndex ? this.$route.query.tabIndex : 0

			this.InitScroll();
			this.getArticleCategory(); //获取分类
		},
		methods: {

			InitScroll() {
				var _this = this
				this.$nextTick(() => {
					if(!this.scroll) {
						this.scroll = new BScroll(this.$refs.wrapper, {
							click: true,
							scrollY: true,
							pullUpLoad: {
								threshold: -50, // 负值是当上拉到超过低部 70px；正值是距离底部距离 时，                    
							}
						})
						this.scroll.on('pullingUp', (pos) => {
							if(_this.flage == true) {
								_this.flage = false
								_this.page++;
								_this.onLoadData(_this.actTab, _this.cateid)
							}
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
			onLoadData(index, id) {
				var _this = this
				_this.show = true
				if(_this.showNomore) {
					_this.show = false
				} else {
					_this.$http.get(_this.url.user.getLists, {
						params: {
							type: 2,
							cateIds: id,
							curPage: _this.page,
							pageSize: 10
						}
					}).then((res) => {
						_this.show = false
						if(res.status == 200 && res.data != null) {

							_this.show = false

							_this.articleList = _this.articleList.concat(res.data.data.list)
							if(res.data.data.list.length < 10) {
								_this.showNomore = true
							}

						}
					}).catch((error) => {
						console.log(error)
					});
					_this.flage = true
				}
			},
			getArticleCategory() {
				var _this = this
				_this.$http.get(_this.url.user.getCategoryLists, {
					params: {
						level: 1,
						curPage: 1,
						pageSize: 20
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						if(res.data.data.list.length > 0) {
							_this.tabData = res.data.data.list
							_this.onLoadDataFirst(_this.actTab, res.data.data.list[_this.actTab].cateId)
						}
					}
				})
			},
			onLoadDataFirst(index, id) {
				let _this = this
				_this.flage = true
				_this.actTab = index //控制默认选中
				_this.show = false
				_this.showNomore = false
				_this.page = 1
				_this.cateid = id

				_this.showNull = false
				_this.inloading = true

				_this.$router.replace({
					query: _this.merge(_this.$route.query, {
						'tabIndex': index
					})
				})

				_this.$http.get(_this.url.user.getLists, {
					params: {
						type: 2,
						cateIds: id,
						curPage: 1,
						pageSize: 10
					}
				}).then((res) => {
					if(res.status == 200 && res.data != null) {

						_this.showNull = res.data.data.list.length > 0 ? true : false
						_this.inloading = false

						_this.articleList = res.data.data.list

					}
				});
			},
			goDetail(id) {
				var _this = this
				_this.$router.push({
					path: '/member/article/detail',
					query: {
						id: id
					}
				})
			}
		}
	}
</script>

<style lang='less' scoped>
	.wrap {
		height: 100%;
		padding: 0 0.1rem;
		background: #fff;
		.settingHeader+.alerts-tob~.wrapper {
			position: absolute;
			top: 2.3rem;
			left: 0;
			right: 0;
			bottom: 0;
			overflow: hidden;
		}
		.wrapper {
			position: absolute;
			top: 1.3rem;
			left: 0;
			right: 0;
			bottom: 0;
			overflow: hidden;
			max-width: 640px;
			margin:0 auto;
			/*padding-bottom: 1rem;*/
			.pr_box {
				position: relative;
				height: 100%;
				background-color: white;
				.null_box {
					position: absolute;
					top: 40%;
					left: 50%;
					transform: translate(-50%, -40%);
				}
			}
		}
		.alerts-tob {
			position: relative;
			width: 100%;
			text-align: center;
			background: white;
			color: #1B2642;
			font-size: 0.28rem;
			height: auto;
			border-bottom: 1px solid #D8DFF0;
			/*box-shadow:0.03rem 0.13rem 0.08rem rgba(216,223,240,0.2);*/
			.white {
				position: absolute;
				background: white;
				width: 0.4rem;
				height: 0.4rem;
				content: '';
				top: 0.28rem;
				right: 0;
				z-index: 2;
				box-shadow: -0.15rem 0 0.2rem rgba(255, 255, 255, 0.8);
				border-bottom-left-radius: 20%;
			}
			/* 横向滚动*/
			.swiper-container {
				height: 1rem;
				line-height: 1rem;
				font-size: 0.3rem;
				color: #1A2642;
				.tab-item {
					width: auto;
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
				.swiper-slide:last-child {
					margin-right: 0.4rem;
				}
				.tab-item-active {
					color: #336fff;
					border-bottom: 2px solid #336fff;
					box-sizing: border-box;
					height: 100%;
				}
			}
		}
		.news {
			height: 100%;
			padding-top: 0;
			position: relative;
			.no_data {
				margin-top: 1rem;
			}
			.new {
				border-bottom: 1px solid #D8DFF0;
				padding-bottom: 0.5rem;
				padding-left: 0.24rem;
				padding-right: 0.16rem;
				.newTitle {
					/*float: left;*/
					margin: 0.24rem 0.5rem 0.18rem 0;
					font-size: 0.34rem;
					color: #1A2642;
					line-height: 0.45rem;
					width: 100%;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}
				.newBottom {
					color: #7386AD;
					font-size: 0.26rem;
					margin-top: .3rem;
					/*float:left;*/
					span {
						color: #7386AD;
					}
				}
				.left {
					float: left;
					width: 4.4rem;
				}
				.right {
					float: right;
					width: 2.3rem;
					height: 1.64rem;
					img {
						width: 100%;
						height: 100;
					}
				}
				.tuwap {
					/*display: flex;*/
					justify-content: space-between;
					.imgs {
						/*flex: 1;*/
						width: 2.3rem;
						height: 1.64rem;
						float: left;
						margin-right: .05rem;
						img {
							width: 95%;
							height: 100%;
						}
					}
				}
				/* .imgList{
				    width: 100%;
				    display: flex;
				    flex-wrap: nowrap;
				    margin-bottom: 0.18rem;
				    img{
					    width: 33%;
					    height: 1.1rem;
					    margin-right: 0.8%;
					}
				} */
			}
			.oneImage {
				.newTitle {
					width: 3.9rem;
					margin: 0.24rem 0.72rem 0.36rem 0;
				}
			}
		}
	}
</style>
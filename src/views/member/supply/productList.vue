<template>
	<section class="supply-box">
		<settingHeader :title="title"></settingHeader>
		<sticky>
			<div class="nav">
				<ul class="pr-nav" ref="paNav">
					<li class="li" v-for="(item,index) in prList" :key="index" :class="[{'blue':prNavIndex == index || (index == 3 && ishasStock)}]" @click="prNavClick(index)">
						{{item.title}}
						<div class="sjx" v-if="index == 0">
							<img :class="{'r180':prNavIndex == index && !show0}" :src="prNavIndex == index?'./static/images/s-in.png':'./static/images/s.png'" />
						</div>
						<div class="sjx" v-if="index == 2" :class="{'r180':(prNavIndex == 2) && huan}">
							<img :src="prNavIndex == index?'./static/images/s-in.png':'./static/images/s.png'" />
							<img :src="'./static/images/x.png'" />
						</div>
					</li>
				</ul>
				<!--类型-->
				<transition name="type-classes-transition" enter-active-class="fadeInDown animated" leave-active-class="fadeOutUp animated">
					<ul class="type_box item_box" :class="{'top1':!$store.state.page.isWx}" v-if="prNavIndex == 0 && show0" style="animation-duration:0.5s">
						<li v-for="(item,index) in typeList" :key="index" @click="activeType(index,item)">
							<span>{{item}}</span>
							<img v-if="typeIndex == index" :src="'./static/images/s_gou.png'" />
						</li>
					</ul>
				</transition>
			</div>
		</sticky>
		<div class="wrapper" ref="wrapper" :class="[{'b-white':goodsList.length == 0}]">
			<div class="content" :class="{'pr_box':!showGoods}">
				<div class="pro-allbox" v-if="showGoods">
					<ul class="item-box">
						<li class="item" v-for="(item,index) in goodsList" :key="index" @click="toGoodsDetails(item.goodsId,item.skuId)">
							<div class="po-img">
								<img v-if="item.dh" :src="'./static/index/xydh.png'" alt="">
								<img v-if="item.gm" :src="'./static/index/xygm.png'" alt="">
							</div>
							<div class="da-box">
								<img v-if="item.img" :src="item.img.original" alt="" />
							</div>
							<p class="title">{{item.goodsName}}</p>
							<p class="oprice">¥ {{Number(item.price).toFixed(2)}}</p>
							<p class="price">
								<span class="jg" v-if="item.payPrice!=0">¥ {{Number(item.payPrice).toFixed(2)}} </span>
								<span v-if="item.payPrice!=0 && item.points!=0">+</span>
								<!-- v-if="item.maxPoints > 0" -->
								<span class="zf" v-if="item.points!=0">
									<span>{{item.points}}</span>
								<span class="f20">信用积分</span>
								</span>
								<span class="img"><img src="../../../assets/images/shop/tip2.png" alt=""></span>
							</p>
						</li>
					</ul>
					<Loading v-if="showLoading"></Loading>
					<no-more v-if="showNomore"></no-more>
				</div>
				<Null v-if="!showGoods && !inloading" status="zwsj" text="暂无商品"></Null>
				<Null v-if="!showGoods && inloading" status="loading" text="加载中"></Null>
			</div>
		</div>
	</section>
</template>

<script>
	import settingHeader from '@/components/setting_header'
	import { Sticky } from 'vux'
	import BScroll from 'better-scroll'
	import Null from '@/components/null'
	import Loading from '@/components/loading'
	import noMore from '@/components/noMore'
	export default {
		data() {
			return {
				title:"供应链云商城",
				prList: [{
						title: '综合'
						
					},
					{
						title: '销量'
					},
					{
						title: '价格'
					},
					{
						title: '仅看有货'
					}
				],
				typeList: ['综合', '最新上架'],
				prNavIndex: 0,
				typeIndex: 0,
				huan: false,
				ishasStock: false,
				showGoods: false,
				inloading: true,
				showNomore: false,
				showLoading: false,
				show0: false,

				goodsList: [],
				type: 0,
				hasStock: 0,
				keyword: '',
				curPage: 1,

			}
		},
		components: {
			settingHeader,
			Sticky,
			BScroll,
			Null,
			Loading,
			noMore
		},
		created() {
			this.getGoodsList()
			this.InitScroll()
		},
		methods: {
			//获取供应链商品列表
			getGoodsList() {
				var _this = this

				_this.$http.get(_this.url.goods.getGoodsList, {
					params: {
						userId: _this.$store.state.user.userId,
						type: _this.type,
						hasStock: _this.hasStock,
						keyword: _this.keyword,
						curPage: _this.curPage,
						pageSize: 20,
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.goodsList = res.data.data.list
						_this.showGoods = res.data.data.list.length > 0 ? true : false
						_this.inloading = false
					}
				})
			},
			//跳转商品详情
			toGoodsDetails(goodsId,skuId) {
				var _this = this
				_this.$router.push({
					path: '/multi_user_mall/commodity_details',
					query: {
						// goodsId: goodsId,
						skuId:skuId
					}
				})
			},
			prNavClick(index) {

				if(index != 3) {
					this.prNavIndex = index
				}

				if(index == 0) {
					//综合 0
					this.show0 = !this.show0
				} else if(index == 1) {
					this.huan = true
					this.type = 2 //销量 2
				} else if(index == 2) {
					this.huan = !this.huan
					this.type = this.huan ? 4 : 3 //价格  3 4
				} else if(index == 3) {
					this.ishasStock = !this.ishasStock
					this.hasStock = this.ishasStock ? 1 : 0 //库存 1 0
				}

				if(index != 0) {
					this.showGoods = false
					this.inloading = true
					this.show0 = false
					this.curPage = 1
					this.getGoodsList()
				}
			},
			activeType(index, item) {
				if(index == 0) {
					this.type = 0
				} else if(index == 1) {
					this.type = 2
				}
				this.show0 = false
				this.showGoods = false
				this.inloading = true
				this.typeIndex = index
				this.curPage = 1
				this.getGoodsList()
			},
			InitScroll() {
				var _this = this
				this.$nextTick(() => {
					if(this.$refs.wrapper) {
						this.scroll = new BScroll(this.$refs.wrapper, {
							click: true,
							scrollY: true,
							pullUpLoad: {
								threshold: 10
							}
						})
						this.scroll.on('pullingUp', (pos) => {
							this.pullingUp()
							this.$nextTick(function() {
								this.scroll.finishPullUp()
								this.scroll.refresh()
							})
						})
					}
				})
			},
			pullingUp() {
				var _this = this

				_this.curPage++;

				_this.$http.get(_this.url.goods.getGoodsList, {
					params: {
						userId: _this.$store.state.user.userId,
						type: _this.type,
						hasStock: _this.hasStock,
						keyword: _this.keyword,
						curPage: _this.curPage,
						pageSize: 20,
						islist: true
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						if(res.data.data.list.length > 0) {
							_this.goodsList = _this.goodsList.concat(res.data.data.list)
							_this.showLoading = true
							_this.showNomore = false
						} else {
							_this.showLoading = false
							_this.showNomore = true
						}
					}
				})
			},
		},

	}
</script>
<style lang="less" scoped>
	.blue {
		color: #336FFF;
	}
	.settingHeader ~ .vux-sticky-box + .wrapper{
		top:92px !important;
		max-width: 640px;
	}
	.supply-box .wrapper{
		top:46px !important;
		max-width: 640px;
	}
	.nav {
		position: relative;
		.type_box {
			li {
				height: 0.88rem;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 0.24rem;
				font-family: PingFang-SC-Medium;
				color: rgba(51, 51, 51, 1);
				padding: 0 0.40rem;
				box-sizing: border-box;
				position: relative;
				img {
					width: 0.29rem;
					height: auto;
				}
			}
			li:not(:last-child):after {
				content: " ";
				position: absolute;
				left: 0;
				bottom: 0;
				right: 0;
				height: 1px;
				border-top: 1px solid #D9D9D9;
				color: #D9D9D9;
				-webkit-transform-origin: 0 0;
				transform-origin: 0 0;
				-webkit-transform: scaleY(0.5);
				transform: scaleY(0.5);
				left: 0px;
			}
		}
		.item_box {
			width: 100%;
			position: absolute;
			background-color: white;
			z-index: 15;
			top: 0.87rem;
			left: 0;
			max-width: 640px;
		}
	}
	
	.pr-nav,
	.pr-nav2 {
		display: flex;
		height: 0.90rem;
		border-top: 1px solid rgba(228, 235, 251, 1);
		background-color: white;
		z-index: 1115;
		position: relative;
		li {
			flex: 1;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 0.28rem;
			font-family: PingFangSC-Regular;
			color: rgba(26, 38, 66, 1);
			.sjx {
				display: flex;
				flex-direction: column;
				margin-left: 0.10rem;
				img {
					width: 0.12rem;
				}
				img:nth-child(2) {
					margin-top: 0.05rem;
				}
			}
			.r180 {
				transform: rotate(180deg);
			}
		}
		.blue {
			color: #336FFF;
		}
	}
	
	.pr-nav2 {
		z-index: 15;
		background-color: white;
	}
	
	.supply-box {
		.wrapper {
			position: fixed;
			top: 0;
			bottom: 0;
			width: 100%;
			overflow: hidden;
			background: #fff;
			z-index: 100;
			.pr_box {
				position: relative;
				height: 100%;
				z-index: 11;
				background-color: white;
				.null_box {
					position: absolute;
					top: 40%;
					left: 50%;
					transform: translate(-50%, -40%);
				}
			}
		}
		.b-white {
			background-color: white;
		}
		.h {
			top: 46px;
		}
		.pro-allbox {
			.item-box {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				padding: 0 0.1rem;
				.item {
					width: 3.62rem;
					margin-bottom: 0.06rem;
					background-color: white;
					position: relative;
					.po-img {
						position: absolute;
						top: 0;
						left: 0;
						img {
							width: 1.28rem;
							height: 0.4rem;
						}
					}
					.da-box {
						height: 3.62rem;
						overflow: hidden;
						img {
							width: 100%;
							height: auto;
						}
					}
					.title {
						width: 100%;
						box-sizing: border-box;
						padding: 0 0.17rem;
						font-size: 0.32rem;
						font-family: PingFangSC-Regular;
						color: rgba(34, 34, 34, 1);
						height: 0.73rem;
						line-height: 0.38rem;
						margin-top: 0.1rem;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					.oprice {
						padding-left: 0.17rem;
						font-size: .25rem;
						margin-top: .1rem;
					}
					/* .img{
						img{
							width: 1rem;
							position: relative;
							top: -.2rem;
							left: .2rem;
						}
					} */
					.price {
						padding: 0.13rem 0.17rem 0.28rem 0.17rem;
						.img {
							/*border: 1px solid #333;*/
							display: block;
							img {
								width: 1rem;
								position: relative;
								top: .09rem;
							}
						}
						.jg {
							font-size: 0.28rem;
							font-weight: bold;
							font-family: PingFangSC-Semibold;
							color: rgba(242, 48, 48, 1);
							/*display: block;*/
						}
						.zf {
							font-size: 0.28rem;
							font-weight: bold;
							font-family: PingFangSC-Medium;
							/*color: rgba(51, 111, 255, 1);*/
							color: #f23030;
							.f20 {
								font-size: 0.20rem;
								font-family: PingFangSC;
								/*color: rgba(51, 111, 255, 1);*/
								color: #f23030;
							}
						}
					}
				}
			}
		}
	}
</style>
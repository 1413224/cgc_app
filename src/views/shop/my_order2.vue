<template>
	<div class="my_order_box">
		<settingHeader :title="title"></settingHeader>
		<div class="px" v-if="!tabNo && !tabNo2">
			<div class="search">
				<div class="ss_box_left" @click="orderSearch()">
					<input ref="searchInput" placeholder="订单编号/商品编号/商品名称" type="text" readonly="readonly" />
					<img :src="'./static/images/ss.png'" />
				</div>
				<div class="ss_box_right" @click="showS">
					<img :src="'./static/images/order_sx.png'" alt="" />
				</div>
			</div>
			<div class="tab_box">
				<tab :line-width="2" :scroll-threshold="5" custom-bar-width="30px">
					<tab-item @on-item-click="onItemClick" v-for="(item,index) in tabList" :badge-label="item.bg > 0 && (index == 1 || index ==2)?item.bg : ''" :selected="tabIndex == index" :key="index">{{item.name}}</tab-item>
				</tab>
			</div>
		</div>
		<div class="order_list_box">
			<div class="wrapper" ref="wrapper" :class="[{'top02':tabNo},{'bw':orderList.length  == 0},{'top0':tabNo2}]">
				<div class="content" ref="content" :class="[{'top50':showLoading2},{'h100':isLess}]">
					<transition enter-active-class="zoomIn animated" leave-active-class="slideOutUp animated" :duration="{ enter: 500, leave: 1000 }">
						<div class="jz-loading" v-if="showLoading2">
							<img v-if="move" class="jiantou" :class="{'r180':huan}" :src="'./static/images/jiantou.png'" alt="" />
							<img v-else :src="'./static/images/loading.gif'" alt="" />
							<p>{{changeTip}}</p>
						</div>
					</transition>

					<div class="order_item" v-for="(item,index) in orderList" v-if="orderList.length > 0">
						<div class="order_top">
							<div class="left" @click="toShopDetail(item.enterpriseId)">
								<img :src="'./static/images/shopLogo.png'" alt="" />
								<p>{{item.shopName}}</p>
								<i class="icon iconfont icon-arrow-right"></i>
							</div>
							<!--线下门店 1 -->
							<!--实物商品 2 -->
							<!--共享服务 3 -->
							<!--点餐 4 -->
							<!--酒店 5 -->
							<!--门票 6 -->
							<!--游戏 7 -->
							<!--手机充值 8 -->
							<!--电影票 9 -->
							<!--演出票 10 -->
							<!--加油卡 11 -->
							<div class="right">
								<p>{{item.statusName}}</p>
							</div>
						</div>
						<div class="order_middle" v-for="(i,index2) in item.items" :key="index2" @click="toDetail(item.orderSn)" v-if="index2+1 <= item.showNum" :class="[{'m':(index2 != item.items.length - 1) && item.items.length <= 10},{'m':(index2 != item.showNum - 1 && index2 != item.items.length - 1) && item.items.length > 10}]">
							<div class="left">
								<img v-if="i.thumb" :src="i.thumb.original" />
								<img v-else :src="'./static/images/cai2.png'" />
							</div>
							<div class="middle">
								<p class="name">{{i.goodsName}}</p>
								<p class="pinfo">{{i.skuName}}</p>
							</div>
							<div class="right">
								<p class="price">¥ {{i.pieceTruePrice}}</p>
								<p class="oldprice">¥ {{i.originPrice}}</p>
								<p class="num">x {{i.number}}</p>
							</div>
						</div>

						<div class="look_all_box" v-if="item.items.length > 10">
							<div @click="lookAllp(item.items.length,index)">{{item.showAll?'收起':'显示全部'}} <img :class="{'r':item.showAll}" :src="'./static/member/yhq-down.png'" alt="" /></div>
						</div>
						<div class="order_bottom">
							<span class="num">共 {{item.totalItems}} 件 </span>
							<span>合计：<i>{{item.actualPrice}}</i>元</span>
							<span class="yf">(含运费{{item.freight}}) </span>
							<span v-if="item.points > 0"> + <i>{{item.points}}</i>信用积分</span>
						</div>
						<div class="order_bth_box">
							<!--线下门店-->
							<div v-if="item.type == 1">
								<div class="btn" v-if="item.status == 70">
									<div @click="deleteOrder(item.orderSn)">删除订单</div>
									<!--<div>评价订单</div>-->
								</div>
							</div>
							<!--共享服务-->
							<div v-if="item.type == 3">
								<!--待付款-->
								<div class="btn" v-if="item.status == 0">
									<div @click="cancelOrder(item.orderSn)">取消订单</div>
									<div>立即付款</div>
								</div>
								<!--待使用-->
								<div class="btn" v-if="item.status == 40">
									<div>联系商家</div>
									<div>立即使用</div>
								</div>
								<!--设备挂单-->
								<div class="btn" v-if="item.status == 50">
									<div>联系商家</div>
									<div>继续使用</div>
								</div>
								<!--使用中-->
								<div class="btn" v-if="item.status == 60">
									<div>设备管理</div>
								</div>
								<!--已完成-->
								<div class="btn" v-if="item.status == 70">
									<div @click="cancelOrder(item.orderSn)">取消订单</div>
									<div>查看发票</div>
									<!--<div>评价晒单</div>-->
								</div>
								<!--使用失败-->
								<div class="btn" v-if="item.status == 100 || item.status == 102">
									<div>联系商家</div>
									<div>继续使用</div>
								</div>
								<!--订单超时-->
								<div class="btn" v-if="item.status == 130">
									<div @click="deleteOrder">删除订单</div>
								</div>
								<!--已取消-->
								<div class="btn" v-if="item.status == 140">
									<div @click="deleteOrder">删除订单</div>
								</div>
							</div>
						</div>
					</div>
					<Loading v-if="showLoading"></Loading>
					<noMore v-if="showNo"></noMore>
					<noData v-if="orderList.length == 0" :status="2" stateText="暂无订单"></noData>
				</div>
			</div>
		</div>

		<div v-transfer-dom>
			<popup v-model="show" position="top">
				<div class="screen_box">
					<div>
						<div class="type_title">订单</div>
						<div class="type_box">
							<div class="type_item" :class="{'blue':typeOrderIndex == index}" v-for="(item,index) in typeOrderList" @click="typeOrder(index)">{{item}}</div>
						</div>
					</div>
					<div>
						<div class="type_title">时间</div>
						<div class="type_box">
							<div class="type_item" :class="{'blue':typeDateIndex == index}" v-for="(item,index) in typeDateList" @click="typeDate(index)">{{item}}</div>
						</div>
					</div>
					<div class="screen_btn" @click="determine">确定</div>
				</div>
			</popup>
		</div>
	</div>
</template>

<script>
	import settingHeader from '../../components/setting_header'
	import BScroll from 'better-scroll'
	import Loading from '../../components/loading'
	import noMore from '../../components/noMore'
	import noData from '../../components/noData'
	export default {
		data() {
			return {
				title: '我的订单',
				tabList: [{
					name: '全部',
					bg: 0
				}, {
					name: '待处理',
					bg: 0
				}, {
					name: '进行中',
					bg: 0
				}, {
					name: '已完成',
					bg: 0
				}, {
					name: '已取消',
					bg: 0
				}],
				tabIndex: 0,
				showAll: false,
				show: false,
				showNum: 10,
				showLoading: false,
				showLoading2: false,
				isLess: false,
				changeTip: '下拉刷新',
				showNo: false,
				typeOrderList: ['全部分类', '线下门店', '实物商品', '共享服务', '点餐', '酒店', '门票', '游戏', '手机充值', '电影票', '演出票', '加油卡'],
				typeDateList: ['全部', '近三个月', '近半年', '今年内'],
				typeOrderIndex: 0, //订单类型
				typeDateIndex: 0, //时间类型
				tabNo: false, //隐藏tab
				tabNo2: false,
				showIndex: '',
				type: 0, //订单类型
				status: 0, //订单状态
				timeType: 0, //订单时间
				curPage: 1, //订单页码
				pageSize: 10, //一页10条
				keyword: '',
				lastOrderTime: '',
				orderList: [],
				timeOut: '',
				move: true,
				huan: false
			}
		},
		components: {
			settingHeader,
			Loading,
			noMore,
			BScroll,
			noData
		},
		created() {

			if(this.$route.query.tabNo) {
				this.tabNo = true

			} else if(this.$route.query.tabNo2) {
				this.tabNo2 = true
			}

			this.tabIndex = this.$route.query.tabIndex ? this.$route.query.tabIndex : 0 //tab栏 index
			this.status = this.$route.query.status ? this.$route.query.status : 0 //订单状态

			this.typeOrderIndex = this.$route.query.typeOrderIndex ? this.$route.query.typeOrderIndex : 0 //筛选订单类型 index
			this.type = this.$route.query.type ? this.$route.query.type : 0 //订单类型

			this.typeDateIndex = this.$route.query.typeDateIndex ? this.$route.query.typeDateIndex : 0 //筛选订单时间 index
			this.timeType = this.$route.query.timeType ? this.$route.query.timeType : 0 //订单时间

			this.keyword = this.$route.query.keyword ? this.$route.query.keyword : '' //keyword
		},
		mounted() {
			this.getOrderList()
		},
		methods: {
			getOrderList(time) {
				var _this = this

				if(time) {
					var obj = {
						userId: _this.$store.state.user.userId,
						type: _this.type,
						status: _this.status,
						timeType: _this.timeType,
						pageSize: _this.pageSize,
						curPage: _this.curPage,
						keyword: _this.keyword,
						lastOrderTime: time,
						islist: true
					}
					var orderUrl = _this.url.order.getNewOrderList
				} else {
					var obj = {
						userId: _this.$store.state.user.userId,
						type: _this.type,
						status: _this.status,
						timeType: _this.timeType,
						pageSize: _this.pageSize,
						curPage: _this.curPage,
						keyword: _this.keyword
					}
					var orderUrl = _this.url.order.getOrderList
				}

				_this.$http.get(orderUrl, {
					params: obj
				}).then((res) => {
					if(res.data.status == "00000000") {

						if(time) {
							_this.orderList = res.data.data.list.concat(_this.orderList)
						} else {
							_this.orderList = res.data.data.list
						}

						for(var i = 0; i < _this.orderList.length; i++) {
							_this.orderList[i].showAll = false
							_this.orderList[i].showNum = 10
						}

						_this.InitScroll()

						_this.showNo = false

						if(time) {
							_this.changeTip = '刷新成功'

							_this.timeOut = setTimeout(function() {
								_this.showLoading2 = false
								_this.move = true
							}, 800)

						}
					} else {
						if(time) {
							_this.changeTip = '刷新失败'

							_this.timeOut = setTimeout(function() {
								_this.showLoading2 = false
								_this.move = true
							}, 800)

						}
					}
				})
			},
			toShopDetail(shopId) {
				var _this = this

				if(shopId) {
					_this.$router.push({
						path: '/multi_user_mall',
						query: {
							id: shopId
						}
					})
				}
			},
			onItemClick(index) {
				var _this = this

				_this.tabIndex = index

				_this.status = index

				_this.curPage = 1

				_this.getOrderList()

				_this.$router.replace({
					query: _this.merge(_this.$route.query, {
						'tabIndex': index,
						'status': index
					})
				})
			},
			showS() {
				this.show = !this.show
			},
			typeOrder(index) {
				var _this = this

				_this.typeOrderIndex = index

				_this.type = index

				_this.curPage = 1

				_this.$router.replace({
					query: _this.merge(_this.$route.query, {
						'typeOrderIndex': index,
						'type': index
					})
				})
			},
			typeDate(index) {

				var _this = this

				_this.typeDateIndex = index

				_this.timeType = index

				_this.curPage = 1

				_this.$router.replace({
					query: _this.merge(_this.$route.query, {
						'typeDateIndex': index,
						'timeType': index
					})
				})
			},
			determine() {
				this.getOrderList()
				this.show = false
			},
			orderSearch() {
				var _this = this
				_this.$router.push({
					path: '/multi_user_mall/search'
				})
			},
			lookAllp(length, index) {
				this.orderList[index].showAll = !this.orderList[index].showAll
				this.orderList[index].showNum = this.orderList[index].showAll ? length : 10
				this.$forceUpdate()
			},
			//付款
			pay() {
				this.$router.push({
					path: '/shop/confirm'
				})
			},
			//取消订单
			cancellationOrder() {
				var _this = this
				_this.$dialog.show({
					type: 'warning',
					headMessage: '提示',
					message: '亲,您确定要取消订单？',
					buttons: ['确定', '取消'],
					canel() {

					},
					confirm() {
						_this.$vux.toast.show({
							width: '50%',
							type: 'text',
							position: 'middle',
							text: '取消成功'
						})
					}
				})
			},
			//删除订单
			deleteOrder(orderSn) {
				var _this = this
				_this.$dialog.show({
					type: 'warning',
					headMessage: '提示',
					message: '亲,您确定要删除该订单吗？',
					buttons: ['确定', '取消'],
					canel() {

					},
					confirm() {
						_this.$http.post(_this.url.order.deleteOrderByOrderSn, {
							//userId: _this.$store.state.user.userId,
							userId: 'userDev01',
							orderSn: orderSn,
						}).then((res) => {
							if(res.data.status == "00000000") {
								_this.$vux.toast.show({
									width: '50%',
									type: 'text',
									position: 'middle',
									text: '删除成功'
								})
								_this.getOrderList()
							}
						})

					}
				})
			},
			//取消订单
			cancelOrder(orderSn) {
				console.log(orderSn)
				var _this = this
				_this.$dialog.show({
					type: 'warning',
					headMessage: '提示',
					message: '亲,您确定要取消该订单？',
					buttons: ['确定', '取消'],
					canel() {

					},
					confirm() {
						_this.$http.post(_this.url.order.cancelOrderByOrderSn, {
							//userId: _this.$store.state.user.userId,
							userId: 'userDev01',
							orderSn: orderSn,
						}).then((res) => {
							if(res.data.status == "00000000") {
								_this.$vux.toast.show({
									width: '50%',
									type: 'text',
									position: 'middle',
									text: '取消成功'
								})
								_this.getOrderList()
							}
						})

					}
				})
			},
			//评价
			toEvaluate() {
				this.$router.push({
					path: '/shop/write_comments'
				})
			},
			//跳转详情
			toDetail(orderSn) {
				this.$router.push({
					path: '/shop/order_details',
					query: {
						orderSn: orderSn
					}
				})
			},
			InitScroll() {
				var _this = this
				_this.$nextTick(() => {
					if(!_this.scroll) {
						_this.scroll = new BScroll(_this.$refs.wrapper, {
							click: true,
							scrollY: true,
							useTransform: true,
							pullUpLoad: {
								threshold: -50
							},
							pullDownRefresh: {
								threshold: 30, // 下拉距离超过30px触发pullingDown事件
								stop: 20 // 回弹停留在距离顶部20px的位置
							}
						})

						//上拉加载
						_this.scroll.on('pullingUp', () => {
							_this.LoadData()

							_this.$nextTick(function() {
								_this.scroll.finishPullUp()
								_this.scroll.refresh()
							})
						})
						//下拉刷新
						_this.scroll.on('pullingDown', () => {
							_this.$nextTick(function() {
								_this.scroll.finishPullDown()
								_this.scroll.refresh()
							})
						})

						//滚动开始
						_this.scroll.on('scrollStart', () => {
							_this.move = true
							_this.huan = false
							_this.changeTip = '下拉刷新'

							if(_this.timeOut) {
								clearTimeout(_this.timeOut)
							}
						})

						//滚动开始
						_this.scroll.on('scroll', (pos) => {
							if(_this.orderList.length > 0) {
								if(pos.y > -30 && pos.y <= 80) {
									if(_this.move) {
										_this.showLoading2 = true
										if(pos.y < 0) {
											_this.changeTip = '下拉刷新'
											_this.huan = false
										} else if(pos.y >= 20) {
											_this.changeTip = '释放更新'
											_this.huan = true
										}
									}
								}
							}

						})

						//滚动结束
						_this.scroll.on('scrollEnd', (pos) => {
							if(pos.y < 0 && pos.y > -80) {
								_this.$refs.content.style.transform = 'translate(0px, 0px) scale(1) translateZ(0px)'
							}
							_this.showLoading2 = false
						})

						//手指离开
						_this.scroll.on('touchEnd', (pos) => {
							_this.move = false
							if(pos.y >= 20) {
								_this.changeTip = '加载中...'
								if(_this.orderList.length > 0) {
									_this.getOrderList(_this.orderList[0].createTime)
								}
							} else {
								_this.showLoading2 = false
							}
						})

					} else {
						_this.scroll.refresh()
					}

					_this.isLess = _this.scroll.scroller.clientHeight <= _this.scroll.scrollerHeight ? true : false
				})

			},
			LoadData() {
				var _this = this

				_this.curPage++

					_this.$http.get(_this.url.order.getOrderList, {
						params: {
							//						userId: _this.$store.state.user.userId,
							userId: 'userDev01',
							type: _this.type,
							status: _this.status,
							timeType: _this.timeType,
							pageSize: _this.pageSize,
							curPage: _this.curPage,
							keyword: _this.keyword,
							islist: true
						}
					}).then((res) => {
						if(res.data.status == "00000000") {

							if(res.data.data.list.length > 0) {

								_this.showLoading = true
								_this.showNo = false

								_this.orderList = _this.orderList.concat(res.data.data.list)

								for(var i = 0; i < _this.orderList.length; i++) {
									_this.orderList[i].showAll = false
									_this.orderList[i].showNum = 10
								}
							} else {

								_this.showLoading = false
								_this.showNo = true
								_this.$vux.toast.show({
									width: '50%',
									type: 'text',
									position: 'middle',
									text: '已经到底了'
								})

							}
						}
					})
			}
		}
	}
</script>

<style lang="less" scoped>
	.screen_box {
		padding: 0.26rem;
		padding-top: 0;
		box-sizing: border-box;
		background-color: white;
		.screen_btn {
			width: 100%;
			height: 0.7rem;
			line-height: 0.7rem;
			text-align: center;
			border-radius: 2px;
			border: 1px solid rgba(51, 111, 255, 1);
			font-size: 0.28rem;
			font-family: PingFangSC-Regular;
			color: rgba(51, 111, 255, 1);
			margin: 0 auto;
			margin-top: 0.7rem;
		}
		.type_title {
			position: relative;
			font-size: 0.28rem;
			font-family: PingFangSC-Regular;
			color: rgba(144, 162, 199, 1);
			text-align: center;
			padding: 0.2rem 0;
		}
		.type_box {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.type_item {
				width: 2.17rem;
				height: 0.66rem;
				line-height: 0.66rem;
				text-align: center;
				background: rgba(245, 246, 250, 1);
				border-radius: 2px;
				font-size: 0.24rem;
				font-family: PingFangSC-Regular;
				color: rgba(25, 37, 67, 1);
				margin: 0.1rem 0;
			}
			.blue {
				background: rgba(51, 111, 255, 1);
				color: white;
			}
		}
	}
	
	.my_order_box {
		.settingHeader~.px {
			position: fixed;
			top: 46px;
			width: 100%;
			z-index: 15;
		}
		.settingHeader~.order_list_box .wrapper {
			position: absolute;
			top: 2.8rem;
			bottom: 0;
			width: 100%;
			background: #f5f6fa;
			z-index: 11;
		}
		.px {
			position: fixed;
			top: 0;
			width: 100%;
			z-index: 15;
		}
		.search {
			height: 1rem;
			padding: 0.17rem 0.30rem;
			box-sizing: border-box;
			background-color: white;
			position: relative;
			display: flex;
			.ss_box_right {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				position: relative;
				img {
					width: 0.36rem;
					height: 0.36rem;
				}
			}
			.ss_box_right:before {
				content: " ";
				position: absolute;
				left: 0;
				top: 0.08rem;
				width: 1px;
				bottom: 0.08rem;
				border-right: 1px solid #C7C7C7;
				color: #C7C7C7;
				-webkit-transform-origin: 100% 0;
				transform-origin: 100% 0;
				-webkit-transform: scaleX(0.5);
				transform: scaleX(0.5);
			}
			.ss_box_left {
				width: 5.85rem;
				height: 0.66rem;
				border-radius: 4px;
				position: relative;
				display: flex;
				align-items: center;
				margin-right: 0.35rem;
				input {
					width: 100%;
					height: 100%;
					background: rgba(245, 246, 250, 1);
					padding-left: 0.78rem;
					box-sizing: border-box;
					font-size: 0.28rem;
					font-family: PingFangSC-Regular;
					color: rgba(144, 162, 199, 1);
				}
				img {
					width: 0.32rem;
					height: 0.32rem;
					position: absolute;
					left: 0.4rem;
					top: 50%;
					transform: translate(-50%, -50%);
				}
			}
		}
		.search:before {
			content: " ";
			position: absolute;
			left: 0;
			top: 0;
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
		.search:after {
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
		.tab_box {
			height: 0.82rem;
		}
		.order_list_box {
			.bw {
				background-color: white!important;
			}
			.wrapper {
				position: absolute;
				top: 2.02rem;
				bottom: 0;
				width: 100%;
				background: rgba(245, 246, 250, 1);
				z-index: 11;
				.h100 {
					height: 100%;
				}
				.content {
					position: relative;
					.jz-loading {
						position: absolute;
						top: -0.05%;
						width: 100%;
						height: 1rem;
						display: flex;
						align-items: center;
						justify-content: center;
						flex-direction: column;
						img {
							width: 0.5rem;
							height: auto;
						}
						p {
							font-size: 0.24rem;
							color: #7c7c7c;
							margin-top: 0.08rem;
						}
						.jiantou {
							transition: all 0.3s linear;
						}
						.r180 {
							transform: rotate(-180deg);
						}
					}
				}
				.top50 {
					padding-top: 1rem;
				}
			}
			.top02 {
				top: 0.2rem!important;
			}
			.top0 {
				top: 0rem!important;
			}
			.order_item {
				background: white;
				margin-bottom: 0.2rem;
				box-shadow: 2px 0px 20px rgba(217, 223, 240, 1);
				.order_top {
					height: 0.8rem;
					display: flex;
					justify-content: space-between;
					box-sizing: border-box;
					padding: 0.17rem 0.30rem;
					.left {
						width: 65%;
						display: flex;
						align-items: center;
						img {
							width: 0.36rem;
							height: 0.36rem;
							margin-right: 0.23rem;
						}
						p {
							font-size: 0.28rem;
							font-family: PingFangSC-Regular;
							color: rgba(26, 38, 66, 1);
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							-webkit-line-clamp: 1;
							-webkit-box-orient: vertical;
						}
						i {
							font-size: 0.5rem;
						}
					}
					.right {
						width: 35%;
						display: flex;
						align-items: center;
						justify-content: flex-end;
						font-size: 0.26rem;
						font-family: PingFangSC-Medium;
						color: rgba(51, 111, 255, 1);
					}
				}
				.order_middle {
					height: 1.70rem;
					display: flex;
					background: rgba(245, 246, 250, 1);
					position: relative;
					.left {
						width: 1.70rem;
						height: 1.70rem;
						display: flex;
						align-items: center;
						justify-content: center;
						img {
							width: 80%;
							height: auto;
						}
					}
					.middle {
						width: 3.8rem;
						padding: 0.18rem;
						box-sizing: border-box;
						.name {
							font-size: 0.24rem;
							font-family: PingFangSC-Regular;
							color: rgba(26, 38, 66, 1);
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
						}
						.pinfo {
							font-size: 0.24rem;
							font-family: PingFangSC-Regular;
							color: rgba(144, 162, 199, 1);
							margin-top: 0.05rem;
						}
					}
					.right {
						flex: 1;
						text-align: right;
						padding: 0.18rem 0.30rem 0rem 0rem;
						box-sizing: border-box;
						.price {
							font-size: 0.24rem;
							font-family: PingFangSC-Regular;
							color: rgba(26, 38, 66, 1);
						}
						.oldprice {
							text-decoration: line-through;
							font-size: 0.24rem;
							font-family: PingFangSC-Regular;
							color: rgba(144, 162, 199, 1);
							margin-top: 0.05rem;
						}
						.num {
							font-size: 0.24rem;
							font-family: PingFangSC-Regular;
							color: rgba(144, 162, 199, 1);
							margin-top: 0.05rem;
						}
					}
				}
				.m:after {
					content: " ";
					position: absolute;
					left: 0;
					bottom: 0;
					right: 0;
					height: 1px;
					border-top: 1px solid #D8DFF0;
					color: #D8DFF0;
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: scaleY(0.5);
					transform: scaleY(0.5);
					left: 0px;
				}
				.look_all_box {
					height: 0.85rem;
					background: rgba(245, 246, 250, 1);
					display: flex;
					align-items: center;
					justify-content: center;
					position: relative;
					div {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 6.18rem;
						height: 0.56rem;
						font-size: 0.24rem;
						font-family: PingFangSC-Regular;
						color: rgba(115, 134, 173, 1);
						text-align: center;
						border-radius: 2px;
						border: 1px solid rgba(144, 162, 199, 1);
						img {
							width: 0.2rem;
							height: auto;
							margin-left: 0.1rem;
							transform: rotate(-180deg)
						}
						.r {
							transform: rotate(0deg)
						}
					}
				}
				.look_all_box:before {
					content: " ";
					position: absolute;
					left: 0;
					top: 0;
					right: 0;
					height: 1px;
					border-top: 1px solid #D8DFF0;
					color: #D8DFF0;
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: scaleY(0.5);
					transform: scaleY(0.5);
					left: 0px;
				}
				.order_bottom {
					height: 0.8rem;
					padding: 0.18rem;
					box-sizing: border-box;
					display: flex;
					align-items: baseline;
					justify-content: flex-end;
					font-family: PingFangSC-Regular;
					color: rgba(26, 38, 66, 1);
					.num {
						margin-right: 0.17rem;
					}
					span {
						font-size: 0.24rem;
					}
					i {
						font-size: 0.32rem;
					}
					.yf {
						font-size: 0.20rem;
					}
				}
				.order_bth_box {
					padding: 0.18rem;
					box-sizing: border-box;
					height: 1rem;
					position: relative;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					.btn {
						display: flex;
						justify-content: flex-end;
						div {
							display: flex;
							align-items: center;
							text-align: center;
							height: 0.56rem;
							padding: 0.18rem;
							box-sizing: border-box;
							border: 1px solid rgba(144, 162, 199, 1);
							border-radius: 2px;
							margin-left: 0.53rem;
							font-size: 0.26rem;
							font-family: PingFangSC-Medium;
							color: rgba(144, 162, 199, 1);
						}
						div:last-child {
							border: 1px solid rgba(51, 111, 255, 1);
							color: rgba(51, 111, 255, 1);
						}
					}
				}
				.order_bth_box:before {
					content: " ";
					position: absolute;
					left: 0;
					top: 0;
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
		}
	}
</style>
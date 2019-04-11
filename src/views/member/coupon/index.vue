<template>
	<section class="coupon_index_box">
		<settingHeader title="我的优惠券"></settingHeader>
		<div class="tab_box couponwap">
			<div class="top">
				<div class="item" :class="{'blue':tabIndex == index}" v-for="(item,index) in tabList" :key="index" @click="tabClick(index)">
					<span>{{item.type}}</span>
					<!-- icon-shixinjiantou-copy -->
					<i :class="{'r180':item.show && tabIndex == index}" class="iconfont icon-triangledownfill"></i>
				</div>
			</div>
			<!--类型-->
			<transition name="type-classes-transition" enter-active-class="fadeInDown animated" leave-active-class="fadeOutUp animated">
				<ul class="type_box item_box" v-if="typeShow && tabIndex == 0" style="animation-duration:0.5s">
					<li v-for="(item,index) in typeList" :key="index" @click="typeClick(index,item)">
						<span>{{item.key}}</span>
						<img v-if="typeIndex == index" :src="'./static/images/s_gou.png'" />
					</li>
				</ul>
			</transition>
			<!--状态-->
			<transition name="status-classes-transition" enter-active-class="fadeInDown animated" leave-active-class="fadeOutUp animated">
				<ul class="status_box item_box" v-if="statusShow && tabIndex == 1" style="animation-duration:0.5s">
					<li v-for="(item,index) in statusList" :key="index" @click="statusClick(index,item)">
						<span>{{item.key}}</span>
						<img v-if="statusIndex == index" :src="'./static/images/s_gou.png'" />
					</li>
				</ul>
			</transition>
			<!--状态-->
			<transition name="time-classes-transition" enter-active-class="fadeInDown animated" leave-active-class="fadeOutUp animated">
				<ul class="time_box item_box" v-if="timeShow && tabIndex == 2" style="animation-duration:0.5s">
					<li v-for="(item,index) in timeList" :key="index" @click="timeClick(index,item)">
						<span>{{item.key}}</span>
						<img v-if="timeIndex == index" :src="'./static/images/s_gou.png'" />
					</li>
				</ul>
			</transition>
			<!--遮罩层-->
			<div class="masker" v-if="maskerShow" @click="maskerShow = false"></div>
		</div>

		<div class="wrapper" ref="wrapper">
			<div class="content" :class="{'pr_box':!showCoupon}">
				<div class="list_box" v-if="showCoupon">
					<div class="mb20" v-for="(item,index) in couponList" :key="index">
						<div class="item" :class="[{'red_bg':item.type == 0 || item.type == 20 || item.type == 30 || item.type == 50},{'blue_bg':item.type == 10},{'yellow_bg':item.type == 40},{'gray_bg':item.status == 2 || item.status == 3}]">
							<div class="left">
								<div class="top">
									<p class="type" v-if="item.type == 0">全部</p>
									<p class="type" v-if="item.type == 10">体验券</p>
									<p class="type" v-if="item.type == 20">满减券</p>
									<p class="type" v-if="item.type == 30">折扣券</p>
									<p class="type" v-if="item.type == 40">运费券</p>
									<p class="type" v-if="item.type == 50">现金券</p>
									<p class="mk">满<i>{{item.condition}}</i>元可用</p>
								</div>
								<div class="bottom" @click="view(index)">
									<span class="time">{{item.startTime | getDate2}} 至 {{item.endTime | getDate2}}</span>
									<span class="look_detail_btn">查看详情<img :class="{'r180':item.showAll}" :src="'./static/images/xia.png'" alt="" /></span>
								</div>
							</div>
							<div class="right">
								<p><i>￥</i>{{item.denomination}}</p>
								<div class="use" v-if="item.status == 1">立即使用</div>
								<img v-if="item.status == 2" :src="'./static/member/yishiyong.png'" />
								<img v-if="item.status == 3" :src="'./static/member/yiguoqi.png'" />
							</div>
						</div>
						<!--<transition name="custom-classes-transition" enter-active-class="fadeInDown animated" leave-active-class="fadeOutUp animated">-->
						<div class="b" v-if="item.showAll">
							{{item.content?item.content:'暂无详细说明'}}
						</div>
						<!--</transition>-->
					</div>
				</div>
				<Loading v-if="show"></Loading>
				<Nomore v-if="showNo"></Nomore>
				<Null status="zwyhq" text="暂无优惠券" v-if="!showCoupon && !inloading"></Null>
				<Null status="loading" text="加载中" v-if="!showCoupon && inloading"></Null>
			</div>
		</div>
	</section>
</template>

<script>
	import settingHeader from '@/components/setting_header'
	import BScroll from 'better-scroll'
	import Loading from '@/components/loading'
	import Nomore from '@/components/noMore'
	import Null from '@/components/null'

	export default {
		components: {
			settingHeader,
			Loading,
			Nomore,
			Null
		},
		data() {
			return {
				tabList: [{
					type: '类型',
					show: false
				}, {
					type: '状态',
					show: false
				}, {
					type: '领取时间',
					show: false
				}],
				tabIndex: 0,
				//类型
				typeIndex: 0,
				typeShow: false,
				//0 全部10体验券 20满减券 30折扣券  40运费券 50现金券
				typeList: [{
					key: '全部',
					value: 0
				}, {
					key: '体验券',
					value: 10
				}, {
					key: '满减券',
					value: 20
				}, {
					key: '折扣券',
					value: 30
				}, {
					key: '运费券',
					value: 40
				}, {
					key: '现金券',
					value: 50
				}],
				//状态
				statusIndex: 0,
				statusShow: false,
				statusList: [{
					key: '全部',
					value: 0
				}, {
					key: '未使用',
					value: 1
				}, {
					key: '已使用',
					value: 2
				}, {
					key: '已过期',
					value: 3
				}],
				//时间
				timeIndex: 0,
				timeShow: false,
				timeList: [{
					key: '领取时间',
					value: 0
				}, {
					key: '到期时间',
					value: 1
				}],
				maskerShow: false,

				//入参
				curPage: 1,
				type: 0,
				status: 0,
				timeType: 0,
				couponList: [],
				showCoupon: false,
				inloading: true,
				show: false,
				showNo: false
			}
		},
		watch: {
			//关闭遮罩层
			typeShow() {
				return this.maskerShow = this.typeShow ? true : false
			},
			statusShow() {
				return this.maskerShow = this.statusShow ? true : false
			},
			timeShow() {
				return this.maskerShow = this.timeShow ? true : false
			},
			//重置下拉列表展示
			maskerShow() {
				if(!this.maskerShow) {
					this.typeShow = false
					this.timeShow = false
					this.statusShow = false
					this.tabList[this.tabIndex].show = false
				}
			}
		},
		created() {
			this.getCouponList()
			this.InitScroll()
		},
		methods: {
			// 查看详情
			view(i) {
				let obj = this.couponList[i]
				obj.showAll = !this.couponList[i].showAll
				this.$set(this.couponList, i, obj)
			},
			//获取优惠券
			getCouponList(obj) {
				var _this = this
				_this.$http.get(_this.url.user.getUserCouponList, {
					params: {
						userId: _this.$store.state.user.userId,
						type: _this.type,
						status: _this.status,
						timeType: _this.timeType,
						curPage: 1,
						pageSize: 20,
						islist: true
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.couponList = res.data.data.list

						_this.showCoupon = res.data.data.list.length > 0 ? true : false
						_this.inloading = false

						for(var i = 0; i < _this.couponList.length; i++) {
							_this.couponList[i].showAll = false
						}
					}
				})
			},
			InitScroll() {
				this.$nextTick(() => {
					if(!this.scroll) {
						this.scroll = new BScroll(this.$refs.wrapper, {
							click: true,
							scrollY: true,
							pullUpLoad: {
								threshold: 10
							}
						})
						this.scroll.on('pullingUp', (pos) => {
							this.LoadData()
							this.$nextTick(function() {
								this.scroll.finishPullUp()
								this.scroll.refresh()
							})
						})
					} else {
						this.scroll.refresh()
					}
				})

			},
			LoadData() {
				var _this = this
				_this.curPage++
					_this.$http.get(_this.url.user.getUserCouponList, {
						params: {
							userId: _this.$store.state.user.userId,
							type: _this.type,
							status: _this.status,
							timeType: _this.timeType,
							curPage: _this.curPage,
							pageSize: 20,
							islist: true
						}
					}).then((res) => {
						if(res.data.status == '00000000') {
							var data = res.data.data
							if(data.list.length > 0) {
								_this.show = true
								_this.showNo = false
								_this.couponList = _this.couponList.concat(data.list)
							} else {
								_this.show = false
								_this.showNo = true
							}
						}
					})
			},
			//tab切换
			tabClick(index) {
				var _this = this

				this.tabIndex = index
				this.tabList.forEach((value, i) => {
					if(i != index) {
						value.show = false
						return false;
					}
				})
				this.tabList[index].show = !this.tabList[index].show

				if(index == 0) {
					this.typeShow = this.tabList[index].show
				} else if(index == 1) {
					this.statusShow = this.tabList[index].show
				} else if(index == 2) {
					this.timeShow = this.tabList[index].show
				}

				//重置null
				_this.show = false
				_this.showNo = false

				this.$forceUpdate()
			},
			//类型选择
			typeClick(index, item) {
				this.typeIndex = index
				this.type = item.value
				this.tabList[this.tabIndex].type = item.key

				this.$nextTick(function() {
					this.typeShow = false
					this.tabList[this.tabIndex].show = false
				})

				this.getCouponList()
			},
			//状态选择
			statusClick(index, item) {
				this.statusIndex = index
				this.status = item.value
				this.tabList[this.tabIndex].type = item.key

				this.$nextTick(function() {
					this.statusShow = false
					this.tabList[this.tabIndex].show = false
				})

				this.getCouponList()
			},
			//时间选择
			timeClick(index, item) {
				this.timeIndex = index
				this.timeType = item.value
				this.tabList[this.tabIndex].type = item.key

				this.$nextTick(function() {
					this.timeShow = false
					this.tabList[this.tabIndex].show = false
				})

				this.getCouponList()
			}
		}
	}
</script>
<style>
	.settingHeader+.couponwap+.wrapper {
		top: 1.9rem !important;
	}
</style>

<style lang="less" scoped>
	@import '//at.alicdn.com/t/font_912483_lcojf3qe8m.css';
	.h100 {
		height: 100%!important;
		overflow: hidden;
	}
	
	.coupon_index_box {
		.masker {
			position: fixed;
			top: 0;
			bottom: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
			z-index: 12;
		}
		.tab_box {
			.top {
				height: 0.87rem;
				display: flex;
				position: relative;
				z-index: 111;
				background-color: white;
				.item {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 0.30rem;
					font-family: PingFang-SC-Medium;
					color: rgba(51, 51, 51, 1);
					i {
						color: rgb(144, 162, 199);
						margin-left: 0.15rem;
						transition: all 0.3s linear;
					}
					.r180 {
						transform: rotate(-180deg);
					}
				}
				.blue {
					color: #336FFF;
					i {
						color: #336FFF;
					}
				}
			}
			.item_box {
				width: 100%;
				position: absolute;
				padding-left: 0.30rem;
				box-sizing: border-box;
				background-color: white;
				z-index: 15;
				li {
					height: 0.88rem;
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 0.24rem;
					font-family: PingFang-SC-Medium;
					color: rgba(51, 51, 51, 1);
					padding-right: 0.40rem;
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
			.item_box:before {
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
		.wrapper {
			position: absolute;
			top: 0.9rem;
			bottom: 0;
			overflow: hidden;
			width: 100%;
			.content {
				padding: 0rem 0.21rem;
				box-sizing: border-box;
			}
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
			.list_box {
				padding: 0.20rem 0;
				.red_bg {
					background: url(../../../../static/member/coupon_bg.png) no-repeat;
					background-size: cover;
					.type,
					.mk {
						color: #ff5365;
					}
				}
				.blue_bg {
					background: url(../../../../static/member/blue_bg.png) no-repeat;
					background-size: cover;
					.type,
					.mk {
						color: #667BDC;
					}
				}
				.yellow_bg {
					background: url(../../../../static/member/yellow_bg.png) no-repeat;
					background-size: cover;
					.type,
					.mk {
						color: #FF9600;
					}
				}
				.gray_bg {
					background: url(../../../../static/member/gray_bg.png) no-repeat;
					background-size: cover;
					.type,
					.mk,
					.time,
					.look_detail_btn,
					i,
					.right p {
						color: #90A2C7!important;
					}
				}
				.mb20 {
					margin-bottom: 0.20rem;
				}
				.b {
					width: 100%;
					padding: 0.25rem 0.44rem;
					box-sizing: border-box;
					background: rgba(255, 255, 255, 1);
					font-size: 0.24rem;
					font-family: PingFang-SC-Medium;
					color: rgba(66, 88, 132, 1);
					border-top: 1px solid #E0E9FD;
					position: relative;
					z-index: 11;
				}
				.item {
					width: 7.04rem;
					height: 1.98rem;
					display: flex;
					align-items: center;
					justify-content: space-between;
					position: relative;
					background-color: white;
					z-index: 15;
					.left {
						flex: 1;
						height: 100%;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						padding: 0.23rem 0.25rem 0.23rem 0.45rem;
						box-sizing: border-box;
						.top {
							flex: 1;
							display: flex;
							flex-direction: column;
							justify-content: center;
							.type {
								font-size: 0.30rem;
								font-family: PingFang-SC-Medium;
							}
							.mk {
								font-size: 0.24rem;
								font-family: PingFang-SC-Medium;
								i {
									font-size: 0.28rem;
									font-family: PingFang SC;
								}
							}
						}
						.bottom {
							display: flex;
							align-items: center;
							justify-content: space-between;
							.time {
								font-size: 0.24rem;
								font-family: DINOT-Regular;
								color: rgba(26, 38, 66, 1);
							}
							.look_detail_btn {
								font-size: 0.18rem;
								font-family: PingFang-SC-Medium;
								color: rgba(26, 38, 66, 1);
								img {
									width: 0.15rem;
									margin-left: 0.05rem;
								}
								.r180 {
									transform: rotate(-180deg);
								}
							}
						}
					}
					.right {
						width: 2.50rem;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						flex-direction: column;
						p {
							font-size: 0.7rem;
							font-family: PingFang-SC-Medium;
							color: rgba(255, 255, 255, 1);
							i {
								font-size: 0.39rem;
							}
						}
						div {
							width: 1.21rem;
							height: 0.45rem;
							line-height: 0.45rem;
							text-align: center;
							border: 1px solid white;
							border-radius: 23px;
							font-size: 0.22rem;
							font-family: PingFang-SC-Medium;
							color: rgba(255, 255, 255, 1);
						}
						img {
							width: 1.30rem;
							height: 0.49rem;
						}
					}
				}
			}
		}
		.top46 {
			top: 14%!important;
		}
	}
</style>
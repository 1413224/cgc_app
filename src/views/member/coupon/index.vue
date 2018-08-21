<template>
	<div class="couponindex-box">
		<settingHeader style="z-index: 750;position: relative;" :title="title"></settingHeader>
		<div class="nav">
			<div class="pr">
				<div class="area" @click="onType(0)" :class="{'blue':navIndex == 0}">
					<p>{{defaultType}}<i class="iconfont" :class="typeShang ? 'icon-shixinjiantou' : 'icon-shixinjiantou-copy'"></i></p>
				</div>
				<div class="price" @click="onStatus(1)" :class="{'blue':navIndex == 1}">
					<p>{{defaultStatus}}<i class="iconfont" :class="statusShang ? 'icon-shixinjiantou' : 'icon-shixinjiantou-copy'"></i></p>
				</div>
				<div class="type" @click="onDate(2)" :class="{'blue':navIndex == 2}">
					<p>{{defaultTime}}<i class="iconfont" :class="dateShang ? 'icon-shixinjiantou' : 'icon-shixinjiantou-copy'"></i></p>
				</div>
			</div>
			<!--筛选菜单栏-->
			<transition enter-active-class="fadeInDown animated" leave-active-class="fadeOutUp animated">
				<div class="po popupTop" v-if="typeShang" style="animation-duration:0.3s">
					<!-- 类型 -->
					<group>
						<radio title="title" v-model="par.type" :options="opType" @on-change="changeType" :selected-label-style="{color: '#336FFF'}"></radio>
					</group>
				</div>
				<div class="po popupTop" v-if="statusShang" style="animation-duration:0.3s">
					<!-- 状态 -->
					<group>
						<radio title="title" v-model="par.status" :options="opStatus" @on-change="changeStatus" :selected-label-style="{color: '#336FFF'}"></radio>
					</group>
				</div>
				<div class="po popupTop" v-if="dateShang" style="animation-duration:0.3s">
					<!-- 领取时间 -->
					<group>
						<radio title="title" v-model="par.timeType" :options="opDate" @on-change="changeDate" :selected-label-style="{color: '#336FFF'}"></radio>
					</group>
				</div>
			</transition>
			<div class="mask animated" :class="[{'maskTive':typeShang},{'maskTive':statusShang},{'maskTive':dateShang}]" @click="hide"></div>
		</div>

		<div class="couponList">
			<div class="wrapper" :class="{'top46':!$store.state.page.isWx}" ref="wrapper">
				<div class="content">

					<div class="couponlist-box" v-if="couponList.length>0">
						<div v-for="(item,index) in couponList" :key="index" class="bs" :class="{'no':item.status == 2 || item.status == 3}">
							<div class="bg">
								<div class="top">
									<div>
										<div class="one">
											<div class="type-btn" v-if="item.type == 0">满减券</div>
											<div class="type-btn" v-if="item.type == 10">体验券</div>
											<div class="type-btn" v-if="item.type == 20">满减券</div>
											<div class="type-btn" v-if="item.type == 30">折扣券</div>
											<div class="type-btn" v-if="item.type == 40">运费券</div>
											<div class="type-btn" v-if="item.type == 50">现金券</div>
											<span>{{item.name}}</span>
										</div>
										<p>使用期限：{{item.startTime | getDate2}} 至 {{item.endTime | getDate2}}</p>
									</div>
									<div class="money">
										<div>
											<span>{{item.denomination}}</span>元
											<br />
											<i>满{{item.condition}}元可用</i>
										</div>
									</div>
								</div>
								<img :src="'./static/member/used.png'" v-if="item.status == 2">
								<img :src="'./static/member/expired.png'" v-if="item.status == 3">
							</div>
							<div class="bottom" :class="{'show':item.showAll}" @click="view(index)">
								<span class="shang">{{item.content?item.content:'暂无详细说明'}}</span>
								<img :class="{'r180':item.showAll}" :src="'./static/images/xia.png'" alt="" />
							</div>
						</div>
						<Loading v-if="show"> </Loading>
						<Nomore v-if="showNo"></Nomore>
					</div>

					<!--<div v-if="couponList.length>0">
						<div v-for="(item,index) in couponList" :key="index" :style="[!item.show?mb:'']" class="roll">
							<div class="rollOne">
								<div class="right">
									<div class="top" :class="{'textColor': item.status != 1}">
										<span>{{item.name}}</span>
										<span>仅可购买服饰类/护肤类/彩妆类的部分商品</span>
									</div>
									<div class="middle">
										<div>
											<span>满{{item.condition}}元减{{item.denomination}}元</span><br>
											<span>{{item.startTime | getDate2}} - {{item.endTime | getDate2}}</span>
										</div>
										<div class="bottom" @click="view(index)">查看详情 <img :class="{'noshow':!item.show}" :src="iconImg"></div>
									</div>

								</div>
								<div class="left">
									<div class="img" :class="[{'red':item.status == 1 && item.type !=10 && item.type !=40},{'blue':item.status == 1 && item.type !=20 && item.type !=30 && item.type !=50},{'gq':item.status != 1}]"></div>

									<div v-if="item.type !=10 && item.type !=40">
										<p v-if="item.type != 30"><i>￥</i>{{item.denomination}}</p>
										<p v-else>{{item.discount}}<i>折</i></p>
									</div>
									<div v-if="item.type !=20 && item.type !=30 && item.type !=50" class="typeImg">
										<img src="../../../../static/member/type3.png" style="width:100%;" v-if="item.type == 10">
										<img src="../../../../static/member/type4.png" style="width:100%;" v-else>
									</div>

									<div class="useBtn" v-if="item.status == 1">去使用</div>

									<div v-if="item.status != 1" class="statusImg">
										<img src="../../../../static/member/expired.png" width="100%" v-if="item.status == 3">
										<img src="../../../../static/member/used.png" width="100%" v-else>
									</div>
								</div>
							</div>
							<div class="detail" v-if="item.show">
								{{item.content}}详情
							</div>
						</div>
						
					</div>-->
				</div>
			</div>
		</div>

		<section class="no_data" v-if="couponList.length == 0">
			<div class="none-data">
				<img :src="imgSrc" alt="">
				<p>暂无优惠券</p>
			</div>
		</section>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import { Tab, TabItem, Masker, Drawer, Spinner, XHeader } from 'vux'
	import settingHeader from '../../../components/setting_header'
	import Loading from '../../../components/loading'
	import Nomore from '../../../components/noMore'
	import noData from '../../../components/noData'
	export default {
		data() {
			return {
				typeActive: 0,
				twoIndex: 0,
				drawerShow: false,
				show: false,
				defaultType: "类型",
				defaultStatus: "状态",
				defaultTime: "领取时间",
				couponType: ['全部', '未使用', '已使用', '已过期'],
				twoClass: ['所有优惠券', '体验券', '满减券', '折扣券'],
				title: '我的优惠券',
				hShow: '',
				show9: false,
				showNo: false,
				showIndex: '',
				navIndex: 0,
				mb: {
					marginBottom: '0.2rem'
				},
				couponList: [],
				iconImg: './static/member/yhq-down.png',
				par: {
					type: 0,
					status: 1,
					timeType: 0
				},
				opType: [{
						key: '0',
						value: '全部'
					},
					{
						key: '10',
						value: '体验券'
					},
					{
						key: '20',
						value: '满减券'
					},
					{
						key: '30',
						value: '折扣券'
					},
					{
						key: '40',
						value: '运费券'
					},
					{
						key: '50',
						value: '现金券'
					}
				],
				typeShang: false,
				statusShang: false,
				opStatus: [{
						key: '0',
						value: '全部'
					}, {
						key: '1',
						value: '未使用'
					},
					{
						key: '2',
						value: '已使用'
					},
					{
						key: '3',
						value: '已过期'
					}
				],
				opDate: [{
						key: '0',
						value: '领取时间'
					},
					{
						key: '1',
						value: '到期时间'
					}
				],
				dateShang: false,
				imgSrc: './static/shop/network.png',
				curPage: 1,

				showAll: false,

			}
		},
		created() {
			if(this.$route.query) {
				this.par = {
					type: this.$route.query.type || 0,
					status: this.$route.query.status || 0,
					timeType: this.$route.query.timeType || 0,
					navIndex: this.$route.query.navIndex || 0
				}

				this.defaultType = this.$route.query.defaultType || '类型'
				this.defaultStatus = this.$route.query.defaultStatus || '状态'
				this.defaultTime = this.$route.query.defaultTime || '领取时间'
			}

		},
		mounted: function() {
			this.InitScroll() //初始化下拉组件
			this.getData()
		},
		methods: {
			hide() {
				this.typeShang = false
				this.statusShang = false
				this.dateShang = false
			},
			onType(index) {
				//点击类型
				this.typeShang = !this.typeShang
				this.statusShang = false
				this.dateShang = false
				this.showNo = false

				this.navIndex = index
				this.changeRouter()
			},
			changeType(value, label) {
				var _this = this

				//0 全部10体验券 20满减券 30折扣券  40运费券 50现金券
				if(label == 0) {
					_this.defaultType = '全部'
				} else if(label == 10) {
					_this.defaultType = '体验券'
				} else if(label == 20) {
					_this.defaultType = '满减券'
				} else if(label == 30) {
					_this.defaultType = '折扣券'
				} else if(label == 40) {
					_this.defaultType = '运费券'
				} else if(label == 50) {
					_this.defaultType = '现金券'
				} else {
					_this.defaultType = label
				}

				setTimeout(function() {
					_this.par.type = parseInt(value)
					_this.changeRouter(_this.par)
					_this.getCouponList(_this.par)
					_this.typeShang = false
				}, 50)
			},
			onStatus(index) {
				//点击状态
				this.statusShang = !this.statusShang
				this.typeShang = false
				this.dateShang = false
				this.showNo = false

				this.navIndex = index
				this.changeRouter()
			},
			changeStatus(value, label) {
				var _this = this

				//0 全部 1未使用 2已使用3已过期
				if(label == 0) {
					_this.defaultStatus = '全部'
				} else if(label == 1) {
					_this.defaultStatus = '未使用'
				} else if(label == 2) {
					_this.defaultStatus = '已使用'
				} else if(label == 3) {
					_this.defaultStatus = '已过期'
				} else {
					_this.defaultStatus = label
				}

				setTimeout(function() {
					_this.par.status = parseInt(value)
					_this.getCouponList(_this.par)
					_this.changeRouter(_this.par)
					_this.statusShang = false
				}, 50)
			},
			onDate(index) {
				//点击领取时间
				this.dateShang = !this.dateShang
				this.typeShang = false
				this.statusShang = false
				this.showNo = false

				this.navIndex = index
				this.changeRouter()
			},
			changeDate(value, label) {
				var _this = this

				//0 领取时间，1为到期时间
				if(label == 0) {
					_this.defaultTime = '领取时间'
				} else if(label == 1) {
					_this.defaultTime = '到期时间'
				} else {
					_this.defaultTime = label
				}

				setTimeout(function() {
					_this.par.timeType = parseInt(value);
					_this.getCouponList(_this.par)
					_this.changeRouter(_this.par)
					_this.dateShang = false;
				}, 50);
			},
			InitScroll() {
				this.$nextTick(() => {
					if(!this.scroll) {
						this.scroll = new BScroll(this.$refs.wrapper, {
							click: true,
							scrollY: true,
							pullUpLoad: {
								threshold: -30
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
							type: _this.par.type,
							status: _this.par.status,
							timeType: _this.par.timeType,
							curPage: _this.curPage,
							pageSize: 20,
							islist: true
						}
					}).then((res) => {
						if(res.data.status == '00000000') {
							var data = res.data.data
							if(data.list.length > 0) {
								_this.show = false
								_this.showNo = false
								_this.couponList = _this.couponList.concat(data.list)
								_this.addShow()
							} else {
								_this.showNo = true
							}
						}
					})
			},
			// 获取数据
			getData() {
				this.getCouponList(this.par) //全部
			},
			//获取优惠券
			getCouponList(obj) {
				var _this = this
				_this.$http.get(_this.url.user.getUserCouponList, {
					params: {
						userId: _this.$store.state.user.userId,
						type: obj.type,
						status: obj.status,
						timeType: obj.timeType,
						curPage: 1,
						pageSize: 20
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.couponList = res.data.data.list

						for(var i = 0; i < _this.couponList.length; i++) {
							_this.couponList[i].showAll = false
						}
					}
				})
			},
			// 查看详情
			view(i) {
				let obj = this.couponList[i]
				obj.showAll = !this.couponList[i].showAll
				this.$set(this.couponList, i, obj)
			},
			//修改路由
			changeRouter(par) {
				let _this = this;
				_this.$router.replace({
					query: _this.merge(_this.$route.query, {
						'type': _this.par.type,
						'status': _this.par.status,
						'timeType': _this.par.timeType,
						'navIndex': _this.navIndex,
						'defaultType': _this.defaultType,
						'defaultStatus': _this.defaultStatus,
						'defaultTime': _this.defaultTime,
					})
				})
			}
		},
		components: {
			Tab,
			TabItem,
			settingHeader,
			Drawer,
			Masker,
			Spinner,
			Loading,
			XHeader,
			Nomore,
			noData
		}
	}
</script>

<style lang="less">
	.twoClass1 {
		display: flex;
		flex-wrap: wrap;
		padding: 0.2rem 0;
		background: #F5F6FA;
		.type-item {
			width: 25%;
			padding: 0.08rem 0.25rem;
			text-align: center;
			box-sizing: border-box;
			span {
				display: inline-block;
				width: 100%;
				height: 0.5rem;
				line-height: 0.5rem;
				border-radius: 2px;
				font-size: 0.20rem;
				background: #D8DFF0;
				color: #90A2C7;
			}
			.twoActive {
				background-color: #336fff;
				color: white;
			}
		}
	}
	
	.couponindex-box {
		height: 100%;
		.vux-header .vux-header-title {
			margin: 0 40px;
		}
		.b-w {
			background-color: white;
			position: relative;
			.vux-tab-ink-bar {
				bottom: 4px!important;
			}
			.edit-btn {
				color: rgba(144, 162, 199, 1);
				img {
					width: 0.3rem;
					height: 0.3rem;
					vertical-align: middle;
				}
			}
		}
		.vux-header-left .left-arrow:before {
			border: 1px solid #222!important;
			border-width: 1px 0 0 1px!important;
		}
		.b-w:after {
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
			left: 0;
		}
		.couponList {
			.wrapper {
				position: absolute;
				top: 0.9rem;
				bottom: 0;
				overflow: hidden;
				width: 100%;
				padding: 0rem 0.21rem;
				box-sizing: border-box;
				.couponlist-box {
					padding: 0.35rem 0;
					.bs {
						box-shadow: 2px 0px 20px rgba(217, 223, 240, 1);
						margin-bottom: 0.24rem;
					}
					.bg {
						background: url(../../../assets/images/member/coupon-bg.png) no-repeat;
						background-size: cover;
						height: 2.04rem;
						display: flex;
						flex-direction: column;
						position: relative;
						overflow: hidden;
						img {
							position: absolute;
							top: -0.15rem;
							right: -0.07rem;
							width: 1.2rem;
							height: 1.2rem;
						}
						.top {
							flex: 1;
							display: flex;
							justify-content: space-between;
							align-items: center;
							padding: 0 0.40rem;
							box-sizing: border-box;
							.one {
								display: flex;
								.type-btn {
									width: 0.88rem;
									height: 0.32rem;
									background: rgba(51, 111, 255, 1);
									border-radius: 16px;
									font-size: 0.22rem;
									font-family: PingFang-SC-Medium;
									color: rgba(255, 255, 255, 1);
									display: flex;
									align-items: center;
									justify-content: center;
								}
								span:nth-child(2) {
									font-size: 0.28rem;
									font-family: PingFang-SC-Medium;
									color: rgba(26, 38, 66, 1);
									margin-left: 0.1rem;
								}
							}
							p {
								margin-top: 0.23rem;
								font-size: 0.24rem;
								font-family: PingFang-SC-Medium;
								color: rgba(26, 38, 66, 1);
							}
							.money {
								font-size: 0.24rem;
								font-family: PingFang-SC-Bold;
								color: rgba(51, 111, 255, 1);
								span {
									font-size: 0.68rem;
									color: rgba(51, 111, 255, 1);
								}
								i {
									font-size: 0.20rem;
									font-family: PingFang-SC-Medium;
									color: rgba(51, 111, 255, 1);
								}
							}
						}
					}
					.no {
						.type-btn {
							background: rgba(144, 162, 199, 1)!important;
						}
						.money {
							color: rgba(144, 162, 199, 1)!important;
							span,i {
								color: rgba(144, 162, 199, 1)!important;
							}
						}
						.top .one span:nth-child(2),
						.top p {
							color: rgba(144, 162, 199, 1)!important;
						}
					}
					.bottom {
						font-size: 0.22rem;
						font-family: PingFang-SC-Medium;
						color: rgba(144, 162, 199, 1);
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 0.25rem 0.40rem;
						background: rgb(249, 250, 255);
						box-sizing: border-box;
						.shang {
							display: inline-block;
							width: 5.84rem;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							-webkit-line-clamp: 3;
							-webkit-box-orient: vertical;
						}
						.xia {
							display: inline-block;
							width: 5.84rem;
						}
						img {
							width: 0.19rem;
							height: auto;
						}
					}
					.show {
						span {
							white-space: pre-wrap!important;
						}
					}
					.r180 {
						transform: rotate(-180deg);
					}
				}
			}
			.top46 {
				top: 11%!important;
			}
			.bgImgThree {
				/*background: url(../../../assets/images/user/rollBg4.png) no-repeat;*/
				background-size: 100% 100%;
			}
			.detail {
				margin-left: 0.13rem;
				padding: 0.27rem;
				box-sizing: border-box;
				background-color: white;
				color: rgba(66, 88, 132, 1);
				font-size: 0.24rem;
				margin-bottom: 0.2rem;
			}
			.rollOne {
				height: 2.16rem;
				background-size: 100% 100%;
				display: flex;
				background: url(../../../assets/images/member/yhq-bg.png) no-repeat;
				.left {
					width: 2.12rem;
					position: relative;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					font-family: MicrosoftYaHei;
					color: #fff;
					overflow: hidden;
					.img {
						position: absolute;
						width: 99%;
						top: 0.22rem;
						right: 0;
						background: url(../../../../static/member/yhq-redBg.png) no-repeat;
						background-size: 100% 90%;
						height: -webkit-fill-available;
					}
					.red {
						background: url(../../../../static/member/yhq-redBg.png) no-repeat;
						background-size: 100% 90%;
					}
					.blue {
						background: url(../../../../static/member/yhq-blueBg.png) no-repeat;
						background-size: 100% 90%;
					}
					.gq {
						background: url(../../../../static/member/yhq-grayBg.png) no-repeat;
						background-size: 100% 90%;
					}
					div {
						position: relative;
						z-index: 12;
					}
					p {
						font-size: 0.68rem;
						margin-bottom: 0.2rem;
						i {
							font-size: 0.39rem;
						}
					}
					.useBtn {
						position: relative;
						z-index: 12;
						width: 1.54rem;
						text-align: center;
						background: rgba(255, 255, 255, 0);
						border: 1px solid #fff;
						padding: 0.09rem 0;
						border-radius: 0.3rem;
					}
					.typeImg {
						width: 60%;
						margin: 0.2rem auto;
						text-align: center;
						margin-bottom: 0.25rem;
					}
					.statusImg {
						position: absolute;
						bottom: -0.45rem;
						right: 0%;
						width: 60%;
						height: auto;
					}
				}
				.right {
					flex: 1;
					padding: 0.15rem 0.15rem 0 0.4rem;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.top {
						height: auto;
						line-height: 0.35rem;
						margin-top: 0.29rem;
						word-wrap: break-word;
						font-size: 0.28rem;
						color: #425884;
					}
					.middle {
						width: 100%;
						position: relative;
						display: flex;
						font-size: 0.28rem;
						color: #90a2c7;
						.bottom {
							position: absolute;
							bottom: 0.05rem;
							right: 0;
							width: auto;
							flex: 1;
							font-size: 0.24rem;
							color: #425884;
							img {
								width: 15%;
								vertical-align: middle;
							}
							.noshow {
								transform: rotateX(180deg);
							}
						}
					}
					.textColor {
						color: #90a2c7;
					}
				}
			}
		}
	}
	
	.no_data {
		width: 100%;
		height: 100%;
		background: #fff;
		padding: 1.5rem 0;
		.none-data {
			text-align: center;
			width: 100%;
			padding-bottom: 0.2rem;
			img {
				width: 100%;
			}
			p {
				font-size: 0.32rem;
				color: #1A2642;
			}
		}
	}
	
	.nav {
		border-top: 1px solid #eee;
		width: 100%;
		height: .9rem;
		/*position: fixed;*/
		border-bottom: 1px solid #D8DFF0;
		position: relative;
		.pr {
			display: flex;
			align-items: center;
			background: #fff;
			position: relative;
			background-color: white;
			z-index: 750;
			height: 100%;
			div {
				flex: 1;
				display: flex;
				justify-content: center;
				p {
					font-size: 0.3rem;
					font-family: PingFang-SC-Medium;
					color: rgba(26, 38, 66, 1);
					i {
						color: #90A2C7;
					}
					img {
						width: 23%;
						margin-left: 0.05rem;
						vertical-align: middle;
					}
				}
			}
			.blue {
				p,
				i {
					color: #3670FF!important;
				}
			}
		}
		.po {
			position: relative;
			z-index: 700;
			.vux-radio-label {
				font-size: 0.28rem;
				font-family: MicrosoftYaHei;
				color: rgba(144, 162, 199, 1);
			}
		}
		.mask {
			display: none;
			position: fixed;
			top: 0.9rem;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
			opacity: 0;
			z-index: 500;
			transition: opacity 800ms;
		}
		.maskTive {
			display: block!important;
			opacity: 1!important;
		}
	}
</style>

<style lang="less">
	.popupTop {
		.vux-no-group-title,
		.weui-cells {
			margin-top: 0 !important;
		}
		.vux-no-group-title {
			padding-bottom: 0.25rem;
		}
		.weui-cells_radio {
			.weui-check:checked+.weui-icon-checked:before {
				color: #336FFF;
			}
		}
		.vux-radio-label {
			color: #424242!important;
			font-size: 0.24rem!important;
		}
		/*.weui-cell {
			padding: 0.15rem 0.3rem 0 0.45rem;
		}*/
		.vux-radio-label {
			font-size: 0.28rem;
		}
		.weui-check__label:active {
			background: #fff;
		}
		/*.weui-cell:before {
			border-top: none;
		}*/
	}
</style>
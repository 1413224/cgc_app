<template>
	<div class="card_record_box">
		<settingHeader title="企业通用卡明细"></settingHeader>
		<popup v-model="isW" :show-mask="false" position="top">
			<div class="screen-box">
				<div class="sxi">
					<div class="label" @click="lookAll" style="color: #336fff;">
						查看全部
					</div>
					<div class="label" @click="show9 = !show9">
						<span>筛选</span><img src="../../../assets/images/index/shaixuan.png" alt="" />
					</div>
				</div>
				<!--筛选菜单栏-->
				<transition enter-active-class="fadeInDown animated" leave-active-class="fadeOutUp animated">
					<div class="po" v-if="show9" style="animation-duration:0.3s">
						<div class="position-vertical-demo">
							<div class="twoClass">
								<div class="type-item" v-for="(item,index) in tyClass" :key="index">
									<span :class="{'twoActive':twoIndex == index}" @click="twoChange(index,item)">{{item.title}}</span>
								</div>
							</div>
						</div>
					</div>
				</transition>
				<div class="mask2 animated" :class="show9? 'maskTive' : ''" @click="show9 = false"></div>
			</div>
		</popup>
		<div class="wrapper" :class="[{'top46':!$store.state.page.isWx},{'b_white':list.length == 0}]" ref="wrapper">
			<div class="content">
				<div>
					<div class="top">
						<div class="bg">
							<p class="store">国美番禺万科里店</p>
							<div class="middle">
								<p>企业通用积分：</p>
								<p>348786.53</p>
							</div>
						</div>
					</div>

					<div class="screen-box">

						<div class="sxi">
							<div class="label" @click="lookAll" style="color: #336fff;">
								查看全部
							</div>
							<div class="label" @click="show8 = !show8">
								<span>筛选</span><img src="../../../assets/images/index/shaixuan.png" alt="" />
							</div>
						</div>
						<!--筛选菜单栏-->
						<transition enter-active-class="fadeInDown animated" leave-active-class="fadeOutUp animated">
							<div class="po" v-if="show8" style="animation-duration:0.3s">
								<div class="position-vertical-demo">
									<div class="twoClass">
										<div class="type-item" v-for="(item,index) in tyClass" :key="index">
											<span :class="{'twoActive':twoIndex == index}" @click="twoChange(index,item)">{{item.title}}</span>
										</div>
									</div>
								</div>
							</div>
						</transition>
						<div class="mask animated" :class="show8? 'maskTive' : ''" @click="show8 = false"></div>
					</div>
					<div v-if="list.length >0">
						<div class="list-box">
							<ul>
								<li v-for="(item,index) in list" @click="toDetail(item.balanceId)" :key="index">
									<div>
										<p>{{item.remark}}</p>
										<p>{{item.createTime | getDate}}</p>
									</div>
									<p class="red">{{item.directType == 1?'+':'-'}} {{item.balance}}</p>
								</li>
							</ul>
						</div>
						<Loading v-if="show"></Loading>
						<Nomore v-if="showNo"></Nomore>
					</div>
					<noData v-if="list.length == 0" :status="2" stateText="暂无明细"></noData>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import settingHeader from '@/components/setting_header'
	import { Popup, Sticky } from 'vux'
	import Loading from '../../../components/loading'
	import Nomore from '../../../components/noMore'
	import noData from '../../../components/noData'
	import BScroll from 'better-scroll'
	export default {
		data() {
			return {
				show8: false,
				show9: false,
				twoIndex: 0,
				typeTitle: '',
				tyClass: [{
					title: '全部列表',
					type: 1
				}, {
					title: '消费',
					type: 2
				}, {
					title: '累计充值',
					type: 3
				}, {
					title: '购物奖励',
					type: 4
				}, {
					title: '中奖奖励',
					type: 6
				}, {
					title: '分红奖励',
					type: 5
				}, {
					title: '任务奖励',
					type: 7
				}],

				type: 1,
				list: [],
				pageSize: 10,
				curPage: 1,
				show: false,
				showNo: false,
				isW: false,
			}
		},
		components: {
			settingHeader,
			Popup,
			Loading,
			Nomore,
			noData,
			Sticky
		},
		created() {
			this.getMyBalanceList()
			this.InitScroll()
		},
		watch: {
			isW() {
				if(this.isW) {
					this.show8 = false
				}
			}
		},
		methods: {
			getMyBalanceList() {
				var _this = this
				_this.$http.get(_this.url.user.getMyBalanceList, {
					params: {
						userId: _this.$store.state.user.userId,
						type: _this.type,
						curPage: _this.curPage,
						pageSize: _this.pageSize
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						if(res.data.data.list.length > 0) {
							_this.list = res.data.data.list
							console.log(_this.list)
							var length = res.data.data.list.length - 1
							_this.lastCreateTime = res.data.data.list[length].createTime
						}
					}
				})
			},
			lookAll() {
				this.type = 1
				this.twoIndex = 0
				this.curPage = 1
				this.typeTitle = '全部列表'
				this.show8 = false
				this.$router.replace({
					query: this.merge(this.$route.query, {
						'type': 1
					})
				})
				this.list = []
				this.getMyBalanceList()
			},
			toDetail(id) {
				this.$router.push({
					name: 'currencyrewarddetail',
					query: {
						id: id
					}
				})
			},
			twoChange(index, item) {
				var _this = this
				_this.twoIndex = index
				_this.type = item.type
				_this.typeTitle = item.title
				_this.show = false
				_this.showNo = false
				_this.$router.replace({
					query: _this.merge(_this.$route.query, {
						'type': item.type
					})
				})
				_this.show8 = false
				_this.show9 = false
				_this.isW = false
				_this.list = []
				_this.curPage = 1
				_this.getMyBalanceList()
			},
			InitScroll() {
				var _this = this
				this.$nextTick(() => {
					if(!this.scroll) {
						this.scroll = new BScroll(this.$refs.wrapper, {
							click: true,
							scrollY: true,
							pullUpLoad: {
								threshold: 10
							}
						})
						this.scroll.on('pullingUp', () => {
							this.LoadData()

							this.$nextTick(function() {
								this.scroll.finishPullUp()
								this.scroll.refresh()
							})
						})

						this.scroll.on('scroll', (pos) => {
							_this.isW = pos.y <= -180 ? true : false

						})
					} else {
						this.scroll.refresh()
					}
				})

			},
			LoadData() {
				var _this = this
				_this.curPage++
					_this.$http.get(_this.url.user.getMyBalanceList, {
						params: {
							userId: _this.$store.state.user.userId,
							type: _this.type,
							lastCreateTime: _this.lastCreateTime,
							pageSize: _this.pageSize,
							islist: true
						}
					}).then((res) => {
						if(res.data.status == "00000000") {
							_this.balanceInfo = res.data.data
							if(res.data.data.list.length > 0) {
								_this.list = _this.list.concat(res.data.data.list)
								var length = res.data.data.list.length - 1
								_this.lastCreateTime = res.data.data.list[length].createTime
								_this.show = true
								_this.showNo = false
							} else {
								_this.show = false
								_this.showNo = true
							}
						}
					})
			}
		},

	}
</script>
<style lang="less">
	.vux-popup-dialog {
		overflow-y: inherit!important;
	}
</style>
<style lang="less" scoped>
	.screen-box {
		height: 0.87rem;
		line-height: 0.87rem;
		position: relative;
		.sxi {
			padding: 0 0.30rem;
			box-sizing: border-box;
			position: relative;
			z-index: 750;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 0.28rem;
			background-color: white;
			.label {
				img {
					width: 0.20rem;
					height: 0.20rem;
					color: rgba(26, 38, 66, 1);
					margin-left: 0.13rem;
				}
			}
		}
		.po {
			width: 100%;
			z-index: 716;
			position: absolute;
			left: 0;
			box-sizing: border-box;
		}
		.mask,
		.mask2 {
			display: none;
			position: fixed;
			top: 3.77rem;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
			opacity: 0;
			z-index: 500;
			transition: opacity 800ms;
		}
		.mask2 {
			top: 3.35rem;
		}
		.maskTive {
			display: block!important;
			opacity: 1!important;
		}
	}
	
	.screen-box:after {
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
		z-index: 800;
	}
	
	.screen-box {
		background-color: white;
	}
	
	.position-vertical-demo {
		background: white;
		.card-demo-flex {
			display: flex;
			align-items: center;
		}
		.twoClass {
			display: flex;
			flex-wrap: wrap;
			padding: 0.2rem 0;
			.type-item {
				width: 25%;
				padding: 0.08rem 0.18rem;
				text-align: center;
				box-sizing: border-box;
				span {
					display: inline-block;
					width: 100%;
					height: 0.66rem;
					line-height: 0.66rem;
					background: rgba(245, 246, 250, 1);
					border-radius: 2px;
					font-size: 0.24rem;
					color: #1A2642;
				}
				.twoActive {
					background: #336FFF;
					color: white;
				}
			}
		}
	}
	
	.card_record_box {
		.top {
			height: 2.90rem;
			padding: 0.25rem 0.25rem 0rem;
			box-sizing: border-box;
			position: relative;
			z-index: 1115;
			background: linear-gradient(180deg, rgba(30, 37, 43, 1) 0%, rgba(33, 49, 61, 1) 100%);
			.bg {
				width: 100%;
				height: 100%;
				padding: 0.50rem 0 0.05rem 0;
				box-sizing: border-box;
				background: url(../../../../static/member/jdl.png) no-repeat;
				background-size: cover;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				text-align: center;
				position: relative;
				.tip_btn {
					width: 0.76rem;
					height: 0.40rem;
					line-height: 0.40rem;
					text-align: center;
					background: rgba(0, 0, 0, 0.3);
					border-radius: 1px;
					font-size: 0.20rem;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					text-shadow: 0px 2px 6px rgba(12, 26, 58, 0.2);
					position: absolute;
					top: 0.60rem;
					right: 0.20rem;
				}
				.store {
					width: 5.5rem;
					font-size: 0.38rem;
					font-family: PingFangSC-Light;
					font-weight: 300;
					color: rgba(255, 255, 255, 1);
					text-shadow: 0px 2px 6px rgba(12, 26, 58, 0.2);
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
				.middle {
					p:nth-child(1) {
						font-size: 0.24rem;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: rgba(255, 255, 255, 1);
						text-shadow: 0px 2px 6px rgba(12, 26, 58, 0.2);
					}
					p:nth-child(2) {
						font-size: 0.64rem;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: rgba(255, 255, 255, 1);
						text-shadow: 0px 2px 6px rgba(12, 26, 58, 0.2);
					}
				}
			}
		}
		.wrapper {
			position: absolute;
			top: 0rem;
			bottom: 0rem;
			width: 100%;
			overflow: hidden;
		}
		.top46 {
			top: 46px!important;
		}
		.b_white {
			background-color: white;
		}
		.list-box {
			padding: 0 0.30rem;
			ul>li {
				height: 1.46rem;
				display: flex;
				align-items: center;
				justify-content: space-between;
				position: relative;
				div {
					p:nth-child(1) {
						font-size: 0.28rem;
						color: rgba(26, 38, 66, 1);
						margin-bottom: 0.15rem;
					}
					p:nth-child(2) {
						font-size: 0.24rem;
						color: rgba(144, 162, 199, 1);
					}
				}
				.red {
					font-size: 0.32rem;
					color: rgba(242, 48, 48, 1);
				}
			}
			ul>li:after {
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
	}
</style>
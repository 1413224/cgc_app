<template>
	<div class="reward-box">
		<settingHeader :title="title"></settingHeader>
		<div class="h">
			<div class="top">
				<p>{{balanceInfo.totalBalance}}</p>
				<p>{{typeTitle}}</p>
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

			<div class="wrapper" ref="wrapper">
				<div class="content" :class="{'pr_box':!showList}">
					<div v-if="showList">
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
					<Null v-if="!showList && !inloading" status="zwsj" text="暂无记录"></Null>
					<Null v-if="!showList && inloading" status="loading" text="加载中"></Null>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import settingHeader from '@/components/setting_header'
	import Loading from '@/components/loading'
	import Nomore from '@/components/noMore'
	import Null from '@/components/null'
	import mainApp from '@/global/global'
	export default {
		data() {
			return {
				title: '通用积分奖励',
				show: false,
				showNo: false,
				show8: false,
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
				list: [],
				curPage: 1,
				lastCreateTime: 0,
				pageSize: 20,
				balanceInfo: {},
				type: 1,
				inloading: true,
				showList: false
			}
		},
		created() {
			this.list = []
			this.type = this.$route.query.type ? this.$route.query.type : 1
			//设置对应筛选INDEX
			if(this.$route.query.type == 3) {
				this.twoIndex = 2
				this.typeTitle = '累计充值'
			} else if(this.$route.query.type == 4) {
				this.twoIndex = 3
				this.typeTitle = '购物奖励'
			} else if(this.$route.query.type == 6) {
				this.twoIndex = 4
				this.typeTitle = '中奖奖励'
			} else if(this.$route.query.type == 5) {
				this.twoIndex = 5
				this.typeTitle = '分红奖励'
			} else if(this.$route.query.type == 7) {
				this.twoIndex = 6
				this.typeTitle = '任务奖励'
			} else if(this.$route.query.type == 1) {
				this.twoIndex = 0
				this.typeTitle = '全部列表'
			} else if(this.$route.query.type == 2) {
				this.twoIndex = 1
				this.typeTitle = '消费'
			}
			this.getMyBalanceList()
		},
		mounted() {
			this.InitScroll()
		},
		methods: {
			getMyBalanceList(type) {
				var _this = this
				_this.$http.get(_this.url.user.getMyBalanceList, {
					params: {
						userId: _this.$store.state.user.userId,
						type: _this.type,
						curPage: _this.curPage,
						pageSize: _this.pageSize,
						islist: _this.islist
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.balanceInfo = res.data.data

						_this.showList = res.data.data.list.length > 0 ? true : false
						_this.inloading = false

						console.log(_this.showList)

						if(res.data.data.list.length > 0) {
							_this.list = res.data.data.list

							var length = res.data.data.list.length - 1
							_this.lastCreateTime = res.data.data.list[length].createTime
						}
					}
				})
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
				_this.list = []
				_this.curPage = 1
				_this.getMyBalanceList()
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
		components: {
			settingHeader,
			Loading,
			Nomore,
			Null,
		}
	}
</script>

<style lang="less">
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
	
	.reward-box {
		height: 100%;
		font-family: PingFangSC-Medium;
		background-color: white;
		.h {
			height: 100%;
			position: relative;
			.wrapper {
				position: absolute;
				top: 2.87rem;
				bottom: 0rem;
				width: 100%;
				overflow: hidden;
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
			.top {
				height: 2rem;
				background: url(../../../../static/member/record-bg.png) no-repeat;
				background-size: 100% 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				color: rgba(255, 255, 255, 1);
				position: relative;
				z-index: 750;
				p:nth-child(1) {
					font-size: 0.70rem;
				}
				p:nth-child(2) {
					font-size: 0.24rem;
				}
			}
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
				.mask {
					display: none;
					position: fixed;
					top: 2.65rem;
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
	}
</style>
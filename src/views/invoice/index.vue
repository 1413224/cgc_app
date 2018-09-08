<template>
	<section class="invoice_index_box">
		<settingHeader title="我的发票"></settingHeader>
		<div class="tab_box">
			<div class="top">
				<div class="item" :class="{'blue':tabIndex == index}" v-for="(item,index) in tabList" :key="index" @click="tabClick(index)">
					<span>{{item.type}}</span>
					<i :class="{'r180':item.show && tabIndex == index}" class="iconfont icon-shixinjiantou-copy"></i>
				</div>
			</div>
			<!--type-->
			<transition name="type-classes-transition" enter-active-class="fadeInDown animated" leave-active-class="fadeOutUp animated">
				<ul class="type_box" v-if="typeShow && tabIndex == 0" style="animation-duration:0.5s">
					<li v-for="(item,index) in typeList" :key="index" @click="typeClick(index)">
						<span>{{item}}</span>
						<img v-if="typeIndex == index" :src="'./static/images/s_gou.png'" />
					</li>
				</ul>
			</transition>
			<!--time-->
			<transition name="time-classes-transition" enter-active-class="fadeInDown animated" leave-active-class="fadeOutUp animated">
				<ul class="time_box" v-if="timeShow && tabIndex == 1" style="animation-duration:0.5s">
					<li :class="{'blue':timeIndex == index}" v-for="(item,index) in timeList" :key="index" @click="timeClick(index)">
						{{item}}
					</li>
				</ul>
			</transition>
			<!--遮罩层-->
			<div class="masker" v-if="maskerShow" @click="maskerShow = false"></div>
		</div>
		<div class="wrapper" ref="wrapper" :class="[{'top46':!$store.state.page.isWx},{'bg_white':invoiceList.length == 0}]">
			<div class="content">
				<ul class="invoice_list_box" v-if="invoiceList.length > 0">
					<li class="item" v-for="(item,index) in invoiceList" :key="index" @click="toDetail()">
						<div class="top">
							<div class="yd"></div>
							<span>飞利浦官方旗舰店</span>
						</div>
						<ul class="bottom">
							<li>
								<span class="left">付款方</span>
								<span class="right">金南俊</span>
							</li>
							<li>
								<span class="left">发票金额</span>
								<span class="right">399.00</span>
							</li>
							<li>
								<span class="left">开票日期</span>
								<span class="right">2017-07-22</span>
							</li>
						</ul>
					</li>
				</ul>
				<Loading v-if="showLoading"></Loading>
				<Nomore v-if="showNomore"></Nomore>
				<noData v-if="invoiceList.length == 0" :status="0" stateText="您还没有相关发票"></noData>
			</div>
		</div>
		<div class="bottom_box">
			<div class="item">
				<img :src="'./static/images/fapiao-in.png'" />
				<span>我的发票</span>
			</div>
			<div class="item" @click="$router.push({path:'/invoice/manage'})">
				<img :src="'./static/images/ttgl.png'" />
				<span>抬头管理</span>
			</div>
		</div>
	</section>
</template>

<script>
	import settingHeader from '@/components/setting_header'
	import BScroll from 'better-scroll'

	export default {
		components: {
			settingHeader
		},
		data() {
			return {
				tabList: [{
					type: '类型',
					show: false
				}, {
					type: '时间',
					show: false
				}],
				tabIndex: 0,
				typeList: ['全部', '个人电子发票', '企业电子发票', '增值税专用发票'],
				typeIndex: 0,
				typeShow: false,
				timeList: ['全部', '7天以内', '1个月以内', '3个月以内', '6个月以内', '1年以内', '1年以前'],
				timeIndex: 0,
				timeShow: false,
				maskerShow: false,
				showLoading: false,
				showNomore: false,
				invoiceList: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
			}
		},
		watch: {
			typeShow() {
				return this.maskerShow = this.typeShow ? true : false

			},
			timeShow() {
				return this.maskerShow = this.timeShow ? true : false
			},
			maskerShow() {
				if(!this.maskerShow) {
					this.typeShow = false
					this.timeShow = false
					this.tabList[this.tabIndex].show = false
				}
			}
		},
		created() {
			this.InitScroll()
		},
		methods: {
			//跳转详情
			toDetail() {
				this.$router.push({
					path: '/invoice/detail'
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
				} else {
					this.timeShow = this.tabList[index].show
				}
				this.$forceUpdate()
			},
			//类型选择
			typeClick(index) {
				this.typeIndex = index
				this.$nextTick(function() {
					this.typeShow = false
					this.tabList[this.tabIndex].show = false
				})
			},
			//时间选择
			timeClick(index) {
				this.timeIndex = index
				this.$nextTick(function() {
					this.timeShow = false
					this.tabList[this.tabIndex].show = false
				})
			},
			//初始化滑动组件
			InitScroll() {
				this.$nextTick(() => {
					if(!this.scroll) {
						this.scroll = new BScroll(this.$refs.wrapper, {
							click: true,
							scrollY: true,
							pullUpLoad: {
								threshold: 30, // 负值是当上拉到超过低部 70px；正值是距离底部距离 时，                    
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
			//上拉加载
			LoadData() {

			},

		}
	}
</script>

<style lang="less" scoped>
	.invoice_index_box {
		.bottom_box {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			display: flex;
			height: 0.90rem;
			background-color: white;
			div {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 0.32rem;
				/*font-family: PingFang-SC-Medium;*/
				color: rgba(51, 51, 51, 1);
				img {
					width: 0.40rem;
					height: auto;
					margin-right: 0.15rem;
				}
			}
			div:nth-child(1) {
				color: #336FFF;
			}
		}
		.masker {
			position: fixed;
			top: 0;
			bottom: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
			z-index: 5;
		}
		.tab_box {
			.top {
				height: 0.87rem;
				display: flex;
				position: relative;
				z-index: 15;
				background-color: white;
				.item {
					width: 50%;
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
			.type_box {
				width: 100%;
				position: absolute;
				padding-left: 0.30rem;
				box-sizing: border-box;
				background-color: white;
				z-index: 11;
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
			.type_box:before,
			.time_box:before {
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
			.time_box {
				width: 100%;
				position: absolute;
				z-index: 11;
				background-color: white;
				padding: 0.30rem;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-wrap: wrap;
				li {
					width: 31.5%;
					height: 0.66rem;
					line-height: 0.66rem;
					text-align: center;
					background: rgba(245, 246, 250, 1);
					border-radius: 3px;
					font-size: 0.24rem;
					font-family: PingFang-SC-Medium;
					color: rgba(51, 51, 51, 1);
					margin-bottom: 0.20rem;
				}
				.blue {
					color: white;
					background-color: #336FFF;
				}
			}
		}
		.wrapper {
			position: fixed;
			top: 0.87rem;
			bottom: 0.9rem;
			width: 100%;
			overflow: hidden;
			.invoice_list_box {
				padding: 0.20rem 0.20rem 0 0.20rem;
				box-sizing: border-box;
				.item {
					height: 3.41rem;
					background: url(../../../static/images/invoice-bg.png) no-repeat;
					background-size: 100% 100%;
					padding: 0.20rem;
					box-sizing: border-box;
					.top {
						height: 0.98rem;
						display: flex;
						align-items: center;
						font-size: 0.32rem;
						/*font-family: PingFang-SC-Medium;*/
						color: rgba(51, 51, 51, 1);
						padding: 0 0.33rem;
						box-sizing: border-box;
						.yd {
							width: 0.59rem;
							height: 0.59rem;
							background: rgba(236, 105, 65, 1);
							border-radius: 50%;
							margin-right: 0.20rem;
						}
					}
					.bottom {
						height: 2.03rem;
						padding: 0.28rem 0.33rem;
						box-sizing: border-box;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						li {
							display: flex;
							align-items: center;
							justify-content: space-between;
							font-size: 0.28rem;
							/*font-family: PingFang-SC-Medium;*/
							.left {
								color: rgba(160, 160, 160, 1);
							}
							.right {
								color: rgba(51, 51, 51, 1);
							}
						}
					}
				}
			}
		}
		.top46 {
			top: 13%;
		}
		.bg_white {
			background-color: white;
		}
	}
</style>
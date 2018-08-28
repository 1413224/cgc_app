<template>
	<div class="card_box">
		<settingHeader title="企业通用卡"></settingHeader>
		<div class="wrapper" :class="[{'top46':!$store.state.page.isWx},{'b_white':cardList.length == 0}]" ref="wrapper">
			<div class="content">
				<ul class="card_list" v-if="cardList.length > 0" @click="toDetail">
					<li class="item" :class="item.bj" v-for="(item,index) in cardList" :key="index">
						<p class="store">{{item.store}}</p>
						<div class="middle">
							<p>可用企业通用积分：</p>
							<p>{{item.jf}}</p>
						</div>
						<p class="tip">注：适用于{{item.fw}}</p>
					</li>
				</ul>
				<Loading v-if="showLoading"></Loading>
				<Nomore v-if="showNomore"></Nomore>
				<noData v-if="cardList.length == 0" :status="0" stateText="暂无企业通用卡"></noData>
			</div>
		</div>
	</div>
</template>

<script>
	import { Badge } from 'vux'
	import settingHeader from '@/components/setting_header'
	import Loading from '@/components/loading'
	import Nomore from '@/components/noMore'
	import noData from '@/components/noData'
	import BScroll from 'better-scroll'
	export default {
		data() {
			return {
				showLoading: false,
				showNomore: false,
				cardList: [{
						store: '国美番禺万科里店',
						jf: '348786.53',
						fw: '广东成高成网络技术门店',
						bj: 'black'
					},
					{
						store: '国美番禺万科里店',
						jf: '348786.53',
						fw: '广东成高成网络技术门店',
						bj: 'blue'
					},
					{
						store: '国美番禺万科里店',
						jf: '348786.53',
						fw: '广东成高成网络技术门店',
						bj: 'xk'
					},
					{
						store: '国美番禺万科里店',
						jf: '348786.53',
						fw: '广东成高成网络技术门店',
						bj: 'red'
					},
					{
						store: '国美番禺万科里店',
						jf: '348786.53',
						fw: '广东成高成网络技术门店',
						bj: 'white'
					},
				]
			}
		},
		components: {
			Loading,
			Nomore,
			noData,
			settingHeader
		},
		created() {
			this.InitScroll()
		},
		mounted() {},
		methods: {
			toDetail(){
				this.$router.push({
					path:'/member/card/detail'
				})
			},
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
			LoadData() {
				var _this = this
				if(_this.cardList.length < 20) {
					_this.showLoading = true
					_this.showNomore = false
					_this.cardList = _this.cardList.concat(_this.cardList)
				} else {
					_this.showLoading = false
					_this.showNomore = true
				}
			},

		}
	}
</script>

<style lang="less" scoped>
	.card_box {
		.wrapper {
			position: absolute;
			top: 0;
			bottom: 0;
			overflow: hidden;
			width: 100%;
			box-sizing: border-box;
		}
		.b_white{
			background-color: white;
		}
		.top46 {
			top: 46px!important;
		}
		.card_list {
			width: 100%;
			padding: 0.22rem 0.25rem;
			box-sizing: border-box;
			.item {
				width: 100%;
				height: 3.94rem;
				padding: 0.50rem 0.40rem;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-bottom: 0.20rem;
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
						font-size: 0.48rem;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: rgba(255, 255, 255, 1);
						text-shadow: 0px 2px 6px rgba(12, 26, 58, 0.2);
					}
				}
				.tip {
					font-size: 0.24rem;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					text-shadow: 0px 2px 6px rgba(12, 26, 58, 0.2);
				}
			}
			.black {
				background: url(../../../../static/member/khh.png) no-repeat;
				background-size: cover;
			}
			.blue {
				background: url(../../../../static/member/jdl.png) no-repeat;
				background-size: cover;
			}
			.red {
				background: url(../../../../static/member/mlh.png) no-repeat;
				background-size: cover;
			}
			.xk {
				background: url(../../../../static/member/lsxk.png) no-repeat;
				background-size: cover;
			}
			.white {
				background: url(../../../../static/member/bsjz.png) no-repeat;
				background-size: cover;
			}
		}
	}
</style>
<template>
	<div class="evaluation_box">
		<settingHeader title="评价中心"></settingHeader>
		<div class="tab_box">
			<tab line-width="2" custom-bar-width="30px">
				<tab-item selected @on-item-click="onItemClick">待评价</tab-item>
				<tab-item @on-item-click="onItemClick">待晒单</tab-item>
				<tab-item @on-item-click="onItemClick">已评价</tab-item>
				<tab-item @on-item-click="onItemClick">服务评价</tab-item>
			</tab>
		</div>
		<div class="wrapper" ref="wrapper">
			<div class="content">
				<ul class="goods_box" v-if="tabIndex != 3">
					<li class="border_b" v-for="i in 15">
						<img :src="'http://domain.cgc999.com:8080/group1/M00/00/52/rBL0CFuDzzSAIQRwABKIpG7qn9U287.png'" alt="" />
						<p>Dove 多芬氨基酸洁面泡泡慕斯泡沫洗面奶洁面乳160ml*2</p>
						<div>去评价</div>
					</li>
				</ul>
				<ul class="stores_box" v-else>
					<li class="border_b" v-for="i in 15">
						<div class="store">
							<img :src="'./static/images/shopLogo.png'" />
							<p>Dove官方旗舰店</p>
							<i class="icon iconfont icon-arrow-right"></i>
						</div>
						<div class="goods">
							<img :src="'http://domain.cgc999.com:8080/group1/M00/00/52/rBL0CFuDzzSAIQRwABKIpG7qn9U287.png'" alt="" />
							<p>Dove 多芬氨基酸洁面泡泡慕斯泡沫洗面奶洁面乳160ml*2</p>
						</div>
						<div class="btn">
							<p>服务评价</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import settingHeader from '@/components/setting_header'
	import { Tab, TabItem } from 'vux'
	import BScroll from 'better-scroll'
	import Loading from '../../components/loading'
	import noMore from '../../components/noMore'
	import Null from '@/components/null'

	export default {
		data() {
			return {
				tabIndex: 0,
			}

		},
		components: {
			settingHeader,
			Tab,
			TabItem,
			Loading,
			noMore,
			Null,
		},
		created() {
			this.$nextTick(function() {
				this.InitScroll()
			})
		},
		mounted() {

		},
		computed: {

		},
		methods: {
			onItemClick(index) {
				this.tabIndex = index
			},
			InitScroll() {
				var _this = this
				_this.$nextTick(() => {
					if(!_this.scroll) {
						_this.scroll = new BScroll(_this.$refs.wrapper, {
							click: true,
							pullUpLoad: {
								threshold: 10
							}
						})
						_this.scroll.on('pullingUp', (pos) => {
							_this.onLoadData()
							_this.$nextTick(() => {
								_this.scroll.finishPullUp()
								_this.scroll.refresh()
							})
						})
					} else {
						_this.scroll.refresh()
					}
				})
			},
			onLoadData() {

			},
		}
	}
</script>

<style lang="less" scoped>
	.evaluation_box {
		.tab_box {
			height: 44px;
		}
		.settingHeader~.wrapper {
			top: 90px;
		}
		.wrapper {
			position: fixed;
			top: 44px;
			bottom: 0;
			width: 100%;
			overflow: hidden;
		}
		.stores_box {
			li {
				padding: 0.30rem 0.50rem;
				box-sizing: border-box;
				background-color: white;
				position: relative;
				.store {
					display: flex;
					align-items: center;
					font-size: 0.28rem;
					font-family: PingFang-SC-Medium;
					color: rgba(51, 51, 51, 1);
					img {
						width: 0.36rem;
						height: auto;
						margin-right: 0.21rem;
					}
					i {
						font-size: 0.5rem;
					}
				}
				.goods {
					display: flex;
					align-items: center;
					background-color: #F5F6FA;
					img {
						width: 1.60rem;
						height: 1.60rem;
					}
					p {
						font-size: 0.26rem;
						color: rgba(51, 51, 51, 1);
						padding: 0 0.30rem;
						box-sizing: border-box;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 3;
						-webkit-box-orient: vertical;
					}
				}
				.btn {
					text-align: right;
					margin-top: 0.20rem;
					p {
						width: 1.53rem;
						height: 0.56rem;
						line-height: 0.56rem;
						text-align: center;
						font-size: 0.24rem;
						color: #336FFF;
						border: 1px solid rgba(51, 111, 255, 1);
						border-radius: 5px;
						box-sizing: border-box;
						display: inline-block;
					}
				}
			}
		}
		.goods_box {
			background-color: white;
			li {
				height: 2.31rem;
				padding: 0.15rem 0.30rem;
				box-sizing: border-box;
				position: relative;
				display: flex;
				align-items: flex-start;
				img {
					width: 2.0rem;
					height: 2.0rem;
					margin-right: 0.20rem;
				}
				p {
					flex: 1;
					font-size: 0.28rem;
					color: rgba(51, 51, 51, 1);
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
				}
				div {
					width: 1.53rem;
					height: 0.56rem;
					line-height: 0.56rem;
					text-align: center;
					font-size: 0.24rem;
					color: #336FFF;
					border: 1px solid rgba(51, 111, 255, 1);
					border-radius: 5px;
					box-sizing: border-box;
					position: absolute;
					right: 0.30rem;
					bottom: 0.25rem;
				}
			}
		}
		.border_b:not(:last-child):after {
			content: " ";
			position: absolute;
			left: 0;
			bottom: 0;
			right: 0;
			height: 1px;
			border-top: 1px solid #E1E1E1;
			color: #E1E1E1;
			-webkit-transform-origin: 0 0;
			transform-origin: 0 0;
			-webkit-transform: scaleY(0.5);
			transform: scaleY(0.5);
			left: 0px;
		}
	}
</style>
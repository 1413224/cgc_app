<template>
	<div class="my_order_box">
		<settingHeader :title="title"></settingHeader>
		<div class="search">
			<div class="ss_box_left">
				<input type="text" placeholder="搜索商品" />
				<img :src="'./static/images/ss.png'" />
			</div>
			<div class="ss_box_right">
				<img :src="'./static/images/order_sx.png'" alt="" />
			</div>
		</div>
		<div class="tab_box">
			<tab :line-width="1" :scroll-threshold="5" custom-bar-width="30px">
				<tab-item @on-item-click="onItemClick" v-for="(item,index) in tabList" :selected="tabIndex == index" :key="index">{{item}}</tab-item>
			</tab>
		</div>
		<div class="order_list_box">
			<div class="wrapper" ref="wrapper">
				<div class="content">
					<div class="order_item" v-for="(item,index) in sList">
						<div class="order_top">
							<div class="left">
								<img :src="'./static/images/alliance2.png'" alt="" />
								<p>{{item.storeName}}</p>
								<i class="icon iconfont icon-arrow-right"></i>
							</div>
							<div class="right">
								{{item.orderStatus}}
							</div>
						</div>
						<div class="order_middle" v-for="(i,index) in item.pList" :class="{'m':item.pList.length>=1}">
							<div class="left">
								<img :src="'./static/images/cai2.png'" />
							</div>
							<div class="middle">
								<p class="name">{{i.pName}}</p>
								<p class="pinfo">{{i.pXhao}}</p>
							</div>
							<div class="right">
								<p class="price">¥ {{i.pJg}}</p>
								<p class="num">x {{i.pNum}}</p>
							</div>
						</div>
						<div class="order_bottom">
							<span class="num">共 {{item.aNum}}件</span>
							<span>合计：<i>{{item.aJg}}</i>元</span>
							<span class="yf">(含运费{{item.pyf}}) </span>
							<span> +<i>{{item.pzf}}</i>信用积分</span>
						</div>
						<div class="order_bth_box">
							<div v-if="item.pStatus == 4">评价</div>
							<div v-if="item.pStatus == 3">提醒发货</div>
							<div v-if="item.pStatus == 2">取货码</div>
							<div v-if="item.pStatus == 1">确认收货</div>
							<div v-if="item.pStatus == 0">付款</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import settingHeader from '../../components/setting_header'
	import BScroll from 'better-scroll'
	import Loading from '../../components/loading'
	import noMore from '../../components/noMore'
	export default {
		data() {
			return {
				title: '我的订单',
				tabList: ['全部', '待付款', '待完成', '已完成', '已取消'],
				tabIndex: 0,
				btnList: ['评价', '提醒发货', '取货码', '确认收货', '付款'],
				sList: [{
					logo: './static/images/ss.png',
					storeName: '妍小姐韩国中国区广州市番禺天安门店102号',
					orderStatus: '等待买家付款',
					aNum: 1,
					aJg: '120',
					pyf: 10,
					pzf: 1000,
					pStatus: 0,
					pList: [{
						pLogo: './static/images/ss.png',
						pName: '回力凉鞋男沙滩鞋休闲鞋夏季男士两用凉拖鞋 耐磨露趾软底爸爸凉鞋 黑色 41',
						pXhao: '颜色:蓝色；尺码:L/170修身',
						pNum: 1,
						pJg: '120',
						pType: 0
					}]
				}, {
					logo: './static/images/ss.png',
					storeName: '妍小姐韩国中国区广州市番禺天安门店102号',
					orderStatus: '等待买家付款',
					aNum: 1,
					aJg: '120',
					pyf: 10,
					pzf: 1000,
					pStatus: 0,
					pList: [{
						pLogo: './static/images/ss.png',
						pName: '回力凉鞋男沙滩鞋休闲鞋夏季男士两用凉拖鞋 耐磨露趾软底爸爸凉鞋 黑色 41',
						pXhao: '颜色:蓝色；尺码:L/170修身',
						pNum: 1,
						pJg: '120',
						pType: 0
					}, {
						pLogo: './static/images/ss.png',
						pName: '回力凉鞋男沙滩鞋休闲鞋夏季男士两用凉拖鞋 耐磨露趾软底爸爸凉鞋 黑色 41',
						pXhao: '颜色:蓝色；尺码:L/170修身',
						pNum: 1,
						pJg: '120',
						pType: 0
					}]
				}, ]
			}
		},
		components: {
			settingHeader,
			Loading,
			noMore,
			BScroll
		},
		created() {
			this.InitScroll()
		},
		mounted() {},
		methods: {
			onItemClick(index) {

				var _this = this

				_this.tabIndex = index
				_this.$router.replace({
					query: _this.merge(_this.$route.query, {
						'tabIndex': index
					})
				})
			},
			InitScroll() {
				this.$nextTick(() => {
					if(!this.scroll) {
						this.scroll = new BScroll(this.$refs.wrapper, {
							click: true,
							scrollY: true,
							pullUpLoad: {
								threshold: -50
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

			}
		}
	}
</script>

<style lang="less" scoped>
	.my_order_box {
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
				top: 0.05rem;
				width: 1px;
				bottom: 0.05rem;
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
					left: 0.26rem;
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
			margin-bottom: 0.2rem;
		}
		.order_list_box {
			.order_item {
				background: white;
				margin-bottom: 0.2rem;
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
						}
						p {
							margin-left: 0.23rem;
							font-size: 0.28rem;
							font-family: PingFangSC-Regular;
							color: rgba(26, 38, 66, 1);
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
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
						width: 3.5rem;
						padding: 0.18rem;
						box-sizing: border-box;
						.name {
							font-size: 0.24rem;
							font-family: PingFangSC-Medium;
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
				.m:last-child:after{
					border-top: none!important;
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
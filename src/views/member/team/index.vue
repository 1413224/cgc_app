<template>
	<div class="team-box">
		<settingHeader :title="title"></settingHeader>
		<div class="pr-box">
			<div class="top">
				<div class="middle">
					<p>{{totalNums}}</p>
					<p>合伙人</p>
				</div>
				<div class="right" @click="toQrcode" v-if="list.length > 0">
					<img src="../../../assets/images/member/yq@2x.png" />
					<span>我要邀请</span>
				</div>
			</div>

			<div class="list-box">
				<div class="scroll-box">
					<div class="wrapper" ref="wrapper">
						<div class="content">
							<div v-if="list.length>0">
								<div class="list" v-for="(item,index) in list" :key="index">
									<div class="he">
										<div class="user-img">
											<img v-if="item.avatar" :src="item.avatar.original" />
											<img v-else :src="'./static/images/mrtx.png'" />
										</div>
										<div class="user-text">
											<p v-if="item.mobile">手机号码：{{item.mobile}}</p>
											<p v-else>名称：{{item.nickname?item.nickname:'未设置'}}</p>
											<p>加入时间：{{item.registerTime | getDate}}</p>
										</div>
									</div>
									<div class="footer">
										<grid class="footer-item">
											<grid-item>
												<p>订单数</p>
												<p>{{item.orderSum}}</p>
											</grid-item>
											<grid-item>
												<p>消费额</p>
												<p>{{item.orderPrice}}</p>
											</grid-item>
										</grid>
									</div>
								</div>
								<Loading v-if="show"></Loading>
								<Nomore v-if="showNo"></Nomore>
							</div>
							<div class="null-box" v-else>
								<img src="../../../assets/images/index/null-data.png" alt="" />
								<p>暂无伙伴</p>
								<div @click="toQrcode" class="add-btn">我要邀请</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Grid, GridItem } from 'vux'
	import settingHeader from '../../../components/setting_header'
	import Loading from '../../../components/loading'
	import noData from '../../../components/noData'
	import Nomore from '../../../components/noMore'
	import BScroll from 'better-scroll'
	export default {
		data() {
			return {
				title: '我的团队',
				show: false, //是否显示loading
				showNo: false, //是否显示没有更多
				isload: false, //是否上拉加载
				totalNums: 0,
				list: [],
				pageSize: 20,
				curPage: 1,
				userInfo: {}
			}
		},
		created() {
			this.getMyTeam()
			this.userInfo = this.$store.state.page.userInfo
		},
		mounted() {
			this.InitScroll()
		},
		methods: {
			//获取我的团队
			getMyTeam() {
				var _this = this
				_this.$http.get(_this.url.user.getMyTeam, {
					params: {
						userId: _this.$store.state.user.userId,
						curPage: _this.curPage,
						pageSize: _this.pageSize
					}
				}).then((res) => {
					if(res.data.status == '00000000') {
						_this.totalNums = res.data.data.totalNums
						_this.list = res.data.data.list
					}
				})
			},
			//跳转我的赚钱码页面
			toQrcode() {
				var _this = this
				_this.$router.push({
					path: '/member/purse/qrcode',
					query: {
						index: 1
					}
				})
			},
			//上拉加载
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
							this.showloading = true;
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
			//加载更多
			LoadData() {
				var _this = this
				_this.curPage++
					_this.$http.get(_this.url.user.getMyTeam, {
						params: {
							userId: _this.$store.state.user.userId,
							curPage: _this.curPage,
							pageSize: _this.pageSize,
							islist: true
						}
					}).then((res) => {
						if(res.data.status == '00000000') {
							if(res.data.data.list.length > 0) {
								_this.list = _this.list.concat(res.data.data.list)
								_this.show = true
								_this.showNo = false
							} else {
								_this.show = false
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
		},
		components: {
			settingHeader,
			Grid,
			GridItem,
			Loading,
			noData,
			Nomore
		}
	}
</script>

<style lang="less" scoped>
	.team-box {
		background: #F5F6FA;
		height: 100%;
		.pr-box {
			position: relative;
			height: 100%;
			.list-box {
				position: absolute;
				top: 1.98rem;
				bottom: 0;
				width: 100%;
				z-index: 11;
				.scroll-box {
					position: relative;
					height: 100%;
					.wrapper {
						position: absolute;
						top: 0;
						bottom: 0;
						width: 100%;
						.content {
							height: 100%;
						}
					}
					.null-box {
						position: relative;
						height: 100%;
						text-align: center;
						background: white;
						img {
							width: auto;
							height: 4.12rem;
						}
						p {
							font-size: 0.32rem;
							font-family: PingFangSC-Medium;
							color: rgba(26, 38, 66, 1);
						}
						.add-btn {
							width: 6.18rem;
							height: 0.88rem;
							line-height: 0.88rem;
							color: white;
							background: rgba(51, 111, 255, 1);
							border-radius: 4px;
							margin: 1.91rem auto;
						}
					}
				}
			}
		}
	}
	
	.top {
		z-index: 15;
		height: 1.98rem;
		position: relative;
		background-image: linear-gradient(-238deg, #5EC3FF 0%, #106FE3 100%);
		.middle {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			p:nth-child(1) {
				font-family: PingFangSC-Medium;
				font-size: 0.74rem;
				color: #FFFFFF;
				letter-spacing: 0;
				text-align: center;
			}
			p:nth-child(2) {}
			font-family: PingFangSC-Regular;
			font-size: 0.24rem;
			color: #FFFFFF;
			letter-spacing: 0;
			text-align: center;
		}
		.right {
			position: absolute;
			top: 0.21rem;
			right: 0.41rem;
			img {
				width: 0.24rem;
				height: 0.24rem;
				margin-right: 0.07rem;
				vertical-align: middle;
			}
			span {
				font-family: PingFangSC-Regular;
				font-size: 0.24rem;
				color: #FFFFFF;
				letter-spacing: 0;
			}
		}
	}
	
	.list {
		margin-bottom: 0.21rem;
		background: white;
		.he {
			display: flex;
			padding: 0.35rem 0.29rem;
			align-items: center;
			.user-img {
				width: 1.39rem;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				img {
					width: 0.9rem;
					height: auto;
					border-radius: 50%;
				}
			}
			.user-text {
				p:nth-child(1) {
					font-family: PingFangSC-Regular;
					font-size: 0.28rem;
					color: #1A2642;
					letter-spacing: 0;
				}
				p:nth-child(2),
				p:nth-child(3) {
					font-family: PingFangSC-Regular;
					font-size: 0.24rem;
					color: #90A2C7;
					letter-spacing: 0;
				}
			}
		}
		.footer {
			height: 1.3rem;
			.footer-item {
				height: 100%;
				.weui-grid {
					padding: 0;
					height: 100%;
					padding: 0.23rem 0.3rem;
					font-family: PingFangSC-Medium;
					letter-spacing: 0;
					font-size: 0.28rem;
					text-align: center;
					p:nth-child(1) {
						color: #90A2C7;
					}
					p:nth-child(2) {
						color: #1A2642;
						margin-top: 0.05rem;
					}
				}
			}
		}
	}
</style>
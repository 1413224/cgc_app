<template>
	<div class="profit-box">
		<settingHeader :title="title"></settingHeader>
		<div class="top">
			<div>日期</div>
			<div>收入</div>
		</div>
		<div class="wrapper" ref="wrapper" :class="{'h':isWx == false}">
			<div class="content">
				<div class="log-list" v-if="showList">
					<ul>
						<li v-for="item in list">
							<p>{{item.dayTime | getDate}}</p>
							<p>+ {{item.totalBalance}}</p>
						</li>
					</ul>
				</div>
				<Loading v-if="show"></Loading>
				<Nomore v-if="showNo"></Nomore>
				<noData v-if="!showList" :status="2" stateText="暂无收益记录"></noData>
				<noData v-if="list.length == 0 && inloading" :status="2" stateText="努力加载中..."></noData>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import { Datetime } from 'vux'
	import settingHeader from '../../../components/setting_header'
	import Loading from '../../../components/loading'
	import Nomore from '../../../components/noMore'
	import noData from '../../../components/noData'
	export default {
		data() {
			return {
				title: '累计收益',
				show: false,
				showNo: false,
				isWx: true,
				type: 0,
				curPage: 1,
				pageSize: 20,
				list: []
			}
		},
		created() {
			//判断是否微信端
			var ua = navigator.userAgent.toLowerCase()
			var isWeixin = ua.indexOf('micromessenger') != -1
			if(isWeixin) {
				this.isWx = true
			} else {
				this.isWx = false
			}

			this.getDayBalanceList()
		},
		mounted() {
			this.InitScroll()
		},
		methods: {
			getDayBalanceList() {
				var _this = this
				_this.$http.get(_this.url.user.getDayBalanceList, {
					params: {
						userId: _this.$store.state.user.userId,
						type: _this.type,
						curPage: _this.curPage,
						pageSize: _this.pageSize
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.list = res.data.data.list
						_this.showList = res.data.data.list.length > 0 ? true : false
						_this.inloading = false
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
								threshold: -50, // 负值是当上拉到超过低部 70px；正值是距离底部距离 时，                    
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
					_this.$http.get(_this.url.user.getDayBalanceList, {
						params: {
							userId: _this.$store.state.user.userId,
							type: _this.type,
							curPage: _this.curPage,
							pageSize: _this.pageSize,
							islist: true
						}
					}).then((res) => {
						if(res.data.status == "00000000") {
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
			Loading,
			Nomore,
			noData
		},
	}
</script>
<style lang="less">
	.profit-box {
		font-size: 0.24rem;
		.top {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 37.5px;
			color: rgba(144, 162, 199, 1);
			position: relative;
			padding: 0 0.33rem;
			box-sizing: border-box;
			z-index: 15;
			background-color: white;
			font-size: 0.30rem;
		}
		.top:before {
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
		.wrapper {
			position: fixed;
			top: 37.5px;
			bottom: 0;
			width: 100%;
			max-width: 640px;
			z-index: 11;
			background-color: white;
		}
		.h {
			top: 83.5px!important;
		}
		.log-list {
			ul>li {
				height: 0.98rem;
				padding: 0 0.33rem;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: space-between;
				position: relative;
				font-size: 0.30rem;
			}
			ul>li:before {
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
</style>
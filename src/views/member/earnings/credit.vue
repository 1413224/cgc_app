<template>
	<div class="credit-box">
		<settingHeader :title="title"></settingHeader>
		<div class="top" @click="toCreditReward('通用积分',1)">
			<p>{{fundInfo.availablePoints}}</p>
			<p>当前信用积分</p>
		</div>
		<div class="g-list">
			<group :gutter='0' class="b-no">
				<cell class="item" primary="content" is-link @click.native="toCreditReward('信用积分',1)">
					<div class="left">
						<p>累计信用积分</p>
						<p>{{fundInfo.totalPoints}}</p>
					</div>
				</cell>
			</group>
		</div>
		<div class="bottom">
			<div class="title">
				<div>积分来源</div>
				<!-- <div @click="$router.push({path:'/member/benefits/index'})">积分攻略<img :src="thao" alt="" /></div> -->
			</div>
			<!--<div class="b-list">
				<group :gutter='0'>
					<cell class="item" primary="content" is-link @click.native="toCreditReward('信用积分',3)">
						<div class="left">
							<img :src="'./static/member/czjl.png'" alt="" />
							<div>
								<p>充值奖励</p>
								<p>累计奖励：{{fundInfo.rechargePoints}}</p>
							</div>
						</div>
					</cell>
					<cell class="item" primary="content" is-link @click.native="toCreditReward('信用积分',4)">
						<div class="left">
							<img :src="'./static/member/xfjl.png'" alt="" />
							<div>
								<p>购物奖励</p>
								<p>累计奖励：{{fundInfo.cashbackPoints}}</p>
							</div>
						</div>
					</cell>
					<cell class="item" primary="content" is-link @click.native="toCreditReward('信用积分',6)">
						<div class="left">
							<img :src="'./static/member/zjjl.png'" alt="" />
							<div>
								<p>中奖奖励</p>
								<p>累计奖励：{{fundInfo.lotteryPoints}}</p>
							</div>
						</div>
					</cell>
					<cell class="item" primary="content" is-link @click.native="toCreditReward('信用积分',5)">
						<div class="left">
							<img :src="'./static/member/tjjl.png'" alt="" />
							<div>
								<p>推荐用户</p>
								<p>累计奖励：{{fundInfo.recommendPoints}}</p>
							</div>
						</div>
					</cell>
					<cell class="item" primary="content" is-link @click.native="toCreditReward('信用积分',7)">
						<div class="left">
							<img :src="'./static/member/rwjl2.png'" alt="" />
							<div>
								<p>任务奖励</p>
								<p>累计奖励：{{fundInfo.taskPoints}}</p>
							</div>
						</div>
					</cell>
				</group>
			</div>-->
			<div class="jl_list">
				<div class="item_box" @click="toCreditReward('信用积分',3)">
					<div class="left">
						<img style="width:0.37rem;height: 0.28rem;" :src="'./static/member/jl_1.png'" />
						<div>
							<p>充值奖励</p>
							<p>{{fundInfo.rechargePoints}}</p>
						</div>
					</div>
					<img class="right_img" :src="'./static/images/b-right.png'" />
				</div>
				<div class="item_box"  @click="toCreditReward('信用积分',4)">
					<div class="left">
						<img style="width:0.37rem;height: 0.37rem;" :src="'./static/member/jl_2.png'" />
						<div>
							<p>购物奖励</p>
							<p>{{fundInfo.cashbackPoints}}</p>
						</div>
					</div>
					<img class="right_img" :src="'./static/images/b-right.png'" />
				</div>
				<div class="item_box"  @click="toCreditReward('信用积分',5)">
					<div class="left">
						<img style="width: 0.3rem;height: 0.45rem;" :src="'./static/member/jl_3.png'" />
						<div>
							<p>推荐用户</p>
							<p>{{fundInfo.recommendPoints}}</p>
						</div>
					</div>
					<img class="right_img" :src="'./static/images/b-right.png'" />
				</div>
				<div class="item_box"  @click="toCreditReward('信用积分',6)">
					<div class="left">
						<img style="width: 0.38rem;height: 0.36rem;" :src="'./static/member/jl_7.png'" />
						<div>
							<p>中奖奖励</p>
							<p>{{fundInfo.lotteryPoints}}</p>
						</div>
					</div>
					<img class="right_img" :src="'./static/images/b-right.png'" />
				</div>
				<div class="item_box"  @click="toCreditReward('信用积分',7)">
					<div class="left">
						<img style="width: 0.38rem;height: 0.36rem;" :src="'./static/member/jl_7.png'" />
						<div>
							<p>任务奖励</p>
							<p>{{fundInfo.taskPoints}}</p>
						</div>
					</div>
					<img class="right_img" :src="'./static/images/b-right.png'" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import settingHeader from '../../../components/setting_header'
	export default {
		data() {
			return {
				title: '信用积分',
				thao: './static/member/thao.png',
				fundInfo: {}
			}
		},
		created() {
			this.getFundInfo()
		},
		mounted() {},
		methods: {
			getFundInfo() {
				var _this = this
				_this.$http.get(_this.url.user.getFundInfo, {
					params: {
						userId: _this.$store.state.user.userId
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.fundInfo = res.data.data
					}
				})
			},
			//跳转信用积分
			toCreditReward(title, type) {
				this.$router.push({
					name: 'creditreward',
					query: {
						title: title,
						type: type
					}
				})
			}
		},
		components: {
			settingHeader,
		}
	}
</script>
<style lang="less">
	.credit-box {
		font-family: PingFangSC-Medium;
		.top {
			height: 3.2rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			background: url(../../../assets/images/member/score_group.png) no-repeat;
			background-size: 100% 100%;
			color: rgba(255, 255, 255, 1);
			p:nth-child(1) {
				font-size: 0.7rem;
			}
			p:nth-child(2) {
				font-size: 0.24rem;
			}
		}
		.jl_list {
			.item_box {
				height: 1.80rem;
				display: flex;
				align-items: center;
				justify-content: space-between;
				background-color: white;
				padding: 0 0.33rem;
				box-sizing: border-box;
				position: relative;
				.left {
					display: flex;
					div {
						margin-left: 0.38rem;
						img{
							margin-top: 0.06rem;
						}
						p:nth-child(1) {
							font-size: 0.28rem;
							font-family: PingFangSC-Medium;
							color: rgba(26, 38, 66, 1);
						}
						p:nth-child(2) {
							font-size: 0.24rem;
							font-family: PingFangSC-Medium;
							color: rgba(144, 162, 199, 1);
							margin-top: 0.10rem;
						}
					}
				}
				.right_img {
					width: 0.25rem;
					height: auto;
				}
			}
			.item_box:after {
				content: " ";
				position: absolute;
				left: 0;
				top: 0;
				right: 0;
				height: 1px;
				border-top: 1px solid #D8DFF0;
				color: #D8DFF0;
				-webkit-transform-origin: 0 0;
				transform-origin: 0 0;
				-webkit-transform: scaleY(0.5);
				transform: scaleY(0.5);
				left: 0px;
				z-index: 800;
			}
		}
		.bottom {
			margin-top: 0.2rem;
			/*padding-bottom: 0.2rem;*/
			.title {
				padding: 0 15px;
				height: 0.9rem;
				background-color: white;
				display: flex;
				align-items: center;
				justify-content: space-between;
				div:nth-child(2) {
					display: flex;
					align-items: center;
					color: rgba(115, 134, 173, 1);
					img {
						width: 0.25rem;
						height: 0.25rem;
						margin-left: 0.12rem;
					}
				}
			}
			.b-list {
				.item {
					.left {
						display: flex;
						img {
							width: 1rem;
							height: 1rem;
							margin-right: 0.3rem;
						}
						div {
							text-align: left;
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							padding: 0.05rem 0;
							p:nth-child(1) {
								font-size: 0.28rem;
								color: rgba(26, 38, 66, 1);
							}
							P:nth-child(2) {
								font-size: 0.26rem;
								color: rgba(115, 134, 173, 1);
							}
						}
					}
				}
			}
		}
		.g-list {
			.item {
				.left {
					text-align: left;
					p:nth-child(1) {
						font-size: 0.28rem;
						color: rgba(115, 134, 173, 1);
					}
					P:nth-child(2) {
						font-size: 0.48rem;
						color: rgba(26, 38, 66, 1);
					}
				}
			}
			.weui-cells:after {
				border-bottom: none!important;
			}
		}
	}
</style>
<template>
	<div class="currency-box">
		<settingHeader :title="title"></settingHeader>
		<div class="top" @click="toCurrencyReward('通用积分',1)">
			<p>{{fundInfo.balance}}</p>
			<p>当前通用积分</p>
		</div>
		<div class="item-box" @click="$router.push({path:'/member/earnings/profit'})">
			<div>
				<p>累计收益</p>
				<p>{{fundInfo.income}}</p>
			</div>
			<img :src="'./static/images/b-right.png'" />
		</div>

		<div class="bottom">
			<div class="title">
				<div>积分来源</div>
				<div @click="$router.push({path:'/member/benefits/index'})">积分攻略<img :src="thao" alt="" /></div>
			</div>
			<!--<div class="b-list" v-if="1>2">
				<group :gutter='0'>
					<cell class="item" primary="content" is-link @click.native="toCurrencyReward('通用积分',3)">
						<div class="left">
							<img  :src="'./static/member/czjl.png'" alt="" />
							<div>
								<p>累计充值</p>
								<p>累计奖励：{{fundInfo.recharge}}</p>
							</div>
						</div>
					</cell>
					<cell class="item" primary="content" is-link @click.native="toCurrencyReward('通用积分',4)">
						<div class="left">
							<img :src="'./static/member/gwjl.png'" alt="" />
							<div>
								<p>购物奖励</p>
								<p>累计奖励：{{fundInfo.cashback}}</p>
							</div>
						</div>
					</cell>
					<cell class="item" primary="content" is-link @click.native="toCurrencyReward('通用积分',6)">
						<div class="left">
							<img :src="'./static/member/zjjl.png'" alt="" />
							<div>
								<p>中奖奖励</p>
								<p>累计奖励：{{fundInfo.lottery}}</p>
							</div>
						</div>
					</cell>
					<cell class="item" primary="content" is-link @click.native="toCurrencyReward('通用积分',5)">
						<div class="left">
							<img :src="'./static/member/fhjl.png'" alt="" />
							<div>
								<p>分红奖励</p>
								<p>累计奖励：{{fundInfo.commission}}</p>
							</div>
						</div>
					</cell>
					<cell class="item" primary="content" is-link @click.native="toCurrencyReward('通用积分',7)">
						<div class="left">
							<img :src="'./static/member/rwjl.png'" alt="" />
							<div>
								<p>任务奖励</p>
								<p>累计奖励：{{fundInfo.taskBalance}}</p>
							</div>
						</div>
					</cell>
				</group>
			</div>-->
			<div class="jl_list">
				<div class="item_box" @click="toCurrencyReward('通用积分',3)">
					<div class="left">
						<img style="height: 0.28rem;" :src="'./static/member/jl_1.png'" />
						<div>
							<p>累计充值</p>
							<p>{{fundInfo.recharge}}</p>
						</div>
					</div>
					<img class="right_img" :src="'./static/images/b-right.png'" />
				</div>
				<div class="item_box" @click="toCurrencyReward('通用积分',4)">
					<div class="left">
						<img style="height: 0.37rem;" :src="'./static/member/jl_2.png'" />
						<div>
							<p>购物奖励</p>
							<p>{{fundInfo.cashback}}</p>
						</div>
					</div>
					<img class="right_img" :src="'./static/images/b-right.png'" />
				</div>
				<div class="item_box" @click="toCurrencyReward('通用积分',5)">
					<div class="left">
						<img style="width: 0.30rem;height: 0.45rem;" :src="'./static/member/jl_3.png'" />
						<div>
							<p>分红奖励</p>
							<p>{{fundInfo.commission}}</p>
						</div>
					</div>
					<img class="right_img" :src="'./static/images/b-right.png'" />
				</div>
				<div class="item_box" @click="toCurrencyReward('通用积分',7)">
					<div class="left">
						<img style="height: 0.37rem;" :src="'./static/member/jl_4.png'" />
						<div>
							<p>任务奖励</p>
							<p>{{fundInfo.taskBalance}}</p>
						</div>
					</div>
					<img class="right_img" :src="'./static/images/b-right.png'" />
				</div>
				<div class="item_box" @click="toCurrencyReward('通用积分',6)">
					<div class="left">
						<img style="height: 0.39rem;" :src="'./static/member/jl_5.png'" />
						<div>
							<p>中奖奖励</p>
							<p>{{fundInfo.lottery}}</p>
						</div>
					</div>
					<img class="right_img" :src="'./static/images/b-right.png'" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Cell, Group } from 'vux'
	import settingHeader from '../../../components/setting_header'
	export default {
		data() {
			return {
				title: '通用积分',
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
			//跳转通用积分
			toCurrencyReward(title, type) {
				this.$router.push({
					name: 'currencyreward',
					query: {
						title: title,
						type: type
					}
				})
			}
		},
		components: {
			settingHeader,
			Cell,
			Group,
		}
	}
</script>
<style lang="less">
	.currency-box {
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
		.item-box {
			height: 1.57rem;
			background-color: white;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 0.33rem;
			box-sizing: border-box;
			img {
				width: 0.25rem;
			}
			div {
				p:nth-child(1) {
					font-size: 0.28rem;
					font-family: PingFangSC-Medium;
					color: rgba(115, 134, 173, 1);
				}
				p:nth-child(2) {
					font-size: 0.48rem;
					font-family: PingFangSC-Medium;
					color: rgba(26, 38, 66, 1);
				}
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
					img {
						width: 0.37rem;
						margin-top: 0.06rem;
					}
					div {
						margin-left: 0.38rem;
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
				padding: 0 0.33rem;
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
						vertical-align: middle;
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
					display: flex;
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
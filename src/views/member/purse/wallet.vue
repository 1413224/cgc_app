<template>
	<div class="wallet-box">
		<settingHeader class="wallet-header" :title="title"></settingHeader>
		<div class="w_bg">
			<div class="top-item">
				<div class="left">
					<img class="tx" slot="icon" :src="userImg?userImg:'./static/images/mrtx.png'">
					<div class="one" @click="$router.push({path:'/member/earnings/profit'})">
						<p>{{fundInfo.nickname?fundInfo.nickname:'未设置'}}</p>
						<div class="shouyi_box">
							<img :src="'./static/member/shouyi.png'" />
							<p>累计收益 {{fundInfo.income}}</p>
							<!--<i class="icon iconfont icon-arrow-right "></i>-->
						</div>
					</div>
					<div class="use" @click="$router.push({path:'/shop'})">
						<div class="use_btn">使用积分
							<i class="icon iconfont icon-arrow-right"></i>
						</div>
					</div>
				</div>
			</div>
		</div>
		<group :gutter='0' class="bno" v-if="1>2">
			<cell class="top-item" primary="content" is-link>
				<div class="left">
					<img class="tx" slot="icon" :src="userImg?userImg:'./static/images/mrtx.png'">
					<div class="one" @click="$router.push({path:'/member/earnings/profit'})">
						<p>{{fundInfo.nickname?fundInfo.nickname:'未设置'}}</p>
						<div class="shouyi_box">
							<img :src="'./static/member/shouyi.png'" />
							<p>累计收益 {{fundInfo.income}}</p>
							<!--<i class="icon iconfont icon-arrow-right "></i>-->
						</div>
					</div>
					<div class="use" @click="$router.push({path:'/shop'})">
						使用积分
					</div>
				</div>
			</cell>
		</group>
		<!--<group :gutter='0' class="top-tip-box">
			<cell class="top-tip" primary="content" is-link link="/member/earnings/profit">
				<p>累计收益</p>
				<p>{{fundInfo.income}}</p>
			</cell>
		</group>-->
		<div class="tip-box b_r">
			<div class="top">
				<div class="one-item">
					<div style="display: flex;align-items: center;">
						<span>通用积分</span>
						<div style="padding: 0 0.05rem;">
							<img @click="changeFundShow" :src="fundInfo.isshowFund == 1?'./static/member/openeyes.png':'./static/member/closedeyes.png'" alt="" />
						</div>
					</div>
					<p>{{fundInfo.isshowFund?fundInfo.balance:'******'}}</p>
				</div>
				<div class="one-item" @click="toCurrencyReward('通用积分',3)">
					<p>累计充值</p>
					<p>{{fundInfo.isshowFund?fundInfo.recharge:'******'}}</p>
				</div>
			</div>
			<div class="bottom">
				<!--<div class="one-item" @click="toCurrencyReward('通用积分',6)">
					<p>中奖奖励</p>
					<p>{{fundInfo.isshowFund?fundInfo.lottery:'****'}}</p>
				</div>-->
				<div class="one-item" @click="toCurrencyReward('通用积分',4)">
					<p>购物奖励</p>
					<p>{{fundInfo.isshowFund?fundInfo.cashback:'****'}}</p>
				</div>
				<div class="one-item" @click="toCurrencyReward('通用积分',5)">
					<p>分红奖励</p>
					<p>{{fundInfo.isshowFund?fundInfo.commission:'****'}}</p>
				</div>
				<div class="one-item" @click="toCurrencyReward('通用积分',6)">
					<p>累计抽奖</p>
					<p>{{fundInfo.isshowFund?fundInfo.lottery:'****'}}</p>
				</div>
				<div class="one-item" @click="toCurrencyReward('通用积分',7)">
					<p>任务奖励</p>
					<p>{{fundInfo.isshowFund?fundInfo.taskBalance:'****'}}</p>
				</div>
			</div>
		</div>

		<div class="tip-box">
			<div class="top">
				<div class="one-item">
					<div style="display: flex;align-items: center;">
						<span>信用积分</span>
						<div style="height: 100%;padding: 0 0.05rem;">
							<img @click="changeFundShow" :src="fundInfo.isshowFund == 1?'./static/member/openeyes.png':'./static/member/closedeyes.png'" alt="" />
						</div>
					</div>
					<p>{{fundInfo.isshowFund?fundInfo.availablePoints:'******'}}</p>
				</div>
			</div>
			<div class="bottom">
				<div class="one-item" @click="toCreditReward('信用积分',3)">
					<p>充值奖励</p>
					<p>{{fundInfo.isshowFund?fundInfo.rechargePoints:'****'}}</p>
				</div>
				<div class="one-item" @click="toCreditReward('信用积分',4)">
					<p>购物奖励</p>
					<p>{{fundInfo.isshowFund?fundInfo.cashbackPoints:'****'}}</p>
				</div>
				<div class="one-item" @click="toCreditReward('信用积分',5)">
					<p>推荐用户</p>
					<p>{{fundInfo.isshowFund?fundInfo.recommendPoints:'****'}}</p>
				</div>
				<div class="one-item" @click="toCreditReward('信用积分',7)">
					<p>任务奖励</p>
					<p>{{fundInfo.isshowFund?fundInfo.taskPoints:'****'}}</p>
				</div>
				<div class="one-item" @click="toCreditReward('信用积分',6)">
					<p>中奖奖励</p>
					<p>{{fundInfo.isshowFund?fundInfo.lotteryPoints:'****'}}</p>
				</div>
				<div class="one-item" @click="$router.push({path:'/member/purse/recharge'})">
					<p style="color:#336FFF">充值送积分</p>
					<p>充值1000赠送1000</p>
				</div>
			</div>
		</div>
		<!--<div class="nomore1">
			<load-more :show-loading="false" tip="到底了" background-color="#F5F8F9"></load-more>
		</div>-->
		<!--<router-link to='/draw'>
			<img style="display: block;width: 100%;height: auto;" :src="'./static/images/integral-bg.png'" alt="" />
		</router-link>-->

	</div>
</template>

<script>
	import {
		Card,
		Cell,
		Group,
	} from 'vux'
	import settingHeader from '../../../components/setting_header'
	export default {
		data() {
			return {
				title: '我的资产',
				isopen: true,
				isopen2: false,
				fundInfo: {},
				userImg: '',
				isshowFund: 0
			}
		},
		created() {

		},
		mounted() {
			this.getFundInfo()
		},
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
						if(_this.fundInfo.avatar) {
							_this.userImg = _this.fundInfo.avatar.original
						}
						_this.isshowFund = _this.fundInfo.isshowFund
					}
				})
			},
			//修改资产显示状态
			changeFundShow() {
				var _this = this
				_this.$http.post(_this.url.user.changeFundShow, {
					userId: _this.$store.state.user.userId,
					isshowFund: _this.isshowFund == 0 ? 1 : 0
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.getFundInfo()
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
		created() {},
		components: {
			settingHeader,
			Card
		}
	}
</script>

<style lang="less">
	.wallet-box {
		font-family: PingFangSC-Medium;
		padding-bottom: 0.20rem;
		background-color: #F5F6FA;
		.w_bg {
			height: 2.50rem;
			display: flex;
			align-items: center;
			justify-content: center;
			background: url(../../../../static/member/w_bg.png) no-repeat;
			background-size: cover;
		}
		.nomore1 {
			display: flex;
			background: rgba(245, 248, 249, 1);
			.weui-loadmore {
				margin-bottom: 0;
			}
			.weui-loadmore_line {
				margin-top: 0.5rem !important;
			}
		}
		.wallet-header .header {
			position: relative;
		}
		.wallet-header .header:after {
			content: " ";
			position: absolute;
			left: 0;
			bottom: 0;
			right: 0;
			height: 1px;
			border-bottom: 1px solid #D9D9D9;
			color: #D9D9D9;
			-webkit-transform-origin: 0 100%;
			transform-origin: 0 100%;
			-webkit-transform: scaleY(0.5);
			transform: scaleY(0.5);
		}
		.bno .vux-no-group-title:before {
			border-top: none!important;
		}
		.b_r {
			border-radius: 13px 13px 0 0;
			margin-top: -0.25rem!important;
		}
		.tip-box {
			background-color: white;
			margin-top: 0.20rem;
			.bottom {
				display: flex;
				flex-wrap: wrap;
				.one-item {
					width: 50%;
					padding: 0.31rem 0.28rem;
					height: 1.35rem;
					position: relative;
					box-sizing: border-box;
					p:nth-child(1) {
						font-size: 0.32rem;
						color: rgba(26, 38, 66, 1);
					}
					p:nth-child(2) {
						font-size: 0.28rem;
						color: rgba(115, 134, 173, 1);
					}
				}
				.one-item:before {
					content: " ";
					position: absolute;
					right: 0;
					top: 0;
					width: 1px;
					bottom: 0;
					border-right: 1px solid #c7c7c7;
					color: #c7c7c7;
					transform-origin: 100% 0;
					transform: scaleX(.5);
				}
				.one-item:after {
					content: " ";
					position: absolute;
					top: 0;
					right: 0;
					height: 1px;
					border-top: 1px solid #c7c7c7;
					color: #d9d9d9;
					transform-origin: 0 0;
					transform: scaleY(.5);
					left: 0;
				}
			}
			.top {
				display: flex;
				padding: 0.31rem 0.28rem;
				box-sizing: border-box;
				.one-item {
					flex: 1;
					display: flex;
					justify-content: space-between;
					flex-direction: column;
				}
				.one-item:nth-child(1) {
					div>span {
						font-size: 0.28rem;
						color: rgba(115, 134, 173, 1);
						margin-right: 0.14rem;
					}
					div>img {
						width: 0.3rem;
						height: auto;
					}
					p {
						color: rgba(26, 38, 66, 1);
						font-size: 0.48rem;
						margin-top: 0.10rem
					}
				}
				.one-item:nth-child(2) {
					text-align: right;
					p:nth-child(1) {
						font-size: 0.28rem;
						color: rgba(115, 134, 173, 1);
					}
					p:nth-child(2) {
						font-size: 0.48rem;
						color: rgba(115, 134, 173, 1);
						margin-top: 0.10rem
					}
				}
			}
		}
		.top-tip {
			height: 1.55rem;
			background-color: white;
			box-sizing: border-box;
			p:nth-child(1) {
				font-size: 0.28rem;
				color: rgba(115, 134, 173, 1);
				text-align: left;
			}
			p:nth-child(2) {
				font-size: 0.48rem;
				color: rgba(26, 38, 66, 1);
				text-align: left;
			}
		}
		.top-tip-box .weui-cells:after {
			border-bottom: none!important;
		}
		.top-item {
			width: 100%;
			font-size: 0.34rem;
			color: rgba(26, 38, 66, 1);
			padding-left: 0.27rem;
			box-sizing: border-box;
			.shouyi_box {
				display: flex;
				align-items: center;
				img {
					width: 0.2rem;
					height: 0.2rem;
					margin-right: 0.09rem;
				}
				p {
					font-size: 0.22rem;
					font-family: PingFang-SC-Medium;
					color: rgba(115, 134, 173, 1);
					margin-right: 0.12rem;
				}
			}
			.weui-cell__ft {
				color: rgba(51, 111, 255, 1);
			}
			.left {
				display: flex;
				.tx {
					width: 0.98rem;
					height: 0.98rem;
					margin-right: 0.3rem;
					border-radius: 50%;
				}
				.one {
					text-align: left;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					padding: 0.05rem 0;
					p:nth-child(1) {
						font-size: 0.34rem;
						font-family: PingFang-SC-Medium;
						color: rgba(254, 254, 254, 1);
					}
					P:nth-child(2) {
						font-size: 0.22rem;
						font-family: PingFang-SC-Medium;
						color: rgba(255, 255, 255, 1);
					}
				}
				.use {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					font-size: 0.24rem;
					font-family: PingFang-SC-Medium;
					color: rgba(255, 255, 255, 1);
					.use_btn {
						width: 1.87rem;
						height: 0.60rem;
						line-height: 0.60rem;
						text-align: center;
						background: rgba(255, 255, 255, 0.3);
						border-radius: 20px 0 0 20px;
						display: flex;
						align-items: center;
						justify-content: center;
						i {
							font-size: 0.35rem;
							margin-left: .10rem;
						}
					}
				}
			}
		}
	}
</style>
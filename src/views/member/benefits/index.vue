<template>
	<section class="benefits">
		<settingHeader :title="title"></settingHeader>
		<!--<div class="top">
			<p>暂未满足条件</p>
			<p>专享 <span>5</span> 大权益 每月预计可赚 <span>2000+</span></p>
			<router-link to="/member/purse/hasqrcode"><div class="btn">查看满足条件</div></router-link>
		</div>-->
		<img style="width: 100%;height: auto;display: block;" :src="'./static/benefits/top_bg.png'" />

		<div class="content">
			<div class="title">
				<p>专享五大权益</p>
				<p class="text mt">专门为您打造的至尊礼遇</p>
			</div>
			<div class="box">
				<div class="img"><img :src="zc.img"></div>
				<div class="flex">
					<p>注册奖励</p>
					<p class="text mt">注册VlP会员可获信用积分<span>{{zc.num}}</span>分。</p>
				</div>
			</div>
			<div class="box">
				<div class="img"><img :src="gw.img"></div>
				<div class="flex">
					<p>购物奖励</p>
					<p class="text mt">可获得消费额<span>{{gw.num}}</span>的CGC通用积分。</p>
				</div>
			</div>
			<div class="box">
				<div class="img"><img :src="jf.img"></div>
				<div class="flex">
					<p>积分抵现金</p>
					<p class="text mt">CGC通用积分在商城<span>{{ jf.num}}</span>抵现金通用。</p>
				</div>
			</div>
			<div class="box">
				<div class="img"><img :src="ydj.img"></div>
				<div class="flex">
					<p>赢大奖</p>
					<p class="text mt">每一次消费均有机会赢<span>{{ydj.num}}</span>元通用积分。</p>
				</div>
			</div>
			<div class="box">
				<div class="img"><img :src="tj.img"></div>
				<div class="flex">
					<p>推荐得积分</p>
					<p class="text mt">信用积分<span>{{ tj.num}}</span>分/消费额<span>{{ tj.number}}</span>CGC通用积分</p>
				</div>
			</div>
			<div class="btn" @click="$router.push({path:'/member/benefits/detail'})">
				<span>权益说明</span>
				<img src="../../../assets/images/member/go.png">
			</div>
		</div>
		<div class="content" style="padding-top: 0;">
			<div class="title title_xx">
				<img :src="'./static/benefits/title_xx.png'" alt="" />
				<p>如何获得积分</p>
				<img :src="'./static/benefits/title_xx.png'" alt="" />
			</div>
			<section>
				<group class="zf-box">
					<cell v-for="(item,index) in infoList" :key="index" class="info-item" :title="item.text" :inline-desc='item.text2' is-link :link="item.url">
						<img slot="icon" :src="item.img">
					</cell>
				</group>
			</section>
		</div>
		<div class="content" style="padding-top: 0;">
			<div class="title title_xx">
				<img :src="'./static/benefits/title_xx.png'" alt="" />
				<p>关于积分</p>
				<img :src="'./static/benefits/title_xx.png'" alt="" />
			</div>
			<div v-for="(item,index) in list" :key="index">
				<div class="two-title">
					<img :src="'./static/benefits/title_yy.png'" alt="" />
					<p>{{item.title}}</p>
				</div>
				<div class="text1">
					<p v-for="i in item.text">{{i}}</p>
				</div>
			</div>

			<div class="text1">
				<div class="tip">注意事项</div>
				<p>CGC通用积分不可以提现。</p>
			</div>
		</div>
	</section>
</template>

<script>
	import settingHeader from '../../../components/setting_header'
	export default {
		components: {
			settingHeader
		},
		data() {
			return {
				title: '会员权益',
				zc: {
					num: 200,
					img: './static/member/jf.png'
				},
				gw: {
					num: '10%',
					img: './static/member/bag.png'
				},
				jf: {
					num: '1:1',
					img: './static/member/money.png'
				},
				ydj: {
					num: '5000',
					img: './static/member/lw.png'
				},
				tj: {
					num: '200',
					number: '10%',
					img: './static/member/heart.png'
				},
				infoList: [{
						img: './static/benefits/zf-1.png',
						text: '消费购物',
						url: '/share/storelist',
						text2: '交易成功后，获得平台收取服务费的20%的通用积分'
					},
					{
						img: './static/benefits/zf-2.png',
						text: '幸运抽奖',
						url: '/draw',
						text2: '消费参加抽奖，大奖可抽得5000通用积分'
					},
					{
						img: './static/benefits/zf-3.png',
						text: '推荐分享',
						url: '/member/purse/qrcode?index=1&text=推广码',
						text2: '会员分享可以获得消费金额10%的通用积分'
					},
					{
						img: './static/benefits/zf-4.png',
						text: '充值有奖',
						url: '/member/purse/recharge',
						text2: '会员在e消费APP充值，获得等值信用积分'
					}
				],
				list: [{
						title: '通用积分',
						text: ['CGC通用积分即时到达会员钱包帐户，可以在平台所有联盟企业或e消费APP商城平台1:1抵现金随意使用，没有时间和额度限制。']
					},
					{
						title: '信用积分',
						text: ['1.在e消费APP信用商城兑换专区兑换等值产品；', '2.e消费APP信用商城信用购专区以信用积分+现金购物;', '3.根据信用积分额获得对应的信用额度。']
					},
				]
			}
		},
		methods: {},

	}
</script>
<style lang="less">
	.zf-box {
		.weui-cells:before {
			border-top: none;
		}
		.weui-cells:after {
			left: 1.5rem!important;
		}
		.info-item {
			.vux-label {
				font-size: 0.32rem;
				font-family: PingFang-SC-Medium;
				color: rgba(26, 38, 66, 1);
			}
			.vux-label-desc {
				font-size: 0.24rem;
				font-family: PingFang-SC-Medium;
				color: rgba(144, 162, 199, 1);
			}
		}
		.info-item:before {
			left: 1.5rem!important;
		}
	}
</style>
<style lang="less" scoped>
	.benefits {
		background: #fff;
		.top {
			width: 100%;
			background: url(../../../assets/images/member/benefitsBg.png) no-repeat;
			background-size: 100% 100%;
			text-align: center;
			font-size: 0.3rem;
			color: #1A2642;
			padding-bottom: 0.72rem;
			p:nth-child(1) {
				font-size: 0.48rem;
				padding-top: 0.53rem;
			}
			p:nth-child(2) {
				margin: 0.28rem 0;
			}
			span {
				font-size: 0.36rem;
			}
			.btn {
				width: 4.1rem;
				height: 0.78rem;
				background: linear-gradient(70deg, #7EE8FF, #336FFF);
				border-radius: 0.39rem;
				text-align: center;
				color: #fff;
				font-size: 0.28rem;
				margin: auto;
				line-height: 0.78rem;
			}
		}
		.content {
			padding: 0.8rem 0 0.7rem 0;
			color: #1A2642;
			font-size: 0.36rem;
			.title_xx {
				display: flex;
				justify-content: center;
				align-items: center;
				p {
					margin: 0 0.15rem;
				}
				img {
					width: 0.18rem;
					height: 0.18rem;
				}
			}
			.two-title {
				margin-top: 0.4rem;
				padding: 0 0.45rem;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				font-size: 0.32rem;
				font-family: PingFang-SC-Medium;
				color: rgba(26, 38, 66, 1);
				img {
					width: 0.16rem;
					height: 0.16rem;
					margin-right: 0.11rem;
				}
			}
			.text1 {
				padding: 0.24rem 0.72rem;
				box-sizing: border-box;
				p {
					font-size: 0.26rem;
					font-family: PingFang-SC-Medium;
					color: rgba(144, 162, 199, 1);
					margin-bottom: 0.1rem;
				}
				.tip {
					width: 1.2rem;
					height: 0.44rem;
					line-height: 0.44rem;
					background: rgba(72, 121, 255, 1);
					border-radius: 3px;
					font-size: 0.24rem;
					font-family: PingFang-SC-Medium;
					color: rgba(255, 255, 255, 1);
					text-align: center;
					margin-bottom: 0.36rem;
				}
			}
			.info-item {
				font-family: PingFangSC-Regular;
				font-size: 0.28rem;
				color: #464646;
				letter-spacing: 0;
				height: 1.55rem;
				box-sizing: border-box;
				img {
					width: 1rem;
					height: 1rem;
					vertical-align: sub;
					margin-right: 0.25rem;
				}
			}
			.mt {
				margin-top: 0.2rem;
			}
			.text {
				color: #90A2C7;
				font-size: 0.26rem;
			}
			.title {
				text-align: center;
				padding-bottom: 0.07rem;
			}
			.box {
				display: flex;
				margin-top: 0.62rem;
				margin-left: 0.51rem;
				.img {
					width: 1rem;
					margin-right: 0.28rem;
					img {
						width: 100%;
					}
				}
				.flex {
					flex: 1;
				}
				span {
					color: #1A2642;
				}
			}
			.btn {
				width: 3rem;
				height: 0.66rem;
				border: 1px solid #90A2C7;
				border-radius: 0.33rem;
				text-align: center;
				color: #90A2C7;
				margin: auto;
				line-height: 0.66rem;
				font-size: 0.26rem;
				margin-top: 0.71rem;
				img {
					width: 8%;
					margin-top: 0.1rem;
					display: inline-block;
				}
			}
		}
	}
</style>
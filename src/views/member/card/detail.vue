<template>
	<div class="cardDetail_box">
		<settingHeader title="通用卡详情"></settingHeader>
		<div class="top">
			<div class="bg">
				<p class="store">国美番禺万科里店</p>
				<div class="middle">
					<p>企业通用积分：</p>
					<p>348786.53</p>
				</div>
				<div class="use_btn" @click="$router.push({path:'/member/card/record'})">使用明细<i class="icon iconfont icon-arrow-right"></i></div>

				<div class="tip_btn" @click="showTip = true">说明</div>
			</div>
		</div>
		<div class="title">
			<p>会员卡适用门店</p>
		</div>
		<div class="pd_box">
			<div class="list" v-for="(item,index) in list" :key="index">
				<div class="item">
					<div class="logo">
						<img v-if="item.logo" :src="item.logo.original" alt="" />
					</div>
					<div>
						<p class="name">{{item.name}}</p>
						<p class="type" v-if="item.domainCate1Name">{{item.domainCate1Name}} l {{item.domainCate2Name}}</p>
						<p class="address">
							<span>{{item.area.country}}{{item.area.province}}{{item.area.city}}{{item.area.area}}{{item.area.town}}</span>
							<span>{{item.distance}}km</span>
						</p>
						<p class="sf">
							<span class="lm" v-if="item.isAlliance == 1">联盟企业</span>
							<span class="ly" v-if="item.isChains == 1">联营企业</span>
						</p>
					</div>
				</div>
			</div>
		</div>
		<!--说明-->
		<div v-transfer-dom>
			<popup v-model="showTip">
				<div class="tip_box">
					<div class="title">企业通用卡说明</div>
					<div class="content">企业通用卡说明</div>
					<div class="btn" @click="showTip = false">关闭</div>
				</div>
			</popup>
		</div>
	</div>
</template>

<script>
	import settingHeader from '@/components/setting_header'
	import { Popup } from 'vux'
	export default {
		data() {
			return {
				showTip: false,
				list: [{
					allianceId: null,
					area: {
						area: "天河区",
						country: "中国",
						province: "广东省",
						town: null,
						city: "广州市"
					},
					chainsId: null,
					distance: 5,
					domainCate1Name: "食品餐饮",
					domainCate2Name: "餐馆",
					domainCate3Name: null,
					domainCate4Name: null,
					enterpriseId: "enterBasic2018071600000002",
					isAlliance: 1,
					isChains: 1,
					joinTime: 0,
					lat: 22.987211,
					lng: 113.373904,
					logo: {
						imageId: "img-ent628084771500000001",
						large: "",
						middle: null,
						original: "http://domain.cgc999.com:8080/group1/M00/00/1F/rBL0CFtSlAqARGtwAACpB_W8R4E233.jpg",
						small: "",
					},
					name: "广州鸿德国际大酒店",
					tel: "020-38626995"
				}, {
					allianceId: null,
					area: {
						area: "天河区",
						country: "中国",
						province: "广东省",
						town: null,
						city: "广州市"
					},
					chainsId: null,
					distance: 5,
					domainCate1Name: "食品餐饮",
					domainCate2Name: "餐馆",
					domainCate3Name: null,
					domainCate4Name: null,
					enterpriseId: "enterBasic2018071600000002",
					isAlliance: 1,
					isChains: 1,
					joinTime: 0,
					lat: 22.987211,
					lng: 113.373904,
					logo: {
						imageId: "img-ent628084771500000001",
						large: "",
						middle: null,
						original: "http://domain.cgc999.com:8080/group1/M00/00/1F/rBL0CFtSlAqARGtwAACpB_W8R4E233.jpg",
						small: "",
					},
					name: "广州鸿德国际大酒店",
					tel: "020-38626995"
				}]
			}
		},
		components: {
			settingHeader,
			Popup
		},
		created() {

		},
		mouted() {

		},
		methods: {

		},

	}
</script>

<style lang="less" scoped>
	.tip_box {
		width: 100%;
		height: 8.36rem;
		background: rgba(255, 255, 255, 1);
		position: relative;
		.title {
			height: 1.20rem;
			line-height: 1.20rem;
			text-align: center;
			font-size: 0.32rem;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: rgba(34, 34, 34, 1);
			position: relative;
		}
		.content {
			padding: 0.33rem;
			box-sizing: border-box;
			font-size: 0.24rem;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: rgba(53, 53, 53, 1);
			line-height: 0.35rem;
		}
		.btn {
			height: 0.90rem;
			line-height: 0.90rem;
			text-align: center;
			font-size: 0.28rem;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
			background: rgba(51, 111, 255, 1);
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
		}
	}
	
	.title:after {
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
		z-index: 11;
	}
	
	.cardDetail_box {
		.top {
			height: 3.70rem;
			padding: 0.25rem 0.25rem 0rem;
			box-sizing: border-box;
			background: linear-gradient(180deg, rgba(30, 37, 43, 1) 0%, rgba(33, 49, 61, 1) 100%);
			.bg {
				width: 100%;
				height: 100%;
				padding: 0.50rem 0 0.30rem 0;
				box-sizing: border-box;
				background: url(../../../../static/member/jdl.png) no-repeat;
				background-size: cover;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				text-align: center;
				position: relative;
				.tip_btn {
					width: 0.76rem;
					height: 0.40rem;
					line-height: 0.40rem;
					text-align: center;
					background: rgba(0, 0, 0, 0.3);
					border-radius: 1px;
					font-size: 0.20rem;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					text-shadow: 0px 2px 6px rgba(12, 26, 58, 0.2);
					position: absolute;
					top: 0.60rem;
					right: 0.20rem;
				}
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
						font-size: 0.64rem;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: rgba(255, 255, 255, 1);
						text-shadow: 0px 2px 6px rgba(12, 26, 58, 0.2);
					}
				}
				.use_btn {
					width: 1.60rem;
					height: 0.40rem;
					display: flex;
					align-items: center;
					justify-content: center;
					background: rgba(0, 0, 0, 0.3);
					border-radius: 21px;
					border: 1px solid rgba(255, 255, 255, 1);
					font-size: 0.24rem;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					text-shadow: 0px 2px 6px rgba(12, 26, 58, 0.2);
				}
			}
		}
		.title {
			height: 1.08rem;
			line-height: 1.08rem;
			font-size: 0.28rem;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: rgba(102, 102, 102, 1);
			text-align: center;
			background: rgba(255, 255, 255, 1);
			position: relative;
			p {
				display: block;
				position: relative;
			}
			p:before,
			p:after {
				content: '';
				/*CSS伪类用法*/
				position: absolute;
				/*定位背景横线的位置*/
				top: 48%;
				/*宽和高做出来的背景横线*/
				width: 0.08rem;
				height: 0.08rem;
				background: rgba(119, 119, 119, 1);
				border-radius: 50%;
			}
			p:before {
				left: 33%;
				/*调整背景横线的左右距离*/
			}
			p:after {
				right: 33%;
			}
		}
		.title:after {
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
			z-index: 11;
		}
		.pd_box {
			padding: 0 0.19rem;
			box-sizing: border-box;
			background-color: white;
		}
		.list {
			padding: 0.30rem 0;
			box-sizing: border-box;
			.item {
				display: flex;
				.logo {
					width: 2.4rem;
					height: 1.62rem;
					margin-right: 0.18rem;
					/* display: flex;
					align-items: center;
					justify-content: center; */
					img {
						width: 100%;
						height: 100%;
					}
				}
				div {
					/*flex: 1;*/
					width: 5rem;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.name {
						font-size: 0.32rem;
						font-family: PingFangSC-Medium;
						color: rgba(26, 38, 66, 1);
					}
					.type {
						font-size: 0.24rem;
						font-family: PingFangSC-Regular;
						color: rgba(115, 134, 173, 1);
					}
					.address {
						display: flex;
						justify-content: space-between;
						span:nth-child(1) {
							width: 3rem;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							-webkit-line-clamp: 1;
							-webkit-box-orient: vertical;
						}
						span {
							font-size: 0.24rem;
							font-family: PingFangSC-Regular;
							color: rgba(115, 134, 173, 1);
						}
					}
					.sf {
						span {
							display: inline-block;
							width: 1.02rem;
							height: 0.34rem;
							line-height: 0.34rem;
							text-align: center;
							border-radius: 3px;
							font-size: 0.22rem;
							font-family: PingFangSC-Regular;
							margin-right: 0.20rem;
						}
						.lm {
							color: #336FFF;
							background: rgba(51, 111, 255, 0.1);
							border: 1px solid rgba(51, 111, 255, 1);
						}
						.ly {
							color: #FF5365;
							background: rgba(255, 83, 101, 0.1);
							border: 1px solid rgba(255, 83, 101, 1);
						}
					}
				}
			}
		}
		.list:not(:last-child) {
			border-bottom: 1px solid rgba(216, 223, 240, 1);
		}
	}
</style>
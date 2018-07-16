<template>
	<div class="right-box" ref="rightBox">
		<div class="bg-box">
			<div class="img-box">
				<transition enter-active-class="zoomIn animated" v-on:enter="huoEnter">
					<img class="huo" v-if="showHuo" :src="'./static/company/huo.png'" />
				</transition>

				<transition enter-active-class="fadeInDown animated">
					<img v-if="showText" class="zx" :src="'./static/company/zx.png'" />
				</transition>

				<transition enter-active-class="fadeInLeft animated">
					<img v-if="showText" class="fu" :src="'./static/company/fu.png'" />
				</transition>

				<transition enter-active-class="fadeInRight animated">
					<img v-if="showText" class="neng" :src="'./static/company/neng.png'" />
				</transition>
				
				<transition enter-active-class="zoomIn animated">
					<div class="bottom" v-if="showText">
						<div>
							<img :src="'./static/company/kh.png'" />
							<p>消费数据价值化</p>
						</div>
						<div>
							<img :src="'./static/company/gyl.png'" />
							<p>产业数据价值化</p>
						</div>
						<div>
							<img :src="'./static/company/zh.png'" />
							<p>城市数据价值化</p>
						</div>
					</div>
				</transition>
			</div>
			<img class="jiantou" :src="'./static/company/jiantou.png'" />
		</div>
		<div class="tab-box">
			<div class="top">
				<img :src="'./static/company/left.png'" />
				<p>CGC全球智慧产业联盟</p>
				<img :src="'./static/company/right.png'" />
			</div>
			<p class="big-text">开启共享经济新时代</p>
			<div class="bottom">
				<tab v-model="tabIndex" bar-active-color="#F2BB67" active-color="#F2BB67" custom-bar-width="0.4rem" line-width="3" default-color="#f2bb67a3">
					<tab-item selected>服务企业</tab-item>
					<tab-item>商贸企业</tab-item>
				</tab>
			</div>
		</div>
		<div class="content">
			<div class="top">
				<div class="left"></div>
				<p>{{showData.bigTitle}}</p>
				<div class="right"></div>
			</div>
			<p class="text1">{{showData.tip}}</p>
			<div class="list-box">
				<div class="item" v-for="(i,index) in showData.tipList" :style="{backgroundImage: 'url('+ i.img +')'}">
					<p>{{i.title}}</p>
					<p v-html="i.text">{{i.text}}</p>
				</div>
			</div>
		</div>

		<div class="contact">
			<div class="bg">
				<p>联系我们</p>
				<div style="display: flex;">
					<span>客服电话：<span></span></span>
					<span><a href="tel://400-0998-100">400-0998-100</a></span>
				</div>
				<div style="display: flex;">
					<span>地  址：<span></span></span>
					<span>广东省广州市番禺区番禺大道北555号天 安科技园总部中心16栋楼901-902</span>
				</div>
			</div>
		</div>
		<div class="btn">
			申请加盟
		</div>
	</div>
</template>

<script>
	import settingHeader from '../../../components/setting_header'
	import { Tab, TabItem } from 'vux'
	export default {
		data() {
			return {
				title: "企业权益",
				showHuo: false,
				showText: false,
				tabIndex: 0,
				showData: {},
				fwqy: {
					bigTitle: '六大核心优势',
					tip: '重塑企业链上下游企业业务模式、重塑盈利模式、全面提高企业运营效率',
					tipList: [{
							title: '免费投放设备',
							text: '免费提供全球精选、供应商直供、极具市场 优势，解决目标客户痛点的刚需产品和设备',
							img: './static/company/bg01.png'
						},
						{
							title: '精准匹配客户',
							text: '精选区域内各行业优质目标客户，精准导客，确保客户资源最大化',
							img: './static/company/bg02.png'
						},
						{
							title: '参与利润分配',
							text: '获得平台免费提供的多种产品和设备产生的收入的<span style="color: #F23030">20%~ 50%</span>的分润',
							img: './static/company/bg03.png'
						},
						{
							title: '联盟免费广告宣传',
							text: '5公里范围内联盟免费广告，跨界合作，强强联手',
							img: './static/company/bg04.png'
						},
						{
							title: '会员价值百倍增长',
							text: '绑定会员长期跨界消费利润，会员资源最大化，会员价值最大化',
							img: './static/company/bg05.png'
						},
						{
							title: '商业智能化',
							text: '提供智慧商业整合营销系列系统软件，使营销决策管理服务精细化、精准化、智能化',
							img: './static/company/bg06.png'
						}
					]
				},
				smqy: {
					bigTitle: '六大利润增长方案',
					tip: '为大型连锁企业重塑商业模式、业务模式盈利模式提供智慧产业利润增长整体解决方案',
					tipList: [{
							title: '会员价值百倍增长',
							text: '绑定会员长期跨界消费利润，实现会员资源最大化，会员价值最大化',
							img: './static/company/bg010.png'
						},
						{
							title: '客户资源最大化',
							text: '联盟企业异业同业跨界合作，强强联手共享客户资源，共享广告资源，实现利润最大化',
							img: './static/company/bg020.png'
						},
						{
							title: '智慧商业服务',
							text: '为企业提供智慧商业整合营销系列系统软件，营销决策管理服务精细化、精准化、智能化',
							img: './static/company/bg030.png'
						},
						{
							title: '全面提升市场竞争力',
							text: '精准掌握市场信息，抢占市场先机，经营成本最小化，市场份额最大化',
							img: './static/company/bg040.png'
						},
						{
							title: '数据价值最大化',
							text: '共享产业链上下游数据资源，深度挖掘数据价值，实现数据价值最大化',
							img: './static/company/bg050.png'
						},
						{
							title: '绑定会员忠诚度',
							text: '根据会员精准消费需求，实时为会员匹配个性化商品和服务，多维度精准服务高端客户',
							img: './static/company/bg060.png'
						}
					]
				}

			}
		},
		created() {
			this.showData = this.fwqy
		},
		mounted() {
			var _this = this

			_this.$nextTick(function() {
				_this.showHuo = true
			})
		},
		components: {
			settingHeader,
			Tab,
			TabItem
		},
		methods: {
			huoEnter() {
				var _this = this
				setTimeout(function() {
					_this.showText = true
				}, 500)
			}
		},
		watch: {
			tabIndex() {
				if(this.tabIndex == 0) {
					this.showData = this.fwqy
				} else {
					this.showData = this.smqy
				}
			}
		}
	}
</script>
<style lang='less'>
	/*tab*/
	
	.right-box {
		.tab-box {
			.bottom {
				.vux-tab {
					background-color: transparent!important;
					.vux-tab-item {
						background-size: 100% 0px!important;
						font-size: 0.28rem;
						font-family: PingFangSC-Semibold;
						color: rgba(255, 197, 108, 1);
					}
				}
			}
		}
	}
</style>

<style lang='less' scoped>
	.right-box {
		.bg-box {
			height: 12.05rem;
			padding-top: 2.40rem;
			box-sizing: border-box;
			background: url(../../../../static/company/bg.png) no-repeat;
			background-size: cover;
			position: relative;
			.img-box {
				height: 9rem;
				position: relative;
				.huo {
					width: 100%;
					height: auto;
				}
				.zx {
					width: 0.79rem;
					height: 3.47rem;
					position: absolute;
					right: 1.94rem;
					top: -8%;
				}
				.fu {
					width: 2.80rem;
					height: 2.70rem;
					position: absolute;
					left: 1.56rem;
					top: 0.79rem;
				}
				.neng {
					width: 2.80rem;
					height: 2.70rem;
					position: absolute;
					right: 1.01rem;
					top: 2.93rem;
				}
				.bottom {
					padding: 0.6rem 0.49rem;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					div {
						text-align: center;
						img {
							width: 0.6rem;
							height: 0.6rem;
							margin-bottom: 0.12rem;
						}
						p {
							font-size: 0.26rem;
							font-family: PingFangSC-Regular;
							color: rgba(255, 197, 108, 1);
						}
					}
				}
			}
			.jiantou {
				width: 0.23rem;
				height: 0.51rem;
				position: absolute;
				bottom: 0.1rem;
				left: 50%;
				transform: translate(-50%, -0.28rem);
			}
		}
		.tab-box {
			height: 3.54rem;
			background: url(../../../../static/company/bg.png) no-repeat;
			background-size: 100%;
			overflow: hidden;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			.top {
				display: flex;
				align-items: center;
				img {
					width: 1.05rem;
					height: 0.08rem;
				}
				p {
					font-size: 0.36rem;
					font-family: STSongti-SC-Bold;
					color: rgba(255, 197, 108, 1);
					margin: 0 0.12rem;
				}
			}
			.big-text {
				font-size: 0.68rem;
				font-family: STSongti-SC-Bold;
				color: rgba(255, 197, 108, 1);
				margin: 0.2rem 0;
			}
			.bottom {
				width: 100%;
				padding: 0 2.36rem;
				box-sizing: border-box;
			}
		}
		.content {
			height: 17.76rem;
			background: url(../../../../static/company/bg2.png) no-repeat;
			background-size: cover;
			padding: 0.41rem 0.32rem;
			box-sizing: border-box;
			transition: all 0.3s linear;
			.top {
				display: flex;
				align-items: center;
				justify-content: center;
				p {
					font-size: 0.52rem;
					font-family: PingFangSC-Semibold;
					color: rgba(218, 167, 89, 1);
					margin: 0 0.25rem;
				}
				.left,
				.right {
					width: 0.14rem;
					height: 0.14rem;
					background: rgba(218, 167, 89, 1);
					transform: rotate(45deg);
				}
			}
			.text1 {
				padding: 0.17rem 0.65rem 0.38rem 0.65rem;
				box-sizing: border-box;
				text-align: center;
				font-size: 0.28rem;
				font-family: PingFangSC-Regular;
				color: rgba(218, 167, 89, 1);
			}
			.list-box {
				.item {
					height: 2rem;
					background-repeat: no-repeat;
					background-size: cover;
					margin-bottom: 0.3rem;
					padding-left: 1.66rem;
					padding-right: 0.6rem;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					justify-content: center;
					p:nth-child(1) {
						font-size: 0.36rem;
						font-family: PingFangSC-Medium;
						color: rgba(153, 105, 35, 1);
						margin-bottom: 0.12rem;
					}
					p:nth-child(2) {
						font-size: 0.24rem;
						font-family: PingFangSC-Regular;
						color: rgba(121, 121, 121, 1);
					}
				}
			}
		}
		.contact {
			padding: 0.38rem 0.32rem;
			background: linear-gradient(180deg, rgba(0, 0, 0, 0.92), rgba(7, 5, 5, 0.84), rgba(23, 18, 17, 0.91), rgba(18, 13, 12, 0.93), rgba(14, 8, 7, 0.86));
			.bg {
				width: 100%;
				height: 100%;
				background: url(../../../../static/company/contact-bg.png) no-repeat;
				background-size: cover;
				display: flex;
				justify-content: center;
				flex-direction: column;
				padding: 0.2rem;
				box-sizing: border-box;
				p {
					color: white;
					font-size: 0.30rem;
					text-align: center;
					margin-bottom: 0.29rem;
				}
				div {
					span {
						font-size: 0.28rem;
						font-family: PingFangSC-Regular;
						color: rgba(255, 192, 96, 1);
						a {
							font-size: 0.28rem;
							font-family: PingFangSC-Regular;
							color: rgba(255, 192, 96, 1);
						}
					}
					span:nth-child(1) {
						display: inline-block;
						width: 1.5rem;
						text-align: justify;
					}
				}
			}
		}
		.btn {
			height: 1rem;
			line-height: 1rem;
			text-align: center;
			font-size: 0.36rem;
			font-family: PingFangSC-Regular;
			color: rgba(77, 43, 0, 1);
			background: linear-gradient(-90deg, rgba(198, 151, 62, 1), rgba(232, 212, 143, 1));
		}
	}
</style>
<template>
	<section class="brand-box">
		<settingHeader :title="title"></settingHeader>
		<div class="search-box">
			<img :src="'./static/images/ss.png'" />
			<input type="text" readonly="readonly" placeholder="搜索" />
		</div>
		<div class="banner-box">
			<img :src="'./static/brand/riben.png'" />
		</div>
		<div class="title-box">优质品牌</div>
		<div v-for="(item,index) in sList">
			<div class="content-box" :style="{backgroundImage: 'url('+ item.bgImg +')',backgroundSize: 'cover',backgroundrRepeat: 'no-repeat'}">
				<div class="middle">
					<div class="left">
						<img :src="item.logo" />
						<div>
							<p>{{item.text1}}</p>
							<p>{{item.text2}}</p>
						</div>
					</div>
					<div class="right">
						进入
					</div>
				</div>
			</div>
			<div class="swiper-inner">
				<swiper :options="swiperOption" class="swiper">
					<swiper-slide v-for="(i,index) in item.zstList" :key="index">
						<img :src="i.img" />
						<div class="tip">
							<p class="title">{{i.name}}</p>
							<p class="money">¥ {{i.money}}</p>
						</div>
					</swiper-slide>
				</swiper>
			</div>
		</div>
		<div class="pro-allbox">
			<div class="title-box">优质品牌</div>
			<div class="item-box">
				<div class="item" v-for="(item,index) in pList" :key="index">
					<div class="da-box">
						<img :src="item.img" alt="" />
					</div>
					<p class="title">{{item.title}}</p>
					<p class="price"><span class="jg">¥ {{item.money}}</span></p>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import settingHeader from '../../components/setting_header'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		components: {
			settingHeader,
			swiper,
			swiperSlide
		},
		data() {
			return {
				title: '品牌馆',
				swiperOption: {
					slidesPerView: 'auto',
					autoplay: false
				},
				sList: [{
					id: 1,
					bgImg: './static/brand/zst-bg.png',
					logo: './static/brand/zst.png',
					text1: 'Shiseido 资生堂',
					text2: '百年资生堂美丽不变',
					zstList: [{
							name: '爽肤水化妆水肌水乳润滋养露400ml',
							money: '40',
							img: './static/brand/zst_sp1.png'
						},
						{
							name: '惠润鲜花芳香洗发水护发素套装...',
							money: '759',
							img: './static/brand/zst_sp2.png'
						},
						{
							name: '洗颜专科柔澈泡沫温和保湿洁面乳...',
							money: '39',
							img: './static/brand/zst_sp3.png'
						},
						{
							name: '丝蓓绮奢耀柔艳亮泽山茶花洗发水...',
							money: '108',
							img: './static/brand/zst_sp4.png'
						}
					]
				}, {
					id: 2,
					bgImg: './static/brand/hw-bg.png',
					logo: './static/brand/hw.png',
					text1: 'Kao 花王',
					text2: '日本原装 品牌直营',
					zstList: [{
							name: '三倍透气纸尿裤NB90【4包套装】',
							money: '40',
							img: './static/brand/hw_sp1.png'
						},
						{
							name: '热敷蒸汽眼罩睡眠眼罩 14片/盒装',
							money: '89',
							img: './static/brand/hw_sp2.png'
						},
						{
							name: '婴幼儿手口带盖湿纸巾宝宝专用清...',
							money: '46',
							img: './static/brand/hw_sp3.png'
						},
						{
							name: '纸尿裤L54 4包装',
							money: '472',
							img: './static/brand/hw_sp4.png'
						}
					]
				}, {
					id: 3,
					bgImg: './static/brand/sn-bg.png',
					logo: './static/brand/sn.png',
					text1: 'SANA 莎娜',
					text2: '豆乳天然美肌，温和护肤',
					zstList: [{
							name: '豆乳美肌洗面奶 150g',
							money: '68',
							img: './static/brand/sn_sp1.png'
						},
						{
							name: '豆乳美肌化妆水 200ml',
							money: '89',
							img: './static/brand/sn_sp2.png'
						},
						{
							name: '豆乳美肌乳液 150ml',
							money: '86',
							img: './static/brand/sn_sp3.png'
						},
						{
							name: '豆乳美肌眼霜25g',
							money: '88',
							img: './static/brand/sn_sp4.png'
						}
					]
				}],
				pList: [{
						img: './static/brand/pr1.png',
						title: '三倍透气纸尿裤NB90【4包套装】',
						money: '40.00',
					}, {
						img: './static/brand/pr2.png',
						title: '爽肤水化妆水肌水乳润滋养露400ml',
						money: '40.00'
					},
					{
						img: './static/brand/pr3.png',
						title: 'ESTĒE LAUDER 雅诗兰黛 小棕瓶面部精华 特...',
						money: '688.00'
					}, {
						img: './static/brand/pr4.png',
						title: 'Blackmores 深海鱼油软胶囊400粒澳佳宝欧米...',
						money: '196.00'
					},
					{
						img: './static/brand/pr5.png',
						title: 'Swarovski 施华洛世奇 女士Iconic Swan黑天鹅…',
						money: '880.00'
					},
					{
						img: './static/brand/pr6.png',
						title: 'Daniel Wellington欧美女士简约风手表 DW时尚…',
						money: '1520.00'
					},
					{
						img: './static/brand/pr7.png',
						title: 'ESTĒE LAUDER 雅诗兰黛 小棕瓶面部精华 特...',
						money: '688.00'
					},
					{
						img: './static/brand/pr8.png',
						title: 'Blackmores 深海鱼油软胶囊400粒澳佳宝欧米...',
						money: '196.00'
					}
				],
			}
		},
		mounted: function() {

		},
		methods: {}
	}
</script>

<style lang="less" scoped>
	.brand-box {
		background-color: #F5F6FA;
		.search-box {
			height: 1rem;
			padding: 0.16rem 0.30rem;
			box-sizing: border-box;
			background: rgba(255, 255, 255, 1);
			position: relative;
			input {
				width: 100%;
				height: 100%;
				background: rgba(26, 38, 66, 0.08);
				border-radius: 4px;
				text-align: center;
				font-size: 0.24rem;
				font-family: PingFangSC-Regular;
				color: rgba(144, 162, 199, 1);
			}
			input::-webkit-input-placeholder {
				color: #90A2C7;
			}
			input:-moz-placeholder {
				color: #90A2C7;
			}
			img {
				width: 0.30rem;
				height: 0.30rem;
				position: absolute;
				top: 50%;
				left: 43%;
				transform: translate(-43%, -50%);
			}
		}
		.banner-box {
			height: 2.88rem;
			overflow: hidden;
			img {
				width: 100%;
				height: auto;
				display: block;
			}
		}
		.title-box {
			height: 1.02rem;
			line-height: 1.02rem;
			text-align: center;
			font-size: 0.38rem;
			font-family: PingFangSC-Regular;
			color: rgba(34, 34, 34, 1);
			background: rgba(255, 255, 255, 1);
		}
		.content-box {
			height: 2.7rem;
			margin-top: 0.20rem;
			position: relative;
			.middle {
				display: flex;
				align-items: center;
				justify-content: space-between;
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				z-index: 15;
				padding: 0.78rem 0.48rem 0.72rem 0.44rem;
				box-sizing: border-box;
				.left {
					display: flex;
					img {
						width: 1.20rem;
						height: 1.20rem;
						margin-right: 0.16rem;
					}
					div {
						display: flex;
						justify-content: center;
						flex-direction: column;
						p:nth-child(1) {
							font-size: 0.28rem;
							font-family: PingFangSC-Medium;
							color: rgba(255, 255, 255, 1);
							margin-bottom: 0.08rem;
						}
						p:nth-child(2) {
							font-size: 0.28rem;
							font-family: PingFangSC-Regular;
							color: rgba(255, 255, 255, 1);
						}
					}
				}
				.right {
					width: 1.24rem;
					height: 0.46rem;
					line-height: 0.46rem;
					text-align: center;
					border-radius: 13px;
					border: 1px solid rgba(255, 255, 255, 1);
					font-size: 0.22rem;
					font-family: PingFangSC-Medium;
					color: rgba(255, 255, 255, 1);
				}
			}
		}
		.content-box:after {
			width: 100%;
			height: 100%;
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			z-index: 10;
		}
		.content-box:before {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 1);
			opacity: 0.5995;
			z-index: 11;
		}
		.swiper-inner {
			padding: 0.10rem 0.20rem 0 0.20rem;
			box-sizing: border-box;
			.swiper-slide {
				width: 2.20rem;
				height: 3.47rem;
				margin-right: 0.10rem;
				background-color: white;
				display: flex;
				flex-direction: column;
				align-items: center;
				img {
					width: 2.20rem;
					height: 2.20rem;
				}
				.tip {
					flex: 1;
					padding: 0.12rem;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.title {
						font-size: 0.24rem;
						font-family: PingFangSC-Regular;
						color: rgba(34, 34, 34, 1);
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					.money {
						font-size: 0.26rem;
						font-family: PingFangSC-Semibold;
						color: rgba(242, 48, 48, 1);
					}
				}
			}
		}
		.pro-allbox {
			padding: 0.20rem 0;
			.title-box {
				margin-bottom: 0.10rem;
			}
			.item-box {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				padding: 0 0.1rem;
				.item {
					width: 3.62rem;
					margin-bottom: 0.06rem;
					background-color: white;
					position: relative;
					.po-img {
						position: absolute;
						top: 0;
						left: 0;
						img {
							width: 1.28rem;
							height: 0.4rem;
						}
					}
					.da-box {
						height: 3.62rem;
						overflow: hidden;
						img {
							width: 100%;
							height: auto;
						}
					}
					.title {
						width: 100%;
						box-sizing: border-box;
						padding: 0 0.17rem;
						font-size: 0.26rem;
						font-family: PingFangSC-Regular;
						color: rgba(34, 34, 34, 1);
						height: 0.76rem;
						line-height: 0.38rem;
						margin-top: 0.1rem;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					.price {
						padding: 0.13rem 0.17rem 0.28rem 0.17rem;
						.jg {
							font-size: 0.28rem;
							font-family: PingFangSC-Semibold;
							color: rgba(242, 48, 48, 1);
						}
						.zf {
							font-size: 0.28rem;
							font-family: PingFangSC-Medium;
							color: rgba(51, 111, 255, 1);
							.f20 {
								font-size: 0.20rem;
								font-family: PingFangSC;
								color: rgba(51, 111, 255, 1);
							}
						}
					}
				}
			}
		}
	}
</style>
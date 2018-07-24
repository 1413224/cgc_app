<template>
	<section class="brand-box">
		<settingHeader :title="title"></settingHeader>
		<div class="banner-box">
			<img :src="'./static/brand/dapai.png'" />
		</div>
		<div class="top-swiper">
			<div class="swiper-inner1">
				<swiper :options="swiperOption" class="swiper">
					<swiper-slide v-for="(item,index) in mpList" :key="index">
						<img :src="item.img" />
						<!--<div class="tip">{{item.name}}</div>-->
					</swiper-slide>
				</swiper>
			</div>
		</div>
		<div class="title-box">精选品牌</div>
		<div v-for="(item,index) in list" style="margin-bottom: 0.20rem;">
			<div class="content-box" :style="{backgroundImage: 'url('+ item.bgImg +')',backgroundSize: 'cover',backgroundrRepeat: 'no-repeat'}">
				<div class="middle">
					<div class="left">
						<img :src="item.logo" />
						<div>
							<p>{{item.text1}}</p>
							<p>
								<img :src="item.jgImg" alt="" /> {{item.text2}}
							</p>
						</div>
					</div>
					<div class="right">
						进入
					</div>
					<div class="sjx"></div>
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
				mpList: [{
						name: 'WHOO后',
						img: './static/brand/1.png'
					},
					{
						name: 'Swisse',
						img: './static/brand/2.png'
					},
					{
						name: '花王',
						img: './static/brand/3.png'
					},
					{
						name: '施华洛世奇',
						img: './static/brand/4.png'
					},
					{
						name: '香奈儿',
						img: './static/brand/5.png'
					},
					{
						name: '雅诗兰黛',
						img: './static/brand/6.png'
					},
					{
						name: '资生堂',
						img: './static/brand/7.png'
					}
				],
				list: [{
					id: 1,
					bgImg: './static/brand/hl_bg.png',
					logo: './static/brand/hl.png',
					text1: 'SWAROVSKI 施华洛世奇',
					text2: '列支敦士登｜探索当季闪耀新品',
					jgImg: './static/brand/dg.png',
					zstList: [{
							name: 'DUO恶魔之眼项链时尚气质女短...',
							money: '990',
							img: './static/brand/hl_pr1.png'
						},
						{
							name: 'ICONIC SWAN项链 时尚黑天鹅...',
							money: '880',
							img: './static/brand/hl_pr2.png'
						},
						{
							name: '白色仿水晶珍珠可变造型女士耳钉...',
							money: '564',
							img: './static/brand/hl_pr3.png'
						},
						{
							name: '施华洛世奇Swarovski 银色...',
							money: '384',
							img: './static/brand/hl_pr4.png'
						}
					]
				}, {
					id: 2,
					bgImg: './static/brand/xne_bg.png',
					logo: './static/brand/xne.png',
					text1: 'CHANEL 香奈儿',
					text2: '法国｜独一无二精致工艺',
					jgImg: './static/brand/fg.png',
					zstList: [{
							name: '蔚蓝男士淡香水50ml清新古龙香...',
							money: '558',
							img: './static/brand/xne_pr1.png'
						},
						{
							name: '邂逅柔情清新淡香水女士发香雾淡...',
							money: '665',
							img: './static/brand/xne_pr2.png'
						},
						{
							name: '嘉柏丽尔香水花香调女士香氛50m...',
							money: '859',
							img: './static/brand/xne_pr3.png'
						},
						{
							name: '可可小姐黑色女士香水50ml 100...',
							money: '884',
							img: './static/brand/xne_pr4.png'
						}
					]
				}, {
					id: 3,
					bgImg: './static/brand/ysld_bg.png',
					logo: './static/brand/ysld.png',
					text1: 'Estee Lauder 雅诗兰黛',
					text2: '美国｜雅诗兰黛让每位女性皆...',
					jgImg: './static/brand/mg.png',
					zstList: [{
							name: '小棕瓶眼霜 肌透修护眼部精华...',
							money: '435',
							img: './static/brand/ysld_pr1.png'
						},
						{
							name: 'dw持妆粉底液30ml 补水防晒 保...',
							money: '390',
							img: './static/brand/ysld_pr2.png'
						},
						{
							name: '小棕瓶面部精华特润修护肌透精华...',
							money: '688',
							img: './static/brand/ysld_pr3.png'
						},
						{
							name: '红石榴泡沫洁面乳125ml 深层清...',
							money: '228',
							img: './static/brand/ysld_pr4.png'
						}
					]
				}, {
					id: 4,
					bgImg: './static/brand/sw_bg.png',
					logo: './static/brand/sw.png',
					text1: 'Swisse',
					text2: '澳大利亚｜宗旨是帮助人们生...',
					jgImg: './static/brand/odly.png',
					zstList: [{
							name: '钙片+维生素D柠檬酸150片成人...',
							money: '128',
							img: './static/brand/sw_pr1.png'
						},
						{
							name: '高浓缩蔓越莓胶囊30粒高浓度PAC...',
							money: '199',
							img: './static/brand/sw_pr2.png'
						},
						{
							name: '鱼油胶囊 澳洲进口深海鱼油胶囊...',
							money: '283',
							img: './static/brand/sw_pr3.png'
						},
						{
							name: '大豆卵磷脂胶囊 澳洲进口卵磷...',
							money: '265',
							img: './static/brand/sw_pr4.png'
						}
					]
				}]
			}
		},
		mounted() {

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
		.top-swiper {
			.swiper-inner1 {
				box-sizing: border-box;
				.swiper-container {
					padding-top: 0.27rem;
					padding-left: 0.20rem;
					padding-bottom: 0.20rem;
				}
				.swiper-slide {
					width: 1.84rem;
					height: 1.84rem;
					margin-right: 0.10rem;
					background-color: white;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-between;
					box-shadow: 2px 0px 20px rgba(217, 223, 240, 1);
					img {
						width: 1.84rem;
						height: 1.84rem;
					}
					.tip {
						font-size: 0.24rem;
						font-family: PingFang-SC-Medium;
						color: rgba(115, 134, 173, 1);
					}
				}
			}
		}
		.title-box {
			height: 1.48rem;
			line-height: 1.48rem;
			text-align: center;
			font-size: 0.38rem;
			font-family: PingFangSC-Regular;
			color: rgba(34, 34, 34, 1);
			background: rgba(255, 255, 255, 1);
		}
		.content-box {
			height: 2.7rem;
			position: relative;
			.middle {
				display: flex;
				align-items: center;
				justify-content: space-between;
				position: relative;
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
							font-size: 0.24rem;
							font-family: PingFangSC-Regular;
							color: rgba(255, 255, 255, 1);
							display: flex;
							align-items: center;
							img {
								width: 0.24rem;
								height: 0.24rem;
							}
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
				.sjx {
					position: absolute;
					left: 0.87rem;
					bottom: 0;
					width: 0;
					height: 0;
					border: 0.17rem solid;
					border-color: transparent transparent white transparent;
				}
			}
		}
		.swiper-inner {
			padding: 0.10rem 0 0 0.20rem;
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
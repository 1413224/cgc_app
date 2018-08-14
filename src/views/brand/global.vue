<template>
	<section class="global-box">
		<settingHeader :title="title"></settingHeader>
		<div class="search-box">
			<img :src="'./static/images/ss.png'" />
			<input type="text" readonly="readonly" placeholder="搜索" />
		</div>
		<div class="banner-box">
			<img :src="'./static/brand/qqg-bg.png'" />
		</div>
		<div class="trait-box">
			<div>
				<img :src="'./static/brand/48.png'" alt="" />
				<p>极速发货</p>
			</div>
			<div>
				<img :src="'./static/brand/sh.png'" alt="" />
				<p>售后无忧</p>
			</div>
			<div>
				<img :src="'./static/brand/zp.png'" alt="" />
				<p>正品保障</p>
			</div>
			<div>
				<img :src="'./static/brand/zy.png'" alt="" />
				<p>海外直邮</p>
			</div>
		</div>

		<div class="choicest-box" v-for="(item,index) in lbLsit">
			<div class="left" :style="{backgroundImage: 'url('+ item.bg +')',backgroundSize: 'cover',backgroundrRepeat: 'no-repeat'}">
				<div class="swiper-inner">
					<swiper :options="swiperOption" class="swiper">
						<swiper-slide v-for="(i,index) in item.jxList" :key="index">
							<img :src="i" />
						</swiper-slide>
					</swiper>
				</div>
			</div>
			<div class="right">
				<div class="one" v-for="(prItem,index) in item.pList" :key="index">
					<div class="lf">
						<p>{{prItem.name}}</p>
						<p v-for="(i,index) in prItem.text" :key="index">{{i}}</p>
					</div>
					<div class="rg">
						<img :src="prItem.img" alt="" />
					</div>
				</div>
			</div>
		</div>
		<div class="pro-allbox">
			<div class="title-box">优质好货</div>
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
				title: '全球购',
				swiperOption: {
					slidesPerView: 1,
					autoplay: true,
					loop: true,
					effect: 'flip'
				},
				lbLsit: [{
						bg: './static/brand/qqjxpp.png',
						jxList: ['./static/brand/jx1.png'],
						pList: [{
							name: 'COACH女士贝壳包',
							text: ['时尚大牌', '方便百搭'],
							img: './static/brand/bao.png',
							goodsId:'lxgoods9820180803277677575'
						}, {
							name: 'JBL无线蓝牙音响',
							text: ['人气商品', '畅销明星款'],
							img: './static/brand/jbl.png',
							goodsId:'lxgoods9820180803356645461'
						}]
					},
					{
						bg: './static/brand/gjdqg.png',
						jxList: ['./static/brand/faguof.png'],
						pList: [{
							name: '韩国馆',
							text: ['韩流风暴', '席卷全球'],
							img: './static/brand/hanguo.png',
							
						}, {
							name: '美国馆',
							text: ['玩转纽约时髦派'],
							img: './static/brand/meiguo.png',
							
						}]
					}
				],
				pList: [{
						img: './static/brand/pr5.png',
						title: 'Swarovski 施华洛世奇 女士Iconic Swan黑天鹅…',
						money: '880.00',
						goodsId:'lxgoods9820180813169898400',
					}, {
						img: './static/brand/pr6.png',
						title: 'FILA斐乐手表男女情侣表时尚潮流运动大表盘腕表石英表162',
						goodsId:'lxgoods9820180803440469796',
						money: '669.00'
					}, {
						img: './static/brand/pr3.png',
						title: 'ESTĒE LAUDER 雅诗兰黛 小棕瓶面部精华 特...',
						goodsId:'lxgoods9820180801304655402',
						money: '688.00'
					}, {
						img: './static/brand/pr4.png',
						title: 'Blackmores 深海鱼油软胶囊400粒澳佳宝欧米...',
						goodsId:'lxgoods9820180814865643230',
						money: '196.00'
					}, {
						img: './static/brand/pr1.png',
						title: '三倍透气纸尿裤NB90【4包套装】',
						goodsId:'lxgoods9820180803438651190',
						money: '40.00',
					}, {
						img: './static/brand/pr2.png',
						title: '爽肤水化妆水肌水乳润滋养露400ml',
						goodsId:'lxgoods9820180803324074100',
						money: '40.00'
					},
					{
						img: './static/brand/pr7.png',
						title: 'ESTĒE LAUDER 雅诗兰黛 小棕瓶面部精华 特...',
						goodsId:'lxgoods9820180801304655402',
						money: '688.00'
					},
					{
						img: './static/brand/pr8.png',
						title: 'Blackmores 深海鱼油软胶囊400粒澳佳宝欧米...',
						goodsId:'lxgoods9820180814865643230',
						money: '196.00'
					}
				],
				jxList: [
					'./static/brand/jx1.png',
					'./static/brand/jx1.png',
					'./static/brand/jx1.png',
				]
			}
		},
		methods: {}
	}
</script>

<style lang="less" scoped>
	.global-box {
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
			height: 2.81rem;
			overflow: hidden;
			img {
				width: 100%;
				height: auto;
				display: block;
			}
		}
		.trait-box {
			height: 0.94rem;
			display: flex;
			background-color: white;
			div {
				width: 25%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				img {
					width: 0.32rem;
					height: 0.32rem;
					margin-right: 0.05rem;
				}
				p {
					font-size: 0.24rem;
					font-family: PingFangSC-Regular;
					color: rgba(115, 134, 173, 1);
				}
			}
		}
		.choicest-box {
			margin: 0.20rem;
			background-color: white;
			display: flex;
			.left {
				width: 2.84rem;
				height: 3.90rem;
				margin-right: 0.10rem;
				position: relative;
				.swiper-inner {
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translate(-50%, -0.22rem);
					width: 2.30rem;
					height: 2.30rem;
					.swiper-slide {
						width: 2.30rem!important;
						height: 2.30rem!important;
						img {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
			.right {
				flex: 1;
				.one {
					height: 50%;
					padding-top: 0.22rem;
					padding-left: 0.10rem;
					position: relative;
					box-sizing: border-box;
					.lf {
						p:nth-child(1) {
							font-size: 0.28rem;
							font-family: PingFangSC-Medium;
							color: rgba(26, 38, 66, 1);
						}
						p:nth-child(2),
						p:nth-child(3) {
							font-size: 0.22rem;
							font-family: PingFangSC-Regular;
							color: rgba(144, 162, 199, 1);
						}
					}
					.rg {
						position: absolute;
						right: 0.47rem;
						bottom: 0.16rem;
						img {
							width: 1.40rem;
							height: 1.40rem;
						}
					}
				}
				.one:nth-child(1) {
					border-bottom: 1px solid rgba(216, 223, 240, 1);
				}
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
		.pro-allbox {
			padding-bottom: 0.20rem;
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
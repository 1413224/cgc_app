<template>
	<section class="global-box">
		<settingHeader :title="title"></settingHeader>
		<div class="search-box">
			<img :src="'./static/images/ss.png'" />
			<input type="text" readonly="readonly" placeholder="搜索" />
		</div>
		<div class="banner-box">
			<img :src="'./static/brand/shop_banner1.png'" />
		</div>
		<qyp-nav :icocont="icocont"></qyp-nav>
		<!-- <div class="trait-box">
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
		</div> -->

		<div class="guan-box">
			<div v-for="(item,index) in gList">
				<img @click="toIndex(index)" :src="item" />
			</div>
		</div>

		<div class="title-box">精品推荐</div>
		<div v-for="(item,index) in sList">
			<div class="content-box" :style="{backgroundImage: 'url('+ item.bgImg +')',backgroundSize: 'cover',backgroundrRepeat: 'no-repeat'}">
				<div class="middle" @click="toStoreDetails(item.enterpriseId)">
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
					<swiper-slide v-for="(i,index) in item.zstList" :key="index" @click.native="toGoodsDetails(i.goodsId)">
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
	import qypNav from '../../components/qypnav.vue'
	export default {
		components: {
			settingHeader,
			swiper,
			swiperSlide,
			qypNav
		},
		data() {
			return {
				title: '全球海外馆',
				swiperOption: {
					slidesPerView: 'auto',
					autoplay: false
				},
				icocont:[
					{icourl:'./static/shop/js48.png',icoText:'急速发货'},
					{icourl:'./static/shop/shwy.png',icoText:'售后无忧'},
					{icourl:'./static/shop/zpbz.png',icoText:'正品保障'},
					{icourl:'./static/shop/hwzy.png',icoText:'海外直邮'}
				],
				jxList: [
					'./static/brand/jx1.png',
					'./static/brand/jx1.png',
					'./static/brand/jx1.png',
				],
				gList: [
					'./static/brand/hgguan.png',
					'./static/brand/rbguan.png',
					'./static/brand/oxguan.png',
					'./static/brand/mgguan.png',
					'./static/brand/jndguan.png',
					'./static/brand/dgguan.png',
					'./static/brand/ydlguan.png',
					'./static/brand/fgguan.png',
					'./static/brand/ygguan.png'
				],
				sList: [{
					id: 1,
					bgImg: './static/brand/hl_bg.png',
					logo: './static/brand/hl.png',
					text1: 'SWAROVSKI 施华洛世奇',
					text2: '列支敦士登｜探索当季闪耀新品',
					jgImg: './static/brand/dg.png',
					enterpriseId:'enterBasic628084787600000001',
					zstList: [{
							name: 'DUO恶魔之眼项链时尚气质女短...',
							money: '990',
							img: './static/brand/hl_pr1.png',
							goodsId:'lxgoods9820180813297839726'
						},
						{
							name: 'ICONIC SWAN项链 时尚黑天鹅...',
							money: '880',
							img: './static/brand/hl_pr2.png',
							goodsId:'lxgoods9820180813169898400'
							
						},
						{
							name: '白色仿水晶珍珠可变造型女士耳钉...',
							money: '564',
							img: './static/brand/hl_pr3.png',
							goodsId:'lxgoods9820180813550956459'
						},
						{
							name: 'Swarovski施华洛世奇手链 玫瑰金...',
							money: '598',
							img: './static/brand/hl_pr4.jpg',
							goodsId:'lxgoods9820180814221615770'
						}
					]
				}, {
					id: 2,
					bgImg: './static/brand/xne_bg.png',
					logo: './static/brand/xne.png',
					text1: 'CHANEL 香奈儿',
					text2: '法国｜独一无二精致工艺',
					jgImg: './static/brand/fg.png',
					enterpriseId:'enterBasic150521084500000001',
					zstList: [{
							name: '蔚蓝男士淡香水50ml清新古龙香...',
							money: '558',
							img: './static/brand/xne_pr1.png',
							goodsId:'lxgoods9820180803976672974'
						},
						{
							name: '邂逅柔情清新淡香水女士发香雾淡...',
							money: '665',
							img: './static/brand/xne_pr2.png',
							goodsId:'lxgoods9820180803326878803'
						},
						{
							name: '嘉柏丽尔香水花香调女士香氛50m...',
							money: '859',
							img: './static/brand/xne_pr3.png',
							goodsId:'lxgoods9820180803779357838'
						},
						{
							name: '可可小姐黑色女士香水50ml 100...',
							money: '884',
							img: './static/brand/xne_pr4.png',
							goodsId:'lxgoods9820180803747529109'
						}
					]
				}, {
					id: 3,
					bgImg: './static/brand/ysld_bg.png',
					logo: './static/brand/ysld.png',
					text1: 'Estee Lauder 雅诗兰黛',
					text2: '美国｜雅诗兰黛让每位女性皆...',
					jgImg: './static/brand/mg.png',
					enterpriseId:'enterBasic899471964700000001',
					zstList: [{
							name: '小棕瓶眼霜 肌透修护眼部精华...',
							money: '435',
							img: './static/brand/ysld_pr1.png',
							goodsId:'lxgoods9820180814337581816'
						},
						{
							name: 'dw持妆粉底液30ml 补水防晒 保...',
							money: '390',
							img: './static/brand/ysld_pr2.png',
							goodsId:'lxgoods9820180814494850039'
						},
						{
							name: '小棕瓶面部精华特润修护肌透精华...',
							money: '688',
							img: './static/brand/ysld_pr3.png',
							goodsId:'lxgoods9820180801304655402'
						},
						{
							name: '红石榴泡沫洁面乳125ml 深层清...',
							money: '228',
							img: './static/brand/ysld_pr4.png',
							goodsId:'lxgoods9820180814798382929'
						}
					]
				}, {
					id: 4,
					bgImg: './static/brand/sw_bg.png',
					logo: './static/brand/sw.png',
					text1: 'Swisse',
					text2: '澳大利亚｜宗旨是帮助人们生...',
					jgImg: './static/brand/odly.png',
					enterpriseId:'enterBasic170343000700000001',
					zstList: [{
							name: '钙片+维生素D柠檬酸150片成人...',
							money: '128',
							img: './static/brand/sw_pr1.png',
							goodsId:'lxgoods9820180814844197636'
						},
						{
							name: '高浓缩蔓越莓胶囊30粒高浓度PAC...',
							money: '199',
							img: './static/brand/sw_pr2.png',
							goodsId:'lxgoods9820180814273614666'
						},
						{
							name: '鱼油胶囊 澳洲进口深海鱼油胶囊...',
							money: '283',
							img: './static/brand/sw_pr3.png',
							goodsId:'lxgoods9820180814865643230'
						},
						{
							name: '大豆卵磷脂胶囊 澳洲进口卵磷...',
							money: '265',
							img: './static/brand/sw_pr4.png',
							goodsId:'lxgoods9820180814867857421'
						}
					]
				}]
			}
		},
		methods: {
			toIndex(index) {
				this.$router.push({
					path: '/brand/index',
					query: {
						'index': index
					}
				})
			},
			toGoodsDetails(goodsId) {
				var _this = this
				_this.$router.push({
					path: '/multi_user_mall/commodity_details',
					query: {
						goodsId: goodsId
					}
				})
			},
			toStoreDetails(id) {
				this.$router.push({
					path: '/multi_user_mall',
					query: {
						id: id
					}
				})
			},
		}
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
		/* .trait-box {
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
		} */
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
			height: 1.48rem;
			line-height: 1.48rem;
			text-align: center;
			font-size: 0.38rem;
			font-family: PingFangSC-Regular;
			color: rgba(34, 34, 34, 1);
			background: rgba(255, 255, 255, 1);
			margin-top: 0.20rem;
		}
		.guan-box {
			display: flex;
			justify-content: space-between;
			flex-flow: wrap;
			div {
				width: 2.48rem;
				height: 2.48rem;
				margin-bottom: 0.03rem;
				img {
					width: 100%;
					height: 100%;
				}
			}
		}
		.content-box {
			height: 2.7rem;
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
			padding: 0.10rem 0rem 0.20rem 0.20rem;
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
	}
</style>
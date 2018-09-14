<template>
	<section id="appIndex">
		<div class="wrapper" ref="wrapper">
			<div class="content">
				<div class="index-top">
					<swiper :options="swiperOption" class="swiper">
						<swiper-slide v-for="(item, index) in demoList" :key="index">
							<a v-if="item.wbu" @click="goUrl(item.url)">
								<img :src="item.img">
							</a>
							<router-link v-else :to="item.url">
								<img :src="item.img">
							</router-link>
						</swiper-slide>
						<div class="swiper-pagination" slot="pagination"></div>
					</swiper>
					<!-- <div class="swiperTop" @click="$router.push({path:'/multi_user_mall/search'})">
						<div>
							<img :src="'./static/images/ss2.png'" />
							<input type="text" readonly="readonly" placeholder="搜索你想要的" />
						</div>
					</div> -->
				</div>

				<div class="notice">
					<img :src="'./static/index/index_notice.png'" alt="">
					<div style="padding-left: 0.16rem">
						<marquee>
							<marquee-item v-for="(item,index) in articleList" :key="index" @click.native="goArticleDetail(item.articleId)" :duration='3000' class="align-middle">{{item.title}}</marquee-item>
						</marquee>
					</div>
					<router-link to="/member/article/index">
						<i class="icon iconfont icon-arrow-right "></i>
					</router-link>
				</div>

				<div class="auto-img">
					<img :src="'./static/index/index_lm.png'" alt="">
				</div>

				<section>
					<div class="navigation">
						<ul>
							<li v-for="(item, index) in navList" :key="index">
								<router-link :to="item.url">
									<div class="li-box">
										<img :src="item.img">
									</div>
									<p>{{item.title}}</p>
								</router-link>
								<div class="nav_tip" v-if="item.tip">{{item.tip}}</div>
							</li>
						</ul>
					</div>
				</section>

				<div class="store-allbox" v-for="(item,index) in proList" :key="index">
					<div class="titlebox" v-if="item.title">{{item.title}}</div>
					<div class="auto-img" @click="$router.push({path:'/share/storelist'})">
						<img :src="item.img" />
					</div>
					<div class="pro-box">
						<div :class="{'vux-1px-r':index != 2}" v-for="(i,index2) in item.pro" :key="index2" @click="toStoreDetails(index,i,index2)">
							<p>{{i.name}}</p>
							<p :class="[{'red':i.color == 'red'},{'yollow':i.color == 'yollow'},{'blue':i.color == 'blue'}]">{{i.tip}}</p>
							<span class="img-box">

								<img :src="i.img" v-if="i.wbu">
								<img v-else :src="i.img" alt="" />
							</span>
						</div>
					</div>
				</div>
				<div class="pro-allbox">
					<div class="titlebox">优质好货</div>
					<div class="item-box">
						<div class="item" v-for="(item,index) in caiList" :key="index" @click="toGoodsDetails(item.goodsId)">
							<div class="po-img">
								<img v-if="item.dh" :src="'./static/index/xydh.png'" alt="">
								<img v-if="item.gm" :src="'./static/index/xygm.png'" alt="">
							</div>
							<div class="da-box">
								<img :src="item.img" alt="" />
							</div>
							<p class="title">{{item.title}}</p>
							<p class="price"><span class="jg" v-if="item.money">¥ {{item.money}}</span><span class="zf" v-if="item.zf"><span v-if="item.money"> + </span>{{item.zf}} <span class="f20">积分</span></span>
							</p>
						</div>
					</div>
					<div class="shuaxin" @click="$router.push({path:'/share/storelist'})">查看更多</div>
				</div>
				<!--<div class="lottery">
					<img class="auto-img" src="../assets/images/index/group.png" alt="">
					<div class="info">
						<p class="infoText">
							<img src="../assets/images/index/time.png" alt="" class="fl">
							<span class="core fl">恭喜500人获得<span class="orange">5000元</span>大奖</span>
							<router-link to="/draw/review">
								<span class="past fr">往期</span>
							</router-link>
						</p>
						<div class="avatar">
							<div class="row" v-for="(item,index) in num">
								<div class="persol">
									<img v-lazy="'./static/index/'+index+'.png'" alt="" class="fl">
									<div class="fl">
										<p class="persolName">{{item}}</p>
										<p class="persolPrice">5000元</p>
									</div>
									<div class="clear"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<router-link to="">
					<img class="auto-img" v-lazy="'./static/images/IMG_3224 Copy@2x.png'" alt="" />
				</router-link>-->
				<!-- <div class="plate">
					<div class="item" v-for="(item,index) in plateList" :key="index">
						<router-link :to="item.url">
							<div class="b-w">
								<img v-lazy="item.img" />
								<div>
									<p>{{item.title}}</p>
									<p>{{item.tip}}</p>
								</div>
							</div>
						</router-link>
					</div>
				</div>
				 -->
				<!--<div class="alliance">
					<card>
						<div slot="content" class="card-demo-flex">
							<div class="item" :class="{'vux-1px-r':index != 2}" v-for="(item,index) in allianceList">
								<img v-lazy="item.img" />
								<span>{{item.title}}</span>
							</div>
						</div>
					</card>
				</div>-->
				<!--<div>
					<router-link to="/share">
						<img class="auto-img mt20" v-lazy="'./static/index/share.png'" alt="" />
					</router-link>
					<router-link to="/share">
						<img class="auto-img mt20" v-lazy="'./static/index/wfg.png'" alt="" />
					</router-link>
					<img class="auto-img mt20" v-lazy="'./static/images/mxqy2.png'" alt="" />
					<img class="auto-img mt20" v-lazy="'./static/images/gmdq.png'" alt="" />
					<img class="auto-img mt20" v-lazy="'./static/images/hxmkl2.png'" alt="" />
					<img class="auto-img mt20" v-lazy="'./static/images/hdjt.png'" alt="" />
					<img class="auto-img mt20" v-lazy="'./static/images/mz2.png'" alt="" />
					<img class="auto-img mt20" src="../../static/images/mxqy2.png" alt="" />
					<img class="auto-img mt20" src="../../static/index/gmdq.png" alt="" />
					<img class="auto-img mt20" src="../../static/index/hxmkl.png" alt="" />
					<img class="auto-img mt20" src="../../static/index/hdjt.png" alt="" />
					<img class="auto-img mt20" src="../../static/index/mz.png" alt="" />
					<img class="auto-img mt20" src="../../static/images/index1.png" alt="" />
					<img class="auto-img mt20" src="../../static/images/index2.png" alt="" />
					<img class="auto-img mt20" src="../../static/images/index3.png" alt="" />
					<img class="auto-img mt20" src="../../static/images/index4.png" alt="" />
					<img class="auto-img mt20" src="../../static/images/index5.png" alt="" />
				</div>-->
			</div>
		</div>
		<!--<button @click="goPay()">支付页</button>-->
	</section>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import { Card, Marquee, MarqueeItem } from 'vux'
	import BScroll from 'better-scroll'
	import url from '../config/url'
	import Qs from 'qs'
	//	import AMap from 'AMap'
	export default {
		data() {
			return {
				num: ['郁先生', '孔先生', '杨先生', '汤女士', '朱先生', '杜先生', '赵先生', '尹先生', '顾先生', '昂女士', '金女士', '张先生', '赵先生', '邹先生', '张女士'],
				address: '',
				swiperOption: {
					pagination: {
						el: '.swiper-pagination'
					},
					autoplay: true,
					loop: true
				},
				noticeOption: {
					direction: 'vertical',
					autoplay: true,
					loop: true
				},
				caiList: [{
						img: './static/index/index_pro1.jpg',
						title: '宝树行 轩尼诗xo700mL Hennessy',
						money: '480.00',
						goodsId: 'lxgoods9820180801104043382',
						zf: '588.00',
						dh: true,
					}, {
						img: './static/index/index_pro2.jpg',
						title: '法国原瓶进口红酒 拉菲古堡 法国1855列级名庄 大拉菲 1982年份 正牌 RP100',
						money: '52.00',
						goodsId: 'lxgoods9820180801551017806',
						zf: '1888.00',
						gm: true
					},
					{
						img: './static/index/index_pro3.png',
						title: 'Swarovski 施华洛世奇 女士Iconic Swan黑天鹅',
						money: '880.00',
						goodsId: 'lxgoods9820180813169898400',
						zf: ''
					}, {
						img: 'http://domain.cgc999.com:8080/group1/M00/00/4E/rBL0CFtj_OGACJ1kAABU2IA7fSM913.jpg',
						title: 'FILA斐乐手表男女情侣表时尚潮流运动大表盘腕表石英表162',
						goodsId: 'lxgoods9820180803440469796',
						money: '669.00',
						zf: ''
					},
					{
						img: './static/index/index_pro5.png',
						title: 'ESTĒE LAUDER 雅诗兰黛 小棕瓶面部精华',
						money: '688.00',
						goodsId: 'lxgoods9820180801304655402',
						zf: ''
					},
					{
						img: './static/index/index_pro6.png',
						title: 'Blackmores 深海鱼油软胶囊400粒澳佳宝欧米',
						money: '196.00',
						goodsId: 'lxgoods9820180814865643230',
						zf: ''
					}
				],
				demoList: [
					//				    {
					//						img: './static/index/lt.png',
					//						url: 'http://www.cgc999.com/app/index.php?i=7&c=entry&m=mx_shop&do=mobile&r=page_detail&pid=8',
					//						wbu: true
					//					},
					{
						img: './static/index/index_banner0.png',
						url: 'http://www.zhscjyw.net/app/index.php?i=2&c=entry&m=ewei_shopv2&do=mobile&r=diypage&id=19',
						wbu: true
					},
					{
						img: './static/index/index_banner1.png',
						url: '/member/vip/right'
					},
					{
						img: './static/index/index_banner2.png',
						url: '/member/vip/index'
					},
					{
						img: './static/index/index_banner3.png',
						url: '/draw'
					}
				],
				plateList: [{
						title: '扫一扫',
						tip: '赢5000大奖',
						img: './static/images/zqm2.png',
						url: '/member/purse/qrcode'
					},
					{
						title: '推广码',
						tip: '赢5000大奖',
						img: './static/images/tgm.png',
						url: '/member/purse/qrcode'
					}
				],

				navList: [{
						title: '抽奖中心',
						img: './static/index/index_nav1.png',
						url: '/draw',
						tip: '5000大奖'
					},
					{
						title: '邀请有奖',
						img: './static/index/index_nav2.png',
						url: "/member/purse/qrcode?index=1"
					},
					{
						title: '推广助手',
						img: './static/index/index_nav3.png',
						url: '/member/generalize/index'
					},
					{
						title: '我的优惠券',
						img: './static/index/index_nav6.png',
						url: '/member/coupon/index'
					},
					{
						title: '积分充值',
						img: './static/index/index_nav5.png',
						url: '/member/purse/recharge',
						tip: '充值有礼'
					},
					{
						title: '大牌好货',
						img: './static/index/index_nav9.png',
						url: '/brand/famous'
					},
					{
						title: '海外购',
						img: './static/index/index_nav10.png',
						url: '/brand/shop'
					},
					{
						title: '优质企业',
						img: './static/index/index_nav7.png',
						url: '/share/storelist'
					},
					{
						title: '会员权益',
						img: './static/index/index_nav4.png',
						url: '/member/vip/index'
					},
					{
						title: '我的资产',
						img: './static/index/index_nav8.png',
						url: '/member/purse/wallet'
					},
				],
				allianceList: [{
						title: '本地服务',
						img: './static/images/alliance1.png'
					},
					{
						title: '本地商圈',
						img: './static/images/alliance2.png'
					},
					{
						title: '加盟合作',
						img: './static/images/alliance3.png'
					},
				],
				proList: [{
					img: './static/index/index_shop.png',
					pro: [{
							name: '中国臻品',
							tip: '华为P20新品发售',
							img: './static/index/shouji.png',
							color: 'red',
							url: '/prc/index'
						},
						{
							name: '全球热门',
							tip: '美国蔻驰贝壳包',
							img: './static/index/baobao.png',
							color: 'blue',
							url: '/brand/shop'
						},
						/*{
							name: '国际品牌',
							tip: 'JAYJUN补水面膜',
							img: './static/index/mianmo.png',
							color: 'red',
							url: '/brand/famous',
							
						},*/
						{
							name: '中华水产',
							tip: '天天生鲜全国配送',
							img: './static/index/shui1.png',
							color: 'red',
							url: 'http://www.zhscjyw.net/app/index.php?i=2&c=entry&m=ewei_shopv2&do=mobile&r=diypage&id=19',
							wbu: true
						}
					]
				}, {
					title: '优质企业',
					img: './static/index/index_store.png',
					pro: [{
							name: '国美',
							tip: '享生活 尚国美',
							img: './static/index/guomei.png',
							id: 'enterBasic2018071600000564'
						},
						{
							name: '红星美凯龙',
							tip: '全球家居生活广场',
							img: './static/index/hxmkl2.png',
							id: 'enterBasic2018071600000565'
						},
						{
							name: '魅族',
							tip: '百台手机疯狂送',
							img: './static/index/meizu.png',
							id: ''
						}
					]
				}],
				articleList: [],
			}
		},
		created() {

		},
		mounted() {

			this.onLoadArticle()

		},

		methods: {
			toGoodsDetails(goodsId) {
				var _this = this
				_this.$router.push({
					path: '/multi_user_mall/commodity_details',
					query: {
						goodsId: goodsId
					}
				})
			},
			goUrl(url) {
				window.location.href = url
			},
			goPay() {
				this.$router.push({
					path: '/member/pay/wxgzhpay'
				})
			},
			onLoadArticle() {
				let _this = this
				/*_this.$http.post(url.article.getArticleLists).then((res) => {
					if(res.status == 200 && res.data != null) {

						_this.articleList = res.data.result.lists
						// console.log(_this.articleList)
					} else {
						Vue.$vux.toast.show({
							text: "请求快讯失败",
							type: 'text',
							position: 'middle',
							width: '50%'
						})
					}

				}).catch((err) => {
					console.log(err);
				});*/
				_this.$http.get(_this.url.user.getLists,{
					params:{
						type:1,
						curPage:1,
						pageSize:10
					}
				}).then((res) => {
					if(res.status == 200) {

						_this.articleList = res.data.data.list
						// console.log(_this.articleList)
					} else {
						Vue.$vux.toast.show({
							text: "请求快讯失败",
							type: 'text',
							position: 'middle',
							width: '50%'
						})
					}

				}).catch((err) => {
					console.log(err);
				});
			},
			goArticleDetail(uri) {
				// window.location.href = uri;
				this.$router.push({
					path:'/member/article/detail',
					query:{
						id:uri
					}
				})
			},
			toStoreDetails(index, item,index2) {
				console.log(index2)
				if(index == 0) {
					if(index2!=2) {
						this.$router.push({
							path: item.url,
						})
					}else{
						window.location.href = item.url
					}
				} else {
					this.$router.push({
						path: '/multi_user_mall',
						query: {
							id: item.id
						}
					})
				}
			},
		},
		components: {
			swiper,
			swiperSlide,
			Marquee,
			MarqueeItem,
			Card
		},
	}
</script>
<style lang="less" scoped>
	@import '~vux/src/styles/1px.less';
	#appIndex {
		background-color: #F5F8F9;
		overflow-x: hidden;
		padding-bottom: 1rem;
		.auto-img {
			/*padding: 0 0.08rem;*/
			img {
				width: 100%;
				height: auto;
				display: block
			}
		}
		.mt20 {
			margin-top: 0.22rem;
		}
		/*banner顶部*/
		.swiperTop {}
		/*通告模块*/
		.notice {
			width: 100%;
			height: 0.8rem;
			padding: 0rem 0.30rem;
			background-color: #fff;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 0.2rem;
			font-family: PingFangSC-Light;
			color: #425884;
			font-size: 0.24rem;
			box-sizing: border-box;
			.vux-marquee {
				width: 5rem !important;
				line-height: 32px;
				font-size: 0.26rem;
				font-family: PingFangSC-Regular;
				color: rgba(26, 38, 66, 1);
				.align-middle {
					// display: inline-block;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
			img {
				width: 0.76rem;
				height: 0.38rem;
				border-right: 1px solid #E1E1E1;
				padding-right: 0.21rem;
			}
			i {
				margin-left: 0.3rem;
				font-size: 0.5rem;
				color: #90A2C7;
			}
		}
		/*抽奖模块*/
		.lottery {
			background-color: #FF9304;
			padding-bottom: 0.1rem;
			margin-bottom: 0.29rem;
			img {
				width: 100%;
				height: 2.7rem;
			}
			.info {
				width: 7.3rem;
				margin: 0 auto;
				.infoText {
					width: 100%;
					height: 0.8rem;
					line-height: 0.8rem;
					background-color: #FFF609;
					img {
						width: 0.68rem;
						height: 0.28rem;
						margin-left: 0.54rem;
						margin-top: 0.26rem;
						margin-right: 0.3rem;
					}
					.core {
						margin-top: 0.16rem;
						padding-left: 0.12rem;
						display: inline-block;
						height: 0.5rem;
						line-height: 0.5rem;
						border-left: 1px solid #FF9304;
						font-size: 0.26rem;
						color: #000;
						font-family: PingFangSC-Regular;
						.orange {
							color: #F32D37;
						}
					}
					.past {
						width: 1rem;
						height: 0.5rem;
						background-color: #FF7B11;
						line-height: 0.5rem;
						text-align: center;
						font-size: 0.24rem;
						margin-top: 0.14rem;
						color: #fff;
						margin-right: 0.22rem;
						border-radius: 0.06rem;
					}
				}
			}
			.avatar {
				background-color: #fff;
				display: flex;
				flex-wrap: wrap;
				.row {
					display: flex;
					width: 33.333%;
					height: 1.2rem;
					padding: 0.1rem 0;
					border-bottom: 1px solid #EDEFF3;
					.persol {
						flex: 1;
						border-right: 1px solid #EDEFF3;
						display: flex;
						align-items: center;
						justify-content: center;
						img {
							width: 0.66rem;
							height: 0.66rem;
							border-radius: 50%;
							margin-right: 0.14rem;
						}
						.fl {
							.persolName {
								font-size: 0.24rem;
								line-height: 0.33rem;
								color: #666666;
							}
							.persolPrice {
								font-size: 0.28rem;
								line-height: 0.4rem;
								color: #F84646;
								font-weight: 700;
							}
						}
					}
				}
			}
		}
		/*入口模块*/
		.plate {
			padding: 0 0.3rem;
			margin-bottom: 0.2rem;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			font-family: PingFangSC-Medium;
			.item {
				width: 50%;
				padding: 0.05rem;
				box-sizing: border-box;
				.b-w {
					height: 1.2rem;
					display: flex;
					align-items: center;
					justify-content: flex-start;
					padding-left: 0.4rem;
					background: rgba(255, 255, 255, 1);
					box-shadow: 0px 2px 4px 0px rgba(144, 162, 199, 0.2);
					img {
						width: 0.7rem;
						height: 0.7rem;
						margin-right: 0.2rem;
					}
					p:nth-child(1) {
						font-size: 0.32rem;
						color: rgba(26, 38, 66, 1);
					}
					p:nth-child(2) {
						font-size: 0.24rem;
						color: rgba(144, 162, 199, 1);
					}
				}
			}
			.item:nth-child(1) {
				.b-w>div>p:nth-child(2) {
					color: #F23030!important;
				}
			}
		}
		.navigation {
			width: 100%;
			margin: 0.2rem 0;
			background: white;
			ul {
				padding: 0.42rem 0.26rem;
				display: flex;
				flex-wrap: wrap;
				box-sizing: border-box;
				li:nth-child(-n+5) {
					margin-bottom: 0.27rem;
				}
				li {
					width: 20%;
					position: relative;
					a {
						position: relative;
						display: flex;
						align-items: center;
						justify-content: center;
						flex-direction: column;
						.li-box {
							position: relative;
							width: 0.88rem;
							height: 0.88rem;
							img {
								width: 100%;
								height: auto;
							}
							.new {
								position: absolute;
								right: -3px;
								top: -2px;
							}
							.new-account {
								position: absolute;
								right: -28px;
								top: -2px;
							}
						}
						p {
							font-size: 0.24rem;
							font-family: PingFangSC-Light;
							color: rgba(26, 38, 66, 1);
							margin-top: 0.15rem;
						}
					}
					.nav_tip {
						position: absolute;
						top: 0%;
						left: 50%;
						transform: translate(-50%, -50%);
						width: 0.75rem;
						height: 0.28rem;
						text-align: center;
						padding: 0 0.03rem;
						background: linear-gradient(-90deg, rgba(249, 95, 97, 1), rgba(253, 106, 72, 1));
						border-radius: 12px;
						border: 1px solid rgba(255, 255, 255, 1);
						font-size: 0.16rem;
						font-family: PingFangSC-Semibold;
						color: rgba(255, 255, 255, 1);
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
			}
		}
		/*联盟模块*/
		.alliance {
			height: 1.2rem;
			.card-demo-flex {
				display: flex;
				padding: 0.4rem;
			}
			.card-demo-flex>.item {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				img {
					width: 0.36rem;
					height: auto;
					margin-right: 0.12rem;
				}
				span {
					font-size: 0.28rem;
					color: rgba(26, 38, 66, 1);
				}
			}
		}
		.pro-allbox {
			/*标题*/
			.titlebox {
				height: 1.02rem;
				line-height: 1.02rem;
				text-align: center;
				background-color: white;
				font-size: 0.38rem;
				font-family: PingFangSC-Regular;
				color: rgba(26, 38, 66, 1);
				margin-top: 0.2rem;
				span {
					font-size: 0.28rem;
					font-family: PingFangSC-Regular;
					color: rgba(119, 119, 119, 1);
				}
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
			.shuaxin {
				width: 100%;
				height: 0.88rem;
				line-height: 0.88rem;
				font-size: 0.28rem;
				text-align: center;
				font-family: PingFangSC-Regular;
				color: rgba(119, 119, 119, 1);
				background: rgba(255, 255, 255, 1);
			}
		}
		.store-allbox {
			/*标题*/
			.titlebox {
				height: 1.02rem;
				line-height: 1.02rem;
				text-align: center;
				background-color: white;
				font-size: 0.38rem;
				font-family: PingFangSC-Regular;
				color: rgba(26, 38, 66, 1);
				margin-top: 0.2rem;
				span {
					font-size: 0.28rem;
					font-family: PingFangSC-Regular;
					color: rgba(119, 119, 119, 1);
				}
			}
			.look {
				margin-top: 0!important;
			}
			/*商品*/
			.pro-box {
				display: flex;
				background: white;
				div {
					flex: 1;
					text-align: center;
					font-family: PingFangSC-Regular;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					height: 3rem;
					p:nth-child(1) {
						font-size: 0.32rem;
						color: rgba(26, 38, 66, 1);
					}
					p:nth-child(2) {
						font-size: 0.24rem;
						color: rgba(144, 162, 199, 1);
						margin: 0.1rem 0;
					}
					.yollow {
						width: 2.1rem;
						height: 0.38rem;
						line-height: 0.38rem;
						border-radius: 0px 10px 0px 10px;
						color: #F88274!important;
						border: 1px solid #FEE6E4;
					}
					.red {
						width: 2.1rem;
						height: 0.38rem;
						line-height: 0.38rem;
						border-radius: 0px 10px 0px 10px;
						color: #F37F9A!important;
						border: 1px solid #FFE0EB;
					}
					.blue {
						width: 2.1rem;
						height: 0.38rem;
						line-height: 0.38rem;
						border-radius: 0px 10px 0px 10px;
						color: #5FA9E2!important;
						border: 1px solid #CFEAFF;
					}
					.img-box {
						width: 2.48rem;
						height: 1.68rem;
						display: flex;
						align-items: center;
						justify-content: center;
						overflow: hidden;
						img {
							width: 60%;
							height: auto;
							display: block
						}
					}
				}
			}
		}
	}
</style>

<style lang='less'>
	#appIndex {
		.index-top {
			position: relative;
			.swiperTop {
				position: absolute;
				top: 13%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 6.5rem;
				height: 0.6rem;
				border-radius: 5px;
				z-index: 15;
				display: flex;
				align-items: center;
				overflow: hidden;
				div {
					width: 100%;
					height: 100%;
					position: relative;
					img {
						width: 0.32rem;
						height: 0.32rem;
						position: absolute;
						top: 50%;
						left: 34%;
						transform: translate(-50%, -50%);
					}
					input {
						width: 100%;
						height: 100%;
						text-align: center;
						font-size: 0.24rem;
						font-family: PingFangSC-Regular;
						color: rgba(255, 255, 255, 1);
						background: rgba(255, 255, 255, 0.5);
					}
					input::-webkit-input-placeholder {
						color: rgba(255, 255, 255, 1);
					}
					input:-moz-placeholder {
						color: rgba(255, 255, 255, 1);
					}
				}
			}
		}
		/*banner轮播*/
		.swiper {
			/*height: 3rem;*/
			img {
				width: 100%;
				display: block;
				/*height: 3rem;*/
			}
			.swiper-pagination-bullet {
				background: #fff!important;
				width: 8px;
				height: 2px!important;
			}
			.swiper-pagination-bullet-active {
				margin: -2px 4px!important;
				height: 4px!important;
				width: 4px!important;
				background-color: transparent!important;
				border: 2px solid #fff;
				border-radius: 50%;
			}
		}
	}
</style>
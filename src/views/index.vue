<template>
	<section id="appIndex">
		<div class="wrapper" ref="wrapper">
			<div class="content" style="padding-bottom: 0.2rem">
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
				<!--<div class="swiperTop">
					<span class="position fl">
						<img src="../assets/images/index/position.png" alt="">
						<span class="city">{{address}}</span>
					</span>
					<div class="search fr" @click="$router.push({path:'/multi_user_mall/search'})">
						<input type="text" placeholder='搜索你想要的' />
						<img src="../assets/images/index/search.png" alt="">
					</div>
				</div>-->
				<div class="notice">
					<img src="../assets/images/index/notice.png" alt="">
					<div style="padding-left: 0.15rem">
						<marquee>
							<marquee-item v-for="(item,index) in articleList" :key="index" @click.native="goArticleDetail(item.url)" :duration='3000' class="align-middle">{{item.name}}</marquee-item>
						</marquee>
					</div>
					<router-link to="/member/article/index" class=",ore">
						<i style="margin-left:0.3rem;font-size: 0.5rem;" class="icon iconfont icon-arrow-right"></i>
					</router-link>
					<!--<router-link to="/member/article/index">
						<div class="notMore">
							<img src="../assets/images/shop/turn_right.png">
						</div>
					</router-link>-->
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
							</li>
						</ul>
					</div>
				</section>

				<div>
					<router-link to="/share">
						<img class="auto-img mt20" v-lazy="'./static/index/share.png'" alt="" />
					</router-link>
					<router-link to="/share">
						<img class="auto-img mt20" v-lazy="'./static/index/wfg.png'" alt="" />
					</router-link>
					<!-- <img class="auto-img mt20" v-lazy="'./static/images/mxqy2.png'" alt="" />
					<img class="auto-img mt20" v-lazy="'./static/images/gmdq.png'" alt="" />
					<img class="auto-img mt20" v-lazy="'./static/images/hxmkl2.png'" alt="" />
					<img class="auto-img mt20" v-lazy="'./static/images/hdjt.png'" alt="" />
					<img class="auto-img mt20" v-lazy="'./static/images/mz2.png'" alt="" /> -->
					<!--<img class="auto-img mt20" src="../../static/images/mxqy2.png" alt="" />
					<img class="auto-img mt20" src="../../static/index/gmdq.png" alt="" />
					<img class="auto-img mt20" src="../../static/index/hxmkl.png" alt="" />
					<img class="auto-img mt20" src="../../static/index/hdjt.png" alt="" />
					<img class="auto-img mt20" src="../../static/index/mz.png" alt="" />-->
					<img class="auto-img mt20" src="../../static/images/index1.png" alt="" />
					<img class="auto-img mt20" src="../../static/images/index2.png" alt="" />
					<img class="auto-img mt20" src="../../static/images/index3.png" alt="" />
					<img class="auto-img mt20" src="../../static/images/index4.png" alt="" />
					<img class="auto-img mt20" src="../../static/images/index5.png" alt="" />
				</div>

				<!--<div class="pro-allbox" v-for="item in proList">
					<div class="titlebox">{{item.title}}</div>
					<img class="auto-img" v-lazy="item.img" />
					<div class="pro-box">
						<div :class="{'vux-1px-r':index != 2}" v-for="(i,index) in item.pro">
							<p>{{i.name}}</p>
							<p :class="[{'red':i.color == 'red'},{'yollow':i.color == 'yollow'},{'blue':i.color == 'blue'}]">{{i.tip}}</p>
							<img v-lazy="i.img" alt="" />
						</div>
					</div>
					<img class="auto-img" v-if="item.twoimg" v-lazy="item.twoimg" alt="" />
				</div>-->
				<!-- <div class="pro-allbox">
					<div class="titlebox">明星商家</div>
					<img style="margin-top: 0.2rem;" class="auto-img" v-lazy="'./static/images/mxqy.png'" alt="" />
					<div class="store-box">
						<div class="item-box">
							<div>
								<p>国美</p>
								<p>满100减30</p>
							</div>
							<img v-lazy="'./static/images/gm.png'" alt="" />
						</div>
						<div class="item-box">
							<div>
								<p>红豆</p>
								<p>满20减10</p>
							</div>
							<img v-lazy="'./static/images/hd.png'" alt="" />
						</div>
						<div class="item-box">
							<div>
								<p>红星美凯龙</p>
								<p>双日立减5元</p>
							</div>
							<img v-lazy="'./static/images/hxmkl.png'" alt="" /></div>
						<div class="item-box">
							<div>
								<p>魅族手机</p>
								<p>双日立减5元</p>
							</div>
							<img v-lazy="'./static/images/mz.png'" alt="" />
						</div>
					</div>
					<div class="titlebox">
						<span>查看附件商家</span>
					</div>
				</div> -->
				<!--<div class="pro-allbox">
					<div class="titlebox">猜你喜欢</div>
					<div class="cai-box">
						<div v-for="item in caiList">
							<div class="img-box"><img :src="item.img" alt="" /></div>
							<p class="one">{{item.title}}</p>
							<p class="two">{{item.tip}}</p>
						</div>
					</div>
				</div>-->
			</div>
		</div>

		<div>

			<!--购物奖励弹窗-->
			<x-dialog v-model="showNew" class="xrBox" :dialog-style="transparent">
				<div class="p_box">
					<img @click="showNew = false" class="xr_img" src="../../static/images/xr_bg.png" alt="" />

					<div class="p_content">
						<p>本次消费奖励</p>
						<p>7.20 <span>通用积分</span></p>
						<p>通用积分将自动存入您的资产余额</p>
					</div>

					<img @click="showNew = false" class="gb_img" src="../../static/images/xr_gb.png" alt="" />
				</div>
			</x-dialog>

			<!--新人奖励弹窗-->
			<x-dialog v-model="showNew2" class="zcBox" :dialog-style="transparent">
				<div class="zc_box">
					<div class="zc_content">
						<div class="item_box" v-for="(item,index) in zcList" :key="index">
							<div>
								<p>{{item.jf}}</p>
								<p>自动存入通用积分</p>
							</div>
							<div>
								<p>¥ <span>{{item.money}}</span></p>
								<p>{{item.mk}}</p>
							</div>
						</div>
						<div class="zc-btn" @click="$router.push({path:'/user/reg'})">
							立即注册
						</div>
					</div>

					<img @click="showNew2 = false" class="gb_img" src="../../static/images/xr_gb.png" alt="" />
				</div>
			</x-dialog>
		</div>
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
						img: './static/images/cai1.png',
						title: 'VANS Old Skool lite黑白超轻鞋款 黑色38.5',
						tip: '100积分+199.67元'
					},
					{
						img: './static/images/cai2.png',
						title: 'VANS Old Skool lite黑白超轻鞋款 黑色38.5',
						tip: '100积分+199.67元'
					},
					{
						img: './static/images/cai2.png',
						title: 'VANS Old Skool lite黑白超轻鞋款 黑色38.5',
						tip: '100积分+199.67元'
					},
					{
						img: './static/images/cai1.png',
						title: 'VANS Old Skool lite黑白超轻鞋款 黑色38.5',
						tip: '100积分+199.67元'
					},
				],
				demoList: [{
						img: './static/index/lt.png',
						url: 'http://www.cgc999.com/app/index.php?i=7&c=entry&m=mx_shop&do=mobile&r=page_detail&pid=4',
						wbu: true
					},
					{
						img: './static/index/syjm.png',
						url: '/member/join/index'
					},
					{
						img: './static/index/lt.png',
						url: ''
					}
					// './static/index/gmdq.png',
					// './static/index/hxmkl.png',
					// './static/index/hdjt.png',
					// './static/index/mz.png'
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
						img: './static/images/cj.png',
						url: '/draw'
					},
					{
						title: '邀请有奖',
						img: './static/images/yq.png',
						url: '/member/purse/qrcode'
					},
					{
						title: '推广助手',
						img: './static/images/tg.png',
						url: '/member/generalize/index'
					},
					// {title:'赚钱攻略',img:'./static/images/gl.png',url:'/member/strategy/index'},
					{
						title: '会员权益',
						img: './static/images/gl.png',
						url: '/member/benefits/index'
					},
					{
						title: '充值有奖',
						img: './static/images/cz.png',
						url: '/member/purse/recharge'
					},
					{
						title: '我的优惠券',
						img: './static/images/yh.png',
						url: '/member/coupon/index'
					},
					// {title:'会员权益',img:'./static/images/hy.png',url:'/member/benefits/index'},
					{
						title: '我的会员',
						img: './static/images/hy.png',
						url: '/member/vip/index'
					},
					{
						title: '我的资产',
						img: './static/images/zc.png',
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
						title: '积分热兑',
						img: './static/images/rdui.png',
						pro: [{
								name: '红五千',
								tip: '送给生命中的爱人',
								img: './static/images/pro1.png'
							},
							{
								name: '长城葡萄酒',
								tip: '送给生命中的爱人',
								img: './static/images/pro2.png'
							},
							{
								name: '五粮液',
								tip: '送给生命中的爱人',
								img: './static/images/pro3.png'
							}
						]
					},
					{
						title: '海外购',
						img: './static/images/fq.png',
						pro: [{
								name: 'JAYJUN面膜',
								tip: '樱花三部曲',
								img: './static/images/pro4.png'
							},
							{
								name: '德运脱脂奶粉',
								tip: '到港澳洲进口',
								img: './static/images/pro5.png'
							},
							{
								name: 'JBL 无线音箱',
								tip: '送给生命中的爱人',
								img: './static/images/pro6.png'
							}
						]
					},
					//										{
					//						title: '千万家庭健康计划',
					//						img: './static/images/jk.png',
					//						twoimg: './static/images/wfg.png',
					//						pro: [{
					//								name: '立即体验',
					//								tip: '高品质 良心价',
					//								img: './static/images/pro7.png',
					//								color: 'yollow'
					//							},
					//							{
					//								name: '领取优惠券',
					//								tip: '商家体验卷',
					//								img: './static/images/pro8.png',
					//								color: 'red'
					//							},
					//							{
					//								name: '招商加盟',
					//								tip: '千万家庭健康',
					//								img: './static/images/pro9.png',
					//								color: 'blue'
					//							}
					//						]
					//					}, 
					//					{
					//						title: '积分购买',
					//						img: './static/images/jf1.png',
					//						pro: [{
					//								name: 'RK 机械键盘',
					//								tip: '竞技游戏有线键盘',
					//								img: './static/images/jf2.png'
					//							},
					//							{
					//								name: '斗牛犬音箱',
					//								tip: '重低音立体声',
					//								img: './static/images/jf3.png'
					//							},
					//							{
					//								name: 'Polo男士包',
					//								tip: '轻盈包身大容量',
					//								img: './static/images/jf4.png'
					//							}
					//						]
					//					}
				],
				articleList:[],
				showNew: false, //购物奖励弹窗
				showNew2: true, //新人奖励弹窗
				zcList: [{
						jf: '通用积分',
						money: '10',
						mk: '无门槛全场使用'
					},
					{
						jf: '通用积分',
						money: '20',
						mk: '满50减10'
					},
					{
						jf: '通用积分',
						money: '30',
						mk: '无门槛全场使用'
					},
				]
			}
		},
		created() {
			var _this = this
			if(_this.$store.state.page.isLogin == 'true'){
				_this.showNew2 = false
			}else{
				_this.showNew2 = true
			}
		},
		mounted() {
			this.onLoadArticle();
		},

		methods: {
			goUrl(url) {
				window.location.href = url
			},
			onLoadArticle(){
				let _this = this
				// let parJson = {
				// 	pagesize:6,
				// 	page: 1
				// }
				// let par = Qs.stringify(parJson)
				_this.$http.post(url.article.getArticleLists).then((res) => {
					if(res.status == 200 && res.data != null){
						
						_this.articleList = res.data.result.lists
						// console.log(_this.articleList)
					}else{
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
			goArticleDetail(uri){
				window.location.href = uri;
			}
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
<style lang="less">
	.zcBox {
		.weui-dialog {
			width: 6.4rem;
			max-width: 100%;
		}
	}
</style>
<style lang="less" scoped>
	@import '~vux/src/styles/1px.less';
	#appIndex {
		background-color: #F5F6FA;
		overflow-x: hidden;
		padding-bottom: 1rem;
		.zcBox {
			.zc_box {
				.zc-btn {
					width: 5.16rem;
					height: 0.8rem;
					line-height: 0.8rem;
					background: rgba(255, 204, 9, 1);
					border-radius: 4px;
					font-size: 0.34rem;
					font-family: PingFangSC-Semibold;
					color: rgba(209, 14, 22, 1);
					margin: 0 auto;
					margin-top: 0.35rem;
				}
				.zc_content {
					position: relative;
					background: url(../../static/images/zc_bg.png) no-repeat;
					background-size: 100% 100%;
					padding: 2rem 0.2rem 0.35rem 0.2rem;
					box-sizing: border-box;
					.item_box {
						background: url(../../static/images/it_bg.png) no-repeat;
						background-size: 100% 100%;
						padding: 0.3rem;
						box-sizing: border-box;
						display: flex;
						margin-bottom: 0.2rem;
						div:nth-child(1) {
							width: 3.5rem;
							display: flex;
							flex-direction: column;
							align-items: flex-start;
							justify-content: space-between;
							p:nth-child(1) {
								font-size: 0.28rem;
								font-family: PingFangSC-Medium;
								color: rgba(15, 24, 45, 1);
							}
							p:nth-child(2) {
								font-size: 0.24rem;
								font-family: PingFangSC-Regular;
								color: rgba(115, 134, 173, 1);
							}
						}
						div:nth-child(2) {
							flex: 1;
							display: flex;
							flex-direction: column;
							align-items: center;
							justify-content: space-between;
							height: 100%;
							p:nth-child(1) {
								font-size: 0.26rem;
								font-family: PingFangSC-Regular;
								color: rgba(242, 48, 48, 1);
								span {
									font-size: 0.6rem;
									font-family: PingFangSC-Medium;
									color: rgba(242, 48, 48, 1);
								}
							}
							p:nth-child(2) {
								font-size: 0.24rem;
								font-family: PingFangSC-Regular;
								color: rgba(115, 134, 173, 1);
							}
						}
					}
					.item_box:last-child {
						margin-bottom: 0px!important;
					}
				}
				.gb_img {
					width: 0.82rem;
					height: 0.82rem;
					margin-top: 0.33rem;
				}
			}
		}
		.xrBox {
			.p_box {
				position: relative;
				.xr_img {
					width: 100%;
					height: auto;
				}
				.p_content {
					width: 100%;
					position: absolute;
					top: 49%;
					left: 50%;
					transform: translate(-50%, -50%);
					p:nth-child(1) {
						font-size: 0.28rem;
						font-family: PingFangSC-Regular;
						color: rgba(164, 113, 57, 1);
					}
					p:nth-child(2) {
						font-size: 0.68rem;
						font-family: PingFangSC-Semibold;
						color: rgba(242, 48, 48, 1);
						span {
							font-size: 0.24rem;
							font-family: PingFangSC-Regular;
							color: rgba(242, 48, 48, 1);
						}
					}
					p:nth-child(3) {
						font-size: 0.22rem;
						font-family: PingFangSC-Regular;
						color: rgba(164, 113, 57, 1);
					}
				}
				.gb_img {
					width: 0.82rem;
					height: 0.82rem;
					margin-top: 0.33rem;
				}
			}
		}
		.auto-img {
			width: 100%;
			height: auto;
			display: block
		}
		.mt20 {
			margin-top: 0.22rem;
		}
		/*banner顶部*/
		.swiperTop {
			z-index: 1000;
			width: 100%;
			height: 0.88rem;
			line-height: 0.88rem;
			position: absolute;
			top: 0;
			.position {
				margin-left: 0.42rem;
				margin-right: 0.42rem;
				img {
					width: 0.22rem;
					height: 0.28rem;
					vertical-align: middle;
				}
				.city {
					font-size: 0.24rem;
					color: #FFFFFF;
				}
			}
			.search {
				position: relative;
				text-align: right;
				padding-right: 0.5rem;
				input {
					width: 4.44rem;
					height: 0.54rem;
					border-radius: 0.27rem;
					background-color: #808080;
					color: #fff;
					padding-left: 0.64rem;
					font-size: 0.24rem;
					opacity: 0.5;
					letter-spacing: 1px;
				}
				input::-webkit-input-placeholder {
					color: #fff;
				}
				input::-moz-placeholder {
					/* Mozilla Firefox 19+ */
					color: #fff;
				}
				input:-moz-placeholder {
					/* Mozilla Firefox 4 to 18 */
					color: #fff;
				}
				input:-ms-input-placeholder {
					/* Internet Explorer 10-11 */
					color: #fff;
				}
				img {
					width: 0.32rem;
					height: 0.32rem;
					position: absolute;
					top: 0.3rem;
					left: 0.24rem;
				}
			}
		}
		/*通告模块*/
		.notice {
			width: 100%;
			height: 0.7rem;
			padding: 0.2rem 0.45rem;
			background-color: #fff;
			display: flex;
			align-items: center;
			margin-bottom: 0.2rem;
			font-family: PingFangSC-Light;
			color: rgba(66, 88, 132, 1);
			font-size: 0.24rem;
			.vux-marquee{
				width:5rem !important;
				line-height:32px;
				font-size: 14px;
				.align-middle{
					// display: inline-block;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
			img {
				float: left;
				width: 0.6rem;
				height: 0.6rem;
				border-right: 1px solid #E1E1E1;
				padding-right: 0.2rem;
			}
			.notMore {
				img {
					width: 0.25rem;
					height: 0.25rem;
					border: none;
					border-left: 1px solid #D8DFF0;
					display: inline-block;
					padding: 0.15rem 0;
					padding-left: 0.3rem;
					margin-left: 0.85rem;
				}
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
				padding: 0.26rem 0.3rem;
				display: flex;
				flex-wrap: wrap;
				box-sizing: border-box;
				li {
					width: 25%;
					margin: 0.25rem 0;
					a {
						position: relative;
						display: flex;
						align-items: center;
						justify-content: center;
						flex-direction: column;
						.li-box {
							position: relative;
							width: 0.52rem;
							height: 0.52rem;
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
							font-family: PingFangSC-Regular;
							font-size: 0.24rem;
							color: #7D7D7D;
							letter-spacing: 0;
							margin-top: 0.18rem;
						}
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
			.cai-box {
				display: flex;
				flex-wrap: wrap;
				div {
					width: 50%;
					background-color: white;
					padding: 0.31rem 0.23rem;
					box-sizing: border-box;
					.img-box {
						width: 2.4rem;
						height: 2.75rem;
						margin: 0 auto;
						display: flex;
						align-items: center;
						justify-content: center;
						img {
							width: 100%;
							height: auto;
						}
					}
					.one {
						font-size: 0.24rem;
						font-family: PingFangSC-Regular;
						color: rgba(26, 38, 66, 1);
						margin-top: 0.18rem;
					}
					.two {
						font-size: 0.32rem;
						font-family: PingFangSC-Semibold;
						color: rgba(242, 48, 48, 1);
						margin-top: 0.26rem;
					}
				}
			}
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
					p:nth-child(1) {
						font-size: 0.32rem;
						color: rgba(26, 38, 66, 1);
						margin-bottom: 0.09rem;
						margin-top: 0.3rem;
					}
					p:nth-child(2) {
						font-size: 0.24rem;
						color: rgba(144, 162, 199, 1);
						margin-bottom: 0.14rem;
					}
					.yollow {
						width: 1.67rem;
						height: 0.39rem;
						line-height: 0.39rem;
						background: rgba(245, 166, 35, 1);
						border-radius: 2px;
						margin: 0 auto;
						color: white!important;
					}
					.red {
						width: 1.67rem;
						height: 0.39rem;
						line-height: 0.39rem;
						background: rgba(242, 48, 48, 1);
						border-radius: 2px;
						margin: 0 auto;
						color: white!important;
					}
					.blue {
						width: 1.67rem;
						height: 0.39rem;
						line-height: 0.39rem;
						background: rgba(39, 135, 253, 1);
						border-radius: 2px;
						margin: 0 auto;
						color: white!important;
					}
					img {
						width: 1.5rem;
						height: auto;
					}
				}
			}
			.store-box {
				display: flex;
				flex-wrap: wrap;
				.item-box {
					width: 50%;
					height: 1.49rem;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 0.2rem;
					box-sizing: border-box;
					background: white;
					position: relative;
					div {
						p:nth-child(1) {
							font-size: 0.28rem;
							color: rgba(26, 38, 66, 1);
							font-family: PingFangSC-Medium;
						}
						p:nth-child(2) {
							font-size: 0.24rem;
							font-family: PingFangSC-Regular;
							color: rgba(144, 162, 199, 1);
							margin-top: 0.08rem;
						}
					}
					img {
						width: 1.50rem;
						height: 1.50rem;
						display: block;
					}
				}
				.item-box:before {
					content: " ";
					position: absolute;
					right: 0;
					top: 0;
					width: 1px;
					bottom: 0;
					border-right: 1px solid #C7C7C7;
					color: #C7C7C7;
					-webkit-transform-origin: 100% 0;
					transform-origin: 100% 0;
					-webkit-transform: scaleX(0.5);
					transform: scaleX(0.5);
				}
				.item-box:after {
					content: " ";
					position: absolute;
					left: 0;
					top: 0;
					right: 0;
					height: 1px;
					border-top: 1px solid #C7C7C7;
					color: #D9D9D9;
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: scaleY(0.5);
					transform: scaleY(0.5);
					left: 0px;
				}
			}
		}
	}
</style>

<style lang='less'>
	#appIndex {
		/*banner轮播*/
		.swiper {
			/*height: 3rem;*/
			img {
				width: 100%;
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
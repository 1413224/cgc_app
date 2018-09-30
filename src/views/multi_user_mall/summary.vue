<template>
	<div class="info-box">
		<settingHeader :title="title"></settingHeader>
		<div class="content-head">
			<div class="address">
				<div class="wz">
					<img :src="'./static/images/address.png'" alt="" />广州
				</div>
				<div class="search" @click="$router.push({path:'/multi_user_mall/search'})">
					<img :src="'./static/images/ss.png'" />
					<input type="text" readonly="readonly" placeholder="搜索你想要的">
				</div>
			</div>

			<swiper :options="swiperOption" class="swiper">
				<swiper-slide v-for="(item, index) in demo04_list" :key="index">
					<a v-if="item.wbu">
						<img :src="item.img">
					</a>
					<router-link v-else :to="item.url">
						<img :src="item.img">
					</router-link>
				</swiper-slide>
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>
		</div>
		<div class="wrap">
			<div class="nav2">
				<ul>
					<li @click="showProduct">
						<img src="../../assets/images/multi_user_mall/product.png">
						<p>商超连锁</p>
					</li>
					<li @click="treatment">
						<img src="../../assets/images/multi_user_mall/order.png">
						<p>酒店住宿</p>
					</li>
					<li @click="join">
						<img src="../../assets/images/multi_user_mall/join.png">
						<p>生活服务</p>
					</li>
					<li @click="seeStore">
						<img src="../../assets/images/multi_user_mall/beauty.png">
						<p>美容美发</p>
					</li>
					<li @click="goShare">
						<img src="../../assets/images/multi_user_mall/coupon.png">
						<p>威健康</p>
					</li>
				</ul>
			</div>

			<div class="banner">
				<img src="../../assets/images/share/xbanner.png" alt="">
			</div>

			<div class="area">
				<h2>优惠专区</h2>
				<div class="areaBanner">
					<div class="fl"><img src="../../assets/images/shop/i_banner.png" alt="">
						<p class="bannerTitle">周五半价日</p>
					</div>
					<div class="fr"><img src="../../assets/images/shop/index_banner.png" alt="">
						<p class="bannerTitle">人气好店铺</p>
					</div>
					<div class="clear"></div>
				</div>
				<ul>
					<li>
						<p class="areaTitle">免费</p>
						<span class="areadiscount">消费面单卷</span>
						<br>
						<img src="../../assets/images/multi_user_mall/Shape.png" alt="" class="fr">
					</li>
					<li>
						<p class="areaTitle">折扣</p>
						<span class="areadiscount">8.5折</span>
						<br>
						<img src="../../assets/images/multi_user_mall/Shape2.png" alt="" class="fr">
					</li>
					<li>
						<p class="areaTitle">霸王餐</p>
						<span class="areadiscount">超级尊贵体验</span>
						<br>
						<img src="../../assets/images/multi_user_mall/Shape3.png" alt="" class="fr">
					</li>
					<li>
						<p class="areaTitle">足疗按摩</p>
						<span class="areadiscount">积分大放送</span>
						<br>
						<img src="../../assets/images/multi_user_mall/Shape4.png" alt="" class="fr">
					</li>
				</ul>
			</div>

			<div class="fujin">
				<h2><label class="nearStore storeActive" @click="near($event)">附近商家</label> &nbsp;&nbsp;&nbsp;<label class="goodStore" @click="good($event)">优质商家</label></h2>
				<div class="list">
					<ul>
						<li class="clearfix" @click="goStoreDetail(1)" v-for="item in 20">
							<div class="left">
								<img src="../../assets/images/share/md_logo.png" alt="">
							</div>
							<div class="right">
								<p class="title">章光101（番禺店）</p>
								<p class="content ellipise">
									<span class="free">免单</span>
									<span class="return">返积分</span>
								</p>
								<p class="nr"><span class="ms_price">美容美发</span><span class="num">番禺区 2.6km</span></p>
							</div>
						</li>
					</ul>
					<p class="more" @click="seeStore">查看更多<i class="iconfont icon-arrow-right"></i></p>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import { Scroller, XButton } from 'vux'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import 'swiper/dist/css/swiper.css'
	import settingHeader from '../../components/setting_header'
	export default {
		data() {
			return {
				title: '多用户商城首页',
				demo04_list: [{
						img: './static/images/banner1.png',
						url: '',
					},
					{
						img: './static/images/banner1.png',
						url: '/member/join/index'
					},
					{
						img: './static/images/banner1.png',
						url: ''
					}
				],
				swiperOption: {
					pagination: {
						el: '.content-head .swiper-pagination'
					},
					autoplay: true,
					loop: true
				},
				swiperOption2: {
					slidesPerView: 3,
					spaceBetween: 10,
					pagination: {
						el: '.product .swiper-pagination'
					},
					clickable: true
				}
			}
		},
		components: {
			settingHeader,
			Scroller,
			XButton,
			swiper,
			swiperSlide
		},
		methods: {
			showProduct() {
				this.$router.push('/share/storelist')
			},
			join() {
				this.$router.push('/share/storelist')
			},
			treatment() {
				// this.$router.push('/share/treatment')
				this.$router.push('/share/storelist')
			},
			seeStore() {
				this.$router.push('/share/storelist')
			},
			goShare() {
				this.$router.push('/share')
			},
			goStoreDetail(id) { //go门店详情
				this.$router.push({
					path: '/multi_user_mall',
					params: {
						id: id
					}
				});
			},
			near(e) {
				document.getElementsByClassName('goodStore')[0].className = "goodStore";
				e.target.className += ' storeActive';
			},
			good(e) {
				document.getElementsByClassName('nearStore')[0].className = "nearStore";
				e.target.className += ' storeActive';
			}
		}
	}
</script>

<style lang="less" scoped>
	/*@import url('../../../static/css/global'); */
	
	.clearfix:after {
		content: "";
		display: block;
		clear: both;
	}
	
	.ellipise {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.info-box {
		.content-head {
			position: relative;
			width: 100%;
			height: 3.4rem;
			/*border: 1px solid #333;*/
			img {
				height: 3.4rem;
				width: 100%;
			}
			.address {
				height: 1rem;
				padding: 0 0.42rem;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: space-between;
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				z-index: 11;
				.wz {
					margin-right: 0.43rem;
					font-size: 0.28rem;
					font-family: PingFangSC-Regular;
					color: rgba(255, 255, 255, 1);
					display: flex;
					align-items: center;
					img {
						width: 0.22rem;
						height: auto;
						vertical-align: middle;
						margin-right: 0.08rem;
					}
				}
				.search {
					position: relative;
					flex: 1;
					img {
						width: 0.32rem;
						height: 0.32rem;
						position: absolute;
						left: 0.4rem;
						top: 50%;
						transform: translate(-50%, -50%);
					}
					input {
						width: 100%;
						background: rgba(255, 255, 255, 0.55);
						border-radius: 50px;
						font-size: 0.24rem;
						font-family: PingFangSC-Regular;
						color: white;
						height: 0.54rem;
						line-height: 0.54rem;
						vertical-align: middle;
						padding: 0rem 0.1rem 0rem 0.78rem;
						box-sizing: border-box;
					}
					input::-webkit-input-placeholder {
						color: #90A2C7 !important; // WebKit browsers 
					}
					input:-moz-placeholder {
						color: #90A2C7 !important; // Mozilla Firefox 4 to 18 
					}
					input::-moz-placeholder {
						color: #90A2C7 !important; //Mozilla Firefox 19+ /
					}
					input:-ms-input-placeholder {
						color: #90A2C7 !important; //Internet Explorer 10+ */
					}
				}
			}
		}
		.wrap {
			background: #fff;
			border-radius: 10px 10px 0 0;
			position: relative;
			padding-top: 0.4rem;
			width: 100%;
			z-index: 4;
			.nav2 {
				ul {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					li {
						width: 20%;
						text-align: center;
						img {
							width: 0.81rem;
							height: .81rem;
						}
						p {
							font-size: .2rem;
							color: #7386AD;
							margin-top: 0.15rem;
						}
					}
				}
			}
			.banner {
				/*margin-top: .34rem;*/
				border-top: 1px solid #D8DFF0;
				width: 95%;
				margin: .34rem auto 0;
				padding-top: .2rem;
				img {
					width: 100%;
					/*height: 1.5rem;*/
				}
			}
			.area {
				width: 95%;
				margin: 0 auto;
				h2 {
					font-size: .36rem;
					color: #141C33;
					font-weight: 600;
					margin-top: .4rem;
					margin-bottom: 0.2rem;
				}
				.areaBanner {
					.fl,
					.fr {
						position: relative;
						.bannerTitle {
							top: 40%;
							padding: 0.05rem 0.2rem;
							position: absolute;
							line-height: 0.44rem;
							font-size: 0.32rem;
							color: #FFFFFF;
							line-height: 0.44rem;
							height: 0.44rem;
							background: rgba(26, 38, 66, 0.79);
						}
					}
					img {
						width: 3.4rem;
						height: 1.7rem;
						border: none;
					}
				}
				ul {
					margin-top: 0.2rem;
					display: flex;
					li {
						padding-left: 0.1rem;
						padding-top: 0.1rem;
						flex: 1;
						height: 1.7rem;
						margin-right: 0.2rem;
						.areaTitle {
							font-size: 0.28rem;
							color: #1A2642;
						}
						.areadiscount {
							font-size: 0.22rem;
							color: #90A2C7;
						}
						img {
							margin-top: 0.2rem;
							margin-right: 0.2rem;
							width: 0.46rem;
							height: 0.46rem;
						}
					}
					li:nth-child(1) {
						background-color: #FEFAF6;
					}
					li:nth-child(2) {
						background-color: #FFF9FA;
					}
					li:nth-child(3) {
						background-color: #F8FCFF;
					}
					li:nth-child(4) {
						background-color: #FAF9FF;
						margin-right: 0;
					}
				}
			}
			.fujin {
				width: 95%;
				margin: .4rem auto 0;
				/*border-top: 1px solid #D8DFF0;*/
				h2 {
					font-size: .36rem;
					color: #141C33;
					font-weight: 600;
					margin-top: .4rem;
					.storeActive {
						color: #336FFF;
					}
				}
				.list {
					border-top: 1px solid #D8DFF0;
					/*border-bottom: 1px solid #D8DFF0;*/
					margin-top: .22rem;
					/*margin-bottom: 2rem;*/
					.more {
						font-weight: normal;
						color: #60719D;
						font-size: .28rem;
						vertical-align: bottom;
						text-align: center;
						display: flex;
						align-items: center;
						justify-content: center;
						i {
							font-size: 0.5rem;
						}
					}
					li {
						padding: .3rem .05rem .3rem 0;
						border-bottom: 1px solid #D8DFF0;
						.left {
							float: left;
							width: 2.04rem;
							height: 1.6rem;
							margin-right: .2rem;
							img {
								width: 100%;
								height: 100%;
							}
						}
						.right {
							float: left;
							/*border:1px solid #333;*/
							width: 4.75rem;
							.title {
								font-size: .32rem;
								color: #1A2642;
								font-weight: bold;
								margin-bottom: 0.05rem;
								.juli {
									font-size: .24rem;
									float: right;
								}
							}
							.content {
								/*color: #7386AD;*/
								/*font-size: .28rem;*/
								/*margin-top: .1rem;*/
								.free {
									display: inline-block;
									background: linear-gradient(121.4deg, rgba(94, 195, 255, 1), rgba(16, 111, 227, 1));
									border-radius: 2px;
									text-align: center;
									color: #fff;
									font-size: 0.24rem;
									padding: 2px 5px;
								}
								.return {
									display: inline-block;
									background: linear-gradient(90deg, rgba(255, 122, 128, 1), rgba(255, 83, 101, 1));
									border-radius: 2px;
									text-align: center;
									color: #fff;
									font-size: 0.24rem;
									padding: 2px 5px;
								}
							}
							.nr {
								margin-top: .1rem;
								.momey {
									font-size: .32rem;
									color: #F23030;
									font-weight: bold;
								}
								.ms_price,
								.num {
									font-size: .24rem;
									color: #7386AD;
									/*padding-left: .1rem;*/
								}
								.num {
									float: right;
									margin-top: .1rem;
								}
							}
							.zhekou {
								width: .8rem;
								height: .4rem;
								line-height: .4rem;
								text-align: center;
								border-radius: 5px;
								background: #e0e9fd;
								color: #336FFF;
								font-size: .22rem;
								margin-top: .1rem;
							}
						}
					}
				}
			}
		}
	}
</style>
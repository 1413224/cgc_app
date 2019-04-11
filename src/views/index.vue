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
					<i class="icon iconfont icon-arrow-right" @click="$router.push({path:'/member/generalize/index',query:{tabIndex:1}})"></i>
				</div>

				<div class="auto-img">
					<img v-if="thumb" :src="thumb" alt="">
					<!-- <img v-if="" :src="'./static/index/index_lm.png'" alt=""> -->
					
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
				<h2 class="haohuo">精选海外好货</h2>
				<div class="store-allbox" v-for="(item,index) in proList" :key="index">
					<!-- <div class="titlebox" v-if="item.title">{{item.title}}</div> -->
					<!-- $router.push({path:'/share/storelist'}) -->
					<div class="auto-img" @click="goYpk(item.url)">
						<img :src="item.img" />
						<!-- <img src="../assets/images/index/ypk.jpg" alt=""> -->
					</div>
					<div class="pro-box">
					<!-- @click="toStoreDetails(index,i,index2,i.url)" -->
						<div 
							:class="{'vux-1px-r':index != 2}" 
							v-for="(i,index2) in item.pro" 
							:key="index2" 
							@click="toGoodsDetails(i.goodsId)">
							<p>{{i.name}}</p>
							<p :class="[{'red':i.color == 'red'},{'yollow':i.color == 'yollow'},{'blue':i.color == 'blue'}]">{{i.tip}}</p>
							<span class="img-box">

								<img :src="i.img" v-if="i.wbu">
								<img v-else :src="i.img" alt="" />
							</span>
						</div>
					</div>
				</div>

			<!-- 品牌馆 -->
			<!-- <div class="banner-box">
				<img :src="'./static/brand/dapai.png'" />
			</div>
			<div class="top-swiper">
				<div class="swiper-inner1">
					<swiper :options="swiperOptions" class="swiper">
						<swiper-slide v-for="(item,index) in mpList" :key="index" @click.native="toStoreDetail(item.id)">
							<img :src="item.img" />
							<div class="tip">{{item.name}}</div>
						</swiper-slide>
					</swiper>
				</div>
			</div> -->
			<!-- 品牌馆end -->

			<!-- 全球馆 -->
			<!-- <div v-for="(item,index) in sList">
				<div class="content-box" :style="{backgroundImage: 'url('+ item.bgImg +')',backgroundSize: 'cover',backgroundrRepeat: 'no-repeat'}">
					<div class="middle" @click="toStoreDetail(item.enterpriseId)">
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
					<div class="waphid" @click="zanwei()"></div>
					@click.native="toGoodsDetails(i.goodsId)"
					<swiper :options="swiperOptions" class="swiper">
						<swiper-slide v-for="(i,index) in item.zstList" :key="index" @click.native="zanwei()">
							<img :src="i.img" />
							<div class="tip">
								<p class="title">{{i.name}}</p>
								<p class="money">¥ {{i.money}}</p>
							</div>
						</swiper-slide>
					</swiper>
				</div>
			</div> -->
			<!-- 全球馆end -->

			<!-- 爆品 -->
			<h2 class="haohuo">生鲜美食</h2>
			<div class="baoping" v-for="(item,index) in baopingList">
				<div class="top" @click="toGoodsDetails(item.goodsId)">
					<div class="banner"><img :src="item.imgurl" alt=""></div>
					<div class="wap">
						<p class="tit">{{item.tit}}</p>
						<p class="price">
							<span class="oprice"><span>原价:</span>￥{{item.price}}</span>
							<span class="uprice">会员价<span>￥{{item.huiyuan}} + {{item.oprice}}</span> 信用积分</span>
						</p>
					</div>
				</div>
				<div class="bottom">
					<ul class="clearfix">
						<li class="fl" v-for="(itm,i) in item.pList" @click="toGoodsDetails(itm.goodsId,itm.url)">
							<div class="tit">{{itm.tit}}</div>
							<div class="img">
								<img :src="itm.imgsrc" alt="">
							</div>
						</li>
					</ul>
				</div>
			</div>
			<!-- 爆品end -->
			<h2 class="haohuo">推荐好货</h2>
			<div class="auto-img" @click="goGYL" style="background-color: #fff;margin: .2rem 0;">
				<img src="../../static/index/jf.png" alt="">
			</div>


				<div class="pro-allbox">
					<!-- <div class="titlebox">优质好货</div> -->
					<div class="item-box">
						<div class="item" 
							v-for="(item,index) in caiList" 
							:key="index" 
							@click="toGoodsDetails(item.goodsId)">
							<div class="po-img">
								<img v-if="item.dh" :src="'./static/index/xydh.png'" alt="">
								<img v-if="item.gm" :src="'./static/index/xygm.png'" alt="">
							</div>
							<div class="da-box">
								<img :src="item.img" alt="" />
							</div>
							<p class="title">{{item.title}}</p>
							<p class="oprice">¥ {{item.oprice}}</p>
							<p class="price">
								<span class="jg" v-if="item.oprice">¥ {{(item.oprice - item.zf).toFixed(2)}}</span>
								<span class="zf" v-if="item.zf">
									<span v-if="item.money"></span>+ {{item.zf}} 
									<span class="f20">信用积分</span>
								</span>
								<span class="img"><img src="../assets/images/shop/tip2.png" alt=""></span>
							</p>
							
						</div>
					</div>
					<div class="shuaxin" @click="$router.push({path:'/member/supply/productList'})">查看更多</div>
				</div>

				<!-- 其它商品 -->
				<div class="baoping" v-for="(item,index) in meizhuang">
					<div class="top" @click="toGoodsDetails(item.goodsId)">
						<div class="banner"><img :src="item.imgurl" alt=""></div>
						<div class="wap">
							<p class="tit">{{item.tit}}</p>
							<p class="price">
								<span class="oprice"><span>原价:</span>￥{{item.price}}</span>
								<span class="uprice">会员价<span>￥{{item.huiyuan}} + {{item.oprice}}</span> 信用积分</span>
							</p>
						</div>
					</div>
					<!-- <div class="bottom">
						<ul class="clearfix">
							<li class="fl" v-for="(itm,i) in item.pList" @click="toGoodsDetails(itm.goodsId,itm.url)">
								<div class="tit">{{itm.tit}}</div>
								<div class="img">
									<img :src="itm.imgsrc" alt="">
								</div>
							</li>
						</ul>
					</div> -->
				</div>
				<!-- 其它商品end -->

			</div>
		</div>
		<!--<button @click="goPay()">支付页</button>-->
	</section>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import BScroll from 'better-scroll'
	import url from '../config/url'
	import Qs from 'qs'
	//	import AMap from 'AMap'
	export default {
		data() {
			return {
				address: '',
				swiperOptions:{
					slidesPerView: 'auto',
					autoplay: false
				},
				swiperOption: {
					pagination: {
						el: '.swiper-pagination'
					},
					autoplay: true,
					// loop: true
				},
				noticeOption: {
					direction: 'vertical',
					autoplay: true,
					loop: true
				},
				mpList: [{
						name: 'WHOO后',
						img: './static/brand/1.png',
						id: 'enterBasic584352416400000001'
					},
					{
						name: 'Swisse',
						img: './static/brand/2.png',
						id: 'enterBasic628084787600000001'
					},
					{
						name: '花王',
						img: './static/brand/3.png',
						id: 'enterBasic909312950800000001'
					},
					{
						name: '施华洛世奇',
						img: './static/brand/4.png',
						id: 'enterBasic628084787600000001'
					},
					{
						name: '香奈儿',
						img: './static/brand/5.png',
						id: 'enterBasic150521084500000001'
					},
					{
						name: '雅诗兰黛',
						img: './static/brand/6.png',
						id: 'enterBasic899471964700000001'
					},
					{
						name: '资生堂',
						img: './static/brand/7.png',
						id: 'enterBasic736959676300000001'
					}
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
				}],
				caiList: [

				],
				demoList: [

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
					/*{
						title: '大牌好货',
						img: './static/index/index_nav9.png',
						url: '/brand/famous'
					},*/
					/*{
						title: '海外购',
						img: './static/index/index_nav10.png',
						url: '/brand/shop'
					},*/
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
				proList: [

					{
						img: './static/index/index_shop.png',
						pro:[]
					},
					{
						// img: './static/index/index_shop.png',
						pro:[]
					},
					{
					// img: './static/index/index_shop.png',
					img: './static/index/ypk.jpg',
					// pro: [
					// ]
				}, 
				{
					img: './static/index/ss.jpg',
					pro:[]
				}
				],
				baopingList:[
					/*{
						imgurl:'./static/index/index_banner8.png',
						tit:'泰国金枕头榴莲 3kg~3.5kg',
						price:210,
						huiyuan:122,
						oprice:83,
						goodsId:'lxgoods9820181113275897331',
						pList:[
							{
								tit:'新西兰佳沛绿果',
								goodsId:'lxgoods9820181113656985998',
								imgsrc:'http://health.cgc999.com:8080/group1/M00/00/05/rBL0Dlvq292AVS9KAAFkIVjXDtE298.jpg'
							},
							{
								tit:'南非西柚',
								goodsId:'lxgoods9820181113192619961',
								imgsrc:'http://health.cgc999.com:8080/group1/M00/00/03/rBL0Dlvq0RyAFVa3AAGJ__3sWS0454.jpg'
							},
							{
								tit:'国产丝路晓蜜瓜',
								goodsId:'lxgoods9820181116317959203',
								// imgsrc:'http://health.cgc999.com:8080/group1/M00/00/0C/rBL0DlvuxtCAJ_5VAAE7r4S5lHQ774.jpg',
								imgsrc:'./static/index/hmg.png'
							}
						]
					},
					{
						imgurl:'./static/index/index_banner9.png',
						tit:'俄罗斯帝皇蟹3-3.25kg',
						price:2155,
						huiyuan:1203,
						oprice:952,
						goodsId:'lxgoods9820181114768575133',
						pList:[
							{
								tit:'野生阿根廷红虾',
								goodsId:'lxgoods9820181114436876045',
								// imgsrc:'http://health.cgc999.com:8080/group1/M00/00/08/rBL0Dlvr0sWAcHajAADCCrB592w942.jpg',
								imgsrc:'./static/index/hx.png'
								
							},
							{
								tit:'熟冻波士顿龙虾',
								goodsId:'lxgoods9820181114303236266',
								imgsrc:'http://health.cgc999.com:8080/group1/M00/00/08/rBL0DlvrzSyASTPFAAE4seiK8Hk672.jpg',
								// imgsrc:'./static/index/hx.png'
							},
							{
								tit:'三文鱼',
								goodsId:'lxgoods9820181114133948756',
								// imgsrc:'http://health.cgc999.com:8080/group1/M00/00/08/rBL0Dlvry4-ARnaPAAEBbLkMu5w801.jpg',
								imgsrc:'./static/index/swy.png'
							}
						]
					}*/
				],
				meizhuang:[],
				articleList: [],
				thumb:'',
				showList:[]
			}
		},
		created() {
			
			//请求行业平台自定义首页接口，判断是否有首页
			// this.getDiypage()
		},
		mounted() {

			var _this = this,
					tologin = _this.$store.state.page.isLogin,
					islogin = _this.mainApp.getCs('login');
					
			
			if(islogin){
				if(tologin!="true"){
					
					_this.$router.push({
						path: '/user/login',
					})
				}else{
					this.onLoadArticle()
					this.getShopList()
				}
			}else{
				this.onLoadArticle()
				this.getShopList()
			}
		},

		methods: {
			getDiypage(){
				var _this =this
				_this.$http.get(_this.url.user.platformDiypage,{
					params:{
						platformId:_this.url.platformId,
						type:1
					}
				}).then((res)=>{
					if(res.data.status=="00000000"){
						_this.showList = JSON.parse(res.data.data.content)
						if(_this.showList){
							_this.$router.replace({
								path:'/platformindex'
							})
							return false;
						}
					}
				})
			},
			zanwei(){
				this.$vux.toast.show({
					width: '50%',
					type: 'text',
					position: 'top',
					text: '大牌好货，敬请期待'
				});
			},
			goYpk(url){
				/*alert(url)
				return;*/
				if(url){
					window.location.href = url
				}
				// window.location.reload()
			},
			goGYL(){
				this.$router.push({
					path:'member/supply/productList'
				})
			},
			getShopList(){
				var _this = this,
						url = _this.url.health,
						urlcgc = _this.url.cgc,
						requesrUrl="";
						if(location.host==url){
							requesrUrl = _this.url.draw.getShopList
						}else if(location.host==urlcgc){
							requesrUrl = _this.url.draw.getShopListCgc
						}else{
							requesrUrl = _this.url.draw.getShopListWWW
						}

				_this.$http.get(requesrUrl).then((res)=>{
					if(res.data.status=="00000000"){
						_this.caiList = res.data.data.goods
						// _this.proList[0].pro = res.data.data.thumb
						// _this.proList[1].pro = res.data.data.diy
						_this.proList = res.data.data.diy
						_this.demoList = res.data.data.banner
						_this.navList = res.data.data.navList

						_this.thumb = res.data.data.thumb
						// 爆品
						_this.baopingList = res.data.data.baoping
						//美妆
						_this.meizhuang = res.data.data.meizhuang
					}

				}).catch((err)=>{
					console.log(err)
				})
			},
			toGoodsDetails(goodsId,url) {
				var _this = this
				if(url){
					window.location.href = url
					return;
				}
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
			toStoreDetail(id){
				this.$router.push({
					path: '/multi_user_mall',
					query: {
						id: id
					}
				})
			},
			toStoreDetails(index, item,index2,url) {
				/*console.log(index2)
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
				}*/
				/*alert(url)
				return;*/
				/*if(url==""){
					this.$router.push({
						path:'/shop'
					})
				}else{
					window.location.href = url
				}*/
				this.$router.push({
					path:url
				})

			},
		},
		components: {
			swiper,
			swiperSlide,
		}
	}
</script>
<style lang="less" scoped>
	@import '~vux/src/styles/1px.less';
	.haohuo{
		background:#fff;
		height: 1rem;
		line-height: 1rem;
		text-align: center;
		font-size: .38rem;
		color:#222222;
	}
	.vux-1px-tb:before{
		border:2px solid #c7c7c7;
	}
	#appIndex {
		background-color: #F5F8F9;
		overflow-x: hidden;
		padding-bottom: 1rem;
		.auto-img {
			/*padding: 0 0.08rem;*/
			margin-bottom: .1rem;
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
					/*width: 25%;*/
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
						font-size: 0.32rem;
						font-family: PingFangSC-Regular;
						color: rgba(34, 34, 34, 1);
						height: 0.73rem;
						line-height: 0.38rem;
						margin-top: 0.1rem;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					.oprice{
						padding-left:0.17rem;
						font-weight: bold;
						font-size: .25rem; 
						margin-top: .1rem;
					}
					/* .img{
						img{
							width: 1rem;
							position: relative;
							top: -.2rem;
							left: .2rem;
						}
					} */
					.price {
						padding: 0rem 0.17rem 0.28rem 0.17rem;
						.img{
							/*border: 1px solid #333;*/
							position: relative;
							top: -.05rem;
							img{
								width: 1rem;
								position: relative;
								top: .09rem;
							}
						}
						.jg {
							font-size: 0.28rem;
							font-weight: bold;
							font-family: PingFangSC-Semibold;
							color: rgba(242, 48, 48, 1);
							/*display: block;*/
						}
						.zf {
							font-weight: bold;
							font-size: 0.28rem;
							font-family: PingFangSC-Medium;
							/*color: rgba(51, 111, 255, 1);*/
							color: #f23030;
							.f20 {
								font-size: 0.20rem;
								font-family: PingFangSC;
								/*color: rgba(51, 111, 255, 1);*/
								color: #f23030;
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
				border-bottom: 2px solid #f5f8f9;
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
					/*margin-right: 5px;*/
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
						color: #C4E8C1!important;
						border: 1px solid #C4E8C1;
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
					.green {
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
	/*品牌馆*/
	.banner-box {
			height: 2.88rem;
			overflow: hidden;
			margin-top: .2rem;
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
	/*品牌馆end*/
	/*爆品*/
	.baoping{
		margin-bottom: .2rem;
		.top{
			width: 100%;
			background-color: #fff;
			img{
				width: 100%;
			}
			.wap{
				padding: .2rem;
				.tit{
					font-size: .28rem;
					color: #343434;
					font-weight: bold;
				}
				.price{
					border: 2px solid #f23030;
					height: .46rem;
					line-height: .46rem;
					margin-top: .1rem;
					border-radius: 4px;
					width: 80%;
					.oprice{
						display: inline-block;
						padding: 0 .1rem;
						background:#f23030;
						color: #fff;
						span{
							font-size: .16rem;
						}
					}
					.uprice{
						font-size: .2rem;
						color: #f23030;
						span{
							font-size: .22rem;
							font-weight: bold;
						}
					}
				}
			}
		}
		.bottom{
			width: 100%;
			margin-top: .1rem;
			/*padding-top: .1rem;*/
			ul{
				li{
					padding-top: .2rem;
					background-color: #fff;
					width: 32%;
					text-align: center;
					box-sizing: border-box;
					margin-right:.1rem;
					/*border: 1px solid #333;*/
					.img{
						width: 100%;
						img{
							width: 100%;
						}
					}
				}
			}
		}
	}
	/*爆品end*/
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
	/*全球馆*/
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
	/*全球馆*/
	.swiper-inner {
			padding: 0.10rem 0rem 0.20rem 0.20rem;
			box-sizing: border-box;
			position: relative;
			.waphid{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 3.5rem;
				background:#fff;
				z-index: 10;
				opacity: 0;
			}
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
</style>
<template>
	<section>
		<div class="two">
			<popup v-model="isW" :show-mask="false" position="top">
				<!-- <div class="searchBox">
						<div class="search">
							<img :src="'./static/images/ss.png'" />
							<input type="text" placeholder="搜索商品" @click="goSearch">
						</div>
					</div> -->
				<ul class="pr-nav2" ref="paNav2">
					<li class="li" v-for="(item,index) in prList" :key="index" :class="[{'blue':prNavIndex == index || (index == 3 && ishasStock)}]" @click="prNavClick(index)">
						{{item.title}}
						<div class="sjx" v-if="index == 0">
							<img class="r180" :src="prNavIndex == index?'./static/images/s-in.png':'./static/images/s.png'" />
						</div>
						<div class="sjx" v-if="index == 2" :class="{'r180':(prNavIndex == 2) && huan}">
							<img :src="prNavIndex == index?'./static/images/s-in.png':'./static/images/s.png'" />
							<img :src="'./static/images/x.png'" />
						</div>
					</li>
				</ul>
			</popup>

			<div :class="[{'h':!$store.state.page.isWx},{'b-white':goodsList.length == 0}]" class="wrapper" ref="wrapper">
				<div class="content" :class="{'pr_box':!showGoods}">
					<div class="top2">
						<div class="left">
							<img class="store-logo" v-if="info.logo" :src="info.logo.original?info.logo.original:'./static/shop/storeLogo.png'">
							<div class="middle" @click="navigation">
								<p>{{info.enterpriseName}}</p>
								<div>
									<img class="left-img" src="../../../../src/assets/images/multi_user_mall/position.png">
									<p>{{info.address}}</p>
									<img class="right-img" src="../../../../src/assets/images/multi_user_mall/right.png">
								</div>
							</div>
						</div>
						<div class="right">
							<p @click="changeAlliance(info.allianceId)">{{isAlliance?'已关注':'关注'}}</p>
							<p>{{info.allianceConcern}}人关注</p>
						</div>
					</div>
					<!-- <div class="searchBox">
							<div class="search">
								<img :src="'./static/images/ss.png'" />
								<input type="text" placeholder="搜索商品" @click="goSearch">
							</div>
						</div> -->

					<ul class="pr-nav" ref="paNav">
						<li class="li" v-for="(item,index) in prList" :key="index" :class="[{'blue':prNavIndex == index || (index == 3 && ishasStock)}]" @click="prNavClick(index)">
							{{item.title}}
							<div class="sjx" v-if="index == 0">
								<img class="r180" :src="prNavIndex == index?'./static/images/s-in.png':'./static/images/s.png'" />
							</div>
							<div class="sjx" v-if="index == 2" :class="{'r180':(prNavIndex == 2) && huan}">
								<img :src="prNavIndex == index?'./static/images/s-in.png':'./static/images/s.png'" />
								<img :src="'./static/images/x.png'" />
							</div>
						</li>
					</ul>

					<div class="pro-allbox" v-if="showGoods">
						<!--<scroll :data="goodsList" :pullingUp="true" @pullingUp="pullingUp" :listenScroll="true" @scroll="scroll" @scrollEnd="scrollEnd" class="wrapper" :class="[{'h':!$store.state.page.isWx},{'b-white':goodsList.length == 0}]">-->

						<div class="item-box" >
							<div class="item" v-for="(item,index) in goodsList" :key="index" @click="toGoodsDetails(item.goodsId,item)">
								<div class="da-box">
									<!-- && item.total>0 -->
									<img v-if="item.logo" :src="item.logo.original" alt="" />
									<img class="shouqing" v-if="item.total<=0" src="../../../../src/assets/images/multi_user_mall/shouqing.png" alt="">
								</div>
								<p class="title">{{item.goodsName}}</p>
								<p class="price"><span class="jg">¥ {{item.minPrice}}</span></p>
								<p class="oldprice"><span class="op">{{item.minPrice != item.minOriginPrice?'¥'+item.minOriginPrice:''}}</span><span>销量{{item.salesNum}}</span></p>
								<!-- v-if="item.total<=0" -->
							</div>
						</div>

						<Loading v-if="Loading"></Loading>
						<noMore v-if="showNomore"></noMore>
						<!--</scroll>-->
					<!-- <div @click="goaa()">测试点击事件</div> -->
								
					</div>

					<Null v-if="!showGoods && !inloading" status="zwsj" text="暂无商品"></Null>
					<Null v-if="!showGoods && inloading" status="loading" text="加载中"></Null>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import BScroll from 'better-scroll'
	import Null from '@/components/null'
	import Loading from '@/components/loading'
	import noMore from '@/components/noMore'
	export default {
		data() {
			return {
				aa: false,
				Loading: false,
				info: {},
				isW: false,
				ishasStock: false,
				showNomore: false,
				showLoading: false,
				showGoods: false,
				inloading: true,
				isAlliance: false,
				huan: false,
				prList: [],
				goodsList: [],
				curPage: 1,
				pageSize: 20,
				prType: 0,
				hasStock: 0,
				prList: [{
						title: '综合'
					},
					{
						title: '销量'
					},
					{
						title: '价格'
					},
					{
						title: '仅看有货'
					}
				],
				prNavIndex: 0,
				allianceId: ''
			}
		},
		components: {
			BScroll,
			Null,
			Loading,
			noMore
		},
		created() {

			var islogin = this.mainApp.getCs('login'),
				tologin = this.$store.state.page.isLogin;

			if(islogin) {
				if(tologin != "true") {
					this.$router.push({
						path: '/user/login'
					})
				} else {
					this.getBasicInfo()
					this.InitScroll()
				}
			} else {
				this.getBasicInfo()
				this.InitScroll()
			}
			// console.log(1)
			/*if(this.$store.state.page.isLogin == 'true'){
				this.getAllianceConcern()
			}*/
		},
		mounted() {
			// console.log()
		},
		methods: {
			/*goaa(){
				console.log(this.$router)
				this.$router.push({
					path:'/'
				})
			},*/
			// 获取企业详情
			getBasicInfo() {
				var _this = this

				_this.$http.get(_this.url.qy.getBasicInfo, {
					params: {
						enterpriseId: _this.$route.query.eid
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.info = res.data.data
						_this.allianceId = res.data.data.allianceId
						// console.log(_this.info)
						_this.getGoodsList(_this.allianceId)
						if(this.$store.state.page.isLogin == 'true') {
							this.getAllianceConcern()
						}

					}
				})
			},
			getGoodsList(allianceId) {
				var _this = this
				_this.$http.get(_this.url.qy.getGoodsList, {
					params: {
						// allianceId: _this.$route.query.allianceId,
						allianceId: _this.allianceId,
						type: _this.prType,
						hasStock: _this.hasStock,
						curPage: _this.curPage,
						pageSize: _this.pageSize
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.goodsList = res.data.data.list
						_this.showGoods = res.data.data.list.length > 0 ? true : false
						_this.inloading = false
					}
				})
			},
			InitScroll() {
				var _this = this
				this.$nextTick(() => {
					if(this.$refs.wrapper) {
						this.scroll = new BScroll(this.$refs.wrapper, {
							click: true,
							scrollY: true,
							pullUpLoad: {
								threshold: 10
							}
						})
						this.scroll.on('pullingUp', (pos) => {
							this.pullingUp()
							this.$nextTick(function() {
								this.scroll.finishPullUp()
								this.scroll.refresh()
							})
						})
						this.scroll.on('scroll', (pos) => {

							_this.isW = pos.y <= -180 ? true : false

							//							if(pos.y > this.scroll.maxScrollY) {
							//								_this.showFoot = false
							//							} else {
							//								_this.showFoot = true
							//							}
						})
						//						this.scroll.on('scrollStart', (pos) => {
						//							_this.showFoot = false
						//						})
						//
						//						this.scroll.on('scrollEnd', (pos) => {
						//							_this.showFoot = true
						//						})
					}
				})
			},
			pullingUp() {
				var _this = this

				_this.curPage++;

				_this.$http.get(_this.url.qy.getGoodsList, {
					params: {
						allianceId: _this.allianceId,
						type: _this.prType,
						hasStock: _this.hasStock,
						curPage: _this.curPage,
						pageSize: _this.pageSize,
						islist: true
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						if(res.data.data.list.length > 0) {
							_this.goodsList = _this.goodsList.concat(res.data.data.list)
							// _this.showLoading = true
							// _this.showNoMore = false
							_this.showNomore = false
							_this.Loading = true
						} else {
							/*_this.showLoading = false
							_this.showNoMore = true*/
							_this.showNomore = true
							_this.Loading = false
						}
						// _this.$forceUpdate()
					}
				})
			},
			prNavClick(index) {
				this.showGoods = false
				this.inloading = true
				if(index != 3) {
					this.prNavIndex = index
				}

				if(index == 0) {
					this.prType = 0 //综合 0
				} else if(index == 1) {
					this.huan = true
					this.prType = 2 //销量 2
				} else if(index == 2) {
					this.huan = !this.huan
					this.prType = this.huan ? 4 : 3 //价格  3 4
				} else if(index == 3) {
					this.ishasStock = !this.ishasStock
					this.hasStock = this.ishasStock ? 1 : 0 //库存 1 0
				}

				this.curPage = 1
				this.getGoodsList()
			},
			toGoodsDetails(goodsId, item) {
				var _this = this
				// console.log(item);
				if(item.total <= 0) {
					_this.$vux.toast.show({
						text: '已售罄，暂不能购买',
						type: 'text',
						position: 'middle',
						width: '50%'
					})
					return;
				}
				_this.$router.push({
					path: '/multi_user_mall/commodity_details',
					query: {
						goodsId: goodsId
					}
				})
			},
			//改变用户关注
			changeAlliance(id) {
				var _this = this
				if(!_this.isAlliance) {
					var _this = this
					//关注联盟企业
					_this.$http.post(_this.url.user.addConcern, {
						userId: _this.$store.state.user.userId,
						type: 2,
						platformId: _this.url.platformId,
						objectId: id
					}).then((res) => {
						if(res.data.status == "00000000") {
							_this.$vux.toast.show({
								width: '50%',
								type: 'text',
								position: 'middle',
								text: '已关注'
							})
						}
						_this.getAllianceConcern()
						_this.getBasicInfo()
					})
				} else {
					//取消关注联盟企业
					_this.$http.post(_this.url.user.deleteConcern, {
						userId: _this.$store.state.user.userId,
						type: 2,
						concernIds: id
					}).then((res) => {
						if(res.data.status == "00000000") {
							_this.$vux.toast.show({
								width: '50%',
								type: 'text',
								position: 'middle',
								text: '已取消关注'
							})
						}
						_this.getAllianceConcern()
						_this.getBasicInfo()
					})
				}
			},
			navigation() {
				var _this = this
				var marker = new AMap.Marker({
					position: [_this.info.lng, _this.info.lat]
				})

				marker.markOnAMAP({
					position: marker.getPosition(),
					name: _this.info.address //name属性在移动端有效
				})
			},
			// 获取用户是否关注联盟企业角色接口
			getAllianceConcern(id) {
				var _this = this
				_this.$http.get(_this.url.qy.getAllianceConcern, {
					params: {
						userId: _this.$store.state.user.userId,
						allianceId: _this.allianceId
					}
				}).then((res) => {
					if(res.data.status == '00000000') {
						if(res.data.data.status == 1) {
							_this.isAlliance = true
						} else {
							_this.isAlliance = false
						}
					}
				})
			},
		},
		/*watch:{
			"$route":"newpage"
		}*/
		/*watch: {
	    '$route': function(to, from) {
	       console.log(this.$route.path)
	    }
	  }*/

	}
</script>
<style lang="less" scoped>
	.multi_user_mall_box .two {
		background-color: white;
		.wrapper {
			position: fixed;
			top: 0;
			bottom: 0;
			width: 100%;
			/*overflow: hidden;*/
			background: #fff;
			z-index: 100;
			max-width: 640px;
			.content {
				padding-bottom: 1.20rem;
			}
			.pr_box {
				position: relative;
				height: 100%;
				z-index: 11;
				background-color: white;
				.null_box {
					position: absolute;
					top: 40%;
					left: 50%;
					transform: translate(-50%, -40%);
				}
			}
		}
		.b-white {
			background-color: white;
		}
		.h {
			top: 46px;
		}
		.pr-nav,
		.pr-nav2 {
			display: flex;
			height: 0.90rem;
			border-top: 1px solid rgba(228, 235, 251, 1);
			background-color: white;
			z-index: 15;
			li {
				flex: 1;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 0.28rem;
				font-family: PingFangSC-Regular;
				color: rgba(26, 38, 66, 1);
				.sjx {
					display: flex;
					flex-direction: column;
					margin-left: 0.10rem;
					img {
						width: 0.12rem;
					}
					img:nth-child(2) {
						margin-top: 0.05rem;
					}
				}
				.r180 {
					transform: rotate(180deg);
				}
			}
			.blue {
				color: #336FFF;
			}
		}
		.pr-nav2 {
			z-index: 15;
			background-color: white;
		}
		.top2 {
			height: 2rem;
			background: url(../../../../src/assets/images/multi_user_mall/bg.png) no-repeat;
			background-size: cover;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 0.20rem;
			box-sizing: border-box;
			.left {
				display: flex;
				align-items: center;
				.store-logo {
					width: 1.20rem;
					height: 1.20rem;
					margin-right: 0.16rem;
					background-color: rgba(213, 213, 214, 0.35);
				}
				.middle {
					p:nth-child(1) {
						font-size: 0.32rem;
						font-family: PingFangSC-Medium;
						color: rgba(255, 255, 255, 1);
						margin-bottom: 0.23rem;
					}
					div {
						display: flex;
						align-items: center;
						.left-img {
							width: 0.28rem;
							height: 0.28rem;
						}
						p {
							width: 3.4rem;
							font-size: 0.24rem;
							font-family: PingFangSC-Regular;
							color: rgba(255, 255, 255, 1);
							margin: 0 0.07rem;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
						}
						.right-img {
							width: 0.16rem;
							height: 0.16rem;
						}
					}
				}
			}
			.right {
				p:nth-child(1) {
					width: 1.16rem;
					height: 0.46rem;
					line-height: 0.46rem;
					text-align: center;
					border-radius: 33px;
					border: 1px solid rgba(255, 255, 255, 1);
					font-size: 0.24rem;
					font-family: PingFangSC-Regular;
					color: rgba(255, 255, 255, 1);
				}
				p:nth-child(2) {
					margin-top: 0.10rem;
					font-size: 0.20rem;
					font-family: PingFangSC-Regular;
					color: rgba(255, 255, 255, 1);
					text-align: center;
				}
			}
		}
		.searchBox {
			width: 100%;
			background: #fff;
			height: 1rem;
			display: flex;
			align-items: center;
			padding: 0 0.20rem;
			box-sizing: border-box;
			.search {
				position: relative;
				width: 100%;
				img {
					width: 0.32rem;
					height: 0.32rem;
					position: absolute;
					left: 0.4rem;
					top: 50%;
					transform: translate(-50%, -50%);
				}
				input {
					vertical-align: middle;
					width: 100%;
					background: #F5F6FA;
					border-radius: 3px;
					color: #1A2642;
					height: 0.66rem;
					line-height: 0.66rem;
					vertical-align: middle;
					padding: 0rem 0rem 0rem 0.78rem;
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
		.pro-allbox {
			background-color: #F5F8F9;
			padding-top: 0.06rem;
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
					/* .shouqing{
						width: .2rem;
						height: .2rem;
						border: 1px solid #f00;
						img{
							width: 100%;
							height: 100%;
						}
					} */
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
						position: relative;
						img {
							width: 100%;
							height: auto;
						}
						.shouqing {
							position: absolute;
							top: 0;
							left: 0;
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
						padding: 0.13rem 0.17rem 0.2rem 0.17rem;
						.jg {
							font-size: 0.28rem;
							font-family: PingFangSC-Semibold;
							color: rgba(242, 48, 48, 1);
						}
					}
					.oldprice {
						display: flex;
						justify-content: space-between;
						font-size: 0.24rem;
						font-family: PingFangSC-Regular;
						color: rgba(144, 162, 199, 1);
						padding: 0 0.17rem 0.17rem 0.17rem;
						box-sizing: border-box;
						.op {
							text-decoration: line-through;
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
	}
</style>
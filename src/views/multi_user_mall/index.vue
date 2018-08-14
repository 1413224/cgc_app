<template>
	<section class='multi_user_mall_box'>
		<settingHeader :title="title"></settingHeader>
		<div v-if="!nohas">

			<div class="one" v-if="showIndex==0">

			</div>
			<div class="two" v-if="showIndex==1">
				<popup v-model="isW" :show-mask="false" position="top">
					<div class="searchBox">
						<div class="search">
							<img :src="'./static/images/ss.png'" />
							<input type="text" placeholder="搜索商品" @click="goSearch">
						</div>
					</div>
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
					<div class="content">
						<div class="top2">
							<div class="left">
								<img class="store-logo" v-if="info.logo" :src="info.logo.original?info.logo.original:'./static/shop/storeLogo.png'">
								<div class="middle">
									<p>{{info.enterpriseName}}</p>
									<div>
										<img class="left-img" src="../../assets/images/multi_user_mall/position.png">
										<p>{{info.address}}</p>
										<img class="right-img" src="../../assets/images/multi_user_mall/right.png">
									</div>
								</div>
							</div>
							<div class="right">
								<p @click="changeAlliance(info.allianceId)">{{isAlliance?'已关注':'关注'}}</p>
								<p>{{info.allianceConcern}}人关注</p>
							</div>
						</div>
						<div class="searchBox">
							<div class="search">
								<img :src="'./static/images/ss.png'" />
								<input type="text" placeholder="搜索商品" @click="goSearch">
							</div>
						</div>

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

						<div class="pro-allbox">
							<!--<scroll :data="goodsList" :pullingUp="true" @pullingUp="pullingUp" :listenScroll="true" @scroll="scroll" @scrollEnd="scrollEnd" class="wrapper" :class="[{'h':!$store.state.page.isWx},{'b-white':goodsList.length == 0}]">-->

							<div class="item-box" v-if="showGoods">
								<div class="item" v-for="(item,index) in goodsList" :key="index" @click="toGoodsDetails(item.goodsId)">
									<div class="da-box">
										<img v-if="item.logo" :src="item.logo.original" alt="" />
									</div>
									<p class="title">{{item.goodsName}}</p>
									<p class="price"><span class="jg">¥ {{item.minPrice}}</span></p>
									<p class="oldprice"><span class="op">{{item.minPrice != item.minOriginPrice?'¥'+item.minOriginPrice:''}}</span><span>销量{{item.salesNum}}</span></p>
								</div>
							</div>

							<!--</scroll>-->
						</div>
						<Loading v-if="showLoading"></Loading>
						<noMore v-if="showNomore"></noMore>
						<noData v-if="!showGoods" :status="2" stateText="暂无商品"></noData>
						<noData v-if="goodsList.length == 0" :status="2" stateText="努力加载中..."></noData>

					</div>
				</div>
			</div>
			<!-- 服务开始 -->
			<div class="three" v-if="showIndex==2">
				<div class="top2">
					<div class="left">
						<img class="store-logo" v-if="info.logo" :src="info.logo.original?info.logo.original:'./static/shop/storeLogo.png'">
						<div class="middle">
							<p>{{info.enterpriseName}}</p>
							<div>
								<img class="left-img" :src="'./static/images/b-address.png'">
								<p>{{info.address}}</p>
								<img class="right-img" :src="'./static/images/b-right.png'">
							</div>
						</div>
					</div>
					<div class="right">
						<p @click="changeChains(info.chainsId)">{{isChains?'已关注':'关注'}}</p>
						<p>{{info.chainsConcern}}人关注</p>
					</div>
				</div>
				<div class="item" v-for="(item,index) in fuwuData" :key="index">
					<div class="tops">
						<div class="left clearfix">
							<div class="logo fl"><img src="../../assets/images/share/wfg.png" alt=""></div>
							<p class="title fl">{{item.goodsName}}</p>
							<span class="name">{{item.shortName}}</span>
						</div>
						<div class="right">
							<div @click="goProductDetail">
								<img src="../../assets/images/share/pd.png">
								<span>产品简介</span>
							</div>
							<!-- <div>
								<img src="../../assets/images/share/direction.png">
								<span>使用指导</span>
							</div> -->
						</div>
					</div>

					<div class="price" v-for="(skuList,index) in item.skuList" :key="index">
						<div class="item">
							<div class="left">
								<p>{{setServiceTime(skuList.serviceTime)}}</p>
								<p>{{skuList.skuName}}</p>
							</div>
							<div class="right">
								<div class="money">
									<p>{{skuList.price}} <span>元</span></p>
									<p v-if="item.content != ''">{{ item.content}}</p>
								</div>
								<div class="purchase" @click="buyEquiment(item.equipList,skuList.skuId)">购买</div>
								<!-- $router.push({path:'/share/comfirmOrder'}) -->
							</div>
						</div>
					</div>

					<popup v-model="show" class="popwrap">
						<p class="tit">选择设备</p>
						<div class="ov-box">
							<div class="list equipment" v-for="(item,index) in equipList" :key="index" @click="activeEq(index,item.num)">
								<div class="item">
									<p><i>设备编号:</i>{{item.num}}</p>
									<check-icon :value.sync="item.show"></check-icon>
								</div>
							</div>
						</div>

						<div class="bottom">
							<p class="btn btncancel" @click="hidePopup">取消</p>
							<p class="btn btndet" @click="purchase">确定</p>
						</div>
					</popup>
				</div>
			</div>
			<!-- 服务结束 -->

			<div class="four" v-if="showIndex==3">

				<div class="logo-bg">
					<img :src="logo?logo:'./static/shop/storeLogo.png'" alt="" />
				</div>
				<!--<div class="swiper-inner">
					<swiper :options="swiperOption">
						<swiper-slide v-for="(item, index) in demoList" :key="index">
							<router-link :to="item.url">
								<img :src="item.img">
							</router-link>
						</swiper-slide>
						<div class="swiper-pagination" slot="pagination"></div>
					</swiper>
				</div>-->
				<div class="summary-box">
					<div class="one">
						<div class="left">
							<img :src="logo?logo:'./static/shop/storeLogo.png'" alt="" />
						</div>
						<div class="right">
							<div>
								<p class="title">{{info.name}}</p>
								<p class="sf">
									<span class="lm" v-if="info.isAlliance">联盟企业</span>
									<span class="ly" v-if="info.isChains">联营企业</span>
								</p>
							</div>
							<p class="num" v-if="info.domainCateid1">{{info.domainCateid1}}/{{info.domainCateid2}}</p>
						</div>
					</div>
					<div class="two">
						<div class="bottom" style="border-top: none;">
							<p>店铺编号</p>
							<p class="nukm">{{info.number}}</p>
						</div>
						<div class="top">
							<div class="left">
								<img :src="'./static/images/dibiao.png'" alt="" />
								<p v-if="info.area">{{info.area.country}}{{info.area.province}}{{info.area.city}}{{info.area.area}}{{info.area.town}}</p>
							</div>
							<div class="right">
								<a :href="'tel://'+info.tel">
									<img :src="'./static/images/dianhua.png'" alt="" />
								</a>
							</div>
						</div>

						<div class="bottom">
							<p>开店时间</p>
							<p>{{info.joinTime}}</p>
						</div>
						<div class="bottom" @click="toStoreQc(info)">
							<p>店铺二维码</p>
							<p class="code"><img src="../../assets/images/multi_user_mall/qrcode.png" alt=""><i class="iconfont icon-arrow-right"></i></p>
						</div>
						<div class="bottom" @click="toAlbum">
							<p>店铺图册</p>
							<p class="code"><img src="../../assets/images/multi_user_mall/tuce.png" alt=""><i class="iconfont icon-arrow-right"></i></p>
						</div>
					</div>
				</div>
			</div>
			<div class="back-index" :class="{'bottom2':info.isAlliance != 1 && info.isChains != 1}" @click="$router.push({path:'/share/storelist'})">
				<p>返回</p>
				<p>首页</p>
			</div>
			<transition enter-active-class="fadeInUp animated" leave-active-class="zoomOut animated" :duration="{ enter: 150, leave: 100 }">
				<div class="foot-box" v-if="(info.isAlliance == 1 || info.isChains == 1) && showFoot">
					<ul>
						<li v-if="item.show" v-for="(item,index) in navList" :key="index" @click="navActive(index,item.oIndex)">
							<img :src="navIndex == index?item.activeLogo:item.logo" alt="" />
							<p :class="{'blue':navIndex == index}">{{item.navTitle}}</p>
						</li>
					</ul>
				</div>
			</transition>
		</div>
		<div class="no_data1" v-else>
			<div class="pr">
				<noData :status="2" stateText="找不到该企业"></noData>
			</div>
		</div>
	</section>
</template>

<script>
	import settingHeader from '@/components/setting_header'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import { Qrcode, Popup, CheckIcon, Radio, Checklist } from 'vux'
	import scroll from '@/components/scroll'
	import BScroll from 'better-scroll'
	import Loading from '@/components/loading'
	import noMore from '@/components/noMore'
	import noData from '@/components/noData'
	export default {
		data() {
			return {
				title: "店铺详情",
				swiperOption: {
					loop: true,
					autoplay: {
						delay: 5000,
					},
					pagination: {
						el: '.swiper-pagination',
						type: 'fraction'
					},
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev'
					}
				},
				qrcodeWidth: 0,
				navIndex: 3,
				info: {},
				logo: '',
				isAlliance: false, //联盟
				isChains: false, //联营
				tabIndex: 0,
				nohas: false,
				showIndex: 3,
				chainsId: '', //联营企业角色id
				allianceId: '', //联盟企业角色id
				fuwuData: [],
				// radio:['1','2'],
				// flags: false,
				show: false,
				check: true,
				equipList: [],
				skuId: '',
				equipNumber: '',
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
				huan: false,
				showFoot: true,
				curPage: 1,
				pageSize: 20,
				prType: 0,
				hasStock: 0,
				ishasStock: false,
				showLoading: false,
				showNomore: false,
				showGoods: true,

				navList: [{
						navTitle: '首页',
						logo: './static/images/shop-bottom1.png',
						activeLogo: './static/images/shop-bottom1-in.png',
						show: false,
						oIndex: 0
					},
					{
						navTitle: '商品',
						logo: './static/images/shop-bottom2.png',
						activeLogo: './static/images/shop-bottom2-in.png',
						show: false,
						oIndex: 1
					},
					{
						navTitle: '服务',
						logo: './static/images/shop-bottom3.png',
						activeLogo: './static/images/shop-bottom3-in.png',
						show: false,
						oIndex: 2
					},
					{
						navTitle: '简介',
						logo: './static/images/shop-bottom4.png',
						activeLogo: './static/images/shop-bottom4-in.png',
						show: true,
						oIndex: 3
					},
				],
				demoList: [{
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
				goodsList: [],
				isW: false
			}
		},
		components: {
			settingHeader,
			swiper,
			swiperSlide,
			Qrcode,
			Popup,
			Radio,
			Checklist,
			CheckIcon,
			noData,
			noMore,
			Loading,
			scroll
		},
		created() {
			this.getBasicInfo()

			this.navIndex = this.$route.query.oIndex ? this.$route.query.oIndex : 3
			this.showIndex = this.$route.query.oIndex ? this.$route.query.oIndex : 3

			this.InitScroll()
		},
		mounted() {},
		methods: {
			toAlbum() {
				this.$router.push({
					path: '/multi_user_mall/album',
					query:{
						enterpriseId: this.$route.query.id
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
			InitScroll() {
				var _this = this
				this.$nextTick(() => {
					if(this.$refs.wrapper) {
						this.scroll = new BScroll(this.$refs.wrapper, {
							click: true,
							scrollY: true,
							pullUpLoad: {
								threshold: -30
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

							if(pos.y > this.scroll.maxScrollY) {
								_this.showFoot = false
							} else {
								_this.showFoot = true
							}
						})
						this.scroll.on('scrollStart', (pos) => {
							_this.showFoot = false
						})

						this.scroll.on('scrollEnd', (pos) => {
							_this.showFoot = true
						})
					}
				})
			},
			setServiceTime(serviceTime) {
				var time_str = '';
				if(serviceTime >= 3600) {
					var hour = Math.floor(serviceTime / 3600);
					time_str += hour + '时';
					serviceTime -= hour * 3600;
				}
				if(serviceTime >= 60) {
					var minute = Math.floor(serviceTime / 60);
					time_str += minute + '分';
					serviceTime -= minute * 60;
				}
				if(serviceTime > 0) {
					time_str += serviceTime + '秒';
				}
				return time_str;
			},
			pullingUp() {
				var _this = this

				_this.curPage++

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
								_this.showLoading = true
								_this.showNoMore = false
							} else {
								_this.showLoading = false
								_this.showNoMore = true
							}
						}
					})
			},

			prNavClick(index) {

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
			purchase() {
				if(this.equipNumber != '' && this.skuId != '') {
					this.$router.push({
						path: '/share/comfirmOrder',
						query: {
							'equipNumber': this.equipNumber, //设备编号
							'skuId': this.skuId, //设备价格套餐
						}
					})
				} else {
					this.$vux.toast.show({
						width: '50%',
						type: 'text',
						position: 'middle',
						text: '请选择需要开启的设备'
					})
				}

			},
			activeEq(i, equipNumber) {
				var _this = this
				_this.equipList.forEach(function(index, value, array) {
					_this.equipList[value].show = false
					_this.equipList[i].show = true
				})

				this.equipNumber = equipNumber
			},
			navActive(index, iIndex) {
				this.navIndex = index
				this.showIndex = iIndex
				// this.$route.query.oIndex = iIndex
				// 
				if(iIndex == 2) {
					// this.getEquipmentInfo('enterBasic554689511100000001') //联营企业服务信息
					this.getEquipmentInfo(this.chainsId) //联营企业服务信息
				}

				this.$router.replace({
					query: this.merge(this.$route.query, {
						'oIndex': iIndex
					})
				})

				this.InitScroll()
			},
			toStoreQc(pinfo) {
				var _this = this
				if(pinfo.isAlliance == 1) {
					var type = '联盟企业'
				} else if(pinfo.isChains == 1) {
					var type = '联营企业'
				} else {
					var type = '其他'
				}
				_this.$router.push({
					path: '/multi_user_mall/store_qrcode',
					query: {
						enterpriseId: _this.$route.query.id,
						title: pinfo.enterpriseName,
						type: type
					}
				})
			},
			// 获取企业详情
			getBasicInfo() {
				var _this = this

				_this.$http.get(_this.url.qy.getBasicInfo, {
					params: {
						enterpriseId: _this.$route.query.id
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.info = res.data.data

						_this.navList[1].show = _this.info.isAlliance == 1 ? true : false
						_this.navList[2].show = _this.info.isChains == 1 ? true : false

						localStorage.setItem('storeInfo', JSON.stringify(res.data.data))
						if(_this.info.logo) {
							_this.logo = _this.info.logo.original
						}

						if(res.data.data.isAlliance == 1) {
							//获取联盟信息
							if(_this.$store.state.page.isLogin == 'true') {
								_this.getAllianceConcern(_this.info.allianceId)
							}

							//获取商品
							_this.allianceId = res.data.data.allianceId
							_this.getGoodsList()
						}
						if(res.data.data.isChains == 1) {
							//获取联营信息
							if(_this.$store.state.page.isLogin == 'true') {
								_this.getChainsConcern(res.data.data.chainsId)
							}
							//获取服务
							_this.chainsId = res.data.data.chainsId
							_this.getEquipmentInfo()
						}

					} else if(res.data.status == 'plat-0003') {
						_this.nohas = true
					}
				})
			},
			getGoodsList() {
				var _this = this
				_this.$http.get(_this.url.qy.getGoodsList, {
					params: {
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
					}
				})
			},
			// 获取用户是否关注联盟企业角色接口
			getAllianceConcern(id) {
				var _this = this
				_this.$http.get(_this.url.qy.getAllianceConcern, {
					params: {
						userId: _this.$store.state.user.userId,
						allianceId: id
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
			// 获取用户是否关注联营企业角色接口
			getChainsConcern(id) {
				var _this = this
				_this.$http.get(_this.url.qy.getChainsConcern, {
					params: {
						userId: _this.$store.state.user.userId,
						chainsId: id
					}
				}).then((res) => {
					if(res.data.status == '00000000') {
						if(res.data.data.status == 1) {
							_this.isChains = true
						} else {
							_this.isChains = false
						}
					}
				})
			},
			changeAlliance(id) {
				var _this = this
				//取消关注联盟企业
				if(_this.isAlliance) {
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
						_this.getBasicInfo()
					})
				} else {
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
						_this.getBasicInfo()
					})
				}
			},
			changeChains(id) {
				var _this = this
				//取消关注联盟企业
				if(_this.isChains) {
					_this.$http.post(_this.url.user.deleteConcern, {
						userId: _this.$store.state.user.userId,
						type: 3,
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
						_this.getBasicInfo()
					})
				} else {
					//关注联盟企业
					_this.$http.post(_this.url.user.addConcern, {
						userId: _this.$store.state.user.userId,
						type: 3,
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
						_this.getBasicInfo()
					})
				}
			},
			goSearch() {
				this.$router.push({
					path: '/multi_user_mall/search'
				})
			},
			goProductDetail() {
				this.$router.push({
					path: '/share/pintroduce'
				})
			},
			buyEquiment(equipList, skuId) {
				var _this = this
				this.show = true
				_this.equipList = []
				equipList.forEach(function(value) {
					var data = {}
					data.num = value
					data.show = false
					_this.equipList.push(data)
				})

				this.skuId = skuId
			},
			hidePopup() {
				this.show = false
				this.skuId = ''
				this.equipNumber = ''
			},
			//服务
			getEquipmentInfo() {
				var _this = this
				_this.$http.get(_this.url.share.getEquipmentInfo2, {
					params: {

						chainsId: _this.chainsId
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						// alert(0)
						if(res.data.data.length == 0) {

						}
						_this.fuwuData = res.data.data
					}
				})
			},
			change(value, label) {
				alert(value + label)
			}

		}
	}
</script>
<style lang="less" scoped>
	.multi_user_mall_box .three {
		.top2 {
			height: 2rem;
			background-color: white;
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
						color: #1A2642;
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
							color: #1A2642;
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
					/*border: 1px solid #1A2642;*/
					background-color: #336FFF;
					color: white;
					font-size: 0.24rem;
					font-family: PingFangSC-Regular;
					/*color: #1A2642;*/
				}
				p:nth-child(2) {
					margin-top: 0.10rem;
					font-size: 0.20rem;
					font-family: PingFangSC-Regular;
					color: #1A2642;
					text-align: center;
				}
			}
		}
	}
	
	.multi_user_mall_box .two {
		background-color: white;
		.wrapper {
			position: fixed;
			top: 0;
			bottom: 0;
			width: 100%;
			overflow: hidden;
			.content {
				padding-bottom: 1.20rem;
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
			background: url(../../../src/assets/images/multi_user_mall/bg.png) no-repeat;
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
	
	.multi_user_mall_box .no_data1 {
		height: 100%;
		width: 100%;
		background-color: white;
		overflow: hidden;
		position: fixed;
		top: 0;
		bottom: 0;
		.pr {
			height: 100%;
			width: 100%;
			position: relative;
			.no_data {
				position: absolute;
				top: 30%;
				left: 50%;
				transform: translate(-50%, -30%);
			}
		}
	}
	
	.multi_user_mall_box {
		background-color: #F5F6FA;
		/*padding-bottom: 1.33rem;*/
		.logo-bg {
			height: 2.80rem;
			overflow: hidden;
			img {
				width: 100%;
				height: 100%;
				transform: scale(3);
				display: block;
				filter: brightness(.5)blur(2px);
			}
		}
		.swiper-inner {
			position: relative;
			z-index: 11;
			.swiper-slide {
				height: 2.80rem;
				img {
					width: 100%;
					height: 100%;
					display: block;
				}
			}
			.swiper-pagination-fraction {
				position: absolute;
				left: 5.80rem!important;
				bottom: 0.78rem;
				width: 1.5rem;
				height: 0.60rem;
				background: rgba(26, 38, 66, 0.8);
				border-radius: 15px;
				display: flex;
				align-items: center;
				justify-content: center;
				color: white;
			}
		}
		.summary-box {
			position: relative;
			z-index: 15;
			padding: 0 0.18rem;
			margin-top: -0.67rem;
			.one {
				width: 7.14rem;
				height: 2.30rem;
				background: rgba(255, 255, 255, 1);
				box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
				border-radius: 4px;
				padding: 0.15rem 0.38rem 0.15rem 0.15rem;
				box-sizing: border-box;
				display: flex;
				.left {
					width: 2.0rem;
					height: 2.0rem;
					margin-right: 0.15rem;
					background: rgba(255, 255, 255, 1);
					border-radius: 3px;
					border: 1px solid rgba(216, 223, 240, 1);
					display: flex;
					align-items: center;
					justify-content: center;
					img {
						width: 100%;
						height: 100%;
					}
				}
				.right {
					flex: 1;
					display: flex;
					flex-direction: column;
					/*justify-content: space-between;*/
					div {
						.title {
							font-size: 0.32rem;
							font-family: PingFangSC-Medium;
							color: rgba(26, 38, 66, 1);
							margin-bottom: 0.18rem;
							margin-top: 0.20rem;
							word-wrap: break-word;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
							word-break: break-all;
							overflow: hidden;
						}
						.sf {
							span {
								display: inline-block;
								width: 1.02rem;
								height: 0.34rem;
								line-height: 0.34rem;
								text-align: center;
								border-radius: 3px;
								font-size: 0.22rem;
								font-family: PingFangSC-Regular;
								margin-right: 0.20rem;
							}
							.lm {
								color: #336FFF;
								background: rgba(51, 111, 255, 0.1);
								border: 1px solid rgba(51, 111, 255, 1);
							}
							.ly {
								color: #FF5365;
								background: rgba(255, 83, 101, 0.1);
								border: 1px solid rgba(255, 83, 101, 1);
							}
						}
					}
					.num {
						font-size: 0.24rem;
						font-family: PingFangSC-Regular;
						color: rgba(144, 162, 199, 1);
					}
				}
			}
			.two {
				width: 7.14rem;
				/*height: 4.34rem;*/
				background: rgba(255, 255, 255, 1);
				border-radius: 2px;
				margin-top: 0.15rem;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.top {
					height: 1.27rem;
					border-top: 1px solid #D8DFF0;
					padding: 0.40rem 0rem 0.27rem 0.18rem;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					.left {
						flex: 1;
						display: flex;
						align-items: center;
						img {
							width: 0.34rem;
							height: 0.34rem;
							margin-right: 0.1rem;
						}
						p {
							font-size: 0.28rem;
							font-family: PingFangSC-Regular;
							color: rgba(26, 38, 66, 1);
							word-wrap: break-word;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
							word-break: break-all;
							overflow: hidden;
						}
					}
					.right {
						width: 1.09rem;
						display: flex;
						align-items: center;
						justify-content: center;
						border-left: 1px solid rgba(216, 223, 240, 1);
						box-sizing: border-box;
						img {
							width: 0.40rem;
							height: auto;
						}
					}
				}
				.middle {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.title {
						height: 0.8rem;
						display: flex;
						align-items: center;
						padding: 0 0.18rem 0 0.28rem;
						box-sizing: border-box;
						p:nth-child(1) {
							font-size: 0.28rem;
							font-family: PingFangSC-Medium;
							color: rgba(26, 38, 66, 1);
							span {
								font-size: 0.28rem;
								font-family: PingFangSC-Regular;
								color: rgba(144, 162, 199, 1);
							}
						}
					}
					.qrcode-box {
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
				.bottom {
					height: 1rem;
					border-top: 1px solid rgba(216, 223, 240, 1);
					padding: 0 0.28rem;
					box-sizing: border-box;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					justify-content: space-between;
					p {
						font-size: 0.28rem;
						font-family: PingFangSC-Regular;
						color: rgba(26, 38, 66, 1);
					}
					.nukm {
						color: #90A2C7;
						width: 4.78rem;
						word-wrap: break-word;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
						word-break: break-all;
						overflow: hidden;
						text-align: right;
					}
					.code {
						display: flex;
						align-items: center;
						img {
							width: 0.36rem;
							height: 0.36rem;
							margin-right: 0.40rem;
						}
						i {
							font-size: 0.50rem;
						}
					}
				}
			}
		}
		/* .wfg-box {
			position: fixed;
			bottom: 2.26rem;
			right: 0.20rem;
			z-index: 16;
			width: 1.26rem;
			height: 1.26rem;
			background: rgba(18, 183, 245, 1);
			box-shadow: 0px 4px 12px 0px rgba(18, 183, 245, 0.5);
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			margin-bottom: 0.39rem;
			margin-right: 0.20rem;
			img {
				width: 0.66rem;
				height: 0.33rem;
			}
			p {
				font-size: 0.24rem;
				font-family: PingFangSC-Regular;
				color: rgba(255, 255, 255, 1);
			}
		} */
		.bottom2 {
			bottom: 0.26rem!important;
		}
		.back-index {
			position: fixed;
			bottom: 1.26rem;
			right: 0.20rem;
			z-index: 16;
			width: 0.86rem;
			height: 0.86rem;
			background: rgba(26, 38, 66, 0.35);
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			font-size: 0.24rem;
			font-family: PingFangSC-Regular;
			color: rgba(255, 255, 255, 1);
			border-radius: 50%;
			margin-bottom: 0.11rem;
			margin-right: 0.20rem;
		}
		.foot-box {
			position: fixed;
			bottom: 0;
			right: 0;
			width: 100%;
			height: 1.20rem;
			background: rgba(255, 255, 255, 1);
			z-index: 16;
			ul {
				width: 100%;
				height: 100%;
				display: flex;
				li {
					flex: 1;
					display: flex;
					align-items: center;
					flex-direction: column;
					justify-content: center;
					img {
						width: 0.46rem;
						height: 0.46rem;
						margin-bottom: 0.06rem;
					}
					p {
						font-size: 0.24rem;
						font-family: PingFangSC-Regular;
						color: rgba(26, 38, 66, 1);
					}
					.blue {
						color: #336FFF;
					}
				}
			}
		}
	}
	/*服务开始*/
	
	.tops {
		height: 3rem;
		/*background: linear-gradient(-90deg, rgba(71, 172, 255, 1), rgba(34, 116, 255, 1));*/
		background: url(../../../src/assets/images/multi_user_mall/shop-bg.png) no-repeat;
		background-size: cover;
		display: flex;
		color: #fff;
		font-size: 0.24rem;
		margin-top: 0.20rem;
		.left {
			margin: 0.55rem 0.2rem 0rem 0.41rem;
			.logo {
				width: 1.5rem;
				height: 1.5rem;
				img {
					width: 100%;
					height: 100%;
					border-radius: 5px;
				}
			}
			p.title {
				font-size: 0.36rem;
				padding-top: .2rem;
				padding-left: .1rem;
				font-weight: bold;
				span {
					font-size: 0.24rem;
				}
			}
			.name {
				background: #618CF0;
				color: #fff;
				padding: 2px 10px;
				display: inline-block;
				border-radius: 3px;
				margin-top: 5px;
				margin-left: 5px;
			}
		}
		.right {
			margin: 0.9rem 0 0 0;
			font-size: 0.22rem;
			text-align: center;
			div {
				img {
					width: 50%;
					display: block;
					margin: 0 auto;
					margin-bottom: 0.11rem;
					vertical-align: middle;
				}
			}
		}
	}
	
	.price {
		background: #fff;
		font-size: 0.24rem;
		color: #1A2642;
		.select {
			padding: 0.23rem 0 0.23rem 0.24rem;
			font-size: 0.32rem;
			border-bottom: 1px solid #D8DFF0;
			font-weight: bold;
		}
		.item {
			display: flex;
			border-bottom: 1px solid #D8DFF0;
			padding: 0.19rem 0.3rem;
			.left {
				flex: 1;
				p:nth-child(1) {
					font-size: 0.38rem;
					margin-bottom: 0.11rem;
					font-weight: bold;
				}
				p:nth-child(2) {
					line-height: 0.33rem;
				}
			}
			.right {
				display: flex;
				.money {
					flex: 1;
					display: flex;
					justify-content: center;
					flex-direction: column;
					text-align: right;
					p:nth-child(1) {
						color: #FF5365;
						font-size: 0.42rem;
						span {
							font-size: 0.24rem;
						}
					}
					p:nth-child(2) {
						color: #336FFF;
						margin-top: 0.1rem;
					}
				}
				.purchase {
					margin: auto;
					margin-left: 0.4rem;
					width: 0.9rem;
					height: 0.56rem;
					border-radius: 0.28rem;
					border: 1px solid rgba(255, 83, 101, 1);
					color: #FF5365;
					display: flex;
					align-items: center;
					justify-content: center;
					box-sizing: border-box;
				}
			}
		}
	}
	
	.eqnum {
		/*color: #f00;*/
		font-size: .14rem;
		span {
			font-size: .36rem;
			font-weight: bold;
			position: relative;
			top: 2px;
		}
	}
	
	.popwrap {
		background: #fff;
		height: 7.36rem !important;
		padding-bottom: 1rem;
		.ov-box {
			height: 6rem;
			overflow-y: auto;
		}
		.item {
			width: 100%;
			height: 1.4rem;
			border: 1px solid #90A2C7;
			border-radius: 3px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 0.40rem;
			box-sizing: border-box;
			p {
				font-size: 0.42rem;
				font-family: PingFangSC-Medium;
				color: rgba(26, 38, 66, 1);
				i {
					font-size: 0.20rem;
					font-family: PingFangSC-Regular;
					color: rgba(26, 38, 66, 1);
					margin-right: 0.10rem;
				}
			}
		}
		.tit {
			font-size: .32rem;
			color: rgba(34, 34, 34, 1);
			text-align: center;
			margin: .4rem 0;
		}
		.bottom {
			width: 100%;
			height: .9rem;
			position: fixed;
			bottom: 0;
			display: flex;
			border-top: 1px solid #eee;
			.btn {
				flex: 1;
				text-align: center;
				line-height: .9rem;
				font-size: .28rem;
			}
			.btncancel {
				background: #fff;
			}
			.btndet {
				background: #336FFF;
				color: #fff;
			}
		}
		.list {
			padding: 0 .3rem;
			margin-bottom: .2rem;
		}
		.checkwap {
			padding-left: .4rem;
			padding-top: .22rem;
			.num {
				font-weight: bold;
				font-size: .42rem;
			}
		}
	}
	/*服务结束*/
</style>
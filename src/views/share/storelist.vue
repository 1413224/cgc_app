<template>
	<div class="storelist-box1" style="height: 100%;background-color: white;">
		<settingHeader style="z-index: 700;position: relative;" :title="title"></settingHeader>

		<!-- <div class="searchBox" @click="goSearch">
			<div class="search">
				<img :src="'./static/images/ss.png'" />
				<input type="text" placeholder="搜索心仪的门店" readonly="readonly">
			</div>
		</div> -->

		<div class="nav1">
			<div class="pr">
				<div class="top" :class="onIndex == 2 ?'z0':'z1115'">
					<div class="area" :class="{'blue':onIndex == 0}" @click="onArea(0)">
						<p class="areaDetail">{{region}}
							<i class="iconfont" :class="areaShang ? 'icon-shixinjiantou' : 'icon-shixinjiantou-copy'"></i>
						</p>
					</div>
					<div class="price" :class="{'blue':onIndex == 1}" @click="onPrice(1)">
						<p>{{priceType}}
							<i class="iconfont" :class="priceShang ? 'icon-shixinjiantou' : 'icon-shixinjiantou-copy'"></i>
						</p>
					</div>
					<div class="type" :class="{'blue':onIndex == 2}" @click="onScreening(2)">
						<p>{{screening}}
							<img src="../../assets/images/shop/screen.png" alt="">
						</p>
					</div>
				</div>
				<transition enter-active-class="fadeInDown animated" leave-active-class="fadeOutUp animated">
					<div ref="address" style="animation-duration:0.3s" v-if="isActive" class="address animated" :class="isActive? 'maskTive' : ''">
						<ul ref="viewBox">
							<li class="category">
								<i class="iconfont">&#xe60b;</i>
								<span class="province" :class="addressKey==1? 'active':'' " @click="provice">省份</span>
								<span class="city" :class="addressKey==2? 'active':'' " @click="city">城市</span>
								<span class="district" :class="addressKey==3? 'active':'' " @click="district">区县</span>
							</li>
							<li v-for="(item,index) in items" :key="index" @click="next(item.areaId,item.name)">
								<span>{{item.name}}</span>
								<i class="fr">
									<i class="icon iconfont icon-arrow-right"></i>
								</i>
							</li>
						</ul>
					</div>
				</transition>

			</div>
			<transition enter-active-class="fadeInDown animated" leave-active-class="fadeOutUp animated">
				<div id="distanceType" v-if="priceShang" style="animation-duration:0.3s">
					<group>
						<radio class="opPrice" title="title" :options="opPrice" :value="listType" @on-change="changePrice"></radio>
					</group>
				</div>
			</transition>
		</div>

		<div :class="{'h':!$store.state.page.isWx}" class="wrapper" ref="wrapper">
			<div class="content">
				<swiper :options="swiperOption" class="swiper">
					<swiper-slide v-for="(item, index) in demoList" :key="index">
						<a v-if="item.wbu">
							<img :src="item.img">
						</a>
						<router-link v-else :to="item.url">
							<img :src="item.img">
						</router-link>
					</swiper-slide>
					<div class="swiper-pagination" slot="pagination"></div>
				</swiper>
				<!-- <h2>附近商家 <span class="fr">更多<i class="iconfont icon-arrow-right"></i></span></h2> -->
				<div v-if="showShop" class="pd_box">
					<!-- list.length > 0 -->
					<div class="list" v-for="(item,index) in list" @click="toDetail(item.enterpriseId)">
						<div class="item">
							<div class="logo">
								<img v-if="item.logo" :src="item.logo.original" alt="" />
							</div>
							<div>
								<p class="name">{{item.name}}</p>
								<p class="type" v-if="item.domainCateid1">{{item.domainCateid1}} l {{item.domainCateid2}}</p>
								<p class="address">
									<span>{{item.area.country}}{{item.area.province}}{{item.area.city}}{{item.area.area}}{{item.area.town}}</span>
									<span>{{item.distance}}km</span>
								</p>
								<p class="sf">
									<span class="lm" v-if="item.isAlliance == 1">联盟企业</span>
									<span class="ly" v-if="item.isChains == 1">联营企业</span>
								</p>
							</div>
						</div>
					</div>
				</div>

				<Loading v-if="showLoading"></Loading>
				<noMore v-if="showNoMore"></noMore>
				<div style="margin-top: 3px;">
					<noData v-if="!showShop" :status="2" :stateText="'暂无门店'"></noData>
					<noData v-if="list.length == 0" :status="2" :stateText="'努力加载中...'"></noData>
				</div>
			</div>
		</div>

		<div class="mask animated" :class="maskActive? 'maskTive' : ''" @click="hide"></div>

		<!-- 筛选 -->
		<div style="height: 100%;" v-if="show1">
			<div v-transfer-dom class="screen">
				<popup v-model='show1' position="right">
					<div :class="{'h':!$store.state.page.isWx}" class="wrapper2" ref="wrapper2">
						<div class="content">
							<div class="screening">
								<div class="logo">
									<group class="input-div">
										<!-- <cell islink :title="logoTitle" :border-intent="false" :arrow-direction="showContent ? 'up' : 'down'" @click.native="down()"> -->
										<cell :title="logoTitle" :border-intent="false">
										</cell>
										<div>
											<div class="logolist">
												<li class="item" :class="{'li-selected':distanceIndex == index}" v-for="(item, index) in logolist" :key="index" @click="changeCss(index,item)">{{item}}公里</li>
												<x-input class="distance" placeholder="请输入距离" v-model="jl" type="number" @on-change="distanceChange"></x-input>
											</div>
										</div>
									</group>
								</div>
							</div>
						</div>
						<div class="bottom">
							<div class="reset" @click="reset()">重置</div>
							<div class="complete" @click="complete">完成</div>
						</div>
					</div>
				</popup>
			</div>
		</div>
	</div>
</template>

<script>
	import settingHeader from '../../components/setting_header'
	import BScroll from 'better-scroll'
	import scroll from '../../components/scroll.vue'
	import Loading from '../../components/loading'
	import noMore from '../../components/noMore'
	import noData from '../../components/noData'
	import {
		swiper,
		swiperSlide
	} from 'vue-awesome-swiper'

	import {
		Group,
		XInput
	} from 'vux'
	export default {
		name: 'storelist',
		data() {
			return {
				title: '门店列表',
				data: [],
				hasDw: false,
				addressDetail: null, //选中的市
				addressKey: 1, //省 市 区的状态切换
				isActive: false, //地址框的显隐
				maskActive: false, //遮罩层的显隐
				proviceItem: null, //省级数据暂存
				cityItem: null, //城市数据暂存
				districtItem: null, //市区数据暂存
				region: '区域', //区域
				screening: '筛选', //类型
				priceType: '类型', //价格
				areaShang: false, //区域箭头
				typeShang: false, //类型箭头
				priceShang: false, //价格箭头
				active: 1, //列表选中样式（地址）
				items: null, //三级联动地址
				showShop: true,
				opPrice: [
					/*'离我最近',
					'价格最低'*/
					{
						key: '1',
						value: '离我最近'
					},
					{
						key: '2',
						value: '智能推荐'
					}
				],
				onIndex: 0,
				show1: false,
				logoTitle: '距离',
				logolist: [5, 10, 20, 50, 100],
				showContent: true,
				showLoading: false,
				showNoMore: false,
				distanceIndex: 0,
				jl: '',

				listType: '1',
				countryId: 1,
				provinceId: '',
				cityId: '',
				isprovince: '',
				iscity: '',
				isdistrict: '',
				areaId: '',
				distance: 100,
				lat: '',
				lng: '',
				curPage: 1,
				pageSize: 20,

				list: [],
				isload: false,
				islist: false,

				swiperOption: {
					pagination: {
						el: '.swiper-pagination'
					},
					autoplay: false,
					loop: true
				},
				demoList: [{
					img: './static/share/banner1.png',
					url: '/member/vip/right'
				}]
			}
		},
		components: {
			settingHeader,
			scroll,
			Loading,
			noMore,
			noData,
			Group,
			XInput,
			swiper,
			swiperSlide
		},
		created() {
			this.InitScroll()
			this.itemsInit()
			this.getLg()
			this.getLocation()
		},
		methods: {
			toDetail(id) {
				this.$router.push({
					path: '/multi_user_mall',
					query: {
						id: id,
						oIndex: 3
					}
				})
			},
			checkQuery(obj) {
				var _this = this
				var k = []
				var v = []
				for (var i in obj) {
					k.push(i)
					v.push(obj[i])
				}
				k.forEach((value, index) => {
					var i = value
					_this[i] = v[index]
				})
			},
			getLocation() {
				//微信扫一扫
				var _this = this

				var uri = window.location.href.split('#')[0] //截取#前面的路径

				_this.$http.post(_this.url.zf.wxScan, {
					mchId: '1388332102',
					url: uri
				}).then((res) => {
					wx.config({
						debug: false,
						appId: 'wx7a4933a7a3c33ec8',
						timestamp: res.data.data.timestamp,
						nonceStr: res.data.data.nonceStr,
						signature: res.data.data.signature,
						jsApiList: ['checkJsApi', 'scanQRCode', 'getLocation']
					})

					wx.ready(function () {
						wx.getLocation({
							success: function (res) {
								_this.lat = res.latitude
								_this.lng = res.longitude
								_this.checkQuery(_this.$route.query)
								_this.hasDw = true
								_this.getEnterpriseListInfo()
							}
						})
					})
				})
			},
			getLg() {

				var _this = this

				var geolocation = new qq.maps.Geolocation(_this.url.mapKey, "myapp")

				var options = {
					timeout: 3000
				} //设置定位超时

				geolocation.getLocation(showPosition, showErr, options)

				function showPosition(res) {
					console.log(res)
					_this.region = res.province + res.city
					if (_this.$store.state.page.isWx == false) {

						_this.lat = res.lat
						// _this.lat = 22.9377200000
						_this.lng = res.lng
						// _this.lng = 113.3842400000
						_this.checkQuery(_this.$route.query)
						_this.hasDw = true
						_this.getEnterpriseListInfo()
					}
				}

				function showErr(position) {
					console.log(position)
				}
			},
			getEnterpriseListInfo() {
				var _this = this
				var data = {
					listType: _this.listType,
					countryId: _this.countryId,
					distance: _this.distance = _this.distance > 0 ? _this.distance : 5,
					lat: _this.lat,
					lng: _this.lng,
					curPage: _this.curPage,
					pageSize: _this.pageSize,
					islist: _this.islist
				}
				if (_this.provinceId != '') {
					data.provinceId = _this.provinceId
				}
				if (_this.cityId != '') {
					data.cityId = _this.cityId
				}
				if (_this.areaId != '') {
					data.areaId = _this.areaId
				}
				_this.$http.get(_this.url.qy.getEnterpriseListInfo, {
					params: data
				}).then((res) => {
					if (res.data.status == "00000000") {
						if (res.data.data) {
							_this.list = res.data.data.list
							_this.showShop = _this.list.length > 0 ? true : false
						}
					}
				})
			},
			InitScroll() {
				this.$nextTick(() => {
					if (!this.scroll) {
						this.scroll = new BScroll(this.$refs.wrapper, {
							click: true,
							scrollY: true,
							pullUpLoad: {
								threshold: -30
							}
						})
						this.scroll.on('pullingUp', (pos) => {
							this.onLoadData()
							this.$nextTick(function () {
								this.scroll.finishPullUp();
								this.scroll.refresh();
							});
						})
					} else {
						this.scroll.refresh()
					}
				})
			},
			onLoadData() {
				let _this = this
				_this.curPage++
					var data = {
						listType: _this.listType,
						countryId: _this.countryId,
						distance: _this.distance,
						lat: _this.lat,
						lng: _this.lng,
						curPage: _this.curPage,
						pageSize: _this.pageSize,
						islist: true
					}
				if (_this.provinceId != '') {
					data.provinceI = _this.provinceId
				}
				if (_this.cityId != '') {
					data.cityId = _this.cityId
				}
				if (_this.areaId != '') {
					data.areaId = _this.areaId
				}
				_this.$http.get(_this.url.qy.getEnterpriseListInfo, {
					params: data
				}).then((res) => {
					if (res.data.status == "00000000") {
						if (res.data.data) {
							if (res.data.data.list.length > 0) {
								_this.list = _this.list.concat(res.data.data.list)
								_this.showLoading = true
								_this.showNoMore = false
							}
						} else {
							_this.showLoading = false
							_this.showNoMore = true
							_this.$vux.toast.show({
								width: '50%',
								type: 'text',
								position: 'middle',
								text: '已经到底了'
							})
						}
					}
				})
			},
			onArea() {
				this.curPage = 1
				this.onIndex = 0
				//点击区域
				if (this.areaShang) {
					this.hide();
				} else {
					this.hide();
					this.areaShang = true;
					this.isActive = true;
					this.maskActive = true;
				}
			},
			onScreening() {
				//点击筛选
				this.show1 = !this.show1

				this.curPage = 1
				this.onIndex = 2

				if (this.show1) {
					this.$nextTick(() => {
						this.scroll2 = new BScroll(this.$refs.wrapper2, {
							click: true,
							scrollY: true,
							pullUpLoad: {
								threshold: -30
							}
						})
					})
				}

				//地址选择框消失
				this.hide();
			},
			onPrice() {

				this.curPage = 1
				this.onIndex = 1

				//点击价格
				if (this.priceShang) {
					this.hide();
				} else {
					this.hide();
					this.priceShang = true;
					this.maskActive = true;
				}
			},
			changePrice(value, label) { //改变价格，距离

				var _this = this

				_this.listType = value
				this.list = []
				_this.getEnterpriseListInfo()

				_this.$router.replace({
					query: _this.merge(_this.$route.query, {
						'listType': value
					})
				})

				setTimeout(function () {
					_this.priceType = label
					_this.priceShang = false
				}, 50)

				this.hide()
			},
			changeType(value, label) { //改变类型
				var _this = this;
				setTimeout(function () {
					_this.indType = label;
					_this.typeShang = false;

				}, 50);
			},
			goSearch() {
				this.$router.push({
					path: '/multi_user_mall/search'
				})
			},

			// 切换样式
			changeCss: function (index, kilometre) {

				var _this = this

				_this.distance = kilometre

				_this.jl = kilometre

				_this.distanceIndex = index
			},
			// 重置
			reset() {
				this.addressKey = 1
				this.listType = '1'
				this.countryId = 1
				this.provinceId = ''
				this.cityId = ''
				this.areaId = ''
				this.distance = 5
				this.distanceIndex = 0
				this.lat = ''
				this.lng = ''
				this.curPage = 1
				this.pageSize = 20
				this.show1 = false
				this.$router.replace({
					query: {}
				})
				this.getLg()
			},
			// 完成
			complete() {
				var _this = this
				this.show1 = false
				this.list = []
				this.getEnterpriseListInfo()
				_this.$router.replace({
					query: _this.merge(_this.$route.query, {
						'distance': _this.distance,
						'distanceIndex': _this.distanceIndex
					})
				})
			},
			distanceChange() {
				var _this = this

				_this.distance = _this.jl

				for (var i = 0; i < _this.logolist.length; i++) {
					if (_this.logolist[i] == _this.jl) {
						_this.distanceIndex = i
						return false
					} else {
						_this.distanceIndex = 50
					}
				}
			},
			selectCss: function (e) {
				if (e.target.className.indexOf("li-selected") == -1) {
					e.target.className = "item li-selected"; //切换按钮样式
					var obox = e.target.parentNode;
					var lis = obox.children;
					for (var i = 1; i < lis.length; i++) {
						if (lis[i] != e.target) {
							lis[i].className = "item"
						}
					}
				} else {
					e.target.className = "item"; //切换按钮样式
				}
			},
			goStoreDetail(id) {
				this.$router.push({
					path: '/multi_user_mall',
					query: {
						id: id
					}
				});
			},
			/*
			 *     三级联动地址框选择
			 */
			itemsInit() {

				var _this = this

				let param = {
					'parentId': _this.countryId //国家ID
				}
				this.$http.get(this.url.zone.address, {
					params: param
				}).then(resp => {
					this.items = resp.data.data;
					this.proviceItem = this.items;
				})
			},
			next(id, name) {

				var _this = this
				_this.list = []

				if (_this.addressKey == 3) {
					_this.areaShang = false
					_this.isActive = false
					_this.maskActive = false

					_this.isdistrict = name

					_this.region = _this.isprovince + _this.iscity + _this.isdistrict

					_this.areaId = id //区级ID
					_this.getEnterpriseListInfo()

					_this.$router.replace({
						query: _this.merge(_this.$route.query, {
							'areaId': id,
							'region': _this.isprovince + _this.iscity + _this.isdistrict
						})
					})
					return
				} else if (this.addressKey == 1) {

					_this.isprovince = name

					_this.region = _this.isprovince

					_this.provinceId = id //省级ID
					_this.getEnterpriseListInfo()

					_this.$router.replace({
						query: _this.merge(_this.$route.query, {
							'provinceId': id,
							'region': _this.isprovince
						})
					})
				} else if (_this.addressKey == 2) {

					_this.iscity = name
					_this.region = _this.isprovince + _this.iscity

					_this.cityId = id //市级ID
					_this.getEnterpriseListInfo()

					_this.$router.replace({
						query: _this.merge(_this.$route.query, {
							'cityId': id,
							'region': _this.isprovince + _this.iscity
						})
					})
				}
				let param = {
					'parentId': id
				}
				_this.$http.get(_this.url.zone.address, {
					params: param
				}).then(resp => {
					_this.items = resp.data.data;
					_this.addressKey++;
					if (_this.addressKey == 2) {
						_this.cityItem = _this.items;
					} else if (_this.addressKey == 3) {
						_this.districtItem = _this.items;
						_this.addressDetail = name;
					}
				})
				this.$refs.address.scrollTop = 0
			},
			provice() {
				var _this = this

				_this.items = _this.proviceItem
				_this.addressKey = 1

				_this.region = _this.isprovince
				_this.$router.replace({
					query: _this.merge(_this.$route.query, {
						'cityId': _this.cityId,
						'region': _this.isprovince
					})
				})

				_this.$refs.address.scrollTop = 0
			},
			city() {
				var _this = this

				if (_this.cityItem) {
					_this.items = _this.cityItem
					_this.addressKey = 2
				}
				_this.region = _this.isprovince + _this.iscity
				_this.$router.replace({
					query: _this.merge(_this.$route.query, {
						'cityId': _this.cityId,
						'region': _this.isprovince + _this.iscity
					})
				})

				_this.$refs.address.scrollTop = 0
			},
			district() {
				if (this.districtItem) {
					this.items = this.districtItem
					this.addressKey = 3
				}
				this.region = this.isprovince + this.iscity + this.isdistrict
				this.$refs.address.scrollTop = 0
			},
			hide() {
				this.areaShang = false;
				this.priceShang = false;
				this.isActive = false;
				this.maskActive = false;
			}
		}
	}
</script>
<style>
	.aa .weui-cells_radio .weui-check:checked+.weui-icon-checked:before {
		color: #336FFF !important;
	}

	.aa .vux-radio-label {
		color: #336FFF !important;
	}

	.aa .vux-no-group-title {
		margin-top: 0;
	}
	/*
	 *   类型推荐
	*/

	#distanceType {
		width: 100%;
		position: absolute;
		top: 0.9rem;
		bottom: inherit;
		max-height: 500%;
		z-index: 600;
	}

	.nav1 .vux-no-group-title {
		margin-top: 0!important;
	}

	.opPrice .vux-radio-label {
		font-size: 0.24rem!important;
	}

	.opPrice .weui-check__label .weui-cell__ft .weui-icon-checked:before {
		color: #336FFF!important;
	}

	.input-div .distance .weui-cell__bd input {
		font-size: 0.24rem;
		text-align: center!important;
	}
</style>
<style lang="less" scoped>
	/*banner轮播*/

	.swiper {
		img {
			width: 100%;
			height: 2.3rem;
			display: block;
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

	.storelistMask {
		top: 3rem!important;
	}

	.h {
		top: 2rem!important;
	}

	.wrapper {
		position: absolute;
		width: 100%;
		bottom: 0.5rem;
		top: 1.79rem;
		overflow: hidden;
	}

	.storelist {
		background: #fff;
		height: 100%;
	}

	.header {
		/*position:relative !important;*/
	}

	.nav1 {
		width: 100%;
		height: .9rem;
		position: relative;
		.pr {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			position: relative;
			background-color: white;
		}
		.top {
			position: relative;
			background-color: white;
			height: 100%;
			align-items: center;
			width: 100%;
			display: flex;
		}
		.z1115 {
			z-index: 1115;
		}
		.z0 {
			z-index: 0;
		}
		.areaDetail {
			width: 2rem;
			text-align: center;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.address {
			display: none;
			transition: opacity 800ms;
			opacity: 0;
			position: absolute;
			top: 0.9rem;
			left: 0;
			height: 6rem;
			width: 100%;
			background: #fff;
			z-index: 501;
			overflow: auto;
			border-top: 1px solid #D8DFF0;
			ul {
				padding-left: 15px;
				box-sizing: border-box;
				li {
					position: relative;
					overflow: hidden;
					text-align: left;
					font-size: 0.24rem;
					line-height: 0.85rem;
					height: 0.85rem;
					/*border-bottom: 1px solid #c8c7cc;*/
					padding: 0 0.35rem;
					list-style: none;
				}
				li:not(:last-child) {
					box-sizing: border-box;
					border-bottom: 1px solid #D8DFF0;
				}
			}
			.category {
				i {
					font-size: 0.16rem;
					color: #5497ff;
				}
				span {
					display: inline-block;
					color: #999;
					padding: 0 10px;
					font-size: 0.28rem;
				}
				span.active {
					color: #000;
					border-bottom: 0.04rem solid #256fff;
				}
			}
		}
		.area,
		.price,
		.type {
			flex: 1;
			display: flex;
			justify-content: center;
			p {
				font-size: .28rem;
				color: #1A2642;
				i {
					color: #90A2C7;
				}
				img {
					width: 23%;
					margin-left: 0.05rem;
					vertical-align: middle;
				}
			}
		}
		.blue {
			p {
				color: #336FFF;
			}
		}
	}

	.wrapper .content {
		h2 {
			padding-left: 3%;
			font-size: .36rem;
			color: #141C33;
			font-weight: 600;
			margin-top: .4rem;
			span {
				font-weight: normal;
				color: #60719D;
				font-size: .28rem;
				display: block;
				vertical-align: bottom;
				padding-right: .2rem;
			}
		}
		.pd_box {
			padding: 0 0.19rem;
			box-sizing: border-box;
		}
		.list {
			padding: 0.30rem 0;
			box-sizing: border-box;
			border-bottom: 1px solid rgba(216, 223, 240, 1);
			.item {
				display: flex;
				.logo {
					width: 2.4rem;
					height: 1.62rem;
					margin-right: 0.18rem;
					/* display: flex;
					align-items: center;
					justify-content: center; */
					img {
						width: 100%;
						height: 100%;
					}
				}
				div {
					/*flex: 1;*/
					width: 5rem;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.name {
						font-size: 0.32rem;
						font-family: PingFangSC-Medium;
						color: rgba(26, 38, 66, 1);
					}
					.type {
						font-size: 0.24rem;
						font-family: PingFangSC-Regular;
						color: rgba(115, 134, 173, 1);
					}
					.address {
						display: flex;
						justify-content: space-between;
						span:nth-child(1) {
							width: 3rem;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							-webkit-line-clamp: 1;
							-webkit-box-orient: vertical;
						}
						span {
							font-size: 0.24rem;
							font-family: PingFangSC-Regular;
							color: rgba(115, 134, 173, 1);
						}
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
			}
		}
	}

	.mask {
		display: none;
		position: fixed;
		top: 2.65rem;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		opacity: 0;
		z-index: 11;
		transition: opacity 800ms;
	}

	.maskTive {
		display: block!important;
		opacity: 1!important;
	}
	/*地址遮罩*/

	.storelist .vux-popup-dialog {
		background: #fff;
	}

	.change_area {
		padding-top: .28rem;
		.title {
			padding-left: .2rem;
			i {
				font-size: .5rem;
				color: #333;
			}
			.adre {
				font-size: .24rem;
				color: #1A2642;
				position: relative;
				top: -.1rem;
				left: -.1rem;
			}
			.again {
				color: #336FFF;
				font-size: .28rem;
				position: relative;
				top: -.1rem;
			}
		}
		.list {
			width: 7.08rem;
			margin: 0 auto;
			/*border:1px solid #333;*/
			padding-left: .12rem;
			li {
				width: 2.16rem;
				height: .66rem;
				line-height: .66rem;
				background: #F5F6FA;
				color: #333;
				float: left;
				margin-right: .2rem;
				margin-bottom: .2rem;
				border-radius: 4px;
				text-align: center;
			}
			li.current {
				background: #336FFF;
				color: #fff;
			}
		}
	}

	.storelist .weui-cells_radio .weui-check:checked+.weui-icon-checked:before {
		color: #336FFF !important;
	}

	.searchBox {
		width: 100%;
		height: 0.89rem;
		background: #fff;
		padding: 0.16rem 0.30rem;
		border-top: 0.01rem solid #D8DFF0;
		position: relative;
		z-index: 1115;
		box-sizing: border-box;
		.search {
			position: relative;
			width: 100%;
			border-radius: 15px;
			overflow: hidden;
			img {
				position: absolute;
				width: 0.32rem;
				height: 0.32rem;
				top: 0.13rem;
				left: 0.26rem;
			}
			input {
				width: 100%;
				background: #F5F6FA;
				color: #1A2642;
				font-size: 0.24rem;
				height: 0.59rem;
				line-height: 0.59rem;
				padding: 0rem 0.1rem 0rem 0.78rem;
				box-sizing: border-box;
				vertical-align: middle;
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

	.searchBox:after {
		content: " ";
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		height: 1px;
		border-top: 1px solid #D8DFF0;
		color: #D8DFF0;
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		left: 0px;
		z-index: 1115;
	}
</style>

<style lang="less" scoped>
	.wrapper2 {
		height: 80%;
		overflow: hidden;
		z-index: 750;
		.content {
			padding-top: 0.4rem;
			padding-bottom: 0.7rem;
		}
	}

	.screen {
		height: 100%;
		position: relative;
		z-index: 1117;
	}

	.screen .vux-popup-dialog {
		background: #fff;
	}

	.screening {
		width: 6.6rem;
		font-family: PingFangSC-Regular;
		font-size: 0.28rem;
		color: #90A2C7;
		letter-spacing: 0;
		list-style: none;
		li {
			float: left;
			background: #F5F6FA;
			font-size: 0.24rem;
			text-align: center;
			list-style: none;
		}
		.logo {
			overflow: hidden;
			margin-left: 0.25rem;
			margin-bottom: 0.45rem;
			img {
				float: right;
				width: 5%;
				margin-right: 0.255rem;
			}
			.logolist {
				margin: 0.24rem 0 0 0;
				color: #1A2642;
				.item {
					width: 1.92rem;
					height: 0.66rem;
					line-height: 0.66rem;
					margin: 0 0.18rem 0.18rem 0;
					border-radius: 3px;
				}
				.distance {
					width: 96%;
					background: #F5F6FA;
					height: 0.7rem;
					line-height: 0.7rem;
					box-sizing: border-box;
					border-radius: 3px;
					.weui-cell__bd>.weui-input {
						text-align: center!important;
					}
				}
				.weui-cell:before {
					border-top: none;
				}
			}
		}
		.li-selected {
			color: #336FFF;
			background: #E4EBFB;
		}
		.screenlist {
			overflow: hidden;
			margin-bottom: 0.35rem;
			margin-left: 0.18rem;
			color: #1A2642;
			.category {
				margin-left: 0.07rem;
				margin-bottom: 0.24rem;
				color: #90A2C7;
			}
			.item {
				width: 1.96rem;
				padding: 0.2rem 0;
				border-radius: 0.04rem;
				margin-right: 0.18rem;
				margin-bottom: 0.18rem;
			}
		}
	}

	.screen .bottom {
		position: fixed;
		bottom: 1rem;
		font-size: 0.28rem;
		text-align: center;
		.reset {
			float: left;
			width: 2.64rem;
			padding: 0.3rem 0;
			background: #F5F6FA;
			color: #336FFF;
		}
		.complete {
			float: left;
			width: 3.96rem;
			padding: 0.3rem 0;
			background: #336FFF;
			color: #fff;
		}
	}
</style>

<style lang="less">
	.logo {
		.weui-cells {
			margin-top: 0;
		}
		.weui-cell {
			padding: 0 0.24rem 0 0;
		}
		.vux-no-group-title {
			margin-top: 0;
		}
		.weui-cells:before {
			border-top: none;
		}
		.weui-cells:after {
			border-bottom: none;
		}
		.vux-label {
			font-size: 0.28rem;
			color: #90A2C7;
		}
	}

	.screen .vux-popup-dialog {
		min-height: 100%;
		height: 100%;
	}

	.screen .vux-popup-dialog.vux-popup-right {
		height: 100%;
	}
</style>

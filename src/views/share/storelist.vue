<template>
	<div class="storelist-box1" style="height: 100%;background-color: white;">
		<settingHeader style="z-index: 700;position: relative;" :title="title"></settingHeader>

		<div class="searchBox" @click="goSearch">
			<div class="search">
				<img :src="'./static/images/ss.png'" />
				<input type="text" placeholder="搜索心仪的门店" readonly="readonly">
			</div>
		</div>

		<div class="nav1">
			<div class="pr">
				<div class="area" @click="onArea()">
					<p class="areaDetail">{{region}}<i class="iconfont" :class="areaShang ? 'icon-shixinjiantou' : 'icon-shixinjiantou-copy'"></i></p>
				</div>
				<div class="price" @click="onPrice()">
					<p>{{priceType}}<i class="iconfont" :class="priceShang ? 'icon-shixinjiantou' : 'icon-shixinjiantou-copy'"></i></p>
				</div>
				<div class="type" @click="onScreening()">
					<p>{{screening}}<img src="../../assets/images/shop/screen.png" alt=""></p>
				</div>
				<div ref="address" class="address animated" :class="isActive? 'maskTive' : ''">
					<ul ref="viewBox">
						<li class="category">
							<i class="iconfont">&#xe60b;</i>
							<span class="province" :class="addressKey==1? 'active':'' " @click="provice">省份</span>
							<span class="city" :class="addressKey==2? 'active':'' " @click="city">城市</span>
							<span class="district" :class="addressKey==3? 'active':'' " @click="district">区县</span>
						</li>
						<li v-for="(item,index) in items" :key="index" @click="next(item.areaId,item.name)">
							<span>{{item.name}}</span>
							<i class="fr"><i class="icon iconfont icon-arrow-right"></i></i>
						</li>
					</ul>
				</div>
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
				<!-- <h2>附近商家 <span class="fr">更多<i class="iconfont icon-arrow-right"></i></span></h2> -->
				<div class="list" v-if="list.length > 0">
					<ul>
						<li class="clearfix" @click="goStoreDetail(item.enterpriseId)" v-for="(item,index) in list" :key="item.enterpriseId">
							<div class="left">
								<img v-if="item.logo" :src="item.logo.original" alt="">
							</div>
							<div class="right">
								<p class="title">{{item.name}}</p>
								<!--<p class="content1 ellipise">
									<span class="free" v-if="item.isAlliance == 1">商品</span>
									<span class="free" v-if="item.isChains == 1">服务</span>
									<span class="return">返积分</span>
								</p>-->
								<p class="nr"><span class="ms_price">电话:{{item.tel}}</span></p>
								<p class="nr">
									<span class="num"><span v-if="item.area">{{item.area.province}}{{item.area.city}}{{item.area.area}}{{item.area.town}}</span>{{item.distance}}km</span>
								</p>
							</div>
						</li>
					</ul>
					<Loading v-if="showLoading"></Loading>
					<noMore v-if="showNoMore"></noMore>
				</div>
				<div style="margin-top: 3px;">
					<noData v-if="list.length == 0" :status="2" stateText="暂无数据"></noData>
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
												<x-input class="distance" placeholder="请输入距离" v-model="distance" type="number" @on-change="distanceChange"></x-input>
											</div>
										</div>
									</group>
								</div>

								<!--<div class="screenlist" v-for="(screen) in screeningContent">
									<div class="category">{{ screen.title}}</div>

									<li class="item" v-for="(item, index) in screen.options" @click="selectCss($event)">
										{{ item.name}}
									</li>
								</div>-->
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

	import { Group, XInput } from 'vux'
	export default {
		data() {
			return {
				title: '门店列表',
				data: [],
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
				// options:['美容院','老人院','月子中心'],//类型筛选
				// value3:true,
				options: [{
						// icon: 'http://dn-placeholder.qbox.me/110x110/FF2D55/000',
						key: '001', //input的value值
						value: '美容院'
					},
					{
						// icon: 'http://dn-placeholder.qbox.me/110x110/FF2D55/000',
						key: '002',
						value: '老人院'
					},
					{
						// icon: 'http://dn-placeholder.qbox.me/110x110/FF2D55/000',
						key: '003',
						value: '月子中心'
					}
				],
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
				show1: false,
				logoTitle: '距离',
				logolist: [5, 10, 20, 50, 100],
				screeningContent: [{
						title: '美食',
						options: [{
							name: '全部'
						}, {
							name: '甜点饮品'
						}, {
							name: '自助餐'
						}]
					},
					{
						title: '电影',
						options: [{
							name: '全部'
						}, {
							name: '热映电影'
						}, {
							name: '电影周边'
						}]
					},
					{
						title: '酒店住宿',
						options: [{
							name: '全部'
						}, {
							name: '主题公园'
						}, {
							name: '温泉'
						}, {
							name: '情侣酒店'
						}]
					},
					{
						title: '生活服务',
						options: [{
							name: '全部'
						}, {
							name: '家政服务'
						}, {
							name: '鲜花'
						}, {
							name: '酒水'
						}]
					}
				],
				showContent: true,
				showLoading: false,
				showNoMore: false,
				distanceIndex: 0,

				listType: '1',
				countryId: 1,
				provinceId: '',
				cityId: '',
				areaId: '',
				distance: 5,
				lat: '',
				lng: '',
				curPage: 1,
				pageSize: 20,

				list: [],
				isload: false,
				islist: false
			}
		},
		components: {
			settingHeader,
			scroll,
			Loading,
			noMore,
			noData,
			Group,
			XInput
		},
		created() {
			this.InitScroll()
			this.itemsInit()
			this.getLg()
		},
		methods: {
			checkQuery(obj) {
				var _this = this
				var k = []
				var v = []
				for(var i in obj) {
					k.push(i)
					v.push(obj[i])
				}
				k.forEach((value, index) => {
					var i = value
					_this[i] = v[index]
				})
			},
			getLg() {

				var _this = this

				var geolocation = new qq.maps.Geolocation(_this.url.mapKey, "myapp")

				var options = {
					timeout: 3000
				} //设置定位超时

				geolocation.getLocation(showPosition, showErr, options)

				function showPosition(position) {

					_this.region = position.province + position.city
					_this.lat = position.lat
					_this.lng = position.lng
					_this.checkQuery(_this.$route.query)
					_this.getEnterpriseListInfo()
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
					distance: _this.distance,
					lat: _this.lat,
					lng: _this.lng,
					curPage: _this.curPage,
					pageSize: _this.pageSize,
					islist: _this.islist
				}
				if(_this.provinceId != '') {
					data.provinceId = _this.provinceId
				}
				if(_this.cityId != '') {
					data.cityId = _this.cityId
				}
				if(_this.areaId != '') {
					data.areaId = _this.areaId
				}
				_this.$http.get(_this.url.qy.getEnterpriseListInfo, {
					params: data
				}).then((res) => {
					if(res.data.status == "00000000") {
						if(res.data.data) {
							_this.list = res.data.data.list
						}
					}
				})
			},
			InitScroll() {
				this.$nextTick(() => {
					if(!this.scroll) {
						this.scroll = new BScroll(this.$refs.wrapper, {
							click: true,
							scrollY: true,
							pullUpLoad: {
								threshold: -30
							}
						})
						this.scroll.on('pullingUp', (pos) => {
							this.onLoadData()
							this.$nextTick(function() {
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
				if(_this.provinceId != '') {
					data.provinceI = _this.provinceId
				}
				if(_this.cityId != '') {
					data.cityId = _this.cityId
				}
				if(_this.areaId != '') {
					data.areaId = _this.areaId
				}
				_this.$http.get(_this.url.qy.getEnterpriseListInfo, {
					params: data
				}).then((res) => {
					if(res.data.status == "00000000") {
						if(res.data.data) {
							if(res.data.data.length > 0) {
								_this.list = _this.list.concat(res.data.data)
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

				//点击区域
				if(this.areaShang) {
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

				if(this.show1) {
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

				//点击价格
				if(this.priceShang) {
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

				setTimeout(function() {
					_this.priceType = label
					_this.priceShang = false
				}, 50)

				this.hide()
			},
			changeType(value, label) { //改变类型
				var _this = this;
				setTimeout(function() {
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
			changeCss: function(index, kilometre) {

				var _this = this

				_this.distance = kilometre

				_this.distanceIndex = index

				_this.$router.replace({
					query: _this.merge(_this.$route.query, {
						'distance': kilometre,
						'distanceIndex': index
					})
				})
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
						'distance': _this.distance
					})
				})
			},
			distanceChange(val) {
				var _this = this
				for(var i = 0; i < _this.logolist.length; i++) {
					if(_this.logolist[i] == val) {
						_this.distanceIndex = i
						return false
					} else {
						_this.distanceIndex = 50
					}
				}
			},
			selectCss: function(e) {
				if(e.target.className.indexOf("li-selected") == -1) {
					e.target.className = "item li-selected"; //切换按钮样式
					var obox = e.target.parentNode;
					var lis = obox.children;
					for(var i = 1; i < lis.length; i++) {
						if(lis[i] != e.target) {
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

				if(_this.addressKey == 3) {
					_this.areaShang = false
					_this.isActive = false
					_this.maskActive = false

					_this.region = _this.region + name

					_this.areaId = id //区级ID
					_this.getEnterpriseListInfo()

					_this.$router.replace({
						query: _this.merge(_this.$route.query, {
							'areaId': id,
							'region': _this.region
						})
					})
					return
				} else if(this.addressKey == 1) {

					_this.region = name

					_this.provinceId = id //省级ID
					_this.getEnterpriseListInfo()

					_this.$router.replace({
						query: _this.merge(_this.$route.query, {
							'provinceId': id,
							'region': _this.region
						})
					})
				} else if(_this.addressKey == 2) {

					_this.region = _this.region + name

					_this.cityId = id //市级ID
					_this.getEnterpriseListInfo()

					_this.$router.replace({
						query: _this.merge(_this.$route.query, {
							'cityId': id,
							'region': _this.region
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
					if(_this.addressKey == 2) {
						_this.cityItem = _this.items;
					} else if(_this.addressKey == 3) {
						_this.districtItem = _this.items;
						_this.addressDetail = name;
					}
				})
				this.$refs.address.scrollTop = 0
			},
			provice() {
				this.items = this.proviceItem
				this.addressKey = 1
				this.cityItem = null
				this.cityId = ''
				this.areaId = ''
				this.districtItem = null
				
				this.$refs.address.scrollTop = 0
			},
			city() {
				this.areaId = ''
				if(this.cityItem) {
					this.items = this.cityItem
					this.addressKey = 2
				}
				
				this.$refs.address.scrollTop = 0
			},
			district() {
				if(this.districtItem) {
					this.items = this.districtItem
					this.addressKey = 3
				}
				
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
	
	.input-div .distance .weui-cell__bd input {
		font-size: 0.24rem;
		text-align: center!important;
	}
</style>
<style lang="less" scoped>
	.storelistMask {
		top: 3rem!important;
	}
	
	.h {
		top: 2.75rem!important;
	}
	
	.wrapper {
		position: absolute;
		width: 100%;
		bottom: 0.5rem;
		top: 1.75rem;
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
		border-top: 1px solid #eee;
		width: 100%;
		height: .9rem;
		border-bottom: 1px solid #D8DFF0;
		position: relative;
		.pr {
			width: 100%;
			height: 100%;
			z-index: 15;
			display: flex;
			align-items: center;
			position: relative;
			background-color: white;
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
			ul>li {
				position: relative;
				overflow: hidden;
				text-align: left;
				font-size: 0.24rem;
				line-height: 0.85rem;
				height: 0.85rem;
				box-sizing: border-box;
				border-top: 1px solid #D8DFF0;
				/*border-bottom: 1px solid #c8c7cc;*/
				padding: 0 0.35rem;
				list-style: none;
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
	}
	
	.wrapper .content {
		width: 95%;
		margin: 0 auto;
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
		.list {
			padding-bottom: 0.1rem;
			.more {
				font-weight: normal;
				color: #60719D;
				font-size: .32rem;
				display: block;
				vertical-align: bottom;
				text-align: center;
				margin: 0.1rem 0;
			}
			li {
				padding: .3rem .05rem .3rem 0;
				border-bottom: 1px solid #D8DFF0;
				.left {
					float: left;
					width: 2.04rem;
					height: 1.6rem;
					margin-right: .2rem;
					position: relative;
					display: flex;
					align-items: center;
					justify-content: center;
					overflow: hidden;
					img {
						width: 90%;
						height: auto;
					}
				}
				.right {
					float: left;
					width: 4.75rem;
					height: 1.6rem;
					display: flex;
					justify-content: space-between;
					flex-direction: column;
					.title {
						font-size: .32rem;
						color: #1A2642;
						.juli {
							font-size: .24rem;
							float: right;
						}
					}
					.content1 {
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
						.momey {
							font-size: .32rem;
							color: #F23030;
							font-weight: bold;
						}
						.ms_price {
							font-size: .24rem;
						}
						.num {
							font-size: .24rem;
							color: #7386AD;
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
		background: #fff;
		padding-bottom: 0.14rem;
		border-top: 0.01rem solid #D8DFF0;
		position: relative;
		z-index: 15;
		.search {
			position: relative;
			width: 92%;
			margin: 0 auto;
			padding-top: 0.14rem;
			img {
				position: absolute;
				width: 5%;
				top: 0.25rem;
				left: 0.26rem;
			}
			input {
				width: 100%;
				background: #F5F6FA;
				border-radius: 2px;
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
		z-index: 800;
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
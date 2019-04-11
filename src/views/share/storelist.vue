<template>
	<div class="store_list_box">
		<settingHeader title="门店列表"></settingHeader>
		<div class="tab_box">
			<div class="top">
				<div class="item" :class="{'blue':tabIndex == index}" v-for="(item,index) in tabList" :key="index" @click="tabClick(index)">
					<span>{{item.type}}</span>
					<i v-if="index < 2" :class="{'r180':item.show && tabIndex == index}" class="iconfont icon-triangledownfill"></i>
					<img v-else src="../../assets/images/shop/screen.png" alt="">
				</div>
			</div>
			<!--区域-->
			<transition name="region-classes-transition" enter-active-class="fadeInDown animated" leave-active-class="fadeOutUp animated">
				<div class="region_box item_box" :class="{'top1':!$store.state.page.isWx}" v-if="regionShow && tabIndex == 0" style="animation-duration:0.5s">
					<!--省-->
					<div class="address_wrapper" ref="wrapper1">
						<div class="content">
							<ul class="province_box one_box">
								<li v-for="(item,index) in provinceList" :class="{'blue':provinceIndex == index}" :key="index" @click="activeAddressItem(index,item,1)">
									{{item.name}}
								</li>
							</ul>
						</div>
					</div>
					<!--市-->
					<div class="address_wrapper" :class="{'border-r':cityShow}"  ref="wrapper2">
						<div class="content">
							<ul v-if="cityShow" style="animation-duration:0.5s" class="city_box one_box fadeInLeft animated">
								<li v-for="(item,index) in cityList" :key="index" :class="{'blue':cityIndex == index}" @click="activeAddressItem(index,item,2)">
									{{item.name}}
								</li>
							</ul>
						</div>
					</div>
					<!--区-->
					<div class="address_wrapper" ref="wrapper3">
						<div class="content">
							<ul v-if="areaShow" style="animation-duration:0.5s" class="area_box one_box fadeInLeft animated">
								<li v-for="(item,index) in areaList" :class="{'blue':areaIndex == index}" :key="index" @click="activeAddressItem(index,item,3)">
									{{item.name}}
								</li>
							</ul>
						</div>
					</div>
				</div>
			</transition>
			<!--类型-->
			<transition name="type-classes-transition" enter-active-class="fadeInDown animated" leave-active-class="fadeOutUp animated">
				<ul class="type_box item_box" :class="{'top1':!$store.state.page.isWx}" v-if="typeShow && tabIndex == 1" style="animation-duration:0.5s">
					<li v-for="(item,index) in typeList" :key="index" @click="activeType(index,item)">
						<span>{{item.key}}</span>
						<img v-if="typeIndex == index" :src="'./static/images/s_gou.png'" />
					</li>
				</ul>
			</transition>
			<!--筛选-->
			<transition name="screen-classes-transition" enter-active-class="fadeInRight animated" leave-active-class="fadeOutRight animated">
				<div class="screen_box" :class="{'top1':!$store.state.page.isWx}" v-if="screenShow && tabIndex == 2" style="animation-duration:0.5s">
					<div class="pr_box2">
						<div class="logolist_box">
							<div class="item" :class="{'li_selected':distanceIndex == index}" v-for="(item, index) in logolist" :key="index" @click="changeCss(index,item)">
								<div>
									{{item}}公里
								</div>
							</div>
						</div>
						<input v-model="jl" type="number" @input="distanceChange" placeholder="请输入距离" />
						<div class="btn_box">
							<span @click="reset()">重置</span>
							<span @click="complete">完成</span>
						</div>
					</div>
				</div>
			</transition>
			<!--遮罩层-->
			<div class="masker" v-if="maskerShow" @click="maskerShow = false"></div>
		</div>

		<!--门店-->
		<div :class="{'h':!$store.state.page.isWx}" class="wrapper" ref="wrapper">
			<div class="content" :class="{'pr_box':!showList}">
				<!-- <h2>附近商家 <span class="fr">更多<i class="iconfont icon-arrow-right"></i></span></h2> -->
				<div v-if="showList" class="pd_box">
					<!-- list.length > 0 -->
					<div class="list" v-for="(item,index) in list" @click="toDetail(item.enterpriseId,item)">
						<div class="item">
							<div class="logo">
								<img v-if="item.logo" :src="item.logo.original" alt="" />
							</div>
							<div>
								<p class="name">{{item.name}}</p>
								<p class="type" v-if="item.domainCate1Name">{{item.domainCate1Name}} l {{item.domainCate2Name}}</p>
								<p class="address">
									<span>{{item.area.country}}{{item.area.province}}{{item.area.city}}{{item.area.area}}{{item.area.town}}</span>
									<!-- <span>{{item.distance}}km</span> -->
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
				<div>
					<Null v-if="!showList && !inloading" status="zwsj" text="暂无更多门店"></Null>
					<Null v-if="!showList && inloading" status="loading" text="加载中"></Null>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import settingHeader from '@/components/setting_header'
	import BScroll from 'better-scroll'
	import Loading from '@/components/loading'
	import noMore from '@/components/noMore'
	import Null from '@/components/null'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		name: 'storelist',
		data() {
			return {
				tabList: [{
					type: '区域',
					show: false
				}, {
					type: '类型',
					show: false
				}, 
				/*{
					type: '筛选',
					show: false
				}*/
				],
				tabIndex: 0,
				regionShow: false, //区域显示
				screenShow: false, //筛选显示
				maskerShow: false, //遮罩层显示
				provinceList: [],
				cityList: [],
				areaList: [],
				cityShow: false,
				areaShow: false,
				provinceIndex: '-1',
				cityIndex: '-1',
				areaIndex: '-1',
				provinceName: '',
				cityName: '',
				areaName: '',
				typeShow: false, //类型显示
				typeIndex: 0,
				typeList: [{
					key: '离我最近',
					value: 1
				}, {
					key: '智能推荐',
					value: 2
				}],
				addressName: '',
				//获取地址入参
				countryId: 1, //国家ID
				provinceId: '',
				cityId: '',
				areaId: '',
				logolist: [5, 10, 20, 50, 100],
				distanceIndex: 4,
				jl: '',
				//筛选入参
				lat: '',
				lng: '',
				distance: 10000,
				curPage: 1,
				pageSize: 20,
				listType: 1,

				demoList: [{
					img: './static/share/banner1.png',
					url: '/member/vip/right'
				}],
				list: [],
				showList: false,
				inloading: true,
				showLoading: false,
				showNoMore: false
			}
		},
		components: {
			settingHeader,
			scroll,
			Loading,
			noMore,
			Null,
			swiper,
			swiperSlide
		},
		created() {
			this.itemsInit(this.countryId, 0)
			this.InitScroll()

			if(this.$store.state.page.isWx == false) {
				this.getLg()
			} else {
				this.getLocation()
			}
		},
		watch: {
			//关闭遮罩层
			regionShow() {
				return this.maskerShow = this.regionShow ? true : false
			},
			typeShow() {
				return this.maskerShow = this.typeShow ? true : false
			},
			screenShow() {
				return this.maskerShow = this.screenShow ? true : false
			},
			//重置下拉列表展示
			maskerShow() {
				if(!this.maskerShow) {
					this.regionShow = false
					this.typeShow = false
					this.screenShow = false
					this.tabList[this.tabIndex].show = false
				}
			}
		},
		methods: {
			//重置
			reset() {
				this.tabIndex = 0
				this.listType = 1
				this.countryId = 1
				this.provinceId = ''
				this.provinceIndex = '-1'
				this.cityIndex = '-1'
				this.areaIndex = '-1'
				this.addressName = ''
				this.typeIndex = 0
				this.cityId = ''
				this.areaId = ''
				this.distance = 10000
				this.distanceIndex = 4
				this.lat = ''
				this.lng = ''
				this.curPage = 1
				this.pageSize = 20
				this.tabList[0].type = '区域'
				this.screenShow = false

				if(this.$store.state.page.isWx == false) {
					this.getLg()
				} else {
					this.getLocation()
				}
			},
			// 完成
			complete() {
				var _this = this
				
				this.curPage = 1

				//重置加载中
				_this.showList = false
				_this.inloading = true

				this.screenShow = false

				this.getEnterpriseListInfo()

			},
			changeCss(index, kilometre) {
				var _this = this
				_this.distanceIndex = index
				_this.jl = kilometre
				_this.distance = kilometre
			},
			distanceChange() {
				var _this = this

				_this.distance = _this.jl

				for(var i = 0; i < _this.logolist.length; i++) {
					if(_this.logolist[i] == _this.jl) {
						_this.distanceIndex = i
						return false
					} else {
						_this.distanceIndex = 50
					}
				}
			},
			toDetail(id,item) {
				this.$router.push({
					path:'/multi_user_mall',
					query:{
						eid:id,
						// allianceId:item.allianceId
					}
				})	
			},
			//地址三级联动
			itemsInit(id, type) {
				var _this = this
				this.$http.get(this.url.zone.address, {
					params: {
						'parentId': id
					}
				}).then(res => {
					if(type == 0) { //获取省
						_this.provinceList = res.data.data
					} else if(type == 1) { //获取市
						_this.cityList = res.data.data
						_this.cityShow = true
					} else if(type == 2) {
						_this.areaList = res.data.data
						_this.areaShow = true
					}

					if(_this.maskerShow) {
						_this.addressInitScroll()
					}
				})
			},
			//选择省 市  区
			activeAddressItem(index, item, type) {

				this.curPage = 1
				this.showLoading = false
				this.showNoMore = false

				if(type == 1) {
					this.areaList = []
					this.areaShow = false
					this.provinceIndex = index
					this.provinceId = item.areaId
					this.provinceName = item.name

					this.cityIndex = '-1'
					this.areaIndex = '-1'
					this.cityId = ''
					this.areaId = ''

					this.addressName = this.provinceName
					this.tabList[0].type = this.addressName
				} else if(type == 2) {
					this.cityIndex = index
					this.cityId = item.areaId
					this.cityName = item.name

					this.areaIndex = '-1'
					this.areaId = ''

					this.addressName = this.provinceName + this.cityName
				} else if(type == 3) {
					this.areaIndex = index
					this.areaId = item.areaId
					this.areaName = item.name

					this.maskerShow = false

					this.addressName = this.provinceName + this.cityName + this.areaName
				}
				
				this.curPage = 1
				this.itemsInit(item.areaId, type)

				this.getEnterpriseListInfo()
			},
			//选择类型
			activeType(index, item) {
				this.typeIndex = index
				this.listType = item.value
				this.curPage = 1

				this.maskerShow = false
				this.$forceUpdate()

				this.getEnterpriseListInfo()
				console.log(this.listType)
			},
			//非微信定位
			getLg() {
				var _this = this
				var geolocation = new qq.maps.Geolocation(_this.url.mapKey, "myapp")

				var options = {
					timeout: 3000
				} //设置定位超时

				geolocation.getLocation(showPosition, showErr, options)

				function showPosition(res) {
					_this.lat = res.lat
					_this.lng = res.lng
					_this.tabList[0].type = res.province + res.city
					_this.getEnterpriseListInfo()

				}

				function showErr(position) {}
			},
			//微信定位
			getLocation() {
				var _this = this,
				appId='',
				uri = window.location.href.split('#')[0], //截取#前面的路径
				params={
					url: uri
				};

				if(location.host == _this.url.health) {
					params.mchId = _this.url.mchIdHealth
					appId = _this.url.appIdHealth
				} else if(location.host == _this.url.cgc) {
					params.mchId =_this.url.mchIdCgc
					appId = _this.url.appIdCgc
				} else if(location.host == _this.url.test) {
					params.mchId = _this.url.mchIdTest
					appId = _this.url.appIdTest
				}

				_this.$http.post(_this.url.zf.wxScan,params).then((res) => {
					wx.config({
						debug: false,
						appId: appId,
						timestamp: res.data.data.timestamp,
						nonceStr: res.data.data.nonceStr,
						signature: res.data.data.signature,
						jsApiList: ['checkJsApi', 'scanQRCode', 'getLocation']
					})

					wx.ready(function() {
						wx.getLocation({
							type:'gcj02',
							success: function(res) {
								console.log(res)
								_this.lat = res.latitude
								_this.lng = res.longitude
								_this.getEnterpriseListInfo()
							}
						})
					})
				})
			},
			getEnterpriseListInfo() {
				var _this = this
				var data = {
					listType: _this.listType,
					countryId: _this.countryId,
					distance: _this.distance = _this.distance > 0 ? _this.distance : 5,
					lat: _this.lat,
					lng: _this.lng,
					//lat: 22.93772,
					//lng: 113.38424,
					provinceId: _this.provinceId || null,
					cityId: _this.cityId || null,
					areaId: _this.areaId || null,
					curPage: _this.curPage,
					pageSize: _this.pageSize,
					islist: false
				}

				_this.$http.get(_this.url.qy.getEnterpriseListInfo, {
					params: data
				}).then((res) => {
					if(res.data.status == "00000000") {

						if(res.data.data) {
							_this.list = res.data.data.list
							_this.showList = res.data.data.list.length > 0 ? true : false
							_this.inloading = false
						} else {
							_this.showList = false
							_this.inloading = false
						}
					}
				})
			},
			//tab切换
			tabClick(index) {
				var _this = this

				_this.showLoading = false
				_this.showNoMore = false

				this.tabIndex = index
				this.tabList.forEach((value, i) => {
					if(i != index) {
						value.show = false
						return false;
					}
				})

				this.tabList[index].show = !this.tabList[index].show

				if(index == 0) {
					this.addressInitScroll()
					this.regionShow = this.tabList[index].show
				} else if(index == 1) {
					this.typeShow = this.tabList[index].show
				} else if(index == 2) {
					this.screenShow = this.tabList[index].show
				}

				this.$forceUpdate()
			},
			addressInitScroll() {
				var _this = this
				_this.$nextTick(() => {
					if(_this.tabList[_this.tabIndex].show) {
						_this.scroll1 = new BScroll(_this.$refs.wrapper1, {
							click: true,
							scrollY: true,
							momentum: true
						})
						_this.scroll1.refresh()

						if(_this.cityShow) {
							_this.scroll2 = new BScroll(_this.$refs.wrapper2, {
								click: true,
								scrollY: true,
								momentum: true
							})
							_this.scroll2.refresh()

						}
						if(_this.areaShow) {
							_this.scroll3 = new BScroll(_this.$refs.wrapper3, {
								click: true,
								scrollY: true,
								momentum: true
							})
							_this.scroll3.refresh()
						}
					}

				})
			},
			InitScroll() {
				var _this = this
				_this.$nextTick(() => {
					if(!_this.scroll) {
						_this.scroll = new BScroll(_this.$refs.wrapper, {
							click: true,
							scrollY: true,
							momentum: true,
							pullUpLoad: {
								threshold: 50
							}
						})
						_this.scroll.on('pullingUp', (pos) => {
							_this.onLoadData()
							_this.$nextTick(() => {
								_this.scroll.finishPullUp()
								_this.scroll.refresh()
							})
						})
					} else {
						_this.scroll.refresh()
					}
				})
			},
			onLoadData() {
				var _this = this
				_this.curPage++;
				var data = {
					listType: _this.listType,
					countryId: _this.countryId,
					distance: _this.distance = _this.distance > 0 ? _this.distance : 5,
					//lat: _this.lat,
					//lng: _this.lng,
					lat: 22.93772,
					lng: 113.38424,
					provinceId: _this.provinceId || null,
					cityId: _this.cityId || null,
					areaId: _this.areaId || null,
					curPage: _this.curPage,
					pageSize: _this.pageSize,
					islist: true
				}

				_this.$http.get(_this.url.qy.getEnterpriseListInfo, {
					params: data
				}).then((res) => {
					if(res.data.status == "00000000") {
						if(res.data.data) {
							if(res.data.data.list.length > 0) {
								_this.list = _this.list.concat(res.data.data.list)
								_this.showLoading = true
								_this.showNoMore = false
							}
						} else {
							_this.showLoading = false
							_this.showNoMore = true
						}
					}
				})
			},
		}
	}
</script>
<style lang="less" scoped>
	@import '//at.alicdn.com/t/font_912483_lcojf3qe8m.css';
	.store_list_box {
		background-color: white;
		.masker {
			position: fixed;
			top: 0;
			bottom: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
			z-index: 12;
		}
		.tab_box {
			.top {
				height: 0.87rem;
				display: flex;
				position: relative;
				background-color: white;
				z-index: 111;
				.item {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 0.28rem;
					/*font-family: PingFang-SC-Medium;*/
					color: rgba(51, 51, 51, 1);
					/*span {
						width: 1.5rem;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}*/
					i {
						color: rgb(144, 162, 199);
						margin-left: 0.15rem;
						transition: all 0.3s linear;
					}
					img {
						width: 0.21rem;
						height: auto;
					}
					.r180 {
						transform: rotate(-180deg);
					}
				}
				.blue {
					color: #336FFF;
					i {
						color: #336FFF;
					}
				}
			}
			.top:before {
				content: " ";
				position: absolute;
				left: 0;
				bottom: 0;
				right: 0;
				height: 1px;
				border-top: 1px solid #D9D9D9;
				color: #D9D9D9;
				-webkit-transform-origin: 0 0;
				transform-origin: 0 0;
				-webkit-transform: scaleY(0.5);
				transform: scaleY(0.5);
				left: 0px;
			}
		}
		.type_box {
			li {
				height: 0.88rem;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 0.24rem;
				font-family: PingFang-SC-Medium;
				color: rgba(51, 51, 51, 1);
				padding: 0 0.40rem;
				box-sizing: border-box;
				position: relative;
				img {
					width: 0.29rem;
					height: auto;
				}
			}
			li:not(:last-child):after {
				content: " ";
				position: absolute;
				left: 0;
				bottom: 0;
				right: 0;
				height: 1px;
				border-top: 1px solid #D9D9D9;
				color: #D9D9D9;
				-webkit-transform-origin: 0 0;
				transform-origin: 0 0;
				-webkit-transform: scaleY(0.5);
				transform: scaleY(0.5);
				left: 0px;
			}
		}
		.item_box {
			width: 100%;
			position: absolute;
			background-color: white;
			z-index: 15;
			top: 0.87rem;
			max-width: 640px;
		}
		.screen_box {
			position: absolute;
			background-color: white;
			z-index: 15;
			top: 0.87rem;
			bottom: 1rem;
			right: 0;
			width: 6.6rem;
			box-sizing: border-box;
			.pr_box2 {
				height: 100%;
				position: relative;
				padding: 0.20rem;
				box-sizing: border-box;
				.logolist_box {
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					.item {
						width: 1.92rem;
						height: 0.66rem;
						line-height: 0.66rem;
						border-radius: 3px;
						background: #F5F6FA;
						font-size: 0.24rem;
						text-align: center;
						margin-bottom: 0.22rem;
					}
					.item:not(:nth-child(3n)) {
						margin-right: 0.22rem;
					}
					.li_selected {
						color: #336FFF;
						background: #E4EBFB;
					}
				}
				input {
					font-size: 0.24rem;
					width: 100%;
					text-align: center;
					background: #F5F6FA;
					height: 0.7rem;
					line-height: 0.7rem;
					border-radius: 3px;
					padding: 0.20rem 0;
					box-sizing: border-box;
				}
				.btn_box {
					display: flex;
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					font-size: 0.26rem;
					span {
						height: 0.8rem;
						line-height: 0.8rem;
						display: inline-block;
						text-align: center;
					}
					span:nth-child(1) {
						width: 2.64rem;
						background: #F5F6FA;
						color: #336FFF;
					}
					span:nth-child(2) {
						flex: 1;
						background: #336FFF;
						color: #fff;
					}
				}
			}
		}
		.region_box {
			display: flex;
			bottom: 3rem;
			width: 100%;
			overflow: hidden;
			.province_box {
				background-color: #F8F7F5;
				li {
					color: #A8A8A8!important;
				}
			}
			.city_box,.area_box {
				.blue {
					color: #336FFF!important;
				}
			}
			li {
				height: 0.80rem;
				display: flex;
				align-items: center;
				justify-content: center;
				text-align: center;
				font-size: 0.28rem;
				/*font-family: PingFang-SC-Medium;*/
				color: rgba(51, 51, 51, 1);
				box-sizing: border-box;
			}
			.address_wrapper {
				width: 33.333333333333336%;
				overflow: hidden;
				.province_box .blue {
					color: #333333!important;
					background-color: white;
					span{
						display: inline-block;
						width: 100%;
						border-left: 3px solid #336FFF;
						box-sizing: border-box;
					}
				}
			}
			.border-r{
				border-right: 1px solid #E1E1E1;
				box-sizing: border-box;
			}
		}
		.top1,
		.h {
			top: 12.8%!important;
		}
		.wrapper {
			position: absolute;
			top: 0.87rem;
			bottom: 1rem;
			overflow: hidden;
			width: 100%;
			max-width: 640px;
			background-color: white;
			.pr_box {
				position: relative;
				height: 100%;
				z-index: 11;
				background-color: white;
				max-width: 640px;
				.null_box {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
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
				.list:not(:last-child):after {
					content: " ";
					position: absolute;
					left: 0;
					bottom: 0;
					right: 0;
					height: 1px;
					border-top: 1px solid rgba(216, 223, 240, 1);
					color: rgba(216, 223, 240, 1);
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: scaleY(0.5);
					transform: scaleY(0.5);
					left: 0px;
				}
			}
			.list {
				padding: 0.30rem 0;
				position: relative;
				box-sizing: border-box;
				.item {
					display: flex;
					.logo {
						width: 1.50rem;
						height: 1.50rem;
						margin-right: 0.18rem;
						overflow: hidden;
						display: flex;
						align-items: center;
						/*justify-content: center;*/
						img {
							width: 100%;
							height: auto;
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
	}
</style>
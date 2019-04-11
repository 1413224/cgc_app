<template>
	<div class="follow-box">
		<x-header class="b-w" :left-options="{backText: '',preventGoBack: true}" @on-click-more="edit" @on-click-back="changeBack">
			<div class="tar-box">
				<tab v-model="index" :line-width="2" active-color="#397df8" custom-bar-width="1.1rem">
					<tab-item :selected="index==0" @on-item-click="active">联盟企业</tab-item>
					<tab-item :selected="index==1" @on-item-click="active">联营企业</tab-item>
					<tab-item :selected="index==2" @on-item-click="active">商品</tab-item>
				</tab>
			</div>
			<div class="edit-btn" @click="edit" slot="right" v-if="hasLe">{{isBj?'完成':'编辑'}}</div>
		</x-header>
		<div>
			<div v-show="index == 0">
				<div class="store-list">
					<div class="wrapper3" ref="wrapper3">
						<div class="content" :class="{'pr_box':!showList}">
							<div class="list-item" v-for="(item,index) in lmList" v-if="showList" @click="toDetail(item.enterpriseId)">
								<div @click="changelmStore()">
									<check-icon v-if="storeShow2" class="check-btn" :value.sync="item.ischeck"></check-icon>
								</div>
								<div class="img-box">
									<img v-if="item.logo" :src="item.logo.original" />
									<img v-else :src="'./static/shop/storeLogo.png'" />
								</div>
								<div class="pro-box">
									<div>
										<p>{{item.name}}</p>
										<div class="storbtn-box">
											<!-- <span>标签</span> --><span>关注人数：{{item.concernSum}} 人</span>
										</div>
									</div>
									<div class="go" v-if="!isBj">
										<span>进入店铺</span>
										<i class="icon iconfont icon-arrow-right"></i>
									</div>
								</div>
							</div>
							<Loading v-if="show1"> </Loading>
							<Nomore v-if="showNo1"></Nomore>
							<Null v-if="!showList && !inloading" status="zwgz" :text="nolm"></Null>
							<Null v-if="!showList && inloading" status="loading" text="加载中"></Null>
						</div>
					</div>
				</div>
			</div>
			<div v-show="index == 1">
				<div class="store-list">
					<div class="wrapper2" ref="wrapper2">
						<div class="content" :class="{'pr_box':!showList}">
							<div class="list-item" v-for="(item,index) in lyList" v-if="showList" @click="toDetail(item.enterpriseId)">
								<div @click="changelyStore()">
									<check-icon v-if="storeShow" class="check-btn" :value.sync="item.ischeck"></check-icon>
								</div>
								<div class="img-box"><img v-if="item.logo" :src="item.logo.original" /></div>
								<div class="pro-box">
									<div>
										<p>{{item.name}}</p>
										<div class="storbtn-box">
											<!-- <span>标签</span> --><span>关注人数：{{item.concernSum}} 人</span>
										</div>
									</div>
									<div class="go" v-if="!isBj">
										<span>进入店铺</span>
										<i class="icon iconfont icon-arrow-right"></i>
									</div>
								</div>
							</div>
							<Loading v-if="show2"> </Loading>
							<Nomore v-if="showNo2"></Nomore>
							<Null v-if="!showList && !inloading" status="zwgz" :text="noly"></Null>
							<Null v-if="!showList && inloading" status="loading" text="加载中"></Null>
						</div>
					</div>
				</div>
			</div>
			<div v-show="index == 2">
				<div class="pro-list">
					<div class="wrapper" ref="wrapper">
						<div class="content" :class="{'pr_box':!showList}">
							<div class="list-item" v-for="(item,index) in proList" v-if="showList">
								<div @click="changePr()">
									<check-icon v-if="proShow" class="check-btn" :value.sync="item.ischeck"></check-icon>
								</div>
								<div style="display: flex;width: 100%;" @click="toGoodsDetails(item.objectId)">
									<div class="img-box">
										<img v-if="item.logo" :src="item.logo.original" />
										<img v-else :src="'./static/images/pr.png'" />
									</div>
									<div class="pro-box">
										<p>{{item.name}}</p>
										<p>￥{{item.minPrice}}</p>
										<div class="btn-box" v-if="!isBj">
											<!-- <span>加入购物车</span> -->
											<span>立即购买</span>
										</div>
									</div>
								</div>
							</div>
							<Loading v-if="show3"> </Loading>
							<Nomore v-if="showNo3"></Nomore>
							<Null v-if="!showList && !inloading" status="zwgz" :text="noPro"></Null>
							<Null v-if="!showList && inloading" status="loading" text="加载中"></Null>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-transfer-dom>
			<popup v-model="show10" position="top">
				<div class="position-vertical-demo">
					<search class="sous" @on-focus="onFocus" :auto-fixed="false" @on-cancel="onCancel" @on-submit="onSubmit" ref="search"></search>
				</div>
			</popup>
		</div>
		<!--编辑页-->
		<div v-transfer-dom>
			<popup v-model="isBj" position="bottom" height="0.94rem" :show-mask="false">
				<div class="bjBtn-box">
					<div style="flex: 1;" @click="isallcheck">
						<check-icon v-if="isBj && index==2" class="check-btn" :value.sync="allprCheck">全部商品 <span v-if="!allprCheck">已选 <i>{{proidList.length}}</i> 个商品</span></check-icon>
						<check-icon v-if="isBj && index==1" class="check-btn" :value.sync="allstCheck">全部店铺<span v-if="!allstCheck">已选 <i>{{lyidList.length}}</i> 间店铺</span></check-icon>
						<check-icon v-if="isBj && index==0" class="check-btn" :value.sync="allstCheck2">全部店铺<span v-if="!allstCheck2">已选 <i>{{lmidList.length}}</i> 间店铺</span></check-icon>
					</div>
					<div class="qx-box">
						<div class="add-btn" @click="deleteConcern">取消关注</div>
					</div>
				</div>
			</popup>
		</div>

	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import { Tab, TabItem, Swiper, SwiperItem, CheckIcon, Scroller, Search, Popup, XButton, XHeader } from 'vux'
	import settingHeader from '@/components/setting_header'
	import Loading from '@/components/loading'
	import Null from '@/components/null'
	import Nomore from '@/components/noMore'
	export default {
		data() {
			return {
				title: '我的关注',
				index: 0,
				isBj: false,
				proShow: false, //点击商品编辑
				storeShow: false, //点击店铺编辑
				storeShow2: false, //点击店铺编辑
				onFetching: false,
				allprCheck: false, //全选商品
				allstCheck: false, //全选店铺
				allstCheck2: false, //全选店铺
				results: [], //搜索值
				proList: [],
				lyList: [],
				lmList: [],
				proidList: [],
				lmidList: [],
				lyidList: [],
				show1: false,
				show2: false,
				show3: false,
				proState: 0,
				storeState: 0,
				noPro: '暂无关注商品',
				noly: '暂无关注联营企业',
				nolm: '暂无关注联盟企业',
				pageSize: 20,
				curPage: 1,
				type: 2,
				back: Function,
				showNo1: false,
				showNo2: false,
				showNo3: false,
				hasLe: true,
				showList: false,
				inloading: true
			}
		},
		created() {

			this.$route.query.index ? this.index = Number(this.$route.query.index) : this.index = 0

			if(this.index == 0) {
				this.type = 2 //联盟企业
			} else if(this.index == 1) {
				this.type = 3 //联营企业
			} else {
				this.type = 1 //商品
			}
			/*if(this.index == 0){
				this.type = 2
			}else if(this.index == 1){
				this.type = 1
			}*/

			this.getFollow()
		},
		mounted() {
			this.InitScroll()
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
			changeBack() {
				this.$router.go(-1)
				this.$store.state.page.back = true
			},
			getFollow() {
				var _this = this
				_this.isBj = false
				_this.storeShow = false
				_this.storeShow2 = false
				_this.proShow = false
				_this.$http.get(_this.url.user.getConcernLists, {
					params: {
						userId: _this.$store.state.user.userId,
						type: _this.type,
						pageSize: _this.pageSize,
						curPage: _this.curPage
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						//联盟企业
						if(_this.type == 2) {
							_this.lmList = res.data.data.list
							_this.lmList.forEach((value) => {
								value.ischeck = false
							})
						} else if(_this.type == 3) {
							_this.lyList = res.data.data.list
							_this.lyList.forEach((value) => {
								value.ischeck = false
							})

						} else if(_this.type == 1) {
							_this.proList = res.data.data.list
							_this.lyList.forEach((value) => {
								value.ischeck = false
							})
						}

						if(res.data.data.list.length > 0) {
							_this.hasLe = true
						} else {
							_this.hasLe = false
						}
						
						_this.showList = res.data.data.list.length > 0 ? true : false
						_this.inloading = false
					}
				})
			},
			deleteConcern() {
				var _this = this

				this.showNo1 = false
				this.showNo2 = false
				this.showNo3 = false
				this.show1 = false
				this.show2 = false
				this.show3 = false
				this.curPage = 1

				var concernIds = ''

				if(_this.type == 2) {
					if(_this.lmidList != '') {
						concernIds = _this.lmidList.join(',')
					} else {
						_this.$vux.toast.show({
							width: '50%',
							type: 'text',
							position: 'middle',
							text: '未选择任何联盟企业'
						})
						return false
					}
				} else if(_this.type == 3) {
					if(_this.lyidList != '') {
						concernIds = _this.lyidList.join(',')
					} else {
						_this.$vux.toast.show({
							width: '50%',
							type: 'text',
							position: 'middle',
							text: '未选择任何联营企业'
						})
						return false
					}
				} else if(_this.type == 1) {
					if(_this.proidList != '') {
						concernIds = _this.proidList.join(',')
					} else {
						_this.$vux.toast.show({
							width: '50%',
							type: 'text',
							position: 'middle',
							text: '未选择任何商品'
						})
						return false
					}
				}
				_this.$http.post(_this.url.user.deleteConcern, {
					userId: _this.$store.state.user.userId,
					type: _this.type,
					concernIds: concernIds
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.$vux.toast.show({
							width: '50%',
							type: 'text',
							position: 'middle',
							text: '已取消关注'
						})
						_this.getFollow()
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
								threshold: 10, // 负值是当上拉到超过低部 70px；正值是距离底部距离 时，                    
							}
						})
						this.scroll.on('pullingUp', (pos) => {
							this.show = true;
							this.LoadData()
							this.$nextTick(function() {
								this.scroll.finishPullUp();
								this.scroll.refresh();
							});
						})

						this.scroll2 = new BScroll(this.$refs.wrapper2, {
							click: true,
							scrollY: true,
							pullUpLoad: {
								threshold: 10,
							}
						})
						this.scroll2.on('pullingUp', (pos) => {
							this.show2 = true;
							this.LoadData2()
							this.$nextTick(function() {
								this.scroll2.finishPullUp();
								this.scroll2.refresh();
							});
						})

						this.scroll3 = new BScroll(this.$refs.wrapper3, {
							click: true,
							scrollY: true,
							pullUpLoad: {
								threshold: 10,
							}
						})
						this.scroll3.on('pullingUp', (pos) => {
							this.show3 = true;
							this.LoadData3()
							this.$nextTick(function() {
								this.scroll2.finishPullUp();
								this.scroll2.refresh();
							});
						})
					} else {
						this.scroll.refresh()
						this.scroll2.refresh()
						this.scroll3.refresh()
					}
				})

			},
			LoadData() {
				var _this = this
				_this.curPage++
					_this.$http.get(_this.url.user.getConcernLists, {
						params: {
							userId: _this.$store.state.user.userId,
							type: _this.type,
							pageSize: _this.pageSize,
							curPage: _this.curPage,
							islist: true
						}
					}).then((res) => {
						if(res.data.status == "00000000") {
							if(res.data.data.list.length > 0) {
								_this.proList = _this.proList.concat(res.data.data.list)
								_this.show3 = true
								_this.showNo3 = false
								_this.proList.forEach((value) => {
									value.ischeck = false
								})
							} else {
								_this.show3 = false
								_this.showNo3 = true
							}

						}
					})
			},
			LoadData2() {
				var _this = this
				_this.curPage++
					_this.$http.get(_this.url.user.getConcernLists, {
						params: {
							userId: _this.$store.state.user.userId,
							type: _this.type,
							pageSize: _this.pageSize,
							curPage: _this.curPage,
							islist: true
						}
					}).then((res) => {
						if(res.data.status == "00000000") {
							if(res.data.data.list.length > 0) {
								_this.lyList = _this.lyList.concat(res.data.data.list)
								_this.show2 = true
								_this.showNo2 = false
								_this.lyList.forEach((value) => {
									value.ischeck = false
								})
							} else {
								_this.show2 = false
								_this.showNo2 = true
							}

						}
					})
			},
			LoadData3() {
				var _this = this
				_this.curPage++
					_this.$http.get(_this.url.user.getConcernLists, {
						params: {
							userId: _this.$store.state.user.userId,
							type: _this.type,
							pageSize: _this.pageSize,
							curPage: _this.curPage,
							islist: true
						}
					}).then((res) => {
						if(res.data.status == "00000000") {
							if(res.data.data.list.length > 0) {
								_this.lmList = _this.lmList.concat(res.data.data.list)
								_this.show1 = true
								_this.showNo1 = false
								_this.lmList.forEach((value) => {
									value.ischeck = false
								})
							} else {
								_this.show1 = false
								_this.showNo1 = true
							}

						}
					})
			},
			//点击全选
			isallcheck() {
				this.lmidList = [] //重置商品id数组
				this.lyidList = [] //重置店铺id数组
				this.proidList = [] //重置店铺id数组

				if(this.index == 2) {
					if(this.allprCheck == true) {
						for(var i = 0; i < this.proList.length; i++) {
							this.proList[i].ischeck = true
							this.proidList.push(this.proList[i].objectId)
						}
					} else {
						for(var i = 0; i < this.proList.length; i++) {
							this.proList[i].ischeck = false
							this.proidList = []
						}
					}
					console.log(this.proidList, 'pro')
				} else if(this.index == 0) {
					if(this.allstCheck2 == true) {
						for(var i = 0; i < this.lmList.length; i++) {
							this.lmList[i].ischeck = true
							this.lmidList.push(this.lmList[i].objectId)
						}
					} else {
						for(var i = 0; i < this.lmList.length; i++) {
							this.lmList[i].ischeck = false
							this.lmidList = []
						}
					}
					console.log(this.lmidList, 'lm')
				} else if(this.index == 1) {
					if(this.allstCheck == true) {
						for(var i = 0; i < this.lyList.length; i++) {
							this.lyList[i].ischeck = true
							this.lyidList.push(this.lyList[i].objectId)
						}
					} else {
						for(var i = 0; i < this.lyList.length; i++) {
							this.lyList[i].ischeck = false
							this.lyidList = []
						}
					}
					console.log(this.lyidList, 'ly')
				}
			},
			//商品  店铺切换
			active(index) {
				var _this = this
				this.isBj = false //重置编辑
				this.storeShow = false //重置商品选择框
				this.storeShow2 = false //重置商品选择框
				this.proShow = false //重置店铺选择框
				this.allprCheck = false
				this.allstCheck = false
				this.allstCheck2 = false
				this.proidList = []
				this.lyidList = []
				this.lmidList = []
				this.showNo1 = false
				this.showNo2 = false
				this.showNo3 = false
				this.show1 = false
				this.show2 = false
				this.show3 = false
				this.showList = false
				this.inloading = true

				if(index == 1) {
					_this.type = 3
				} else
				if(index == 0) {
					_this.type = 2
				} else if(index == 2) {
					_this.type = 1
				}
				/*if(index == 0){
					_this.type = 2
				}else if(index == 1){
					_this.type = 1
				}*/
				_this.index = index

				_this.$router.replace({
					query: _this.merge(_this.$route.query, {
						'index': _this.index
					})
				})
			},
			//点击编辑
			edit() {
				this.proidList = [] //重置商品id列表
				this.lyidList = [] //重置店铺id列表
				this.lmidList = [] //重置店铺id列表
				this.allprCheck = false //重置全选
				this.allstCheck = false
				this.allstCheck2 = false

				//重置原始数据
				for(var i = 0; i < this.proList.length; i++) {
					this.proList[i].ischeck = false
				}
				for(var i = 0; i < this.lmList.length; i++) {
					this.lmList[i].ischeck = false
				}
				for(var i = 0; i < this.lyList.length; i++) {
					this.lyList[i].ischeck = false
				}

				if(this.index == 2 && this.proList.length > 0) {
					this.isBj = !this.isBj
					this.proShow = !this.proShow
				} else if(this.index == 1 && this.lyList.length > 0) {
					this.isBj = !this.isBj
					this.storeShow = !this.storeShow
				} else if(this.index == 0 && this.lmList.length > 0) {
					this.isBj = !this.isBj
					this.storeShow2 = !this.storeShow2
				}
			},
			//商品选择
			changePr() {
				var idList = []
				for(var i = 0; i < this.proList.length; i++) {
					if(this.proList[i].ischeck == true) {
						idList.push(this.proList[i].objectId)
					}
				}
				this.proidList = idList
				console.log(this.proidList, 'pro')
			},
			//店铺选择
			changelyStore() {
				var idList = []
				for(var i = 0; i < this.lyList.length; i++) {
					if(this.lyList[i].ischeck == true) {
						idList.push(this.lyList[i].objectId)
					}
				}
				this.lyidList = idList
			},
			//店铺选择
			changelmStore() {
				var idList = []
				for(var i = 0; i < this.lmList.length; i++) {
					if(this.lmList[i].ischeck == true) {
						idList.push(this.lmList[i].objectId)
					}
				}
				this.lmidList = idList
			},
			toDetail(id) {
				if(!this.isBj) {
					this.$router.push({
						name: 'multi_user_mall',
						query: {
							id: id
						}
					})
				}
			}
		},
		watch: {
			proidList() {
				if(this.proidList.length == this.proList.length) {
					this.allprCheck = true
				} else {
					this.allprCheck = false
				}
			},
			lyidList() {
				if(this.lyidList.length == this.lyList.length) {
					this.allstCheck = true
				} else {
					this.allstCheck = false
				}
			},
			lmidList() {
				if(this.lmidList.length == this.lmList.length) {
					this.allstCheck2 = true
				} else {
					this.allstCheck2 = false
				}
			},
			index() {
				if(this.index == 0) {
					this.type = 2 //联盟企业
				} else if(this.index == 1) {
					this.type = 3 //联营企业
				} else {
					this.type = 1 //商品
				}
				/*if(this.index == 0){
					this.type = 2
				}else if(this.index == 1){
					this.type = 1
				}*/

				this.curPage = 1

				this.getFollow()
				this.InitScroll()
			}
		},
		components: {
			Tab,
			TabItem,
			Swiper,
			SwiperItem,
			CheckIcon,
			Search,
			Popup,
			XButton,
			XHeader,
			Loading,
			Null,
			Nomore
		}
	}
</script>

<style lang="less">
	.bjBtn-box {
		position: fixed;
		bottom: 0;
		display: flex;
		align-items: center;
		width: 100%;
		height: 0.94rem;
		padding-left: 0.24rem;
		box-sizing: border-box;
		background-color: white;
		.check-btn {
			margin-right: 0.24rem;
			span {
				margin-left: 0.25rem;
				font-size: 0.24rem;
				font-family: PingFangSC-Regular;
				color: rgba(115, 134, 173, 1);
				i {
					color: red;
				}
			}
		}
		.qx-box {
			.add-btn {
				width: 2.4rem;
				height: 0.94rem;
				line-height: 0.94rem;
				background: #FF292E;
				font-size: 0.28rem;
				text-align: center;
				font-family: MicrosoftYaHei;
				color: rgba(255, 255, 255, 1);
				text-align: center;
			}
		}
	}
	
	.bjBtn-box:before {
		content: " ";
		position: absolute;
		left: 0;
		top: 0;
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
	
	.follow-box {
		font-family: MicrosoftYaHei;
		background-color: white;
		height: 100%;
		overflow: hidden;
		.vux-header .vux-header-title {
			margin: 0 66px;
		}
		.animated {
			-webkit-animation-duration: 1s;
			animation-duration: 1s;
			-webkit-animation-fill-mode: both;
			animation-fill-mode: both;
		}
		.b-w {
			background-color: white;
			position: relative;
			.vux-tab-ink-bar {
				bottom: 4px!important;
			}
			.edit-btn {
				color: rgba(144, 162, 199, 1);
			}
		}
		.vux-header-left .left-arrow:before {
			border: 1px solid #222!important;
			border-width: 1px 0 0 1px!important;
		}
		.b-w:after {
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
			left: 0;
		}
		.pro-list,
		.store-list {
			background-color: white;
			.wrapper,
			.wrapper2,
			.wrapper3 {
				position: absolute;
				top: 46px;
				bottom: 0px;
				overflow: hidden;
				width: 100%;
				max-width: 640px;
				/*.vux-loadmore {
					display: inline-block;
					width: 100%;
				}*/
				.pr_box {
					position: relative;
					height: 100%;
					background-color: white;
					.null_box {
						position: absolute;
						top: 40%;
						left: 50%;
						transform: translate(-50%, -40%);
					}
				}
			}
			.list-item {
				background-color: white;
				height: 2.22rem;
				position: relative;
				padding: 0.26rem 0.24rem;
				display: flex;
				align-items: center;
				box-sizing: border-box;
				.check-btn {
					margin-right: 0.24rem;
				}
				.img-box {
					width: 1.68rem;
					height: 1.70rem;
					display: flex;
					align-items: center;
					justify-content: center;
					img {
						width: 100%;
						height: auto;
						vertical-align: middle;
					}
				}
				.pro-box {
					box-sizing: border-box;
					padding-left: 0.35rem;
					width: 100%;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.go {
						font-size: 0.24rem;
						color: #90a2c7;
						display: flex;
						align-items: center;
						i {
							font-size: 0.45rem;
						}
					}
					p:nth-child(1) {
						font-size: 0.24rem;
						color: rgba(26, 38, 66, 1);
						line-height: 0.35rem;
						width: 2.5rem;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					p:nth-child(2) {
						font-size: 0.28rem;
						color: rgba(242, 48, 48, 1);
					}
					.btn-box {
						text-align: right;
						span:nth-child(1) {
							display: inline-block;
							border: 1px solid #90A2C7;
							font-size: 0.24rem;
							padding: 0.05rem 0.15rem;
							border-radius: 2px;
							color: rgba(144, 162, 199, 1);
						}
						span:nth-child(2) {
							display: inline-block;
							border: 1px solid #336FFF;
							font-size: 0.24rem;
							padding: 0.05rem 0.15rem;
							border-radius: 2px;
							color: rgba(51, 111, 255, 1);
						}
					}
					.storbtn-box {
						/*span:nth-child(1) {
							display: inline-block;
							border: 1px solid #F23030;
							font-size: 0.24rem;
							padding: 0.05rem 0.15rem;
							border-radius: 2px;
							color: #F23030;
							margin: 0.18rem 0.26rem 0 0;
							height: 0.3rem;
						}*/
						span {
							font-size: 0.24rem;
							color: rgba(144, 162, 199, 1);
						}
					}
				}
			}
			.list-item :after {
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
				left: 0.21rem;
			}
		}
	}
</style>
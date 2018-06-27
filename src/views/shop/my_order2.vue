<template>
	<div class="my_order_box">
		<settingHeader :title="title"></settingHeader>
		<div class="px" v-if="!tabNo">
			<div class="search">
				<div class="ss_box_left" @click="$router.push({path:'/multi_user_mall/search'})">
					<input type="text" placeholder="搜索商品" />
					<img :src="'./static/images/ss.png'" />
				</div>
				<div class="ss_box_right" @click="showS">
					<img :src="'./static/images/order_sx.png'" alt="" />
				</div>
			</div>
			<div class="tab_box">
				<tab :line-width="1" :scroll-threshold="5" custom-bar-width="30px">
					<tab-item @on-item-click="onItemClick" v-for="(item,index) in tabList" :badge-label="item.bg > 0 && (index == 1 || index ==2)?item.bg : ''" :selected="tabIndex == index" :key="index">{{item.name}}</tab-item>
				</tab>
			</div>
		</div>
		<div class="order_list_box">
			<div class="wrapper" ref="wrapper" :class="{'top0':tabNo}">
				<div class="content">
					<div class="order_item" v-for="(item,index) in sList">
						<div class="order_top">
							<div class="left">
								<img :src="'./static/images/alliance2.png'" alt="" />
								<p>{{item.storeName}}</p>
								<i class="icon iconfont icon-arrow-right"></i>
							</div>
							<!--虚拟商品-->
							<div class="right" v-if="item.pStatus == 0">
								<p v-if="item.orderStatus == 0">待付款</p>
								<p v-if="item.orderStatus == 1">交易成功</p>
								<p v-if="item.orderStatus == 2">交易关闭</p>
								<p v-if="item.orderStatus == 3">交易异常</p>
							</div>
							<!--共享设备-->
							<div class="right" v-if="item.pStatus == 1">
								<p v-if="item.orderStatus == 0">待付款</p>
								<p v-if="item.orderStatus == 1">未使用</p>
								<p v-if="item.orderStatus == 2">使用中</p>
								<p v-if="item.orderStatus == 3">继续使用</p>
								<p v-if="item.orderStatus == 4">使用失败</p>
								<p v-if="item.orderStatus == 5">已完成</p>
								<p v-if="item.orderStatus == 6">交易取消</p>
							</div>
						</div>
						<div class="order_middle" @click="toDetail" v-for="(i,index2) in item.pList" :key="index2" v-if="(index2+1) <= item.showNum" :class="[{'m':(index2 != item.pList.length - 1) && item.pList.length <= 10},{'m':(index2 != item.showNum - 1 && index2 != item.pList.length - 1) && item.pList.length > 10}]">
							<div class="left">
								<img :src="'./static/images/cai2.png'" />
							</div>
							<div class="middle">
								<p class="name">{{i.pName}}</p>
								<p class="pinfo">{{i.pXhao}}</p>
							</div>
							<div class="right">
								<p class="price">¥ {{i.pJg}}</p>
								<p class="num">x {{i.pNum}}</p>
							</div>
						</div>

						<div class="look_all_box" v-if="item.pList.length > 10">
							<div @click="lookAllp(item.pList.length,index)">{{item.showAll?'收起':'显示全部'}} <img :class="{'r':item.showAll}" :src="'./static/member/yhq-down.png'" alt="" /></div>
						</div>
						<div class="order_bottom">
							<span class="num">共 {{item.aNum}} 件</span>
							<span>合计：<i>{{item.aJg}}</i>元</span>
							<span class="yf">(含运费{{item.pyf}}) </span>
							<span> +<i>{{item.pzf}}</i>信用积分</span>
						</div>
						<div class="order_bth_box">
							<!--虚拟商品-->
							<div v-if="item.pStatus == 0">
								<div class="btn" v-if="item.orderStatus == 0">
									<div @click="cancellationOrder">取消订单</div>
									<div @click="pay">付款</div>
								</div>
								<div class="btn" v-if="item.orderStatus == 1">
									<div @click="deleteOrder">删除订单</div>
									<div @click="toEvaluate">评价</div>
									<div>再次充值</div>
								</div>
								<div class="btn" v-if="item.orderStatus == 2">
									<div>删除订单</div>
								</div>
								<div class="btn" v-if="item.orderStatus == 3">
									<div>联系商家</div>
									<div>申请售后</div>
								</div>
							</div>
							<!--共享设备-->
							<div v-if="item.pStatus == 1">
								<div class="btn" v-if="item.orderStatus == 0">
									<div @click="cancellationOrder">取消订单</div>
									<div @click="pay">付款</div>
								</div>
								<div class="btn" v-if="item.orderStatus == 1">
									<div @click="deleteOrder">去使用</div>
									<div @click="toEvaluate">联系商家</div>
									<div>导航到店</div>
								</div>
								<div class="btn" v-if="item.orderStatus == 2">
									<div>结束使用</div>
									<div>暂停使用</div>
								</div>
								<div class="btn" v-if="item.orderStatus == 3">
									<div>结束使用</div>
									<div>重新启动</div>
								</div>
								<div class="btn" v-if="item.orderStatus == 4">
									<div>联系商家</div>
									<div>启动</div>
								</div>
								<div class="btn" v-if="item.orderStatus == 5">
									<div>评价</div>
									<div>删除</div>
									<div>发票详情</div>
								</div>
								<div class="btn" v-if="item.orderStatus == 6">
									<div>删除订单</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div v-transfer-dom>
			<popup v-model="show" position="top">
				<div class="screen_box">
					<div>
						<div class="type_title">订单</div>
						<div class="type_box">
							<div class="type_item" :class="{'blue':typeOrderIndex == index}" v-for="(item,index) in typeOrderList" @click="typeOrder(index)">{{item}}</div>
						</div>
					</div>
					<div>
						<div class="type_title">时间</div>
						<div class="type_box">
							<div class="type_item" :class="{'blue':typeDateIndex == index}" v-for="(item,index) in typeDateList" @click="typeDate(index)">{{item}}</div>
						</div>
					</div>
					<div class="screen_btn">确定</div>
				</div>
			</popup>
		</div>
	</div>
</template>

<script>
	import settingHeader from '../../components/setting_header'
	import BScroll from 'better-scroll'
	import Loading from '../../components/loading'
	import noMore from '../../components/noMore'
	export default {
		data() {
			return {
				title: '我的订单',
				tabList: [{
					name: '全部',
					bg: 0
				}, {
					name: '待付款',
					bg: 99
				}, {
					name: '待收货',
					bg: 5
				}, {
					name: '待评价',
					bg: 0
				}, {
					name: '已完成',
					bg: 0
				}],
				tabIndex: 0,
				showAll: false,
				showNum: 10,
				show: false,
				typeOrderList: ['全部分类', '线下门店', '实物商品', '共享服务'],
				typeDateList: ['近三个月', '近半年', '今年内'],
				typeOrderIndex: 0, //订单类型
				typeDateIndex: 0, //时间类型
				tabNo: false, //隐藏tab
				showIndex: '',
				sList: [{
					logo: './static/images/ss.png',
					storeName: '妍小姐韩国中国区广州市番禺天安门店102号',
					orderStatus: 0,
					aNum: 1,
					aJg: '1200000',
					pyf: 10,
					pzf: 1200000,
					pStatus: 0,
					showNum: 10,
					showAll:false,
					pList: [{
						pLogo: './static/images/ss.png',
						pName: '回力凉鞋男沙滩鞋休闲鞋夏季男士两用凉拖鞋 耐磨露趾软底爸爸凉鞋 黑色 41',
						pXhao: '颜色:蓝色；尺码:L/170修身',
						pNum: 1,
						pJg: '1200000',
						pType: 0
					}, {
						pLogo: './static/images/ss.png',
						pName: '回力凉鞋男沙滩鞋休闲鞋夏季男士两用凉拖鞋 耐磨露趾软底爸爸凉鞋 黑色 41',
						pXhao: '颜色:蓝色；尺码:L/170修身',
						pNum: 1,
						pJg: '1200000',
						pType: 0
					}, {
						pLogo: './static/images/ss.png',
						pName: '回力凉鞋男沙滩鞋休闲鞋夏季男士两用凉拖鞋 耐磨露趾软底爸爸凉鞋 黑色 41',
						pXhao: '颜色:蓝色；尺码:L/170修身',
						pNum: 1,
						pJg: '1200000',
						pType: 0
					}, {
						pLogo: './static/images/ss.png',
						pName: '回力凉鞋男沙滩鞋休闲鞋夏季男士两用凉拖鞋 耐磨露趾软底爸爸凉鞋 黑色 41',
						pXhao: '颜色:蓝色；尺码:L/170修身',
						pNum: 1,
						pJg: '1200000',
						pType: 0
					}, {
						pLogo: './static/images/ss.png',
						pName: '回力凉鞋男沙滩鞋休闲鞋夏季男士两用凉拖鞋 耐磨露趾软底爸爸凉鞋 黑色 41',
						pXhao: '颜色:蓝色；尺码:L/170修身',
						pNum: 1,
						pJg: '1200000',
						pType: 0
					}, {
						pLogo: './static/images/ss.png',
						pName: '回力凉鞋男沙滩鞋休闲鞋夏季男士两用凉拖鞋 耐磨露趾软底爸爸凉鞋 黑色 41',
						pXhao: '颜色:蓝色；尺码:L/170修身',
						pNum: 1,
						pJg: '1200000',
						pType: 0
					}, {
						pLogo: './static/images/ss.png',
						pName: '回力凉鞋男沙滩鞋休闲鞋夏季男士两用凉拖鞋 耐磨露趾软底爸爸凉鞋 黑色 41',
						pXhao: '颜色:蓝色；尺码:L/170修身',
						pNum: 1,
						pJg: '1200000',
						pType: 0
					}, {
						pLogo: './static/images/ss.png',
						pName: '回力凉鞋男沙滩鞋休闲鞋夏季男士两用凉拖鞋 耐磨露趾软底爸爸凉鞋 黑色 41',
						pXhao: '颜色:蓝色；尺码:L/170修身',
						pNum: 1,
						pJg: '1200000',
						pType: 0
					}, {
						pLogo: './static/images/ss.png',
						pName: '回力凉鞋男沙滩鞋休闲鞋夏季男士两用凉拖鞋 耐磨露趾软底爸爸凉鞋 黑色 41',
						pXhao: '颜色:蓝色；尺码:L/170修身',
						pNum: 1,
						pJg: '1200000',
						pType: 0
					}, {
						pLogo: './static/images/ss.png',
						pName: '回力凉鞋男沙滩鞋休闲鞋夏季男士两用凉拖鞋 耐磨露趾软底爸爸凉鞋 黑色 41',
						pXhao: '颜色:蓝色；尺码:L/170修身',
						pNum: 1,
						pJg: '1200000',
						pType: 0
					}, {
						pLogo: './static/images/ss.png',
						pName: '回力凉鞋男沙滩鞋休闲鞋夏季男士两用凉拖鞋 耐磨露趾软底爸爸凉鞋 黑色 41',
						pXhao: '颜色:蓝色；尺码:L/170修身',
						pNum: 1,
						pJg: '1200000',
						pType: 0
					}]
				}, {
					logo: './static/images/ss.png',
					storeName: '妍小姐韩国中国区广州市番禺天安门店102号',
					orderStatus: 1,
					aNum: 1,
					aJg: '120',
					pyf: 10,
					pzf: 1000,
					pStatus: 0,
					showNum: 10,
					showAll:false,
					pList: [{
						pLogo: './static/images/ss.png',
						pName: '回力凉鞋男沙滩鞋休闲鞋夏季男士两用凉拖鞋 耐磨露趾软底爸爸凉鞋 黑色 41',
						pXhao: '颜色:蓝色；尺码:L/170修身',
						pNum: 1,
						pJg: '120',
						pType: 0
					}, {
						pLogo: './static/images/ss.png',
						pName: '回力凉鞋男沙滩鞋休闲鞋夏季男士两用凉拖鞋 耐磨露趾软底爸爸凉鞋 黑色 41',
						pXhao: '颜色:蓝色；尺码:L/170修身',
						pNum: 1,
						pJg: '120',
						pType: 0
					}, {
						pLogo: './static/images/ss.png',
						pName: '回力凉鞋男沙滩鞋休闲鞋夏季男士两用凉拖鞋 耐磨露趾软底爸爸凉鞋 黑色 41',
						pXhao: '颜色:蓝色；尺码:L/170修身',
						pNum: 1,
						pJg: '120',
						pType: 0
					}, {
						pLogo: './static/images/ss.png',
						pName: '回力凉鞋男沙滩鞋休闲鞋夏季男士两用凉拖鞋 耐磨露趾软底爸爸凉鞋 黑色 41',
						pXhao: '颜色:蓝色；尺码:L/170修身',
						pNum: 1,
						pJg: '120',
						pType: 0
					}, {
						pLogo: './static/images/ss.png',
						pName: '回力凉鞋男沙滩鞋休闲鞋夏季男士两用凉拖鞋 耐磨露趾软底爸爸凉鞋 黑色 41',
						pXhao: '颜色:蓝色；尺码:L/170修身',
						pNum: 1,
						pJg: '120',
						pType: 0
					}, {
						pLogo: './static/images/ss.png',
						pName: '回力凉鞋男沙滩鞋休闲鞋夏季男士两用凉拖鞋 耐磨露趾软底爸爸凉鞋 黑色 41',
						pXhao: '颜色:蓝色；尺码:L/170修身',
						pNum: 1,
						pJg: '120',
						pType: 0
					}, {
						pLogo: './static/images/ss.png',
						pName: '回力凉鞋男沙滩鞋休闲鞋夏季男士两用凉拖鞋 耐磨露趾软底爸爸凉鞋 黑色 41',
						pXhao: '颜色:蓝色；尺码:L/170修身',
						pNum: 1,
						pJg: '120',
						pType: 0
					}, {
						pLogo: './static/images/ss.png',
						pName: '回力凉鞋男沙滩鞋休闲鞋夏季男士两用凉拖鞋 耐磨露趾软底爸爸凉鞋 黑色 41',
						pXhao: '颜色:蓝色；尺码:L/170修身',
						pNum: 1,
						pJg: '120',
						pType: 0
					}, {
						pLogo: './static/images/ss.png',
						pName: '回力凉鞋男沙滩鞋休闲鞋夏季男士两用凉拖鞋 耐磨露趾软底爸爸凉鞋 黑色 41',
						pXhao: '颜色:蓝色；尺码:L/170修身',
						pNum: 1,
						pJg: '120',
						pType: 0
					}, {
						pLogo: './static/images/ss.png',
						pName: '回力凉鞋男沙滩鞋休闲鞋夏季男士两用凉拖鞋 耐磨露趾软底爸爸凉鞋 黑色 41',
						pXhao: '颜色:蓝色；尺码:L/170修身',
						pNum: 1,
						pJg: '120',
						pType: 0
					}, {
						pLogo: './static/images/ss.png',
						pName: '回力凉鞋男沙滩鞋休闲鞋夏季男士两用凉拖鞋 耐磨露趾软底爸爸凉鞋 黑色 41',
						pXhao: '颜色:蓝色；尺码:L/170修身',
						pNum: 1,
						pJg: '120',
						pType: 0
					}, {
						pLogo: './static/images/ss.png',
						pName: '回力凉鞋男沙滩鞋休闲鞋夏季男士两用凉拖鞋 耐磨露趾软底爸爸凉鞋 黑色 41',
						pXhao: '颜色:蓝色；尺码:L/170修身',
						pNum: 1,
						pJg: '120',
						pType: 0
					}]
				}, {
					logo: './static/images/ss.png',
					storeName: '妍小姐韩国中国区广州市番禺天安门店102号',
					orderStatus: 3,
					aNum: 1,
					aJg: '120',
					pyf: 10,
					pzf: 1000,
					pStatus: 0,
					pList: [{
						pLogo: './static/images/ss.png',
						pName: '回力凉鞋男沙滩鞋休闲鞋夏季男士两用凉拖鞋 耐磨露趾软底爸爸凉鞋 黑色 41',
						pXhao: '颜色:蓝色；尺码:L/170修身',
						pNum: 1,
						pJg: '120',
						pType: 0
					}]
				}, {
					logo: './static/images/ss.png',
					storeName: '妍小姐韩国中国区广州市番禺天安门店102号',
					orderStatus: 2,
					aNum: 1,
					aJg: '120',
					pyf: 10,
					pzf: 1000,
					pStatus: 0,
					pList: [{
						pLogo: './static/images/ss.png',
						pName: '回力凉鞋男沙滩鞋休闲鞋夏季男士两用凉拖鞋 耐磨露趾软底爸爸凉鞋 黑色 41',
						pXhao: '颜色:蓝色；尺码:L/170修身',
						pNum: 1,
						pJg: '120',
						pType: 0
					}]
				}, {
					logo: './static/images/ss.png',
					storeName: '妍小姐韩国中国区广州市番禺天安门店102号',
					orderStatus: 1,
					aNum: 1,
					aJg: '120',
					pyf: 10,
					pzf: 1000,
					pStatus: 1,
					pList: [{
						pLogo: './static/images/ss.png',
						pName: '回力凉鞋男沙滩鞋休闲鞋夏季男士两用凉拖鞋 耐磨露趾软底爸爸凉鞋 黑色 41',
						pXhao: '颜色:蓝色；尺码:L/170修身',
						pNum: 1,
						pJg: '120',
						pType: 0
					}]
				}, {
					logo: './static/images/ss.png',
					storeName: '妍小姐韩国中国区广州市番禺天安门店102号',
					orderStatus: 4,
					aNum: 1,
					aJg: '120',
					pyf: 10,
					pzf: 1000,
					pStatus: 1,
					pList: [{
						pLogo: './static/images/ss.png',
						pName: '回力凉鞋男沙滩鞋休闲鞋夏季男士两用凉拖鞋 耐磨露趾软底爸爸凉鞋 黑色 41',
						pXhao: '颜色:蓝色；尺码:L/170修身',
						pNum: 1,
						pJg: '120',
						pType: 0
					}]
				}, {
					logo: './static/images/ss.png',
					storeName: '妍小姐韩国中国区广州市番禺天安门店102号',
					orderStatus: 3,
					aNum: 1,
					aJg: '120',
					pyf: 10,
					pzf: 1000,
					pStatus: 1,
					pList: [{
						pLogo: './static/images/ss.png',
						pName: '回力凉鞋男沙滩鞋休闲鞋夏季男士两用凉拖鞋 耐磨露趾软底爸爸凉鞋 黑色 41',
						pXhao: '颜色:蓝色；尺码:L/170修身',
						pNum: 1,
						pJg: '120',
						pType: 0
					}]
				}, {
					logo: './static/images/ss.png',
					storeName: '妍小姐韩国中国区广州市番禺天安门店102号',
					orderStatus: 2,
					aNum: 1,
					aJg: '120',
					pyf: 10,
					pzf: 1000,
					pStatus: 1,
					pList: [{
						pLogo: './static/images/ss.png',
						pName: '回力凉鞋男沙滩鞋休闲鞋夏季男士两用凉拖鞋 耐磨露趾软底爸爸凉鞋 黑色 41',
						pXhao: '颜色:蓝色；尺码:L/170修身',
						pNum: 1,
						pJg: '120',
						pType: 0
					}]
				}]
			}
		},
		components: {
			settingHeader,
			Loading,
			noMore,
			BScroll
		},
		created() {

			if(this.$route.query.tabNo) {
				this.tabNo = true
			}

			this.tabIndex = this.$route.query.tabIndex ? this.$route.query.tabIndex : 0

			this.InitScroll()
		},
		mounted() {},
		methods: {
			onItemClick(index) {
				var _this = this

				_this.tabIndex = index
				_this.$router.replace({
					query: _this.merge(_this.$route.query, {
						'tabIndex': index
					})
				})
			},
			showS() {
				this.show = !this.show
			},
			typeOrder(index) {
				this.typeOrderIndex = index
			},
			typeDate(index) {
				this.typeDateIndex = index
			},
			lookAllp(length, index) {
				this.sList[index].showAll = !this.sList[index].showAll
				this.sList[index].showNum = this.sList[index].showAll ? length : 10
			},
			//付款
			pay() {
				this.$router.push({
					path: '/shop/confirm'
				})
			},
			//取消订单
			cancellationOrder() {
				var _this = this
				_this.$dialog.show({
					type: 'warning',
					headMessage: '提示',
					message: '亲,您确定要取消订单？',
					buttons: ['确定', '取消'],
					canel() {

					},
					confirm() {
						_this.$vux.toast.show({
							width: '50%',
							type: 'text',
							position: 'middle',
							text: '取消成功'
						})
					}
				})
			},
			//删除订单
			deleteOrder() {
				var _this = this
				_this.$dialog.show({
					type: 'warning',
					headMessage: '提示',
					message: '亲,您确定要删除该订单？',
					buttons: ['确定', '取消'],
					canel() {

					},
					confirm() {
						_this.$vux.toast.show({
							width: '50%',
							type: 'text',
							position: 'middle',
							text: '删除成功'
						})
					}
				})
			},
			//评价
			toEvaluate() {
				this.$router.push({
					path: '/shop/write_comments'
				})
			},
			//跳转详情
			toDetail() {
				this.$router.push({
					path: '/shop/order_details'
				})
			},
			InitScroll() {
				this.$nextTick(() => {
					if(!this.scroll) {
						this.scroll = new BScroll(this.$refs.wrapper, {
							click: true,
							scrollY: true,
							pullUpLoad: {
								threshold: -50
							}
						})
						this.scroll.on('pullingUp', (pos) => {
							this.LoadData()

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
			LoadData() {

			}
		}
	}
</script>

<style lang="less" scoped>
	.screen_box {
		padding: 0.26rem;
		box-sizing: border-box;
		background-color: white;
		.screen_btn {
			width: 100%;
			height: 0.7rem;
			line-height: 0.7rem;
			text-align: center;
			border-radius: 2px;
			border: 1px solid rgba(51, 111, 255, 1);
			font-size: 0.28rem;
			font-family: PingFangSC-Regular;
			color: rgba(51, 111, 255, 1);
			margin: 0 auto;
			margin-top: 0.7rem;
		}
		.type_title {
			position: relative;
			font-size: 0.28rem;
			font-family: PingFangSC-Regular;
			color: rgba(144, 162, 199, 1);
			text-align: center;
			margin-bottom: 0.2rem;
		}
		.type_box {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.type_item {
				width: 2.17rem;
				height: 0.66rem;
				line-height: 0.66rem;
				text-align: center;
				background: rgba(245, 246, 250, 1);
				border-radius: 2px;
				font-size: 0.24rem;
				font-family: PingFangSC-Regular;
				color: rgba(25, 37, 67, 1);
				margin: 0.1rem 0;
			}
			.blue {
				background: rgba(51, 111, 255, 1);
				color: white;
			}
		}
	}
	
	.my_order_box {
		.px {
			position: fixed;
			top: 0;
			width: 100%;
			z-index: 15;
		}
		.search {
			height: 1rem;
			padding: 0.17rem 0.30rem;
			box-sizing: border-box;
			background-color: white;
			position: relative;
			display: flex;
			.ss_box_right {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				position: relative;
				img {
					width: 0.36rem;
					height: 0.36rem;
				}
			}
			.ss_box_right:before {
				content: " ";
				position: absolute;
				left: 0;
				top: 0.08rem;
				width: 1px;
				bottom: 0.08rem;
				border-right: 1px solid #C7C7C7;
				color: #C7C7C7;
				-webkit-transform-origin: 100% 0;
				transform-origin: 100% 0;
				-webkit-transform: scaleX(0.5);
				transform: scaleX(0.5);
			}
			.ss_box_left {
				width: 5.85rem;
				height: 0.66rem;
				border-radius: 4px;
				position: relative;
				display: flex;
				align-items: center;
				margin-right: 0.35rem;
				input {
					width: 100%;
					height: 100%;
					background: rgba(245, 246, 250, 1);
					padding-left: 0.78rem;
					box-sizing: border-box;
					font-size: 0.28rem;
					font-family: PingFangSC-Regular;
					color: rgba(144, 162, 199, 1);
				}
				img {
					width: 0.32rem;
					height: 0.32rem;
					position: absolute;
					left: 0.26rem;
				}
			}
		}
		.search:before {
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
		.search:after {
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
		.tab_box {
			height: 0.82rem;
		}
		.order_list_box {
			.wrapper {
				position: absolute;
				top: 2.02rem;
				bottom: 0;
				width: 100%;
				background: rgba(245, 246, 250, 1);
				z-index: 11;
			}
			.top0 {
				top: 0.2rem!important;
			}
			.order_item {
				background: white;
				margin-bottom: 0.2rem;
				.order_top {
					height: 0.8rem;
					display: flex;
					justify-content: space-between;
					box-sizing: border-box;
					padding: 0.17rem 0.30rem;
					.left {
						width: 65%;
						display: flex;
						align-items: center;
						img {
							width: 0.36rem;
							height: 0.36rem;
							margin-right: 0.23rem;
						}
						p {
							font-size: 0.28rem;
							font-family: PingFangSC-Regular;
							color: rgba(26, 38, 66, 1);
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							-webkit-line-clamp: 1;
							-webkit-box-orient: vertical;
						}
						i {
							font-size: 0.5rem;
						}
					}
					.right {
						width: 35%;
						display: flex;
						align-items: center;
						justify-content: flex-end;
						font-size: 0.26rem;
						font-family: PingFangSC-Medium;
						color: rgba(51, 111, 255, 1);
					}
				}
				.order_middle {
					height: 1.70rem;
					display: flex;
					background: rgba(245, 246, 250, 1);
					position: relative;
					.left {
						width: 1.70rem;
						height: 1.70rem;
						display: flex;
						align-items: center;
						justify-content: center;
						img {
							width: 80%;
							height: auto;
						}
					}
					.middle {
						width: 3.8rem;
						padding: 0.18rem;
						box-sizing: border-box;
						.name {
							font-size: 0.24rem;
							font-family: PingFangSC-Regular;
							color: rgba(26, 38, 66, 1);
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
						}
						.pinfo {
							font-size: 0.24rem;
							font-family: PingFangSC-Regular;
							color: rgba(144, 162, 199, 1);
							margin-top: 0.05rem;
						}
					}
					.right {
						flex: 1;
						text-align: right;
						padding: 0.18rem 0.30rem 0rem 0rem;
						box-sizing: border-box;
						.price {
							font-size: 0.24rem;
							font-family: PingFangSC-Regular;
							color: rgba(26, 38, 66, 1);
						}
						.num {
							font-size: 0.24rem;
							font-family: PingFangSC-Regular;
							color: rgba(144, 162, 199, 1);
							margin-top: 0.05rem;
						}
					}
				}
				.m:after {
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
				}
				.look_all_box {
					height: 0.85rem;
					background: rgba(245, 246, 250, 1);
					display: flex;
					align-items: center;
					justify-content: center;
					position: relative;
					div {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 6.18rem;
						height: 0.56rem;
						font-size: 0.24rem;
						font-family: PingFangSC-Regular;
						color: rgba(115, 134, 173, 1);
						text-align: center;
						border-radius: 2px;
						border: 1px solid rgba(144, 162, 199, 1);
						img {
							width: 0.2rem;
							height: auto;
							margin-left: 0.1rem;
							transform: rotate(-180deg)
						}
						.r {
							transform: rotate(0deg)
						}
					}
				}
				.look_all_box:before {
					content: " ";
					position: absolute;
					left: 0;
					top: 0;
					right: 0;
					height: 1px;
					border-top: 1px solid #D8DFF0;
					color: #D8DFF0;
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: scaleY(0.5);
					transform: scaleY(0.5);
					left: 0px;
				}
				.order_bottom {
					height: 0.8rem;
					padding: 0.18rem;
					box-sizing: border-box;
					display: flex;
					align-items: baseline;
					justify-content: flex-end;
					font-family: PingFangSC-Regular;
					color: rgba(26, 38, 66, 1);
					.num {
						margin-right: 0.17rem;
					}
					span {
						font-size: 0.24rem;
					}
					i {
						font-size: 0.32rem;
					}
					.yf {
						font-size: 0.20rem;
					}
				}
				.order_bth_box {
					padding: 0.18rem;
					box-sizing: border-box;
					height: 1rem;
					position: relative;
					.btn {
						display: flex;
						justify-content: flex-end;
						div {
							display: flex;
							align-items: center;
							text-align: center;
							height: 0.56rem;
							padding: 0.18rem;
							box-sizing: border-box;
							border: 1px solid rgba(144, 162, 199, 1);
							border-radius: 2px;
							margin-left: 0.53rem;
							font-size: 0.26rem;
							font-family: PingFangSC-Medium;
							color: rgba(144, 162, 199, 1);
						}
						div:last-child {
							border: 1px solid rgba(51, 111, 255, 1);
							color: rgba(51, 111, 255, 1);
						}
					}
				}
				.order_bth_box:before {
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
			}
		}
	}
</style>
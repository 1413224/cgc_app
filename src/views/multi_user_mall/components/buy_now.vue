<template>
	<div class="scan_pay_box">
		<!-- <settingHeader title="向商家付款"></settingHeader> -->
		<div class="b-w">
			<div class="shop_info_box">
				<img class="shop_logo" v-if="goodsConsumer.goodsLogo" :src="goodsConsumer.goodsLogo.original" />
				<p class="shop_name">付款给商户： <span>{{goodsConsumer.enterpriseName}}</span></p>
			</div>
			<div class="input_box">
				<p class="tip">付款金额：</p>
				<div class="input-div">
					<p>¥{{Number((goodsConsumer.minPrice * goodsnum)).toFloor(2)}}</p>
					<!-- <input type="number" v-model="moneyNum" placeholder="请输入付款金额"> -->
					<!-- @keyup="moneyNumChange($event)" -->
				</div>
			</div>
			<!-- 购买数量 -->
			<div class="number-box pr">
				<p>购买数量</p>
				<x-number v-model="goodsnum" :min="1" width="50px" button-style="round" @on-change="numC"></x-number>
			</div>
			<!-- 购买数量end -->

			<!--优惠券-->
			<!-- <div class="coupon-box" @click="activeCoupon">
				<div class="left">优惠券</div>
				<div class="right">
					<p class="no" v-if="denomination == '' && coupon.length>0">可用优惠券{{coupon.length}}张</p>
					<p class="no" v-if="coupon.length==0">暂无可用优惠券</p>
					<p v-if="denomination != '' && coupon.length != 0">- ¥{{denomination}}</p>
					<img class="right-img" :src="'./static/images/b-right.png'" />
				</div>
			</div> -->
			<!--企业通用积分-->
			<div class="enterprise-integral-box" @click="useEnterpriseIntegral">
				<div class="left">企业通用积分</div>
				<div class="right">
					<p>- ¥{{Number(enterpriseIntegral).toFloor(2)}}</p>
					<!--<p class="no" v-if="coupon.length==0">暂无可用优惠券</p>-->
					<!--<p v-if="denomination != ''">- ¥{{denomination}}</p>-->
					<img class="right-img" :src="'./static/images/b-right.png'" />
				</div>
			</div>
		</div>
		<!--通用积分-->
		<div class="integral-box">
			<div class="left">
				<div class="top">
					<div>
						<img :src="'./static/images/qian.png'" />
						<p>通用积分</p>
					</div>
					<!-- <p class="money">可用：{{Number(balance).toFloor(2)}}</p> -->
					<p class="money">可用：{{Number(balance).toFloor(2)}}</p>
				</div>
				<div class="bottom" @click="$router.push({path:'/rule'})">
					<p>使用规则</p>
					<img :src="'./static/images/taihao.png'" />
				</div>
			</div>
			<div class="right" @click="showIntegral = true">
				<p>- ¥{{Number(integralNum).toFloor(2)}}</p>
				<img :src="'./static/images/b-right.png'" />
			</div>
		</div>

		<div class="money-box">
			<p>小计: <span> ¥</span> <i>{{Number(payMoney).toFloor(2)}}</i></p>
		</div>
		<!-- @click="confirm" -->
		<div class="pay-btn" @click="confirm">确认支付</div>

		<div>
			<popup v-model="showIntegral" @on-hide="sureIntegralNum">
				<div class="integral_popup">
					<div class="pd">
						<p class="title">通用积分使用</p>
						<div class="tip">
							<p>使用金额</p>
							<p>可用：{{Number(balance).toFloor(2)}}</p>
						</div>
						<div class="input-div">
							<p>¥</p>
							<input type="number" v-model="integralNum" @keyup="payChangety($event)" placeholder="请输入通用积分数">
						</div>
						<p class="gz" @click="$router.push({path:'/rule'})">通用积分规则</p>
					</div>
					<!-- showIntegral = false -->
					<div class="btn" @click="sureIntegralNum">确定</div>
				</div>
			</popup>
		</div>

		<div>
			<!-- 优惠券列表开始 -->
			<popup class="coupon-popup" v-model="showCoupon" :hide-on-blur=false>
				<div class="pr-box">
					<div class="header">
						<div class="all">
							<p>优惠券</p>
						</div>
					</div>
					<div class="couponlist-box">
						<div v-for="(item,index) in coupon" :key="item.userCouponId" class="bs" @click="checkCoupon(index,item)">
							<div class="blue" v-if="sureIndex == index && item.show">
								<div class="pr-box">
									<img class="sureImg" v-if="sureIndex == index && item.show" src="../../../../static/images/gou.png" />
								</div>
							</div>
							<div class="bg">
								<div class="top">
									<div>
										<div class="one">
											<div class="type-btn" v-if="item.type == 0">满减券</div>
											<div class="type-btn" v-if="item.type == 10">体验券</div>
											<div class="type-btn" v-if="item.type == 20">满减券</div>
											<div class="type-btn" v-if="item.type == 30">折扣券</div>
											<div class="type-btn" v-if="item.type == 40">运费券</div>
											<div class="type-btn" v-if="item.type == 50">现金券</div>
											<span>{{item.name}}</span>
										</div>
										<p>使用期限：{{item.startTime | getDate2}} 至 {{item.endTime | getDate2}}</p>
									</div>
									<div class="money">
										<div>
											<span>{{item.denomination}}</span>元
											<br />
											<i>满{{item.condition}}元可用</i>
										</div>
									</div>
								</div>
							</div>
							<div class="bottom show">
								<span class="shang">{{item.content?item.content:'暂无详细说明'}}</span>
							</div>
						</div>

					</div>
					<!-- showCoupon = false -->
					<div class="btn" @click="couponSure()">确定</div>
				</div>
			</popup>
			<payMode :options="payOptions" :payPrice="payPrice" :orderId="orderId"></payMode>
			<!-- 优惠券列表结束 -->

			<!--企业通用卡-->
			<div class="bottom_box" v-if="integralOptions.showIntegralMode">
				<div>
					<span>使用金额：</span><span><i>¥ </i>{{Number(enterpriseIntegral).toFloor(2)}}</span>
				</div>
				<!-- integralOptions.showIntegralMode = false -->
				<div class="btn" @click="sureIntergral()">确认 </div>
			</div>
			<div v-if="ready">
				<Integral :options="integralOptions" :payMoney="payMoney" :enterpriseIntegral="enterpriseIntegral" @enterprisecards="enterpriseCards" @reduceenterprise="reduceEnterprise" :totalUseEnterpriseBalance="totalUseEnterpriseBalance" @reduce="reduce" :newUseEnterpriseBalance="newUseEnterpriseBalance">
				</Integral>
			</div>
		</div>

	</div>
</template>

<script>
	import QS from 'qs'
	import settingHeader from '@/components/setting_header'
	import { XInput, Popup } from 'vux'
	import payMode from '@/components/payMode'
	import Integral from '@/views/multi_user_mall/integral'
	// import calculation from '@/components/calculation'

	export default {
		name: 'payment',
		props: {
			goodsConsumer: {
				type: Object,
				default: {

				}
			}
		},
		data() {
			var _this = this;
			return {
				showIntegral: false,
				showCoupon: false,
				moneyNum: '', //输入的金额(付款)
				sureIndex: 100,
				userCouponId: '', //优惠券id
				orderId: '', //获取到的订单编号
				ip: '',
				body: '',
				payOptions: {},
				denomination: "", //（减多少金额）优惠券
				condition: 0,
				coupon: [], //可用优惠券列表
				chkcouponId: '', //已选中的优惠券id
				integralNum: 0, //需要支付的通用积分
				balance: 0, //通用积分  初始化
				cardList: [], //企业通用卡列表
				totalUseEnterpriseBalance: 0, //本次最多使用的企业通用积分总额
				payMoney: 0, //第三方支付的金额
				payPrice: 0,
				couponType: 0,
				discount: 0,
				no: '',
				shopId: '',
				info: {}, //企业信息
				integralOptions: { //
					showIntegralMode: false,
					data: {},
				},
				newUseEnterpriseBalance: 0, //本次最多使用的企业通过积分总额（改变后的）
				setMoney: 0,
				ready: false,
				enterpriseIntegral: 0, //企业通用积分
				enterpriseCard: [], //子组件传出的企业通用卡列表
				tradeNo: '', //支付宝交易号
				orderMessage: '', //订单信息
				caculoptions: {}, //数字键盘
				caculNum: '', //键盘数字
				goodsnum: '1', //默认数量
				spbillCreateIp: '', //终端ip
				// minPrice:_this.goodsConsumer.minPrice
			}
		},
		components: {
			settingHeader,
			XInput,
			Popup,
			payMode,
			Integral,
			// calculation
		},
		created() {
			var _this = this

			/*_this.no = this.mainApp.getCs('no')
			sessionStorage.setItem('no', _this.mainApp.getCs('no'))

			_this.getAllianceInfo()*/

			console.log(_this.goodsConsumer)
			// console.log(22.229.toFloor(2))
			_this.info = _this.goodsConsumer

			_this.payOptions = {
				showPayMode: false,
				data: {
					money: 0,
					payList: []
				},
				changePay(type) {

				},
				toPay(type) {
					if(/MicroMessenger/.test(window.navigator.userAgent)) {
						//微信支付
						if(type == 1) {
							var openid = localStorage['_openid_']
							var params = {
								body: _this.body,
								feeType: 'CNY',
								outTotalFee: Number(_this.payMoney).toFloor(2),
								spbillCreateIp: _this.spbillCreateIp,
								tradeType: 'JSAPI',
								openId: openid,
								parentOrderSn: _this.orderId,
								// attach: _this.info.enterpriseName,
								userId: _this.$store.state.user.userId
							}

							if(location.host == _this.url.health) {
								params.id = _this.url.IdHealth
							} else if(location.host == _this.url.cgc) {
								params.id = _this.url.IdCgc
							} else if(location.host == _this.url.test) {
								params.id = _this.url.IdTest
							}

							_this.$http.post(_this.url.zf.pay, params).then((res) => {
								var data = res.data.data
								WeixinJSBridge.invoke(
									'getBrandWCPayRequest', {
										"appId": data.appId, // 公众号名称，由商户传入
										"timeStamp": data.timeStamp, // 时间戳，自1970年以来的秒数
										"nonceStr": data.nonceStr, // 随机串
										"package": data.package,
										"signType": "MD5", // 微信签名方式：
										"paySign": data.paySign // 微信签名
									},
									function(res) {
										if(res.err_msg == "get_brand_wcpay_request:ok") {
											// WeixinJSBridge.call('closeWindow')
											_this.$router.replace({
												path: '/shop/my_order2'
											});
										} else if(res.err_msg == "get_brand_wcpay_request:cancel") {
											_this.$vux.toast.show({
												text: '您已取消了支付',
												type: 'text',
												position: 'top',
												width: '50%'
											})
										} else if(res.err_msg == "get_brand_wcpay_request:fail") {
											_this.$vux.toast.show({
												text: '支付失败',
												type: 'text',
												position: 'top',
												width: '50%'
											})
										} else {
											_this.$vux.toast.show({
												text: '支付异常',
												type: 'text',
												position: 'top',
												width: '50%'
											})
										}
									}
								)
							})
						}
					} else {
						// if(/AlipayClient/.test(window.navigator.userAgent)) 
						/*alert('支付宝客户端');
						alert('userid'+_this.$store.state.user.userId)
						alert('aliid'+localStorage['_zfbopenId_'])*/
						/*alert("金额"+Number(_this.payMoney))
						alert("jiee"+Number(_this.payMoney))*/

						if(type == 2) {
							if(location.host == _this.url.test) {
								var cgcPayId = 500003,
									returnUrl = "http://www.cgc999.com/new/index.html#/shop/my_order2";
							} else if(location.host == _this.url.health) {
								var cgcPayId = 500000,
									returnUrl = "https://health.cgc999.com/web/new/index.html#/shop/my_order2";
							} else {
								var cgcPayId = 500003,
									returnUrl = "http://www.cgc999.com/new/index.html#/shop/my_order2";
							}

							_this.$http.post(_this.url.zf.alipay, {
								cgcPayId: cgcPayId,
								parentOrderSn: _this.orderId,
								body: _this.body,
								goodsType: "1",
								subject: _this.body,
								outTotalAmount: Number(_this.payMoney).toFloor(2),
								userId: _this.$store.state.user.userId,
								returnUrl: returnUrl
							}).then((res) => {
								if(res.data.status == "00000000") {

									_this.tradeNo = res.data.data.tradeNo

									document.write(res.data.data.orderStr);

									return false;

									AlipayJSBridge.call("tradePay", {
										tradeNO: _this.tradeNo
									}, function(data) {
										log(JSON.stringify(data));
										if("9000" == data.resultCode) {
											log("支付成功");
										}
									});
								} else if(res.data.status == "ALIPAY_0002") {
									_this.$router.push({
										path: '/index',
										query: {
											no: sessionStorage['_cno_']
										}
									})
								} else if(res.data.status == "ALIPAY_1004") {
									_this.$router.push({
										path: '/index',
										query: {
											no: sessionStorage['_cno_']
										}
									})
								}
							})
						}
					}
					//					else {
					//						alert('其他浏览器');
					//					}
				},
				hide() {},
				show() {}
			}
			// this.getBalance()
			// 数字键盘逻辑
			/*_this.caculoptions = {

			}*/
		},
		mounted() {
			// this.getBalance()
			this.getUseCuopons()
		},
		methods: {

			//获取通用积分
			/*getBalance(){
				var _this = this

				var params;
				_this.$http.get(_this.url.goods.getGoodsOrderConfirmUseBalances,{
					params:{
						userId: _this.$store.state.user.userId,
						platformId: _this.url.platformId,
						nums: _this.goodsnum,
						skuId: _this.goodsConsumer.skuId,
						totalPrice:_this.goodsConsumer.minPrice * _this.goodsnum
						// couponId: _this.userCouponIds[0] || ''
					}
				}).then((res) => {
					if(res.data.status == "00000000"){
						console.log(res.data.data)
						_this.balance = res.data.data.availableBalance

					}
				})
			},*/

			//获取企业信息
			/*getAllianceInfo() {
				var _this = this
				_this.$http.get(_this.url.user.getAllianceInfo, {
					params: {
						cgcPayCode: _this.no,
						type: 1
					}
				}).then((res) => {
					if(res.data.status == "00000000") {

						_this.info = res.data.data
						sessionStorage.setItem('shopId', res.data.data.allianceId)
					}
				})
			},*/

			//输入付款金额
			/*moneyNumChange(event) {

				var _this = this,
					reg = "";

					_this.ready = false
					// console.log(_this.ready)
				//键盘事件
				var keyValue = event.key
				if(_this.mainApp.isBackspace(keyValue) && _this.mainApp.isDot(keyValue) && _this.mainApp.isNumber(keyValue)){
					//其他按键
					event.preventDefault();
					event.stopPropagation();
					return false;
				}


				//遗留一个bug 需正则判断数值
				if(Number(_this.moneyNum) < 0) {
					_this.moneyNum = 0
				}

				// reg = /(^[1-9]([0-9]+)?(\.[0-9]{0,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
				reg=/^(([0-9][0-9]*)|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2})))$/

				if(_this.moneyNum==""){
					_this.enterpriseIntegral=0
					_this.payMoney = 0
					_this.coupon = ""
					_this.integralNum = 0
				}

				if(!reg.test(Number(_this.moneyNum))){
					_this.$vux.toast.show({
						text: '请输入正确的格式',
						type: 'text',
						position: 'top',
						width: '50%'
					})
					_this.moneyNum = _this.moneyNum.slice(0,_this.moneyNum.length-1)
					return
				}

				if(Number(_this.moneyNum)>99999999){
					_this.moneyNum = _this.moneyNum.slice(0,_this.moneyNum.length-1)
					return
				}

				// _this.integralNum = Number(this.moneyNum).toFloor(2) || 0

				if(_this.moneyNum != ""){
					
					_this.getUseCuopons(_this.chkcouponId);//获取用户可用优惠券
				}

			},*/

			//点击增加或减少商品数量
			numC() {
				// console.log(this.goodsnum)
				/*var _this = this,
				    totalPrice = _this.goodsnum * _this.goodsConsumer.minPrice
				console.log(totalPrice)*/
				this.getUseCuopons()
			},

			//获取用户可用优惠券
			getUseCuopons(couponId) {
				var _this = this
				var paramss = {
					userId: _this.$store.state.user.userId,
					platformId: _this.url.platformId,
					nums: _this.goodsnum,
					skuId: _this.goodsConsumer.skuId,
					totalPrice: _this.goodsConsumer.minPrice * Number(_this.goodsnum)
				}

				if(couponId) {
					paramss.couponId = _this.chkcouponId
				}

				_this.$http.get(_this.url.goods.getGoodsOrderConfirmUseBalances, {
					params: paramss
				}).then((res) => {
					if(res.data.status == "00000000") {
						console.log(res.data.data)

						_this.ready = true
						var couponLng,
							cardListLng;

						_this.balance = res.data.data.availableBalance
						_this.integralOptions.data = res.data.data //返回的所有数据

						_this.totalUseEnterpriseBalance = res.data.data.totalUseEnterpriseBalance
						_this.useTotalUseEnterpriseBalance = res.data.data.totalUseEnterpriseBalance

						_this.coupon = res.data.data.availableCoupon //可用优惠券列表
						_this.cardList = res.data.data.cardList //企业通用卡列表

						cardListLng = res.data.data.cardList.length //企业通用卡列表长度
						couponLng = _this.coupon.length //优惠券列表长度

						//判断存不存在已选中的优惠券
						if(couponLng == 0) {
							if(_this.chkcouponId) {
								_this.chkcouponId = ""
								_this.denomination = ""
							}
						} else {
							for(let i = 0; i < couponLng; i++) {
								if(_this.coupon[i].userCouponId == _this.chkcouponId) {
									break;
								} else {
									if(i == couponLng - 1) {
										_this.chkcouponId = ""
										_this.denomination = ""
									}
								}
							}
						}

						_this.enterpriseIntegral = 0
						for(let i = 0; i < cardListLng; i++) {
							_this.enterpriseIntegral += _this.cardList[i].canUseBalance
						}

						_this.denomination = _this.integralOptions.data.discountPrice //优惠券金额

						_this.integralNum = Number(_this.integralOptions.data.useBalance).toFloor(2) //计算需要使用的通用积分

						_this.payMoney = _this.integralOptions.data.payPrice //第三方实际支付的金额

					}
				})
			},

			//点击弹出优惠券列表
			activeCoupon() {

				var _this = this;
				// _this.ready = true
				if(_this.coupon.length > 0) {
					_this.showCoupon = true
					//遍历查找是否有选中的优惠券
					for(var i = 0; i < _this.coupon.length; i++) {
						if(_this.coupon[i].userCouponId == _this.chkcouponId) {
							_this.coupon[i].show = true
							_this.sureIndex = i
							this.$forceUpdate()
							break;
						} else {
							// console.log("点击弹出优惠券列表没找到"+_this.chkcouponId)
						}
					}

				} else {
					_this.$vux.toast.show({
						text: '暂无可用优惠券',
						type: 'text',
						position: 'top',
						width: '50%'
					})
				}
			},

			//选中某一优惠券
			checkCoupon(index, item) {
				var _this = this
				_this.sureIndex = index
				item.show = !item.show
				// console.log(this.coupon[index])
				if(item.show == true) {
					_this.chkcouponId = item.userCouponId //保存选中的优惠券id
				} else {
					_this.chkcouponId = ""
				}
				this.$forceUpdate()
				// _this.denomination = item.denomination //减少的金额（满减）
			},

			//点击优惠券的确定按钮
			couponSure() {
				var _this = this
				_this.showCoupon = false
				_this.ready = false
				_this.getUseCuopons(_this.chkcouponId)
			},

			reduce(num) {
				this.payMoney = num
			},
			//减少企业通用积分时
			reduceEnterprise(num) {
				this.enterpriseIntegral = num
				console.log(this.enterpriseIntegral)
			},

			//点击确认的企业通用积分
			sureIntergral() {
				var _this = this
				_this.integralOptions.showIntegralMode = false
				_this.payMoney = ((Number(_this.goodsConsumer.minPrice) * Number(_this.goodsnum)).toFloor(2) - (Number(_this.denomination).toFloor(2)) - (Number(_this.enterpriseIntegral).toFloor(2)) - (Number(_this.integralNum).toFloor(2))).toFixed(2)
			},

			//子组件传出来的企业通用卡列表
			enterpriseCards(data) {
				this.enterpriseCard = data
				// console.log(this.enterpriseCard)
			},
			//通用积分实时绑定
			payChangety(event) {
				var _this = this;
				var reg;
				//键盘事件
				var keyValue = event.key
				if(_this.mainApp.isBackspace(keyValue) && _this.mainApp.isDot(keyValue) && _this.mainApp.isNumber(keyValue)) {
					//其他按键
					event.preventDefault();
					event.stopPropagation();
					return false;
				}
				// reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
				reg = /^(([0-9][0-9]*)|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{1,2})))$/
				if(!reg.test(Number(_this.integralNum))) {

					var numpays = ((_this.goodsConsumer.minPrice * Number(_this.goodsnum)) - Number(_this.denomination) - Number(_this.enterpriseIntegral)).toFloor(2)

					if(Number(_this.integralNum) > numpays) {

						_this.integralNum = numpays
					} else {
						_this.integralNum = _this.integralNum.slice(0, _this.integralNum.length - 1)
					}
					return;
				}

				/*console.log(_this.payMoney)//第三方
				console.log(_this.integralNum)*/
				if(Number(_this.integralNum) > Number(_this.balance)) {

					let numpay = ((_this.goodsConsumer.minPrice * Number(_this.goodsnum)) - Number(_this.denomination) - Number(_this.enterpriseIntegral)).toFloor(2)
					if(_this.integralNum > numpay) {
						_this.integralNum = numpay
						// console.log(numpay)
					} else {
						_this.integralNum = _this.balance
						_this.$vux.toast.show({
							text: '最大金额为' + _this.balance,
							type: 'text',
							position: 'top',
							width: '50%'
						})
					}

				} else {
					// if()这里有问题_this.integralNum
					var numpay = "";
					numpay = ((_this.goodsConsumer.minPrice * Number(_this.goodsnum)) - Number(_this.denomination) - Number(_this.enterpriseIntegral)).toFloor(2)
					if(Number(_this.integralNum) > numpay) {

						_this.integralNum = numpay
						// console.log(numpay)

					}
				}
			},
			//点击确认修改通用积分
			sureIntegralNum() {
				var _this = this
				/*_this.payMoney = (_this.goodsConsumer.minPrice * Number(_this.goodsnum)) - Number(_this.denomination) - Number(_this.enterpriseIntegral) - Number(_this.integralNum)*/

				_this.payMoney = ((Number(_this.goodsConsumer.minPrice) * Number(_this.goodsnum)).toFloor(2) - (Number(_this.denomination).toFloor(2)) - (Number(_this.enterpriseIntegral).toFloor(2)) - (Number(_this.integralNum).toFloor(2))).toFixed(2)

				_this.showIntegral = false
			},

			//使用第三方支付的金额
			payThree() {
				var _this = this
				// _this.payMoney = (_this.goodsConsumer.minPrice * Number(_this.goodsnum)) - Number(_this.balance) - Number(_this.denomination) - Number(_this.enterpriseIntegral)

				_this.payMoney = ((Number(_this.goodsConsumer.minPrice) * Number(_this.goodsnum)).toFloor(2) - (Number(_this.denomination).toFloor(2)) - (Number(_this.enterpriseIntegral).toFloor(2)) - (Number(_this.integralNum).toFloor(2))).toFixed(2)

				return _this.payMoney
			},

			integralSure() {

			},

			//支付
			confirm() {

				var _this = this,
					arrall = [];

				var params = {
					/*shopId: _this.info.allianceId,
					userId: _this.$store.state.user.userId,
					// userId:sessionStorage['_uid_'],
					balance: _this.integralNum,
					couponId: _this.chkcouponId,
					enterprisePrice: 0,
					totalPrice: (goodsConsumer.minPrice * Number(_this.goodsnum)),
					realPrice: _this.payMoney.toFloor(2),
					enterpriseCards:_this.enterpriseCard*/
					userId: _this.$store.state.user.userId,
					skuId: _this.goodsConsumer.skuId,
					nums: _this.goodsnum,
					// userCouponIds: [_this.chkcouponId],
					platformId: _this.url.platformId,
					enterpriseCards: _this.enterpriseCard,
					balance: _this.integralNum != "" ? _this.integralNum : 0
				}
				if(_this.chkcouponId) {
					params.userCouponIds = [_this.chkcouponId]
				}
				// return;
				if(_this.enterpriseCard.length == 0) {
					for(let i = 0; i < _this.cardList.length; i++) {
						if(_this.cardList[i].canUseBalance == 0) {
							continue;
						} else {
							arrall.push({
								userCardId: _this.cardList[i].userCardId,
								balance: Number(_this.cardList[i].canUseBalance)
							})
						}
					}
					params.enterpriseCards = arrall
				}

				if((_this.goodsConsumer.minPrice * Number(_this.goodsnum)) != '') {

					_this.$http.post(_this.url.order.createConsumerOrder, params).then((res) => {

						if(res.data.status == "00000000") {
							var datas = res.data.data.payPrice
							var param = res.data.data
							if(datas > 0) {
								// _this.orderMessage = param //订单信息
								_this.payOptions.showPayMode = true
								_this.payOptions.data.money = param.payPrice
								_this.orderId = param.orderSn
								_this.ip = param.ip
								_this.spbillCreateIp = param.ip
								_this.body = param.body
							} else {

								_this.$dialog.show({
									type: 'warning',
									headMessage: "是否确认支付？",
									// message: '是否开启设备？',
									buttons: ['确定', '取消'],
									canel() {
										// console.log('你点击了取消')
									},
									confirm() {
										_this.$router.push({
											// path:'/views/success',
											name: 'success',
											query: {
												returnBalance: param.returnBalance,
												returnPoints: param.returnPoints,
												enterpriseName: _this.info.enterpriseName,
												pay: (_this.goodsConsumer.minPrice * Number(_this.goodsnum))
											}
										})
									},
								});

							}
						}
					})
				} else {
					_this.$vux.toast.show({
						text: '请输入支付金额',
						type: 'text',
						position: 'top',
						width: '50%'
					})
				}
			},
			//打开企业通用积分框
			useEnterpriseIntegral() {
				// totalUseEnterpriseBalance
				// - Number(_this.payMoney)
				var _this = this

				if(Number(_this.useTotalUseEnterpriseBalance) == 0) {
					_this.$vux.toast.show({
						text: '暂无可用企业通用积分',
						type: 'text',
						position: 'top',
						width: '50%'
					})
					return false;
				}

				_this.newUseEnterpriseBalance = Number(_this.goodsConsumer.minPrice * _this.goodsnum) - Number(_this.denomination) - Number(_this.integralNum)

				setTimeout(() => {
					this.integralOptions.showIntegralMode = true
				}, 500)
			},

		},

	}
</script>
<style lang="less">
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}
	
	input[type="number"] {
		-moz-appearance: textfield;
	}
	
	.integral_popup,
	.input_box {
		.input-div {
			width: 100%;
			height: 0.8rem;
			margin-top: 0.15rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			p {
				font-size: 0.36rem;
				font-family: PingFangSC-Regular;
				color: rgba(53, 53, 53, 1);
				margin-right: 0.20rem;
			}
			input {
				flex: 1;
				height: 100%;
				font-size: 0.50rem;
			}
		}
	}
</style>
<style lang="less" scoped>
	.number-box {
		padding: 0 0.20rem;
		box-sizing: border-box;
		box-sizing: border-box;
		height: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: white;
		p:nth-child(1) {
			font-size: 0.28rem;
			font-family: PingFangSC-Regular;
			color: rgba(26, 38, 66, 1);
		}
	}
	
	.bottom_box {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 1.40rem;
		background: rgba(255, 255, 255, 1);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 0.30rem;
		box-sizing: border-box;
		z-index: 1115;
		div:nth-child(1) {
			span:nth-child(1) {
				font-size: 0.28rem;
				font-family: PingFangSC-Regular;
				color: rgba(53, 53, 53, 1);
			}
			span:nth-child(2) {
				font-size: 0.48rem;
				font-family: PingFangSC-Semibold;
				color: rgba(242, 48, 48, 1);
				i {
					font-size: 0.24rem;
				}
			}
		}
		.btn {
			width: 1.92rem;
			height: 0.82rem;
			line-height: 0.82rem;
			text-align: center;
			background: rgba(51, 111, 255, 1);
			border-radius: 41px;
			font-size: 0.36rem;
			font-family: PingFangSC-Regular;
			color: rgba(255, 255, 255, 1);
		}
	}
	
	.integral_popup {
		height: 8.36rem;
		background-color: white;
		position: relative;
		.pd {
			padding: 0 0.30rem;
			box-sizing: border-box;
		}
		.title {
			font-size: 0.32rem;
			font-family: Adobe Heiti Std R;
			color: rgba(34, 34, 34, 1);
			text-align: center;
			padding: 0.40rem 0;
		}
		.tip {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 0.30rem;
			p:nth-child(1) {
				font-size: 0.28rem;
				font-family: Adobe Heiti Std R;
				color: rgba(34, 34, 34, 1);
			}
			p:nth-child(2) {
				font-size: 0.28rem;
				color: rgba(160, 160, 160, 1);
			}
		}
		.input-div {
			padding-bottom: 0.10rem;
			position: relative;
		}
		.input-div:after {
			content: " ";
			position: absolute;
			left: 0;
			bottom: 0;
			right: 0;
			height: 1px;
			border-top: 1px solid #E1E1E1;
			color: #E1E1E1;
			-webkit-transform-origin: 0 0;
			transform-origin: 0 0;
			-webkit-transform: scaleY(0.5);
			transform: scaleY(0.5);
			left: 0px;
		}
		.gz {
			text-align: right;
			margin-top: 0.15rem;
			font-size: 0.24rem;
			font-family: Adobe Heiti Std R;
			color: rgba(46, 106, 255, 1);
		}
		.btn {
			height: 0.90rem;
			line-height: 0.90rem;
			text-align: center;
			background: rgba(51, 111, 255, 1);
			position: absolute;
			bottom: 0;
			width: 100%;
			font-size: 0.32rem;
			font-family: PingFang-SC-Medium;
			color: rgba(254, 254, 254, 1);
		}
	}
	
	.scan_pay_box {
		/*height: 100%;*/
		/*overflow: hidden;*/
		padding-bottom: 0.50rem;
		background-color: white;
		.b-w {
			background-color: #F5F6FA;
		}
		.shop_info_box:after {
			content: " ";
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			height: 1px;
			border-top: 1px solid #E1E1E1;
			color: #E1E1E1;
			-webkit-transform-origin: 0 0;
			transform-origin: 0 0;
			-webkit-transform: scaleY(0.5);
			transform: scaleY(0.5);
			left: 0px;
		}
		.coupon-box:after,
		.integral-box:after,
		.enterprise-integral-box:after {
			content: " ";
			position: absolute;
			left: 0;
			bottom: 0;
			right: 0;
			height: 1px;
			border-top: 1px solid #E1E1E1;
			color: #E1E1E1;
			-webkit-transform-origin: 0 0;
			transform-origin: 0 0;
			-webkit-transform: scaleY(0.5);
			transform: scaleY(0.5);
			left: 0px;
		}
		.shop_info_box {
			background-color: white;
			padding: 0.25rem 0 0.50rem 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			position: relative;
			.shop_logo {
				width: 1.6rem;
				height: auto;
			}
			.shop_name {
				margin-top: 0.25rem;
				font-size: 0.32rem;
				font-family: PingFang SC;
				color: #353535;
				span {
					color: #000001;
					font-family: PingFang-SC-Medium;
					font-weight: bold;
				}
			}
		}
		.input_box {
			height: 2.14rem;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;
			background-color: white;
			margin-top: 0.20rem;
			padding: 0 0.30rem;
			box-sizing: border-box;
			margin-bottom: 0.20rem;
			.tip {
				font-size: 0.28rem;
				font-family: PingFang SC;
				color: rgba(53, 53, 53, 1);
			}
		}
		.coupon-box,
		.enterprise-integral-box {
			height: 1.0rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 0.30rem;
			box-sizing: border-box;
			background-color: white;
			position: relative;
			.left {
				font-size: 0.28rem;
				/*font-family: PingFang-SC-Medium;*/
				color: rgba(53, 53, 53, 1);
			}
			.right {
				display: flex;
				align-items: center;
				font-size: 0.32rem;
				/*font-family: DINOT-Medium;*/
				color: rgba(242, 48, 48, 1);
				img {
					width: 0.25rem;
					margin-left: 0.15rem;
				}
				.no {
					font-size: 0.28rem!important;
				}
			}
		}
		.integral-box {
			height: 1.50rem;
			display: flex;
			justify-content: space-between;
			background-color: white;
			padding: 0 0.30rem;
			box-sizing: border-box;
			position: relative;
			.left {
				display: flex;
				justify-content: center;
				flex-direction: column;
				.top {
					display: flex;
					align-items: center;
					div {
						width: 1.28rem;
						height: 0.46rem;
						background: rgba(242, 48, 48, 1);
						border-radius: 23px;
						border: 1px solid rgba(242, 48, 48, 1);
						display: flex;
						align-items: center;
						justify-content: center;
						img {
							width: 0.22rem;
							height: 0.22rem;
							margin-right: 0.07rem;
						}
						p {
							font-size: 0.20rem;
							font-family: Helvetica;
							color: rgba(255, 255, 255, 1);
						}
					}
					.money {
						margin-left: 0.20rem;
						font-size: 0.28rem;
						font-family: PingFangSC-Regular;
						color: rgba(53, 53, 53, 1);
					}
				}
				.bottom {
					display: flex;
					align-items: center;
					margin-top: 0.18rem;
					p {
						font-size: 0.24rem;
						font-family: Adobe Heiti Std R;
						color: rgba(168, 168, 168, 1);
					}
					img {
						width: 0.25rem;
						height: auto;
						margin-left: 0.05rem;
					}
				}
			}
			.right {
				position: absolute;
				right: 0.30rem;
				top: 0;
				height: 100%;
				width: 68%;
				justify-content: flex-end;
				display: flex;
				align-items: center;
				font-size: 0.32rem;
				/*font-family: DINOT-Medium;*/
				color: rgba(242, 48, 48, 1);
				img {
					width: 0.25rem;
					margin-left: 0.15rem;
				}
			}
		}
		.money-box {
			margin-top: 0.35rem;
			text-align: right;
			padding: 0 0.30rem;
			box-sizing: border-box;
			p {
				font-size: 0.28rem;
				font-family: PingFang-SC-Medium;
				color: rgba(53, 53, 53, 1);
				span {
					font-size: 0.30rem;
					font-family: PingFang SC;
					margin-left: 0.1rem;
				}
				i {
					font-size: 0.48rem;
					/*font-family: DINOT-Medium;*/
					color: rgba(53, 53, 53, 1);
				}
			}
		}
		.pay-btn {
			/*position: fixed;
			bottom: 0.5rem;
			left: 50%;
			transform: translate(-50%,-0.5rem);*/
			margin: 0 auto;
			margin-top: 0.80rem;
			height: 0.88rem;
			line-height: 0.88rem;
			width: 6.18rem;
			text-align: center;
			background: rgba(51, 111, 255, 1);
			font-size: 0.32rem;
			font-family: PingFang-SC-Medium;
			color: rgba(254, 254, 254, 1);
			box-sizing: border-box;
			border-radius: 2px;
		}
	}
	
	.coupon-popup {
		box-sizing: border-box;
		background: white;
		.pr-box {
			position: relative;
		}
		.header {
			height: 1.25rem;
			padding: 0 0.20rem;
			/*position: absolute;
      top: 0;
      width: 100%;*/
			background-color: white;
			.all {
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;
				z-index: 15;
				height: 100%;
				img {
					width: 0.25rem;
					height: 0.25rem;
					position: absolute;
					top: 50%;
					right: 0%;
					transform: translate(0%, -50%);
				}
			}
		}
		.btn {
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 0.88rem;
			background: rgba(51, 111, 255, 1);
			font-size: 0.30rem;
			font-family: PingFang-SC-Medium;
			color: rgba(255, 255, 255, 1);
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0 auto;
			z-index: 15;
		}
		.couponlist-box {
			padding: 0 0.20rem;
			position: relative;
			height: 7rem;
			z-index: 11;
			overflow-y: auto;
			padding-bottom: 0.88rem;
			padding-top: 0.24rem;
			.bs {
				box-shadow: 2px 0px 20px rgba(217, 223, 240, 1);
				margin-bottom: 0.24rem;
				position: relative;
				box-sizing: border-box;
				border-radius: 3px;
				background: #F5F6FA;
				.blue {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					border: 2px solid #336fff;
					border-radius: 3px;
					box-sizing: border-box;
					.pr-box {
						position: relative;
						.sureImg {
							position: absolute;
							top: 0;
							right: 0;
							width: 0.68rem;
							height: 0.68rem;
						}
					}
				}
			}
			.bg {
				height: 2.04rem;
				display: flex;
				flex-direction: column;
				overflow: hidden;
				/*background: url(../../assets/images/member/coupon-bg.png) no-repeat;*/
				background-size: cover;
				img {
					position: absolute;
					top: -0.15rem;
					right: -0.07rem;
					width: 1.2rem;
					height: 1.2rem;
				}
				.top {
					flex: 1;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 0.40rem;
					box-sizing: border-box;
					.one {
						display: flex;
						.type-btn {
							width: 0.88rem;
							height: 0.32rem;
							background: rgba(51, 111, 255, 1);
							border-radius: 16px;
							font-size: 0.22rem;
							font-family: PingFang-SC-Medium;
							color: rgba(255, 255, 255, 1);
							display: flex;
							align-items: center;
							justify-content: center;
						}
						span:nth-child(2) {
							font-size: 0.28rem;
							font-family: PingFang-SC-Medium;
							color: rgba(26, 38, 66, 1);
							margin-left: 0.1rem;
						}
					}
					p {
						margin-top: 0.23rem;
						font-size: 0.24rem;
						font-family: PingFang-SC-Medium;
						color: rgba(26, 38, 66, 1);
					}
					.money {
						font-size: 0.24rem;
						font-family: PingFang-SC-Bold;
						color: rgba(51, 111, 255, 1);
						span {
							font-size: 0.68rem;
							color: rgba(51, 111, 255, 1);
						}
						i {
							font-size: 0.20rem;
							font-family: PingFang-SC-Medium;
							color: rgba(51, 111, 255, 1);
						}
					}
				}
			}
			.bottom {
				font-size: 0.22rem;
				font-family: PingFang-SC-Medium;
				color: rgba(144, 162, 199, 1);
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0.18rem 0.40rem;
				background: rgb(249, 250, 255);
				box-sizing: border-box;
				border-radius: 3px;
				.shang {
					display: inline-block;
					width: 5.84rem;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
				}
				.xia {
					display: inline-block;
					width: 5.84rem;
				}
				img {
					width: 0.19rem;
					height: auto;
				}
			}
			.show {
				span {
					white-space: pre-wrap!important;
				}
			}
			.r180 {
				transform: rotate(-180deg);
			}
		}
	}
</style>
var uri1 = '/user',
	uri2 = '/datacenter',
	uri3 = '/order',
	uri4 = '/goods',
	uri5 = '/lottery',
	uri6 = '/tax'

var url = {
	platformId: 2018050800000002, //平台ID
	client: 'user', //区分那个端登录
	mapKey: 'XMHBZ-DHFWD-M3P4H-HHVZP-UOKV3-5WBB5',
	health: 'health.cgc999.com',
	cgc: 'cgc.cgc999.com',
	test: 'www.cgc999.com',
	// cgc: 'cgc.cgc999.com',
	mchIdTest: '1388332102',
	mchIdHealth: '1388332102',
	mchIdCgc: '1490285992',
	appIdTest: 'wx7a4933a7a3c33ec8',
	appIdHealth: 'wx7a4933a7a3c33ec8',
	appIdCgc: 'wx957ff39bdac082af',
	IdHealth: 200000,
	IdCgc: 200002,
	IdTest: 600000,

	user: {
		getAuthorizationUrl: uri1 + '/public/v1/user/getAuthorizationUrl', //获取第三方应用授权链接接口
		getBasicInfo: uri1 + '/param/v1/user/getBasicInfo', //基本信息
		getMyTeam: uri1 + '/param/v1/user/getMyTeam', //获取我的团队
		getUserInfo: uri1 + '/param/v1/user/getUserInfo', //个人资料
		changeUserInfo: uri1 + '/body/v1/user/changeUserInfo', //修改个人资料
		fileuploadImage: uri2 + '/v1/fileupload/image', //上传图片
		login: uri2 + '/public/v1/login', //云中心登录
		userLogin: uri1 + '/public/v1/user/login', //用户登录
		loginPAS: uri1 + '/public/v1/user/loginPAS', //使用密码登录
		loginByUnionId: uri1 + '/public/v1/user/loginByUnionId',
		logout: uri1 + '/logout/v1', //用户登出
		userRegister: uri1 + '/public/v1/user/register', //用户注册
		forgetPassword: uri1 + '/public/v1/user/forgetPassword', //重置登录密码
		checkUserExistsByMobile: uri1 + '/public/v1/user/checkUserExistsByMobile', //用户是否注册
		getVerificationCode: uri1 + '/public/v1/sms/getVerificationCode', //获取验证码
		getVerificationCode1: uri1 + '/body/v1/sms/getVerificationCode', //登录后获取验证码
		authVerification: uri1 + '/public/v1/sms/authVerificationCode', //检测验证码是否正确
		setPayPassword: uri1 + '/body/v1/user/setPayPassword', //设置支付密码
		setPayPasswordByMobile: uri1 + '/body/v1/user/setPayPasswordByMobile', //根据短信验证码设置支付密码
		changeNickname: uri1 + '/body/v1/user/changeNickname', //修改用户名
		changeAvatar: uri1 + '/body/v1/user/changeAvatar', //修改用户头像
		addShippingAddress: uri1 + '/body/v1/user/addShippingAddress', //添加收货地址
		getShippingAddress: uri1 + '/param/v1/user/getshippingAddress', //获取收货地址
		deleteShippingAddress: uri1 + '/body/v1/user/deleteShippingAddress', //删除收货地址
		setDefaultShippingAddress: uri1 + '/body/v1/user/setDefaultShippingAddress', //设置默认收货地址
		editShippingAddress: uri1 + '/body/v1/user/editShippingAddress', //修改收货地址
		addConcern: uri1 + '/body/v1/user/addConcern', //用户添加关注商品/联盟企业/联营企业
		getConcernLists: uri1 + '/body/v1/user/getConcernLists', //获取用户关注商品/联盟企业/联营企业
		deleteConcern: uri1 + '/body/v1/user/deleteConcern', //用户取消关注商品/联盟企业/联营企业
		getUserPayPassword: uri1 + '/param/v1/user/getUserPayPassword', //设置是否设置支付密码
		authPayPassword: uri1 + '/body/v1/user/authPayPassword', //检测支付密码正确性
		setPayPasswordByOld: uri1 + '/body/v1/user/setPayPasswordByOld', //根据旧支付密码设置新支付密码
		getUserAuthInfo: uri1 + '/param/v1/user/getUserAuthInfo', //获取用户认证状态
		getShippingAddressById: uri1 + '/param/v1/user/getShippingAddressById', //id获取收货地址详细信息
		getFundInfo: uri1 + '/param/v1/user/getFundInfo', //获取用户资金信息
		changeFundShow: uri1 + '/body/v1/user/changeFundShow', //修改用户资产显示状态
		getMyBalanceList: uri1 + '/param/v1/user/getMyBalanceList', //获取用户积分列表
		getMyPointsList: uri1 + '/param/v1/user/getMyPointsList', //获取用户信用积分列表
		getDayBalanceList: uri1 + '/param/v1/user/getDayBalanceList', //通用积分每日累计变更列表信息接口
		getMyBalanceDetail: uri1 + '/param/v1/user/getMyBalanceDetail', //获取通用积分详情
		getMyPointDetail: uri1 + '/param/v1/user/getMyPointDetail', //获取信用积分详情
		getUserCouponList: uri1 + '/param/v1/user/getUserCouponList', //获取优惠券列表
		getRechargeList: uri1 + '/param/v1/user/getRechargeList', //获取平台充值套餐列表信息接口
		getPaymentList: uri1 + '/param/v1/user/getPaymentList', //获取支付渠道接口
		getMyEnterpriseCardStat: uri1 + '/param/v1/enterpriseCard/getMyEnterpriseCardStat', //企业通用卡汇总数据
		getMyEnterpriseCard: uri1 + '/param/v1/enterpriseCard/getMyEnterpriseCard', //获取我的企业通用卡列表信息
		getMyEnterpriseCardDetail: uri1 + '/param/v1/enterpriseCard/getMyEnterpriseCardDetail', //获取企业通用卡详情接口
		getAvailableAllianceList: uri1 + '/param/v1/enterpriseCard/getAvailableAllianceList', //企业通用卡适用联盟企业列表
		getUseEnterpriseCardList: uri1 + '/param/v1/enterpriseCard/getUseEnterpriseCardList', //企业通用卡明细列表
		getUseEnterpriseCardDetail: uri1 + '/param/v1/enterpriseCard/getUseEnterpriseCardDetail', //企业通用卡详情信息
		rechargeBalance: uri1 + '/body/v1/user/rechargeBalance', //用户在线充值接口
		getList: uri1 + '/param/v1/feedbackCause/getList', //获取反馈原因列表信息接口
		addFeedback: uri1 + '/body/v1/feedback/addFeedback', //新增反馈信息接口
		getInfoByType: uri1 + '/public/v1/agreement/getInfoByType', //获取协议信息接口
		getCategoryLists: uri1 + '/public/v1/article/getCategoryLists', //获取文章分类列表
		getLists: uri1 + '/public/v1/article/getLists', //获取文章列表接口
		getDetails: uri1 + '/public/v1/article/getDetails', //获取文章详情接口
		addFeedback: uri1 + '/body/v1/feedback/addFeedback', //2.4.新增反馈信息接口
		getInvoiceLists: uri6 + '/param/v1/invoiceTitle/getLists', //2.1.获取发票抬头列表接口
		getInvoiceInfoById: uri6 + '/param/v1/invoiceTitle/getInfoById', //2.2.	获取发票抬头详情接口
		addInfo: uri6 + '/body/v1/invoiceTitle/addInfo', //2.3.	新增发票抬头接口
		editInfoById: uri6 + '/body/v1/invoiceTitle/editInfoById', //2.4.	修改发票抬头信息接口
		setDefaultById: uri6 + '/body/v1/invoiceTitle/setDefaultById', //2.5.	设置默认发票抬头信息接口
		deleteById: uri6 + '/body/v1/invoiceTitle/deleteById', //2.6.	删除发票抬头信息接口
		invoiceList: uri6 + '/body/v1/invoiceFunction/invoiceList', //发票列表查询接口
		queryInvoiceInfoByNum: uri6 + '/body/v1/invoiceFunction/queryInvoiceInfoByNum', //发票详情
		checkBlueInvoice: uri6 + '/body/v1/invoiceFunction/checkBlueInvoice', //查看发票pdf
		sendElectronInvoiceMail: uri6 + '/body/v1/invoiceFunction/sendElectronInvoiceMail', //发送pdf到邮箱
		diyPage: uri1 + '/public/v1/diyPage/alliance', //自定义页面
		diyMenu: uri1 + '/public/v1/diyMenu/alliance', //自定义菜单
		getGroupGoods: uri1 + '/public/v1/diyPage/getGroupGoods', // 2.2.	获取自定义页面商品组商品
		getRecommendGoods: uri1 + '/public/v1/diyPage/getRecommendGoods', // 2.1.	获取自定义页面推荐商品
		platformDiypage: uri1 + '/public/v1/diyPage/platform', //获取行业平台自定义页面
		platformDiymenu: uri1 + '/public/v1/diyMenu/platform', //获取行业平台自定义菜单
		getSellerInfoByUserId: uri1 + '/param/v1/seller/getSellerInfoByUserId', //2.1.	获取会员绑定企业信息
		bindSeller: uri1 + '/body/v1/seller/bindSeller', //2.2.	绑定店员
		getPublicNotice: uri1 + '/param/v1/notice/getPublicNotice', //2.1.	获取弹窗通知信息接口
		getOrderExpressInfo: uri1 + '/param/v1/order/getOrderExpressInfo', //查看物流信息
		getNotificationInfo: uri1 + '/param/v1/notification/getNotificationInfo', //2.1.	获取绑定通知人相关信息
		bindNotificationUser: uri1 + '/body/v1/notification/bindNotificationUser', //2.2.	绑定通知人
	},
	qy: {
		getBasicInfo: uri1 + '/public/v1/enterprise/getBasicInfo', //获取企业基本信息
		getThumbInfo: uri1 + '/public/v1/enterprise/getThumbInfo', //获取企业图册
		getAllianceConcern: uri1 + '/param/v1/enterprise/getAllianceConcern', //获取用户是否关注联盟企业角色接口
		getChainsConcern: uri1 + '/param/v1/enterprise/getChainsConcern', //获取用户是否关注联盟企业角色
		getEnterpriseListInfo: uri1 + '/public/v1/enterprise/getEnterpriseListInfo', //获取产业联盟企业列表信息接口
		getGoodsList: uri1 + '/public/v1/enterprise/getGoodsList', //获取企业提供的商品列表信息接口
	},
	origin: {
		getAuthorizationUrl: uri1 + '/public/v1/user/getAuthorizationUrl', //微信授权
		addOrUpdateUserWithThirdAuthInfo: uri1 + '/body/v1/addOrUpdateUserWithThirdAuthInfo', //13.用户授权业务(用户和第三方的关系)接口
		addOrUpdateUserWithCgcAuthInfo: uri1 + '/body/v1/addOrUpdateUserWithCgcAuthInfo', //14.用户授权业务（用户和CGC的关系)
		obtainAllAuthInfo: uri1 + '/param/v1/obtainAllAuthInfo', //15.获取所有用户授权信息(第三方可供选择)
		checkUserAccreditBz: uri1 + '/body/v1/checkUserAccreditBz', //16.检验用户是否与cgc授权某项业务
		obtainUserThirdAuthInfo: uri1 + '/param/v1/obtainUserThirdAuthInfo', //17.获取用户第三方已经授权信息
		loginAuthCode: uri1 + '/param/v1/user/loginAuthCode', //
	},
	draw: {
		getReviewLists: 'http://www.cgc999.com/app/public.php?i=7&c=entry&m=mx_shop&do=mobile&r=copy.getReviewLists', //往期回顾
		getLuckRankLists: 'http://www.cgc999.com/app/public.php?i=7&c=entry&m=mx_shop&do=mobile&r=copy.getLuckyRankLists', //幸运排行
		getShopListWWW: 'http://www.cgc999.com/tempdata2.php',
		getShopList: 'https://health.cgc999.com/crshop/tempdata.php',
		getShopListCgc: 'https://cgc.cgc999.com/crshop/tempdata.php'
	},
	zone: {
		area: '/area/public/v1/area/level', //区域地址
		address: '/area/public/v1/area/getInfo' //三级联动地址
	},
	// 快讯
	article: {
		getArticleCategory: 'http://www.cgc999.com/app/public.php?i=7&c=entry&m=mx_shop&do=mobile&r=getArticleCategory', //快讯tab接口
		getArticleLists: 'http://www.cgc999.com/app/public.php?i=7&c=entry&m=mx_shop&do=mobile&r=getArticleLists' //快讯列表接口
	},
	zf: {
		wxScan: '/pay/public/v1/wechat/wxScan',
		pay: '/pay/body/v1/wechat/pay',
		alipay: '/pay/body/v1/alipay/wapPay',
	},
	order: {
		getOrderList: uri3 + '/param/v1/order/getOrderList', //获取订单列表
		getNewOrderList: uri3 + '/param/v1/order/getNewOrderList', //获取最新订单
		getOrderDetail: uri3 + '/param/v1/order/getOrderDetail', //获取订单详情
		deleteOrderByOrderSn: uri3 + '/body/v1/order/deleteOrderByOrderSn', //删除订单
		cancelOrderByOrderSn: uri3 + '/body/v1/order/cancelOrderByOrderSn', //取消订单
		confirmReceipt: uri3 + '/bodyIds/v1/order/confirmReceipt',
		createConsumerOrder: '/order/bodyIds/v1/order/createConsumerOrder', //即时消费订单
	},
	share: {
		getEquipmentInfo: uri4 + '/public/v1/goods/getEquipmentInfo', //获取设备详细信息接口
		getEquipmentOrderConfirmInfo: uri4 + '/param/v1/goods/getEquipmentOrderConfirmInfo', //获取设备优惠券信息
		getMyEquipmentInfo: uri4 + '/param/v1/goods/getMyEquipmentInfo', //获取设备列表信息接口
		finishEquipmentOrder: uri4 + '/body/v1/goods/finishEquipmentOrder', //完成设备订单信息接口
		changeEquipmentStatus: uri4 + '/body/v1/goods/changeEquipmentStatus', //变更设备状态信息接口
		createEquipmentOrder: uri3 + '/bodyIds/v1/order/createEquipmentOrder', //创建设备订单信息接口
		getMyEquipmentNotice: uri4 + '/param/v1/goods/getMyEquipmentNotice', //
		getEquipmentInfo2: uri1 + '/public/v1/enterprise/getEquipmentInfo' //获取企业提供的服务列表信息
	},
	goods: {
		getGoodsInfo: uri4 + '/public/v1/goods/getGoodsInfo', //获取商品信息接口
		buynow: uri3 + '/bodyIds/v1/order/buynow',
		getGoodsOrderConfirmUseBalances: uri4 + '/param/v1/goods/getGoodsOrderConfirmUseBalances', //商品下单
		getGoodsList: uri4 + '/public/v1/supplyGoods/getGoodsList', //2.1.	获取供应链云商城商品列表信息接口
		getGoodsSkuInfo: uri4 + '/public/v1/goods/getGoodsSkuInfo',
	},
	lottery: {
		getStatInfo: uri5 + '/public/v1/lottery/getStatInfo', //获取抽奖首页接口
		getRecommendLottery: uri5 + '/public/v1/lottery/getRecommendLottery', //2.3.获取精彩推荐的抽奖列表接口
		getHistoryLottery: uri5 + '/public/v1/lottery/getHistoryLottery', //2.2.获取往期抽奖列表接口
		getInfoById: uri5 + '/public/v1/lottery/getInfoById', //2.8.获取抽奖详情信息接口
		getLotteryRankByNums: uri5 + '/public/v1/lottery/getLotteryRankByNums', //2.6.获取中奖次数排行榜信息接口
		getLotteryRankByBonus: uri5 + '/public/v1/lottery/getLotteryRankByBonus', //2.7.获取中奖金额排行榜信息接口
		getAwardUserList: uri5 + '/public/v1/lottery/getAwardUserList', //2.9.获取抽奖中奖人员列表信息接口
		getUserLotteryRecord: uri5 + '/uparam/v1/lottery/getUserLotteryRecord', //2.10获取会员中奖记录列表接口
		getBonus: uri5 + '/ubody/v1/lottery/getBonus', //2.11.会员领奖接口
		getMessage: uri5 + '/uparam/v1/lottery/getMessage', //2.13.获取会员中奖感言接口
		writeMessage: uri5 + '/ubody/v1/lottery/writeMessage', //2.14.提交会员填写中奖感言接口
		getAwardCode: uri5 + '/uparam/v1/lottery/getAwardCode', //2.12.获取会员领取线下奖品信息接口
		addLottery: uri5 + '/body/v1/lotteryManage/addLottery', //2.1.	发起抽奖信息接口
		getLotteryList: uri5 + '/param/v1/lotteryManage/getLotteryList', //2.2.	获取抽奖列表接口
		changeLotteryPasswordById: uri5 + '/body/v1/lotteryManage/changeLotteryPasswordById', //2.4. 修改抽奖开屏密码接口
		getLotteryUrlById: uri5 + '/param/v1/lotteryManage/getLotteryUrlById', //2.3.	获取抽奖大屏链接接口
		getBonusPool: uri5 + '/param/v1/lotteryManage/getBonusPool', //2.5.	获取当前奖金池金额
	},
	ocr: {
		getOCR: uri1 + '/param/v1/user/getOCR',
		getOCRResult: uri1 + '/param/v1/user/getOCRResult'
	},
	changeClient() {
		let ua = window.navigator.userAgent.toLowerCase()
		if(/MicroMessenger/.test(window.navigator.userAgent)) {
			this.client = 'user'
		} else if(/AlipayClient/.test(window.navigator.userAgent)) {
			this.client = 'user.alipay'
		} else {
			// console.log(this.client)
			this.client = 'user.wap'
		}
	}

}
url.changeClient()

// alert(url.client+'端口')

export default url
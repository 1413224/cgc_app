const memberModule = [{
		path: '/index',
		name: 'index',
		component: resolve => require(['@/views/index'], resolve),

		meta: {
			navShow: true,
			navIndex: 0,
			title: '首页',
			isNoLogin: true
		}
	},
	{
		path: '/',
		name: 'index',
		component: resolve => require(['@/views/index'], resolve),

		meta: {
			navShow: true,
			navIndex: 0,
			title: '首页',
			isNoLogin: true
		}
	},
	/*{
		path:'/',
		name:'index',
		component:resolve => require(['@/views/index2'],resolve),
		meta:{
			navShow:true,
			navIndex:0,
			title:'首页'
		}
	},*/
	{ //行业平台首页
		path: '/platformindex',
		name: 'platformindex',
		component: resolve => require(['@/views/diypage/platformindex'], resolve),
		meta: {
			navShow: true,
			navIndex: 0,
			title: '首页',
			isNoLogin: true
		}
	},
	{
		//行业平台专题页
		path: '/platformcustom',
		name: 'platformcustom',
		component: resolve => require(['@/views/diypage/platformcustom'], resolve),
		meta: {
			navShow: true,
			// navIndex: 0,
			title: '专题页',
			isNoLogin: true
		}
	},
	/*{
		//公共自定义页面渲染路由
		path:'/diypage',
		name:'diypage',
		component:resolve => require(['@/views/diypage/index'], resolve),
		meta:{
			title: '专题页',
			isNoLogin:true
		}
	},*/
	{
		path: '/custom',
		name: 'custom',
		component: resolve => require(['@/views/custom'], resolve),
		meta: {
			navShow: true,
			isNoLogin: true
			// navIndex: 0,
			// title: '首页'
		}
	},
	{
		path: '/member/test',
		name: 'test',
		component: resolve => require(['@/views/member/test'], resolve),
		meta: {
			title: '所有弹框',
			isNoLogin: true
		}
	},
	{
		path: '/member/setting/index',
		name: 'setting',
		component: resolve => require(['@/views/member/setting/index'], resolve),
		meta: {
			title: '账户设置',
			isNoLogin: true
		}
	},
	{
		path: '/user/reg',
		name: 'reg',
		component: resolve => require(['@/views/user/reg'], resolve),
		meta: {
			title: '用户登录/注册',
			keepAlive: true,
			isNoLogin: true
		}
	},
	{
		path: '/user/login',
		name: 'login',
		component: resolve => require(['@/views/user/login'], resolve),
		meta: {
			title: '大健康产业联盟',
			keepAlive: true,
			isNoLogin: true
		}
	},
	{
		path: '/user/changeLoginPassword',
		name: 'changeLoginPassword',
		component: resolve => require(['@/views/user/changeLoginPassword'], resolve),
		meta: {
			title: '设置登录密码',
			isNoLogin: true
		}
	}, {
		path: '/user/changeLoginPassword2',
		name: 'changeLoginPassword2',
		component: resolve => require(['@/views/user/changeLoginPassword2'], resolve),
		meta: {
			title: '设置登录密码',
			isNoLogin: true
		}
	}, {
		path: '/user/changePaymentPassword',
		name: 'changePaymentPassword',
		component: resolve => require(['@/views/user/changePaymentPassword'], resolve),
		meta: {
			title: '设置支付密码',
			isNoLogin: true
		}
	}, {
		path: '/user/changePaymentPassword2',
		name: 'changePaymentPassword2',
		component: resolve => require(['@/views/user/changePaymentPassword2'], resolve),
		meta: {
			title: '设置支付密码',
			isNoLogin: true
		}
	}, {
		path: '/user/changelist',
		name: 'changelist',
		component: resolve => require(['@/views/user/changelist'], resolve),
		meta: {
			title: '密码管理'
		}
	}, {
		path: '/member/coupon/index',
		name: 'couponindex',
		component: resolve => require(['@/views/member/coupon/index'], resolve),
		meta: {
			title: '我的优惠券'
		}
	}, {
		path: '/member/coupon/detail',
		name: 'coupon',
		component: resolve => require(['@/views/member/coupon/detail'], resolve),
		meta: {
			title: '优惠券详情'
		}
	},
	{
		path: '/member/index',
		name: 'member',
		component: resolve => require(['@/views/member/index'], resolve),
		meta: {
			navShow: true,
			navIndex: 4,
			title: '个人中心',
			isNoLogin: true
		}
	},
	{
		path: '/member/message/setting',
		name: 'msg_setting',
		component: resolve => require(['@/views/member/message/setting'], resolve),
		meta: {
			title: '消息设置',
			isNoLogin: true
		}
	},
	{
		path: '/member/address/index',
		name: 'address',
		component: resolve => require(['@/views/member/address/index'], resolve),
		meta: {
			title: '地址管理'
		}
	}, {
		path: '/member/address/select_address',
		name: 'select_address',
		component: resolve => require(['@/views/member/address/select_address'], resolve),
		meta: {
			title: '选择收货地址'
		}
	},
	{
		path: '/member/address/edit',
		name: 'address_edit',
		component: resolve => require(['@/views/member/address/edit'], resolve),
		meta: {
			title: '修改地址'
		}
	}, {
		path: '/member/setting/nickname',
		name: 'nickname',
		component: resolve => require(['@/views/member/setting/nickname'], resolve),
		meta: {
			title: '修改用户昵称'
		}
	},
	{
		path: '/member/score/index',
		name: 'score',
		component: resolve => require(['@/views/member/score/index'], resolve),
		meta: {
			title: '我的积分'
		}
	},
	{
		path: '/member/score/log',
		name: 'score_log',
		component: resolve => require(['@/views/member/score/log'], resolve),
		meta: {
			title: '积分记录'
		}
	},
	{
		path: '/member/team/index',
		name: 'team',
		component: resolve => require(['@/views/member/team/index'], resolve),
		meta: {
			title: '我的粉丝'
		}
	},
	{
		path: '/member/info/index',
		name: 'info',
		component: resolve => require(['@/views/member/info/index'], resolve),
		meta: {
			title: '个人信息'
		}
	}, {
		path: '/member/info/data',
		name: 'infodata',
		component: resolve => require(['@/views/member/info/data'], resolve),
		meta: {
			title: '详细资料'
		}
	},
	{
		path: '/member/setting/changeCode',
		name: 'changeCode',
		component: resolve => require(['@/views/member/setting/changeCode'], resolve),
		meta: {
			title: '设置新密码'
		}
	},
	{
		path: '/member/setting/about',
		name: 'about',
		component: resolve => require(['@/views/member/setting/about'], resolve),
		meta: {
			title: '关于我们',
			isNoLogin: true
		}
	}, {
		path: '/member/setting/real',
		name: 'real',
		component: resolve => require(['@/views/member/setting/real'], resolve),
		meta: {
			title: '身份认证'
		}
	}, {
		path: '/member/setting/realoading',
		name: 'realoading',
		component: resolve => require(['@/views/member/setting/realoading'], resolve),
		meta: {
			title: '审核结果'
		}
	},
	{
		path: '/member/purse/wallet',
		name: 'pursewallet',
		component: resolve => require(['@/views/member/purse/wallet'], resolve),
		meta: {
			title: '我的资产'
		}
	},
	/*{
		path: '/member/purse/index',
		name: 'purseindex',
		component: resolve => require(['@/views/member/purse/index'], resolve),
		meta: {
			title: '我的资产'
		}
	},*/
	{
		path: '/member/purse/qrcode',
		name: 'qrcode',
		component: resolve => require(['@/views/member/purse/qrcode'], resolve),
		meta: {
			title: '会员码'
		}
	}, {
		path: '/member/purse/commercial',
		name: 'commercial',
		component: resolve => require(['@/views/member/purse/commercial'], resolve),
		meta: {
			title: '支持商户',
			isNoLogin: true
		}
	}, {
		path: '/member/purse/hasqrcode',
		name: 'hasqrcode',
		component: resolve => require(['@/views/member/purse/hasqrcode'], resolve),
		meta: {
			title: '开启赚钱码'
		}
	},
	{
		path: '/member/purse/recharge',
		name: 'recharge',
		component: resolve => require(['@/views/member/purse/recharge'], resolve),
		meta: {
			title: '通用积分充值',
			//keepAlive: true
		}
	},
	{
		path: '/member/card/index',
		name: 'card',
		component: resolve => require(['@/views/member/card/index'], resolve),
		meta: {
			title: '企业通用积分'
		}
	}, {
		path: '/member/card/detail',
		name: 'carddetail',
		component: resolve => require(['@/views/member/card/detail'], resolve),
		meta: {
			title: '卡包详情'
		}
	}, {
		path: '/member/card/record',
		name: 'cardRecord',
		component: resolve => require(['@/views/member/card/record'], resolve),
		meta: {
			title: '企业通用卡明细'
		}
	},
	{
		path: '/member/card/shopdetailfrac',
		name: 'fraction',
		component: resolve => require(['@/views/member/card/shopdetailfrac'], resolve),
		meta: {
			title: '企业通用积分详情'
		}
	},
	{
		path: '/member/purse/banlancelog',
		name: 'banlancelog',
		component: resolve => require(['@/views/member/purse/banlancelog'], resolve),
		meta: {
			title: '积分日志'
		}
	},
	{
		path: '/member/purse/banlance',
		name: 'banlance',
		component: resolve => require(['@/views/member/purse/banlance'], resolve),
		meta: {
			title: '积分详情'
		}
	},
	{
		path: '/member/follow/index',
		name: 'follow',
		component: resolve => require(['@/views/member/follow/index'], resolve),
		meta: {
			title: '我的关注'
		}
	},
	/*{
		path: '/member/earnings/index',
		name: 'earningsindex',
		component: resolve => require(['@/views/member/earnings/index'], resolve),
		meta: {
			title: '通用积分'
		}
	}, */
	{
		path: '/member/earnings/currency',
		name: 'earningscurrency',
		component: resolve => require(['@/views/member/earnings/currency'], resolve),
		meta: {
			title: '通用积分'
		}
	}, {
		path: '/member/earnings/credit',
		name: 'earningscredit',
		component: resolve => require(['@/views/member/earnings/credit'], resolve),
		meta: {
			title: '信用积分'
		}
	}, {
		path: '/member/earnings/record',
		name: 'record',
		component: resolve => require(['@/views/member/earnings/record'], resolve),
		meta: {
			title: '累计收益'
		}
	}, {
		path: '/member/earnings/currencyreward',
		name: 'currencyreward',
		component: resolve => require(['@/views/member/earnings/currencyreward'], resolve),
		meta: {
			title: '通用积分奖励'
		}
	}, {
		path: '/member/earnings/creditreward',
		name: 'creditreward',
		component: resolve => require(['@/views/member/earnings/creditreward'], resolve),
		meta: {
			title: '信用积分奖励'
		}
	}, {
		path: '/member/earnings/rule',
		name: 'rule',
		component: resolve => require(['@/views/member/earnings/rule'], resolve),
		meta: {
			title: '积分规则',
			isNoLogin: true
		}
	},
	{
		path: '/member/earnings/logs',
		name: 'logs',
		component: resolve => require(['@/views/member/earnings/logs'], resolve),
		meta: {
			title: '累计收益'
		}
	}, {
		path: '/member/earnings/profit',
		name: 'profit',
		component: resolve => require(['@/views/member/earnings/profit'], resolve),
		meta: {
			title: '累计收益'
		}
	},
	{
		path: '/member/score/strategy',
		name: 'strategy',
		component: resolve => require(['@/views/member/score/strategy'], resolve),
		meta: {
			title: '积分攻略',
			isNoLogin: true
		}
	},
	{
		path: '/member/score/currencyrewarddetail',
		name: 'currencyrewarddetail',
		component: resolve => require(['@/views/member/score/currencyrewarddetail'], resolve),
		meta: {
			title: '通用积分详情'
		}
	}, {
		path: '/member/score/creditrewarddetail',
		name: 'creditrewarddetail',
		component: resolve => require(['@/views/member/score/creditrewarddetail'], resolve),
		meta: {
			title: '信用积分详情'
		}
	},
	{
		path: '/member/setting/agreement',
		name: 'agreement',
		component: resolve => require(['@/views/member/setting/agreement'], resolve),
		meta: {
			title: 'CGC平台注册协议',
			isNoLogin: true
		}
	},
	{
		path: '/member/article/index',
		name: 'article',
		component: resolve => require(['@/views/member/article/index'], resolve),
		meta: {
			title: '快讯列表',
			isNoLogin: true
		}
	},
	{
		path: '/member/vip/index',
		name: 'vipindex',
		component: resolve => require(['@/views/member/vip/index'], resolve),
		meta: {
			title: '会员权益',
			isNoLogin: true
		}
	}, {
		path: '/member/vip/right',
		name: 'vipright',
		component: resolve => require(['@/views/member/vip/right'], resolve),
		meta: {
			title: '企业权益',
			isNoLogin: true
		}
	},
	{
		path: '/member/setting/preview',
		name: 'preview',
		component: resolve => require(['@/views/member/setting/preview'], resolve),
		meta: {
			title: '图册',
			isNoLogin: true
		}
	}, {
		path: '/member/generalize/index',
		name: 'generalize',
		component: resolve => require(['@/views/member/generalize/index'], resolve),
		meta: {
			title: '推广助手',
			isNoLogin: true
		}
	},
	{
		path: '/member/article/detail',
		name: 'artDetail',
		component: resolve => require(['@/views/member/generalize/detail'], resolve),
		meta: {
			title: '文章详情',
			isNoLogin: true
		}
	},
	{
		path: '/member/benefits/index',
		name: 'benefits',
		component: resolve => require(['@/views/member/benefits/index'], resolve),
		meta: {
			title: '会员权益',
			isNoLogin: true
		}
	},
	{
		path: '/member/strategy/index',
		name: 'strategy',
		component: resolve => require(['@/views/member/strategy/index'], resolve),
		meta: {
			title: '赚钱攻略',
			isNoLogin: true
		}
	},
	{
		path: '/member/benefits/detail',
		name: 'benefits_detail',
		component: resolve => require(['@/views/member/benefits/detail'], resolve),
		meta: {
			title: '详细权益介绍',
			isNoLogin: true
		}
	},
	{
		path: '/member/join/index',
		name: 'joinIndex',
		component: resolve => require(['@/views/member/join/index'], resolve),
		meta: {
			title: '招商加盟',
			isNoLogin: true
		}
	}, {
		path: '/member/join/result',
		name: 'joinResult',
		component: resolve => require(['@/views/member/join/result'], resolve),
		meta: {
			title: '招商加盟',
			isNoLogin: true
		}
	},
	{
		path: '/member/setting/opinion',
		name: 'opinion',
		component: resolve => require(['@/views/member/setting/opinion'], resolve),
		meta: {
			title: '意见反馈'
		}
	},
	{
		path: '/member/pay/wxgzhpay',
		name: 'wxpay',
		component: resolve => require(['@/views/member/pay/wxgzhpay'], resolve),
		meta: {
			title: '微信支付'
		}
	}, {
		path: '/member/pay/scan_pay',
		name: 'scan_pay',
		component: resolve => require(['@/views/member/pay/scan_pay'], resolve),
		meta: {
			title: '向商家付款'
		}
	}, {
		path: '/member/pay/alipay',
		name: 'alipay',
		component: resolve => require(['@/views/member/pay/alipay'], resolve),
		meta: {
			title: '支付宝付款'
		}
	},
	{
		path: '/member/oriza',
		name: 'wxoriza',
		component: resolve => require(['@/views/member/oriza/oriza'], resolve),
		meta: {
			title: 'CGC全球智慧产业联盟'
		}
	},
	{
		path: '/member/supply/productList',
		name: 'wxoriza',
		component: resolve => require(['@/views/member/supply/productList'], resolve),
		meta: {
			title: '供应链商品',
			isNoLogin: true
		}
	},
	/*{
        path:'/views/success',
        name:'success',
        component:resolve => require(['@/views/multi_user_mall/success']),
        meta: {
			title: '支付成功'
		}
    },*/
	{
		path: '/views/success',
		name: 'success',
		component: resolve => require(['@/views/multi_user_mall/success'], resolve),
	},
	{
		path: '/multi_user_mall/paybill',
		name: 'paybill',
		component: resolve => require(['@/views/multi_user_mall/paybill'], resolve),
		meta: {
			title: '买单消费'
		}
	},
	{
		path: '/multi_user_mall/ypk',
		name: 'paybill',
		component: resolve => require(['@/views/multi_user_mall/ypk'], resolve),
		meta: {
			title: '约派克·约成功',
			isNoLogin: true
		}
	},
	{
		path: '/multi_user_mall/cgcqrcode',
		name: 'cgcqrcode',
		component: resolve => require(['@/views/multi_user_mall/cgcqrcode'], resolve),
		meta: {
			title: 'CGC联盟',
			isNoLogin: true
		}
	},
	{
		path: '/user_seller/index',
		name: 'userSeller',
		component: resolve => require(['@/views/userSeller/index'], resolve),
		meta: {
			title: '店员绑定'
		}
	},
	{
		path: '/user_seller/bind_success',
		name: 'bindSuccess',
		component: resolve => require(['@/views/userSeller/bindSuccess'], resolve),
		meta: {
			title: '店员绑定成功'
		}
	},
	{
		path: '/user_seller/bind_fail',
		name: 'bindFail',
		component: resolve => require(['@/views/userSeller/bindFail'], resolve),
		meta: {
			title: '店员绑定失败'
		}
	},
	{
		path: '/notification/index',
		name: 'notification',
		component: resolve => require(['@/views/notification/index'], resolve),
		meta: {
			title: '通知人绑定'
		}
	}, {
		path: '/notification/bind_success',
		name: 'nBindSuccess',
		component: resolve => require(['@/views/notification/bindSuccess'], resolve),
		meta: {
			title: '通知人绑定成功'
		}
	},
	{
		path: '/notification/bind_fail',
		name: 'nBindFail',
		component: resolve => require(['@/views/notification/bindFail'], resolve),
		meta: {
			title: '通知人绑定失败'
		}
	}, {
		path: '/cgcAuth',
		name: 'cgcAuth',
		component: resolve => require(['@/views/member/oriza/cgcAuth'], resolve),
		meta: {
			title: 'CGC授权'
		}
	}, {
		path: '/otherAuth',
		name: 'otherAuth',
		component: resolve => require(['@/views/member/oriza/otherAuth'], resolve),
		meta: {
			title: '第三方授权'
		}
	}, {
		path: '/authList',
		name: 'authList',
		component: resolve => require(['@/views/member/oriza/list'], resolve),
		meta: {
			title: '授权管理'
		}
	}, {
		path: '/otherAuthLogin',
		name: 'otherAuthLogin',
		component: resolve => require(['@/views/member/oriza/otherAuthLogin'], resolve),
		meta: {
			title: '第三方授权登录'
		}
	}, {
		path: '/authCode',
		name: 'authCode',
		component: resolve => require(['@/views/member/oriza/code'], resolve),
		meta: {
			title: '用户登录二维码'
		}
	}
]

export default memberModule
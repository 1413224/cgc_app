const shopModule = [
	// 商城模块
	{
		path: '/shop', //首页  temporarily(敬请期待)
		name: 'shop',
		component: resolve => require(['@/views/shop/temporarily'], resolve),
		meta: {
			navShow: true,
			// navIndex:1,
			title:'信用商城'
		}
	},
	{
		path: '/shop/index', //首页
		name: 'shop',
		component:  resolve => require(['@/views/shop/temporarily'], resolve),
		meta: {
			navShow: true,
			// navIndex:1,
			title:'信用商城'
		}
	},
	{
		path: '/shop/my_order2', //我的订单
		name: 'my_order2',
		component:  resolve => require(['@/views/shop/my_order2'], resolve),
		meta: {
			title:'我的订单'
		}
	},
	{
		path: '/shop/product', //商品分类
		name: 'shop_product',
		component: resolve => require(['@/views/shop/product'], resolve),
		meta: {
			title:'商品分类'
		}
	},
	{
		path: '/shop/all_shops', //所有商品
		name: 'all_shops',
		component: resolve => require(['@/views/shop/all_shops'], resolve),
		meta: {
			title:'所有商品'
		}
	},
	{
		path: '/shop/order_details', //订单详情，兑换详情
		name: 'order_details',
		component: resolve => require(['@/views/shop/order_details'], resolve),
		meta: {
			title:'订单详情'
		}
	},
	{
		path: '/shop/fisOrderDetail', //订单详情(虚拟订单)
		name: 'fisOrderDetail',
		component: resolve => require(['@/views/shop/fisOrderDetail'], resolve),
		meta: {
			title:'订单详情'
		}
	},
	{
		path: '/shop/theme_goods', //主题商品
		name: 'theme_goods',
		component: resolve => require(['@/views/shop/theme_goods'], resolve),
		meta: {
			title:'主题商品'
		}
	},
	{
		path: '/shop/shop_details', //商城详情
		name: 'shop_details',
		component: resolve => require(['@/views/shop/shop_details'], resolve),
		meta: {
			title:'商品详情'
		}
	},
	{
		path: '/shop/write_comments', //商品评论
		name: 'write_comments',
		component: resolve => require(['@/views/shop/write_comments'], resolve),
		meta: {
			title:'商品评论'
		}
	},
	{
		path: '/shop/shop_cart', //购物车
		name: 'shop_cart',
		component: resolve => require(['@/views/shop/shop_cart'], resolve),
		meta: {
			title:'购物车'
		}
	},
	{
		path: '/shop/confirm', //确认订单
		name: 'confirm',
		component: resolve => require(['@/views/shop/confirm'], resolve),
		meta: {
			title:'确认订单'
		}
	},
	{
		path: '/shop/o_success', //支付成功
		name: 'o_success',
		component: resolve => require(['@/views/shop/o_success'], resolve),
		meta: {
			title:'支付成功'
		}
	},
	{
		path: '/shop/t_success', //交易成功
		name: 't_success',
		component: resolve => require(['@/views/shop/t_success'], resolve),
		meta: {
			title:'交易成功'
		}
	},
	
	{
		path: '/shop/logistics', //物流
		name: 'logistics',
		component: resolve => require(['@/views/shop/logistics'], resolve),
		meta: {
			title:'物流动态'
		}
	},
	{
		path: '/shop/refund', //退货
		name: 'refund',
		component: resolve => require(['@/views/shop/refund'], resolve),
		meta: {
			title:'申请退货'
		}
	},
	{
		path: '/shop/refund_details', //退款详情
		name: 'refund_details',
		component: resolve => require(['@/views/shop/refund_details'], resolve),
		meta: {
			title:'退款详情'
		}
	},
	{
		path: '/shop/shop_log',//商品浏览
		name: 'shop_log',
		component: resolve => require(['@/views/shop/shop_log'], resolve),
		meta: {
			title: '商品浏览'
		}
	},
	{
		path: '/multi_user_mall', //多用户商城店铺页
		name: 'multi_user_mall',
		component: resolve => require(['@/views/multi_user_mall'], resolve),
		meta: {
			title:'店铺首页'
		}
	},
	{
		path: '/multi_user_mall/search', //多用户商城搜索页
		name: 'search',
		component: resolve => require(['@/views/multi_user_mall/search'], resolve),
		meta: {
			title:'商城搜索'
		}
	},
	{
		path: '/shop/write_logistics', //填写退货物流
		name: 'write_logistics',
		component: resolve => require(['@/views/shop/write_logistics'], resolve),
		meta: {
			title:'填写退货物流'
		}
	},
	{
		path: '/multi_user_mall/shop_details',//多用户商城商品详情页
		name: 'multi_shop_details',
		component: resolve => require(['@/views/multi_user_mall/shop_details'], resolve),
		meta: {
			title:'商品详情'
		}
	},{
		path: '/multi_user_mall/confirm_order',//确认订单
		name: 'multi_confirm_order',
		component: resolve => require(['@/views/multi_user_mall/confirm_order'], resolve),
		meta: {
			title:'确认订单'
		}
	},
	{
		path: '/multi_user_mall/commodity_details',//商品详情页
		name: 'multi_commodity_details',
		component: resolve => require(['@/views/multi_user_mall/commodity_details'], resolve),
		meta: {
			title:'商品详情'
		}
	},
	{
		path: '/multi_user_mall/album',//商品详情页
		name: 'multi_album',
		component: resolve => require(['@/views/multi_user_mall/album'], resolve),
		meta: {
			title:'店铺图册'
		}
	},
	{
		path: '/multi_user_mall/summary', //多用户商城首页
		name: 'summary',
		component: resolve => require(['@/views/multi_user_mall/summary'], resolve),
		meta: {
			title:'多用户商城首页'
		}
	},
	{
		path: '/multi_user_mall/store_qrcode',//店铺二维码
		name: 'store_qrcode',
		component: resolve => require(['@/views/multi_user_mall/store_qrcode'], resolve),
		meta: {
			title:'店铺二维码'
		}
	}
];

export default shopModule
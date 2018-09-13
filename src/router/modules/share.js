const share =[
	{
		path:'/share',
		name:'shareIndex',
		// component:ShareIndex,
		component:()=>import('@/views/share/index'),//异步组件
		meta: {
			navShow: true,
			navIndex:1,
			title: '共享设备'
		}
	},
	{
		path:'/share/sdetail',//门店详情
		name:'sdetail',
		component:resolve => require(['@/views/share/sdetail'], resolve),
		meta: {
			title:'门店详情'
		}
	},
	{
		path:'/share/storelist',//门店列表
		name:'storelist',
		component:resolve => require(['@/views/share/storelist'], resolve),
		props:true,
		meta: {
			navShow: true,
			navIndex:3,
			title:'门店列表',
			keepAlive:true
		}
	},
	{
		path:'/share/meaidetail',//套餐详情
		name:'meaidetail',
		component:resolve => require(['@/views/share/meaidetail'], resolve),
		meta: {
			title:'套餐详情'
		}
	},
	{
		path:'/share/pintroduce',//威健康介绍
		name:'pintroduce',
		component:resolve => require(['@/views/share/pintroduce'], resolve),
		meta: {
			title:'威健康介绍'
		}
	},
	{
		path:'/share/join',//招商加盟
		name:'join',
		component:resolve => require(['@/views/share/join'], resolve),
		meta: {
			title:'招商加盟'
		}
	},
	{
		path:'/share/treatment',//治疗指导
		name:'treatment',
		component:resolve => require(['@/views/share/treatment'], resolve),
		meta: {
			title:'治疗指导'
		}
	},
	{
		path:'/share/comfirmOrder',//确认订单
		name:'comfirmOrder',
		component:resolve => require(['@/views/share/comfirmOrder'], resolve),
		meta: {
			title:'确认订单'
		}
	},
	{
		path:'/share/orderSuccess',//支付成功
		name:'orderSuccess',
		component:resolve => require(['@/views/share/orderSuccess'], resolve),
		meta: {
			title:'支付成功'
		}
	},
	{
		path:'/share/orderDetail',//订单详情
		name:'orderDetail',
		component:resolve => require(['@/views/share/orderDetail'], resolve),
		meta: {
			title:'订单详情'
		}
	},
	{
		path:'/share/orderEval',//订单评价
		name:'orderEval',
		component:resolve => require(['@/views/share/orderEval'], resolve),
		meta: {
			title:'订单评价'
		}
	},
	{
		path:'/share/evaluation',//订单评价
		name:'evaluation',
		component:resolve => require(['@/views/share/evaluation'], resolve),
		meta: {
			title:'评价中心'
		}
	},
	{
		path:'/share/orderReview',//发表追评
		name:'orderReview',
		component:resolve => require(['@/views/share/orderReview'], resolve),
		meta: {
			title:'发表追评'
		}
	},
	{
		path:'/share/orderSunburn',//评价晒单
		name:'orderSunburn',
		component:resolve => require(['@/views/share/orderSunburn'], resolve),
		meta: {
			title:'评价晒单'
		}
	},
	{
		path:'/share/serviceAssess',//服务评价
		name:'serviceAssess',
		component:resolve => require(['@/views/share/serviceAssess'], resolve),
		meta: {
			title:'服务评价'
		}
	},
	{
		path:'/share/usetime',//使用时间
		name:'usetime',
		component:resolve => require(['@/views/share/usetime'], resolve),
		meta: {
			title:'使用时间'
		}
	},
	{
		path:'/share/qrcode',//二维码
		name:'shareQrcode',
		component:resolve => require(['@/views/share/qrcode'], resolve),
		meta: {
			title:'二维码'
		}
	},
	{
		path: '/share/instrumentCode',
		name: 'instrumentCode',
		component:resolve => require(['@/views/share/instrumentCode'], resolve),
		meta: {
			title: '仪器扫码'
		}
	},
	{
		path: '/share/service',
		name: 'service',
		component:resolve => require(['@/views/share/service'], resolve),
		meta: {
			title: '店铺服务'
		}
	},
	{
		path: '/share/guidance',
		name: 'guidance',
		component:resolve => require(['@/views/share/guidance'], resolve),
		meta: {
			title: '治疗指导'
		}
	},
	{
		path: '/share/comsuccess',
		name: 'comsuccess',
		component:resolve => require(['@/views/share/comsuccess'], resolve),
		meta: {
			title: '评价成功'
		}
	}
]

export default share
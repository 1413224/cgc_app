const drawModule = [{
		path: '/draw', //抽奖系统首页
		name: 'draw',
		component: resolve => require(['@/views/draw/index'], resolve),
		meta: {
			title: '抽奖系统首页',
			isNoLogin:true
		}
	},
	{
		path: '/draw/index', //抽奖系统首页
		name: 'draw',
		component: resolve => require(['@/views/draw/index'], resolve),
		meta: {
			title: '抽奖系统首页',
			isNoLogin:true
		}
	},
	{
		path: '/draw/review', //幸运大抽奖
		name: 'review',
		component: resolve => require(['@/views/draw/review'], resolve),
		meta: {
			title: '幸运大抽奖',
			isNoLogin:true
		}
	},
	{
		path: '/draw/luckyrank', //幸运排行
		name: 'luckyrank',
		component: resolve => require(['@/views/draw/luckyrank'], resolve),
		meta: {
			title: '幸运排行',
			isNoLogin:true
		}
	},
	{
		path: '/draw/awards', //我要领奖
		name: 'awards',
		component: resolve => require(['@/views/draw/awards'], resolve),
		meta: {
			title: '我要领奖'
		}
	},
	{
		path: '/draw/record', //参与记录
		name: 'record',
		component: resolve => require(['@/views/draw/record'], resolve),
		meta: {
			title: '参与记录'
		}
	}, {
		path: '/draw/winning', //中奖记录
		name: 'winning',
		component: resolve => require(['@/views/draw/winning'], resolve),
		meta: {
			title: '中奖记录'
		}
	},
	{
		path: '/draw/pastevents', //往期回顾
		name: 'pastevents',
		component: resolve => require(['@/views/draw/pastevents'], resolve),
		meta: {
			title: '往期回顾',
			isNoLogin:true
		}
	},
	{
		path: '/draw/details', //抽奖详情
		name: 'details',
		component: resolve => require(['@/views/draw/draw_details'], resolve),
		meta: {
			title: '抽奖详情',
			isNoLogin:true
		}
	},
	{
		path: '/draw/rule', //抽奖规则
		name: 'draw_rule',
		component: resolve => require(['@/views/draw/rule'], resolve),
		meta: {
			title: '抽奖规则',
			isNoLogin:true
		}
	},
	{
		path: '/draw/unonline', //线下领奖
		name: 'unonline',
		component: resolve => require(['@/views/draw/unonline'], resolve),
		meta: {
			title: '线下领奖'
		}
	},
	{
		path: '/draw/lotteryManage/index', //抽奖管理
		name: 'LotteryManageIndex',
		component: resolve => require(['@/views/draw/lotteryManage/index'], resolve),
		meta: {
			title: '抽奖管理器'
		}
	},
	{
		path: '/draw/lotteryManage/list', //抽奖管理
		name: 'LotteryManageList',
		component: resolve => require(['@/views/draw/lotteryManage/list'], resolve),
		meta: {
			title: '抽奖列表'
		}
	}
]

export default drawModule
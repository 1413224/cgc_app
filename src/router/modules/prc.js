const prcModule = [{
		path: '/prc/index',
		name: 'prcIndex',
		component: resolve => require(['@/views/prc/index'], resolve),
		meta: {
			title: '中国地区馆',
			isNoLogin:true
		}
	}
]

export default prcModule
import brandIndex from '@/views/brand/index'
import brandGlobal from '@/views/brand/global'
import brandShop from '@/views/brand/shop'
import brandFamous from '@/views/brand/famous'

const brandModule = [{
		path: '/brand/index',
		name: 'brandIndex',
		component: resolve => require(['@/views/brand/index'], resolve),
		meta: {
			title: '品牌馆'
		}
	},
	{
		path: '/brand/global',
		name: 'brandGlobal',
		component: resolve => require(['@/views/brand/global'], resolve),
		meta: {
			title: '全球购'
		}
	},
	{
		path: '/brand/shop',
		name: 'brandShop',
		component: resolve => require(['@/views/brand/shop'], resolve),
		meta: {
			title: '全球海外馆'
		}
	},
	{
		path: '/brand/famous',
		name: 'brandFamous',
		component: resolve => require(['@/views/brand/famous'], resolve),
		meta: {
			title: '国际品牌'
		}
	}
]

export default brandModule
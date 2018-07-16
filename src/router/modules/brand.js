import brandIndex from '@/views/brand/index'
import brandGlobal from '@/views/brand/global'

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
	}
]

export default brandModule
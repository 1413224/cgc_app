const invoiceModule = [{
		path: '/invoice/index',
		name: 'invoiceIndex',
		component: resolve => require(['@/views/invoice/index'], resolve),
		meta: {
			title: '发票管理'
		}
	},{
		path: '/invoice/edit',
		name: 'invoiceEdit',
		component: resolve => require(['@/views/invoice/edit'], resolve),
		meta: {
			title: '编辑发票'
		}
	},{
		path: '/invoice/detail',
		name: 'invoiceDetail',
		component: resolve => require(['@/views/invoice/detail'], resolve),
		meta: {
			title: '发票详情'
		}
	},{
		path: '/invoice/send',
		name: 'invoiceSend',
		component: resolve => require(['@/views/invoice/send'], resolve),
		meta: {
			title: '下载发票'
		}
	},{
		path: '/invoice/result',
		name: 'invoiceResult',
		component: resolve => require(['@/views/invoice/result'], resolve),
		meta: {
			title: '下载发票'
		}
	},{
		path: '/invoice/manage',
		name: 'invoiceManage',
		component: resolve => require(['@/views/invoice/manage'], resolve),
		meta: {
			title: '发票管理'
		}
	}
]

export default invoiceModule
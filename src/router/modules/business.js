// import management from '@/views/business'

const business =[
	{
		path:'/business',
		name:'management',
		component:resolve => require(['@/views/business'],resolve),
		meta:{
			title:'选择身份',
			isNoLogin:true
		}
	},
	{
		path:'/business/shoplist',
		name:'management',
		component:resolve => require(['@/views/business/shoplist'],resolve),
		meta:{
			title:'选择企业'
		}
	},
	{
		path:'/business/assets',
		name:'management',
		component:resolve => require(['@/views/business/assets'],resolve),
		meta:{
			title:'企业资产'
		}
	}
]

export default business
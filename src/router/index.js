import Vue from 'vue'
import Router from 'vue-router'
import shopModule from '@/router/modules/shop'
import memberModule from '@/router/modules/member'
import share from '@/router/modules/share'
import draw from '@/router/modules/draw'
import lock from '@/router/modules/lock'
import brand from '@/router/modules/brand'
import business from '@/router/modules/business'
import prcModule from '@/router/modules/prc'
import invoiceModule from '@/router/modules/invoice'
Vue.use(Router)

var all = shopModule.concat(memberModule, share, draw, lock, brand, business, prcModule,invoiceModule)

export default new Router({
	// base:'/new/',
	routes: all,
	// mode:'history',
	/* fallback:true*/
	// scrollBehavior(){}
})
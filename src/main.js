// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuex from 'vuex'
// import echatrs from 'echarts'
import './assets/icons_font/iconfont.css'
import './style/global.css'
import 'swiper/dist/css/swiper.css'
import './config/wy_rem'

import './global/vux_component.js' //vux-UI的所有全局注册组件
import FastClick from 'fastclick'
// import 'video.js/dist/video-js.css'
// import VueLazyLoad from 'vue-lazyload'
import mainApp from './global/global' //时间控件  全局时间过滤器
import { base64_encode, base64_decode } from './global/course.js'
import MD5 from 'js-md5'
import axios from './config/axios_config'
import url from './config/url'
//组件插件
import dialog from '@/components/dialog'
import code from '@/components/code'
import scimg from '@/components/scimg'
import popup from '@/components/popup'
import pdf from '@/components/pdf'
import animate from 'animate.css' //引用动画库
import merge from 'webpack-merge'
import vuePicturePreview from 'vue-picture-preview'

FastClick.attach(document.body);

Vue.prototype.base64_encode = base64_encode
Vue.prototype.base64_decode = base64_decode
Vue.prototype.MD5 = MD5
Vue.prototype.$http = axios //定义axios组件用法  this.$http(opt).then(fn)
Vue.prototype.url = url //全局url路径
Vue.prototype.url2 = url //全局url路径
// Vue.prototype.$echarts = echarts
Vue.prototype.merge = merge
Vue.prototype.mainApp = mainApp

Number.prototype.toFloor = function(num) {
		return Math.floor(this * Math.pow(10, num)) / Math.pow(10, num);
}

//组件插件
Vue.use(dialog)
Vue.use(code)
Vue.use(scimg)
Vue.use(popup)
Vue.use(pdf)
Vue.use(Vuex)
Vue.use(animate)
Vue.use(vuePicturePreview)
// 懒加载图片
/*Vue.use(VueLazyLoad, {
		preLoad: 1.3,
		error: './static/images/warning.png',
		loading: './static/images/loading.png',
})*/
// --------------------------------

Vue.filter('getDate', function(value) {
		if(value != 0 && value) {
				var v = value.toString()
				if(v.length == 10) {
						return mainApp.frDateTimehp.getFormatTimesTamp(value * 1000)
				} else if(v.length == 13) {
						return mainApp.frDateTimehp.getFormatTimesTamp(value)
				}
		} else {
				return value
		}
})

Vue.filter('getDate2', function(value) {
		if(value != 0) {
				return mainApp.frDateTimehp.getFormatDateTamp(value * 1000)
		} else {
				return value
		}
})

Vue.config.silent = true
Vue.config.productionTip = false

//判断是否微信端
var ua = navigator.userAgent.toLowerCase()
var isWeixin = ua.indexOf('micromessenger') != -1
if(isWeixin) {
		store.state.page.isWx = true
} else {
		store.state.page.isWx = false
}

//动画ios修复
const shouldUseTransition = !/transition=none/.test(location.href)
store.registerModule('vux', {
		state: {
				direction: shouldUseTransition ? 'forward' : ''
		},
		mutations: {
				UPDATE_DIRECTION(state, payload) {
						if(!shouldUseTransition) {
								return
						}
						state.direction = payload.direction
				}
		}
})

const history = window.sessionStorage

//history.clear()  刷新保留奖励判断值 isPopup _openid_  只有关闭页面才清除

for(var i = 0, len = history.length; i < len; i++) {
		var key = history.key(i)
		var value = history.getItem(key)
		if(key != 'isPopup' && key != 'isPay' && key != 'isZc' && key != 'isZj' && key != 'isSr' && key != '_openid_' && key != 'parentUserId' && key != '_accessCode_') {
				history.removeItem(key)
		}
}

let historyCount = history.getItem('count') * 1;

let isPush = false
let endTime = Date.now()
let methods = ['push', 'go', 'replace', 'forward', 'back']

var startX = 0
//touchStart事件
document.addEventListener('touchstart', function(event) {
		startX = event.targetTouches[0].pageX
}, false)

//touchend事件
document.addEventListener('touchend', (e) => {
		endTime = Date.now()
})

methods.forEach(key => {
		let method = router[key].bind(router)
		router[key] = function(...args) {
				isPush = true
				method.apply(null, args)
		}
})

var info = base64_decode(localStorage['_HASH_'])
// alert(JSON.stringify(info))
if(!info){
	var token = "";
}
else{
	var token = info.token ? info.token : ""
}

router.beforeEach(function(to, from, next) {
		// store.commit('setToPath',to)
		if(to.query.offLine) {
				if(to.query.eid) {
						localStorage.setItem('_enterpriseId_', to.query.eid)
				}
				if(to.query.n) {
						localStorage.setItem('_code_', to.query.n)
				}
		}
		if(to.query.parentId) {
				localStorage.setItem('_parentid_', to.query.parentId) //用于绑定会员
		}
		

		var jumpUrl = '';//
		var wechatUrl= '';//当前项目的url

		if (location.host == "health.cgc999.com") {
			wechatUrl = '//health.cgc999.com/web/new/index.html#'
			jumpUrl = '//health.cgc999.com/web/oriza/index.html#'
		} else if (location.host == "www.cgc999.com") {
			wechatUrl = '//www.cgc999.com/new/index.html#'
			jumpUrl = '//www.cgc999.com/oriza/index.html#'
		} else if (location.host == "cgc.cgc999.com") {
			wechatUrl = '//cgc.cgc999.com/web/new/index.html#'
			jumpUrl = '//cgc.cgc999.com/web/oriza/index.html#'
		} else {
			wechatUrl = '//www.cgc999.com/web/new/index.html#'
			jumpUrl = '//www.cgc999.com/oriza/index.html#'
		}

		// let openid = localStorage['_openid_']
		//判断curTime
		if(localStorage['_curTime_']){
			var time = 2 * 60 * 60 * 1000
			if(new Date().getTime() - localStorage['_curTime_'] > time){
					localStorage.removeItem('_HASH_')
					localStorage.removeItem('_openid_')
			}
		}


		if(/MicroMessenger/.test(window.navigator.userAgent)){

			let openid = localStorage['_openid_']
			
			// alert('openid'+ openid)
			// alert('openid2'+ localStorage['_openid_'])

			if(!openid && (to.path != '/member/oriza') && (to.path != '/user/reg')) {
				// alert('进入授权')
					localStorage.setItem('beforeLoginUrl', wechatUrl + to.fullPath)
					window.location.href = jumpUrl + '/member/oriza'
					return false

			}else if(openid && (!store.state.user.userId || !store.state.user.token)){
				/*alert('userId'+store.state.user.userId)
				alert('token'+store.state.user.token)
				alert(to.meta.isNoLogin)*/
				if (to.meta.isNoLogin) {
					//判断路由白名单
					//alert('白名单')
					next()
				}else{
					if(to.path=='/user/login'){
						next()
					}else{
						next({
							path: '/user/login'
						})
					}
				}
				
			}
		}

		//缓存路由页面 注册协议
		store.state.page.includeList = []
		store.state.page.isLogin = localStorage['isLogin']
		let info = base64_decode(localStorage['_HASH_'])
		if(info) {
				// store.state.user.userId = info.id
				store.state.user.userId = info.userId
		}

		if(to.path == '/user/reg' || to.path == '/user/login') {
				to.meta.keepAlive = true
		} else if((from.path == '/user/reg' || from.path == '/user/login') && to.path != '/member/setting/agreement') {
				from.meta.keepAlive = false
		} else if((from.path == '/user/reg' || from.path == '/user/login') && to.path == '/member/setting/agreement') {
				from.meta.keepAlive = true
		}

		if(to.meta.keepAlive) {
				store.state.page.includeList.push(to.name)
		}
		if(from.meta.keepAlive) {
				store.state.page.includeList.push(from.name)
		}

		//判断微信版本
		var wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i)
		if(wechatInfo) {
				if(wechatInfo[1] < '6.6.7') {
						//touchEnd事件
						document.addEventListener('touchend', function(event) {
								startX = 0
						}, false)
						window.onpopstate = function(e) {
								if((Date.now() - endTime) < 377) {
										store.state.page.back = false
								} else if((Date.now() - endTime) > 377 && startX > 160) {
										store.state.page.back = false
								} else {
										store.state.page.back = true
								}
						}
						const toIndex = history.getItem(to.path)
						const fromIndex = history.getItem(from.path)
						if(toIndex) {
								if(!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
										// 判断是否是ios左滑返回
										if(!isPush && (Date.now() - endTime) < 377 || !isPush && (Date.now() - endTime) > 377) {
												if(store.state.page.back) {
														store.commit('UPDATE_DIRECTION', {
																direction: 'reverse'
														})
												} else {
														store.commit('UPDATE_DIRECTION', {
																direction: ''
														})
												}
										} else {
												store.commit('UPDATE_DIRECTION', {
														direction: 'forward'
												})
										}
								} else {
										// 判断是否是ios左滑返回
										if(!isPush && (Date.now() - endTime) < 377 || !isPush && (Date.now() - endTime) > 377) {
												if(store.state.page.back) {
														store.commit('UPDATE_DIRECTION', {
																direction: 'reverse'
														})
												} else {
														store.commit('UPDATE_DIRECTION', {
																direction: ''
														})
												}
										} else {
												store.commit('UPDATE_DIRECTION', {
														direction: 'reverse'
												})
										}
								}
						} else {
								++historyCount
								history.setItem('count', historyCount)
								to.path !== '/' && history.setItem(to.path, historyCount)
								if(!isPush && (Date.now() - endTime) < 377 || !isPush && (Date.now() - endTime) > 377) {
										if(store.state.page.back) {
												store.commit('UPDATE_DIRECTION', {
														direction: 'reverse'
												})
										} else {
												store.commit('UPDATE_DIRECTION', {
														direction: ''
												})
										}
								} else {
										store.commit('UPDATE_DIRECTION', {
												direction: 'forward'
										})
								}
						}
				} else {
						const toIndex = history.getItem(to.path)
						const fromIndex = history.getItem(from.path)
						if(toIndex) {
								if(!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
										store.commit('UPDATE_DIRECTION', {
												direction: 'forward'
										})
								} else {
										store.commit('UPDATE_DIRECTION', {
												direction: 'reverse'
										})
								}
						} else {
								++historyCount
								history.setItem('count', historyCount)
								to.path !== '/' && history.setItem(to.path, historyCount)
								if(startX > 0) {
										store.commit('UPDATE_DIRECTION', {
												direction: 'forward'
										})
								} else {
										store.commit('UPDATE_DIRECTION', {
												direction: ''
										})
								}
						}
				}
		} else {
				//touchEnd事件
				document.addEventListener('touchend', function(event) {
						startX = 0
				}, false)
				window.onpopstate = function(e) {
						if((Date.now() - endTime) < 377) {
								store.state.page.back = false
						} else if((Date.now() - endTime) > 377 && startX > 160) {
								store.state.page.back = false
						} else {
								store.state.page.back = true
						}
				}
				const toIndex = history.getItem(to.path)
				const fromIndex = history.getItem(from.path)
				if(toIndex) {
						if(!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
								// 判断是否是ios左滑返回
								if(!isPush && (Date.now() - endTime) < 377 || !isPush && (Date.now() - endTime) > 377) {
										if(store.state.page.back) {
												store.commit('UPDATE_DIRECTION', {
														direction: 'reverse'
												})
										} else {
												store.commit('UPDATE_DIRECTION', {
														direction: ''
												})
										}
								} else {
										store.commit('UPDATE_DIRECTION', {
												direction: 'forward'
										})
								}
						} else {
								// 判断是否是ios左滑返回
								if(!isPush && (Date.now() - endTime) < 377 || !isPush && (Date.now() - endTime) > 377) {
										if(store.state.page.back) {
												store.commit('UPDATE_DIRECTION', {
														direction: 'reverse'
												})
										} else {
												store.commit('UPDATE_DIRECTION', {
														direction: ''
												})
										}
								} else {
										store.commit('UPDATE_DIRECTION', {
												direction: 'reverse'
										})
								}
						}
				} else {
						++historyCount
						history.setItem('count', historyCount)
						to.path !== '/' && history.setItem(to.path, historyCount)
						if(!isPush && (Date.now() - endTime) < 377 || !isPush && (Date.now() - endTime) > 377) {
								if(store.state.page.back) {
										store.commit('UPDATE_DIRECTION', {
												direction: 'reverse'
										})
								} else {
										store.commit('UPDATE_DIRECTION', {
												direction: ''
										})
								}
						} else {
								store.commit('UPDATE_DIRECTION', {
										direction: 'forward'
								})
						}
				}
		}
		if(/\/http/.test(to.path)) {
				let url = to.path.split('http')[1]
				// console.log(9)
				window.location.href = `http${url}`
		} else {
				next()
		}
})

router.afterEach(function(to) {
		isPush = false
		startX = 0
		store.commit('UPDATE_DACK', {
				back: false
		})
})

Vue.prototype.vm = new Vue({
		el: '#app',
		router,
		store,
		components: {
				App
		},
		template: '<App/>'
})
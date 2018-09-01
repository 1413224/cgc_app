// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import creatrStore from './store'
import Vuex from 'vuex'
import echatrs from 'echarts'
import './assets/icons_font/iconfont.css'
import './style/global.css'
import 'swiper/dist/css/swiper.css'
import './config/wy_rem'
import { Group, DatetimeRange, Cell, XDialog, Tab, TabItem, CellBox, XHeader, Scroller, LoadMore, Confirm, Popup, Toast, Swiper, InlineXNumber, CheckIcon, CellFormPreview, XSwitch, XNumber, Badge, Previewer, Timeline, TimelineItem, Rater, XTextarea, Radio, Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
import { TransferDom } from 'vux'
import FastClick from 'fastclick'
import 'video.js/dist/video-js.css'
import VueLazyLoad from 'vue-lazyload'
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
import animate from 'animate.css' //引用动画库
import { LoadingPlugin, DatetimePlugin, ToastPlugin } from 'vux' //全局load
import echarts from 'echarts' //echart
import merge from 'webpack-merge'
import vuePicturePreview from 'vue-picture-preview'
import { BusPlugin } from 'vux'

FastClick.attach(document.body);

Vue.prototype.base64_encode = base64_encode
Vue.prototype.base64_decode = base64_decode

Vue.prototype.MD5 = MD5
Vue.prototype.$http = axios //定义axios组件用法  this.$http(opt).then(fn)

Vue.prototype.url = url //全局url路径
Vue.prototype.url2 = url //全局url路径

Vue.prototype.$echarts = echarts
Vue.prototype.merge = merge

Vue.prototype.mainApp = mainApp

//全局支付方法
Vue.prototype.pay = function(params) {
	
	var oid = sessionStorage['_openid_']
	let openid = sessionStorage['_openid_']
	console.log(params)
	axios.post(url.zf.pay, {
		id: '200001',
		subMchId: '1511640641',
		body: params.body,
		feeType: 'CNY',
		outTotalFee: params.payPrice,
		spbillCreateIp: params.ip,
		tradeType: 'JSAPI',
		openId: openid,
		parentOrderSn: params.parentOrderSn,
		attach: params.enterpriseName
	}).then((res) => {
		var data = res.data.data
		wx.config({
			debug: false,
			appId: data.appId,
			timestamp: data.timeStamp,
			nonceStr: data.nonceStr,
			signature: data.signature,
			jsApiList: [
				'checkJsApi',
				'startRecord',
				'stopRecord',
				'translateVoice',
				'scanQRCode',
				'openCard',
				'chooseWXPay'
			]
		})

		wx.chooseWXPay({
			appId: data.appId,
			timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符  
			nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位  
			package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）  
			signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'  
			paySign: data.paySign, // 支付签名  
			success: function(res) {
				WeixinJSBridge.call('closeWindow')
			},
			error: function() {
				Vue.$vux.toast.show({
					text: '支付失败',
					type: 'text',
					position: 'top',
					width: '50%'
				})
			},
			cancel: function() {
				Vue.$vux.toast.show({
					text: '您已取消了支付',
					type: 'text',
					position: 'top',
					width: '50%'
				})
			}
		})

	})
}

//组件插件
Vue.use(dialog)
Vue.use(code)
Vue.use(scimg)
Vue.use(popup)

Vue.use(Vuex)
Vue.use(animate)
//全局load
Vue.use(LoadingPlugin)
Vue.use(DatetimePlugin)
Vue.use(ToastPlugin)

Vue.use(vuePicturePreview)
Vue.use(BusPlugin)

const store = creatrStore()

// 懒加载图片
Vue.use(VueLazyLoad, {
	preLoad: 1.3,
	error: './static/images/warning.png',
	loading: './static/images/loading.png',
})
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

Vue.directive('transfer-dom', TransferDom)
Vue.component('group', Group)
Vue.component('datetime-range', DatetimeRange)
Vue.component('cell', Cell)
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('cell-box', CellBox)
Vue.component('x-header', XHeader)
Vue.component('scroller', Scroller)
Vue.component('load-more', LoadMore)
Vue.component('popup', Popup)
Vue.component('toast', Toast)
Vue.component('confirm', Confirm)
Vue.component('swiper', Swiper)
Vue.component('inline-x-number', InlineXNumber)
Vue.component('check-icon', CheckIcon)
Vue.component('cell-form-preview', CellFormPreview)
Vue.component('x-switch', XSwitch)
Vue.component('x-number', XNumber)
Vue.component('badge', Badge)
Vue.component('previewer', Previewer)
Vue.component('timeline', Timeline)
Vue.component('timeline-item', TimelineItem)
Vue.component('rater', Rater)
Vue.component('x-textarea', XTextarea)
Vue.component('radio', Radio)
Vue.component('x-dialog', XDialog)
Vue.component('swipeout', Swipeout)
Vue.component('swipeout-item', SwipeoutItem)

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
// let openid = history.getItem('_openid_')

for(var i = 0, len = history.length; i < len; i++) {
	var key = history.key(i)
	var value = history.getItem(key)
	if(key != 'isPopup' && key != 'isPay' && key != 'isZc' && key != '_openid_') {
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

router.beforeEach(function(to, from, next) {

	let openid = sessionStorage['_openid_']

	/*if(!openid && (to.path != '/member/oriza') && (to.path != '/user/reg')) {

		window.localStorage.setItem("beforeLoginUrl", to.fullPath); //保存用户进入的url
		let ua = window.navigator.userAgent.toLowerCase()
		if(ua.match(/MicroMessenger/i) == 'micromessenger') {
			next({
				path: '/member/oriza'
			})
			return false
		}
	}*/

	//缓存路由页面 注册协议
	store.state.page.includeList = []

	store.state.page.isLogin = localStorage['isLogin']

	let info = base64_decode(localStorage['_HASH_'])

	if(info) {
		store.state.user.userId = info.id
	}

	if(to.path == '/user/reg') {
		to.meta.keepAlive = true
	} else if(from.path == '/user/reg' && to.path != '/member/setting/agreement') {
		from.meta.keepAlive = false
	} else if(from.path == '/user/reg' && to.path == '/member/setting/agreement') {
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
import Vue from 'vue'
import router from '@/router/index'
import store from '@/store/index'
import axios from 'axios'
import isload from '@/components/isload'
import url from '../config/url.js'
import { base64_decode, base64_encode } from '../global/course.js'

import MD5 from 'js-md5'

Vue.use(isload)

axios.defaults.retry = 4 //请求次数
axios.defaults.retryDelay = 1000 //请求间隙
// axios.defaults.baseURL = '//domain.cgc999.com/apigw' // 请求默认地址
// axios.defaults.baseURL = '//health.cgc999.com/apigw' // 请求默认地址,演示版
if(location.host == "health.cgc999.com") {
	axios.defaults.baseURL = '//health.cgc999.com/apigw' // 演示环境
} else if(location.host == "www.cgc999.com") {
	axios.defaults.baseURL = '//domain.cgc999.com/apigw' // 测试环境
} else if(location.host == "cgc.cgc999.com") {
	axios.defaults.baseURL = '//cgc.cgc999.com/apigw' // 线上环境
} else {
	axios.defaults.baseURL = '//domain.cgc999.com/apigw' // 开发环境
	// axios.defaults.baseURL = '//192.168.3.203/apigw' // 
}

var URL = ""

axios.interceptors.request.use(config => {
	// isLoading方法
	if(config.params) {
		if(!config.params.islist) {
			Vue.$isload.show()
		}
	} else {
		Vue.$isload.show()
	}

	// let token = localStorage.getItem('token')

	var token,
		userNp,
		id,
		randomAccessCode,
		_HASH_ = localStorage.getItem('_HASH_'),
		info = base64_decode(_HASH_);
	// console.log(info)
	// console.log(url.client)
	if(info) {
		token = info.token ? info.token : ""
		// token = ""
		id = info.userId ? info.userId : ""
		randomAccessCode = info.randomAccessCode ? info.randomAccessCode : ""
		userNp = id + url.client + randomAccessCode
	} else {
		token = ""
	}

	let timestamp = Math.round(new Date().getTime() / 1000)
	let sign = ''
	if(token && config.url.split('/')[2] != 'public') {
		sign = MD5(config.url + timestamp + userNp)
		// console.log(config.url + timestamp + userNp)
	} else {
		sign = MD5(config.url + timestamp)
		// console.log(config.url + timestamp)
	}

	let type = 'application/json;charset=utf-8'
	let entry = config.url.slice(0, 4)
	if(entry === 'http') {
		config.headers = {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	} else {
		if(config.url == '/datacenter/v1/fileupload/image') { // 自定义图片上传头部  ?type=user&name=user
			let type = 'Content-Type: multipart/form-data'
			let form = new FormData()
			for(let key in config.data) {
				form.append(key, config.data[key])
			}
			config.data = form
			config.url = '/datacenter/v1/fileupload/image?name=' + config.data.name + '&type=user'

		} else {
			let type = 'application/json;charset=utf-8'
		}
		config.headers = {
			'Content-Type': type,
			'timestamp': timestamp,
			'sign': sign,
			'token': token
		}
	}

	URL = config.url

	return config
}, error => {
	return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(res => {
	// 响应成功关闭loading
	Vue.$isload.hide({
		ishide() {

		}
	})
	//TODO 后续需要完善成进入个人中心无需强制登录
	if(res.data.status != '00000000' && res.data.status != 1) {
		if(res.data.status == '401' //token签名有误
			||
			res.data.status == 'utils010' //未登录状态
			||
			res.data.status == 'utils007' //重新登录
			||
			res.data.status == 'utils009' //token失效
			||
			res.data.status == 'user-0020' //用户不存在，请重新注册
		) {

			var params;

			if(
				/MicroMessenger/.test(window.navigator.userAgent) ||
				/AlipayClient/.test(window.navigator.userAgent)
			) {
				// alert(res.data.status)
				/*router.beforeEach(function(to, from, next) {
					// alert('axios'+to.meta.isNoLogin)
					if(to.meta.isNoLogin) {
						next()
					} else {
						localStorage.removeItem('_openid_')
						localStorage.removeItem('_HASH_')
						window.location.reload();
						return false;
					}
				})*/

				if(!router.history.current.meta.isNoLogin){
					localStorage.removeItem('_openid_')
					localStorage.removeItem('_HASH_')
					window.location.reload();
					return false;
				}

			} else {
				if(!router.history.current.meta.isNoLogin){
					router.push({
						path: '/user/login'
					})
				}

			}

		} else {

			if(res.data.status == 'user-0010' ||
				res.data.status == 'user-0001'
			) { //用户不存在，用户未找到
				localStorage.setItem('isLogin', false)
				// alert('用户不存在')
				router.push({
					path: '/user/login'
				})
				return false;
			}

			if(res.data.status == 'user-diypage-00003') {
				// console.log(res.data.message)
			} else {
				Vue.$vux.toast.show({
					text: res.data.message,
					type: 'text',
					position: 'middle',
					width: '50%'
				})
			}

		}
	}
	// alert(res.data.status)
	/*if(res.data.status != '00000000' && res.data.status != 1) {
		if(res.data.status == '401' && URL != '/user/param/v1/user/getBasicInfo') {
			//未登录状态  返回登录页面
			router.push({
				path: '/user/login'
			})
			Vue.$vux.toast.show({
				text: '请先登录',
				type: 'text',
				position: 'middle',
				width: '50%'
			})
			localStorage.setItem('isLogin', false)
		} else if((res.data.status == 'utils007' || res.data.status == 'utils010' || res.data.status == 'apigw004' || res.data.status == 'user-0020') && URL !== '/user/param/v1/user/getBasicInfo') {
			//重复登录   用户不存在 不是获取个人信息接口 返回登录页面
			
			var t;
			if(res.data.status == 'user-0020' || res.data.status == 'user-0010') {
				t = '用户不存在，请重新注册'
			} else {
				t = '登录已过期,请重新登录'
			}

			Vue.$vux.toast.show({
				text: t,
				type: 'text',
				position: 'middle',
				width: '60%'
			})
			localStorage.setItem('isLogin', false)
			router.push({
				path: '/user/login'
			})
			// alert("已过期")
			return false;
		} else if((res.data.status == 'user-0020' || res.data.status == 'user-0010' || res.data.status == 'user-0001') ) {
			// && URL == '/user/param/v1/user/getBasicInfo'
			//用户不存在 获取个人信息接口 不返回登录页面
			// alert(res.data.status)
			Vue.$vux.toast.show({
				text: '用户不存在，请重新注册',
				type: 'text',
				position: 'middle',
				width: '60%'
			})
			localStorage.setItem('isLogin', false)
			router.push({
				path: '/user/login'
			})
		} else if((res.data.status == 'utils007' || res.data.status == 'utils010') && URL == '/user/param/v1/user/getBasicInfo') {
			//重复登录 获取个人信息接口 改变登录状态
			localStorage.setItem('isLogin', false)
		} else if(res.data.status == 'utils009') {
			//微信token过期 自动重新登录   
			axios.post(url.user.loginByUnionId, {
				accessCode: localStorage['_accessCode_'],
				unionid: localStorage['_openid_'],
				platformId: url.platformId,
				terminal: url.client,
				type: 1
			}).then((res) => {
				if(res.data.status == "00000000") {
					let hash = base64_encode(res.data.data)
					store.state.user.userId = res.data.data.id
					localStorage.setItem('_HASH_', hash)
					localStorage.setItem('isLogin', true)
					location.reload()
				}
			})
		} else if(res.data.status == 'user-diypage-00003') {
			// alert("不存在自定义页面")
		} else if(URL != '/user/param/v1/user/getBasicInfo') {
			//其他接口 提示
			Vue.$vux.toast.show({
				text: res.data.message,
				type: 'text',
				position: 'middle',
				width: '50%'
			})
		}
	}*/
	return res
}, error => {
	Vue.$isload.hide({
		ishide() {
			Vue.$vux.toast.show({
				text: error.message,
				type: 'text',
				position: 'middle'
			})
		}
	})
	return Promise.reject(error)
})


export default axios
import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import isload from '@/components/isload'
import router from '@/router'
import url from '../config/url.js'
import { base64_decode } from '../global/course.js'

import MD5 from 'js-md5'

Vue.use(isload)

axios.defaults.retry = 4 //请求次数
axios.defaults.retryDelay = 1000 //请求间隙
axios.defaults.baseURL = 'http://47.104.187.243:18666' // 请求默认地址

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

	if(info) {

		token = info.token ? info.token : ""
		id = info.id ? info.id : ""
		randomAccessCode = info.randomAccessCode ? info.randomAccessCode : ""

		userNp = id + url.client + randomAccessCode
	} else {
		token = ""
	}

	// console.log(token)

	let timestamp = Math.round(new Date().getTime() / 1000)
	let sign = ''
	if(token && config.url.split('/')[2] != 'public') {

		sign = MD5(config.url + timestamp + userNp)
	} else {
		sign = MD5(config.url + timestamp)
	}

	let type = 'application/json;charset=utf-8'
	let entry = config.url.slice(0, 4)
	if(entry === 'http') {
		config.headers = {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	} else {
		if(config.url == '/datacenter/v1/fileupload/image') { // 自定义图片上传头部
			let type = 'Content-Type: multipart/form-data'
			let form = new FormData()
			for(let key in config.data) {
				form.append(key, config.data[key])
			}
			config.data = form
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
	if(res.data.status != '00000000' && res.data.status != 1) {
		localStorage.setItem('isLogin',false)
		if(res.data.status == '401') {
			router.replace({
				path: '/user/reg'
			})
			Vue.$vux.toast.show({
				text: '请先登录',
				type: 'text',
				position: 'middle',
				width: '50%'
			})
		} else if(res.data.status == 'utils007' || res.data.status == 'utils010' && URL != '/user/v1/user/getBasicInfo') {
			router.replace({
				path: '/user/reg'
			})
			Vue.$vux.toast.show({
				text: '登录已过期,请重新登录',
				type: 'text',
				position: 'middle',
				width: '60%'
			})
		} else if(URL != '/user/v1/user/getBasicInfo') {
			Vue.$vux.toast.show({
				text: res.data.message,
				type: 'text',
				position: 'middle',
				width: '50%'
			})
		}
	}
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
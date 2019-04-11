<template>
	<div class="aa"></div>
</template>

<script>
	import url from '../../../config/url.js'
	import { base64_encode, base64_decode } from '../../../global/course.js'
	export default {
		data() {
			return {
				url2: ''
			}
		},
		created() {
			this.updateRouter()
			// var url = localStorage['beforeLoginUrl'].split('?')[0]
			// this.url2 = url.split('?')[0]
		},
		methods: {
			grant() {
				let _this = this
				// 跳转到微信授权页面
				/*alert(_this.url.platformId)
				alert(localStorage['_parentid_'])
				alert(localStorage['_parentid_'])
				alert(localStorage['_enterpriseId_'])
				alert(localStorage['_code_'])*/
				_this.$http.get(_this.url.origin.getAuthorizationUrl, {
					params: {
						platformId: _this.url.platformId, //2018050800000002
						type: 1,
						parentUserId:localStorage['_parentid_'],
						eId:localStorage['_enterpriseId_'],
						code:localStorage['_code_']
					}
				}).then((res) => {
					if(res.data.status == '00000000') {
						let data = res.data
							// alert(data.data)
							window.location.href = data.data
					}
				})
			},
			updateRouter() {
				var _this = this

				let openid = this.$route.query.openId
				let accessCode = this.$route.query.accessCode
				let uid = this.$route.query.userId
				let acscode = this.$route.query.randomAccessCode
				let token = this.$route.query.token
				// alert(accessCode)
				if(openid) {
					this.$store.commit('getOpenId', openid)
					// alert("openid"+ openid)
					localStorage.setItem('_openid_', openid)
					// alert(localStorage['_openid_'])

					if(uid && acscode && token) {
						let hash = {
							id: uid,
							userId:uid,
							randomAccessCode: acscode,
							token: token
						}
						// alert('uid'+uid)
						localStorage.setItem('_accessCode_', accessCode) 
						
						localStorage.setItem('_HASH_', base64_encode(hash))

						_this.$store.state.page.isLogin = 'true'

						// alert('测试'+_this.$store.state.page.isLogin)
						_this.$store.state.user.userId = uid

						localStorage.setItem('isLogin', _this.$store.state.page.isLogin)

						//获取用户信息
						_this.$http.get(_this.url.user.getBasicInfo, {
							params: {
								userId: uid
							}
						}).then((res) => {
							if(res.data.status == "00000000") {
								_this.$store.commit('UPDATE_USER_INFO', res.data.data)
								localStorage.setItem('userInfo', JSON.stringify(res.data.data))
								// alert("公众号授权"+localStorage['beforeLoginUrl'])
								// 为了分离登录注册准备的代码
								if(localStorage['beforeLoginUrl']){
									window.location.href = localStorage['beforeLoginUrl']
								}else{
									_this.$router.push({
										path: localStorage['wechartBeforeLoginUrl']
									})
								}
								// 为了分离登录注册准备的代码
								/*_this.$router.push({
									path: localStorage['beforeLoginUrl']
								})*/
								//								if(_this.url2 == '/share/instrumentCode' || _this.url2 == '/multi_user_mall') {
								//									_this.$router.push({
								//										path: localStorage['beforeLoginUrl']
								//									})
								//								} else {
								//									_this.$router.push({
								//										path: '/index'
								//									})
								//								}

							}
						})

					} else {
						// var url = localStorage['beforeLoginUrl'].split('?')[0]
						//						if(url == '/share/instrumentCode' || url == '/multi_user_mall') {
						//							_this.$router.push({
						//								path: localStorage['beforeLoginUrl']
						//							})
						//						} else {
						//							_this.$router.push({
						//								path: '/index'
						//							})
						//						}
						// alert("仅有openid时"+localStorage['beforeLoginUrl'])
						//为了分离登录注册准备的代码
							/*if(localStorage['beforeLoginUrl']){
								window.location.href = localStorage['beforeLoginUrl']
							}else{
								_this.$router.push({
									path: localStorage['wechartBeforeLoginUrl']
								})
							}*/
							if(localStorage['beforeLoginUrl']){
								//存在beforeLoginUrll
								var strUrl = localStorage['beforeLoginUrl']
								// var hostUrl = strUrl.substr(0,strUrl.indexOf('.')) // //www
								if(strUrl.substr(0,2)!='//'){
									_this.$router.push({
										path:localStorage['beforeLoginUrl']
									})
								}else{
									window.location.href = localStorage['beforeLoginUrl']
								}
							}else{
								localStorage.setItem('beforeLoginUrl',to.fullPath)
							}
						
					}

				} else {
					this.grant()
				}
			}

		},
		components: {

		},
		watch: {
			'$route': function(val) {
				this.updateRouter()
			}
		}

	}
</script>

<style lang="less" scoped>

</style>
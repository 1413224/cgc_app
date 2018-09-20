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

			var url = localStorage['beforeLoginUrl'].split('?')[0]
			this.url2 = url.split('?')[0]
		},
		methods: {
			grant() {

				let _this = this;
				// 跳转到微信授权页面
				_this.$http.get(_this.url.origin.getAuthorizationUrl, {
					params: {
						platformId: '2018050800000002', //2018050800000002
						type: 1
					}
				}).then((res) => {
					if(res.data.status == '00000000') {
						let data = res.data
						window.location.href = data.data
						
					}
				});
			},
			updateRouter() {
				var _this = this

				let openid = this.$route.query.openId
				let accessCode = this.$route.query.accessCode
				let uid = this.$route.query.userId
				let acscode = this.$route.query.randomAccessCode
				let token = this.$route.query.token

				if(openid) {
					this.$store.commit('getOpenId', openid)
				
					sessionStorage.setItem('_openid_', openid)
					sessionStorage.setItem('_accessCode_', accessCode)

					if(uid && acscode && token) {
						let hash = {
							id: uid,
							randomAccessCode: acscode,
							token: token
						}

						localStorage.setItem('_HASH_', base64_encode(hash))

						_this.$store.state.page.isLogin = 'true'

						localStorage.setItem('isLogin', true)

						//获取用户信息
						_this.$http.get(_this.url.user.getBasicInfo, {
							params: {
								userId: uid
							}
						}).then((res) => {
							if(res.data.status == "00000000") {
								_this.$store.commit('UPDATE_USER_INFO', res.data.data)
								localStorage.setItem('userInfo', JSON.stringify(res.data.data))
								_this.$router.push({
									path: localStorage['beforeLoginUrl']
								})
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
						var url = localStorage['beforeLoginUrl'].split('?')[0]
						//						if(url == '/share/instrumentCode' || url == '/multi_user_mall') {
						//							_this.$router.push({
						//								path: localStorage['beforeLoginUrl']
						//							})
						//						} else {
						//							_this.$router.push({
						//								path: '/index'
						//							})
						//						}
						_this.$router.push({
							path: localStorage['beforeLoginUrl']
						})
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
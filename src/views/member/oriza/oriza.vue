<template>
	<div class="aa"></div>
</template>

<script>
	import url from '../../../config/url.js'
	import { base64_encode, base64_decode } from '../../../global/course.js'
	export default {
		data() {
			return {

			}
		},
		created() {
			this.updateRouter();

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
				// let params = this.$route.query

				let uid = this.$route.query.userId
				let acscode = this.$route.query.randomAccessCode
				let token = this.$route.query.token

				if(openid) {
					this.$store.commit('getOpenId', openid)
					// localStorage.setItem('_openid_',openid)
					sessionStorage.setItem('_openid_', openid)
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
									// path: localStorage['beforeLoginUrl']
									path: '/index'
								})
							}
						})

					} else {
						_this.$router.push({
							// path: localStorage['beforeLoginUrl']
							path: '/index'
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
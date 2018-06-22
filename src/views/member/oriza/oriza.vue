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
		grant(){

			let _this = this;
			// 跳转到微信授权页面
			_this.$http.get(_this.url.origin.getAuthorizationUrl, {
				params: {
					platformId: '2018050800000002',//2018050800000002
					type: 1
				}
			}).then((res) => {
				if(res.data.status == '00000000') {
					let data = res.data
					// console.log(res.data)
					window.location.href = data.data
				}
			});
		},
		updateRouter(){
			var _this = this
			let openid = this.$route.query.openId
			let params = this.$route.query

			let uid = this.$route.query.userId
			let acscode = this.$route.query.randomAccessCode
			let token = this.$route.query.token

			if(openid){
				this.$store.commit('getOpenId',openid);
				this.$router.push({path:localStorage['beforeLoginUrl']});
				
				let t = uid && acscode && token
			
				if(uid && acscode && token){
					let hash = {
						id : uid,
						randomAccessCode : acscode,
						token : token
					}
					localStorage.setItem('_HASH_', base64_encode(hash))
					this.$store.state.page.isLogin = 'true'
					localStorage.setItem('isLogin', true)
					this.$store.state.user.userId = uid
					this.$store.commit('setUid',uid)
					
					//获取用户信息
						_this.$http.get(_this.url.user.getBasicInfo, {
							params: {
								userId: uid
							}
						}).then((res) => {
							if(res.data.status == "00000000") {
								_this.$store.commit('UPDATE_USER_INFO', res.data.data)
								localStorage.setItem('userInfo', JSON.stringify(res.data.data))
							}
						})

				}
				
			}else{
				this.grant()
			}
		}
			
		
	},
	components: {
		
	},
	watch:{
		'$route': function (val) {
			this.updateRouter();
			console.log(val)
		}
	}
		
}
</script>

<style lang="less" scoped>

</style>
<template>
	<div class="aa"></div>
</template>

<script>
	
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
					platformId: '2018052100000001',
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
			let openid = this.$route.query.openId
			if(openid){
				this.$store.commit('getOpenId',openid);

				this.$router.push({path:localStorage['beforeLoginUrl']});
				
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
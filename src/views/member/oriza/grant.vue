<template>
	<!-- <div class="aa">微信授权</div> -->
	<div>grant</div>
</template>

<script>
	
export default {
	name:"grant",
	data() {
		return {
			
					
		}
	},
	created() {
		this.grant()
	},
	methods: {
		grant(){
			判断是否是微信浏览器
			let ua = window.navigator.userAgent.toLowerCase()
			if(ua.match(/MicroMessenger/i) == 'micromessenger') {
				// 跳转到微信授权页面
				if(!store.state.user.openid) {
					axios.get(url.origin.getAuthorizationUrl, {
						params: {
							platformId: '2018052100000001',
							type: 1
						}
					}).then((res) => {
						if(res.data.status == '00000000') {
							let data = res.data
							window.location.href = data.data
							// axios.get(res.)
							// console.log(res)
							// axios.get(data.data).then((res)=>{
								
							// });
						}
					});
				}
			} else {
				console.log("不是微信")
			}
		}
			
		
	},
	components: {
		
	}
		
}
</script>

<style lang="less" scoped>

</style>
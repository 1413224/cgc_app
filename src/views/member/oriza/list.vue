<template>
	<div class="auth_list">
		<group gutter="0" title="授权管理" title-color="#90A2C7">
			<x-switch class="list-item" title="CGC登录授权" v-model="otherAuth" @on-change="otherChange()"></x-switch>
		</group>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				otherAuth: false
			}
		},
		created() {

		},
		methods: {
			otherChange() {
				let _this = this
				if(_this.otherAuth) {
					_this.$http.post(_this.url.origin.checkUserAccreditBz, {
						'userId': _this.$store.state.user.userId,
						'bz': 'cgcUserThirdAuthCode'
					}).then((res) => {
						if(res.data.status == '00000000') {
							if(res.data.data) {
								_this.$router.push({
									path: '/authCode',
									query: {
										'userId': _this.$store.state.user.userId
									}
								})
							} else {
								_this.$router.push({
									path: '/otherAuthLogin'
								})
							}
						}
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.auth_list {
		background-color: #F5F6FA;
		padding-top: 0.1em;
		.list {
			.list-item {
				font-family: PingFangSC-Regular;
				font-size: 0.28rem;
				color: #1A2642;
				letter-spacing: 0;
				height: 1.02rem;
				padding: 0 0.33rem 0 0.49rem;
			}
		}
	}
</style>
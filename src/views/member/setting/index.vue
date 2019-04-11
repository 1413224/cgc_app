<template>
	<div class="content">
		<settingHeader :title="title"></settingHeader>
		<div class="list">
			<group gutter="0">
				<cell class="list-item" title="个人信息" is-link link="/member/info/index"></cell>
				<cell class="list-item" title="消息设置" is-link link="/member/message/setting"></cell>
				<cell class="list-item" title="密码管理" is-link link="/user/changelist" v-if="$store.state.page.isLogin == 'true'"></cell>
				<cell class="list-item" title="意见反馈" is-link link="/member/setting/opinion"></cell>
				<cell class="list-item" title="关于我们" is-link link="/member/setting/about"></cell>
			</group>
			<div v-if="$store.state.page.isLogin == 'true'" class="logout-btn" @click="logout">退出登录</div>
		</div>
	</div>
</template>

<script>
	import settingHeader from '../../../components/setting_header'
	export default {
		data() {
			return {
				title: '账户设置'
			}
		},
		created() {

		},
		mounted() {

		},
		methods: {
			logout() {
				var _this = this;
				_this.$dialog.show({
					type: 'warning',
					headMessage: '提示',
					message: '确定退出登录吗?',
					canel() {

					},
					confirm() {

						var params = {
							audience: _this.url.client,
							userId: _this.$store.state.user.userId,
							platformId: _this.url.platformId
						}

						var unionid = localStorage['_openid_']

						if(unionid) {
							params.unionid = unionid
							params.type = 1
						}

						_this.$http.post(_this.url.user.logout, params).then((res) => {
							if(res.data.status == '00000000') {
								_this.$vux.toast.show({
									width: '50%',
									type: 'text',
									position: 'middle',
									text: '退出成功'
								})
								_this.$router.replace({
									path: '/user/login'
								})
								localStorage.removeItem('userInfo')
								localStorage.setItem('isLogin', false)
								_this.$store.state.page.isLogin = false
								localStorage.removeItem('_HASH_')
							}
						})
					}
				})
			}
		},
		components: {
			settingHeader
		}
	}
</script>

<style lang="less" scoped>
	.list {
		.list-item {
			font-family: PingFangSC-Regular;
			font-size: 0.28rem;
			color: #1A2642;
			letter-spacing: 0;
			height: 1.02rem;
			padding-top: 0!important;
			padding-bottom: 0!important;
		}
		.logout-btn {
			width: 100%;
			margin: 0.21rem 0;
			text-align: center;
			background-color: #fff;
			height: 1.02rem;
			line-height: 1.02rem;
		}
	}
</style>
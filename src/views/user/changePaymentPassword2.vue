<template>
	<div>
		<settingHeader :title="title"></settingHeader>
		<div class="content">
			<group gutter="0" class="input-div">
				<x-input class="input-item" ref="password" v-model="password" placeholder="请输入6位数的新密码" type="password" :max="6" @on-change="newpasswordChange"></x-input>
				<x-input class="input-item" ref="password1" v-model="password1" placeholder="请再次输入新密码" type="password" :max="6" @on-change="newpasswordChange1"></x-input>
			</group>
			<div class="tip">
				<x-button class="add-btn" @click.native="submit" :show-loading="showLoading">提交</x-button>
			</div>
		</div>
	</div>
</template>

<script>
	import settingHeader from '../../components/setting_header'
	export default {
		data() {
			return {
				title: '设置支付密码', //头部标题
				password: '',
				password1: '',
				showLoading: false
			}
		},
		created() {

		},
		methods: {
			submit() {
				var _this = this
				if(_this.password.length != 6 || _this.password1.length != 6) {
					_this.$vux.toast.show({
						width: '50%',
						type: 'text',
						position: 'middle',
						text: '请输入6位数字密码'
					})
					return false
				}

				if(_this.password != _this.password1) {
					_this.$vux.toast.show({
						width: '50%',
						type: 'text',
						position: 'middle',
						text: '两次密码输入不一致'
					})
					return false
				}

				if(_this.$route.query.code) {
					if(_this.$route.query.hasP) {
						var uri = _this.url.user.setPayPasswordByMobile //根据验证码修改
						var data = {
							userId: _this.$store.state.user.userId,
							payPassword: _this.MD5(_this.password),
							smsVerificationCode: _this.$route.query.code,
							platformId: _this.url.platformId
						}
					} else {
						var uri = _this.url.user.setPayPassword //根据验证码修改
						var data = {
							userId: _this.$store.state.user.userId,
							payPassword: _this.MD5(_this.password),
							code: _this.$route.query.code,
							platformId: _this.url.platformId
						}
					}

				} else if(_this.$route.query.oldPayPassword) {
					var uri = _this.url.user.setPayPasswordByOld //根据旧密码修改
					var data = {
						userId: _this.$store.state.user.userId,
						payPassword: _this.MD5(_this.password),
						oldPayPassword: _this.$route.query.oldPayPassword,
						platformId: _this.url.platformId
					}
				}

				_this.$http.post(uri, data).then((res) => {
					if(res.data.status == "00000000") {
						_this.$vux.toast.show({
							width: '50%',
							type: 'text',
							position: 'middle',
							text: '密码保存成功'
						})
					}
					_this.$router.replace({
						path: '/member/index'
					})
				})
			},
			newpasswordChange(val) {
				if(val.length == 6) {
					if(/^[0-9]+$/.test(val)) {
						this.$refs.oldpassword.blur()

						this.$refs.password1.focus()
					} else {
						this.$vux.toast.show({
							width: '60%',
							type: 'text',
							position: 'middle',
							text: '请输入6位纯数字的支付密码'
						})
					}
					this.$refs.oldpassword.blur()
				}
			},
			newpasswordChange1(val) {
				if(val.length == 6) {
					if(/^[0-9]+$/.test(val)) {
						this.$refs.oldpassword.blur()

						this.$refs.password1.focus()
					} else {
						this.$vux.toast.show({
							width: '60%',
							type: 'text',
							position: 'middle',
							text: '请输入6位纯数字的支付密码'
						})
					}
					this.$refs.oldpassword.blur()
				}
			},
		},
		components: {
			settingHeader,
		}
	}
</script>

<style lang="less" scoped>
	.login-box {
		width: 100%;
		height: 3.5rem;
		position: relative;
		img {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 2rem;
			height: auto;
		}
	}
	
	.input-item {
		height: 1.02rem;
		font-family: PingFangSC-Regular;
		font-size: 0.28rem;
		letter-spacing: 0;
		padding-top: 0;
		padding-bottom: 0;
		box-sizing: border-box;
	}
	
	.tip {
		padding: 10px 15px;
		ont-family: PingFangSC-Regular;
		font-size: 0.28rem;
		color: #90A2C7;
		letter-spacing: 0;
		text-align: center;
	}
	
	.add-btn {
		height: 0.88rem;
		margin-top: 0.55rem;
		ont-family: PingFangSC-Regular;
		font-size: 0.28rem;
		color: #FFFFFF!important;
		letter-spacing: 0;
		background-color: #336FFF!important;
	}
	
	.login-re {
		padding: 10px 15px;
		display: flex;
		justify-content: space-between;
		span {
			color: #10aeff;
		}
	}
</style>
<template>
	<div class="cgc_auth">
		<div class="emp_box">
			<img :src="'./static/images/cgc.png'" />
			<p>用户授权登录</p>
		</div>
		<p class="tip">确认登录应用将获得以下权限</p>
		<ul>
			<li v-for="(item,index) in list" :key="index">
				<p>{{item}}</p>
			</li>
		</ul>
		<div class="submit_btn" @click="submit()">确认登录</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				list: ['获得你的公开信息（昵称、头像、地区及性别）', '获得你的财产信息', '获得你的支付授权']
			}
		},
		created() { 
		},
		methods: {
			submit() {
				var _this = this
				_this.$http.post(_this.url.origin.addOrUpdateUserWithCgcAuthInfo, {
					'userId': _this.$store.state.user.userId,
					'bz': 'cgcUserThirdAuthCode',
					'status': 1
				}).then((res) => {
					if(res.data.status == "00000000") {
						if(res.data.message == 'success') {
							_this.$router.push({
								path: '/authCode',
								query: {
									'userId': _this.$store.state.user.userId
								}
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.cgc_auth {
		background-color: #F5F8F9;
		.emp_box {
			height: 3.15rem;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			background-color: white;
			img {
				width: 1.50rem;
				height: 1.50rem;
				background: rgba(216, 223, 240, 1);
				border-radius: 10px;
				display: block;
			}
			p {
				font-size: 0.28rem;
				font-family: PingFangSC-Regular;
				color: rgba(26, 38, 66, 1);
				margin-top: 0.25rem;
			}
		}
		.tip {
			font-size: 0.24rem;
			font-family: PingFangSC-Regular;
			color: rgba(26, 38, 66, 1);
			padding: 0.20rem;
		}
		ul {
			background-color: white;
			li {
				padding: 0.30rem;
				display: flex;
				align-items: center;
				font-size: 0.28rem;
				font-family: PingFangSC-Regular;
				color: rgba(26, 38, 66, 1);
				position: relative;
				p {
					margin-left: 0.15rem;
				}
				img {
					width: 0.36rem;
					height: 0.36rem;
				}
			}
			li:not(:last-child):after {
				content: " ";
				position: absolute;
				left: 0;
				bottom: 0;
				right: 0;
				height: 1px;
				border-top: 1px solid #D9D9D9;
				color: #D9D9D9;
				-webkit-transform-origin: 0 0;
				transform-origin: 0 0;
				-webkit-transform: scaleY(0.2);
				transform: scaleY(0.2);
				left: 0;
			}
		}
		.submit_btn {
			width: 6.18rem;
			height: 0.88rem;
			line-height: 0.88rem;
			text-align: center;
			background: rgba(51, 111, 255, 1);
			border-radius: 4px;
			font-size: 0.28rem;
			font-family: PingFangSC-Regular;
			color: rgba(255, 255, 255, 1);
			position: fixed;
			bottom: 10%;
			left: 50%;
			transform: translate(-50%, -10%);
		}
	}
</style>
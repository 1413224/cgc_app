<template>
	<div class="wrap">
		<settingHeader :title="title"></settingHeader>
		<div class="content">
			<div class="tit">{{data.title}}</div>
			<p class="author">{{data.author}} <span>{{data.createTime | getDate}}</span></p>
			<div class="card" v-if="data.userId && (data.userId != $store.state.user.userId)">
				<img v-if="data.avatar" :src="data.avatar.original" />
				<img v-else :src="'./static/images/wz_tx.png'" />
				<div class="tip_box">
					<p>{{data.nickname}}</p>
					<p>创造价值，增信赋能</p>
				</div>
				<div class="btn" @click="$router.push({path:'/index'})">
					立即查看<i class="icon iconfont icon-arrow-right"></i>
				</div>
			</div>
			<div class="cont" v-html="data.content"></div>
			<div class="yuedu">阅读：{{data.pv}}</div>
		</div>
	</div>
</template>
<script>
	import settingHeader from '@/components/setting_header'

	export default {
		data() {
			return {
				title: '文章详情',
				data: ''
			}
		},
		components: {
			settingHeader,

		},
		created() {
			var _this = this
		},
		mounted() {
			this.onLoadData()
		},
		methods: {
			onLoadData() {
				var _this = this
				_this.$http.get(_this.url.user.getDetails, {
					params: {
						type: 2,
						articleId: _this.$route.query.id,
						userId: this.mainApp.getCs('userId')
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.data = res.data.data

						_this.$router.replace({
							query: _this.merge(_this.$route.query, {
								'userId': _this.$store.state.user.userId
							})
						})

						if(res.data.data.userId) {
							sessionStorage.setItem('parentUserId', res.data.data.userId)
						}
					}
				})
			}
		}
	}
</script>

<style lang='less' scoped>
	iframe{
		width: 100% !important;
	}
	.content {
		padding: 0.15rem 0.30rem;
		box-sizing: border-box;
		background: #fff;
		.tit {
			font-size: 0.48rem;
			font-family: MicrosoftYaHei;
			font-weight: 400;
			color: rgba(26, 38, 66, 1);
		}
		.author {
			font-size: .28rem;
			color: #7386AD;
			margin-top: .3rem;
			margin-bottom: .3rem;
			span {
				display: inline-block;
				margin-left: .1rem;
			}
		}
		.card {
			height: 1.64rem;
			background: url(../../../../static/images/wz_bg.png) no-repeat;
			background-size: 100% 100%;
			margin: 0.30rem 0;
			display: flex;
			align-items: center;
			padding-left: 0.30rem;
			position: relative;
			.btn {
				position: absolute;
				top: 50%;
				right: 0%;
				transform: translate(-0%, -50%);
				width: 1.5rem;
				height: 0.52rem;
				background: linear-gradient(90deg, rgba(53, 120, 255, 1), rgba(26, 48, 255, 1));
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 0.18rem;
				font-family: PingFang-SC-Medium;
				color: rgba(255, 255, 255, 1);
				border-radius: 20px 0 0 20px;
				i {
					font-size: 0.35rem;
				}
			}
			img {
				width: 1.23rem;
				height: 1.23rem;
				margin-right: 0.40rem;
			}
			.tip_box {
				display: flex;
				flex-direction: column;
				p:nth-child(1) {
					font-size: 0.36rem;
					font-family: PingFang-SC-Bold;
					font-weight: bold;
					color: rgba(255, 255, 255, 1);
					margin-bottom: 0.18rem;
				}
				P:nth-child(2) {
					font-size: 0.24rem;
					font-family: PingFang-SC-Medium;
					color: rgba(255, 255, 255, 1);
				}
			}
		}
		.cont {
			/*text-indent: .6rem;
			margin: .1rem 0;*/
		}
		.yuedu {
			font-size: .28rem;
			color: #7386AD;
		}
	}
</style>
<template>
	<div class="wrap">
		<settingHeader :title="title"></settingHeader>
		<div class="content">
			<div class="tit">{{data.title}}</div>
			<p class="author">{{data.author}} <span>{{data.createTime | getDate}}</span></p>
			<div class="card" v-if="$store.state.user.userId != pId && pId != 'null'">
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
				data: '',
				pId:''
			}
		},
		components: {
			settingHeader,

		},
		created() {
			var _this = this
			this.pId = sessionStorage['parentUserId']
			this.onLoadData()
			// this.fx()
		},
		methods: {
			onLoadData() {
				var _this = this
				_this.$http.get(_this.url.user.getDetails, {
					params: {
						type: 2,
						articleId: _this.$route.query.id,
						userId: this.pId
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.data = res.data.data
						console.log(res.data.data)
						_this.fx()
					}
				})
			},
			fx() {
				var _this = this,
					appId = '',
					uri = window.location.href.split('#')[0], //截取#前面的路径
					params = {
						url: uri
					};
				if(location.host == _this.url.health) {
					params.mchId = _this.url.mchIdHealth
					appId = _this.url.appIdHealth
				} else if(location.host == _this.url.cgc) {
					params.mchId =_this.url.mchIdCgc
					appId = _this.url.appIdCgc
				} else if(location.host == _this.url.test) {
					params.mchId = _this.url.mchIdTest
					appId = _this.url.appIdTest
				}
				_this.$http.post(_this.url.zf.wxScan, params).then((res) => {

					wx.config({
						debug: false,
						appId: appId,
						timestamp: res.data.data.timestamp,
						nonceStr: res.data.data.nonceStr,
						signature: res.data.data.signature,
						jsApiList: ['checkJsApi', 'scanQRCode', 'onMenuShareTimeline', 'onMenuShareAppMessage']
					})

					wx.ready(function() {
						//分享给好友
						wx.onMenuShareAppMessage({
							title: _this.data.title, // 分享标题
							desc: _this.data.digest, // 分享描述
							link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
							imgUrl: _this.data.thumb && _this.data.thumb[0] && _this.data.thumb[0].original ? _this.data.thumb[0].original : 'http://domain.cgc999.com:8080/group1/M00/00/6D/rBL0CVv7wamAIl75AAAsglR_VP0222.png', // 自定义图标
							type: 'link', // 分享类型,music、video或link，不填默认为link
							dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
							success: function() {
								// 用户确认分享后执行的回调函数
								//alert('分享给朋友成功')
							},
							cancel: function() {
								// 用户取消分享后执行的回调函数
								//alert('取消分享')
							}
						});
						//分享给朋友圈
						wx.onMenuShareTimeline({
							title: _this.data.title, // 分享标题
							desc: _this.data.digest, // 分享描述
							link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
							imgUrl: _this.data.thumb && _this.data.thumb[0] && _this.data.thumb[0].original ? _this.data.thumb[0].original : 'http://domain.cgc999.com:8080/group1/M00/00/6D/rBL0CVv7wamAIl75AAAsglR_VP0222.png', // 自定义图标
							type: 'link', // 分享类型,music、video或link，不填默认为link
							dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
							success: function() {
								// 用户确认分享后执行的回调函数
								//alert('分享给朋友成功')
							},
							cancel: function() {
								// 用户取消分享后执行的回调函数
								//alert('取消分享')
							}
						});
					})
				})
			},
		}
	}
</script>

<style lang='less' scoped>
	.cont /deep/ iframe {
		width: 100% !important;
	}
	
	.content {
		padding: 0.15rem 0.30rem;
		box-sizing: border-box;
		background: #fff;
		width: 100%;
		overflow: hidden;
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
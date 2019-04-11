<template>
	<section class="lottery-manage-list">
		<div class="wrapper" ref="wrapper">
			<div class="content">
				<ul>
					<li v-for="(item,index) in lotteryList" :key="index">
						<div class="top">
							<img v-if="item.thumb" :src="item.thumb.original" />
							<img v-else :src="'./static/draw/video_bg.png'" />
							<div>
								<p>{{item.lotteryTitle}}</p>
								<p>参与人数：{{item.userNum}}</p>
								<p>奖金池：{{item.bonus}}</p>
							</div>
						</div>
						<div class="bottom">
							<div @click="changeLotteryPassword(item.lotteryId)">设置密码</div>
							<div @click="getLotteryUrlById(item.pwdStatus,item.url,item.lotteryId)">复制链接</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<!--遮罩层-->
		<transition name="buy-goods-transition" enter-active-class="fadeIn animated" leave-active-class="fadeOut animated">
			<div class="mask" v-if="show5" @click="show5 = false"></div>
		</transition>
		<transition name="custom-classes-transition" enter-active-class="zoomIn animated" leave-active-class="zoomOut animated">
			<section class="alert_box" v-if="show5" style="animation-duration: 0.5s;">
				<div class="pr_box">
					<div class="middle_box">
						<div class="two-box">
							<p class="tip">设置密码</p>
							<div class="msg_box">
								<input ref="input1" @blur="toScroll" v-model="msg" type="number" placeholder="请输入6~18位数字密码" />
							</div>
							<div class="btn-box">
								<div class="cancel-btn" @click="show5 = false">取消</div>
								<div class="confirm-btn" @click="onConfirm()">确定</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</transition>
	</section>
</template>

<script>
	import BScroll from 'better-scroll'
	export default {
		components: {
			BScroll
		},
		data() {
			return {
				show5: false,
				msg: '',
				lotteryList: [],
				status: -1,
				curPage: 1,
				pageSize: 20,
			}
		},
		watch: {
			show5() {
				this.msg = ''
			}
		},
		mounted() {
			var _this = this
			_this.getLotteryList()
			setTimeout(() => {
				_this.InitScroll()
			}, 100)
		},
		methods: {
			getLotteryList() {
				var _this = this
				_this.$http.get(_this.url.lottery.getLotteryList, {
					params: {
						status: _this.status,
						curPage: _this.curPage,
						pageSize: _this.pageSize,
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.lotteryList = res.data.data.list
					}
				})
			},
			LoadData() {
				var _this = this
				_this.curPage++;
				_this.$http.get(_this.url.lottery.getLotteryList, {
					params: {
						status: _this.status,
						curPage: _this.curPage,
						pageSize: _this.pageSize,
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						if(res.data.data.list.length > 0) {
							_this.lotteryList = _this.lotteryList.concat(res.data.data.list)
						}
					}
				})
			},
			getLotteryUrlById(pwdStatus, url, lotteryId) {
				var _this = this
				if(pwdStatus == 0) {
					_this.changeLotteryPassword(lotteryId)
				} else if(pwdStatus == 1) {
					var input1 = document.createElement('input')
					input1.value = url
					input1.id = 'lotteryUrl'
					input1.style.opacity = 0
					input1.style.position = 'absolute'
					input1.style.width = '50px'
					input1.style.height = '10px'
					input1.readOnly = true
					document.body.appendChild(input1)
					var dom = document.querySelector('#lotteryUrl')
					dom.select()
					document.execCommand("copy")
					console.log(dom.createTextRange)
					if(dom.createTextRange) { //ie
						dom.select()
						document.execCommand("copy")
					} else {
						var stopIndex = input1.value.length
						dom.setSelectionRange(0, stopIndex)
						document.execCommand("copy")
					}

					_this.$vux.toast.show({
						width: '50%',
						type: 'text',
						position: 'top',
						text: '复制成功'
					})

					document.body.removeChild(document.querySelector('#lotteryUrl'))
				} else {
					_this.$vux.toast.show({
						width: '50%',
						type: 'text',
						position: 'top',
						text: '复制失败'
					})
				}
			},
			onConfirm(value) {
				var _this = this
				var reg = /^[0-9]{6,18}$/
				if(!reg.test(_this.msg)) {
					_this.$vux.toast.show({
						width: '50%',
						type: 'text',
						position: 'top',
						text: '请输入6~18位开屏密码'
					})
					return false;
				}

				_this.$http.post(_this.url.lottery.changeLotteryPasswordById, {
					'lotteryId': _this.lotteryId,
					'password': _this.msg
				}).then((res) => {
					_this.show5 = false
					if(res.data.status == "00000000") {
						_this.$vux.toast.show({
							width: '50%',
							type: 'text',
							position: 'top',
							text: '密码设置成功'
						})
						_this.getLotteryList()
					}
				})
			},
			changeLotteryPassword(lotteryId) {
				var _this = this
				_this.show5 = true
				_this.lotteryId = lotteryId
			},
			InitScroll() {
				this.$nextTick(() => {
					if(!this.scroll) {
						this.scroll = new BScroll(this.$refs.wrapper, {
							click: true,
							scrollY: true,
							pullUpLoad: {
								threshold: -30,
							}
						})
						this.scroll.on('pullingUp', (pos) => {
							this.LoadData()
							this.$nextTick(function() {
								this.scroll.finishPullUp()
								this.scroll.refresh()
							})
						})
					} else {
						this.scroll.refresh()
					}
				})

			},
			//滑动  防止组件input失去焦点后无法点击
			toScroll() {
				document.body.scrollTop = document.body.scrollTop - 1
			},
		}
	}
</script>

<style lang="less">
	.vux-toast {
		position: relative;
		z-index: 9999;
	}
	
	.weui-dialog {
		background-color: white!important;
	}
	
	.lottery-manage-list {
		position: fixed;
		top: 44px;
		bottom: 0;
		width: 100%;
		.wrapper {
			width: 100%;
			height: 100%;
			.content {
				padding-bottom: 1.50rem;
			}
			ul {
				li {
					margin: 0.30rem 0.25rem;
					box-sizing: border-box;
					box-shadow: 0px 2px 20px 0px rgba(56, 137, 255, 0.3);
					border-radius: 6px;
					.top {
						display: flex;
						align-items: center;
						padding: 0.20rem;
						box-sizing: border-box;
						img {
							width: 3.0rem;
							height: auto;
							display: block;
							margin-right: 0.20rem;
						}
						div {
							flex: 1;
							font-size: 0.28rem;
							font-family: PingFangSC-Regular;
							p:nth-child(1) {
								font-weight: 500;
								color: rgba(53, 53, 53, 1);
							}
							p:nth-child(2) {
								color: rgba(160, 160, 160, 1);
								margin: 0.15rem 0;
							}
							p:nth-child(3) {
								color: rgba(160, 160, 160, 1);
							}
						}
					}
					.bottom {
						position: relative;
						display: flex;
						align-items: center;
						justify-content: flex-end;
						padding: 0.20rem;
						z-index: 9999;
						div {
							width: 1.40rem;
							height: 0.55rem;
							border-radius: 27px;
							font-size: 0.24rem;
							font-family: PingFangSC-Regular;
							display: flex;
							align-items: center;
							justify-content: center;
						}
						div:nth-child(1) {
							border: 1px solid rgba(160, 160, 160, 1);
							color: rgba(53, 53, 53, 1);
						}
						div:nth-child(2) {
							color: #3889FF;
							border: 1px solid #3889FF;
							margin-left: 0.20rem;
						}
					}
					.bottom:after {
						content: " ";
						position: absolute;
						left: 0;
						top: 0;
						right: 0;
						height: 1px;
						border-top: 1px solid #E1E1E1;
						color: #E1E1E1;
						-webkit-transform-origin: 0 0;
						transform-origin: 0 0;
						-webkit-transform: scaleY(0.5);
						transform: scaleY(0.5);
						left: 0px;
					}
				}
			}
		}
		.mask {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.45);
			animation-duration: 0.3s;
			z-index: 2;
		}
		.alert_box {
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 1115;
			.pr_box {
				width: 100%;
				height: 100%;
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				.middle_box {
					color: white;
					display: flex;
					align-items: center;
					justify-content: center;
					max-width: 70%;
					.one-box {
						word-break: break-all;
						font-size: 0.26rem;
						border-radius: 3px;
						text-align: center;
						padding: 0.15rem 0.20rem;
						background-color: rgba(0, 0, 0, 0.7);
					}
					.two-box {
						border-radius: 12px;
						width: 5.20rem;
						overflow: hidden;
						text-align: center;
						color: #1a2642;
						box-shadow: 0 0 18px #c7c7c7;
						background-color: white;
						border-radius: 7px;
						.tip {
							margin: 0.25rem auto 0.15rem;
							font-size: 0.28rem;
						}
						img {
							width: 1.0rem;
							height: auto;
							display: block;
							margin: 0 auto;
						}
						.msg_box {
							display: flex;
							align-items: center;
							justify-content: center;
							padding: 0.15rem 0.30rem 0.30rem 0.30rem;
							box-sizing: border-box;
							word-break: break-all;
							font-size: 0.30rem;
							input {
								width: 100%;
								border: 1px solid #999999;
								padding: 0.18rem 0.60rem;
								border-radius: 2px;
							}
						}
						.btn-box {
							text-align: center;
							font-size: 0.28rem;
							position: relative;
							display: flex;
							align-items: center;
							justify-content: space-between;
							.cancel-btn {
								height: 0.8rem;
								line-height: 0.8rem;
								flex: 1;
								position: relative;
								color: #999;
							}
							.cancel-btn:after {
								content: " ";
								position: absolute;
								right: 0;
								top: 0;
								height: 100%;
								border-right: 1px solid #c7c7c7;
								-webkit-transform: scaleX(0.5);
								transform: scaleX(0.5);
							}
							.confirm-btn {
								flex: 1;
								height: 0.8rem;
								line-height: 0.8rem;
								color: #256fff;
							}
						}
						.btn-box:before {
							content: " ";
							position: absolute;
							left: 0;
							top: 0;
							right: 0;
							height: 1px;
							border-top: 1px solid #c7c7c7;
							color: #c7c7c7;
							-webkit-transform-origin: 0 0;
							transform-origin: 0 0;
							-webkit-transform: scaleY(0.5);
							transform: scaleY(0.5);
							left: 0px;
						}
					}
				}
				.top {
					position: absolute;
					left: 50%;
					top: 8%;
					transform: translate(-50%, -8%);
				}
			}
		}
	}
</style>
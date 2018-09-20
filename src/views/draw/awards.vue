<template>
	<section class="awards">
		<settingHeader :title="title"></settingHeader>
		<div class="head">
			<span class="receiveText">中奖信息</span>
			<span class="receiveMoney">{{info.title}}</span>
		</div>

		<div class="awards-main">
			<div class="photos" style="text-align:center">
				<div class="awards-title clear">
					<div class="border left"></div>
					<h4 class="left">中奖感言</h4>
				</div>
				<group style="margin-top: 0.3rem;">
					<x-textarea @on-change="ch" :value="info.message" :max="200" :min="20" placeholder="文字不得少于20字" :height="137" :show-counter="false"></x-textarea>
				</group>
			</div>
		</div>
		<!--<div class="radio">
			<check-icon :value.sync="demo1">
				<span class="read">阅读<span class="preposition">《易消费中奖协议》</span>
			</check-icon>

		</div>-->
		<div class="foot">
			<p>点击下方按钮即同意 <span>《易消费中奖协议》</span></p>
			<div class="btn" @click="submit">立即提交</div>
		</div>

		<!-- 弹出框 -->
		<div v-transfer-dom class="speechDialog">
			<x-dialog v-model="showDialog" :hide-on-blur="true">
				<!-- 等待审核 -->
				<div class="dia">
					<img class="img" :src="imgSrc">
					<div class="dia_top">
						<div class="dia_content">
							<p class="title">{{headMessage}}</p>
						</div>
					</div>
					<div class="close" @click="showToast"><img src="../../assets/images/draw/open.png"></div>
				</div>
			</x-dialog>
		</div>
	</section>
</template>

<script>
	import { XInput, XDialog, CheckIcon } from 'vux'
	import settingHeader from '../../components/setting_header'
	import BScroll from 'better-scroll'
	export default {
		components: {
			XInput,
			settingHeader,
			XDialog,
			CheckIcon
		},
		data() {
			return {
				title: '获奖感言',
				demo2: true,
				imgList: [],
				showDialog: false,
				pindex: 0,
				headMessage: '请您耐心等待审核',
				imgSrc: './static/draw/wait.png',
				demo1: false,

				info: {},
				message: '',
				status: 0
			}
		},
		mounted: function() {
			this.getMessage()
		},
		methods: {
			ch(value) {
				this.message = value
			},
			getMessage() {
				var _this = this

				_this.$http.get(_this.url.lottery.getMessage, {
					params: {
						userId: _this.$store.state.user.userId,
						id: _this.$route.query.id
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.info = res.data.data
					}
				})
			},
			submit() {

				var _this = this

				_this.$http.post(_this.url.lottery.writeMessage, {
					userId: _this.$store.state.user.userId,
					id: _this.$route.query.id,
					message: _this.message
				}).then((res) => {
					if(res.data.status == "00000000") {
						//0 已领奖成功，无需重新提交 1提交成功，请等待审核 2提交失败，请重新提交 3已过了领奖期，无法提交中奖感言4已提交过资料，请等待审核 5 中奖感言已审核通过，无需重复提交 6 领奖成功
						_this.showDialog = true
						_this.status = res.data.data.status
						if(res.data.data.status == 0) {
							_this.headMessage = '已领奖成功，无需重新提交'
						} else if(res.data.data.status == 1) {
							_this.headMessage = '提交成功，请等待审核'
						} else if(res.data.data.status == 2) {
							_this.headMessage = '提交失败，请重新提交'
						} else if(res.data.data.status == 3) {
							_this.headMessage = '已过了领奖期，无法提交中奖感言'
						}else if(res.data.data.status == 4) {
							_this.headMessage = '已提交过资料，请等待审核'
						}else if(res.data.data.status == 5) {
							_this.headMessage = '中奖感言已审核通过，无需重复提交 '
						}else if(res.data.data.status == 6) {
							_this.headMessage = '领取成功'
						}
					}
				})
			},

			test: function(e) {
				var _this = this
				var file = e.target.files;
				for(var i = 0; i < file.length; i++) {
					var reader = new FileReader();
					reader.readAsDataURL(file[i]); // 读出 base64
					reader.onloadend = function(e) {
						// 图片的 base64 格式, 可以直接当成 img 的 src 属性值        
						var dataURL = reader.result;
						if(_this.imgList.length < 5) {
							_this.imgList.push(e.target.result)
						}
					};
				}
			},
			imgDelete(index) {
				this.imgList.splice(index, 1);
			},
			showToast() {
				var _this = this

				if(_this.status != 2) {

					_this.$router.push({
						path: '/draw/winning'
					})
				}

				this.showDialog = false
			},
			cone(e, i) {
				var _this = this
				var reader = new FileReader();
				var file = e.target.files[0];
				reader.readAsDataURL(file);
				reader.onloadend = function(e) {
					var dataURL = reader.result;
					_this.imgList.splice(_this.pindex, 1, e.target.result)
				};
			},
			cindex(index) {
				this.pindex = index
			}
		}
	}
</script>

<style lang="less" scoped>
	.wrapper {
		height: 100%;
		overflow: hidden;
		.content {
			padding-bottom: 0.78rem;
		}
	}
	
	.left {
		float: left;
	}
	
	.head {
		height: 1rem;
		padding: 0 0.3rem;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.receiveText {
			font-size: 0.3rem;
			font-family: PingFang-SC-Medium;
			color: rgba(51, 51, 51, 1);
		}
		.receiveMoney {
			flex: 1;
			font-size: 0.3rem;
			font-family: PingFang-SC-Medium;
			color: rgba(160, 160, 160, 1);
			text-align: right;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			margin-left: 0.15rem;
		}
	}
	
	.awards-main {
		margin-top: 0.3rem;
		padding-bottom: 2rem;
		.photos {
			color: #1A2642;
			background-color: #fff;
			padding: 0.40rem 0.24rem;
			box-sizing: border-box;
			.awards-title {
				padding-bottom: 0.23rem;
				border-bottom: 1px solid #F3F3F3;
				.border {
					width: 0.06rem;
					height: 0.3rem;
					background-color: #E32921;
					border-radius: 0.03rem;
					margin-right: 0.16rem;
				}
				h4 {
					font-size: 0.3rem;
					line-height: 0.3rem;
				}
			}
			.list {
				.list-item {
					font-family: PingFangSC-Regular;
					font-size: 0.28rem;
					color: #1A2642;
					letter-spacing: 0;
					height: 1.07rem;
					padding-top: 0!important;
					padding-bottom: 0!important;
					.weui-cell__ft {
						color: rgba(26, 38, 66, 1);
					}
				}
			}
			.life-box {
				display: flex;
				flex-wrap: wrap;
				padding-top: 0.3rem;
				box-sizing: border-box;
				.tc {
					width: 33.333333333333336%;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
			.life {
				background: #fff;
				width: 2.1rem;
				height: 2.1rem;
				text-align: center;
				position: relative;
				border-radius: 0.06rem;
				border: 1px solid #E1E1E1;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				margin-bottom: 0.22rem;
				.add {
					width: 20%;
					margin: 0.4rem auto;
				}
				.gbx {
					position: absolute;
					right: -0.1rem;
					top: -0.12rem;
					width: 0.38rem;
					height: 0.38rem;
					z-index: 222;
				}
				.length {
					font-size: .24rem;
					color: #bcbbc0;
					margin-top: -0.22rem;
				}
				.bigPic {
					position: absolute;
					width: 100%;
					height: 100%;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					overflow: hidden;
					border-radius: 0.06rem;
					img {
						width: 100%;
						height: auto;
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-50%, -50%);
					}
				}
				.icon {
					font-size: 0.73rem;
					color: #90A2C7;
					line-height: 1.3rem;
				}
				input {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					opacity: 0;
					z-index: 111;
				}
			}
			.clear {
				clear: both;
			}
		}
	}
	
	.radio {
		text-align: center;
		margin-top: 0.5rem;
		padding-bottom: 0.35rem;
		font-size: 0.26rem;
		input {
			vertical-align: middle;
		}
		.preposition {
			color: #004FE1;
		}
	}
	
	.foot {
		padding-top: 0.2rem;
		background-color: white;
		position: fixed;
		bottom: 0;
		width: 100%;
		.btn {
			width: 100%;
			height: 0.9rem;
			background-color: #E32921;
			font-size: 0.36rem;
			font-family: PingFang-SC-Medium;
			color: rgba(244, 244, 244, 1);
			text-align: center;
			line-height: 0.9rem;
		}
		p {
			font-size: 0.26rem;
			font-family: PingFang-SC-Medium;
			color: rgba(51, 51, 51, 1);
			text-align: center;
			margin-bottom: 0.35rem;
			span {
				color: #004FE1;
			}
		}
	}
	
	.speechDialog {
		.dia {
			width: 100%;
			color: #1A2642;
			position: relative;
			height: auto;
			.img {
				width: 25%;
				position: absolute;
				top: 0;
				left: 50%;
				transform: translate(-50%, -50%);
			}
			.dia_top {
				width: 100%;
				margin: 0 auto;
				height: auto;
				min-height: 2rem;
				background-color: #FF273A;
				text-align: center;
				padding-top: 1.09rem;
				margin-top: 1.09rem;
				border-radius: 0.16rem;
				.dia_content {
					background: #fff;
					height: auto;
					min-height: 2rem;
					padding-bottom: 0.55rem;
					border-radius: 0 0 0.16rem 0.16rem;
				}
				.title {
					font-size: 0.36rem;
					line-height: 0.59rem;
					margin-bottom: 0.12rem;
					color: #333333;
					padding-top: 0.6rem;
				}
				.note {
					color: #666666;
					padding: 0 0.5rem;
					box-sizing: border-box;
					font-size: 0.24rem;
				}
				.btnList {
					margin: 0 auto;
					width: 85.4%;
					background: #FF273A;
					color: #fff;
					font-size: 0.36rem;
					border-radius: 0.5rem;
					text-align: center;
					box-shadow: 0.04rem 0px 0.08rem rgba(136, 46, 219, 0.3);
					padding: 0.32rem 0;
					margin-top: 0.8rem;
				}
			}
			.close {
				width: 100%;
				background: rgba(255, 255, 255, 0);
				height: 1.25rem;
				img {
					height: 100%;
					margin: 0 auto;
				}
			}
		}
	}
</style>

<style lang="less">
	.awards-input {
		.vux-no-group-title {
			margin-top: 0;
		}
		.weui-cells {
			margin-top: 0;
		}
		.weui-cell:before {
			border-top: none;
		}
		.weui-cell {
			/*border-bottom: 0.01rem solid #F5F5F5;*/
		}
		.weui-label {
			width: 1.4rem;
			font-size: 0.3rem;
		}
		.weui-input::-webkit-input-placeholder {
			color: #d9d9d9; // WebKit browsers 
			font-size: 0.32rem;
		}
		.weui-input:-moz-placeholder {
			color: #d9d9d9; // Mozilla Firefox 4 to 18 
			font-size: 0.32rem;
		}
		.weui-input::-moz-placeholder {
			color: #d9d9d9; //Mozilla Firefox 19+ /
			font-size: 0.32rem;
		}
		.weui-input:-ms-input-placeholder {
			color: #d9d9d9; //Internet Explorer 10+ */
			font-size: 0.32rem;
		}
	}
	
	.photos {
		.weui-cells {
			margin-top: 0;
		}
		.weui-textarea {
			color: #1A2642;
			font-size: 0.28rem;
			background: rgba(245, 245, 245, 1);
		}
		.vux-x-textarea.weui-cell {
			border-radius: 0.06rem;
			background: rgba(245, 245, 245, 1);
		}
	}
	
	.speechDialog {
		.weui-dialog {
			width: 78.67%;
			max-width: 78.67%;
			z-index: 9999;
			border-radius: 0.16rem;
		}
	}
	
	.radio {
		.weui-icon-circle {
			font-size: 0.4rem;
		}
		.vux-check-icon>span {
			font-size: 0.32rem;
			line-height: 0.4rem;
		}
		.weui-icon-success {
			font-size: 0.4rem;
		}
		.weui-icon-success-circle {
			font-size: 0.4rem;
		}
	}
</style>
<template>
	<section>
		<!-- 弹出框 -->
		<div v-transfer-dom class="vue-dialog">
			<x-dialog v-model="showDialog" :hide-on-blur="closing" @on-hide="hide" @on-show="show">
				<div class="dia">
					<div class="img"><img :src="'./static/images/'+type+'.png'"></div>
					<div class="dia_top">
						<p class="title">{{headMessage}}</p>
						<p class="note">{{message}}</p>
						<div class="btnList" v-if='buttons'>
							<div class="canel" v-if="buttons.length ==2" @click="handleFun">{{buttons[1]}}</div>
							<div class="btn" @click="confirm2">{{buttons[0]}}</div>
						</div>
					</div>
				</div>
			</x-dialog>
		</div>

	</section>
</template>

<!--_this.$dialog.show({ type: '', headMessage: '', message: '', buttons: [''], canel() { }, confirm() { } })-->
<script>
	import { XDialog } from 'vux'
	export default {
		directives: {
			TransferDom: {}
		},
		props: {
			headMessage: String,
			message: String,
			closing: Boolean, //按钮点击是否自动关闭
			clickDelay: Number, //按钮点击延迟多少时间关闭  
			buttons: Array,
			type: String, //type: failure/success/warning  //buttons: 确定、取消、我知道了
			isClick: false
		},
		components: {
			XDialog
		},
		data() {
			return {
				showDialog: false
			}
		},
		methods: {
			handleFun() {
				var _this = this
				if(!_this.isClick) {
					_this.canel()
					_this.isClick = true
				}
				if(!_this.closing) {
					if(_this.clickDelay) {
						setTimeout(function() {
							_this.showDialog = false
						}, _this.clickDelay)
					} else {
						_this.showDialog = false
					}
				} else {
					_this.showDialog = true
				}
			},
			confirm2() {
				var _this = this
				if(!_this.isClick) {
					_this.confirm()
					_this.isClick = true
				}
				if(!_this.closing) {
					if(_this.clickDelay) {
						setTimeout(function() {
							_this.showDialog = false
						}, _this.clickDelay)
					} else {
						_this.showDialog = false
					}
				} else {
					_this.showDialog = true
				}
			},
			hide() {
				if(this.ishide) {
					this.ishide()
				}
				this.isClick = false
			},
			show() {
				if(this.isshow) {
					this.isshow()
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.dia {
		width: 100%;
		color: #1A2642;
		position: relative;
		height: 5.37rem;
		.img {
			position: absolute;
			top: 1%;
			left: 50%;
			transform: translate(-50%, -50%);
			img {
				width: 50%;
			}
		}
		.dia_top {
			width: 100%;
			height: auto;
			min-height: 3.29rem;
			background-color: #fff;
			text-align: center;
			padding-top: 1.38rem;
			margin-top: 0.71rem;
			border-radius: 0.16rem;
			font-size: 0.28rem;
			.title {
				font-size: 0.42rem;
				line-height: 0.59rem;
				margin-bottom: 0.12rem;
			}
			.note {
				color: #90A2C7;
				padding: 0 0.5rem;
				box-sizing: border-box;
			}
			.btnList {
				margin: 0.9rem auto;
				width: 4.6rem;
				display: flex;
				padding-bottom: 0.3rem;
				.btn {
					flex: 1;
					background-color: #336FFF;
					text-align: center;
					height: 0.78rem;
					line-height: 0.78rem;
					color: #fff;
					border-radius: 0.09rem;
					box-sizing: border-box;
				}
				.canel {
					border: 1px solid #336FFF;
					width: 2.2rem;
					border-radius: 0.09rem;
					text-align: center;
					height: 0.78rem;
					line-height: 0.78rem;
					color: #336FFF;
					margin-right: 0.2rem;
					box-sizing: border-box;
				}
			}
		}
	}
</style>

<style lang="less">
	.vue-dialog {
		.weui-dialog {
			width: 73%;
			max-width: 73%;
			background-color: rgba(255, 255, 255, 0);
			z-index: 9999;
		}
	}
</style>
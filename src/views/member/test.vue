<template>
	<div class="tc-box">
		<group gutter="0">
			<x-switch title="短信验证弹窗" v-model="smsCode"></x-switch>
			<x-switch title="密码验证弹窗" v-model="payPassword"></x-switch>
			<x-switch title="询问弹窗" v-model="tc"></x-switch>
			<x-switch title="点击按钮不会关闭的询问弹窗" v-model="antc"></x-switch>
			<x-switch title="点击按钮延迟关闭的询问弹窗" v-model="yctc"></x-switch>
			<x-switch title="注册奖励弹窗" v-model="zctc"></x-switch>
			<x-switch title="消费奖励弹窗" v-model="sftc"></x-switch>
			<x-switch title="提醒设置支付密码弹窗" v-model="zftc"></x-switch>
			<x-switch title="支付方式弹窗" v-model="payOptions.showPayMode"></x-switch>
		</group>
		<payMode :options="payOptions"></payMode>
	</div>
</template>

<!--$dialog  //type: failure/success/warning  //buttons: 确定、取消、我知道了-->

<script>
	import { XSwitch, Group, Cell } from 'vux'
	import payMode from '@/components/payMode'
	export default {
		data() {
			return {
				smsCode: false,
				payPassword: false,
				tc: false,
				antc: false,
				yctc: false,
				zctc: false,
				zftc:false,
				sftc:false,
				payOptions:{
					showPayMode:false,
					data:{
						money:1000,
					},
					changePay(index){
						console.log(index)
					},
					toPay(index){
						console.log(index)
					},
					hide(){
						console.log('hide')
					},
					show(){
						console.log('show')
					}
				}
			}
		},
		components: {
			XSwitch,
			Group,
			Cell,
			payMode
		},
		watch: {
			smsCode() {
				var _this = this
				if(this.smsCode) {
					this.$code.show({
						type: 'code',
						showCode: true,
						codeChange() {
							console.log('输入了短信验证码')
						},
						ishide() {
							console.log('关闭了短信验证支付窗口')
							_this.smsCode = !_this.smsCode
						},
						isshow() {
							console.log('开启了短信验证窗口')
						}
					})
				}
			},
			payPassword() {
				var _this = this
				if(this.payPassword) {
					this.$code.show({
						type: 'pay',
						showCode: true,
						change() {
							console.log('输入了支付密码')
						},
						ishide() {
							console.log('关闭了支付窗口')
							_this.payPassword = false
						},
						isshow() {
							console.log('开启了支付验证窗口')
						}
					})
				}
			},
			tc() {
				var _this = this
				if(this.tc) {
					_this.$dialog.show({
						type: 'warning',
						headMessage: '提示',
						message: '弹窗悄悄地出现了',
						buttons: ['确定', '取消'],
						canel() {
							console.log('你点击了取消')
						},
						confirm() {
							console.log('你点击了确定')
						},
						ishide() {
							console.log('你关闭了询问弹窗')
							_this.tc = false
						},
						isshow() {
							console.log('你开启了询问弹窗')
						}
					})
				}
			},
			antc() {
				var _this = this
				if(this.antc) {
					_this.$dialog.show({
						type: 'warning',
						headMessage: '提示',
						message: '弹窗悄悄地出现了',
						buttons: ['确定', '取消'],
						closing: true,
						canel() {
							console.log('你点击了取消')
						},
						confirm() {
							console.log('你点击了确定')
						},
						ishide() {
							console.log('你关闭了询问弹窗')
							_this.antc = false
						}
					})
				}
			},
			yctc() {
				var _this = this
				if(this.yctc) {
					_this.$dialog.show({
						type: 'warning',
						headMessage: '提示',
						message: '弹窗悄悄地出现了',
						buttons: ['确定', '取消'],
						clickDelay: 3000,
						canel() {
							console.log('你点击了取消')
						},
						confirm() {
							console.log('你点击了确定')
						},
						ishide() {
							console.log('你关闭了询问弹窗')
							_this.yctc = false
						}
					})
				}
			},
			zctc() {
				var _this = this
				if(this.zctc) {
					_this.$popup.show({
						showZc: true
					})
				}
			},
			zftc() {
				var _this = this
				if(this.zftc) {
					_this.$popup.show({
						showPay: true
					})
				}
			},
			sftc() {
				var _this = this
				if(this.sftc) {
					_this.$popup.show({
						showSr: true
					})
				}
			}
		},
		created() {
			console.log(payMode)
		},
		methods: {}
	}
</script>
<style lang="less" scoped>
	.tc-box {
		background-color: white;
	}
</style>
<template>
	<section class="invoice_edit_box">
		<settingHeader title="编辑发票"></settingHeader>
		<div class="title">发票类型</div>
		<ul class="tab_box">
			<li :class="{'blue':tabIndex == index}" v-for="(item,index) in tabList" :key="index" @click="tabClick(index)">{{item}}</li>
		</ul>
		<div class="title">发票抬头</div>
		<ul class="input_box">
			<li>
				<div class="tip">名称</div>
				<div class="input">
					<input v-model="name" type="text" placeholder="请输入发票抬头" />
				</div>
			</li>
			<li v-if="tabIndex != 0">
				<div class="tip">税号</div>
				<div class="input">
					<input v-model="dutyNumber" type="text" placeholder="请输入纳税人识别号" />
				</div>
			</li>
			<slot v-if="tabIndex == 2">
				<li>
					<div class="tip">企业地址</div>
					<div class="input">
						<input v-model="address" type="text" placeholder="请输入企业注册地址" />
					</div>
				</li>
				<li>
					<div class="tip">电话号码</div>
					<div class="input">
						<input v-model="tel" type="tel" placeholder="请输入企业电话号码" />
					</div>
				</li>
				<li>
					<div class="tip">开户银行</div>
					<div class="input">
						<input v-model="bank" type="text" placeholder="请输入企业开户银行" />
					</div>
				</li>
				<li>
					<div class="tip">银行账号</div>
					<div class="input">
						<input v-model="bankNumber" type="number" placeholder="请输入企业银行账号" />
					</div>
				</li>
			</slot>
		</ul>
		<div class="title">接受方式</div>
		<ul class="input_box">
			<li>
				<div class="tip">电子邮件</div>
				<div class="input">
					<input v-model="email" type="text" placeholder="用于向您发送电子发票和商品明细" />
				</div>
			</li>
		</ul>
		<div class="submit_btn" :class="{'mb3':tabIndex == 2}" @click="submit">确定</div>
	</section>
</template>

<script>
	import settingHeader from '@/components/setting_header'
	import { Tab, TabItem } from 'vux'
	export default {
		components: {
			settingHeader,
			Tab,
			TabItem
		},
		data() {
			return {
				tabList: ['个人电子发票', '企业电子发票', '增值税专用发票'],
				tabIndex: 0,
				name: '',
				dutyNumber: '',
				address: '',
				tel: '',
				bank: '',
				bankNumber: '',
				email: ''
			}
		},
		mounted() {

		},
		methods: {
			//tab切换
			tabClick(index) {
				this.tabIndex = index
			},
			//提交
			submit() {
				console.log(this.name)
			}
		}
	}
</script>

<style lang="less" scoped>
	.invoice_edit_box {
		.title {
			height: 0.68rem;
			line-height: 0.68rem;
			padding-left: 0.30rem;
			box-sizing: border-box;
			background: rgba(245, 248, 249, 1);
			font-size: 0.28rem;
			font-family: PingFang-SC-Medium;
			color: rgba(160, 160, 160, 1);
		}
		.submit_btn {
			width: 6.18rem;
			height: 0.88rem;
			line-height: 0.88rem;
			text-align: center;
			font-size: 0.28rem;
			font-family: PingFang-SC-Medium;
			color: rgba(255, 255, 255, 1);
			background: rgba(51, 111, 255, 1);
			margin: 1.10rem auto 0;
			border-radius: 2px;
		}
		.mb3{
			margin: 0.50rem auto 0;
		}
		.tab_box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 1.20rem;
			padding: 0 0.30rem;
			box-sizing: border-box;
			background-color: white;
			li {
				padding: 0 0.3rem;
				height: 0.6rem;
				line-height: 0.6rem;
				border: 1px solid rgba(225, 225, 225, 1);
				border-radius: 29px;
				font-size: 0.24rem;
				font-family: PingFang-SC-Medium;
				color: rgba(53, 53, 53, 1);
				transition: all 0.3s ease-in-out;
			}
			li:not(:last-child) {
				margin-right: 0.20rem;
			}
			.blue {
				border: 1px solid #336FFF;
				color: #336FFF;
			}
		}
		.input_box {
			background-color: white;
			li {
				height: 0.88rem;
				display: flex;
				align-items: center;
				padding: 0 0.30rem;
				box-sizing: border-box;
				position: relative;
				.tip {
					width: 1.48rem;
					height: 0.88rem;
					line-height: 0.88rem;
					font-size: 0.28rem;
					font-family: PingFang-SC-Medium;
					color: rgba(53, 53, 53, 1);
					margin-right: 0.40rem;
				}
				.input {
					flex: 1;
					height: 0.88rem;
					padding: 0.1rem 0;
					box-sizing: border-box;
					input {
						width: 100%;
						height: 100%;
						font-size: 0.28rem;
						font-family: PingFang-SC-Medium;
						color: rgba(160, 160, 160, 1);
					}
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
				-webkit-transform: scaleY(0.5);
				transform: scaleY(0.5);
				left: 0px;
			}
		}
	}
</style>
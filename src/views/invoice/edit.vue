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
					<input v-model="title" type="text" placeholder="请输入发票抬头" />
				</div>
			</li>
			<li>
				<div class="tip">收票人名称</div>
				<div class="input">
					<input v-model="name" type="text" placeholder="请输入收票人名称" />
				</div>
			</li>
			<li>
				<div class="tip">手机号码</div>
				<div class="input">
					<input v-model="mobile" type="text" placeholder="请输入手机号码" />
				</div>
			</li>
			<li v-if="tabIndex != 0">
				<div class="tip">税号</div>
				<div class="input">
					<input v-model="taxNumber" type="text" placeholder="请输入纳税人识别号" />
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
						<input v-model="bankName" type="text" placeholder="请输入企业开户银行" />
					</div>
				</li>
				<li>
					<div class="tip">银行账号</div>
					<div class="input">
						<input v-model="bankAccount" type="number" placeholder="请输入企业银行账号" />
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
				tabList: ['个人电子发票', '企业电子发票'],
				tabIndex: 0,
				email: '',
				type: 1,
				title: '',
				name: '',
				mobile: '',
				taxNumber: '',
				address: '',
				tel: '',
				bankName: '',
				bankAccount: '',
			}
		},
		created() {
			if(this.$route.query.invoiceTitleId) {
				this.getInvoiceInfoById()
			}
		},
		methods: {
			//获取发票抬头详情
			getInvoiceInfoById() {
				var _this = this
				_this.$http.get(_this.url.user.getInvoiceInfoById, {
					params: {
						userId: _this.$store.state.user.userId,
						invoiceTitleId: _this.$route.query.invoiceTitleId
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.type = res.data.data.type

						if(res.data.data.type == 1) {
							_this.tabIndex = 0
						} else if(res.data.data.type == 2) {
							_this.tabIndex = 1
						} else {
							_this.tabIndex = 2
						}

						_this.title = res.data.data.title
						_this.name = res.data.data.name
						_this.email = res.data.data.email
						_this.mobile = res.data.data.mobile
						_this.taxNumber = res.data.data.taxNumber
						_this.address = res.data.data.address
						_this.tel = res.data.data.tel
						_this.bankName = res.data.data.bankName
						_this.bankAccount = res.data.data.bankAccount
					}
				})
			},
			//tab切换
			tabClick(index) {
				this.tabIndex = index
				if(index == 0) {
					this.type = 1
				} else if(index == 1) {
					this.type = 2
				} else {
					this.type = 3
				}
			},
			//提交
			submit() {
				var _this = this

				if(_this.title == '') {
					_this.$vux.toast.show({
						width: '50%',
						type: 'text',
						position: 'top',
						text: '请输入发票抬头名称'
					})
					return false;
				}

				if(_this.mobile && !_this.mainApp.isphone(_this.mobile)) {
					_this.$vux.toast.show({
						type: 'text',
						width: '50%',
						position: 'top',
						text: '请输入正确的手机号码'
					})
					return false;
				}
				if(_this.email && !_this.mainApp.isemail(_this.email)) {
					_this.$vux.toast.show({
						type: 'text',
						width: '50%',
						position: 'top',
						text: '请输入正确的邮箱地址'
					})
					return false;
				}
				
				if(!_this.mainApp.ischeckTax(_this.taxNumber)) {
					_this.$vux.toast.show({
						type: 'text',
						width: '50%',
						position: 'top',
						text: '请输入请输入纳税人识别号'
					})
					return false;
				}

				if(_this.tabIndex == 2) {
					if(_this.address == '') {
						_this.$vux.toast.show({
							width: '60%',
							type: 'text',
							position: 'top',
							text: '请输入企业注册地址'
						})
						return false;
					}
					if(!_this.mainApp.istel(_this.tel)) {
						_this.$vux.toast.show({
							type: 'text',
							width: '50%',
							position: 'top',
							text: '请输入正确的企业电话号码'
						})
						return false;
					}
					if(_this.bankName == '') {
						_this.$vux.toast.show({
							width: '60%',
							type: 'text',
							position: 'top',
							text: '请输入开户银行'
						})
						return false;
					}
					if(!_this.mainApp.isbankcard(_this.bankAccount)) {
						_this.$vux.toast.show({
							type: 'text',
							width: '50%',
							position: 'top',
							text: '请输入正确的银行账号'
						})
						return false;
					}
				}

				var url = _this.$route.query.invoiceTitleId ? _this.url.user.editInfoById : _this.url.user.addInfo

				var params = {
					userId: _this.$store.state.user.userId,
					type: _this.type,

				}

				if(_this.tabIndex == 0) {
					params.title = _this.title
					params.name = _this.name
					params.email = _this.email
					params.mobile = _this.mobile
				}
				if(_this.tabIndex == 1) {
					params.title = _this.title
					params.name = _this.name
					params.email = _this.email
					params.mobile = _this.mobile
					params.taxNumber = _this.taxNumber
				}
				if(_this.tabIndex == 2) {
					params.title = _this.title
					params.name = _this.name
					params.email = _this.email
					params.mobile = _this.mobile
					params.taxNumber = _this.taxNumber
					params.address = _this.address
					params.tel = _this.tel
					params.bankName = _this.bankName
					params.bankAccount = _this.bankAccount
				}

				if(_this.$route.query.invoiceTitleId) {
					params.userId = _this.$store.state.user.userId
					params.invoiceTitleId = _this.$route.query.invoiceTitleId
				}

				_this.$http.post(url, params).then((res) => {
					if(res.data.status == "00000000") {
						_this.$vux.toast.show({
							width: '50%',
							type: 'text',
							position: 'middle',
							text: _this.$route.query.invoiceTitleId ? '修改成功' : '添加成功'
						})
						_this.$router.go(-1)
					}
				})
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
		.mb3 {
			margin: 0.50rem auto 0;
		}
		.tab_box {
			display: flex;
			align-items: center;
			/*justify-content: space-between;*/
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
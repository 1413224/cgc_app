<template>
	<popup class="payMode-popup" height="100%" v-model="options.showAddressMode">
		<div class="address-box">
			<div style="position: relative;height: 100%;">
				<div class="a_h">
					<p>选择收货地址</p>
					<img @click="options.showAddressMode = false" :src="'./static/images/guanbi.png'" />
				</div>
				<div class="default_address_box">
					<div class="tip">默认收货地址：</div>
					<div class="list">
						<div class="top">
							<div class="pro">
								<div>
									<span>{{defaultAddress.name}}</span>
									<span class="label" v-if="defaultAddress.remark">{{defaultAddress.remark}}</span>
								</div>
								<span>{{defaultAddress.mobile}}</span>
							</div>
							<p>{{defaultAddress.country}}{{defaultAddress.province}}{{defaultAddress.city}}{{defaultAddress.area}} {{defaultAddress.address}}</p>
						</div>
					</div>
				</div>
				<div v-if="list.length>0" style="padding-bottom: 1rem;">
					<div class="tip">请选择其他收货地址：</div>
					<div class="list list2" v-for="(item,index) in list" :key="index" @click="selectAddress(index,item)">
						<div class="top">
							<div class="left">
								<div class="pro">
									<div>
										<span>{{item.name}}</span>
										<span class="label" v-if="item.remark">{{item.remark}}</span>
									</div>
									<span>{{item.mobile}}</span>
								</div>
								<p>{{item.country}}{{item.province}}{{item.city}}{{item.area}} {{item.address}}</p>
							</div>

							<div class="icon">
								<check-icon :value.sync="item.isDefault"></check-icon>
							</div>
						</div>

					</div>
				</div>
				<div v-else style="background-color: white;height: 100%;">
					<noData v-if="list.length == 0" :status="2" stateText="暂无数据"></noData>
				</div>
				<div class="add_btn" @click="addAddress">添加地址</div>
			</div>
		</div>
	</popup>
</template>

<script>
	import { Popup } from 'vux'
	import settingHeader from '@/components/setting_header'
	import noData from '@/components/noData'
	export default {
		data() {
			return {
				title: '选择收货地址',
				list: [],
				defaultAddress: {},
			}
		},
		props: {
			options: {
				showAddressMode: false
			}

		},
		created() {
			this.getShippingAddress()
		},
		methods: {
			addAddress() {
				this.$router.push({
					path: '/member/address/edit',
					query: {
						'select': true
					}
				})
			},
			selectAddress(i, item) {

				var _this = this

				_this.$emit('watch', item)

				_this.list.forEach((value, index, array) => {
					array[index].isDefault = 0
					array[i].isDefault = 1
				})
				_this.options.showAddressMode = false
			},
			getShippingAddress() { // 获取收货地址列表
				let _this = this
				let param = {
					'userId': _this.$store.state.user.userId,
					'pageSize': 20,
					'curPage': 1
				}
				_this.$http.get(_this.url.user.getShippingAddress, {
					params: param
				}).then(resp => {
					if(resp.data.status === '00000000') {
						if(resp.data.data.list.length > 0) {
							_this.list = resp.data.data.list

							for(var i = 0; i < _this.list.length; i++) {
								if(sessionStorage.getItem('selectAddressId')) {
									_this.list[i].isDefault = 0
									if(_this.list[i].addressId == sessionStorage.getItem('selectAddressId')) {
										_this.defaultAddress = _this.list[i]
										_this.list[i].isDefault = 1
										_this.$emit('watch', _this.list[i])
										break;
									}
								} else {
									if(_this.list[i].isDefault == 1) {
										_this.defaultAddress = _this.list[i]
										_this.$emit('watch', _this.list[i])
									}
								}
							}
						} else {
							_this.$emit('watch', false)
						}
					}
				})

			}
		},
		components: {
			settingHeader,
			noData
		}
	}
</script>

<style lang="less" scoped>
	.address-box {
		background-color: #F5F6FA;
		height: 100%;
		.add_btn {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 0.90rem;
			line-height: 0.90rem;
			text-align: center;
			font-size: 0.28rem;
			font-family: PingFangSC-Regular;
			color: rgba(255, 255, 255, 1);
			background: rgba(51, 111, 255, 1);
		}
		.tip {
			height: 0.55rem;
			line-height: 0.55rem;
			font-size: 0.24rem;
			font-family: PingFangSC-Medium;
			color: rgba(26, 38, 66, 1);
			padding-left: 0.25rem;
			box-sizing: border-box;
			font-weight: bold;
		}
		.a_h {
			height: 0.88rem;
			background: rgba(255, 255, 255, 1);
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 0.32rem;
			font-family: PingFangSC-Medium;
			color: rgba(51, 51, 51, 1);
			position: relative;
			img {
				position: absolute;
				top: 50%;
				right: 0%;
				transform: translate(-0.2rem, -50%);
				width: 0.25rem;
				height: 0.25rem;
			}
		}
		.a_h:after {
			content: " ";
			position: absolute;
			left: 0;
			bottom: -2px;
			right: 0;
			height: 1px;
			border-top: 1px solid #D9D9D9;
			color: #D9D9D9;
			-webkit-transform-origin: 0 0;
			transform-origin: 0 0;
			-webkit-transform: scaleY(0.5);
			transform: scaleY(0.5);
			left: 0;
		}
		.add-btn-box {
			width: 100%;
			background-color: white;
			position: fixed;
			bottom: 0;
			left: 0;
			height: 0.88rem;
			.add-btn {
				height: 0.88rem;
				line-height: 0.88rem;
				background: rgba(51, 111, 255, 1);
				font-size: 0.28rem;
				text-align: center;
				font-family: MicrosoftYaHei;
				color: rgba(255, 255, 255, 1);
			}
		}
		.box2 {
			padding-top: 0.21rem;
		}
		.top46 {
			top: 47px!important;
		}
		.list2 {
			.top {
				display: flex;
				align-items: center;
				justify-content: space-between;
				.left {
					flex: 1;
				}
				.icon {
					margin-left: 0.25rem;
				}
			}
		}
		.list {
			box-sizing: border-box;
			margin-bottom: 0.21rem;
			background: white;
			.top {
				padding: 0.27rem 0.25rem;
				.pro {
					display: flex;
					justify-content: space-between;
					font-family: PingFangSC-Regular;
					font-size: 0.28rem;
					color: #1A2642;
					letter-spacing: 0;
					margin-bottom: 0.11rem;
					align-items: center;
					.label {
						display: inline-block;
						background: rgba(215, 227, 255, 1);
						border: 1px solid #1c70f1;
						border-radius: 2px;
						margin-left: 0.18rem;
						text-align: center;
						font-size: 0.24rem;
						padding: 0.02rem 0.1rem;
					}
				}
				p {
					font-family: PingFangSC-Regular;
					font-size: 0.28rem;
					color: #1A2642;
					letter-spacing: 0;
				}
			}
		}
	}
</style>
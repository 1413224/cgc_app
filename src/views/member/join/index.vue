<template>
	<section class="join_box">
		<settingHeader :title="title"></settingHeader>
		<img class="datu" :src="'./static/images/jiameng.png'" />
		<ul class="input_box">
			<li>
				<span>加盟角色</span>
				<span @click="showJs = true">{{js != ''? js : '请选择'}}<i class="icon iconfont icon-arrow-right"></i></span>
			</li>
			<li>
				<span class="btn123">申请人</span>
				<div>
					<input type="text" placeholder="请输入" />
				</div>
			</li>
			<li>
				<span>联系电话</span>
				<div>
					<input type="text" placeholder="请输入" />
				</div>
			</li>
			<li>
				<span>企业名称</span>
				<div>
					<input type="text" placeholder="请输入" />
				</div>
			</li>
			<li>
				<span>所在城市</span>
				<span @click="showAddress = true">{{addressName != '' && showAddressText ? addressName : '请选择'}}<i class="icon iconfont icon-arrow-right"></i></span>
			</li>
		</ul>
		<div class="btn" @click="submit">提交</div>
		<p class="tip">创造价值 · 增信赋能</p>

		<!--角色-->
		<popup-picker class="showJs" :show="showJs" :data="list2" v-model="value2" @on-change="jsChange" @on-hide="showJs = false"></popup-picker>
		<!--地址-->
		<x-address raw-value :show="showAddress" :list="list" class="address-item" v-model="addArr" value-text-align="left" @on-show="onAddArr" @on-hide="onHide" @on-shadow-change="onC"></x-address>
	</section>
</template>

<script>
	import settingHeader from '@/components/setting_header'
	import { PopupPicker, XAddress } from 'vux'
	export default {
		components: {
			settingHeader,
			PopupPicker,
			XAddress
		},
		data() {
			return {
				title: '企业加盟',
				showJs: false,
				showAddress: false,
				showAddressText: false,
				list: [],
				addArr: [],
				addressName: '',
				js: '',
				list2: [
					[{
						name: '区域运营商',
						value: 1
					}, {
						name: '联盟企业',
						value: 2
					}, {
						name: '联营企业',
						value: 3
					}, {
						name: '服务商',
						value: 4
					}]
				]
			}
		},
		created() {
			this.getRegionOptions(2)
			this.getRegionOptions(3)
			this.getRegionOptions(4)
		},
		methods: {
			submit(){
				this.$router.push({
					path:'/member/join/result'
				})
			},
			jsChange() {
				if(this.value2[0] == 1) {
					return this.js = '区域运营商'
				} else if(this.value2[0] == 2) {
					return this.js = '联盟企业'
				} else if(this.value2[0] == 3) {
					return this.js = '联营企业'
				} else if(this.value2[0] == 4) {
					return this.js = '服务商'
				}
			},
			getRegionOptions(level) { // 获取地址选项
				let _this = this
				let param = {
					'level': level
				}
				_this.$http.get(_this.url.zone.area, {
					params: param
				}).then(resp => {
					let temp
					let arrData = resp.data.data
					if(level === 2) {
						arrData.forEach(function(item) {
							temp = {
								name: item.name,
								value: item.areaId
							}
							_this.list.push(temp)
						})
					} else {
						arrData.forEach(function(item) {
							temp = {
								name: item.name,
								value: item.areaId,
								parent: item.parentId + ''
							}
							_this.list.push(temp)
						})
					}
				})
			},
			onAddArr() {

			},
			onC(ids, names) {
				this.addressName = names.join(' ')
			},
			onHide(names) {
				console.log(this.addArr)
				this.showAddress = false
				this.showAddressText = true
			}
		},

	}
</script>
<style lang="less">
	.showJs,
	.address-item {
		display: none!important;
	}
</style>
<style lang="less" scoped>
	.join_box {
		height: 100%;
		background-color: white;
		.datu {
			width: 100%;
			height: auto;
			display: block;
		}
		.input_box {
			padding: 0 0.30rem;
			box-sizing: border-box;
			li {
				height: 1.08rem;
				display: flex;
				align-items: center;
				justify-content: space-between;
				position: relative;
				font-size: 0.28rem;
				span:nth-child(1) {
					color: rgba(50, 51, 51, 1);
				}
				span:nth-child(2) {
					color: #A0A0A0;
					display: flex;
					align-items: center;
					i {
						font-size: 0.5rem;
					}
				}
				div {
					margin-left: 2rem;
					flex: 1;
					height: 100%;
					padding: 0.2rem 0;
					box-sizing: border-box;
					padding-right: 0.45rem;
					input {
						width: 100%;
						height: 100%;
						text-align: right;
						font-size: 0.28rem;
					}
				}
			}
			li:after {
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
		.btn {
			width: 6.18rem;
			height: 0.88rem;
			line-height: 0.88rem;
			text-align: center;
			background: rgba(51, 111, 255, 1);
			border-radius: 3px;
			box-shadow: 2px 0px 20px rgba(51, 111, 255, 0.25);
			font-size: 0.36rem;
			color: rgba(255, 255, 255, 1);
			margin: 0.6rem auto 0.3rem;
		}
		.tip {
			text-align: center;
			font-size: 0.24rem;
			color: rgba(160, 160, 160, 1);
			padding-bottom: 0.3rem;
		}
	}
</style>
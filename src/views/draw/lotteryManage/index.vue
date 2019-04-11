<template>
	<section class="lottery-manage-index">
		<tab v-model="tabIndex" class="tab_box" :line-width="2" active-color="#397df8" custom-bar-width="1.1rem">
			<tab-item :selected="tabIndex == 0">抽奖管理器</tab-item>
			<tab-item :selected="tabIndex == 1">抽奖列表</tab-item>
		</tab>
		<div v-if="tabIndex == 0">
			<ul>
				<li>
					<p class="label">抽奖消费结束时间</p>
					<div class="time" @click="showTime(1)">
						<span>{{endTime!=''?endTime:'请选择'}}</span>
						<img :src="'./static/images/xia.png'" />
					</div>
				</li>
				<li>
					<p class="label">抽奖开奖时间</p>
					<div class="time" @click="showTime(2)">
						<span>{{lotteryTime!=''?lotteryTime:'请选择'}}</span>
						<img :src="'./static/images/xia.png'" />
					</div>
				</li>
				<li>
					<p class="label">初始注入金额</p>
					<p class="time">
						<input v-model="addBonus" type="number" @keyup.native="addBonus=addBonus.toString().replace(/[^\.\d]/g,'')" placeholder="请输入" />
					</p>
				</li>
			</ul>
			<p class="bonus">当前奖金池金额：{{bonus}}</p>
			<div class="submit_btn" @click="submit()">立即发起</div>
		</div>
		<div v-if="tabIndex == 1">
			<v-list></v-list>
		</div>
	</section>
</template>

<script>
	import { Datetime } from 'vux'
	import vList from './list'
	export default {
		components: {
			Datetime,
			vList
		},
		data() {
			return {
				tabIndex: 0,
				endTime: '',
				lotteryTime: '',
				addBonus: '',
				startDate: '',
				startDate2: '',
				startDate3: '',
				minHour: '',
				bonus: 0
			}
		},
		watch: {
			addBonus() {
				if(this.addBonus < 0) {
					this.addBonus = 0
				}
			}
		},
		mounted() {
			this.getDate()
			this.getDate2()
			this.getDate3()
			this.getBonusPool()
		},
		methods: {
			getBonusPool() {
				var _this = this
				_this.$http.get(_this.url.lottery.getBonusPool, {
					params: {}
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.bonus = res.data.data
					}
				})
			},
			submit() {
				var _this = this
				var endTime = new Date(_this.endTime).getTime() / 1000
				var lotteryTime = new Date(_this.lotteryTime).getTime() / 1000
				if(_this.endTime == null || _this.endTime == '') {
					_this.$vux.toast.show({
						width: '50%',
						type: 'text',
						position: 'top',
						text: '请选择抽奖消费时间'
					})
					return false;
				}
				if(_this.lotteryTime == null || _this.lotteryTime == '') {
					_this.$vux.toast.show({
						width: '50%',
						type: 'text',
						position: 'top',
						text: '请选择抽奖时间'
					})
					return false;
				}
				if(_this.addBonus == null || _this.addBonus == '') {
					_this.$vux.toast.show({
						width: '50%',
						type: 'text',
						position: 'top',
						text: '请输入注入奖金'
					})
					return false;
				}

				if(endTime > lotteryTime) {
					_this.$vux.toast.show({
						width: '50%',
						type: 'text',
						position: 'top',
						text: '抽奖时间要大于消费时间'
					})
					return false;
				}
				_this.$http.post(_this.url.lottery.addLottery, {
					'endTime': endTime,
					'lotteryTime': lotteryTime,
					'addBonus': _this.addBonus,
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.$vux.toast.show({
							width: '50%',
							type: 'text',
							position: 'top',
							text: '已发起抽奖'
						})
						_this.tabIndex = 1
					}
				})
			},
			showTime(type) {
				var _this = this
				var startDate = type == 1 ? _this.startDate : _this.startDate2
				_this.$vux.datetime.show({
					value: startDate,
					confirmText: '确定',
					cancelText: '取消',
					clearText: '请选择日期',
					minYear: '1900',
					format: 'YYYY-MM-DD HH:mm',
					startDate: _this.startDate3,
					minHour: _this.minHour,
					onConfirm(val) {
						if(type == 1) {
							_this.endTime = val
						} else {
							_this.lotteryTime = val
						}
					}
				})
			},
			getDate() {
				var date = new Date(new Date().getTime() + 1200000)
				var year = date.getFullYear()
				var month = date.getMonth() + 1
				var day = date.getDate()
				var hours = date.getHours()
				var minutes = date.getMinutes()
				if(month < 10) {
					month = "0" + month
				}
				if(day < 10) {
					day = "0" + day
				}
				if(minutes < 10) {
					minutes = '0' + minutes
				}
				this.endTime = year + "-" + month + "-" + day + ' ' + hours + ':' + minutes
				this.startDate = year + "-" + month + "-" + day + ' ' + hours + ':' + minutes
				this.minHour = hours
			},
			getDate2() {
				var date = new Date(new Date().getTime() + 1800000)
				var year = date.getFullYear()
				var month = date.getMonth() + 1
				var day = date.getDate()
				var hours = date.getHours()
				var minutes = date.getMinutes()
				if(month < 10) {
					month = "0" + month
				}
				if(day < 10) {
					day = "0" + day
				}
				if(minutes < 10) {
					minutes = '0' + minutes
				}
				this.lotteryTime = year + "-" + month + "-" + day + ' ' + hours + ':' + minutes
				this.startDate2 = year + "-" + month + "-" + day + ' ' + hours + ':' + minutes
				this.minHour = hours
			},
			getDate3() {
				var date = new Date()
				var year = date.getFullYear()
				var month = date.getMonth() + 1
				var day = date.getDate()
				var hours = date.getHours()
				var minutes = date.getMinutes()
				if(month < 10) {
					month = "0" + month
				}
				if(day < 10) {
					day = "0" + day
				}
				this.startDate3 = year + "-" + month + "-" + day
				this.minHour = hours
			}
		}
	}
</script>

<style lang="less" scoped>
	.lottery-manage-index {
		min-height: 100%;
		background-color: white;
		.tab_box {
			z-index: 15;
		}
		.bonus {
			color: #A0A0A0;
			font-size: 0.23rem;
			padding: 0.20rem 0.80rem;
			box-sizing: border-box;
		}
		ul {
			padding: 0.80rem 0.80rem 0;
			box-sizing: border-box;
			li {
				font-size: 0.28rem;
				font-family: PingFangSC-Regular;
				.label {
					color: rgba(144, 162, 199, 1);
					margin-bottom: 0.20rem;
				}
				.time {
					color: #A0A0A0;
					height: 0.65rem;
					border-bottom: 1px solid #E4EBFB;
					display: flex;
					align-items: center;
					justify-content: space-between;
					input {
						width: 100%;
						height: 100%;
						color: #A0A0A0;
					}
					img {
						width: 0.20rem;
						height: auto;
					}
				}
			}
			li:nth-child(2) {
				margin: 0.55rem 0;
			}
		}
		.submit_btn {
			margin: 0.80rem 0.80rem 0;
			height: 0.88rem;
			line-height: 0.88rem;
			text-align: center;
			background: rgba(56, 137, 255, 1);
			box-shadow: 0px 2px 20px 0px rgba(41, 120, 235, 0.4);
			font-size: 0.28rem;
			font-family: PingFangSC-Regular;
			color: rgba(255, 255, 255, 1);
			box-sizing: border-box;
		}
	}
</style>
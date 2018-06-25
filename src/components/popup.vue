<template>
	<div class="tc-box">
		<!--购物奖励弹窗-->
		<x-dialog v-model="showSr" class="xrBox">
			<div class="p_box">
				<img @click="showNew = false" class="xr_img" :src="'./static/images/xr_bg.png'" alt="" />

				<div class="p_content">
					<p>本次消费奖励</p>
					<p>7.20 <span>通用积分</span></p>
					<p>通用积分将自动存入您的资产余额</p>
				</div>

				<img @click="showSr = false" class="gb_img" :src="'./static/images/xr_gb.png'" alt="" />
			</div>
		</x-dialog>

		<!--新人奖励弹窗-->
		<x-dialog v-model="showZc" class="zcBox">
			<div class="zc_box">
				<div class="zc_content">
					<div class="item_box" v-for="(item,index) in zcList" :key="index">
						<div>
							<p>{{item.jf}}</p>
							<p>自动存入通用积分</p>
						</div>
						<div>
							<p>¥ <span>{{item.money}}</span></p>
							<p>{{item.mk}}</p>
						</div>
					</div>
					<div class="zc-btn" @click="toReg">
						立即注册
					</div>
				</div>
			</div>
			<img @click="showZc = false" class="gb_img" :src="'./static/images/xr_gb.png'" alt="" />
		</x-dialog>
	</div>
</template>

<script>
	import { XDialog } from 'vux'
	export default {
		props: {
			showSr: {
				type: Boolean,
				default: false
			},
			showZc: {
				type: Boolean,
				default: false
			},
		},
		components: {
			XDialog
		},
		data() {
			return {
				zcList: [{
						jf: '通用积分',
						money: '10',
						mk: '无门槛全场使用'
					},
					{
						jf: '通用积分',
						money: '20',
						mk: '满50减10'
					},
					{
						jf: '通用积分',
						money: '30',
						mk: '无门槛全场使用'
					}
				]
			}
		},
		created() {

		},
		mounted() {

		},
		methods: {
			toReg() {
				this.showNew2 = false
				this.vm.$router.push({
					path: '/user/reg'
				})
			}
		}
	}
</script>

<style lang='less'>
	.zcBox {
		.weui-dialog {
			width: 5.5rem;
			max-width: 100%;
		}
	}
</style>
<style lang="less" scoped>
	.zcBox {
		.zc_box {
			.zc-btn {
				width: 5.16rem;
				height: 0.8rem;
				line-height: 0.8rem;
				background: rgba(255, 204, 9, 1);
				border-radius: 4px;
				font-size: 0.34rem;
				font-family: PingFangSC-Semibold;
				color: rgba(209, 14, 22, 1);
				margin: 0 auto;
				margin-top: 0.2rem;
			}
			.zc_content {
				padding: 1.8rem 0.2rem 0.35rem 0.2rem;
				box-sizing: border-box;
				background: url(../../static/images/zc_bg.png) no-repeat;
				background-size: 100% 100%;
				position: relative;
				.item_box {
					background: url(../../static/images/it_bg.png) no-repeat;
					background-size: 100% 100%;
					padding: 0.2rem;
					box-sizing: border-box;
					display: flex;
					margin-bottom: 0.2rem;
					div:nth-child(1) {
						width: 3rem;
						display: flex;
						flex-direction: column;
						align-items: flex-start;
						justify-content: space-between;
						p:nth-child(1) {
							font-size: 0.28rem;
							font-family: PingFangSC-Medium;
							color: rgba(15, 24, 45, 1);
						}
						p:nth-child(2) {
							font-size: 0.24rem;
							font-family: PingFangSC-Regular;
							color: rgba(115, 134, 173, 1);
						}
					}
					div:nth-child(2) {
						flex: 1;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: space-between;
						height: 100%;
						p:nth-child(1) {
							font-size: 0.26rem;
							font-family: PingFangSC-Regular;
							color: rgba(242, 48, 48, 1);
							span {
								font-size: 0.6rem;
								font-family: PingFangSC-Medium;
								color: rgba(242, 48, 48, 1);
							}
						}
						p:nth-child(2) {
							font-size: 0.24rem;
							font-family: PingFangSC-Regular;
							color: rgba(115, 134, 173, 1);
						}
					}
				}
				.item_box:last-child {
					margin-bottom: 0px!important;
				}
			}
		}
		.gb_img {
			width: 0.6rem;
			height: 0.6rem;
			margin-top: 0.2rem;
		}
	}
	
	.xrBox {
		.p_box {
			position: relative;
			.xr_img {
				width: 100%;
				height: auto;
			}
			.p_content {
				width: 100%;
				position: absolute;
				top: 49%;
				left: 50%;
				transform: translate(-50%, -50%);
				p:nth-child(1) {
					font-size: 0.28rem;
					font-family: PingFangSC-Regular;
					color: rgba(164, 113, 57, 1);
				}
				p:nth-child(2) {
					font-size: 0.68rem;
					font-family: PingFangSC-Semibold;
					color: rgba(242, 48, 48, 1);
					span {
						font-size: 0.24rem;
						font-family: PingFangSC-Regular;
						color: rgba(242, 48, 48, 1);
					}
				}
				p:nth-child(3) {
					font-size: 0.22rem;
					font-family: PingFangSC-Regular;
					color: rgba(164, 113, 57, 1);
				}
			}
			.gb_img {
				width: 0.82rem;
				height: 0.82rem;
				margin-top: 0.33rem;
			}
		}
	}
</style>
<template>
	<div class="footer-box">
		<div class="b-top">
			<div class="item" v-for="(item,index) in barList" :class="{'factive':($route.meta.navIndex == index||$route.meta.navIndex == '/')}" @click="itemActive(index)">
				<router-link :to="item.url">
					<img class="icon" :class="{'zqm':index == 2}" :src="[$route.meta.navIndex == index?item.iconIn:item.icon]" />
					<p v-if="index!=2">{{item.title}}</p>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		
		data() {
			return {}
		},
		created() {},
		props: {
			show: Boolean,
			findex: Number,
			barList: {
				default: function() {
					return [{
							icon: './static/images/e.png',
							iconIn: './static/images/e_active.png',
							title: 'e消费',
							url: '/index'
							// url:'/custom?id=alDiypage660352377100000001'
						},
						/*{
							icon: './static/images/xysc.png',
							iconIn: './static/images/xysc_active.png',
							title: '信用商城',
							url: '/shop'
						},*/
						{
							icon: './static/images/xwfg.png',
							iconIn: './static/images/zwfg.png',
							title: '威健康',
							url: '/share'
						},
						{
							icon: './static/images/zqm.png',
							iconIn: './static/images/zqm.png',
							url: '/member/purse/qrcode'
						},
						{
							icon: './static/images/cylm.png',
							iconIn: './static/images/cylm_active.png',
							title: '联营企业',
							url: '/share/storelist'
						},
						{
							icon: './static/images/glzx.png',
							iconIn: './static/images/glzx_active.png',
							title: '管理中心',
							url: '/member/index'
						},
					]
				}
			}
		},
		methods: {
			itemActive(index) {
				var _this = this
				
				_this.$popup.hide()
			}
		}
	}
</script>
<style lang='less'>
	.footer-box {
		position: fixed;
		bottom: 0;
		width: 100%;
		max-width: 640px;
		z-index: 9999;
		background: rgba(255, 255, 255, 1);
		font-family: PingFangSC-Regular;
		.b-top {
			height: 1rem;
			position: relative;
			display: flex;
			justify-content: space-between;
			.item {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				a {
					width: 100%;
					height: 100%;
					display: flex;
					align-items: center;
					flex-direction: column;
					justify-content: center;
					color: rgba(144, 162, 199, 1);
					img {
						width: 0.5rem;
						height: 0.5rem;
					}
					p {
						margin-top: 0.08rem;
						font-size: 0.22rem;
					}
					.zqm {
						width: 1rem;
						height: 1rem;
					}
				}
			}
			.factive {
				p {
					color: rgba(51, 111, 255, 1)!important;
				}
			}
		}
		.b-top:before {
			content: " ";
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			height: 1px;
			border-top: 1px solid #d8dff0;
			color: #D9D9D9;
			-webkit-transform-origin: 0 0;
			transform-origin: 0 0;
			-webkit-transform: scaleY(0.5);
			transform: scaleY(0.5);
			left: 0px;
		}
	}
</style>
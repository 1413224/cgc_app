<template>
	<div class="commercial-box">
		<settingHeader :title="title"></settingHeader>
		<img class="banner" :src="'./static/qrcode/shopList-logo.png'" alt="" />
		<div v-for="(item,index) in typeList" :key="index">
			<div class="title">
				<p>{{item.name}}</p>
			</div>
			<div class="logo-list">
				<div class="logo-box" v-for="(i,index) in item.logo" :key="index">
					<div class="b-box">
						<img :src="i" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import settingHeader from '../../../components/setting_header'
	export default {
		data() {
			return {
				title: '支持商户',
				typeList: [{
						name: '专营特卖',
						logo: ['./static/qrcode/shopLogo/shopLogo (28).png',
							'./static/qrcode/shopLogo/shopLogo (32).png',
							'./static/qrcode/shopLogo/shopLogo (31).png',
							'./static/qrcode/shopLogo/shopLogo (30).png',
							'./static/qrcode/shopLogo/shopLogo (22).png',
							'./static/qrcode/shopLogo/shopLogo (5).png',
							'./static/qrcode/shopLogo/shopLogo (1).png',
							'./static/qrcode/shopLogo/shopLogo (13).png',
						]
					}, {
						name: '医疗健康',
						logo: ['./static/qrcode/shopLogo/shopLogo (6).png',
							'./static/qrcode/shopLogo/shopLogo (29).png',
							'./static/qrcode/shopLogo/shopLogo (3).png',
							'./static/qrcode/shopLogo/shopLogo (7).png',
						]
					}, {
						name: '餐饮娱乐',
						logo: ['./static/qrcode/shopLogo/shopLogo (10).png',
							'./static/qrcode/shopLogo/shopLogo (14).png',
							'./static/qrcode/shopLogo/shopLogo (4).png',
							'./static/qrcode/shopLogo/shopLogo (33).png',
							'./static/qrcode/shopLogo/shopLogo (9).png',
							'./static/qrcode/shopLogo/shopLogo (21).png',
						]
					}, {
						name: '商超便利',
						logo: ['./static/qrcode/shopLogo/shopLogo (24).png',
							'./static/qrcode/shopLogo/shopLogo (15).png',
							'./static/qrcode/shopLogo/shopLogo (12).png',
							'./static/qrcode/shopLogo/shopLogo (8).png',
							'./static/qrcode/shopLogo/shopLogo (17).png',
							'./static/qrcode/shopLogo/shopLogo (26).png',
							'./static/qrcode/shopLogo/shopLogo (11).png',
						]
					}, {
						name: '购物中心',
						logo: ['./static/qrcode/shopLogo/shopLogo (16).png',
							'./static/qrcode/shopLogo/shopLogo (27).png',
							'./static/qrcode/shopLogo/shopLogo (25).png',
							'./static/qrcode/shopLogo/shopLogo (23).png',
						]
					}, {
						name: '旅游户外',
						logo: ['./static/qrcode/shopLogo/shopLogo (2).png',
							'./static/qrcode/shopLogo/shopLogo (18).png',
							'./static/qrcode/shopLogo/shopLogo (19).png',
							'./static/qrcode/shopLogo/shopLogo (20).png',
						]
					}

				]
			}
		}
	}
</script>

<style lang="less">
	.commercial-box {
		background-color: white;
		padding-bottom: 1.12rem;
		.banner {
			width: 100%;
			height: auto;
			display: block;
		}
		.title {
			height: 1.23rem;
			line-height: 1.23rem;
			text-align: center;
			font-size: 0.28rem;
			font-family: PingFang-SC-Heavy;
			color: rgba(26, 38, 66, 1);
			font-weight: bold;
			p {
				display: block;
				position: relative;
			}
			p:before,
			p:after {
				content: '';
				/*CSS伪类用法*/
				position: absolute;
				/*定位背景横线的位置*/
				top: 48%;
				background: #1A2642;
				/*宽和高做出来的背景横线*/
				width: 0.41rem;
				height: 1px;
			}
			p:before {
				left: 35%;
				/*调整背景横线的左右距离*/
			}
			p:after {
				right: 35%;
			}
		}
		.logo-list {
			padding: 0 0.2rem;
			box-sizing: border-box;
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			.logo-box {
				width: 33.333333333333336%;
				display: flex;
				align-items: center;
				justify-content: center;
				.b-box {
					width: 2.3rem;
					height: 1.14rem;
					border: 1px solid #D8DFF0;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					justify-content: center;
					overflow: hidden;
					margin-bottom: 0.1rem;
					img {
						width: 50%;
						height: auto;
					}
				}
			}
		}
	}
</style>
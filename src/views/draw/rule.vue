<template>
	<div class="draw_rule_box">
		<settingHeader :title="title"></settingHeader>
		<img class="banner-img" :src="'./static/draw/banner5.png'" />
		<div class="tip-box">
			<div class="title-box">
				<img :src="'./static/vip/title-img.png'" />
				<p>抽奖规则</p>
				<img :src="'./static/vip/title-img.png'" />
			</div>
			<div class="item">
				<div class="one" v-for="(item,index) in tipList" :key="index">
					<p>{{index+1}}</p>
					<p>{{item}}</p>
				</div>
			</div>
		</div>
		<p class="bottom">CGC全球智慧产业联盟</p>
	</div>
</template>

<script>
	import settingHeader from '../../components/setting_header'
	export default {
		components: {
			settingHeader
		},
		data() {
			return {
				title: '抽奖规则',
				tipList: [
					'该活动仅限CGC产业联盟会员参与',
					'每扫码付款成功一次均可获得一次抽奖机会，上不封顶。',
					'每期每位参与用户获得的奖项数最多为一个，您可以在“首页→抽奖中心”或“个人中心→幸运大抽奖”查看您的中奖情况和发奖进度。',
					'参与活动的用户若存在不正当行为（包括但是不限于虚假刷单、机器作弊等），CGC产业联盟有权取消恶意用户的参与资格、所获得的奖励。',
					'活动最终解释权归CGC全球智慧产业联盟所有。'
				]
			}
		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.draw_rule_box {
		.banner-img {
			width: 100%;
			height: auto;
			display: block;
		}
		.tip-box {
			padding: 0.5rem 0.45rem;
			box-sizing: border-box;
			background-color: white;
			.title-box {
				font-size: 0.36rem;
				font-family: PingFang-SC-Medium;
				color: rgba(227, 41, 33, 1);
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 0.53rem;
				p {
					margin: 0 0.28rem;
				}
				img {
					width: 0.45rem;
					height: 0.35rem;
				}
			}
			.item {
				width: 6.63rem;
				height: 9.12rem;
				background: rgba(255, 255, 255, 1);
				/*opacity: 0.6;*/
				border-radius: 3px;
				box-shadow: 2px 0px 30px rgba(194, 127, 124, 0.4);
				padding: 0.58rem 0.42rem;
				box-sizing: border-box;
				.one {
					margin-bottom: 0.55rem;
					display: flex;
					p:nth-child(1) {
						width: 0.36rem;
						height: 0.36rem;
						line-height: 0.36rem;
						background: rgba(227, 41, 34, 1);
						border-radius: 50%;
						text-align: center;
						font-size: 0.3rem;
						font-family: PingFang-SC-Medium;
						color: rgba(255, 255, 255, 1);
						display: inline-block;
						margin-right: 0.16rem;
					}
					p:nth-child(2) {
						flex: 1;
						font-size: 0.3rem;
						font-family: PingFang-SC-Medium;
						color: #333333;
					}
				}
			}
		}
		.bottom {
			text-align: center;
			margin-top: 0.6rem;
			padding-bottom: 0.25rem;
			font-size: 0.3rem;
			font-family: HYQiHeiY1-DEW;
			color: rgba(160, 160, 160, 1);
		}
	}
</style>
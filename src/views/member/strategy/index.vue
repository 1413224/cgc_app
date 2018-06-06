<template>
	<section class="strategy">
		<settingHeader :title="title"></settingHeader>
		
		<img src="../../../assets/images/member/strategyBg.png" style="width: 100%;display: block;margin: 0;padding: 0;">
		

		<div class="content">
			<div class="title">
				<div class="diamond"></div>
				<p>如何获得积分</p>
				<div class="diamond2"></div>
			</div>

			
			<router-link :to="item.url" class="box"  v-for="(item,index) in strategyList" :key="index">
				<div class="img"><img :src="item.img"></div>
				<div class="flex right">
					<div class="flex">
						<p>{{ item.title}}</p>
						<p class="text mt">{{item.content}}</p>
					</div>
					<div><img src="../../../assets/images/member/nextPage.png"></div>
				</div>
			</router-link>
		</div>

		<div class="content mt20">
			<div class="title">
				<div class="diamond left"></div>
				<p>关于积分</p>
				<div class="diamond2 right"></div>
			</div>
			<div class="box2">
				<div class="circle"></div>
				<div class="flex right">
					<p>通用积分</p>
					<p class="paragraph">
						CGC通用积分即时到达会员钱包帐户，可以在平台所有联盟企业或e消费APP商城平台1:1抵现金随意使用，没有时间和额度限制。
					</p>
				</div>
			</div>
			<div class="box2">
				<div class="circle"></div>
				<div class="flex right">
					<p>信用积分</p>
					<p class="paragraph">
						<span>1.在e消费APP信用商城兑换专区兑换等值产品；</span>
						<span>2.e消费APP信用商城信用购专区以信用积分+现金购物;</span>
						<span>3.根据信用积分额获得对应的信用额度。</span>
					</p>
					<div class="notes">注意事项</div>
					<p class="text">CGC通用积分不可以提现。</p>
				</div>
			</div>
		</div>
	</section>
</template>


<script>
	import settingHeader from '../../../components/setting_header'
	export default {
		components: {
			settingHeader
		},
		data(){
        	return {
        		title:'赚钱攻略',
        		strategyList:[
        			{title: '消费购物', content: '交易成功后，获得实付金额20%的通用积分',img: './static/member/xfgw.png',url: '/shop'},
        			{title: '幸运抽奖', content: '消费参加抽奖，大奖可抽得5000通用积分', img: './static/member/xycj.png',url: '/draw/index'},
        			{title: '推荐分享', content: '会员分享可以获得消费金额10%的通用积分',img: './static/member/tjfx.png',url: '/member/purse/qrcode'},
        			{title: '充值有奖', content: '会员在e消费APP充值，获得等值信用积分', img: './static/member/czyj.png',url: '/member/purse/recharge'}

        		],
        		rules:[
        			{ title: '通用积分', content: 'CGC通用积分即时到达会员钱包帐户，可以在平台所有联盟企业或e消费APP商城平台1:1抵现金随意使用，没有时间和额度限制。'},
        			{ title: '信用积分', content: 'CGC通用积分即时到达会员钱包帐户，可以在平台所有联盟企业或e消费APP商城平台1:1抵现金随意使用，没有时间和额度限制。'}
        		]
        	}
        },
        methods: {},

	}
</script>

<style lang="less" scoped>
	.strategy{
		.flex{
			flex: 1;
		}
		.mt20{
			margin-top: 0.2rem;
		}
		.content{
			background: #fff;
			padding: 0.6rem 0 0.24rem 0;
			color: #1A2642;
			font-size: 0.32rem;
			.mt{
				margin-top: 0.18rem;
			}
			.text{
				color: #90A2C7;
				font-size: 0.24rem;
			}
			.title{
				position: relative;
				text-align: center;
				padding-bottom: 0.66rem;
				font-size: 0.36rem;
				.diamond{
					position: absolute;
					width: 0.18rem;
					height: 0.18rem;
					background:linear-gradient(70deg,#7EE8FF,#336FFF);
					transform:rotate(45deg);
					top: 0.15rem;
					left: 30%;
				}
				.diamond2{
					position: absolute;
					width: 0.18rem;
					height: 0.18rem;
					background:linear-gradient(70deg,#7EE8FF,#336FFF);
					transform:rotate(45deg);
					top: 0.15rem;
					right: 31%;
				}
				.left{
					left: 36%;
				}
				.right{
					right: 36%;
				}
			}
			.box{
				display: flex;
				margin-left: 0.29rem;
				margin-bottom: 0.29rem;
				.img{
					width: 1rem;
					margin-right: 0.25rem;
					img{
						width: 100%;
					}
				}
				.right{
					display: flex;
					border-bottom: 1px solid #D9DCF8;
					padding-bottom: 0.35rem;
					align-items: center;
					justify-content: center;
					margin-top: 0.09rem;
					img{
						width: 50%;
						display: inline-block;
						margin: auto;
					}
				}
			}
			.box:last-child .right{
				border-bottom: none;
			}

			.box2{
				margin-left: 0.49rem;
				display: flex;
				color: #1A2642;
				font-size: 0.32rem;
				margin-bottom: 0.6rem;
				.circle{
					width: 0.16rem;
					height: 0.16rem;
					background:linear-gradient(70deg,#7EE8FF,#336FFF);
					border-radius: 50%;
					margin-right: 0.11rem;
					margin-top: 0.15rem;
				}
				.right{
					.paragraph{
						word-wrap:break-word;
						font-size: 0.24rem;
						color: #90A2C7;
						margin-top: 0.24rem;
						padding-right: 0.4rem;
						text-align: justify;
						span{
							display: inline-block;
							margin-bottom: 0.18rem;
						}
					}
					.notes{
						width:1.2rem;
						height:0.44rem;
						background:#4879FF;
						border-radius:0.1rem;
						text-align: center;
						line-height: 0.44rem;
						font-size: 0.24rem;
						color: #FFFFFF;
						margin-top: 0.22rem;
						margin-bottom: 0.26rem;
					}
					.text{
						color: #90A2C7;
						font-size: 0.24rem;
					}
				}
			}
		}
	}
</style>
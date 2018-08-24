<template>
	<section class="benefits">
		<settingHeader :title="title"></settingHeader>
		
		<div class="content" v-for="(item,index) in benefitsList" :key="index">
			<p>{{ item.title}}</p>
			<p v-html="item.content"></p>
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
        		title:'详细权益介绍',
        		benefitsList:[
        			{title: '一 注册奖励',content: '注册VlP会员可获信用积分200分。'},
        			{title: '二 购物奖励',content: '会员在全球联盟企业和e消费任何APP商城(用现金或通用积分)购物均获得交易服务费10%的CGC通用积分。'},
        			{title: '三 积分抵现金',content: 'CGC通用积分在全球联盟企业和e消费任何APP商城1:1抵现金通用。'},
        			{title: '四 赢5000元大奖',content: '会员在平台联盟企业或e消费APP商城平台累计消费，每一次消费记录都可参加每周幸运大抽奖，均有机会赢5000元CGC通用积分。'},
        			{title: '五 推荐得积分',content: '1.直推会员关注获信用积分200分。<br> 2.通过本人推荐二维码注册的平台初始会员在平台联盟企业和e消费商城平台消费，会员可获得所推荐会员产生平台服务费的10%的CGC通用积分。'}
        		]
        	}
        },
        methods: {},

	}
</script>

<style lang="less" scoped>
	.benefits{
		background: #fff;
		padding-bottom: 0.84rem;
		.content{
			padding: 0.47rem 0.39rem 0 0.29rem;
			color: #1A2642;
			font-size: 0.36rem;
			p:last-child{
				font-size: 0.3rem;
				margin-top: 0.49rem;
				word-wrap:break-word;
				text-align: justify;
			}
		}
	}
</style>
<template>
	<section class="order_eval_box">
		<settingHeader title="服务评价"></settingHeader>
		<div class="store_box">
			<div class="top">
				<img src="../../assets/images/shop/shop4.png">优衣库旗舰店
			</div>
			<div class="bottom">
				<div class="star_box">
					<p>卖家服务</p>
					<rater class="rater_box" v-model="storeStarNum" :min="1" :max="5" active-color="#336FFF" :margin="5" star='<i class="iconfont icon-xingxing"></i>'></rater>
					<span>{{storeStarText}}</span>
				</div>
				<div class="star_box">
					<p>物流服务</p>
					<rater class="rater_box" v-model="logisticsStarNum" :min="1" :max="5" active-color="#336FFF" :margin="5" star='<i class="iconfont icon-xingxing"></i>'></rater>
					<span>{{logisticsStarText}}</span>
				</div>
			</div>
		</div>
		<div class="submit_box">
			<check-icon :value.sync="isAnonymous">匿名</check-icon>
			<div class="btn" @click="submit">提交</div>
		</div>
	</section>
</template>

<script>
	import settingHeader from '@/components/setting_header'
	import { CheckIcon, Rater } from 'vux'
	export default {
		components: {
			settingHeader,
			CheckIcon,
			Rater,
		},
		data() {
			return {
				storeStarNum: 1,
				logisticsStarNum: 1,
				storeStarText: '非常差',
				logisticsStarText: '非常差',
				isAnonymous: true
			}
		},
		created() {

		},
		watch: {
			storeStarNum() {
				if(this.storeStarNum == 1) {
					this.storeStarText = '非常差'
				} else if(this.storeStarNum == 2) {
					this.storeStarText = '差'
				} else if(this.storeStarNum == 3) {
					this.storeStarText = '一般'
				} else if(this.storeStarNum == 4) {
					this.storeStarText = '好'
				} else if(this.storeStarNum == 5) {
					this.storeStarText = '非常好'
				}
			},
			logisticsStarNum() {
				if(this.logisticsStarNum == 1) {
					this.logisticsStarText = '非常差'
				} else if(this.logisticsStarNum == 2) {
					this.logisticsStarText = '差'
				} else if(this.logisticsStarNum == 3) {
					this.logisticsStarText = '一般'
				} else if(this.logisticsStarNum == 4) {
					this.logisticsStarText = '好'
				} else if(this.logisticsStarNum == 5) {
					this.logisticsStarText = '非常好'
				}
			}
		},
		methods: {
			submit() {
				this.$router.push({
					path: '/share/comsuccess'
				})
			},
		}
	}
</script>
<style lang="less" scoped>
	.order_eval_box {
		padding-bottom: 1.50rem;
		background-color: #F5F6FA;
		.star_box {
			display: flex;
			align-items: center;
			p {
				font-size: 0.28rem;
				font-family: PingFangSC-Regular;
				color: rgba(26, 38, 66, 1);
			}
			.rater_box {
				margin: 0 0.30rem;
				margin-bottom: 0.10rem;
			}
			span {
				font-size: 0.24rem;
				font-family: PingFangSC-Medium;
				color: rgba(255, 123, 17, 1);
			}
		}
		.store_box {
			height: 2.50rem;
			padding: 0 0.20rem;
			box-sizing: border-box;
			background-color: white;
			display: flex;
			flex-direction: column;
			.top {
				height: 0.87rem;
				display: flex;
				align-items: center;
				padding-left: 0.10rem;
				position: relative;
				img {
					width: 0.36rem;
					height: 0.36rem;
					margin-right: 0.1rem;
				}
			}
			.top:after {
				content: " ";
				position: absolute;
				left: 0;
				bottom: 0;
				right: 0;
				height: 1px;
				border-top: 1px solid #E1E1E1;
				color: #E1E1E1;
				-webkit-transform-origin: 0 0;
				transform-origin: 0 0;
				-webkit-transform: scaleY(0.5);
				transform: scaleY(0.5);
				left: 0px;
			}
			.bottom {
				flex: 1;
				display: flex;
				justify-content: center;
				flex-direction: column;
				padding-left: 0.10rem;
			}
		}
		.submit_box {
			height: 0.94rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			background-color: white;
			padding-left: 0.20rem;
			box-sizing: border-box;
			.btn {
				width: 2.40rem;
				height: 0.94rem;
				line-height: 0.94rem;
				text-align: center;
				background: rgba(51, 111, 255, 1);
				font-size: 0.28rem;
				font-family: PingFangSC-Regular;
				color: rgba(255, 255, 255, 1);
			}
		}
	}
</style>
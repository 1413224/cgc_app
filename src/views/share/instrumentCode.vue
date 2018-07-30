<template>
	<section style="height: 100%;background: #fff;">
		<div class="wrapper" ref="wrapper">
			<div class="content">
				<settingHeader :title="title"></settingHeader>
				<div class="top">
					<div class="left">
						<p>{{infoData.goodsName}}</p>
						<p class="tag">{{infoData.shortName}}</p>
						<div class="p3" @click="toDetail(infoData.enterpriseId)">
							<span>{{infoData.name}}</span>
							<p class="arrow"></p>
						</div>
					</div>
					<div class="right">
						<div @click="$router.push({path:'/share/pintroduce'})">
							<img src="../../assets/images/share/pd.png">
							<span>产品简介</span>
						</div>
						<div @click="$router.push({path:'/share/guidance'})">
							<img src="../../assets/images/share/direction.png">
							<span>使用指导</span>
						</div>
					</div>
				</div>

				<div class="codeTitle">
					<p>可使用通用积分付款</p>
					<div class="forword" @click="$router.push({path:'/member/purse/recharge'})">
						<span>前往充值</span>
						<img src="../../assets/images/share/arrow.png">
					</div>
				</div>

				<div class="price">
					<div class="select">请选择价格套餐</div>
					<div class="item" v-for="(item,index) in infoData.list" :key="index">
						<div class="left">
							<p>{{ item.serviceTime}}</p>
							<p>{{ item.skuName}}</p>
						</div>
						<div class="right">
							<div class="money">
								<p>{{ item.price}} <span>元</span></p>
								<p v-if="item.content != ''">{{ item.content}}</p>
							</div>
							<div class="purchase" @click="toBuy(item.skuId)">购买</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import settingHeader from '../../components/setting_header'
	import BScroll from 'better-scroll'
	export default {
		data() {
			return {
				title: "仪器扫码",
				infoData: {},
				equipNumber:''
			}

		},
		components: {
			settingHeader,
		},
		created(){
			this.equipNumber = this.mainApp.getCs('n')?this.mainApp.getCs('n'):''
		},
		mounted() {
			this.getEquipmentInfo()
		},
		computed: {

		},
		methods: {
			toBuy(num) {
				this.$router.push({
					path: '/share/comfirmOrder',
					query: {
						'equipNumber': this.equipNumber, //设备编号
						'skuId': num, //设备价格套餐
					}
				})
			},
			getEquipmentInfo() {
				var _this = this

				_this.$http.get(_this.url.share.getEquipmentInfo, {
					params: {
						userId: _this.$store.state.user.userId,
						equipNumber: _this.equipNumber
					}
				}).then((res) => {
					if(res.data.status == "00000000") {

						for(var i = 0; i < res.data.data.list.length; i++) {
							res.data.data.list[i].serviceTime = _this.getTime(res.data.data.list[i].serviceTime)
						}
						
						_this.infoData = res.data.data
					}
				})
			},
			getTime(value) {
				var secondTime = parseInt(value); // 秒
				var minuteTime = 0; // 分
				var hourTime = 0; // 小时
				if(secondTime > 60) { //如果秒数大于60，将秒数转换成整数
					//获取分钟，除以60取整数，得到整数分钟
					minuteTime = parseInt(secondTime / 60);
					//获取秒数，秒数取佘，得到整数秒数
					secondTime = parseInt(secondTime % 60);
					//如果分钟大于60，将分钟转换成小时
					if(minuteTime > 60) {
						//获取小时，获取分钟除以60，得到整数小时
						hourTime = parseInt(minuteTime / 60);
						//获取小时后取佘的分，获取分钟除以60取佘的分
						minuteTime = parseInt(minuteTime % 60);
					}
				}
				var result = "" + parseInt(secondTime) + "秒";

				if(minuteTime > 0) {
					result = "" + parseInt(minuteTime) + "分钟";
				}
				if(hourTime > 0) {
					result = "" + parseInt(hourTime) + "小时";
				}
				return result;
			},
			toDetail(id) {
				this.$router.push({
					path: '/multi_user_mall',
					query: {
						id: id
					}
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.wrapper {
		height: 100%;
		overflow: hidden;
	}
	
	.top {
		height: 3rem;
		background: linear-gradient(-90deg, rgba(71, 172, 255, 1), rgba(34, 116, 255, 1));
		display: flex;
		color: #fff;
		font-size: 0.24rem;
		.left {
			flex: 1;
			margin: 0.55rem 0.2rem 0.9rem 0.41rem;
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			p:nth-child(1) {
				font-size: 0.36rem;
				line-height: 0.5rem;
				font-weight: bold;
				span {
					font-size: 0.24rem;
				}
			}
			.tag {
				width: 1.6rem;
				padding: 1px 0;
				background: rgba(255, 255, 255, 0.2);
				border-radius: 4px;
				line-height: 0.36rem;
				color: #fff;
				text-align: center;
			}
			.p3 {
				font-size: 0.28rem;
				display: flex;
				align-items: center;
			}
			.arrow {
				width: 7px;
				height: 7px;
				border-top: 1px solid #ffffff;
				border-right: 1px solid #ffffff;
				transform: rotate(45deg);
				display: inline-block;
				margin-left: 0.1rem;
			}
		}
		.right {
			display: flex;
			margin: 0.9rem 0 0 0;
			font-size: 0.22rem;
			div {
				flex: 1;
				text-align: center;
				img {
					width: 50%;
					display: block;
					margin: 0 auto;
					margin-bottom: 0.11rem;
					vertical-align: middle;
				}
			}
		}
	}
	
	.codeTitle {
		background: #D6E2FF;
		height: 0.8rem;
		display: flex;
		color: #336FFF;
		font-size: 0.28rem;
		line-height: 0.8rem;
		p {
			flex: 1;
			margin-left: 0.24rem;
		}
		.forword {
			margin-right: 0.24rem;
			img {
				vertical-align: middle;
				width: 13%;
			}
		}
	}
	
	.price {
		background: #fff;
		font-size: 0.24rem;
		color: #1A2642;
		.select {
			padding: 0.23rem 0 0.23rem 0.24rem;
			font-size: 0.32rem;
			border-bottom: 1px solid #D8DFF0;
			font-weight: bold;
		}
		.item {
			display: flex;
			border-bottom: 1px solid #D8DFF0;
			padding: 0.19rem 0.3rem;
			.left {
				flex: 1;
				p:nth-child(1) {
					font-size: 0.38rem;
					margin-bottom: 0.11rem;
					font-weight: bold;
				}
				p:nth-child(2) {
					line-height: 0.33rem;
				}
			}
			.right {
				display: flex;
				.money {
					flex: 1;
					display: flex;
					justify-content: center;
					flex-direction: column;
					text-align: right;
					p:nth-child(1) {
						color: #FF5365;
						font-size: 0.42rem;
						span {
							font-size: 0.24rem;
						}
					}
					p:nth-child(2) {
						color: #336FFF;
						margin-top: 0.1rem;
					}
				}
				.purchase {
					margin: auto;
					margin-left: 0.4rem;
					width: 0.9rem;
					height: 0.56rem;
					border-radius: 0.28rem;
					border: 1px solid rgba(255, 83, 101, 1);
					color: #FF5365;
					display: flex;
					align-items: center;
					justify-content: center;
					box-sizing: border-box;
				}
			}
		}
	}
</style>
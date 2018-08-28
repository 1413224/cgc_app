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
								<!--<p>消费奖励通用积分</p>-->
							</div>
							<div class="purchase" @click="toBuy(item.skuId)">购买</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="bottomnav">
			<div class="item">
				<div class="wap" @click="goList">
					<img src="../../assets/images/share/cylm.png" alt="">
					<span>产业联盟</span>
				</div>
			</div>
			<div class="item">
				<div class="wap" @click="goDetail">
					<img src="../../assets/images/share/dpu.png" alt="">
					<span>进入店铺</span>
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
				equipNumber: '',
				enterpriseId:''
			}

		},
		components: {
			settingHeader,
		},
		created() {
			this.equipNumber = this.mainApp.getCs('n') ? this.mainApp.getCs('n') : ''
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
							res.data.data.list[i].serviceTime = _this.setServiceTime(res.data.data.list[i].serviceTime)
						}

						_this.infoData = res.data.data
						_this.enterpriseId = res.data.data.enterpriseId
					}
				})
			},
			
			toDetail(id) {
				this.$router.push({
					path: '/multi_user_mall',
					query: {
						id: id
					}
				})
			},
			goList(){
				this.$router.push({
					path:'/share/storelist'
				})
			},
			goDetail(){
				var _this=this
				this.$router.push({
					path:'/multi_user_mall',
					query:{
						id:_this.enterpriseId,
						index:3
					}
				})
			},
			setServiceTime(serviceTime){
				var time_str='';
				if(serviceTime>=3600)
				{
					var hour = Math.floor(serviceTime / 3600);
					time_str += hour + '小时';
					serviceTime -=hour*3600;
				}
				if(serviceTime>=60)
				{
					var minute = Math.floor(serviceTime / 60);
					time_str += minute + '分钟';
					serviceTime -=minute*60;
				}
				if(serviceTime>0)
				{
					time_str += serviceTime + '秒';
				}
				return time_str;
			}
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
				width: 2.8rem;
				font-size: 0.36rem;
				line-height: 0.5rem;
				font-weight: bold;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				-webkit-line-clamp: 1;
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
				span {
					width: 3rem;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					-webkit-line-clamp: 1;
				}
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

	/*底部开始*/
	.bottomnav{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: .8rem;
		line-height: .8rem;
		display: flex;
		/*border-top: 1px solid #000000;*/
		box-shadow: -2px -2px 5px #ccc;
		padding: 5px 0;
		.item{
			flex: 1;
			text-align: center;
			border-left: 1px solid #ccc;
			&:first-child{
				border-left: none;
			}
			.wap{
				img{
					width: .4rem;
					height: .4rem;
					position: relative;
					top: .05rem;
				}
			}
		}
	}
	/*底部结束*/
</style>
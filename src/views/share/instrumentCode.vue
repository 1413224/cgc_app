<template>
	<div>
		<settingHeader :title="title"></settingHeader>
		<div class="sm_box">
			<div class="top_box">
				<p class="tit1">{{infoData.goodsName}}</p>
				<p class="tit2" @click="toDetail(infoData.enterpriseId)">{{infoData.name}}<i class="icon iconfont icon-arrow-right"></i></p>
				<ul class="js_list">
					<li @click="$router.push({path:'/share/guidance'})">
						<div class="yuan"><img :src="'./static/share/syzd.png'" /></div>
						<p>使用指导</p>
					</li>
					<li @click="$router.push({path:'/share/pintroduce'})">
						<div class="yuan"><img :src="'./static/share/cpjj.png'" /></div>
						<p>产品简介</p>
					</li>
					<li @click="$router.push('/share/join')">
						<div class="yuan"><img :src="'./static/share/wyjm.png'" /></div>
						<p>我要加盟</p>
					</li>
				</ul>
				<div class="number_box">NO : {{equipNumber}}</div>
			</div>
			<div>
				<p class="title">套餐选择</p>
				<ul class="tc_box">
					<li v-for="(item,index) in infoData.list" :key="index">
						<div class="left">¥ {{item.price}} </div>
						<div class="right">
							<p class="time">{{item.serviceTime}}</p>
							<p class="type">{{item.skuName}}</p>
							<div class="btn" @click="toBuy(item.skuId)">购买</div>
						</div>
					</li>
				</ul>
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
	</div>
</template>

<script>
	import settingHeader from '@/components/setting_header'
	import BScroll from 'better-scroll'
	export default {
		data() {
			return {
				title: "仪器扫码",
				infoData: {},
				equipNumber: '',
				enterpriseId: '',
				allianceId:''
			}

		},
		components: {
			settingHeader,
		},
		created() {
			this.equipNumber = this.mainApp.getCs('n') ? this.mainApp.getCs('n') : ''

			this.getEquipmentInfo()
			// localStorage.setItem("_chaineid_",_this.enterpriseId)
		},
		mounted() {
			
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
				var _this = this,
						offLine = _this.mainApp.getCs('offLine');

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
						
						_this.$http.get(_this.url.qy.getBasicInfo, {
                 params: {
                    enterpriseId: _this.enterpriseId
                 }
             }).then((res) => {
                 if(res.data.status == "00000000") {
                     if(res.data.data.allianceId) {
                        _this.allianceId = res.data.data.allianceId
                        if(offLine){
                        	localStorage.setItem("_chainsid_",_this.allianceId)
                        }
                     }
                 }
             })

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
			goList() {
				this.$router.push({
					path: '/share/storelist'
				})
			},
			goDetail() {
				var _this = this
				this.$router.push({
					path: '/multi_user_mall',
					query: {
						eid: _this.enterpriseId,
						index: 3
					}
				})
			},
			setServiceTime(serviceTime) {
				var time_str = '';
				if(serviceTime >= 3600) {
					var hour = Math.floor(serviceTime / 3600);
					time_str += hour + '小时';
					serviceTime -= hour * 3600;
				}
				if(serviceTime >= 60) {
					var minute = Math.floor(serviceTime / 60);
					time_str += minute + '分钟';
					serviceTime -= minute * 60;
				}
				if(serviceTime > 0) {
					time_str += serviceTime + '秒';
				}
				return time_str;
			}
		}
	}
</script>

<style lang="less" scoped>
	.sm_box {
		padding: 0.20rem 0.20rem 1.0rem 0.20rem;
		box-sizing: border-box;
		background-color: #F5F6FA;
		.top_box {
			width: 100%;
			height: 4.70rem;
			background: url(../../../static/share/js-bg.png) no-repeat;
			background-size: cover;
			padding: 0.40rem;
			box-sizing: border-box;
			.tit1 {
				font-size: 0.36rem;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
			}
			.tit2 {
				font-size: 0.26rem;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				margin-top: 0.15rem;
				display: flex;
				align-items: center;
				i {
					font-size: 0.3rem;
				}
			}
			.js_list {
				margin-top: 0.30rem;
				display: flex;
				align-items: center;
				justify-content: space-between;
				li {
					flex: 1;
					text-align: center;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					font-size: 0.24rem;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(255, 255, 255, 1);
					.yuan {
						width: 1rem;
						height: 1rem;
						border-radius: 50%;
						background-color: white;
						margin-bottom: 0.18rem;
						display: flex;
						align-items: center;
						justify-content: center;
						img {
							width: 0.40rem;
							height: auto;
						}
					}
				}
			}
			.number_box {
				padding: 0 0.20rem;
				height: 0.46rem;
				line-height: 0.46rem;
				text-align: center;
				background: rgba(10, 14, 70, 0.3);
				border-radius: 23px;
				margin-top: 0.30rem;
				font-size: 0.22rem;
				font-family: PingFang-SC-Medium;
				font-weight: bold;
				color: rgba(255, 255, 255, 1);
				display: inline-block;
				float: right;
			}
		}
		.title {
			font-size: 0.36rem;
			font-family: PingFang-SC-Bold;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
			padding-left: 0.35rem;
		}
		.tc_box {
			margin-top: 0.30rem;
			li {
				width: 100%;
				height: 2.12rem;
				background: rgba(255, 255, 255, 1);
				border-radius: 8px;
				margin-bottom: 0.20rem;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0.36rem 0;
				box-sizing: border-box;
				.left {
					width: 2.29rem;
					height: 100%;
					border-right: 1px dashed rgba(168, 168, 168, 1);
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 0.48rem;
					font-weight: bold;
					color: rgba(255, 83, 101, 1);
				}
				.right {
					flex: 1;
					height: 100%;
					padding: 0.10rem 0.36rem;
					box-sizing: border-box;
					position: relative;
					display: flex;
					justify-content: space-between;
					flex-direction: column;
					.time {
						font-size: 0.38rem;
						font-weight: bold;
						color: rgba(51, 51, 51, 1);
					}
					.type {
						font-size: 0.24rem;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(168, 168, 168, 1);
					}
					.btn {
						position: absolute;
						top: 50%;
						right: 5%;
						transform: translate(-5%, -50%);
						width: 1.10rem;
						height: 0.56rem;
						line-height: 0.56rem;
						text-align: center;
						background: rgba(51, 111, 255, 1);
						border-radius: 14px;
						font-size: 0.24rem;
						font-family: PingFang-SC-Medium;
						font-weight: bold;
						color: rgba(255, 255, 255, 1);
					}
				}
			}
		}
	}
	/*底部开始*/
	
	.bottomnav {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 1rem;
		display: flex;
		background: rgba(255, 255, 255, 1);
		box-shadow: 4px 0px 16px rgba(217, 223, 240, 1);
		padding: 0.20rem 0;
		box-sizing: border-box;
		.item {
			flex: 1;
			text-align: center;
			border-left: 1px solid #ccc;
			&:first-child {
				border-left: none;
			}
			.wap {
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 0.26rem;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(53, 53, 53, 1);
				img {
					width: .36rem;
					height: auto;
					margin-right: 0.1rem;
				}
			}
		}
	}
	/*底部结束*/
</style>
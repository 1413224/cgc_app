<template>
	<section>
		<div class="three" :class="{'b_whtie':fuwuData.length == 0}">
			<div class="top2">
				<div class="left">
					<img class="store-logo" v-if="info.logo" :src="info.logo.original?info.logo.original:'./static/shop/storeLogo.png'">
					<div class="middle" @click="navigation">
						<p>{{info.enterpriseName}}</p>
						<div>
							<img class="left-img" :src="'./static/images/b-address.png'">
							<p>{{info.address}}</p>
							<img class="right-img" :src="'./static/images/b-right.png'">
						</div>
					</div>
				</div>
				<div class="right">
					<p @click="changeAlliance(info.allianceId)">{{isAlliance?'已关注':'关注'}}</p>
					<p>{{info.allianceConcern}}人关注</p>
				</div>
			</div>
			<div class="item" v-for="(item,index) in fuwuData" :key="index" v-if="fuwuData.length > 0">
				<div class="tops" v-if="item.skuList.length > 0">
					<div class="left clearfix">
						<div class="logo fl"><img src="../../../../src/assets/images/share/wfg.png" alt=""></div>
						<p class="title fl">{{item.goodsName}}</p>
						<span class="name">{{item.shortName}}</span>
					</div>
					<div class="right">
						<div @click="goProductDetail">
							<img src="../../../../src/assets/images/share/pd.png">
							<span>产品简介</span>
						</div>
						<!-- <div>
								<img src="../../assets/images/share/direction.png">
								<span>使用指导</span>
							</div> -->
					</div>
				</div>

				<div class="price" v-for="(skuList,index) in item.skuList" :key="index">
					<div class="item">
						<div class="left">
							<p>{{setServiceTime(skuList.serviceTime)}}</p>
							<p>{{skuList.skuName}}</p>
						</div>
						<div class="right">
							<div class="money">
								<p>{{skuList.price}} <span>元</span></p>
								<p v-if="item.content != ''">{{ item.content}}</p>
							</div>
							<div class="purchase" @click="buyEquiment(item.equipList,skuList.skuId)">购买</div>
							<!-- $router.push({path:'/share/comfirmOrder'}) -->
						</div>
					</div>
				</div>
			</div>
			<popup v-model="show" :show-mask="false" class="popwrap">
				<p class="tit">选择设备</p>
				<div class="ov-box">
					<div class="list equipment" v-for="(item,index) in equipList" :key="index" @click="activeEq(index,item.num)">
						<div class="item">
							<p><i>设备编号:</i>{{item.num}}</p>
							<check-icon :value.sync="item.show"></check-icon>
						</div>
					</div>
				</div>

				<div class="bottom">
					<p class="btn btncancel" @click="hidePopup">取消</p>
					<p class="btn btndet" @click="purchase">确定</p>
				</div>
			</popup>
			<div class="fuwu-px" v-if="fuwuData.length == 0">
				<div style="position: relative;width: 100%;height: 100%;">
					<Null status="zwsj" text="暂无企业服务"></Null>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import Null from '@/components/null'
	export default {
		components: {
			Null
		},
		data() {
			return {
				info: {},
				equipList: [],
				equipNumber: '',
				isAlliance: false,
				skuId: '',
				fuwuData: [],
				show: false
			}
		},
		created() {
			this.getBasicInfo()
			// this.getEquipmentInfo()
		},
		beforeRouteLeave(to,from,next){
			if(to.path == "/share/comfirmOrder" 
					&& this.$store.state.page.isLogin != 'true') {
					localStorage.setItem('_buyCommodityFullPath_', from.fullPath)
				}
			next()
		},
		methods: {
			// 获取企业详情
			getBasicInfo() {
				var _this = this

				_this.$http.get(_this.url.qy.getBasicInfo, {
					params: {
						enterpriseId: _this.$route.query.eid
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.info = res.data.data
						_this.allianceId = res.data.data.allianceId
						_this.getEquipmentInfo(_this.allianceId)
						if(this.$store.state.page.isLogin == 'true') {
							this.getAllianceConcern(_this.allianceId)
						}
					}
				})
			},
			//获取企业服务
			getEquipmentInfo(allianceId) {
				var _this = this
				_this.$http.get(_this.url.share.getEquipmentInfo2, {
					params: {
						allianceId: allianceId
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.fuwuData = res.data.data
					}
				})
			},
			// 获取用户是否关注联盟企业角色接口
			getAllianceConcern(allianceId) {
				var _this = this
				_this.$http.get(_this.url.qy.getAllianceConcern, {
					params: {
						userId: _this.$store.state.user.userId,
						allianceId: allianceId
					}
				}).then((res) => {
					if(res.data.status == '00000000') {
						if(res.data.data.status == 1) {
							_this.isAlliance = true
						} else {
							_this.isAlliance = false
						}
					}
				})
			},
			//改变用户关注
			changeAlliance(id) {
				var _this = this
				if(!_this.isAlliance) {
					var _this = this
					//关注联盟企业
					_this.$http.post(_this.url.user.addConcern, {
						userId: _this.$store.state.user.userId,
						type: 2,
						platformId: _this.url.platformId,
						objectId: id
					}).then((res) => {
						if(res.data.status == "00000000") {
							_this.$vux.toast.show({
								width: '50%',
								type: 'text',
								position: 'middle',
								text: '已关注'
							})
						}
						_this.getAllianceConcern()
						_this.getBasicInfo()
					})
				} else {
					//取消关注联盟企业
					_this.$http.post(_this.url.user.deleteConcern, {
						userId: _this.$store.state.user.userId,
						type: 2,
						concernIds: id
					}).then((res) => {
						if(res.data.status == "00000000") {
							_this.$vux.toast.show({
								width: '50%',
								type: 'text',
								position: 'middle',
								text: '已取消关注'
							})
						}
						_this.getAllianceConcern()
						_this.getBasicInfo()
					})
				}
			},
			goProductDetail() {
				this.$router.push({
					path: '/share/pintroduce'
				})
			},
			buyEquiment(equipList, skuId, length) {
				var _this = this
				_this.equipList = []
				equipList.forEach(function(value) {
					var data = {}
					data.num = value
					data.show = false
					_this.equipList.push(data)
				})
				this.skuId = skuId
				if(equipList.length == 1) {
					this.equipNumber = equipList[0]
					this.purchase()
				} else {
					this.show = true
				}
			},
			hidePopup() {
				this.show = false
				this.skuId = ''
				this.equipNumber = ''
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
			},
			purchase() {
				if(this.equipNumber != '' && this.skuId != '') {
					this.$router.push({
						path: '/share/comfirmOrder',
						query: {
							'equipNumber': this.equipNumber, //设备编号
							'skuId': this.skuId, //设备价格套餐
						}
					})
				} else {
					this.$vux.toast.show({
						width: '50%',
						type: 'text',
						position: 'middle',
						text: '请选择需要开启的设备'
					})
				}

			},
			navigation() {
				var _this = this
				var marker = new AMap.Marker({
					position: [_this.info.lng, _this.info.lat]
				})

				marker.markOnAMAP({
					position: marker.getPosition(),
					name: _this.info.address //name属性在移动端有效
				})
			},
			activeEq(i, equipNumber) {
				var _this = this
				_this.equipList.forEach(function(index, value, array) {
					_this.equipList[value].show = false
					_this.equipList[i].show = true
				})
				this.equipNumber = equipNumber
			},
		}
	}
</script>
<style lang="less" scoped>
	.fuwu-px {
		position: fixed;
		height: 100%;
		width: 100%;
		background-color: white;
		.null_box {
			position: absolute;
			top: 30%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
	
	.b_whtie {
		background-color: white;
	}
	
	.multi_user_mall_box .three {
		padding-bottom: 1.50rem;
		.top2 {
			height: 2rem;
			background-color: white;
			background-size: cover;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 0.20rem;
			box-sizing: border-box;
			.left {
				display: flex;
				align-items: center;
				.store-logo {
					width: 1.20rem;
					height: 1.20rem;
					margin-right: 0.16rem;
					background-color: rgba(213, 213, 214, 0.35);
				}
				.middle {
					p:nth-child(1) {
						font-size: 0.32rem;
						font-family: PingFangSC-Medium;
						color: #1A2642;
						margin-bottom: 0.23rem;
					}
					div {
						display: flex;
						align-items: center;
						.left-img {
							width: 0.28rem;
							height: 0.28rem;
						}
						p {
							width: 3.4rem;
							font-size: 0.24rem;
							font-family: PingFangSC-Regular;
							color: #1A2642;
							margin: 0 0.07rem;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
						}
						.right-img {
							width: 0.16rem;
							height: 0.16rem;
						}
					}
				}
			}
			.right {
				p:nth-child(1) {
					width: 1.16rem;
					height: 0.46rem;
					line-height: 0.46rem;
					text-align: center;
					border-radius: 33px;
					/*border: 1px solid #1A2642;*/
					background-color: #336FFF;
					color: white;
					font-size: 0.24rem;
					font-family: PingFangSC-Regular;
					/*color: #1A2642;*/
				}
				p:nth-child(2) {
					margin-top: 0.10rem;
					font-size: 0.20rem;
					font-family: PingFangSC-Regular;
					color: #1A2642;
					text-align: center;
				}
			}
		}
	}
	
	.multi_user_mall_box .no_data1 {
		height: 100%;
		width: 100%;
		background-color: white;
		overflow: hidden;
		position: fixed;
		top: 0;
		bottom: 0;
		.pr {
			height: 100%;
			width: 100%;
			position: relative;
			.no_data {
				position: absolute;
				top: 30%;
				left: 50%;
				transform: translate(-50%, -30%);
			}
		}
	}
	/*服务开始*/
	
	.tops {
		height: 3rem;
		/*background: linear-gradient(-90deg, rgba(71, 172, 255, 1), rgba(34, 116, 255, 1));*/
		background: url(../../../../src/assets/images/multi_user_mall/shop-bg.png) no-repeat;
		background-size: cover;
		display: flex;
		color: #fff;
		font-size: 0.24rem;
		margin-top: 0.20rem;
		.left {
			margin: 0.55rem 0.2rem 0rem 0.41rem;
			width: 5.5rem;
			.logo {
				width: 1.5rem;
				height: 1.5rem;
				img {
					width: 100%;
					height: 100%;
					border-radius: 5px;
				}
			}
			p.title {
				font-size: 0.36rem;
				padding-top: .2rem;
				padding-left: .1rem;
				font-weight: bold;
				span {
					font-size: 0.24rem;
				}
			}
			.name {
				background: #618CF0;
				color: #fff;
				padding: 2px 10px;
				display: inline-block;
				border-radius: 3px;
				margin-top: 5px;
				margin-left: 5px;
			}
		}
		.right {
			margin: 0.9rem 0 0 0;
			font-size: 0.22rem;
			text-align: center;
			div {
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
	
	.eqnum {
		/*color: #f00;*/
		font-size: .14rem;
		span {
			font-size: .36rem;
			font-weight: bold;
			position: relative;
			top: 2px;
		}
	}
	
	.popwrap {
		background: #fff;
		height: 7.36rem !important;
		padding-bottom: 1rem;
		.ov-box {
			height: 6rem;
			overflow-y: auto;
		}
		.item {
			width: 100%;
			height: 1.4rem;
			border: 1px solid #90A2C7;
			border-radius: 3px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 0.40rem;
			box-sizing: border-box;
			background: rgba(249, 250, 255, 1);
			p {
				font-size: 0.42rem;
				font-family: PingFangSC-Medium;
				color: rgba(26, 38, 66, 1);
				i {
					font-size: 0.20rem;
					font-family: PingFangSC-Regular;
					color: rgba(26, 38, 66, 1);
					margin-right: 0.10rem;
				}
			}
		}
		.tit {
			font-size: .32rem;
			color: rgba(34, 34, 34, 1);
			text-align: center;
			margin: .4rem 0;
		}
		.bottom {
			width: 100%;
			height: .9rem;
			/*position: fixed;*/
			/*bottom: 0;*/
			display: flex;
			border-top: 1px solid #eee;
			.btn {
				flex: 1;
				text-align: center;
				line-height: .9rem;
				font-size: .28rem;
			}
			.btncancel {
				background: #fff;
			}
			.btndet {
				background: #336FFF;
				color: #fff;
			}
		}
		.list {
			padding: 0 .3rem;
			margin-bottom: .2rem;
		}
		.checkwap {
			padding-left: .4rem;
			padding-top: .22rem;
			.num {
				font-weight: bold;
				font-size: .42rem;
			}
		}
	}
	/*服务结束*/
</style>
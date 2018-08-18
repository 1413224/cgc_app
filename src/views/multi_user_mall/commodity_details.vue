<template>
	<section class="commodity-details-box">
		<settingHeader :title="title"></settingHeader>
		<div class="goods-banner-box">
			<div class="swiper-inner">
				<swiper :options="swiperOption">
					<swiper-slide v-for="(item, index) in goodsTcList" :key="index">
						<img :src="item">
					</swiper-slide>
					<div class="swiper-pagination" slot="pagination"></div>
				</swiper>
			</div>
		</div>
		<div class="goods-tip-box">
			<div class="top">
				<p class="price">¥{{goodsDetails.minPrice}} <span v-if="Number(goodsDetails.minOriginPrice) > Number(goodsDetails.minPrice)">¥{{goodsDetails.minOriginPrice}}</span></p>
				<div @click="changeGoodsConcern">
					<img :src="goodsDetails.hasConcern == 1?'./static/images/aixin.png':'./static/shop/collection.png'" />
					<p>{{goodsDetails.hasConcern == 1 ?'已关注':'关注'}}</p>
				</div>
			</div>
			<div class="title">
				{{goodsDetails.goodsName}}
			</div>
			<div class="bottom">
				<p>运费：{{goodsDetails.freight == '0.00' ? '免费':goodsDetails.freight}}</p>
				<p>销量：{{goodsDetails.salesNum}}</p>
			</div>
		</div>
		<div class="goods-spec" @click="showGoodsSpec = true">
			<div>
				<span>规格</span>
				<span>{{specItem.skuName?specItem.skuName:'请选择规格'}}</span>
			</div>
			<img :src="'./static/images/b-right.png'" />
		</div>
		<div class="goods-store" @click="toStoreDetails(goodsDetails.enterpriseId)">
			<div class="left">
				<img v-if="goodsDetails.enterpriseLogo" :src="goodsDetails.enterpriseLogo.original?goodsDetails.enterpriseLogo.original:'./static/shop/storeLogo.png'" />
				<div>
					<p class="name">{{goodsDetails.enterpriseName}}</p>
					<p class="gz">{{goodsDetails.enterpriseConcern}}人关注</p>
				</div>
			</div>
			<div class="right">
				<p>进入店铺</p>
				<img :src="'./static/images/b-right.png'" />
			</div>
		</div>
		<div class="goods-information" ref="goodsDetails">
			<div class="title">商品详情</div>
			<div v-html="goodsDetails.detail" class="detail">{{goodsDetails.detail}}</div>
		</div>
		<div class="btn-box">
			<div class="left">
				<div class="service">
					<img src="../../assets/images/shop/customer.png">
					<p>客服</p>
				</div>
				<div class="card">
					<img :src="'./static/images/store-logo.png'">
					<p>店铺</p>
				</div>
			</div>
			<div class="pay-btn" @click="submit">立即购买</div>
		</div>
		<div v-transfer-dom>
			<popup class="goods-popup" v-model="showGoodsSpec" position="bottom">
				<div class="content">
					<div class="goods pr">
						<img v-if="goodsDetails.logo" :src="goodsDetails.logo.original?goodsDetails.logo.original:'./static/images/pr.png'" />
						<div>
							<p class="price">¥{{specItem.price?specItem.price:goodsDetails.minPrice}}</p>
							<p class="stock">库存{{specItem.stock?specItem.stock:goodsDetails.total}}件</p>
							<p class="spec" v-if="specItem.skuName">已选“{{specItem.skuName}}”</p>
						</div>
					</div>
					<div class="ov">
						<div class="spec-box pr">
							<p class="title">请选择规格</p>
							<div class="list">
								<div :class="{'blue':colorIndex == index && item.isChoose}" v-for="(item,index) in goodsDetails.skuList" :key="index" @click="chooseSpec(index,item,'color')">{{item.skuName}}</div>
							</div>
						</div>
						<!--<div class="spec-box pr">
							<p class="title">颜色分类</p>
							<div class="list">
								<div :class="{'blue':sizeIndex == index}" v-for="(item,index) in sizeList" :key="index" @click="chooseSpec(index,'size')">{{item}}</div>
							</div>
						</div>-->
						<div class="number-box pr">
							<p>购买数量</p>
							<x-number v-model="num" @on-change="numChange" :min="0" width="50px" button-style="round"></x-number>
						</div>
					</div>
					<img class="gb-btn" @click="showGoodsSpec = false" :src="'./static/images/gb3.png'">
					<div class="shopping-btn" @click="submit2">立即购买</div>
				</div>
			</popup>
		</div>
	</section>
</template>

<script>
	import settingHeader from '@/components/setting_header'
	import { Popup, Group, Cell, XNumber } from 'vux'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		components: {
			settingHeader,
			swiper,
			swiperSlide,
			Popup,
			Group,
			Cell,
			XNumber
		},
		data() {
			return {
				title: '商品详情',
				swiperOption: {
					loop: true,
					autoplay: {
						delay: 5000,
					},
					pagination: {
						el: '.swiper-pagination',
						type: 'fraction'
					},
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev'
					}
				},
				goodsId: '',
				goodsTcList: [],
				goodsDetails: {},
				showGoodsSpec: false,
				colorIndex: 1115,
				colorList: ['粉色尊贵版粉色尊贵版粉色尊贵版粉色尊贵版', '粉色尊贵版', '粉色尊贵版', '粉色尊贵版', '粉色尊贵版'],
				sizeIndex: 1115,
				sizeList: ['1', '2', '3', '4', '5556'],
				specItem: {},
				num: 1,
				skuId: ''
			}
		},
		created() {
			this.goodsId = this.$route.query.goodsId
			this.getGoodsInfo()
		},
		mounted() {
			
		},
		computed: {},
		methods: {
			changeGoodsConcern() {
				var _this = this
				if(_this.goodsDetails.hasConcern == 1) {
					_this.$http.post(_this.url.user.deleteConcern, {
						userId: _this.$store.state.user.userId,
						type: 1,
						concernIds: _this.goodsId
					}).then((res) => {
						if(res.data.status == "00000000") {
							_this.getGoodsInfo()
						}
					})
				} else {
					_this.$http.post(_this.url.user.addConcern, {
						userId: _this.$store.state.user.userId,
						type: 1,
						platformId: _this.url.platformId,
						objectId: _this.goodsId
					}).then((res) => {
						if(res.data.status == "00000000") {
							_this.getGoodsInfo()
						}
					})
				}

			},
			numChange(val) {
				console.log(val);
			},
			submit() {
				if(JSON.stringify(this.specItem) === '{}') {
					this.showGoodsSpec = true
					return false;
				}

				this.$router.push({
					path: '/multi_user_mall/confirm_order',
					query: {
						'enterpriseName': this.goodsDetails.enterpriseName,
						'goodsLogo': this.goodsDetails.logo.original,
						'goodsName': this.goodsDetails.goodsName,
						'skuName': this.specItem.skuName,
						'minPrice': this.goodsDetails.minPrice,
						'minOriginPrice': this.goodsDetails.minOriginPrice,
						'goodsNum': this.num,
						'skuId': this.skuId
					}
				})

			},
			submit2() {
				if(JSON.stringify(this.specItem) === '{}') {
					this.$vux.toast.show({
						type: 'text',
						text: '请选择商品规格',
						width: '60%',
						position: 'top'
					})
					return false;
				}

				this.$router.push({
					path: '/multi_user_mall/confirm_order',
					query: {
						'enterpriseName': this.goodsDetails.enterpriseName,
						'goodsLogo': this.goodsDetails.logo.original,
						'goodsName': this.goodsDetails.goodsName,
						'skuName': this.specItem.skuName,
						'minPrice': this.goodsDetails.minPrice,
						'minOriginPrice': this.goodsDetails.minOriginPrice,
						'goodsNum': this.num,
						'skuId': this.skuId
					}
				})

			},
			getGoodsInfo() {
				var _this = this
				_this.$http.get(_this.url.goods.getGoodsInfo, {
					params: {
						userId: _this.$store.state.user.userId,
						goodsId: _this.goodsId
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.goodsDetails = res.data.data
						_this.goodsTcList.push(res.data.data.logo.original)

						_this.goodsDetails.skuList.forEach(function(value) {
							value.isChoose = false
						})
						//只有一个规格时直接赋值
						if(res.data.data.skuId) {
							_this.chooseSpec(0, res.data.data.skuList[0], 'color')

						}
					}
				})
			},
			chooseSpec(index, item, className) {

				if(className == 'color') {
					this.colorIndex = index
					item.isChoose = !item.isChoose
				} else if(className == 'size') {
					this.sizeIndex = index
					item.isChoose = !item.isChoose
				}

				if(item.isChoose) {
					this.specItem = item
				} else {
					this.specItem = {}
				}

				this.skuId = this.specItem.skuId
			},
			toStoreDetails(id) {
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
<style lang="less">
	.number-box .weui-cell:before {
		border-top: none;
	}
	
	.goods-information {
		.detail{
			/*background: #333;*/
			width: 100%;
			.content{
				width: 100%;
				img{
					width: 100% !important;
				}
				table{
					width: 100% !important;
					img{
						width: 100%;
					}
				}
				p{
					img{
						width: 100%;
					}
				}
			}

		}
		/*img {
			width: 100%;
		}*/
	}
</style>
<style lang="less" scoped>
	
	
	.goods-popup {
		background-color: white;
		padding: 0 0.20rem;
		box-sizing: border-box;
		.content {
			height: 100%;
			position: relative;
		}
		.ov {
			height: 5rem;
			padding-bottom: 1.5rem;
			margin-bottom: 1.5rem;
			overflow-y: auto;
		}
		.pr {
			position: relative;
		}
		.pr:after {
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
		.goods {
			display: flex;
			align-items: center;
			padding: 0.30rem 0.10rem;
			img {
				width: 2.0rem;
				height: 2.0rem;
				margin-right: 0.30rem;
				border: 1px solid rgba(225, 225, 225, 1);
				border-radius: 4px;
			}
			div {
				.price {
					font-size: 0.32rem;
					font-family: PingFangSC-Medium;
					color: rgba(242, 48, 48, 1);
				}
				.stock {
					font-size: 0.28rem;
					font-family: PingFangSC-Regular;
					color: rgba(144, 162, 199, 1);
					margin: 0.10rem 0;
				}
				.spec {
					font-size: 0.28rem;
					font-family: PingFangSC-Regular;
					color: rgba(26, 38, 66, 1);
				}
			}
		}
		.spec-box {
			padding: 0.20rem 0.10rem;
			.title {
				font-size: 0.28rem;
				font-family: PingFangSC-Regular;
				color: rgba(26, 38, 66, 1);
				margin-bottom: 0.20rem;
			}
			.list {
				display: flex;
				flex-wrap: wrap;
				div {
					margin-bottom: 0.20rem;
					margin-right: 0.20rem;
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 0 0.20rem;
					height: 0.57rem;
					background: rgba(245, 246, 250, 1);
					border-radius: 2px;
					font-size: 0.28rem;
					font-family: PingFangSC-Regular;
					color: rgba(26, 38, 66, 1);
				}
				.blue {
					color: white;
					background: rgba(51, 111, 255, 1);
				}
			}
		}
		.number-box {
			padding: 0 0.10rem;
			box-sizing: border-box;
			height: 1.15rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			p:nth-child(1) {
				font-size: 0.28rem;
				font-family: PingFangSC-Regular;
				color: rgba(26, 38, 66, 1);
			}
		}
		.gb-btn {
			position: absolute;
			right: 0rem;
			top: 0.30rem;
			width: 0.40rem;
			height: 0.40rem;
		}
		.shopping-btn {
			height: 0.95rem;
			line-height: 0.95rem;
			text-align: center;
			background: rgba(51, 111, 255, 1);
			font-size: 0.28rem;
			font-family: PingFangSC-Regular;
			color: rgba(255, 255, 255, 1);
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
		}
	}
	
	.commodity-details-box {
		padding-bottom: 1.20rem;
		background-color: #F5F6FA;
		.goods-banner-box {
			height: 7.50rem;
			.swiper-inner {
				position: relative;
				.swiper-slide {
					height: 7.50rem;
					overflow: hidden;
					img {
						width: 100%;
						height: 100%;
					}
				}
				.swiper-pagination-fraction {
					position: absolute;
					left: 6.42rem!important;
					bottom: 0.32rem;
					width: 0.8rem;
					height: 0.4rem;
					background: rgba(26, 38, 66, 0.1);
					border-radius: 2px;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 0.20rem;
					font-family: PingFangSC-Regular;
					color: rgba(102, 102, 102, 1);
				}
			}
		}
		.goods-tip-box {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 0.25rem 0.30rem;
			box-sizing: border-box;
			background-color: white;
			position: relative;
			.top {
				display: flex;
				align-items: center;
				justify-content: space-between;
				.price {
					font-size: 0.48rem;
					font-family: PingFangSC-Medium;
					color: rgba(242, 48, 48, 1);
					span {
						margin-left: 0.15rem;
						font-size: 0.24rem;
						font-family: PingFangSC-Regular;
						color: rgba(160, 160, 160, 1);
						text-decoration: line-through;
					}
				}
				div {
					text-align: center;
					img {
						width: 0.42rem;
						height: 0.42rem;
					}
					p {
						font-size: 0.20rem;
						font-family: PingFangSC-Regular;
						color: rgba(102, 102, 102, 1);
					}
				}
			}
			.title {
				font-size: 0.32rem;
				font-family: PingFangSC-Semibold;
				color: rgba(53, 53, 53, 1);
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
				margin: 0.2rem 0;
			}
			.bottom {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 0.24rem;
				font-family: PingFangSC-Regular;
				color: rgba(102, 102, 102, 1);
			}
		}
		.goods-tip-box:after {
			content: " ";
			position: absolute;
			left: 0;
			top: 0;
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
		.goods-spec {
			height: 1rem;
			background: rgba(255, 255, 255, 1);
			background-color: white;
			margin-top: 0.20rem;
			margin-bottom: 0.20rem;
			padding: 0 0.30rem;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			div {
				display: flex;
				align-items: center;
				span:nth-child(1) {
					font-size: 0.28rem;
					font-family: PingFangSC-Regular;
					color: rgba(160, 160, 160, 1);
				}
				span:nth-child(2) {
					font-size: 0.28rem;
					font-family: PingFangSC-Regular;
					color: rgba(53, 53, 53, 1);
					margin-left: 0.80rem;
				}
			}
			img {
				width: 0.2rem;
				height: auto;
			}
		}
		.goods-store {
			height: 1.34rem;
			padding: 0 0.30rem;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: white;
			margin-bottom: 0.20rem;
			.left {
				display: flex;
				align-items: center;
				img {
					width: 1.0rem;
					height: 1.0rem;
					margin-right: 0.10rem;
					border-radius: 2px;
					border: 1px solid rgba(225, 225, 225, 1);
				}
				.name {
					font-size: 0.28rem;
					font-family: PingFangSC-Semibold;
					color: rgba(53, 53, 53, 1);
					width: 3.50rem;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
				}
				.gz {
					font-size: 0.24rem;
					font-family: PingFangSC-Regular;
					color: rgba(102, 102, 102, 1);
					margin-top: 0.10rem;
				}
			}
			.right {
				display: flex;
				align-items: center;
				p {
					font-size: 0.28rem;
					font-family: PingFangSC-Regular;
					color: rgba(0, 79, 255, 1);
					margin-right: 0.1rem;
				}
				img {
					width: 0.2rem;
					height: auto;
				}
			}
		}
		.goods-information {
			width: 100%;
			.title {
				height: 1.08rem;
				line-height: 1.08rem;
				text-align: center;
				font-size: 0.28rem;
				font-family: PingFangSC-Regular;
				color: rgba(53, 53, 53, 1);
				background-color: white;
			}
			img {
				width: 100%;
			}
		}
		.btn-box {
			height: 1rem;
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			background-color: white;
			display: flex;
			.left {
				flex: 1;
				display: flex;
				.service,
				.card {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					position: relative;
					img {
						width: 0.42rem;
						height: 0.42rem;
					}
					p {
						font-size: 0.20rem;
						font-family: PingFangSC-Regular;
						color: rgba(115, 134, 173, 1);
						margin-top: 0.05rem;
					}
				}
				.service:after {
					content: " ";
					position: absolute;
					right: 0;
					top: 0;
					width: 1px;
					bottom: 0;
					border-right: 1px solid #E4EBFB;
					color: #E4EBFB;
					-webkit-transform-origin: 100% 0;
					transform-origin: 100% 0;
					-webkit-transform: scaleX(0.5);
					transform: scaleX(0.5);
				}
			}
			.pay-btn {
				width: 4.80rem;
				line-height: 1rem;
				text-align: center;
				font-size: 0.32rem;
				font-family: PingFangSC-Regular;
				color: rgba(255, 255, 255, 1);
				background: rgba(51, 111, 255, 1);
			}
		}
	}
</style>
<template>
	<div class="shopwap" :style="{backgroundColor: configData.backgroundColor}">
		<div v-if="configData.layout == 1">
			<ul class="layout1 clearfix">
				<li v-for="(goods,index) in goodsList" :key="index" :style="liStyle" @click="goDetalis(goods.goodsId)">
					<div class="img-box">
						<img :src="goods.imgUrl" />
					</div>
					<p v-if="configData.showGoodsName" class="goods-name" :style="{color: configData.goodsNameColor}">{{goods.goodsTitle}}</p>
					<p v-if="configData.showOriginalPrice" class="goods-price" :style="{color: configData.originalPriceColor}">
						<span :style="{textDecorationLine: configData.isLineThrough == 1 ? 'line-through' : 'none'}">¥ {{goods.goodsOriginalPrice}}</span>
						<span v-if="configData.originalPriceText != ''">（{{configData.originalPriceText}}）</span>
					</p>
					<p class="goods-sj" :style="{color: configData.priceColor}">
						<span v-if="configData.showPrice">¥ {{goods.goodsPrice}}</span>
						<span v-if="configData.goodsSource == 2"> + {{goods.integral}}信用积分</span>
					</p>
					<p class="goods-xl" v-if="configData.showSalesNum" :style="{color: configData.salesNumColor}">
						<span>销量：{{goods.salesNum}}</span>
						<span v-if="configData.salesNumText != ''">（{{configData.salesNumText}}）</span>
					</p>
				</li>
			</ul>
		</div>
		<div v-if="configData.layout == 2">
			<ul class="layout2">
				<li v-for="(goods,index) in goodsList" :key="index" :style="liStyle" @click="goDetalis(goods.goodsId)">
					<div class="img-box">
						<img :src="goods.imgUrl" />
					</div>
					<div class="warp-box">
						<p v-if="configData.showGoodsName" class="goods-name" :style="{color: configData.goodsNameColor}">{{goods.goodsTitle}}</p>
						<div class="red-box clearfix">
							<div v-if="configData.showOriginalPrice" class="goods-price" :style="{color: configData.originalPriceColor}">
								<p><span>原价：</span>¥ {{goods.goodsOriginalPrice}}</p>
							</div>
							<div class="goods-sj" :style="{color: configData.priceColor}">
								<span v-if="configData.showPrice">会员价：¥ {{goods.goodsPrice}}</span>
								<span v-if="configData.goodsSource == 2"> + {{goods.integral}}信用积分</span>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div v-if="configData.layout == 3">
			<ul class="layout3">
				<li v-for="(goods,index) in goodsList" :key="index" :style="liStyle" @click="goDetalis(goods.goodsId)">
					<div class="img-box">
						<img :src="goods.imgUrl" />
					</div>
					<div class="warp-box">
						<p v-if="configData.showGoodsName" class="goods-name" :style="{color: configData.goodsNameColor}">{{goods.goodsTitle}}</p>
						<div class="red-box clearfix">
							<p v-if="configData.showOriginalPrice" class="goods-price" :style="{color: configData.originalPriceColor}">
								<span :style="{textDecorationLine: configData.isLineThrough == 1 ? 'line-through' : 'none'}">¥ {{goods.goodsOriginalPrice}}</span>
								<span v-if="configData.originalPriceText != ''">（{{configData.originalPriceText}}）</span>
							</p>
							<p class="goods-sj" :style="{color: configData.priceColor}">
								<span v-if="configData.showPrice">¥ {{goods.goodsPrice}}</span>
								<span v-if="configData.goodsSource == 2"> + {{goods.integral}}信用积分</span>
							</p>
							<p class="goods-xl" v-if="configData.showSalesNum" :style="{color: configData.salesNumColor}">
								<span>销量：{{goods.salesNum}}</span>
								<span v-if="configData.salesNumText != ''">({{configData.salesNumText}})</span>
							</p>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			shopConfig: {
				type: Object,
				default: {}
			}
		},
		data () {
			return {
				goodsData: false
			}
		},
		computed: {
			configData () {
				return this.shopConfig.data
			},
			liStyle() {
				return {
					paddingTop: this.configData.paddingVertical + 'px',
					paddingBottom: this.configData.paddingVertical + 'px',
					paddingLeft: this.configData.paddingHorizontal + 'px',
					paddingRight: this.configData.paddingHorizontal + 'px',
				}
			},
			goodsList () {
				return this.goodsData || this.configData.goodsList
			}
		},
		created() {
			console.log(this.shopConfig)
			if (this.shopConfig.data.goodsChoice == 2) {
				this.getGroupGoods()
			}
			if (this.shopConfig.data.goodsChoice == 3) {
				this.getRecommendGoods()
			}
		},
		methods: {
			goDetalis (id) {
				this.$router.push({path: '/multi_user_mall/commodity_details', query: {goodsId: id}})
			},
			getGroupGoods () {
				let _this = this
				_this.$http.get(_this.url.user.getGroupGoods, {
					params: {
						accountId: _this.configData.accountId,
						groupId: _this.configData.groupId,
						displayOrderType: _this.configData.numType,
						goodsNumsType: _this.configData.sortType,
						maxGoodsNums: _this.configData.showNum,
						curPage: 1,
						pageSize: 20
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						let list = res.data.data.list
						_this.goodsData = list.map(obj => {
							return {
								goodsId: obj.goodsId,
								goodsOriginalPrice: obj.originPrice,
								goodsPrice: obj.price,
								goodsTitle: obj.goodsName,
								imgUrl: obj.img.original,
								integral: obj.points,
								salesNum: obj.salesNum
							}
						})
					}
				})
			},
			getRecommendGoods () {
				let _this = this
				_this.$http.get(_this.url.user.getRecommendGoods, {
					params: {
						accountId: _this.configData.accountId,
						groupId: _this.configData.groupId,
						recommendType: _this.configData.rcType,
						allGoods: _this.configData.allGoods,
						hasShopGoods: +_this.configData.goodsSource.includes('hasShopGoods'),
						hasSupplyGoods: +_this.configData.goodsSource.includes('hasSupplyGoods'),
						goodsNumsType: _this.configData.sortType,
						maxGoodsNums: _this.configData.showNum,
						curPage: 1,
						pageSize: _this.configData.sortType == 2 ? _this.configData.showNum : 10,
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						let list = res.data.data.list
						_this.goodsData = list.map(obj => {
							return {
								goodsId: obj.goodsId,
								goodsOriginalPrice: obj.originPrice,
								goodsPrice: obj.price,
								goodsTitle: obj.goodsName,
								imgUrl: obj.img.original,
								integral: obj.points,
								salesNum: obj.salesNum
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.shopwap {
		.layout3 {
			padding: 0 0.1rem;
			box-sizing: border-box;
			li {
				display: flex;
				align-items: center;
				border-bottom: 1px solid #999999;
				div {
					padding: 0.16rem 0 0.1rem;
				}
				.img-box {
					margin-right: 0.3rem;
					img {
						width: 2.8rem;
						height: auto;
					}
				}
			}
		}
		.layout2 {
			padding: 0 0.04rem;
			li {
				margin-bottom: 0.04rem;
				box-sizing: border-box;
				background-color: white;
				.img-box {
					img {
						width: 100%;
						height: auto;
					}
				}
				.warp-box {
					padding: 0.2rem;
					.goods-name {
						font-size: 0.28rem;
						color: #343434;
						font-weight: bold;
					}
					.red-box {
						padding: 0.1rem;
						background-color: red;
						border-radius: 0.06rem;
						margin-top: 0.1rem;
						display: flex;
						align-items: center;
						.goods-price {
							font-size: 0.24rem;
							padding: 0.08rem 0;
						}
						.goods-sj {
							color: rgb(242, 48, 48);
							background-color: white;
							margin-left: 0.2rem;
							font-size: 0.24rem;
							padding: 0.08rem 0.56rem;
							text-align: left;
							flex: 1;
						}
					}
				}
			}
		}
		.layout1 {
			padding: 0 0.04rem;
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			justify-content: space-between;
			li {
				width: 40%;
				flex-grow: 1;
				margin-bottom: 0.04rem;
				padding: 0 0.08rem;
				box-sizing: border-box;
				background-color: white;
				.img-box {
					max-height: 3.62rem;
					line-height: 3.62rem;
					overflow: hidden;
					img {
						width: 100%;
						height: auto;
					}
				}
				.goods-name {
					height: 0.8rem;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					font-size: 0.32rem;
					line-height: 0.4rem;
					margin: 0.2rem 0;
					padding: 0 0.2rem;
					box-sizing: border-box;
				}
				.goods-price {
					font-size: 0.24rem;
					padding: 0.1rem 0.2rem;
					box-sizing: border-box;
				}
				.goods-sj {
					font-size: 0.28rem;
					padding: 0.1rem 0.2rem;
					box-sizing: border-box;
					color: #f23030;
					font-weight: bold;
				}
				.goods-xl {
					font-size: 0.24rem;
					padding: 0 0.2rem 0.1rem;
					box-sizing: border-box;
					color: rgb(102, 102, 102);
				}
			}
			li:nth-child(2n) {
				margin-left: 0.04rem;
			}
		}
	}
</style>
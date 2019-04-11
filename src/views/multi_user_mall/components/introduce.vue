<template>
	<section>
		<div class="four">
			<div class="logo-bg">
				<img :src="info.logo?info.logo.original:'./static/shop/storeLogo.png'" alt="" />
			</div>
			<!--<div class="swiper-inner">
					<swiper :options="swiperOption">
						<swiper-slide v-for="(item, index) in demoList" :key="index">
							<router-link :to="item.url">
								<img :src="item.img">
							</router-link>
						</swiper-slide>
						<div class="swiper-pagination" slot="pagination"></div>
					</swiper>
				</div>-->
			<div class="summary-box">
				<div class="one">
					<div class="left">
						<img :src="info.logo?info.logo.original:'./static/shop/storeLogo.png'" alt="" />
					</div>
					<div class="right">
						<div>
							<p class="title">{{info.name}}</p>
							<p class="sf">
								<span class="lm" v-if="info.isAlliance">联盟企业</span>
								<span class="ly" v-if="info.isChains">联营企业</span>
							</p>
						</div>
						<p class="num" v-if="info.domainCateid1">{{info.domainCateid1}}/{{info.domainCateid2}}</p>
					</div>
				</div>
				<div class="two">
					<div class="bottom" style="border-top: none;">
						<p>店铺编号</p>
						<p class="nukm">{{info.number}}</p>
					</div>
					<div class="top">
						<div class="left" @click="navigation">
							<img :src="'./static/images/dibiao.png'" alt="" />
							<p v-if="info.area">{{info.area.country}}{{info.area.province}}{{info.area.city}}{{info.area.area}}{{info.area.town}}</p>
						</div>
						<div class="right">
							<a :href="'tel://'+info.tel">
								<img :src="'./static/images/dianhua.png'" alt="" />
							</a>
						</div>
					</div>

					<div class="bottom">
						<p>开店时间</p>
						<p>{{info.joinTime | getDate}}</p>
					</div>
					<div class="bottom" @click="toStoreQc(info)">
						<p>店铺二维码</p>
						<p class="code"><img src="../../../../src/assets/images/multi_user_mall/qrcode.png" alt=""><i class="iconfont icon-arrow-right"></i></p>
					</div>
					<div class="bottom" @click="toAlbum">
						<p>店铺图册</p>
						<p class="code"><img src="../../../../src/assets/images/multi_user_mall/tuce.png" alt=""><i class="iconfont icon-arrow-right"></i></p>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				info:{}
			}
		},
		created() {
			this.getBasicInfo()
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
					}
				})
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
			toAlbum() {
				this.$router.push({
					path: '/multi_user_mall/album',
					query: {
						// enterpriseId: this.$route.query.id
						eid: this.$route.query.eid
					}
				})
			},
			toStoreQc(pinfo) {
				var _this = this
				_this.$router.push({
					name: 'store_qrcode',
					query: {
						// enterpriseId: _this.$route.query.id
						eid: _this.$route.query.eid
					}
				})
			},
		}
	}
</script>
<style lang="less" scoped>
	.four {
		padding-bottom: 1.50rem;
		.logo-bg {
			height: 2.80rem;
			overflow: hidden;
			img {
				width: 100%;
				height: 100%;
				transform: scale(3);
				display: block;
				filter: brightness(.5)blur(2px);
			}
		}
	}
	
	.summary-box {
		position: relative;
		z-index: 15;
		padding: 0 0.18rem;
		margin-top: -0.67rem;
		.one {
			width: 7.14rem;
			height: 2.30rem;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
			border-radius: 4px;
			padding: 0.15rem 0.38rem 0.15rem 0.15rem;
			box-sizing: border-box;
			display: flex;
			.left {
				width: 2.0rem;
				height: 2.0rem;
				margin-right: 0.15rem;
				background: rgba(255, 255, 255, 1);
				border-radius: 3px;
				border: 1px solid rgba(216, 223, 240, 1);
				display: flex;
				align-items: center;
				justify-content: center;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.right {
				flex: 1;
				display: flex;
				flex-direction: column;
				/*justify-content: space-between;*/
				div {
					.title {
						font-size: 0.32rem;
						font-family: PingFangSC-Medium;
						color: rgba(26, 38, 66, 1);
						margin-bottom: 0.18rem;
						margin-top: 0.20rem;
						word-wrap: break-word;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						word-break: break-all;
						overflow: hidden;
					}
					.sf {
						span {
							display: inline-block;
							width: 1.02rem;
							height: 0.34rem;
							line-height: 0.34rem;
							text-align: center;
							border-radius: 3px;
							font-size: 0.22rem;
							font-family: PingFangSC-Regular;
							margin-right: 0.20rem;
						}
						.lm {
							color: #336FFF;
							background: rgba(51, 111, 255, 0.1);
							border: 1px solid rgba(51, 111, 255, 1);
						}
						.ly {
							color: #FF5365;
							background: rgba(255, 83, 101, 0.1);
							border: 1px solid rgba(255, 83, 101, 1);
						}
					}
				}
				.num {
					font-size: 0.24rem;
					font-family: PingFangSC-Regular;
					color: rgba(144, 162, 199, 1);
				}
			}
		}
		.two {
			width: 7.14rem;
			/*height: 4.34rem;*/
			background: rgba(255, 255, 255, 1);
			border-radius: 2px;
			margin-top: 0.15rem;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.top {
				height: 1.27rem;
				border-top: 1px solid #D8DFF0;
				padding: 0.40rem 0rem 0.27rem 0.18rem;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				.left {
					flex: 1;
					display: flex;
					align-items: center;
					img {
						width: 0.34rem;
						height: 0.34rem;
						margin-right: 0.1rem;
					}
					p {
						font-size: 0.28rem;
						font-family: PingFangSC-Regular;
						color: rgba(26, 38, 66, 1);
						word-wrap: break-word;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						word-break: break-all;
						overflow: hidden;
					}
				}
				.right {
					width: 1.09rem;
					display: flex;
					align-items: center;
					justify-content: center;
					border-left: 1px solid rgba(216, 223, 240, 1);
					box-sizing: border-box;
					img {
						width: 0.40rem;
						height: auto;
					}
				}
			}
			.middle {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.title {
					height: 0.8rem;
					display: flex;
					align-items: center;
					padding: 0 0.18rem 0 0.28rem;
					box-sizing: border-box;
					p:nth-child(1) {
						font-size: 0.28rem;
						font-family: PingFangSC-Medium;
						color: rgba(26, 38, 66, 1);
						span {
							font-size: 0.28rem;
							font-family: PingFangSC-Regular;
							color: rgba(144, 162, 199, 1);
						}
					}
				}
				.qrcode-box {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
			.bottom {
				height: 1rem;
				border-top: 1px solid rgba(216, 223, 240, 1);
				padding: 0 0.28rem;
				box-sizing: border-box;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: space-between;
				p {
					font-size: 0.28rem;
					font-family: PingFangSC-Regular;
					color: rgba(26, 38, 66, 1);
				}
				.nukm {
					color: #90A2C7;
					width: 4.78rem;
					word-wrap: break-word;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					word-break: break-all;
					overflow: hidden;
					text-align: right;
				}
				.code {
					display: flex;
					align-items: center;
					img {
						width: 0.36rem;
						height: 0.36rem;
						margin-right: 0.40rem;
					}
					i {
						font-size: 0.50rem;
					}
				}
			}
		}
	}
</style>
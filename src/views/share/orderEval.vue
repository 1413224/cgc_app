<template>
	<section class="order_eval_box">
		<settingHeader title="订单评价"></settingHeader>
		<div class="input_box" v-for="(item,index) in goods" :key="index">
			<div class="top">
				<img src="../../assets/images/shop/shop4.png">
				<div class="right">
					<p class="title">{{item.title}}</p>
					<div class="star_box">
						<p>商品评价</p>
						<rater @click.native="starChange(index)" class="rater_box" v-model="item.data.starNum" :min="1" :max="5" active-color="#336FFF" :margin="5" star='<i class="iconfont icon-xingxing"></i>'></rater>
						<span>{{item.data.starText}}</span>
					</div>
				</div>
			</div>
			<x-textarea class="textarea_box" :max="200" placeholder="分享你的购买心得" v-model="item.data.textValue"></x-textarea>
			<ul class="photo_box">
				<li v-for="(img,i) in item.data.imgs" :key="index">
					<img @click="preview(index,i)" :src="img" />
					<img @click="deleteImg(index,i)" class="gbx" :src="'./static/images/del.png'" />
				</li>
				<li @click="imgUpIndex = index" class="last_box" v-if="item.data.imgs.length < 5">
					<img :src="'./static/images/camera.png'" />
					<p>上传照片</p>
					<input type="file" multiple @change="up" accept="image/*" />
				</li>
			</ul>
		</div>
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

		<!--图片预览-->
		<div v-transfer-dom>
			<previewer :list="photoList" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
		</div>
	</section>
</template>

<script>
	import settingHeader from '@/components/setting_header'
	export default {
		components: {
			settingHeader
		},
		data() {
			return {
				goods: [{
						title: '女装U宽腿牛仔裤(水洗产品)',
					},
					{
						title: '女装U宽腿牛仔裤2(水洗产品)',
					},
				],
				imgUpIndex: 0,
				storeStarNum: 1,
				logisticsStarNum: 1,
				storeStarText: '非常差',
				logisticsStarText: '非常差',
				isAnonymous: true,
				photoList: [],
				options: {},
			}
		},
		created() {
			this.goods.forEach((value) => {
				value.data = {
					imgs: [],
					fileIdList: [],
					starNum: 4,
					starText: '好',
					textValue: '',
				}
			})
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
			//图片预览
			preview(index, i) {
				var _this = this

				_this.photoList = []
				_this.goods[index].data.imgs.forEach((value) => {
					var item = {}
					item.src = value
					_this.photoList.push(item)
				})

				this.$nextTick(function() {
					this.$refs.previewer.show(i)
				})

			},
			//上传评价图片
			up(e) {
				var _this = this
				var file = e.target.files

				if((file.length + _this.goods[this.imgUpIndex].data.imgs.length) <= 5) {
					for(var i = 0; i < file.length; i++) {
						var imgdata = file[i]
						var data = {
							type: 'user',
							name: 'pj',
							file: imgdata
						}
						_this.$http.post(_this.url.user.fileuploadImage, data).then((res) => {
							if(res.data.status == '00000000') {
								_this.goods[this.imgUpIndex].data.imgs.push(res.data.data.fileUrl)
								_this.goods[this.imgUpIndex].data.fileIdList.push(res.data.data.fileId)
							}

							console.log(_this.goods)
							_this.$forceUpdate()
						})
					}
				} else if((file.length + _this.goods[this.imgUpIndex].data.imgs.length) > 5) {
					var length = 5 - _this.goods[this.imgUpIndex].data.imgs.length
					for(var i = 0; i < length; i++) {
						var imgdata = file[i]
						var data = {
							type: 'user',
							name: 'pj',
							file: imgdata
						}
						_this.$http.post(_this.url.user.fileuploadImage, data).then((res) => {
							if(res.data.status == '00000000') {
								_this.goods[this.imgUpIndex].data.imgs.push(res.data.data.fileUrl)
								_this.goods[this.imgUpIndex].data.fileIdList.push(res.data.data.fileId)
							}
							console.log(_this.goods)
							_this.$forceUpdate()
						})
					}
				}

			},
			//删除评价图片
			deleteImg(index, i) {
				this.goods[index].data.imgs.splice(i, 1)
				this.goods[index].data.fileIdList.splice(i, 1)
				this.$forceUpdate()
				console.log(this.goods[index].data)
			},
			//星星改变
			starChange(index) {
				this.$nextTick(function() {
					if(this.goods[index].data.starNum == 1) {
						this.goods[index].data.starText = '非常差'
					} else if(this.goods[index].data.starNum == 2) {
						this.goods[index].data.starText = '差'
					} else if(this.goods[index].data.starNum == 3) {
						this.goods[index].data.starText = '一般'
					} else if(this.goods[index].data.starNum == 4) {
						this.goods[index].data.starText = '好'
					} else if(this.goods[index].data.starNum == 5) {
						this.goods[index].data.starText = '非常好'
					}

					this.$forceUpdate()
				})
			}
		}
	}
</script>
<style lang="less">
	.textarea_box {
		textarea {
			height: 2.80rem;
		}
	}
	
	.submit_box {
		.vux-check-icon {
			padding-left: 0.20rem;
			box-sizing: border-box;
			span {
				font-size: 0.24rem!important;
				font-family: PingFangSC-Regular!important;
				color: rgba(34, 34, 34, 1)!important;
			}
		}
	}
</style>

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
		.input_box {
			padding: 0.20rem;
			box-sizing: border-box;
			background-color: white;
			margin-bottom: 0.20rem;
			.top {
				display: flex;
				align-items: center;
				padding: 0 0 0.25rem 0.10rem;
				img {
					width: 1.0rem;
					height: 1.0rem;
					margin-right: 0.20rem;
				}
				.right {
					padding-top: 0.05rem;
					.title {
						font-size: 0.28rem;
						font-family: PingFangSC-Regular;
						color: rgba(115, 134, 173, 1);
						margin-bottom: 0.05rem;
					}
				}
			}
			.textarea_box {
				padding: 0.20rem 0.10rem;
				box-sizing: border-box;
				font-size: 0.28rem;
				font-family: PingFangSC-Regular;
				color: rgba(26, 38, 66, 1);
				textarea {
					height: 2.80rem;
				}
			}
			.weui-cell:before {
				left: 0!important;
			}
			.photo_box {
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				li {
					width: 1.3rem;
					height: 1.3rem;
					display: flex;
					align-items: center;
					justify-content: center;
					position: relative;
					img {
						width: 100%;
						height: 100%;
					}
					.gbx {
						position: absolute;
						right: -0.05rem;
						top: -0.05rem;
						width: 0.30rem;
						height: 0.30rem;
						/*z-index: 222;*/
					}
				}
				li:not(:last-child) {
					margin-right: 0.15rem;
				}
				.last_box {
					background: rgba(245, 246, 250, 1);
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					font-size: 0.22rem;
					font-family: PingFangSC-Regular;
					color: rgba(144, 162, 199, 1);
					position: relative;
					border-radius: 2px;
					input {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						opacity: 0;
						z-index: 15;
					}
					img {
						width: 0.86rem;
						height: 0.86rem;
					}
				}
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
<template>
	<div class="order_sunburn_box">
		<settingHeader title="评价晒单"></settingHeader>
		<div class="input_box">
			<div class="top border_b">
				<img src="../../assets/images/shop/shop4.png">
				<div class="right">
					<p class="title">已评价</p>
					<div class="star_box">
						<p>商品评价</p>
						<rater disabled class="rater_box" v-model="starNum" active-color="#336FFF" :margin="5" star='<i class="iconfont icon-xingxing"></i>'></rater>
					</div>
				</div>
			</div>
			<div class="text_box">
				这是我以前的评价，不可再次编辑，只做预览。这是我以前的评价，不可再次编辑，只做预览
			</div>
		</div>

		<div class="zp_box">
			<div class="title border_b">追加晒图</div>
			<ul class="photo_box">
				<li v-for="(img,i) in imgs" :key="index">
					<img @click="preview(index,i,imgs)" :src="img" />
					<img @click="deleteImg(index,i)" class="gbx" :src="'./static/images/del.png'" />
				</li>
				<li @click="imgUpIndex = index" class="last_box" v-if="imgs.length < 5">
					<img :src="'./static/images/camera.png'" />
					<p>上传照片</p>
					<input type="file" multiple @change="up" accept="image/*" />
				</li>
			</ul>

			<!--图片预览-->
			<div v-transfer-dom>
				<previewer :list="photoList" ref="previewer" :options="options"></previewer>
			</div>
		</div>

		<div class="submit_btn">提交评价</div>
	</div>
</template>

<script>
	import settingHeader from '@/components/setting_header'
	import { Rater, XTextarea, Previewer } from 'vux'

	export default {
		data() {
			return {
				starNum: 5,
				textValue: '',
				imgs: [],
				fileIdList: [],
				photoList: [],
				options: {},

				imgsList: ['./static/images/camera.png', './static/images/camera.png']
			}

		},
		components: {
			settingHeader,
			Rater,
			XTextarea,
			Previewer
		},
		created() {

		},
		mounted() {

		},
		computed: {

		},
		methods: {
			//图片预览
			preview(index, i, array) {
				var _this = this

				_this.photoList = []
				array.forEach((value) => {
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

				if((file.length + _this.imgs.length) <= 5) {
					for(var i = 0; i < file.length; i++) {
						var imgdata = file[i]
						var data = {
							type: 'user',
							name: 'pj',
							file: imgdata
						}
						_this.$http.post(_this.url.user.fileuploadImage, data).then((res) => {
							if(res.data.status == '00000000') {
								_this.imgs.push(res.data.data.fileUrl)
								_this.fileIdList.push(res.data.data.fileId)
							}
							_this.$forceUpdate()
						})
					}
				} else if((file.length + _this.imgs.length) > 5) {
					var length = 5 - _this.imgs.length
					for(var i = 0; i < length; i++) {
						var imgdata = file[i]
						var data = {
							type: 'user',
							name: 'pj',
							file: imgdata
						}
						_this.$http.post(_this.url.user.fileuploadImage, data).then((res) => {
							if(res.data.status == '00000000') {
								_this.imgs.push(res.data.data.fileUrl)
								_this.fileIdList.push(res.data.data.fileId)
							}
							_this.$forceUpdate()
						})
					}
				}

			},
			//删除评价图片
			deleteImg(index, i) {
				this.imgs.splice(i, 1)
				this.fileIdList.splice(i, 1)
				this.$forceUpdate()
			},
		}
	}
</script>
<style lang="less" scoped>
	.order_sunburn_box {
		background-color: #F5F6FA;
		padding-bottom: 1.50rem;
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
				position: relative;
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
		}
		.border_b:after {
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
		.text_box {
			padding: 0.20rem 0.10rem;
			box-sizing: border-box;
			font-size: 0.28rem;
			font-family: PingFangSC-Regular;
			color: #1A2642;
		}
		.zp_box {
			margin-top: 0.20rem;
			background-color: white;
			padding: 0 0.20rem;
			box-sizing: border-box;
			.title {
				height: 0.89rem;
				line-height: 0.89rem;
				font-size: 0.28rem;
				font-family: PingFangSC-Medium;
				color: rgba(26, 38, 66, 1);
				position: relative;
			}
			.photo_box {
				padding-bottom: 0.28rem;
				padding-top: 0.28rem;
			}
		}
		.submit_btn {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			text-align: center;
			height: 0.94rem;
			line-height: 0.94rem;
			background: rgba(51, 111, 255, 1);
			font-size: 0.28rem;
			font-family: PingFangSC-Regular;
			color: rgba(255, 255, 255, 1);
		}
	}
</style>
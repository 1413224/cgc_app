<template>
	<!-- <div class="real-box">
		<scoreheader :title="title"></scoreheader>
		<group gutter="0">
			<x-input class="input-item" v-model="name" placeholder="输入真实姓名" type="text" :required="true"></x-input>
			<x-input class="input-item" v-model="idNum" placeholder="输入身份证号" type="text" :max="18" :required="true"></x-input>
		</group>
		<div class="img-box">
			<div class="one">
				<div class="t">
					<p v-if="justImages == ''">身份证正面照片</p>
					<div class="img-bg" v-if="justImages">
						<img :src="justImages" alt="" />
					</div>
				</div>
				<input class="upinput" type="file" name="" id="" value="" @change="just" multiple ref="just" />
			</div>
			<div class="one">
				<div class="t">
					<p>身份证反面照片</p>
					<div class="img-bg" v-if="backImages">
						<img :src="backImages" alt="" />
					</div>
				</div>
				<input class="upinput" type="file" name="" id="" value="" @change="back" ref="back" />
			</div>
			<div class="one">
				<div class="t">
					<p>本人手持身份证正面照</p>
					<div class="img-bg" v-if="userImages">
						<img :src="userImages" alt="" />
					</div>
				</div>
				<input class="upinput" type="file" name="" id="" value="" @change="user" ref="user" />
			</div>
		</div>
		<div class="tip">
			<p v-if="status == 0">（图片文字清晰,四角齐全）</p>
			<x-button v-if="status == 0" class="add-btn" @click.native="submit" :show-loading="isload">{{isload?'正在上传':'保存'}}</x-button>
			<div v-if="status == 1" class="two-btn bounceInRight animated">
				<div @click="$router.go(-1)">返回</div>
				<div @click="reexamination">重新递交审核</div>
			</div>
			<div v-if="status == 3" class="add-btn" :class="{'b-g':status == 3}">受理中，请耐心等待</div>
		</div>
		<div v-transfer-dom>
			<loading :show="showDialogStyle" :text="text1"></loading>
		</div>
	</div> -->
	<!-- <scoreheader :title="title"></scoreheader> -->
	<div class="ocrwrap">
		<x-header :left-options="{showBack: false}">实名验证</x-header>
		<div class="headwrap" v-if="suc">
			<img src="../../../assets/images/user/success.png" alt="">
			<p class="cont">认证成功</p>
		</div>
		<div class="headwrap faile" v-if="!suc">
			<img src="../../../assets/images/user/faile.png" alt="">
			<p class="cont">认证失败</p>
			<div class="btnswrap clearfix">
				<p class="back fl" @click="backrz">返回</p>
				<p class="again fr">重新认证</p>
			</div>
			<div class="tip">
				<p class="tit">小提示：</p>
				<p>1.请将脸放在指定范围内</p>
				<p>2.请保持正对手机，光线充足</p>
				<p>3.请按系统提示进行操作</p>
				<p>4.请保持良好的网络环境</p>
			</div>
		</div>
		<div class="suc" v-if="suc">
			<div class="xian"></div>
			<div class="xinxi">
				<group>
				<!-- is-link link='/member/setting/real' -->
					<cell class="list-item" title="证件类型">身份证</cell>
					<cell class="list-item" title="真实姓名">{{infom.name}}</cell>
					<cell class="list-item" title="身份证号码">{{infom.idCard}}</cell>
					<cell class="list-item" title="有效期限">{{infom.dateEnd}}</cell>
				</group>
			</div>
			<div class="btnwrap">
				<p class="back" @click="backrz">返回</p>
			</div>
		</div>
	</div>

</template>

<script>
// Loading, XCircle, Range, Icon, XDialog,XButton,XInput,
	import {  Group,  Cell, XHeader, XInput, XButton, XCircle, Icon, XDialog, Loading} from 'vux'
	import scoreheader from '../../../components/setting_header'
	export default {
		components: {
			scoreheader,
			XInput,
			Group,
			XButton,
			Cell,
			XCircle,
			Range,
			Icon,
			XDialog,
			Loading
		},
		data() {
			return {
				title: '实名认证',
				showDialogStyle: false,
				isload: false,
				status: 0, //0 上传审核  1 未受理   2 已受理  3 审核结果
				text1: 'Processing',
				name: '',
				idNum: '',
				justImages: '',
				backImages: '',
				userImages: '',

				suc:false,
				infom:''
			}
		},
		mounted() {
			var _this = this
			_this.getOCRResult()
		},
		methods: {
			/*just(e) {
				var _this = this
				_this.justImages = ''
				_this.justPr = 0
				var reader = new FileReader();
				var file = e.target.files[0];
				reader.readAsDataURL(file); // 读出 base64
				reader.onloadend = function(e) {
					// 图片的 base64 格式, 可以直接当成 img 的 src 属性值        
					var dataURL = reader.result;
					_this.justImages = e.target.result

				};

				var total = file.size;
				reader.onprogress = function(e) {
					_this.justPr = (e.loaded / total) * 100
				}
			},
			back(e) {
				var _this = this
				var reader = new FileReader();
				var file = e.target.files[0];
				reader.readAsDataURL(file); // 读出 base64
				reader.onloadend = function(e) {
					// 图片的 base64 格式, 可以直接当成 img 的 src 属性值        
					var dataURL = reader.result;
					_this.backImages = e.target.result
				};
			},
			user(e) {
				var _this = this
				var reader = new FileReader();
				var file = e.target.files[0];
				reader.readAsDataURL(file); // 读出 base64
				reader.onloadend = function(e) {
					// 图片的 base64 格式, 可以直接当成 img 的 src 属性值        
					var dataURL = reader.result;
					_this.userImages = e.target.result
				};
			},
			submit() {
				var _this = this
				//				_this.showDialogStyle = true
				//				tick(0, (percent) => {
				//					if(percent === 100) {
				//						_this.showDialogStyle = false
				//						_this.status = 1
				//
				//						_this.$dialog.show({
				//							type: 'success',
				//							headMessage: '信息提交成功',
				//							message: '',
				//							buttons: ['我知道了'],
				//							delay: 2000
				//						})
				//						return
				//					} else {
				//						_this.text1 = '上传了' + `${percent}%`
				//					}
				//				})
				_this.isload = true
				setTimeout(function() {
					_this.status = 1
					_this.$dialog.show({
						type: 'success',
						headMessage: '信息提交成功',
						message: '',
						buttons: ['我知道了'],
						delay: 2000,
						canel() {
							console.log(123)
						},
						confirm() {

						}
					})
					_this.isload = false
				}, 1500)

			},
			reexamination() {
				this.status = 0
				this.justImages = ''
				this.backImages = ''
				this.userImages = ''
				this.idNum = ''
				this.name = ''
			},*/
			getOCRResult(){
				var _this = this
				
				_this.$http.get(_this.url.ocr.getOCRResult,{
					params:{
						userId:_this.$store.state.user.userId
					}
				}).then((res) => {
					if(res.data.status == "00000000"){
						console.log(res.data.data)
						_this.suc = true
						_this.infom = res.data.data
					}else if(res.data.status == "use-OCR-0001"){
						/*_this.$router.push({
							path:"/user/reg"
						});*/
					}else{

					}
				});
			},
			backrz(){
				this.$router.push({
					path:"/member/info/index"
				});
			}
		},
		watch: {
			status() {
				if(this.status == 0) {
					document.title = '身份认证'
				} else if(status == 1) {
					document.title = '审核未受理'
				} else if(status == 2) {
					document.title = '审核已受理'
				} else if(status == 3) {
					document.title = '审核结果'
				}
			}
		}
	}

	function tick(i, cb) {
		setTimeout(function() {
			i++
			cb(i)
			if(i < 100) {
				tick(i, cb)
			}
		}, 20)
	}
</script>

<style lang="less" scoped>
	/* .real-box {
		height: 100%;
		background-color: white;
		.input-item {
			height: 1.02rem;
			font-family: PingFangSC-Regular;
			font-size: 0.28rem;
			color: #90A2C7;
			letter-spacing: 0;
			padding-top: 0;
			padding-bottom: 0;
			box-sizing: border-box;
		}
		.tip {
			padding: 10px 15px;
			ont-family: PingFangSC-Regular;
			font-size: 0.28rem;
			color: #90A2C7;
			letter-spacing: 0;
			.add-btn {
				height: 0.88rem;
				line-height: 0.88rem;
				background: rgba(51, 111, 255, 1);
				margin-top: 0.6rem;
				font-size: 0.28rem;
				text-align: center;
				font-family: MicrosoftYaHei;
				color: rgba(255, 255, 255, 1);
				border-radius: 0!important;
			}
			.b-g {
				background-color: #90a2c7;
			}
		}
		.two-btn {
			display: flex;
			align-items: center;
			justify-content: space-between;
			div {
				width: 2.7rem;
				height: 0.88rem;
				line-height: 0.88rem;
				margin-top: 0.6rem;
				font-size: 0.28rem;
				text-align: center;
				font-family: MicrosoftYaHei;
			}
			div:nth-child(1) {
				border: 1px solid #ddd;
				color: rgba(26, 38, 66, 1);
			}
			div:nth-child(2) {
				background: rgba(51, 111, 255, 1);
				color: rgba(255, 255, 255, 1);
			}
		}
		.img-box {
			display: flex;
			padding: 0.24rem;
			box-sizing: border-box;
			font-size: 0.18rem;
			font-family: MicrosoftYaHei;
			color: rgba(176, 188, 214, 1);
			.one {
				flex: 1;
				padding: 0.1rem;
				box-sizing: border-box;
				position: relative;
				.t {
					display: flex;
					align-items: center;
					justify-content: center;
					height: 1.77rem;
					text-align: center;
					box-sizing: border-box;
					border: 1px dashed #D5D5D6;
					z-index: 11;
					position: relative;
					overflow: hidden;
					font-size: 0.26rem;
					p{
						padding: 0 0.05rem;
						box-sizing: border-box;
					}
					.img-bg {
						z-index: 13;
						width: 100%;
						height: 100%;
						position: absolute;
						top: 0;
						left: 0;
						background-color: white;
						img {
							width: 100%;
							height: 100%;
							position: absolute;
							top: 50%;
							left: 50%;
							transform: translate(-50%, -50%);
						}
					}
				}
				input {
					opacity: 0;
					z-index: 15;
					position: absolute;
					top: 0;
					width: 100%;
					height: 100%;
				}
			}
		}
	} */
</style>

<style lang="less" scoped>
.ocrwrap{
	width: 100%;
	height: 100%;
	background: #fff;
	.headwrap{
		text-align: center;
		background: #fff;
		padding-top: .6rem;
		padding-bottom:.6rem;
		color: #1A2642;
		font-size: .36rem;
		img{
			width: 2.1rem;
			height: 1.9rem;
		}
	}
	.faile{
		img{
			width: 1.82rem;
			height: 2rem;
		}
		.tip{
			border-top:1px solid #D8DFF0;
			position: fixed;
			width: 100%;
			bottom: .6rem;
			padding-left: .6rem;
			padding-top:.5rem;
			.tit{
				font-size: .3rem;
			}
			p{
				text-align: left;
				color: #90A2C7;
				font-size: .28rem;
				margin-bottom:.1rem;
			}
		}
	}
	.xian{
		width: 100%;
		height: .3rem;
		background: #F5F6FA;
	}
	.btnwrap{
		width: 6.18rem;
		height: .88rem;
		font-size: .32rem;
		color: #fff;
		background: #336FFF;
		border-radius:.1rem;
		text-align: center;
		margin:.6rem auto;
		line-height: .88rem;
	}
	.btnswrap{
		width: 5.4rem;
		/*border:1px solid #333;*/
		margin:1rem auto;
		font-size: .32rem;
		.back{
			width: 2.4rem;
			height: .7rem;
			line-height: .7rem;
			background: #fff;
			color: #1A2642;
			margin-left:.4rem;
			border:1px solid #D8DFF0;
			border-radius: .1rem;
		}
		.again{
			width: 2.4rem;
			height: .7rem;
			line-height: .7rem;
			background: #336FFF;
			color: #fff;
			border-radius: 1px solid #336FFF;
			border-radius: .1rem;
		}
	}
}
</style>
<style lang="less">
.ocrwrap{
	.vux-header{
		background-color:#fff;
		.vux-header-title{
			color: #1A2642 !important; 
		}
	}
	.weui-cells{
		font-size: .3rem;
	}
	.weui-cell__ft{
		color: #90a2c7 !important
	}
}
</style>
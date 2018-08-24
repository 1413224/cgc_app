<template>
	<div class="information-box">
		<settingHeader :title="title"></settingHeader>
		<div class="list">
			<group gutter="0">
				<div style="position: relative;">
					<cell class="list-item user-img" title="头像编辑" is-link>
						<div class="up-box">
							<div class="tx">
								<img :src="images?images:'./static/images/mrtx.png'" />
							</div>
						</div>
					</cell>
					<input v-if="isC" class="upinput" id="upinput" type="file" @change="up2" accept="image/*" ref="input" />
				</div>

				<cell class="list-item" title="用户昵称" :value="userInfo.nickname?userInfo.nickname:'未设置'" is-link link="/member/setting/nickname"></cell>
			</group>
			<group>
				<cell class="list-item" title="我的二维码" is-link @click.native="goCode"><img class="code" src="../../../assets/images/member/code@2x.png" /></cell>
				<cell class="list-item user-address" title="地址管理" is-link link="/member/address/index"></cell>
			</group>
			<group>
			<!-- is-link link='/member/setting/real' -->
				<cell class="list-item" title="实名认证" :value="auth?auth:'未认证'" is-link @click.native="getocr()"></cell>
				<cell class="list-item" title="个人档案" is-link link='/member/info/data' primary="content">完整度{{userInfo.percentage?userInfo.percentage:0}}%</cell>
			</group>
		</div>
	</div>
</template>

<script>
	//上传组件
	import { Cell, Group, XInput, Range } from 'vux'
	import settingHeader from '../../../components/setting_header'
	export default {
		data() {
			return {
				title: '个人信息',
				name: "", //用户名
				varmax: 1, //图片最大张数
				images: '', //图片数组
				userInfo: {},
				auth: '',
				isC: true,
				data:''
			}
		},
		created() {

			this.getUserInfo()
			this.getUserAuthInfo()

		},
		mounted() {

		},
		methods: {
			//获取用户信息
			getUserInfo() {
				var _this = this
				_this.$http.get(_this.url.user.getBasicInfo, {
					params: {
						userId: _this.$store.state.user.userId
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.userInfo = res.data.data

						localStorage.setItem('userInfo', JSON.stringify(res.data.data))

						if(res.data.data.avatar) {
							_this.images = res.data.data.avatar.original
						}
					}
				})
			},
			getUserAuthInfo() {
				var _this = this
				_this.$http.get(_this.url.user.getUserAuthInfo, {
					params: {
						userId: _this.$store.state.user.userId
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.auth = res.data.data.auth
					}
				})
			},

			nameChange() {

			},
			ok() {
				this.$refs.name.blur()
			},
			up(e) {
				var _this = this
				var reader = new FileReader();
				var file = e.target.files[0];
				var imgdata = file
				var data = {
					type: 'user',
					name: '1',
					file: imgdata
				}
				_this.$http.post(_this.url.user.fileuploadImage, data).then((res) => {
					if(res.data.status == '00000000') {
						_this.$http.post(_this.url.user.changeAvatar, {
							userId: _this.$store.state.user.userId,
							avatarId: res.data.data.fileId
						}).then((res) => {
							_this.images = res.data.data.original
						})
					}
				})
			},
			up2(e) {
				var _this = this
				_this.isC = false
				_this.$scImg.show({
					panel: true,
					e: e,
					Confirm() {
						_this.isC = true
						_this.getUserInfo()
					},
					Cancel() {
						_this.isC = true
					}
				})
			},
			goCode(){
				this.$router.push({
					path:"/member/purse/qrcode",
					query:{
						index:1,
						text:'推广码'
					}
				})
			},
			getocr(){
				var _this = this

				_this.$http.get(_this.url.ocr.getOCR,{
					params:{
						userId:_this.$store.state.user.userId
					}
				}).then((res) => {
					if(res.data.status == "00000000"){
						_this.data = res.data.data
						if(_this.data.status == 0){
							window.location.href = res.data.data.url
						}else if(_this.data.status == 1){
							
							_this.$router.push({
								// path:'/member/setting/real',
								name:"real",
								params:{
									suc:1
								}
							})
						}else if(_this.data.status == 3){
							_this.$router.push({
								name:"real",
								params:{
									suc:2
								}
							})
						}else if(_this.data.status == 4){
							_this.$vux.toast.show({
								width: '50%',
								type: 'text',
								position: 'top',
								text: '超过当日认证次数上限'
							})
						}else{
							alert("sha")
						}
						
					}
				});
			}
		},
		components: {
			settingHeader,
			XInput,
			Range
		}
	}
</script>

<style lang="less">
	.information-box {
		.list {
			.list-item {
				font-family: PingFangSC-Regular;
				font-size: 0.28rem;
				color: #1A2642;
				letter-spacing: 0;
				height: 1.02rem;
				padding-top: 0!important;
				padding-bottom: 0!important;
				.tx {
					width: 1rem;
					height: 1rem;
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 50%;
					overflow: hidden;
					img {
						vertical-align: middle;
						width: 100%;
						height: 100%;
					}
				}
				.code {
					width: 0.36rem;
					height: 0.36rem;
					vertical-align: middle;
				}
				.input-div {
					padding: 0 15px!important;
					height: 1.02rem;
					.weui-cell__bd>input {
						height: 100%;
						color: rgba(144, 162, 199, 1)!important;
					}
				}
				.weui-cell__ft {
					color: rgba(144, 162, 199, 1)!important;
				}
			}
			.user-img {
				height: 1.5rem;
				position: relative;
				.up-box {
					position: relative;
					width: 1rem;
					height: 1rem;
					overflow: hidden;
					img {
						z-index: 1;
					}
				}
			}
			.upinput {
				opacity: 0;
				z-index: 11;
				position: absolute;
				top: 0;
				right: 0;
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
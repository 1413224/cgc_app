<template>
	<div class="opinion">
		<setting-header :title="title"></setting-header>
		<checklist :max="1" :options="options" @on-change="nameChange"></checklist>
		<div class="tit">请补充详细问题和意见</div>
		<group>
			<x-textarea title="" v-model="opinval" :max="240"></x-textarea>
		</group>
		<div class="up-box">
			<p>请提供相关问题的截图或照片</p>
			<div class="img-box">
				<div class="one" v-for="(item,index) in backImages" @click="cindex(index)">
					<div>
						<img :src="item" alt="" />
					</div>
					<img @click="shanc(index)" class="gbx" src="../../../assets/images/member/gbx.png" />
					<input class="upinput" type="file" @change="cone" />
				</div>
				<div class="one" v-if="backImages.length!=3">
					<div>
						<img src="../../../assets/images/member/p@2x.png" />
					</div>
					<input class="upinput" type="file" multiple @change="back" ref="back" />
				</div>
			</div>

			<div class="tip">
				<div class="add-btn" @click="submit">保存</div>
			</div>
		</div>
	</div>
</template>

<script>
	import settingHeader from '../../../components/setting_header'
	import { Checklist, Group, XTextarea } from 'vux'
	export default {
		components: {
			settingHeader,
			Group,
			Checklist
		},
		data() {
			return {
				title: '意见反馈',
				options: [],
				nameId: '',
				name: '',
				opinval: '',
				backImages: [],
				fileIdList: [],
				pindex: 0,

				curPage: 1,
			}
		},
		created() {
			this.getList()
		},
		methods: {
			submit() {
				var _this = this

				_this.$http.post(_this.url.user.addFeedback, {
					userId: _this.$store.state.user.userId,
					type: '110',
					name: _this.name[0],
					content: _this.opinval,
					thumb: _this.fileIdList.join() + ","
				}).then((res) => {
					if(res.data.status == "00000000") {
						if(res.data.message == 'success') {
							_this.$vux.toast.show({
								width: '50%',
								type: 'text',
								position: 'middle',
								text: '提交成功，感谢您的反馈'
							})
							_this.$router.go(-1)
						}
					}
				})
			},
			getList() {
				var _this = this

				_this.$http.get(_this.url.user.getList, {
					params: {
						userId: _this.$store.state.user.userId,
						type: '110',
						curPage: _this.curPage,
						pageSize: 20,
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						res.data.data.list.forEach((value) => {
							var item = {}
							item.key = value.causeId
							item.value = value.name
							_this.options.push(item)
						})
					}
				})
			},
			nameChange(value, label) {
				this.nameId = value
				this.name = label
			},
			cindex(index) {
				this.pindex = index
			},
			shanc(index) {
				this.backImages.splice(index, 1)
				this.fileIdList.splice(index, 1)
			},
			cone(e) {
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
						_this.$set(_this.backImages, _this.pindex, res.data.data.fileUrl)
						_this.$set(_this.fileIdList, _this.pindex, res.data.data.fileId)
					}
				})
			},
			back(e) {
				var _this = this
				var file = e.target.files
				for(var i = 0; i < file.length; i++) {
					if(file.length > 3) {
						this.$vux.toast.show({
							text: '最多只能上传三张照片',
							type: 'text'
						})
						return
					} else {
						var imgdata = file[i]
						var data = {
							type: 'user',
							name: '1',
							file: imgdata
						}
						_this.$http.post(_this.url.user.fileuploadImage, data).then((res) => {
							if(res.data.status == '00000000') {
								_this.backImages.push(res.data.data.fileUrl)
								_this.fileIdList.push(res.data.data.fileId)
							}
						})
					}
				}
			},
		}
	}
</script>

<style lang="less">
	.opinion {
		height: 100%;
		background: #F5F8F9;
		.weui-cells {
			font-family: PingFangSC-Regular;
			font-size: 0.28rem;
			color: #1A2642;
			line-height: .65rem;
		}
		.weui-cells_checkbox .weui-check:checked+.weui-icon-checked:before {
			color: dodgerblue!important;
		}
		.tit {
			font-family: PingFangSC-Regular;
			font-size: 0.28rem;
			color: #1A2642;
			padding: .26rem .24rem 0;
		}
		.up-box {
			margin-top: 1.17647059em;
			padding: 10px 15px;
			font-size: 0.28rem;
			font-family: PingFangSC-Regular;
			color: rgba(26, 38, 66, 1);
			background-color: white;
			.img-box {
				display: flex;
				padding: 0.24rem 0;
				box-sizing: border-box;
				font-size: 0.18rem;
				font-family: MicrosoftYaHei;
				color: rgba(176, 188, 214, 1);
				.one {
					width: 1.5rem;
					height: 1.5rem;
					padding: 0.1rem;
					margin-right: 0.25rem;
					box-sizing: border-box;
					position: relative;
					div {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						box-sizing: border-box;
						border: 1px dashed #D5D5D6;
						overflow: hidden;
						img {
							z-index: 13;
							position: absolute;
							top: 50%;
							left: 50%;
							transform: translate(-50%, -50%);
							width: 100%;
							height: auto;
						}
					}
					input {
						opacity: 0;
						z-index: 15;
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
					}
					.gbx {
						position: absolute;
						right: -7px;
						top: -7px;
						width: 0.38rem;
						height: 0.38rem;
						z-index: 18;
					}
				}
			}
			.add-btn {
				height: 0.88rem;
				line-height: 0.88rem;
				background: rgba(51, 111, 255, 1);
				margin-top: 0.6rem;
				font-size: 0.28rem;
				text-align: center;
				font-family: MicrosoftYaHei;
				color: rgba(255, 255, 255, 1);
			}
		}
	}
</style>
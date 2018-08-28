<template>
	<section class="album_box">
		<settingHeader title="店铺相册"></settingHeader>
		<sticky>
			<div class="tab_box">
				<tab line-width="2" custom-bar-width="1.34rem">
					<tab-item selected @on-item-click="onItemClick">店内照</tab-item>
					<tab-item @on-item-click="onItemClick">门头照</tab-item>
					<tab-item @on-item-click="onItemClick">宣传图册</tab-item>
				</tab>
			</div>
		</sticky>
		<div class="photo_list">
			<img class="img" :src="item.src" v-for="(item,index) in photoList" @click="show(index)" alt="" />
		</div>
		<div v-transfer-dom>
			<previewer :list="photoList" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
		</div>
	</section>
</template>

<script>
	import settingHeader from '@/components/setting_header'
	import { Tab, TabItem, Previewer, Sticky } from 'vux'
	export default {
		components: {
			settingHeader,
			Tab,
			TabItem,
			Previewer,
			Sticky
		},
		data() {
			return {
				tabIndex: 0,
				photoList: [],
				storePhoto: [],
				doorhead: [],
				thumb: [],
				options: {},
				list: []
			}
		},
		created() {
			this.getThumbInfo()
		},
		mounted() {},
		methods: {
			show(index) {
				this.$refs.previewer.show(index)
			},
			logIndexChange(arg) {
				console.log(arg)
			},
			onItemClick(val) {

				var _this = this

				_this.photoList = []

				if(val == 0) {
					_this.list = _this.storePhoto
				} else if(val == 1) {
					_this.list = _this.doorhead
				} else {
					_this.list = _this.thumb
				}

				_this.list.forEach((value) => {
					var item = {}
					item.src = value.original
					_this.photoList.push(item)
				})
			},
			// 获取企业图册
			getThumbInfo() {
				var _this = this
				_this.$http.get(_this.url.qy.getThumbInfo, {
					params: {
						enterpriseId: _this.$route.query.enterpriseId
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.storePhoto = res.data.data.storePhoto
						_this.doorhead = res.data.data.doorhead
						_this.thumb = res.data.data.thumb

						_this.list = _this.storePhoto

						_this.list.forEach((value) => {
							var item = {}
							item.src = value.original
							_this.photoList.push(item)
						})
					}
				})
			},
		}
	}
</script>
<style lang="less" scoped>
	.album_box {
		height: 100%;
		background-color: white;
		.photo_list {
			padding: 0.24rem;
			/*box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-wrap: wrap;*/
			background-color: white;
			-moz-column-count: 2;
			/* Firefox */
			-webkit-column-count: 2;
			/* Safari 和 Chrome */
			column-count: 2;
			.img {
				width: 3.39rem;
				height: auto;
				background: rgba(229, 229, 229, 1);
				border-radius: 6px;
				margin-bottom: 0.24rem;
				overflow: hidden;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: center;
				-moz-page-break-inside: avoid;
				-webkit-column-break-inside: avoid;
				break-inside: avoid;
			}
			.img:not(:nth-child(2n)) {
				margin-right: 0;
			}
		}
	}
</style>
<template>
	<section class="album_box">
		<settingHeader title="店铺相册"></settingHeader>
		<div class="tab_box">
			<tab line-width="2" custom-bar-width="1.34rem">
				<tab-item selected @on-item-click="onItemClick">店内照</tab-item>
				<tab-item @on-item-click="onItemClick">门头照</tab-item>
				<tab-item @on-item-click="onItemClick">宣传图册</tab-item>
			</tab>
		</div>
		<ul class="photo_list">
			<li v-for="(item,index) in photoList">
				<img :src="item.original" alt="" />
			</li>
		</ul>
	</section>
</template>

<script>
	import settingHeader from '@/components/setting_header'
	import { Tab, TabItem } from 'vux'
	export default {
		components: {
			settingHeader,
			Tab,
			TabItem
		},
		data() {
			return {
				tabIndex: 0,
				photoList: [],
				storePhoto: [],
				doorhead: [],
				thumb: [],
			}
		},
		created() {
			this.getThumbInfo()
		},
		mounted() {},
		methods: {
			onItemClick(val) {

				if(val == 0) {
					this.photoList = this.storePhoto
				} else if(val == 1) {
					this.photoList = this.doorhead
				} else {
					this.photoList = this.thumb
				}

				console.log(this.photoList)
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
						
						_this.photoList = _this.storePhoto
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
			li {
				width: 3.39rem;
				background: rgba(229, 229, 229, 1);
				border-radius: 6px;
				margin-bottom: 0.24rem;
				overflow: hidden;
				border: 1px solid #E5E5E5;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: center;
				-moz-page-break-inside: avoid;
				-webkit-column-break-inside: avoid;
				break-inside: avoid;
				img {
					width: 100%;
					height: auto;
				}
			}
			li:not(:nth-child(2n)) {
				margin-right: ;
			}
		}
	}
</style>
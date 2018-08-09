<template>
	<section class="prc-box">
		<settingHeader title="中国地区馆"></settingHeader>
		<div class="search-box">
			<img :src="'./static/images/ss.png'" />
			<input type="text" readonly="readonly" placeholder="搜索" />
		</div>
		<img class="banner_box" :src="'./static/prc/prc_taiwan.jpg'" />
		<div class="tab_box">
			<tab line-width="2" custom-bar-width="30px">
				<tab-item selected @on-item-click="onItemClick">华南</tab-item>
				<tab-item @on-item-click="onItemClick">华中</tab-item>
				<tab-item @on-item-click="onItemClick">华北</tab-item>
				<tab-item @on-item-click="onItemClick">华东</tab-item>
				<tab-item @on-item-click="onItemClick">东北</tab-item>
				<tab-item @on-item-click="onItemClick">西南</tab-item>
				<tab-item @on-item-click="onItemClick">西北</tab-item>
			</tab>
		</div>
		<div v-for="(item,index) in list" style="margin-bottom: 0.20rem;">
			<div class="content-box" :style="{backgroundImage: 'url('+ item.bgImg +')',backgroundSize: 'cover',backgroundrRepeat: 'no-repeat'}">
				<div class="middle">
					<div class="left">
						<p>{{item.province}}</p>
						<p>{{item.en}}</p>
					</div>
					<div class="right">
						进入
					</div>
					<div class="sjx"></div>
				</div>
			</div>
			<div class="swiper-inner">
				<swiper :options="swiperOption" class="swiper">
					<swiper-slide v-for="(i,index) in item.zstList" :key="index">
						<img :src="i.img" />
						<div class="tip">
							<p class="title">{{i.name}}</p>
							<p class="money">¥ {{i.money}}</p>
						</div>
					</swiper-slide>
				</swiper>
			</div>
		</div>
	</section>
</template>

<script>
	import settingHeader from '@/components/setting_header'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import { Tab, TabItem } from 'vux'
	import list from '@/views/prc/list'
	export default {
		components: {
			settingHeader,
			swiper,
			swiperSlide,
			Tab,
			TabItem
		},
		data() {
			return {
				swiperOption: {
					slidesPerView: 'auto',
					autoplay: false
				},
				tabIndex: 0,
				list: []
			}
		},
		watch: {
			tabIndex() {
				if(this.tabIndex == 0) {
					this.list = list.hn
				}else if(this.tabIndex == 1){
					this.list = list.hz
				}
			}
		},
		created() {
			this.list = list.hn
		},
		methods: {
			onItemClick(index) {
				this.tabIndex = index
			}
		}
	}
</script>
<style lang="less">
	.prc-box {
		.tab_box {
			.scrollable .vux-tab-item {
				flex: 0 0 14.285714285714286%!important;
				font-size: 0.28rem;
				font-family: PingFangSC-Regular;
			}
			.vux-tab .vux-tab-item{
				background: transparent!important;
			}
		}
	}
</style>
<style lang="less" scoped>
	.prc-box {
		background-color: #F5F6FA;
		padding-bottom: 0.20rem;
		.search-box {
			height: 1rem;
			padding: 0.16rem 0.30rem;
			box-sizing: border-box;
			background: rgba(255, 255, 255, 1);
			position: relative;
			input {
				width: 100%;
				height: 100%;
				background: rgba(26, 38, 66, 0.08);
				border-radius: 4px;
				text-align: center;
				font-size: 0.24rem;
				font-family: PingFangSC-Regular;
				color: rgba(144, 162, 199, 1);
			}
			input::-webkit-input-placeholder {
				color: #90A2C7;
			}
			input:-moz-placeholder {
				color: #90A2C7;
			}
			img {
				width: 0.30rem;
				height: 0.30rem;
				position: absolute;
				top: 50%;
				left: 43%;
				transform: translate(-43%, -50%);
			}
		}
		.banner_box {
			width: 100%;
			height: auto;
			display: block;
		}
		.content-box {
			height: 2.7rem;
			position: relative;
			.middle {
				display: flex;
				align-items: center;
				justify-content: space-between;
				position: relative;
				width: 100%;
				height: 100%;
				z-index: 15;
				padding: 1.42rem 0.48rem 0.52rem 0.69rem;
				box-sizing: border-box;
				.left {
					p:nth-child(1) {
						height: 0.45rem;
						font-size: 0.32rem;
						font-family: PingFangSC-Semibold;
						color: rgba(255, 255, 255, 1);
						line-height: 0.45rem;
					}
					p:nth-child(2) {
						height: 0.28rem;
						font-size: 0.20rem;
						font-family: PingFangSC-Regular;
						color: rgba(255, 255, 255, 1);
						line-height: 0.28rem;
					}
				}
				.right {
					width: 1.24rem;
					height: 0.46rem;
					line-height: 0.46rem;
					text-align: center;
					border-radius: 13px;
					border: 1px solid rgba(255, 255, 255, 1);
					font-size: 0.22rem;
					font-family: PingFangSC-Medium;
					color: rgba(255, 255, 255, 1);
				}
				.sjx {
					position: absolute;
					left: 0.87rem;
					bottom: 0;
					width: 0;
					height: 0;
					border: 0.17rem solid;
					border-color: transparent transparent white transparent;
				}
			}
		}
		.swiper-inner {
			padding: 0.10rem 0 0 0.20rem;
			box-sizing: border-box;
			.swiper-slide {
				width: 2.20rem;
				height: 3.47rem;
				margin-right: 0.10rem;
				background-color: white;
				display: flex;
				flex-direction: column;
				align-items: center;
				img {
					width: 2.20rem;
					height: 2.20rem;
				}
				.tip {
					flex: 1;
					padding: 0.12rem;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.title {
						font-size: 0.24rem;
						font-family: PingFangSC-Regular;
						color: rgba(34, 34, 34, 1);
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					.money {
						font-size: 0.26rem;
						font-family: PingFangSC-Semibold;
						color: rgba(242, 48, 48, 1);
					}
				}
			}
		}
	}
</style>
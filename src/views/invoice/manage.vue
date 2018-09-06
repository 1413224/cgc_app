<template>
	<section class="invoice_manage_box">
		<settingHeader title="发票管理"></settingHeader>
		<div class="top_box" @click="$router.push({path:'/invoice/edit'})">
			<img :src="'./static/images/tianjia.png'" /><span>新增抬头</span>
		</div>
		<div class="wrapper" ref="wrapper" :class="[{'top46':!$store.state.page.isWx},{'bg_white':riseList.length == 0}]">
			<div class="content">
				<ul class="rise_list_box">
					<li class="item" v-for="(item,index) in riseList" :key="index">
						<div class="top">
							<div>
								<span class="name">{{item.name}}</span>
								<span class="type" v-if="item.type == 0">个人</span>
								<span class="type" v-if="item.type == 1">增值税专用</span>
								<span class="type" v-if="item.type == 2">企业</span>
							</div>
							<p v-if="item.type != 0">税号：91440101MA59F1MW0B</p>
						</div>
						<div class="bottom">
							<div @click="isdefaultChange(index)">
								<img :src="item.isdefault == 1 ? './static/images/yuanquan-in.png' : './static/images/yuanquan.png'" /><span>设为默认</span>
							</div>
							<div class="btn">
								<div @click="$router.push({path:'/invoice/edit'})">编辑</div><div>删除</div>
							</div>
						</div>
					</li>
				</ul>
				<Loading v-if="showLoading"></Loading>
				<Nomore v-if="showNomore"></Nomore>
				<noData v-if="riseList.length == 0" :status="0" stateText="您还没有相关发票"></noData>
			</div>
		</div>
		<div class="bottom_box">
			<div class="item" @click="$router.push({path:'/invoice/index'})">
				<img :src="'./static/images/fapiao.png'" />
				<span>我的发票</span>
			</div>
			<div class="item">
				<img :src="'./static/images/ttgl-in.png'" />
				<span>抬头管理</span>
			</div>
		</div>
	</section>
</template>

<script>
	import settingHeader from '@/components/setting_header'
	import BScroll from 'better-scroll'

	export default {
		components: {
			settingHeader
		},
		data() {
			return {
				showLoading: false,
				showNomore: false,
				riseList: [{
						name: '石原里美',
						type: 0,
						bq: '个人',
						isdefault: 1
					},
					{
						name: '石原里美',
						type: 1,
						bq: '增值税专用',
						isdefault: 0
					},
					{
						name: '石原里美',
						type: 2,
						bq: '企业',
						isdefault: 0
					},
				]
			}
		},
		watch: {

		},
		created() {
			this.InitScroll()
		},
		methods: {
			//设置默认
			isdefaultChange(index){
				this.riseList.forEach((value)=>{
					value.isdefault = 0
				})
				this.riseList[index].isdefault = 1
			},
			//初始化滑动组件
			InitScroll() {
				this.$nextTick(() => {
					if(!this.scroll) {
						this.scroll = new BScroll(this.$refs.wrapper, {
							click: true,
							scrollY: true,
							pullUpLoad: {
								threshold: 30, // 负值是当上拉到超过低部 70px；正值是距离底部距离 时，                    
							}
						})
						this.scroll.on('pullingUp', (pos) => {
							this.LoadData()
							this.$nextTick(function() {
								this.scroll.finishPullUp()
								this.scroll.refresh()
							})
						})
					} else {
						this.scroll.refresh()
					}
				})
			},
			//上拉加载
			LoadData() {

			},

		}
	}
</script>

<style lang="less" scoped>
	.invoice_manage_box {
		.top_box {
			height: 0.87rem;
			display: flex;
			align-items: center;
			font-size: 0.30rem;
			/*font-family: PingFang-SC-Medium;*/
			color: rgba(53, 53, 53, 1);
			background-color: white;
			padding: 0 0.30rem;
			box-sizing: border-box;
			img {
				width: 0.29rem;
				height: 0.29rem;
				margin-right: 0.20rem;
			}
		}
		.bottom_box {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			display: flex;
			height: 0.90rem;
			background-color: white;
			div {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 0.32rem;
				/*font-family: PingFang-SC-Medium;*/
				color: rgba(51, 51, 51, 1);
				img {
					width: 0.40rem;
					height: auto;
					margin-right: 0.15rem;
				}
			}
			div:nth-child(2) {
				color: #336FFF;
			}
		}
		.wrapper {
			position: fixed;
			top: 1.07rem;
			bottom: 0.9rem;
			width: 100%;
			overflow: hidden;
			.content {
				padding-bottom: 0.20rem;
			}
			.rise_list_box {
				.item {
					background-color: white;
					.top {
						padding: 0.30rem;
						border-bottom: 1px dashed #E1E1E1;
						box-sizing: border-box;
						div {
							display: flex;
							align-items: center;
							justify-content: space-between;
							/*font-family: PingFang-SC-Medium;*/
							.name {
								font-size: 0.32rem;
								color: rgba(53, 53, 53, 1);
							}
							.type {
								padding: 0 0.08rem;
								height: 0.33rem;
								line-height: 0.33rem;
								text-align: center;
								background: rgba(215, 227, 255, 1);
								border: 1px solid rgba(51, 111, 255, 1);
								border-radius: 2px;
								color: rgba(51, 111, 255, 1);
								font-size: 0.24rem;
							}
						}
						p {
							font-size: 0.24rem;
							color: rgba(53, 53, 53, 1);
							margin-top: 0.20rem;
						}
					}
					.bottom {
						padding: 0.20rem 0.30rem;
						box-sizing: border-box;
						display: flex;
						justify-content: space-between;
						div {
							display: flex;
							align-items: center;
							justify-content: center;
							font-size: 0.28rem;
							/*font-family: PingFang-SC-Medium;*/
							color: rgba(53, 53, 53, 1);
							img {
								width: 0.40rem;
								height: 0.40rem;
								margin-right: 0.10rem;
							}
						}
						.btn {
							div {
								width: 1.37rem;
								height: 0.59rem;
								line-height: 0.59rem;
								text-align: center;
								border: 1px solid rgba(225, 225, 225, 1);
								border-radius: 2px;
							}
							div:nth-child(1) {
								margin-right: 0.20rem;
							}
						}
					}
				}
				.item:not(:last-child) {
					margin-bottom: 0.20rem;
				}
			}
		}
		.top46 {
			top: 14%;
		}
		.bg_white {
			background-color: white;
		}
	}
</style>
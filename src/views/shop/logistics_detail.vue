<template>
	<section class='logistics_detail'>
		<settingHeader :title="title"></settingHeader>
		<div v-if="show">
			<div class="tatile">
				<img :src="info.logo.original" alt="" class="image" />
				<div class="tatile-cont">
					<p>{{info.goodsName}}</p>
					<p class="vice">{{info.expressName}}：{{info.expressSn}}</p>
				</div>
			</div>
			<div v-for="(item, index) in info.expressInfo" :key="index" class="flow" :style="index === 0 ? 'color: #000;' : ''">
				<div class="flow-row">
					<div class="flow-date">
						<!--<p>{{item.ftime}}</p>-->
						<p :class="{'gray':index != 0}">{{item.time}}</p>
					</div>
					<div class="flow-node">{{item.context}}</div>
				</div>
				<div class="flow-line"></div>
			</div>
		</div>
		<Null v-else status="zwdd" text="暂无物流信息"></Null>
	</section>
</template>

<script>
	import Null from '@/components/null'
	import settingHeader from '@/components/setting_header'

	export default {
		data() {
			return {
				title: '物流详情',
				info: {},
				show: false
			}
		},
		created() {
			this.getOrderExpressInfo()
		},
		methods: {
			getOrderExpressInfo() {
				var _this = this;
				_this.$http.get(_this.url.user.getOrderExpressInfo, {
					params: {
						orderSn: _this.$route.query.orderSn,
						userId: _this.$store.state.user.userId
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.info = res.data.data
						_this.show = true
					} else {
						_this.show = false
					}
				})
			}
		},
		components: {
			settingHeader,
			Null
		}
	}
</script>

<style lang='less'>
	.logistics_detail {
		min-height: 100%;
		background-color: #fff;
		.tatile {
			height: 1.2rem;
			padding: 0.2rem;
			background-color: orange;
			display: flex;
			align-items: center;
			justify-content: center;
			.image {
				width: 1.2rem;
				height: 100%;
				margin-right: 0.2rem;
			}
			.tatile-cont {
				flex: 1;
				color: #fff;
				height: 100%;
				line-height: 0.4rem;
				position: relative;
				.vice {
					font-size: 0.24rem;
					position: absolute;
					bottom: 0;
				}
			}
		}
		.flow {
			padding: 0.2rem;
			color: #ccc;
			.flow-row {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.flow-date {
					width: 2rem;
					text-align: center;
					.gray {
						color: #ccc;
					}
				}
				.flow-node {
					flex: 1;
				}
			}
			.flow-line {
				width: 1rem;
				height: 0.5rem;
				margin-top: 0.2rem;
				border-right: 1px solid #ccc;
			}
		}
		.null_box {
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
</style>
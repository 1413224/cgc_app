<template>
	<div class="usetime">
		<settingHeader :title="title"></settingHeader>
		<div v-if="list.length>0">
			<div class="lunbo">
				<swiper :options="swiperOption">
					<swiper-slide v-for="(item,index) in list" :key="index">
						<div class="sw_wrap">
							<div class="content">
								<p class="tit ellipsis">{{item.goodsName}}</p>
								<p class="xinghao"><span></span>设备编号:{{item.equipNumber}}</p>
							</div>
						</div>
					</swiper-slide>
				</swiper>
			</div>

			<div class="start" v-show="infoItem.status == 0 || infoItem.status == 2">
				<div class="cont" @click="startEquipment(infoItem.itemId,infoItem.status)">
					<img src="../../assets/images/share/button0.png" alt="" class="btn0">
					<img src="../../assets/images/share/sh_btn0.png" alt="" class="sh_btn0">
					<div class="nr">
						<p class="tit">启动</p>
						<p class="text">开启后开始计时</p>
						<p class="time">{{remainTime}}</p>
					</div>
				</div>
			</div>

			<div class="suspend" v-show="infoItem.status == 1">
				<div class="cont" @click="startEquipment(infoItem.itemId,infoItem.status)">
					<img src="../../assets/images/share/button2.png" alt="" class="btn0">
					<img src="../../assets/images/share/sh_btn2.png" alt="" class="sh_btn0">
					<div class="nr">
						<p class="tit">暂停</p>
						<p class="text">暂停后可继续开启</p>
						<p class="time">{{remainTime}}</p>
					</div>
				</div>
			</div>

			<div class="enduse" @click='endOfUse(infoItem.itemId)' v-if="infoItem.status == 1">结束使用</div>

			<div class="footer">
				<div class="num">设备编号：{{infoItem.equipNumber}}</div>
				<div class="address ellipsis">所在门店：{{infoItem.name}}</div>
			</div>

		</div>
		<div v-else class="null-box">
			<div class="null-img">
				<img :src="'./static/share/null.png'" />
				<p>暂无可用共享设备</p>
			</div>
			<div class="btn-box">
				<div>返回首页</div>
				<div>
					立即购买
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import 'swiper/dist/css/swiper.css'
	import settingHeader from '../../components/setting_header'

	export default {
		data() {
			var _this = this;
			return {
				title: "使用时间",
				changeEquiDate: {},
				// _this:this,
				swiperOption: {
					slidesPerView: 'auto',
					centeredSlides: true,
					spaceBetween: 30,
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					},
					on: {
						slideChangeTransitionEnd: function(e) {
							_this.infoItem = _this.list[this.activeIndex]
							clearInterval(_this.clearTime)
						}
					}
				},
				shBtn: false,
				lanBtn: '../../../static/images/button0.png',
				shlanBtn: '../../../static/images/on_btn0.png',
				clearTime: '', //定时器清除使用的
				remainTime: '', //当前设备剩余时间 01:00:00
				onIndex: 0, //当前显示设备的下标

				list: [],
				info: {},
				infoItem: {}

			}

		},
		components: {
			settingHeader,
			swiper,
			swiperSlide
		},
		created() {
			this.getMyEquipmentInfo()
		},
		mounted() {

		},
		computed: {

		},
		methods: {
			getMyEquipmentInfo() {
				var _this = this

				_this.$http.get(_this.url.share.getMyEquipmentInfo, {
					params: {
						userId: _this.$store.state.user.userId
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.info = res.data.data
						_this.list = res.data.data.list
						_this.infoItem = res.data.data.list[0]
						if(res.data.data.list[0].status == 1) {
							_this.countdown(res.data.data.list[0].canUseTime)
						}
					}
				})
			},
			startEquipment(id, status) { //开启设备
				var _this = this
				_this.$http.post(_this.url.share.changeEquipmentStatus, {
					userId: _this.$store.state.user.userId,
					itemId: id,
					status: status == 0 || status == 2 ? 1 : 2
				}).then((res) => {
					if(res.data.status == "00000000") {
						this.getMyEquipmentInfo()
						_this.countdown(res.data.data.list[0].canUseTime)
					}
				})

			},
			outTime(info) { //计算所有设备的剩余时间
				setInterval(function() {
					--info.overtime;
				}, 998);
			},
			//倒计时
			countdown2(item) {
				if(item < 0) return
				let vm = this
				let m = (Math.floor(item / 60) + '').padStart(2, '0')
				let t = (item % 60 + '').padStart(2, '0')
				let arr = (m + t).split('')
				item -= 1
				setTimeout(() => {
					vm.countdown2(item)
				}, 1000)
				vm.remainTime = arr
			},
			countDown(overtime) { //当前设备的倒计时

				var _this = this;
				_this.setTime(overtime);

				_this.clearTime = setInterval(function() {

					if(overtime == 0) {
						_this.useend();
						return;
					}
					--overtime;
					_this.setTime(overtime);

				}, 998);
			},
			setTime(overtime) { //设置设备剩余时间
				var hour = Math.floor(overtime / 60 / 60),
					min = Math.floor((overtime - hour * 60 * 60) / 60),
					sec = Math.floor(overtime - hour * 60 * 60 - min * 60);

				hour = hour > 9 ? hour : '0' + hour;
				min = min > 9 ? min : '0' + min;
				sec = sec > 9 ? sec : '0' + sec;

				this.remainTime = hour + ":" + min + ":" + sec;
			},
			useend() {
				clearInterval(this.clearTime);
			},
			endOfUse(id) {
				var _this = this
				_this.$http.post(_this.url.share.finishEquipmentOrder, {
					userId: _this.$store.state.user.userId,
					itemId: id
				}).then((res) => {
					if(res.data.status == "00000000") {
						console.log(res.data.data)
					}
				})
			}

		}
	}
</script>

<style lang="less" scoped>
	@import url('../../../static/css/global');
	.usetime {
		width: 100%;
		height: 100%;
		/*background: #fff;*/
		background: linear-gradient(180deg, rgba(241, 245, 249, 1), rgba(216, 229, 245, 1));
		.swiper-slide {
			width: 70%;
		}
		.swiper-slide:nth-child(2n) {
			width: 70%;
		}
		/* 		.swiper-slide:nth-child(3n) {
    width: 20%;
} */
		.swiper-wrapper {
			margin-left: -.4rem;
		}
		.lunbo {
			padding-top: .2rem;
		}
		.sw_wrap {
			background: #fff;
			padding: 2px;
			border-radius: .7rem;
			height: 1.56rem;
			display: flex;
			align-items: center;
			justify-content: center;
			.content {
				background: #E6EEF7;
				border-radius: .7rem;
				height: 1.5rem;
				width: 100%;
				/*padding: .3rem 0;*/
				.tit {
					font-size: .22rem;
					color: #141C33;
					text-align: center;
					margin-top: .3rem;
					span {
						color: #7F8FBD;
						display: inline-block;
					}
				}
				.xinghao {
					/*padding-left: .2rem;*/
					text-align: center;
					margin-top: .2rem;
					img {
						width: .3rem;
						height: .3rem;
						margin-right: .1rem;
						position: relative;
						top: .05rem;
					}
				}
			}
		}
		.start,
		.suspend {
			width: 100%;
			overflow: hidden;
			height: 7.6rem;
			/*.border;*/
			/*margin-top: .2rem;*/
			display: flex;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
			.cont {
				width: 4.8rem;
				height: 4.8rem;
				position: relative;
				/*.border;*/
				.btn0 {
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					z-index: 2;
				}
				.sh_btn0 {
					width: 7.6rem;
					height: 7rem;
					position: absolute;
					top: -1rem;
					left: -1.4rem;
					z-index: 1;
					animation: heartbeat 3s linear infinite;
				}
				.nr {
					/*.border;*/
					position: relative;
					text-align: center;
					z-index: 3;
					padding-top: 1.5rem;
					color: #fff;
					.tit {
						font-size: .56rem;
						font-weight: bold;
					}
					.text {
						font-size: .28rem;
						margin-top: .2rem;
					}
					.time {
						font-size: .36rem;
						margin-top: .48rem;
					}
				}
			}
		}
		.enduse {
			color: #7386AD;
			font-size: .28rem;
			text-align: center;
			/*margin-top: .2rem;*/
			margin: -.2rem auto 0;
			width: 3rem;
			height: .6rem;
			line-height: .6rem;
			/*.border;*/
		}
		.footer {
			width: 100%;
			height: 1.4rem;
			background: url('../../assets/images/share/sharefoot.png');
			background-size: 100% 100%;
			position: fixed;
			bottom: 0;
			padding-left: .54rem;
			.num {
				font-size: .32rem;
				color: #1A2642;
				font-weight: bold;
				margin-top: .4rem;
			}
			.address {
				font-size: .24rem;
				color: #1A2642;
				margin-top: .1rem;
				width: 6.5rem;
			}
		}
		.null-box {
			background-color: #F5F8F9;
			height: 100%;
			.null-img {
				height: 5.38rem;
				background: rgba(255, 255, 255, 1);
				img {
					width: 100%;
					height: auto;
				}
				p {
					text-align: center;
					font-size: 0.32rem;
					font-family: PingFangSC-Medium;
					color: rgba(26, 38, 66, 1);
				}
			}
			.btn-box {
				display: flex;
				justify-content: space-between;
				margin-top: 0.60rem;
				padding: 0 0.90rem;
				div:nth-child(1) {
					width: 2.70rem;
					height: 0.94rem;
					line-height: 0.94rem;
					text-align: center;
					border-radius: 4px;
					border: 1px solid rgba(144, 162, 199, 1);
					font-size: 0.28rem;
					font-family: PingFangSC-Medium;
					color: rgba(26, 38, 66, 1);
					box-sizing: border-box;
				}
				div:nth-child(2) {
					width: 2.70rem;
					height: 0.94rem;
					line-height: 0.94rem;
					text-align: center;
					border-radius: 4px;
					background: rgba(51, 111, 255, 1);
					font-size: 0.28rem;
					font-family: PingFangSC-Medium;
					color: white;
				}
			}
		}
	}
	
	@keyframes heartbeat {
		/* 0%{transform: scale(0.8,0.8);}
		    	25%{transform: scale(1,1);}
		    	100%{transform: scale(0.8,0.8);} */
		0% {
			transform: scale(1, 1);
		}
		25% {
			transform: scale(1.2, 1.2);
		}
		100% {
			transform: scale(1, 1);
		}
		/*  0% {
		   transform: scale(1);
		 }
		 20% {
		   transform: scale(1.2);
		 }
		 40% {
		   transform: scale(1);
		 }
		 60% {
		   transform: scale(1.2);
		 }
		 80% {
		   transform: scale(1);
		 }
		 100% {
		   transform: scale(1);
		 } */
	}
</style>
<style>
	.usetime .header {
		background: transparent !important;
	}
</style>
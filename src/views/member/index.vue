<template>
	<div class="info-box">
		<settingHeader :title="title"></settingHeader>
		<div class="content">
			<section>
				<div class="info-bg" v-if="isLogin">
					<router-link to="/member/setting/index"><img class="setting-img" :src="'./static/member/shezi.png'" /></router-link>
					<div class="avatar">
						<img v-if="userInfo.avatar" :src="userInfo.avatar.original" @click="$router.push({path:'/member/info/index'})" alt="" />
						<img v-else :src="'./static/images/mrtx.png'" @click="$router.push({path:'/member/info/index'})"  alt="">
						<p class="nickname">{{userInfo.nickname?userInfo.nickname:userInfo.mobile}}</p>
						<!--<p class="status">{{info.levelName?info.levelName:'暂无等级'}}</p>-->
						<p class="bj" @click="$router.push({path:'/member/info/data'})">编辑个人资料 <i class="icon iconfont icon-arrow-right"></i></p>
					</div>

					<div class="account">
						<router-link to="/member/earnings/currency">
							<div class="universal">
								<p>
									<div class="num">
										<p class="money">{{userInfo.balance?userInfo.balance:0}}</p>
										<!--<badge></badge>-->
									</div>
								</p>
								<p class="universalAccount">通用积分</p>
							</div>
						</router-link>
						<router-link to="/member/earnings/credit">
							<div class="universal">
								<div class="num">
									<p class="money">{{userInfo.availablePoints?userInfo.availablePoints:0}}</p>

								</div>
								<p class="universalAccount">信用积分</p>
							</div>
						</router-link>
					</div>
				</div>
				<div class="info-bg" v-else>
					<router-link to="/member/setting/index">
						<img class="setting-img" src="../../assets/images/member/shezi.png" />
					</router-link>
					<div class="avatar noLogin">
						<router-link to="/user/login">
							<img :src="'./static/images/mrtx.png'" alt="">
							<p>登录 / 注册</p>
						</router-link>
					</div>
				</div>
			</section>
			<section>
				<div class="navigation">
					<ul>
						<li>
							<router-link to="/member/purse/wallet">
								<div class="li-box">
									<img src="../../assets/images/member/member_wallet.png">
									<!--<badge class="new"></badge>-->
								</div>
								<p>我的资产</p>
							</router-link>
						</li>
						<li>
							<router-link to="/member/team/index">
								<div class="li-box">
									<img src="../../assets/images/member/member-team.png">
									<!--<badge class="new"></badge>-->
								</div>
								<p>我的团队</p>
							</router-link>
						</li>
						<li>
							<router-link to="/member/coupon/index">
								<div class="li-box">
									<img src="../../assets/images/member/kbao.png">
									<!--<badge class="new-account" text="2312"></badge>-->
								</div>

								<p>我的优惠券</p>
							</router-link>
						</li>
						<li>
							<a @click="toQrcode(userInfo)">
								<div class="li-box">
									<img src="../../assets/images/member/member_code.png">
								</div>
								<p>推广码</p>
							</a>
						</li>
					</ul>
				</div>
			</section>
			<section v-if="isLogin">
				<div class="order-box">
					<p>我的订单</p>
					<p @click="$router.push({path:'/shop/my_order2'})">查看更多订单<i class="icon iconfont icon-arrow-right"></i></p>
				</div>
				<div class="navigation" style="margin-top: 0;">
					<ul>
						<li @click="toOrder(1)">
							<a href="javascript:void(0)">
								<div class="li-box2">
									<img :src="'./static/member/order-1.png'">
								</div>
								<p>待处理</p>
							</a>
						</li>
						<li @click="toOrder(2)">
							<a href="javascript:void(0)">
								<div class="li-box2">
									<img :src="'./static/member/order-6.png'">
								</div>
								<p>进行中</p>
							</a>
						</li>
						<li @click="toOrder(3)">
							<a href="javascript:void(0)">
								<div class="li-box2">
									<img :src="'./static/member/order-4.png'">
								</div>
								<p>待评价</p>
							</a>
						</li>
						<li @click="toOrder(4)">
							<a href="javascript:void(0)">
								<div class="li-box2">
									<img :src="'./static/member/order-5.png'">
								</div>
								<p>退款/售后</p>
							</a>
						</li>
					</ul>
				</div>
			</section>
			<!--<section>
				<router-link to="/draw">
					<div class="banner">
						<img v-lazy="'./static/images/member_banner.png'" alt="">
						 <img src="static/images/alliance1.png"/> 
					</div>
				</router-link>
			</section>-->
			<section>
				<group gutter="0" class="infoList2">
					<cell v-for="(item,index) in infoList2" :key="index" class="info-item" :title="item.text" :value="item.tip" is-link :link="item.url">
						<img slot="icon" :src="item.img">
						<badge text="8" v-if="item.red"></badge>
					</cell>
				</group>
				<group gutter="0" class="infoList1">
					<cell v-for="(item,index) in infoList" :key="index" class="info-item" :title="item.text" :value="item.tip" is-link :link="item.url">
						<img slot="icon" :src="item.img">
					</cell>
				</group>
				<group gutter="0" class="infoList3">
					<cell v-for="(item,index) in infoList3" :key="index" class="info-item" :title="item.text" :value="item.tip" is-link :link="item.url">
						<img slot="icon" :src="item.img">
					</cell>
				</group>
			</section>
		</div>
	</div>
</template>

<script>
	import { Badge, Cell, Group } from 'vux'
	import settingHeader from '../../components/setting_header'
	import { setTimeout } from 'timers';
	export default {
		data() {
			return {
				title: '个人中心',
				userInfo: {},
				images: '',
				infoList: [{
						img: './static/member/m-index1.png',
						text: '企业通用积分',
						url: '/member/card/index',
						tip: ''
					},
					{
						img: './static/member/m-index2.png',
						text: '我的关注',
						url: '/member/follow/index',
					},
					{
						img: './static/member/member_5.png',
						text: '我的房卡',
						url: '/shop',
						tip: ''
					}
				],
				infoList2: [{
						img: './static/member/m-index6.png',
						text: '幸运大抽奖',
						url: '/draw',
						tip: '您有一条中奖消息'
					},{
						img: './static/member/m-index4.png',
						text: '供应链云商城',
						url: '/shop'
					},
					{
						img: './static/member/m-index5.png',
						text: '企业云商城',
						url: '/shop'
					},
					/*{
						img: './static/member/m-index5.png',
						text: '产业联盟',
						url: '/share/storelist'
					},*/
					/*{
						img: './static/member/member_2.png',
						text: '我的订单',
						url: '/shop/my_order'
					},*/

					
					/*{
						img: './static/member/m_index13.png',
						text: '我的卡包',
						url: '/member/card/index'
					}, {
						img: './static/member/menjin.png',
						text: '门禁系统',
						url: '/lock/card'
					},*/
				],
				infoList3: [
					/*{
						img: './static/member/m-index1.png',
						text: '企业通用积分',
						url: '/member/card/index',
						tip: ''
					},
					{
						img: './static/member/m-index2.png',
						text: '我的关注',
						url: '/member/follow/index',
					},*/
					{
						img: './static/member/m-index3.png',
						text: '收货地址',
						url: '/member/address/index',
						tip: ''
					},
					{
						img: './static/member/fapiao.png',
						text: '发票管理',
						url: '/invoice/index'
					},
				],
				yhqTip: '5张快过期',
				isLogin: false,
				info: {}
			}
		},
		created() {

			if(this.$store.state.page.isLogin == 'true') {
				this.isLogin = true
			} else {
				this.isLogin = false
				localStorage.removeItem('userInfo')
				this.$store.state.user.userId = ''
			}

			if(localStorage['userInfo'] && this.isLogin) {
				this.userInfo = JSON.parse(localStorage['userInfo'])
			} else {
				this.userInfo = this.$store.state.page.userInfo
			}

			this.getUserInfo()
			this.getCardStat()
		},
		methods: {
			toOrder(index) {
				var _this = this
				if(index == 1 || index ==2){
					_this.$router.push({
						path: '/shop/my_order2',
						query: {
							// 'tabNo': true,
							'status':index,
							'tabIndex':index
						}
					})
				}else{
					_this.$router.push({
						path: '/shop/my_order2',
						query: {
							// 'tabNo': true,
							'status':index,
						}
					})
				}
			},
			getUserInfo() {
				var _this = this
				//获取用户信息
				_this.$http.get(_this.url.user.getBasicInfo, {
					params: {
						userId: _this.$store.state.user.userId
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.info = res.data.data
						if(_this.userInfo != res.data.data) {
							_this.userInfo = res.data.data
						}
					} else if(res.data.status == 'utils007' || res.data.status == 'utils010' || res.data.status == '401' || res.data.status == 'user-0009') {
						_this.isLogin = false
						localStorage.removeItem('userInfo')
					}
				})
			},
			toQrcode(info) {
				var _this = this
				_this.$router.push({
					path: '/member/purse/qrcode',
					query: {
						index: 1
					}
				})
			},
			getCardStat(){
				var _this = this,
					uid = _this.$store.state.user.userId;
				if(uid){
					_this.$http.get(_this.url.user.getMyEnterpriseCardStat,{
						params:{
							userId:uid
						}
					}).then((res) => {
						if(res.data.status == "00000000"){
							// console.log(res.data.data)
							var data = res.data.data
							_this.infoList[0].tip = data.cardNums=='' || data.cardNums == null ? '' : "共"+data.cardNums+"张通用卡"
						}
					})
				}
			}
		},
		components: {
			settingHeader,
			Badge,
			Cell,
			Group
		}
	}
</script>
<style lang="less">
	.info-box {
		.infoList1 {
			margin-bottom: 0.2rem;
			.weui-cell__ft {
				padding-right: 0.4rem;
				font-size: 0.24rem;
				font-family: PingFangSC-Regular;
			}
		}
		.infoList2 {
			margin-bottom: 0.2rem;
			.weui-cell__ft {
				font-size: 0.24rem;
				font-family: PingFangSC-Regular;
				padding-right: 0.4rem;
				color: red;
			}
		}
	}
</style>
<style lang="less" scoped>
	.info-box {
		background-color: #F5F6FA;
		padding-bottom: 1rem;
		position: relative;
		.info-bg {
			height: 4.47rem;
			background: url(../../assets/images/member/index-bg2.png) no-repeat;
			background-size: 100%;
			position: relative;
		}
		.setting-img {
			width: 0.36rem;
			height: 0.38rem;
			position: absolute;
			right: 0.33rem;
			top: 0.28rem;
		}
		.avatar {
			width: 100%;
			padding-top: 0.29rem;
			text-align: center;
			img {
				border-radius: 50%;
				width: 1.26rem;
				height: 1.26rem;
			}
			.nickname {
				font-family: PingFangSC-Regular;
				font-size: 0.36rem;
				color: #FFFFFF;
				margin: 0.14rem 0;
			}
			.bj {
				display: flex;
				align-items: center;
				justify-content: center;
				color: #FFFFFF;
				font-size: 0.24rem;
			}
			.status {
				font-family: PingFangSC-Regular;
				font-size: 0.24rem;
				color: #FFFFFF;
				letter-spacing: 0;
				margin-top: 0.1rem;
			}
		}
		.noLogin {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			padding-top: 0;
			p {
				font-family: PingFangSC-Regular;
				font-size: 0.24rem;
				color: #FFFFFF;
				letter-spacing: 0;
				margin-top: 0.1rem;
			}
		}
		.account {
			margin-top: 0.313rem;
			margin-bottom: 0.186rem;
			display: flex;
			width: 100%;
			a {
				text-align: center;
				width: 50%;
				.universal {
					.num {
						color: #333333;
						letter-spacing: 0;
						position: relative;
						display: flex;
						align-items: center;
						justify-content: center;
						padding: 0 0.1rem;
						box-sizing: border-box;
						.money {
							font-family: PingFangSC-Medium;
							font-size: 0.46rem;
							color: #FFFFFF;
							letter-spacing: 0;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							overflow: hidden;
							text-overflow: ellipsis;
						}
					}
					.universalAccount {
						font-family: PingFangSC-Regular;
						font-size: 0.24rem;
						color: #FFFFFF;
						letter-spacing: 0;
					}
				}
				.credit {
					flex: 1;
					text-align: center;
					.num {
						font-size: 0.391rem;
						color: #333333;
						letter-spacing: 0;
						position: relative;
						line-height: 0.54rem;
					}
					.creditlAccount {
						font-size: 0.204rem;
						color: #A3A3A3;
						letter-spacing: 0;
					}
				}
			}
		}
		.navigation {
			width: 100%;
			margin-bottom: 0.2rem;
			background: white;
			ul {
				padding: 0.26rem 0.2rem;
				display: flex;
				li {
					flex: 1;
					a {
						position: relative;
						display: flex;
						align-items: center;
						justify-content: center;
						flex-direction: column;
						.li-box {
							position: relative;
							width: 0.52rem;
							height: 0.52rem;
							img {
								width: 100%;
								height: auto;
							}
							.new {
								position: absolute;
								right: -3px;
								top: -2px;
							}
							.new-account {
								position: absolute;
								right: -28px;
								top: -2px;
							}
						}
						.li-box2 {
							position: relative;
							width: 0.44rem;
							height: 0.44rem;
							img {
								width: 100%;
								height: auto;
							}
							.new {
								position: absolute;
								right: -3px;
								top: -2px;
							}
							.new-account {
								position: absolute;
								right: -18px;
								top: -8px;
							}
						}
						p {
							font-family: PingFangSC-Regular;
							font-size: 0.24rem;
							color: #7D7D7D;
							letter-spacing: 0;
							margin-top: 0.18rem;
						}
					}
				}
			}
		}
		.banner {
			width: 100%;
			height: 2.2rem;
			margin-bottom: 0.2rem;
			img {
				width: 100%;
				height: 2.2rem;
			}
		}
		.info-item {
			font-family: PingFangSC-Regular;
			font-size: 0.28rem;
			color: #464646;
			letter-spacing: 0;
			height: 1.2rem;
			box-sizing: border-box;
			img {
				width: 0.48rem;
				height: 0.48rem;
				vertical-align: sub;
				margin-right: 0.13rem;
			}
		}
		.order-box {
			padding: 10px 15px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: white;
			position: relative;
			p:nth-child(1) {
				font-size: 0.28rem;
				font-family: PingFangSC-Regular;
				color: rgba(26, 38, 66, 1);
			}
			p:nth-child(2),
			i {
				font-size: 0.24rem;
				font-family: PingFangSC-Regular;
				color: rgba(144, 162, 199, 1);
			}
		}
		.order-box:after {
			content: " ";
			position: absolute;
			left: 0;
			bottom: 0;
			right: 0;
			height: 1px;
			border-top: 1px solid #D9D9D9;
			color: #D9D9D9;
			-webkit-transform-origin: 0 0;
			transform-origin: 0 0;
			-webkit-transform: scaleY(0.5);
			transform: scaleY(0.5);
			left: 0px;
		}
	}
</style>
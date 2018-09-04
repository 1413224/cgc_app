<template>
	<div class="card_box">
		<settingHeader title="企业通用卡"></settingHeader>
		<div class="wrapper" :class="[{'top46':!$store.state.page.isWx},{'b_white':cardList.length == 0}]" ref="wrapper">
			<div class="content">
				<ul class="card_list" v-if="cardList.length > 0">
				<!-- 'url('+item.logo+')' -->  
				<!-- :style="{backgroundImage:styleObject}" -->
				<!-- :style="{ 'background-image': 'url(' + item.logo.middle + ')','background-repeat':'no-repeat','background-size':'cover' }"  -->
					<li class="item" :class="item.bj" :style="styleObject"  v-for="(item,index) in cardList" :key="index" @click="toDetail(item.userCardId,item.cardId)">
						<p class="store">{{item.name}}</p>
						<div class="middle">
							<p>可用企业通用积分：</p>
							<p>{{item.balance}}</p>
						</div>
						<p class="tip" v-if="item.availableNums == 1">注：适用于{{item.allianceName}}</p>
						<p class="tip" v-else>注：适用于{{item.availableNums}}</p>
					</li>
				</ul>
				<Loading v-if="showLoading"></Loading>
				<Nomore v-if="showNomore"></Nomore>
				<!-- cardList.length -->
				<noData v-if="cardLength" :status="0" stateText="您还没有相关卡券"></noData>
			</div>
		</div>
	</div>
</template>

<script>
	import { Badge } from 'vux'
	import settingHeader from '@/components/setting_header'
	import Loading from '@/components/loading'
	import Nomore from '@/components/noMore'
	import noData from '@/components/noData'
	import BScroll from 'better-scroll'
	export default {
		data() {
			return {
				showLoading: false,
				showNomore: false,
				page:0,
				userCardId:0,
				flag:true,
				nodatas:false,
				cardLength:false,
				styleObject:{
					backgroundImage:'url("../../../../static/member/khh.png")',
					// backgroundImage:'url("https://gw.alicdn.com/bao/uploaded/i3/1834710611/TB2CgnphqagSKJjy0FaXXb0dpXa_!!1834710611.jpg")',
					backgroundSize:'100%'
				},
				cardList: [
					/*{
						store:'ddd'
					}*/
					/*{
						store: '国美番禺万科里店',
						jf: '348786.53',
						fw: '广东成高成网络技术门店',
						bj: 'black'
					},
					*/
				]
			}
		},
		components: {
			Loading,
			Nomore,
			noData,
			settingHeader
		},
		created() {
			this.InitScroll()
			this.LoadData()
		},
		mounted() {},
		methods: {
			toDetail(userCardId,cardId){
				var _this = this
				this.$router.push({
					path:'/member/card/detail',
					query:{
						userCardId:userCardId,
						cardId:cardId
					}
				})
			},
			InitScroll() {
				var _this = this
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
							// _this.showLoading = true
							
							if(_this.flag){
								_this.flag = false
								this.LoadData()
							}
							
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
			LoadData() {
				var _this = this
				// alert(_this.page)
				
				_this.page ++;
				_this.showLoading = true;
				_this.$http.get(_this.url.user.getMyEnterpriseCard,{
					params:{
						userId: _this.$store.state.user.userId,
						curPage : _this.page,
						pageSize:3
					}
				}).then((res) => {
					if(res.data.status == "00000000"){

						// console.log(res.data.data)
						var listLng = res.data.data.list.length

						if(listLng != 0){
							_this.cardList = _this.cardList.concat(res.data.data.list)
							_this.showLoading = false;
							_this.flag = true;
						}else{
							_this.showLoading = false
							_this.showNomore = true

							if(_this.page == 1){
								_this.showNomore = false
								if(listLng == 0){
									_this.cardLength = true
								}
							}
						}
					}
				})
			},

		}
	}
</script>

<style lang="less" scoped>
	.card_box {
		.wrapper {
			position: absolute;
			top: 0;
			bottom: 0;
			overflow: hidden;
			width: 100%;
			box-sizing: border-box;
		}
		.b_white{
			background-color: white;
		}
		.top46 {
			top: 46px!important;
		}
		.card_list {
			width: 100%;
			padding: 0.22rem 0.25rem;
			box-sizing: border-box;
			.item {
				width: 100%;
				height: 3.94rem;
				padding: 0.50rem 0.40rem;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-bottom: 0.20rem;
				.store {
					width: 5.5rem;
					font-size: 0.38rem;
					font-family: PingFangSC-Light;
					font-weight: 300;
					color: rgba(255, 255, 255, 1);
					text-shadow: 0px 2px 6px rgba(12, 26, 58, 0.2);
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
				.middle {
					p:nth-child(1) {
						font-size: 0.24rem;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: rgba(255, 255, 255, 1);
						text-shadow: 0px 2px 6px rgba(12, 26, 58, 0.2);
					}
					p:nth-child(2) {
						font-size: 0.48rem;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: rgba(255, 255, 255, 1);
						text-shadow: 0px 2px 6px rgba(12, 26, 58, 0.2);
					}
				}
				.tip {
					font-size: 0.24rem;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					text-shadow: 0px 2px 6px rgba(12, 26, 58, 0.2);
				}
			}
			.black {
				background: url(../../../../static/member/khh.png) no-repeat;
				background-size: cover;
			}
			.blue {
				background: url(../../../../static/member/jdl.png) no-repeat;
				background-size: cover;
			}
			.red {
				background: url(../../../../static/member/mlh.png) no-repeat;
				background-size: cover;
			}
			.xk {
				background: url(../../../../static/member/lsxk.png) no-repeat;
				background-size: cover;
			}
			.white {
				background: url(../../../../static/member/bsjz.png) no-repeat;
				background-size: cover;
			}
		}
	}
</style>
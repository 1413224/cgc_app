<template>
	<div class="wrap">
		<setting-header :title="title"></setting-header>
		<div ref="wrapper" class="wrapper">
			<div>
				<div class="banner"><img src="../../assets/images/shop/qyp_banner.png" alt=""></div>
				<qyp-nav :icocont="icocont"></qyp-nav>
				<div class="content">
					<div class="item clearfix">
						<div class="left fl">
							<img src="../../assets/images/shop/meat.png" alt="牛腩粒">
						</div>
						<div class="right fl">
							<p class="tit ellipsis">阿根廷牛腩粒</p>
							<p class="weight">400g/包</p>
							<!-- <span class="tip">网红爆款</span> -->
							<p class="momey"><span>￥</span>52.00</p>
							<div class="all">
								<span class="mixmomey"><span>￥</span>0.01</span>
								<span class="inte">+ 188积分</span>
								<img src="../../assets/images/shop/tip1.png" alt="">
							</div>
						</div>
						<div class="gowuche"><img src="../../assets/images/shop/gwc.png" alt=""></div>
					</div>
					<div class="item clearfix">
						<div class="left fl">
							<img src="../../assets/images/shop/meat.png" alt="牛腩粒">
						</div>
						<div class="right fl">
							<p class="tit ellipsis">阿根廷牛腩粒</p>
							<p class="weight">400g/包</p>
							<!-- <span class="tip">网红爆款</span> -->
							<p class="momey"><span>￥</span>52.00</p>
							<div class="all">
								<span class="mixmomey"><span>￥</span>0.01</span>
								<span class="inte">+ 188积分</span>
								<img src="../../assets/images/shop/tip1.png" alt="">
							</div>
						</div>
						<div class="gowuche"><img src="../../assets/images/shop/gwc.png" alt=""></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import settingHeader from '../../components/setting_header'
	import qypNav from '../../components/qypnav'
	// import Qs from 'qs'
	export default {
		data() {
			return {
				title:'荃优品专题页',
				icocont:[
					{icourl:'./static/shop/js48.png',icoText:'急速发货'},
					{icourl:'./static/shop/shwy.png',icoText:'售后无忧'},
					{icourl:'./static/shop/zpbz.png',icoText:'正品保障'},
					{icourl:'./static/shop/hwzy.png',icoText:'海外直邮'}
				]
			}
		},
		created() {

		},
		mounted() {
			this.InitScroll()
		},

		methods: {
			InitScroll(){
				var _this = this
				this.scroll = new BScroll(this.$refs.wrapper,{
					click:true,
					scrollY:true,
					pullUpLoad: {
						threshold: 10, // 负值是当上拉到超过低部 70px；正值是距离底部距离 时，                    
					}
				})
				this.scroll.on('pullingUp', (pos) => {
							
					this.$nextTick(function() {
						// _this.flag = false
						this.scroll.finishPullUp();
						
						this.scroll.refresh();
					});
				})
			}
		},
		components: {
			settingHeader,
			qypNav
		},
	}
</script>
<style lang="less" scoped>
	@import '~vux/src/styles/1px.less';
	.wrap{background: #fff;}
	.wrapper{
		position: absolute;
		top: 46px;
		bottom: 0;
		width: 100%;
		overflow: hidden;
		background: #fff;
	}
	.banner{
		width: 100%;
		height: 7.58rem;
		img{
			width: 100%;
			height: 100%;
		}
	}
	.content{
		padding: 0.1rem .5rem;
		.item{
			width: 100%;
			border-bottom:1px solid #E1E1E1;
			position: relative;
			padding-bottom: .2rem;
			.gowuche{
				position: absolute;
				bottom: .3rem;
    			right: -.2rem;
				width: .78rem;
				height: .78rem;
				img{
					width: 100%;
					height: 100%;
				}
			}
			.left{
				width: 2.26rem;
				img{
					width: 100%;
				}
			}
			.right{
				width: 3.8rem;
				padding-left: .3rem;
				padding-top: .2rem;
				.tit{
					font-size: .32rem;
					color: #0B212C;
				}
				.weight{
					font-size: .24rem;
					color: #A5A5A5;
					margin: .1rem 0;
				}
				.tip{
					font-size: .2rem;
					color: #F23233;
					padding: 4px;
					border: 1px solid #F23233;
					border-radius:2px; 
				}
				.momey{
					font-size: .26rem;
					color: #F23030;
					font-weight: bold;
					span{
						font-size: .2rem;
						font-weight: normal;
					}
				}
				.all{
					.mixmomey{
						font-size: .32rem;
						color: #F8BE11;
						font-weight: bold;
						span{
							font-size: .2rem;
							font-weight: normal;
						}
					}
					.inte{
						font-size: .2rem;
						color: #336FFF;
					}
					img{
						width: .80rem;
						height: .26rem;
						position: relative;
						top: .05rem;
					}
				}
			}
		}
	}
</style>
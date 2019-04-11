<template>
	<div class="wrap">
		<settingHeader title="周六专场"></settingHeader>
		<!-- ref="wrapper" -->
		<div class="wrapper" :class="{'h':!$store.state.page.isWx}">
			<div class="content" :class="{'pr_box':!showList}">
				<ul class="itembox" v-if="showList">
					<li class="item" v-for="(item,index) in goodsList" :key="index" @click="goDetail(item.url)">
						<img :src="item.goodsImg" />
						<p class="goodsName">{{item.goodsName}}</p>
						<p class="price">¥ {{item.price}}</p>
					</li>
				</ul>
				<Loading v-if="showLoading"></Loading>
				<no-more v-if="showNoMore"></no-more>
				<Null v-if="!showList && !inloading" status="zwsj" text="暂无更多商品"></Null>
				<Null v-if="!showList && inloading" status="loading" text="加载中"></Null>
			</div>
		</div>
		<div class="foot-box">
			<ul>
				<li v-for="(item,index) in navList" :key="index" @click="navActive(index,item.url)">
					<!-- <img :src="[$route.path == item.src ? item.activeLogo:item.logo]" alt=""> -->
					<img :src="item.icon" alt="">
					<p>{{item.title}}</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import settingHeader from '@/components/setting_header'
	import BScroll from 'better-scroll'
	import Loading from '@/components/loading'
	import noMore from '@/components/noMore'
	import Null from '@/components/null'

	export default {
		data() {
			return {
				no: '',
				showList: true,
				inloading: true,
				showLoading: false,
				showNoMore: false,
				goodsList: [
					/*{
						goodsImg: './static/ypk/ypk1.png',
						goodsName: '厄瓜多尔进口香蕉2kg（7-8根）',
						price: '20.00'
					},
					{
						goodsImg: './static/ypk/ypk2.png',
						goodsName: '云南高山冰糖橙 5斤',
						price: '40.00'
					},
					{
						goodsImg: './static/ypk/ypk3.png',
						goodsName: '新疆阿克苏冰糖心苹果 9斤装 ',
						price: '60.00'
					},
					{
						goodsImg: './static/ypk/ypk4.png',
						goodsName: '智利进口牛油果 20-24个 ',
						price: '80.00'
					},
					{
						goodsImg: './static/ypk/ypk5.png',
						goodsName: '山东蓝田秋月梨9斤装',
						price: '60.00'
					},
					{
						goodsImg: './static/ypk/ypk6.png',
						goodsName: '南非进口红西柚葡萄柚 柚子50个装',
						price: '80.00'
					},*/
				],
				navList: [{
						navTitle: '首页',
						logo: './static/images/shop-bottom1.png',
						activeLogo: './static/images/shop-bottom1-in.png',
						show: false,
						src: '',
						oIndex: 0
					},
					{
						navTitle: '商品',
						logo: './static/images/shop-bottom2.png',
						activeLogo: './static/images/shop-bottom2-in.png',
						show: false,
						src: '/multi_user_mall/components/goods',
						oIndex: 1,
						name: 'Goods'
					},
					{
						navTitle: '服务',
						logo: './static/images/shop-bottom3.png',
						activeLogo: './static/images/shop-bottom3-in.png',
						show: false,
						src: '/multi_user_mall/components/fuwu',
						oIndex: 2,
						name: 'Fuwu'
					},
					{
						navTitle: '简介',
						logo: './static/images/shop-bottom4.png',
						activeLogo: './static/images/shop-bottom4-in.png',
						show: false,
						src: '/multi_user_mall/components/introduce',
						oIndex: 3,
						name: 'Introduce'
					},
				],
			}
		},
		components: {
			settingHeader,
			BScroll,
			Loading,
			noMore,
			Null,
		},
		created() {

			var tologin = this.$store.state.page.isLogin,
					islogin = this.mainApp.getCs('login'),
					eid = this.mainApp.getCs('eid');

					localStorage.setItem('_eid_',eid)
				// alert(sessionStorage['_eid_'])
			if(islogin){
				if(tologin!="true"){
					this.$router.push({
						path: '/user/login',
					})
					
				}else{
					if(this.mainApp.getCs('no')) {
						this.no = this.mainApp.getCs('no')
						// this.type = this.mainApp.getCs('type')
					} else {
						this.showList = false
						this.inloading = false
					}
					this.getGoods()
				}
			}else{
				if(this.mainApp.getCs('no')) {
					this.no = this.mainApp.getCs('no')
					// this.type = this.mainApp.getCs('type')
				} else {
					this.showList = false
					this.inloading = false
				}
				this.getGoods()
			}

			
			// this.InitScroll()
		},
		methods: {
			getGoods() {
				var _this = this,
					intersrc = "";
				//var url = 'https://health.cgc999.com/crshop/desk.php';
				
				if(location.host==_this.url.health){

					intersrc = 'https://health.cgc999.com/crshop/desk.php'
				}else{

				  intersrc = 'http://www.cgc999.com/desk.php'
				}

				_this.$http.get(intersrc,{
					params:{
						no: _this.no,
						type:2
					}
				}).then(res => {
					// console.log(res.data)
					if(res.data.status == '00000000') {
						_this.navList = res.data.data.menu

						_this.goodsList = res.data.data.list
						//_this.showList = res.data.data.menu.length > 0 ? true : false
						//_this.inloading = false
					} else {
						_this.showList = false
						_this.inloading = false
					}
				})
			},
			goDetail(url){
				window.location.href = url
			},
			navActive(index,url){
				window.location.href = url
			},
			InitScroll() {
				var _this = this
				_this.$nextTick(() => {
					if(!_this.scroll) {
						_this.scroll = new BScroll(_this.$refs.wrapper, {
							click: true,
							scrollY: true,
							momentum: true,
							pullUpLoad: {
								threshold: 50
							}
						})
						_this.scroll.on('pullingUp', (pos) => {
							_this.onLoadData()
							_this.$nextTick(() => {
								_this.scroll.finishPullUp()
								_this.scroll.refresh()
							})
						})
					} else {
						_this.scroll.refresh()
					}
				})
			},
			onLoadData() {
				this.showLoading = true
				this.showNoMore = false
			},
		}
	}
</script>
<style lang="less" scoped>
	.wrap {
		.h {
			top: 6%!important;
		}
		.wrapper {
			/*position: fixed;*/
			/*top: 0rem;*/
			/*bottom: 1.20rem;*/
			/*overflow: hidden;*/
			padding-bottom: 1.4rem;
			width: 100%;
			background-color: white;
			.pr_box {
				position: relative;
				height: 100%;
				z-index: 11;
				background-color: white;
				max-width: 640px;
				.null_box {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
				}
			}
			.itembox {
				padding: 0.40rem 0;
				background-color: white;
				.item {
					padding: 0.20rem 0.30rem;
					font-size: 0.36rem;
					font-family: PingFangSC-Medium;
					font-weight: 500;
					position: relative;
					img {
						width: 100%;
						height: auto;
					}
					.goodsName {
						color: rgba(53, 53, 53, 1);
						margin-top: 0.20rem;
					}
					.price {
						color: rgba(242, 48, 48, 1);
					}
				}
				.item:not(:last-child):after {
					content: " ";
					position: absolute;
					left: 0;
					bottom: 0;
					right: 0;
					height: 1px;
					border-top: 1px solid #E6E6E6;
					color: #E6E6E6;
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: scaleY(0.5);
					transform: scaleY(0.5);
					left: 0px;
				}
			}
		}
		.foot-box {
			position: fixed;
			bottom: 0;
			right: 0;
			width: 100%;
			height: 1.20rem;
			background: rgba(255, 255, 255, 1);
			z-index: 101;
			ul {
				width: 100%;
				height: 100%;
				display: flex;
				li {
					flex: 1;
					display: flex;
					align-items: center;
					flex-direction: column;
					justify-content: center;
					img {
						width: 0.46rem;
						height: 0.46rem;
						margin-bottom: 0.06rem;
					}
					p {
						font-size: 0.24rem;
						font-family: PingFangSC-Regular;
						color: rgba(26, 38, 66, 1);
					}
					.blue {
						color: #336FFF;
					}
				}
			}
		}
	}
</style>
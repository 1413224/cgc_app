<template>
	<section class='multi_user_mall_box'>
		<settingHeader :title="title"></settingHeader>
		<div v-if="!nohas">
			<!--商品-->
			<!-- v-if="showroute" -->
			<router-view 
				@getMenuId="getMenuId"
				@defaultMenu="isDefaultMenu"
				@nodefaultMenu="noDefault"
				@getAllianceCont="getContent">
			</router-view>

			
			<div class="foot-box" v-if="menuDefault !='' || tabType==''">
				<ul>
					<li v-if="item.show"
						  v-for="(item,index) in navList" 
						  :key="index"
						  @click="navActive(index,item)">
						<img :src="[$route.path == item.src ? item.activeLogo:item.logo]" alt="">
						<p>{{item.navTitle}}</p>
					</li>
				</ul>
			</div>

		</div>
		<div class="no_data1" v-else>
			<div class="pr">
				<Null status="zwsj" text="找不到企业"></Null>
			</div>
		</div>

		<!-- 自定义页面开始 -->
		<div class="diyWrap" v-if="menuId">
			<footnav-comp 
				:codeArrya="codeArrya" 
				:shopMenuId="menuId"></footnav-comp>
		</div>
		<!-- 自定义页面结束 -->
	</section>
</template>

<script>
	import settingHeader from '@/components/setting_header'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import { Qrcode, Popup, CheckIcon, Radio, Checklist } from 'vux'
	import Null from '@/components/null'

	import footnavComp from '@/components/custom/footnavComp'
	

	export default {
		data() {
			return {
				title: "店铺详情",
				navIndex: 3,
				tabIndex: 0,
				nohas: false,
				showIndex: 3,
				navList: [
					{
						navTitle: '首页',
						logo: './static/images/shop-bottom1.png',
						activeLogo: './static/images/shop-bottom1-in.png',
						show: false,
						src:'/multi_user_mall/components/shopindex',
						oIndex: 0
					},
					{
						navTitle: '商品',
						logo: './static/images/shop-bottom2.png',
						activeLogo: './static/images/shop-bottom2-in.png',
						show: false,
						src:'/multi_user_mall/components/goods',
						oIndex: 1,
						name: 'Goods'
					},
					{
						navTitle: '服务',
						logo: './static/images/shop-bottom3.png',
						activeLogo: './static/images/shop-bottom3-in.png',
						show: false,
						src:'/multi_user_mall/components/fuwu',
						oIndex: 2,
						name: 'Fuwu'
					},
					{
						navTitle: '积分',
						logo: './static/images/shop-bottom5.png',
						activeLogo: './static/images/shop-bottom5-in.png',
						show: false,
						src:'/multi_user_mall/components/productList',
						oIndex: 3,
						name: 'ProductList'
					},
					{
						navTitle: '简介',
						logo: './static/images/shop-bottom4.png',
						activeLogo: './static/images/shop-bottom4-in.png',
						show: false,
						src:'/multi_user_mall/components/introduce',
						oIndex: 4,
						name: 'Introduce'
					},
				],
				info: {},
				allianceId: '',
				showList:[],
				menuId:'',
				menuDefault:'',
				allianceContent:'',
				goAlliance:true, //判断是否请求自定义页面
				objid:"",
				tabType:""
			}
		},
		components: {
			settingHeader,
			swiper,
			swiperSlide,
			Qrcode,
			Popup,
			Radio,
			Checklist,
			CheckIcon,
			Null,

			footnavComp,
		},
		created() {
			var _this = this
			// _this.$store.commit('changeShopMenuId',"")
			/*if(_this.$route.path == "/multi_user_mall/components/goods"){
				_this.goGoods()
			}else if(_this.$route.path == "/multi_user_mall/components/fuwu"){
				_this.goFuwu()
			}else if(_this.$route.path == "/multi_user_mall/components/productList"){
				_this.goProductList()
			}else if(_this.$route.path == "/multi_user_mall/components/introduce"){
				_this.goIntroduce()
			}else{
				_this.getBasicInfo()//获取企业详情信息
			}*/
			_this.getBasicInfo()
			// console.log(_this.$route.path)
		},
		mounted() {},
		/*beforeRouteLeave(to,from,next){
			this.$store.commit('changeShowDefaultNav',true)//显示默认底部菜单栏
			next()
		},*/
		/*beforeRouteEnter(to,from,next){
			next(vm=>{
				console.log(to)
				console.log(from)
			})
		},*/
		methods: {
			navActive(index, item) {
				this.$router.replace({
					path:item.src,
					query:{
						eid:this.$route.query.eid,
						allianceId:this.$route.query.allianceId
					}
				})
			},
			getMenuId(menuId){
				// console.log(menuId)
				this.menuId = menuId
				// console.log(this.menuId)
			},
			isDefaultMenu(cont){
				this.menuDefault = cont
				// console.log(cont)
			},
			//获取自定义首页子元素传入的企业信息
			//默认底部导航
			getContent(cont){
				this.showdefaultMenu(cont)
			},
			//不显示默认底部菜单
			noDefault(cont){
				// console.log(cont)
				this.menuDefault = ""
				this.tabType = 2
			},
			// 获取企业详情
			getBasicInfo() {
				var _this = this

				_this.$http.get(_this.url.qy.getBasicInfo, {
					params: {
						enterpriseId: _this.$route.query.eid
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						_this.allianceId = res.data.data.allianceId
						_this.allianceContent = res.data.data
						// console.log(_this.allianceContent)
							if(_this.allianceId){
								//发展会员
								var offLine = _this.mainApp.getCs('offLine');
										// aid = _this.mainApp.getCs('eid');
								if(offLine){
									localStorage.setItem("_allianceid_",_this.allianceId)
								}
								//获取企业自定义页面信息
								_this.getAllianceDiypage(res.data.data)
							}else{
								
								_this.publicAlliance(res.data.data)
							}

					} else if(res.data.status == 'plat-0003') {
						_this.nohas = true
					}else if(res.data.status == 'user-0032'){
						_this.nohas = true
					}

					_this.publicAlliance(res.data.data)

				})
			},

			publicAlliance(data){//路由跳转
				var _this =this
				_this.info = data
				_this.navList[3].show = true


				if(_this.info.isAlliance==1){
					if(_this.info.isChains==1){
						//跳转至商品
						_this.navList[1].show = true
						_this.navList[2].show = true
						_this.navList[4].show = true

						_this.goGoods()
					}else{
						_this.navList[1].show = true
						_this.navList[4].show = true
						
						_this.goGoods()
					}
				}else if(_this.info.isAlliance==0){
					if(_this.info.isChains==1){
						//跳转至服务
						_this.navList[2].show = true
						_this.navList[4].show = true

						_this.goFuwu()
					}else{
						//跳转至详情
						// _this.showNav = false
						// _this.navList[3].show = true
						_this.navList[4].show = true
						_this.goIntroduce()
					}
				}

				localStorage.setItem('storeInfo', JSON.stringify(data))
				if(_this.info.logo) {
					_this.logo = _this.info.logo.original
				}	
			},
			


			getAllianceDiypage(detail){//获取自定义页面
				var _this = this;
				_this.$http.get(_this.url.user.diyPage,{
					params:{
						allianceId:_this.allianceId,
						type:1
					}
				}).then((res)=>{
					if(res.data.status=="00000000"){
						if(res.data.data !==""){
							_this.showList = JSON.parse(res.data.data.content)
							_this.$router.replace({
								path:'/multi_user_mall/components/shopindex',
								query:{
									eid:_this.$route.query.eid,
									allianceId:_this.allianceId
								}
							})
							return;
						}
					}
					// _this.publicAlliance(detail)  
				})
			},
			showdefaultMenu(data){
				console.log(data)
				var _this = this
				_this.navList[3].show = true
				_this.navList[0].show = true

				if(data.isAlliance==1){
					if(data.isChains==1){
						//商品
						_this.navList[1].show = true
						_this.navList[2].show = true
						_this.navList[4].show = true
					}else{
						_this.navList[1].show = true
						_this.navList[4].show = true
					}
				}else if(data.isAlliance==0){
					if(data.isChains==1){
						//服务
						_this.navList[2].show = true
						_this.navList[4].show = true
					}else{
						//详情
						_this.navList[4].show = true
					}
				}
			},

			goGoods(){
				var _this = this
				_this.$router.replace({
					path:'/multi_user_mall/components/goods',
					query:{
						eid:_this.$route.query.eid,
						allianceId:_this.$route.query.allianceId
					}
				})
			},
			goFuwu(){
				var _this = this
				_this.$router.replace({
					path:'/multi_user_mall/components/fuwu',
					query:{
						eid:_this.$route.query.eid
					}
				})
			},
			goIntroduce(){
				var _this = this
				_this.$router.replace({
					path:'/multi_user_mall/components/introduce',
					query:{
						eid:_this.$route.query.eid
					}
				})
			},
			goProductList(){
				var _this = this
				_this.$router.replace({
					path:'/multi_user_mall/components/productList',
					query:{
						eid:_this.$route.query.eid
					}
				})
			}
		},
		watch:{
			/*$route(to,from){ //用于判断路由与自定义页面不在同一页显示
				var _this = this;
				if(to.path !="/multi_user_mall"){
					// _this.showroute = false
					_this.showDiypage = false
				}else{
					_this.showDiypage = true
				}
			}*/
		}
	}
</script>
<style lang="less" scoped>
	.multi_user_mall_box {
		padding-bottom: 80px;
		.diyWrap {
			min-height: 100%;
		}
		.no_data1 {
			position: fixed;
			height: 100%;
			width: 100%;
			background-color: white;
			.pr {
				height: 100%;
				width: 100%;
				position: relative;
				.null_box {
					position: relative;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -60%);
				}
			}
		}
		.foot-box {
			position: fixed;
			bottom: 0;
			/*right: 0;*/
			width: 100%;
			max-width: 640px;
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
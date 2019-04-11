<template>
<div>
	<div style="height: 50px;"></div>
	<div class="footnav" 
			:class="['footpadding',footnavConfig.iconType==2]"
		:style="{'background':footnavConfig.backgroundColor}"
		v-if="footnavConfig.iconType==2">
		<!-- footnavConfig.iconType==2 -->
		<div class="imgnav">
			<ul>
				<li v-for="(item,index) in footnavConfig.image.imgList" :key="index">
					<!-- <router-link :to="item.src"><img :src="[$route.path == item.src ? item.iconIn : item.icon]" alt=""></router-link> -->
					<p @click.stop="goUrls(item,item.url.code)"><img :src="[$route.path == item.url.url ? item.activeImgUrl : item.imgUrl]" alt=""></p>
				</li>
			</ul>
		</div>
	</div>

	<!-- icon类型 -->
	<div class="footnav" 
			:style="{'background':footnavConfig.backgroundColor}"
			v-else-if="footnavConfig.iconType==1">
			<!-- footnavConfig.iconType==1 -->
		<div class="iconwrap" :style="{borderTopColor:footnavConfig.borderColor}">
			<ul>
				<li :class="widthObject" 
						:style="{borderRightColor:footnavConfig.borderColor}"
					v-for="(item,index) in footnavConfig.icon.iconList" 
					:key="index"
					@click.stop="goPages(item,index,$event)"
					>
					<div class="par">
						<!-- 有二级菜单时显示 -->
						<!-- <template v-if="item.childList">
							<i class="iconfont" :class="item.icon"></i>
							<p>{{item.text}}</p>
						</template> -->
						<!-- 有二级菜单时显示 -->
						<template>
							<i 
								class="iconfont" 
								:class="item.icon"
								:style="iconStyObj"></i>
							<p :style="{'color':footnavConfig.icon.textColor}">{{item.text}}</p>
						</template>
					</div>
					
					<div class="child" 
							 :class="{cur:current==index}" 
							 v-if="item.childList.length !=0 && item.show"
							 v-show="current==index">
							 <!-- && istoggle==true -->
							<span :style="childStyle"
								@click.stop="goUrls(child,child.url.code)" 
								v-for="(child,index) in item.childList" 
								:key="index">
								{{child.text}}
							</span>
						<!-- <span class="arrow"></span> -->
					</div>
				</li>
			</ul>
		</div>
	</div>
	<!-- icon类型end -->
</div>

</template>

<script>
import { mapState } from 'vuex'
export default {
	computed:{
		...mapState({
				menuId: state => state.user.menuId,
				
				showMenu: state => state.user.showMenu,
				platformMenuId: state => state.user.platformMenuId
		}),
		widthObject(){
			var _this = this;

			if(_this.footnavConfig.iconType=='1'){
				var iconLng = _this.footnavConfig.icon.iconList.length
				if(iconLng==1){
					return { width1:true }
				}else if(iconLng==2){
					return { width2:true }
				}else if(iconLng==3){
					return { width3:true }
				}else if(iconLng==4){
					return { width4:true }
				}else{
					return { width5:true }
				}
			}
		}
	},
	props: {
		/*footnavConfig:{
			type:Object,
			default:{}
		}*/
		codeArrya:{
			type:Object,
			default:{}
		},
		show:{
			type:Boolean,
			default:false
		},
		objId:{//判断店铺内的链接，需要传参
			type:Object,
			default:{}
		},
		platformId:{//行业平台menuid
			type:String,
			default:''
		},
		specialMenuId:{//专题页的底部菜单id
			type:String,
			default:''
		},
		shopMenuId:{//店铺的底部菜单
			type:String,
			default:''
		}
	},
	data() {
		var _this = this;
		return {
			styleObj:{
				backgroundColor:''
			},
			iconStyObj:{
				color:''
			},
			current:-1,
			footnavConfig:{},
			imgList:[],
			childStyle:{
				backgroundColor:'',
				color:'',
				borderColor:''
			},
			objectId:''
		}
	},
	created() {
		if(this.platformId){
			this.getdiyPage(this.platformId,'platformMenuId')
		}

		if(this.specialMenuId){
			this.getdiyPage(this.specialMenuId,'specialMenuId')
		}

		if(this.shopMenuId){
			this.getdiyPage(this.shopMenuId,'shopMenuId')
		}
		// console.log(this.shopMenuId)

	},
	mounted() {
		document.querySelector('body').addEventListener('click',this.hide)
	},
	beforeDestroy(){
		document.querySelector('body').removeEventListener('click',this.hide)
	},
	methods: {

		goPages(item,index,e){
			// console.log(item)
			// console.log(index)
			var len = this.footnavConfig.icon.iconList.length,
					dataList = this.footnavConfig.icon.iconList,
					code = item.url.code,
					_this = this;
			if(item.childList.length !=0){

				_this.resetDataList(item,dataList,len,index)
				_this.current = index
			}else{

				_this.resetDataList(item,dataList,len,index)
				_this.current = index
				_this.goUrls(item,code)
			}

		},
		resetDataList(item,dataList,len,index){
			item.show = !item.show
			for(var i=0;i<len;i++){
				if(i==index){
					continue;
				}else{
					dataList[i].show=false
				}
			}
		},
		hide(){
			// console.log(this.footnavConfig.icon)
			if(typeof(this.footnavConfig.icon)!="undefined"){
				var dataList = this.footnavConfig.icon.iconList;
				dataList.forEach((item,index)=>{
					item.show = false
				})
				this.current = -1	
			}		
		},

		getdiyPage(menuId,statustr){

			var _this = this;
			var resurl;
				if(menuId==""){
					return;
				}

				if(statustr=='specialMenuId'||statustr=='shopMenuId'){
					resurl = _this.url.user.diyMenu
				}
				if(statustr=='platformMenuId'){
					resurl = _this.url.user.platformDiymenu
				}

				_this.$http.get(resurl,{
					params:{
						menuId:menuId
					}
				}).then((res) => {
					if(res.data.status=="00000000"){
					
						var footnavData = JSON.parse(res.data.data.content);
						_this.footnavConfig = footnavData
						// console.log(_this.footnavConfig)
						if(!_this.footnavConfig){
							return false;
						}
						_this.imgList = _this.footnavConfig.image.imgList
						//icon颜色
						_this.iconStyObj.color = _this.footnavConfig.icon.iconColor;
						_this.childStyle.backgroundColor = _this.footnavConfig.icon.childColor.backgroundColor;
						_this.childStyle.color = _this.footnavConfig.icon.childColor.textColor;
						_this.childStyle.borderColor = _this.footnavConfig.icon.childColor.borderColor

						//底部菜单遍历
						if(_this.footnavConfig.iconType=='2'){

							_this.imgList.forEach((item,index)=>{
								_this.codeArrya.forEach((ite,ind)=>{
									if(item.url.code == ite.code){
										item.url.url = ite.src
									}
								})
							})
						}
						// console.log(_this.footnavConfig)
						// console.log(_this.objId) //拿到objId
						_this.objectId = _this.objId
						// console.log(_this.objectId)
					}
				})
		},
		goUrls(item,code){
			var _this = this;
			if(code==""){
				return;
			}

			if(Number(code)==50000){
				window.location.href = item.url.url
			}

			_this.codeArrya.forEach((item,index)=>{
				if(code==item.code){
					
					//店铺相关
					if(_this.objectId.id){
						if(_this.objectId.allianceId){
							_this.$router.push({
								path:item.src,
								query:{
									id:_this.objectId.id,
									allianceId:_this.objectId.allianceId
								}
							})
						}else{
							_this.$router.push({
								path:item.src,
								query:{
									id:_this.objectId.id,
								}
							})
						}
						return;
					}

					_this.$router.push({
						path:item.src
					})
				}
			})

		}
	},
	components: {

	},
	watch:{
		/*menuId(id){
			console.log("改变了")
			this.getdiyPage(id)
		},
		shopMenuId(id){
			this.getdiyPage(id)
		},*/
		/*platformMenuId(id){
			this.getdiyPage(id)
		}*/
	}
}
</script>

<style lang="less" scoped>
@import '//at.alicdn.com/t/font_912483_lcojf3qe8m.css';
.footnav{
	width: 100%;
	max-width: 640px;
	height: 50px;
	/*border: 1px solid #333;*/
	position: fixed;
	bottom: 0;
	/*left: 0;*/
	z-index: 10000;
	.width1{
		.child{
			width: 7.2rem;
		}
	}
	.width2{
		.child{
			width: 3.5rem;
		}
	}
	.width3{
		.child{
			width: 2rem;
		}
	}
	.width4{
		.child{
			width: 2rem;
		}
	}
	.width5{
		.child{
			width: 1.8rem;
		}
	}
	a{
		display: inline-block;
	}
	.imgnav{
		height: 50px;
		line-height:50px;
		ul{
			display: flex;
			height: 50px;
			li{
				flex: 1;
				/*display: flex;*/
				text-align: center;
				img{
					width: 1rem;
				}
			}
		}
	}
	/*icon*/
	.iconwrap{
		height: 100%;
		border-top-width: 1px;
		border-top-style: solid; 
		ul{
			display: flex;
			height: 100%;
			li:last-child{
				border-right:none;
			}
			li{
				flex: 1;
				text-align: center;
				position: relative;
				border-right-width:1px;
				border-right-style: solid; 
				i{
					font-size: .45rem;
				}
				p{
					position: relative;
				}
				.child{
					position: absolute;
					bottom: 100px;
					padding:6px 8px;
					border-radius: 2px;

					span{
						display:block;
						padding: 8px 0;
						border-width: 1px;
						border-style: solid;
					}
					a{
						display:block;
						padding: 4px 0;
					}
					.arrow{
						width: 0px;
						height: 0px;
						display: inline-block;
						position: relative;
						border-width: 8px;
						border-style: solid;
						border-color: #333 transparent transparent transparent;
						position: absolute;
						bottom: -15px;
						left: 32px;
					}
				}
			}
		}

		/* 可以设置不同的进入和离开动画 */
		/* 设置持续时间和动画函数 */
		/* .slide-fade-enter-active {
		  transition: all .3s ease;
		}
		.slide-fade-leave-active {
		  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
		}
		.slide-fade-enter, .slide-fade-leave-to
		.slide-fade-leave-active for below version 2.1.8 {
		  transform: translateX(10px);
		  opacity: 0;
		}
		
			} */
	/*icon结束*/
	
	@keyframes cur
	 	{
	 		from { opacity: 0; bottom:50px;}
	 		to { opacity: 1; bottom:60px;}
	 	}
	 	@-webkit-keyframes cur
	 	{
	 		from { opacity: 0; bottom:50px;}
	 		to { opacity: 1; bottom:60px;}
	 	}	
	 	.cur{
	 		animation:cur 500ms ;
	 		-moz-animation:cur 500ms ;
	 		-webkit-animation:cur 500ms ;
	 		-o-animation:cur 1s ;
	 		animation-fill-mode: forwards;
	 	}   
	}
}
.footpadding{
	height: 60px;
	.imgnav{
		height: 60px;
		line-height: 60px;
		ul{
			height: 60px;
			li{
				img{
					vertical-align: middle;
				}
			}
		}
	}
}
</style>
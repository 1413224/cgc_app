<template>
<!-- {background:noticeConfig.data.backgroundColor} -->
	<div class="notice-wrap" :style="noticeBgcolor">
		<img :src="noticeConfig.data.icon ? noticeConfig.data.icon : './static/index/index_notice.png'" alt="">
		<div class="wap">
			<marquee 
				v-if="noticeConfig.data.contentType==1" 
				:duration='noticeConfig.data.speed * 1000'
				>
				<template v-for="(item,index) in noticeConfig.data.noticeList">
					<marquee-item
						@click.native="goDetail(item)" 
						 class="align-middle">
						<span :style="styleObject">{{item.text}}</span>
					</marquee-item>
				</template>
			</marquee>

			<marquee 
				v-if="noticeConfig.data.contentType==0" 
				:duration='noticeConfig.data.speed * 1000'
				>
				<template v-for="(item,index) in articleList">
					<marquee-item 
						@click.native="goDetail(item.articleId)" 
						class="align-middle">
						<span :style="styleObject">{{item.title}}</span>
					</marquee-item>
				</template>
			</marquee>
		</div>
		<!-- /member/generalize/index -->
		<!-- /member/article/index 快讯列表 -->
		<router-link to="/member/generalize/index" v-if="noticeConfig.data.contentType==0">
			<i class="icon iconfont icon-arrow-right "></i>
		</router-link>
	</div>
</template>

<script>
	import { Marquee,MarqueeItem } from 'vux'
	export default {
		props: {
			noticeConfig:{
				type:Object,
				default:{}
			}
		},
		data() {
			return {
				styleObject:{
					color:this.noticeConfig.data.color
				},
				articleList:[],

			}
		},
		created() {

		},
		mounted() {
			// console.log(this.noticeConfig)
			if(this.noticeConfig.data.contentType=='0'){
				this.getShopNotice()
			}
		},
		methods: {
			goDetail(uri){
				this.$router.push({
					path:'/member/article/detail',
					query:{
						id:uri
					}
				})
			},
			//判断是否是商城公告
			getShopNotice(){
				var _this = this;
				if(_this.noticeConfig.data.contentType == '0'){
					_this.$http.get(_this.url.user.getLists,{
						params:{
							type:1,
							curPage:1,
							pageSize:10
						}
					}).then((res)=>{
						if(res.status == 200) {

						_this.articleList = res.data.data.list
							// console.log(_this.articleList)
						} else {
							Vue.$vux.toast.show({
								text: "请求快讯失败",
								type: 'text',
								position: 'middle',
								width: '50%'
							})
						}
					})
				}
			}
		},
		computed:{
			noticeBgcolor(){
				if(this.noticeConfig.data.isInheritBackgroundColor=="1"){
					return {
						backgroundColor:this.noticeConfig.data.backgroundColor
					}
				}else{
					return {
						backgroundColor:this.noticeConfig.data.allBackgroundColor
					}
				}
			}
		},
		components: {
			MarqueeItem,
			Marquee
		}
	}
</script>

<style lang="less" scoped>
.notice-wrap {
	width: 100%;
	height: 0.8rem;
	padding: 0rem 0.30rem;
	background-color: #fff;
	display: flex;
	align-items: center;
	color: #425884;
	font-size: 0.24rem;
	box-sizing: border-box;
	overflow: hidden;
	.wap{

	}
	.vux-marquee {
		width: 5rem !important;
		/*border:1px solid #333;*/
		padding-left: 5px;
		line-height: 32px;
		font-size: 0.26rem;
		font-family: PingFangSC-Regular;
		color: rgba(26, 38, 66, 1);
		.align-middle {
			/*// display: inline-block;*/
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
	img {
		width: 0.76rem;
		height: 0.38rem;
		border-right: 1px solid #E1E1E1;
		padding-right: 0.21rem;
	}
	i {
		margin-left: 0.3rem;
		font-size: 0.5rem;
		color: #90A2C7;
	}
}
</style>
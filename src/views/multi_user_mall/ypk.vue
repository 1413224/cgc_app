<template>
	<div class="wrap">
		<settingHeader title="约派克·约成功"></settingHeader>
		<div class="cont">
			<p class="tit">请选择</p>
			<div class="item clearfix">
				<div class="left fl"><img src="../../../static/images/exf.png" alt=""></div>
				<div class="right fl">
					<p class="itemtit">公众号</p>
					<p class="hea">CGC联盟公众号</p>
					<p class="desc">买单消费 赢5000元大奖</p>
					<div class="btn" @click="goCGC()">关注</div>
				</div>
			</div>

			<div class="item clearfix">
				<div class="left fl"><img src="../../../static/images/ypksg.png" alt=""></div>
				<div class="right fl">
					<p class="itemtit">活动</p>
					<p class="hea">约派克周六水果专场</p>
					<p class="desc">多款供应链直供水果</p>
					<div class="btn" @click="buy()">购买</div>
				</div>
			</div>

			<div class="item clearfix">
				<div class="left fl"><img src="../../../static/images/ypkdc.png" alt=""></div>
				<div class="right fl">
					<p class="itemtit">菜谱</p>
					<p class="hea">店内点餐消费</p>
					<!-- <p class="desc">买单消费 赢5000元大奖</p> -->
					<div class="btn btn2" @click=buyFoot()>点单</div>
				</div>
			</div>

			<div class="item clearfix">
				<div class="left fl"><img src="../../../static/images/ypkdp.png" alt=""></div>
				<div class="right fl">
					<p class="itemtit">线上店铺</p>
					<p class="hea">约派克线上店铺</p>
					<p class="desc">全球智慧餐饮独角兽平台</p>
					<div class="btn btn2" @click=goShop()>查看</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import settingHeader from '@/components/setting_header'
	export default {
		props: {

		},
		computed:{

		},
		data() {
			return {
				no:'',//约派克座位号
			}
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
					}
				}
			}
		},
		mounted() {
			this.onLoad()
		},
		methods: {
			goCGC(){
				window.location.href = 'https://health.cgc999.com/web/new/index.html#/multi_user_mall/cgcqrcode?no=' + this.no
			},
			buy(){
				window.location.href = 'https://health.cgc999.com/web/new/index.html#/multi_user_mall/paybill?no=' + this.no
			},
			buyFoot(){
				window.location.href = ''
			},
			goShop(){
				window.location.href = 'https://health.cgc999.com/web/new/index.html#/multi_user_mall/components/goods?id=enterBasic620436368300000001'
			},

			onLoad(){
				var _this = this,
					intersrc = "";
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
				}).then((res)=>{
					if(res.data.status == '00000000'){
						console.log(res.data)
					}
				})

			}

		},
		components: {
			settingHeader
		}
	}
</script>

<style lang="less" scoped>
.cont{
	padding: .26rem .56rem;
	.tit{
		color: #151515;
		font-size: .48rem;
		font-weight: bold;
		margin-bottom: .2rem;
	}
	.item{
		width: 100%;
		/*border: 1px solid #333;*/
		border-radius: 10px;
		background:#fff;
		box-shadow: 5px 5px 10px #DEE3F1,-5px -5px 10px #DEE3F1;
		position: relative;
		margin-bottom: .3rem;
		.left{
			width:2.5rem;
			img{
				width: 100%;
				vertical-align: middle;
			}
		}
		.right{
			padding: .2rem .3rem;
			.itemtit{
				font-size: .2rem;
				color: #A0A0A0;
			}
			.hea{
				font-size: .32rem;
				color: #211F29;
				margin: .1rem 0;
				font-weight: bold;
			}
			.desc{
				color: #A0A0A0;
				font-size: .24rem;
			}
			.btn,.btn2{
				position: absolute;
				bottom: 0.2rem;
				right: .3rem;
				width: 1.6rem;
				height: .68rem;
				line-height: .68rem;
				text-align: center;
				color: #fff;
				font-size: .28rem;
				font-weight: bold;
				border-radius: .4rem;
			}
			.btn{
				background:linear-gradient(216deg,rgba(255,92,52,1) 0%,rgba(255,42,75,1) 100%,rgba(255,42,75,1) 100%);
			}
			.btn2{
				background:linear-gradient(315deg,rgba(12,74,234,0.99) 0%,rgba(57,115,255,0.9) 100%);
			}
		}
	}
}
</style>
<template>
	<section class="qrcode">
		<settingHeader v-if="title" :title="title"></settingHeader>
		<div class="blue">
			<div class="content">
				<div class="store">
					<div class="name">{{title}}</div>
					<!--<div>联盟企业</div>-->
					<div class="mt">
						<img :src="imgsrc" alt="">
					</div>
					<div class="btn">长按扫描二维码</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>

import settingHeader from '../../components/setting_header'
export default {
	data() {
		return {
			title:""
		}
	},
	components: {
		settingHeader
	},
	created() {
		this.getcgcQrcode()
	},
	mounted() {

	},
	methods: {
		getcgcQrcode(){
			var _this = this,
					intersrc = "";

			if(location.host==_this.url.health){
				intersrc = 'https://health.cgc999.com/crshop/desk.php'
			}else{
			  intersrc = 'http://www.cgc999.com/desk.php'
			}

			_this.$http.get(intersrc,{
				params:{
					type:3
				}
			}).then((res)=>{
				if(res.data.status == '00000000'){
					// console.log(res.data)
					_this.title = res.data.data.title
					_this.imgsrc = res.data.data.thumb
					// console.log(_this.title)
				}
			})
		}
	}
}
</script>
<style lang="less" scoped>
.qrcode {
		background: #90A2C7;
		height: 100%;
		.blue {
			padding-top: 1.19rem;
			.content {
				width: 88.8%;
				background: #fff;
				margin: 0 auto;
				padding-top: 0.72rem;
				border-radius: 0.08rem;
				.store {
					width: 5.06rem;
					margin: auto;
					color: #1A2642;
					font-size: 0.28rem;
					padding-bottom: 0.91rem;
					text-align: center;
					.name {
						font-size: 0.44rem;
						margin-bottom: 0.02rem;
					}
					.mt {
						margin-top: 0.35rem;
						width: 5rem;
						height: 5rem;
						img{
							width: 100%;
							height: 100%;
						}
					}
					.btn {
						margin-top: 0.72rem;
						font-size: 0.24rem;
						color: #90A2C7;
						text-align: center;
					}
				}
			}
		}
	}
</style>
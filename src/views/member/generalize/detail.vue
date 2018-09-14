<template>
	<div class="wrap">
		<settingHeader :title="title"></settingHeader>
		<div class="content">
			<div class="tit">{{data.title}}</div>
			<p class="author">{{data.author}} <span>{{data.createTime | getDate}}</span></p>
			<div class="cont" v-html="data.content"></div>
			<div class="yuedu">阅读：{{data.pv}}</div>
		</div>
	</div>
</template>
<script>
	import settingHeader from '../../../components/setting_header'

	export default {
		data(){
			return {
				title:'文章详情',
				data:''
			}
		},
		components:{
			settingHeader,

		},
		mounted() {
			this.onLoadData()
		},
		methods:{
			onLoadData(){
				var _this = this 
				_this.$http.get(_this.url.user.getDetails,{
					params:{
						type:2,
						articleId:_this.$route.query.id,
						userId:_this.$store.state.user.userId
					}
				}).then((res) => {
					if(res.data.status == "00000000"){
						console.log(res.data.data)
						_this.data = res.data.data
					}
				})
			}
		}
	}
</script>

<style lang='less' scoped>
.content{
	width: 95%;
	padding:.1rem;
	.tit{
		font-size: .40rem;
		color: #1A2642;
	}
	.author{
		font-size: .28rem;
		color: #7386AD;
		margin-top: .2rem;
		span{
			display: inline-block;
			margin-left: .1rem;
		}
	}
	.cont{
		text-indent: .6rem;
		margin:.1rem 0;
	}
	.yuedu{
		font-size: .28rem;
		color: #7386AD;
	}
}
</style>
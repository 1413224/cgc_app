<template>
	<section class="search">
		<settingHeader :title="title"></settingHeader>
		<div class="searchBox">
			<div class="searchInput">
				<img :src="'./static/images/ss.png'" />
				<input type="text" placeholder="搜索商品" @click="showCanel" ref="search" @focus="showCanel">
			</div>
			<div class="canel" v-if="canel == true" @click="back">取消</div>
			<div class="clear"></div>
		</div>
		<div class="recommended-search">
			<div class="searchList">
				<li v-for="(item, index) in searchList" @click="goProduct">{{ item}}</li>
			</div>
			<div class="clear"></div>
		</div>
	</section>
</template>

<script>
	import settingHeader from '../../components/setting_header'
	export default {
		data() {
			return {
				title: "店铺内搜索",
				canel: false,
				searchList: [
					'短裤', '时尚大牌', '热卖推荐', '男士衬衫'
				]
			}
		},
		components: {
			settingHeader
		},
		mounted() {
			this.$refs.search.focus()
			console.log('---', this.$refs.search)
		},
		methods: {
			goProduct() {
				this.$router.push({
					path: '/shop/product'
				})
			},
			showCanel() {
				this.canel = true
			},
			back() {
				this.$router.go(-1)
			}
		}
	}
</script>

</script>

<style lang="less" scoped>
	.search {
		height: 100%;
		background: #fff;
		.recommended-search {
			color: #1A2642;
			font-size: 0.28rem;
			.searchList {
				margin: 0;
				background: #fff;
				height: 0.83rem;
				margin: 0 0.26rem;
				li {
					width: 100%;
					list-style: none;
					line-height: 0.83rem;
					border-bottom: 1px solid #D8DFF0;
				}
			}
		}
	}
	
	.searchBox {
		width: 100%;
		background: #fff;
		border-top: 0.01rem solid #D8DFF0;
		border-bottom: 0.01rem solid #D8DFF0;
		display: flex;
		align-items: center;
		.searchInput {
			position: relative;
			width: 80%;
			margin: 0;
			margin-left: 0.29rem;
			padding: 0.14rem 0;
			float: left;
			img {
				position: absolute;
				width: 5%;
				top: 0.28rem;
				left: 0.26rem;
			}
			input {
				vertical-align: middle;
				width: 100%;
				background: #F5F6FA;
				border-radius: 2px;
				color: #1A2642;
				height: 0.59rem;
				line-height: 0.59rem;
				vertical-align: middle;
				padding: 0rem 0.1rem 0rem 0.78rem;
				box-sizing: border-box;
			}
			input::-webkit-input-placeholder {
				color: #90A2C7 !important; // WebKit browsers 
			}
			input:-moz-placeholder {
				color: #90A2C7 !important; // Mozilla Firefox 4 to 18 
			}
			input::-moz-placeholder {
				color: #90A2C7 !important; //Mozilla Firefox 19+ /
			}
			input:-ms-input-placeholder {
				color: #90A2C7 !important; //Internet Explorer 10+ */
			}
		}
		.canel {
			float: left;
			color: #1A2642;
			font-size: 0.24rem;
			text-align: center;
			height: 0.59rem;
			line-height: 0.59rem;
			flex: 1;
		}
	}
</style>
<template>
	<div class="cardindex-box">
		<x-header class="b-w" :left-options="{backText:''}">

		</x-header>
		
		<div class="tip" v-show="tip">正在刷新...</div>

			<scroll class="wrapper" 
			:listenScroll="listscroll" 
			:pullingDown="pullingdown"
			@pullDown="onpullingDown"
			:pullingUp = "pullingUp"
			>
				<div>
					<div class="list">测试数据1</div>
					<div class="list">测试数据2</div>
					<div class="list">测试数据3</div>
					<div class="list">测试数据</div>
					<div class="list">测试数据</div>
					<div class="list">测试数据</div>
					<div class="list">测试数据</div>
					<div class="list">测试数据</div>
					<div class="list">测试数据</div>
					<div class="list">测试数据</div>	
					<div class="list">测试数据</div>
					<div class="list">测试数据</div>
					<div class="list">测试数据</div>
					<div class="list">测试数据</div>
					<div class="list">测试数据</div>
					<div class="list">测试数据</div>
					<div class="list">测试数据</div>
					<div class="list">测试数据</div>
					<div class="list">测试数据</div>
					<div class="list">测试数据</div>
					<div class="list">测试数据0</div>
				</div>
			</scroll>
		

	</div>
</template>

<script>
	import { Badge, Cell, Group, Masker, Drawer, Tab, TabItem, Swiper, SwiperItem, XHeader } from 'vux'
	import Loading from '../../../components/loading'
	import Nomore from '../../../components/noMore'
	import noData from '../../../components/noData'
	import scroll from '../../../components/scroll.vue'
	import BScroll from 'better-scroll'
	export default {
		data() {
			return {
				title: '全部卡包',
				pullingdown:true,
				pullingUp:true,
				listscroll:true,
				dropDown:false,
				tip:false
			}
		},
		created() {

		},
		mounted() {

		},
		methods: {
			
			onpullingDown(){
				// 模拟更新数据
				var _this = this
				this.tip = true
				setTimeout(() => {
					_this.tip = false
				},2000)
				
			}


		},
		components: {
			Badge,
			Cell,
			Group,
			Masker,
			Drawer,
			Tab,
			TabItem,
			Swiper,
			SwiperItem,
			Loading,
			XHeader,
			Nomore,
			noData,
			scroll
		}
	}
</script>

<style lang="less">
	.wrapper{
		width: 100%;
		position: absolute;
		top:46px;
		bottom: 0;
		overflow: hidden;
	}
	.list{
		width: 100%;
		height: 50px;
		background: #ccc;
		border-bottom: 1px solid #fff;
	}
	.tip{
		width: 100%;
		height: 50px;
		line-height: 50px;
		background: rgba(0,0,0,.5);
		position: fixed;
		z-index: 1;
		color: #fff;
		text-align: center;
	}
</style>
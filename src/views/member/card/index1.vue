<template>
	<div class="cardindex-box">
		<x-header class="b-w" :left-options="{backText:''}">

		</x-header>
		
		
			<scroll class="wrapper" 
			:listenScroll="listscroll" 
			:pullingDown="pullingdown"
			@pullingDown = "onpullingDown"
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
				downText:'下拉刷新',
				// downTip:false
				// onpullingDownTip:false,
				listscroll:true,
				dropdown:false
			}
		},
		created() {

		},
		mounted() {

		},
		methods: {
			
			onPullingDown(){
				// 模拟更新数据
				var _this = this
				console.log("下拉刷新成功")
				alert(9)
				/*setTimeout(() => {
					_this.dropdown = false
				},2000)*/
				// this.downTip = false
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
</style>
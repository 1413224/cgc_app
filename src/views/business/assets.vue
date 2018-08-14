<template>
    <div class="assetswap">
        <settingHeader :title="title"></settingHeader>
        <div class="top2">
			<div class="left">
			<!-- storeLogo -->
				<img class="store-logo" src="../../../static/shop/storeLogo.png">
				<div class="middle">
					<p class="name ellipsis">国美电器（番禺店）</p>
					<div>
						<p>区域运营商</p>
					</div>
				</div>
			</div>
			<div class="right">
				
				<p>切换身份</p>
			</div>
		</div>
		
		<div class="shouyi">
			<swiper :options="swiperOption">
		        <swiper-slide>
					<p class="tit">累计收益</p>
					<p class="num">5981.61<span>万</span></p>
					<p class="time"><span>今日实时 </span>更新时间20:20:25</p>
					<div class="three clearfix	">
						<div class="items fl">
							<p class="numbers ellipsis">256212.32</p>
							<p class="date">7日收益（元）</p>
						</div>
						<div class="items fl">
							<p class="numbers ellipsis">256212.32</p>
							<p class="date">7日收益（元）</p>
						</div>
						<div class="items fl">
							<p class="numbers ellipsis">256212.32</p>
							<p class="date">7日收益（元）</p>
						</div>
					</div>
		        </swiper-slide>
		        <swiper-slide>Slide 2</swiper-slide>
		        <div class="swiper-button-prev" slot="button-prev"></div>
		        <div class="swiper-button-next" slot="button-next"></div>
		    </swiper>
		</div>

		<div class="ka clearfix">
			<div class="item fl">
				<p class="img"><img src="../../assets/images/member/shouyi.png" alt=""></p>
				<p class="number">12543.25</p>
				<p class="cont">今日收益（元）</p>
			</div>
			<div class="item fl">
				<p class="img"><img src="../../assets/images/member/huiyuan.png" alt=""></p>
				<p class="number">12543.25</p>
				<p class="cont">今日新增会员（人）</p>
			</div>
			<div class="item fl">
				<p class="img"><img src="../../assets/images/member/dengpao.png" alt=""></p>
				<p class="number">12543.25</p>
				<p class="cont">设备异常（台）</p>
			</div>
		</div>

	</div>
</template>
<script>

import settingHeader from '../../components/setting_header'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
    data(){
        return {
            title:'企业资产',
          	swiperOption:{
          		navigation:{
          			nextEl:'.swiper-button-next',
          			prevEl:'.swiper-button-prev'
          		}
          	}
        }
    },
    components:{
    	settingHeader,
    	swiper,
    	swiperSlide
    },
    created () {
    
    },
    mounted(){

    },
    methods:{
    	
    }
}
</script>
<style lang="less" scoped>
.assetswap{
	
	.title{
		text-align: center;
		font-size: .36rem;
		color: #a8a8a8;
		margin-top:10px;
	}
	.top2 {
		height: 2rem;
		background-color: white;
		background-size: cover;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 0.20rem;
		box-sizing: border-box;
		background: url('../../assets/images/index/busbg.png');
		background-size: 100% 100%;
		.left {
			display: flex;
			align-items: center;
			.store-logo {
				width: 1.20rem;
				height: 1.20rem;
				margin-right: 0.16rem;
				background-color: rgba(213, 213, 214, 0.35);
			}
			.middle {
				.name{
					font-size: 0.32rem;
					font-family: PingFangSC-Medium;
					width: 4rem;
					color: #fff;
				}
				div {
					display: flex;
					align-items: center;
					.left-img {
						width: 0.28rem;
						height: 0.28rem;
					}
					p {
						width: 3.4rem;
						font-size: 0.2rem;
						font-family: PingFangSC-Regular;
						color: #1A2642;
						margin-top:.2rem;
						overflow : hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						color: #fff;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					.right-img {
						width: 0.16rem;
						height: 0.16rem;
					}
				}
			}
		}
		.right {
			p:nth-child(1) {
				width: 1.16rem;
				height: 0.46rem;
				line-height: 0.46rem;
				text-align: center;
				border-radius: 33px;
				border: 1px solid #fff;
				color: white;
				font-size: 0.24rem;
				font-family: PingFangSC-Regular;
				/*color: #1A2642;*/
			}
			p:nth-child(2) {
				margin-top: 0.10rem;
				font-size: 0.20rem;
				font-family: PingFangSC-Regular;
				color: #1A2642;
				text-align: center;
			}
		}
	}
	.shouyi{
		width: 7.14rem;
		height: 4.3rem;
		margin: -.2rem auto 0;
		background: #fff;
		border-radius: 6px;
		/*border:1px solid #333;*/
		.tit{
			padding-top: .36rem;
			text-align: center;
			font-size: .28rem;
			color: #1A2642;
		}
		.swiper-container{
			/*height: 2rem;*/
			/*border:1px solid #333;*/
		}
		.swiper-button-prev{
			width: .56rem;
			height: .56rem;
			background-image: url(../../assets/images/member/prevbg.png);
			background-size: 100% 100%;
		}
		.swiper-button-next{
			width: .56rem;
			height: .56rem;
			background-image: url(../../assets/images/member/nextbg.png);
			background-size: 100% 100%;
		}
		.swiper-button-prev.swiper-button-disabled, 
		.swiper-button-next.swiper-button-disabled{
			opacity: .5;
		}
		.swiper-wrapper{
			.num{
				color:#4D63EB;
				font-size: .6rem;
				text-align: center;
				font-weight: bold;
				margin-top: .2rem;
				span{
					font-size: .3rem;
				}
			}
			.time{
				font-size: .24rem;
				text-align: center;
				margin-top: .2rem;
				span{
					color: #4D63EB;
				}
			}
			.three{
				width: 98%;
				margin: .4rem auto 0;
				/*border:1px solid #333;*/
				.items{
					width: 2.26rem;
					height: 1.3rem;
					background:#EFF3F8;
					margin-right: .1rem;
					text-align: center;
					.numbers{
						color: #1A2642;
						font-size: .36rem;
						margin-top: .3rem;
					}
					.date{
						color: #90A2C7;
						font-size: .24rem;
					}
				}
				.items:last-child{
					margin-right: 0;
				}
			}
		}
	}
	.ka{
		background: #fff;
		width: 7.14rem;
		height: 5.1rem;
		margin:.1rem auto 0;
		padding:.1rem;
		.item{
			width: 50%;
			text-align: center;
			padding-bottom: .2rem;
			margin-top: .2rem;
			border-right: 1px solid #D8DFF0;
			box-sizing: border-box;
			.img{
				width: .54rem;
				height: .54rem;
				margin:.2rem auto 0;
				img{
					width: 100%;
					height: 100%;
				}
			}
			.number{
				color: #1A2642;
				font-size: .48rem;
				margin-top: .2rem;
			}
			.cont{
				color: #90A2C7;
				font-size: .24rem;
				margin-top: .1rem;
			}
		}
		.item:first-child{
			width: 100%;
			border-bottom: 1px solid #D8DFF0;
			border-right: none;
		}
		.item:last-child{
			border-right: none;
		}
	}
}
</style>
<style lang="less">

</style>



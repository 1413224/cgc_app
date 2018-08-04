<template>
    <div class="assetswap">
        <settingHeader :title="title"></settingHeader>
        <div class="top2">
				<div class="left">
				<!-- storeLogo -->
					<img class="store-logo" src="../../../static/shop/storeLogo.png">
					<div class="middle">
						<p>名字名字</p>
						<div>
							<img class="left-img" src="../../assets/images/multi_user_mall/position.png">
							<p>地址地址</p>
							<img class="right-img" src="../../assets/images/multi_user_mall/right.png">
						</div>
					</div>
				</div>
				<div class="right">
					
					<p>切换身份</p>
				</div>
			</div>
	    </div>
</template>
<script>

import settingHeader from '../../components/setting_header'


export default {
    data(){
        return {
            title:'企业资产',
          
        }
    },
    components:{
    	settingHeader,
    	
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
				p:nth-child(1) {
					font-size: 0.32rem;
					font-family: PingFangSC-Medium;
					color: #1A2642;
					margin-bottom: 0.23rem;
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
						font-size: 0.24rem;
						font-family: PingFangSC-Regular;
						color: #1A2642;
						margin: 0 0.07rem;
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
				/*border: 1px solid #1A2642;*/
				background-color: #336FFF;
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
}
</style>
<style lang="less">

</style>



<template>
    <div class="fisOrderWrap">
        <settingHeader :title="title"></settingHeader>
        <div class="banner">
            <p class="status">等待买家付款</p>
            <!-- <p class="status">买家已付款</p>
            <p class="status">交易成功</p>
            <p class="status">交易关闭</p>
            <p class="status">交易异常</p> -->

            <p class="fangshi">配送方式：自动到账</p>
            <!-- <p class="fangshi">数据发生错误</p> -->
        </div>
        <div class="liuyan">
            <p class="tit">用户留言：</p>
            <p class="content">快点给我湖南5区的狂战士充10000点券，我要买国庆套，一定要快，一定要快，一定要快</p>
        </div>
        <div class="top">
			<div class="top-left">
				<img src="../../assets/images/shop/UNIQLO.png">
				<div class="left-text">优衣库旗舰店</div>
				<img src="../../assets/images/shop/right.png" class="icon">
			</div>
			
			<div class="top-right">
				<img src="../../assets/images/shop/customer.png">
				<span class="right-text">联系客服</span>
			</div>
		</div>

        <div class="order">
			<div class="icon"><img src="../../assets/images/shop/qqicon.png" alt=""></div>
            <div class="cont"><p class="">腾讯QQ币1-1000</p></div>
            <div class="pricewrap"></div>
		</div>

    </div>
</template>

<script>
import settingHeader from '../../components/setting_header'

export default {
    data(){
        return {
            title: '订单详情',
        }
    },
    components: {
        settingHeader,
    },
    methods: {

    }
}
</script>

<style lang="less" scoped>
.fisOrderWrap{
    .banner{
        background: #336FFF;
        height: 1.1rem;
        padding: .62rem .64rem;
        color: #fff;
        .status{
            font-size: .32rem;
            font-weight: bold;
        }
        .fangshi{
            font-size: .28rem;
            margin-top: .1rem;
        }
    }
    .liuyan{
        padding: .3rem .15rem;
        margin-bottom: .22rem;
        // height: .9rem;
        background: #fff;
        .tit{
            font-size: .28rem;
        }
        .content{
            font-size: .24remm;
            text-indent: .48rem;
        }
    }
    .top{
		background: #fff;
		// border-top: 0.01rem solid #E1E1E1;
		font-size: 0.3rem;
		color: #222222;
		display: flex;
		.top-left{
			flex: 1;
			margin: 0.33rem 0 0.33rem 0.32rem;
			img{
				width: 8%;
				margin-right: 0.07rem;
				float: left;
			}
			.left-text{
				margin-top: -0.02rem;
				float: left;
			}
			.icon{
				margin-left: 0.12rem;
				width:6%;
				margin-top: 0.03rem
			}
		}
		.top-right{
			width: 1.8rem;
			margin: 0.16rem 0.2rem 0.16rem 0;
			border: 0.02rem solid #90A2C7;
			border-radius: 0.1rem;
			padding: 0.15rem 0.18rem 0.19rem 0.27rem;
			img{
				width: 20%;
				vertical-align:middle; 
				margin-right: 0.2rem;
			}
			.right-text{
				font-size: 0.28rem;
				color: #7386AD;
			}
		}
    }
    .order{
        display: flex;
        height: 100px;
        padding: .05rem;
        .icon{
            border: 1px solid #ccc;
            flex: 1;
            img{
                width: 100%;
            }
        }
        .cont{
            width:0;
            border: 1px solid #ccc;
            flex: 2;
            p{
                font-size: .28rem;
                width: 100%;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        .pricewrap{
            border: 1px solid #ccc;
            flex: 1;
        }
	}
}
</style>



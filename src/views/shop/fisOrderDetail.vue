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

        <div class="order clearfix">
			<div class="icon fl"><img src="../../assets/images/shop/qqicon.png" alt=""></div>
            <div class="cont fl"><p class="ellipise2">腾讯QQ币1-1000</p></div>
            <div class="pricewrap fr">
                <p class="price">¥ 0.98</p>
                <p class="yprice">¥ 1.00</p>
                <p class="num">x500</p>
            </div>
		</div>
        <div class="shouhuo"><span class="shoubtn">售后服务</span></div>

        <div class="youhui">
            <p>运费<span class="fr">¥ 0.00</span></p>
            <p>商家优惠<span class="fr">¥ 0.00</span></p>
            <p>平台优惠<span class="fr">¥ 0.00</span></p>
            <p class="bot">需付价（含运费）<span class="fr yun">¥ 500.00</span></p>
        </div>

        <div class="zhifu">
            <p class="bot2">支付方式<span class="fr">在线支付</span></p>
            <p>使用现金<span class="fr">¥ 00.00</span></p>
            <p>使用通用积分<span class="fr"> 888.00</span></p>
            <p>使用信用积分<span class="fr"> 888.00</span></p>
            <p>使用企业余额<span class="fr">¥ 800.00</span></p>
            <p>(CGC全球智慧产业共享经济平台)</p>
        </div>

        <div class="bhorder">
            <p class="">订单编号：189942005524</p>
            <p class="">创建时间：2018-06-06 14:48:04</p>
            <p class="">关闭时间：2018-06-06 14:48:04</p>
        </div>
        <div class="kong"></div>
        <div class="bottom">
            <sapn class="fr btn fukuan">付款</sapn>
            <!-- <sapn class="fr btn fukuan">支付</sapn>
            <span class="fr btn">取消订单</span>
            <span class="fr btn">提醒发货</span>
            <span class="fr btn">删除订单</span>
            <span class="fr btn">再次充值</span> -->
            <span class="fr btn">重新下单</span>
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
    // padding-bottom: 1.02rem;
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
        height: 100px;
        padding: .05rem;
        position: relative;
        .icon{
            width: 1.8rem;
            img{
                width: 100%;
            }
        }
        .cont{
            width: 3.5rem;
            padding-left: .1rem;
            p{
                font-size: .28rem;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin:.1rem;
                color: #1E2A47;
                font-weight: bold;
            }
        }
        .pricewrap{
            width: 1.7rem;
            font-size: .24rem;
            text-align: right;
            padding-right: .25rem;
            padding-top: .2rem;
            .price{
                color: #1E2A47;
                font-weight: bold;
            }
            .yprice{
                color: #96A7CB;
                text-decoration: line-through;
                margin: .05rem 0;
            }
            .num{
                color: #96A7CB;
            }
        }
        
    }
    .shouhuo{
        text-align: right;
        padding-bottom: .2rem;
        margin-right: .2rem;
        .shoubtn{
            border: 1px solid #9AA8C4;
            border-radius: 5px;
            padding: .1rem .15rem;
            margin-top: .2rem;
            color: #91A3C7;
        }
    }
    
    .youhui,.zhifu{
        background: #fff;
        padding: .24rem .20rem 0.1rem .20rem;
        p{
            font-size: .28rem;
            color: #90A2C7;
            margin-bottom: .2rem;
            span{
                display: inline-block;
                color: #1E2A47;
                font-weight: bold;
            }
            .yun{
                color: #F23535;
            }
        }
        .bot{
            padding-top: .1rem;
            &:before{
                border-top: 1px solid #E1E1E1;
                height: 10px;
                content: " ";
                display: block;
                position: relative;
                left: 3%;
            }
        }
        
    }
    .zhifu{
        padding-top: .01rem;
    }
    .bot2{
        &:before{
            border-top: 1px solid #D8DFF0;
            height: 10px;
            content: " ";
            display: block;
            position: relative;
            left: 3%;
        }
    }
    .bhorder{
        font-size: .28rem;
        color: #222222;
        font-weight: bold;
        background: #fff;
        margin-top: .2rem;  
        padding: .4rem .2rem 0.2rem .2rem;
        p{
            margin-bottom: .1rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    .kong{
        height: 70px;
        background: #F5F6FA;
    }
    .bottom{
        height: 1rem;
        background: #fff;
        position: fixed;
        bottom: 0;
        width: 100%;
        p{
            font-size: .28rem;
            font-weight: bold;
        }
        .btn{
            border: 1px solid #9AA8C4;
            border-radius: 5px;
            padding: .1rem .15rem;
            margin-top: .2rem;
            margin-right: .2rem;
            color: #91A3C7;
        }
        .fukuan{
            border: 1px solid #3B75FF;
            color: #3B75FF;
        }
    }
}
</style>



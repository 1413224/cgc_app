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
        padding: .15rem;
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
}
</style>



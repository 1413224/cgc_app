<template>
    <div class="buswap">
        <settingHeader :title="title"></settingHeader>
        <p class="title">请选择您的企业身份</p>
        <group>
			<cell @click.native="onClick" class="cell" is-link value-align="left" :value="val">
				<img slot="icon" width="20" style="display:block;margin-right:5px;" :src="img">
			</cell>
			<cell class="cell" is-link value-align="left" :value="val">
				<img slot="icon" width="20" style="display:block;margin-right:5px;" :src="img">
			</cell>
			<cell class="cell" is-link value-align="left" :value="val">
				<img slot="icon" width="20" style="display:block;margin-right:5px;" :src="img">
			</cell>
			<cell class="cell" is-link value-align="left" :value="val">
				<img slot="icon" width="20" style="display:block;margin-right:5px;" :src="img">
			</cell>
			<cell class="cell" is-link value-align="left" :value="val">
				<img slot="icon" width="20" style="display:block;margin-right:5px;" :src="img">
			</cell>
			<cell class="cell" is-link value-align="left" :value="val">
				<img slot="icon" width="20" style="display:block;margin-right:5px;" :src="img">
			</cell>
			
        </group>
    </div>
</template>
<script>

import settingHeader from '../../components/setting_header'
import { Cell, Group } from 'vux'

export default {
    data(){
        return {
            title:'选择身份',
            val:'联盟企业',
            img:'../../../static/mall/global.png'
        }
    },
    components:{
    	settingHeader,
    	Cell,
    	Group
    },
    created () {
    	console.log('test')
    },
    mounted(){

    },
    methods:{
    	onClick(){
    		alert(0)
    	}
    }
}
</script>
<style lang="less" scoped>
.buswap{
	height: 100%;
	background: #fff;
	.title{
		text-align: center;
		font-size: .36rem;
		color: #a8a8a8;
		margin-top:10px;
	}
}
</style>
<style lang="less">
.buswap{
	.weui-cell{
		height: 50px !important;
		padding:10px 25px; 
		.weui-cell__hd{
			img{
				width: .5rem;
				position: relative;
				top: -2px;
			}
		}
		.weui-cell__ft{
			font-size: .36rem;
			color: #333;
			padding-left: 10px;
			&:after{
				border-color:#999;
				width: 10px;
				height: 10px;
			}
		}

	}
}
</style>



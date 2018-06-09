<template>
	<section class="join">
		<settingHeader :title="title"></settingHeader>
		<div class="list">
			<group gutter="0">
				<cell class="list-item" title="公司名称">
					<x-input class="input-item" ref="company" v-model="company" :value="company" text-align="right" placeholder="未填写" type="text" @on-change="companyChange"></x-input>
				</cell>
				<cell class="list-item" title="法人姓名">
					<x-input class="input-item" ref="name" v-model="name" :value="name" text-align="right" placeholder="未填写" type="text" @on-change="nameChange"></x-input>
				</cell>
				<cell class="list-item" title="法人手机号">
					<x-input class="input-item" ref="phone" v-model="phone" :value="phone" text-align="right" placeholder="未填写" type="text" @on-change="phoneChange"></x-input>
				</cell>
			</group>

			<group class="input-div">
				<cell class="list-item" title="加盟角色">
					<x-input class="input-item" ref="role" v-model="role" :value="role" text-align="right" placeholder="未填写" type="text" @on-change="roleChange"></x-input>
				</cell>
				<cell class="list-item" title="预估门店数">
					<x-input class="input-item" ref="storesnum" v-model="storesnum" :value="storesnum" text-align="right" placeholder="未填写" type="text" @on-change="storesnumChange"></x-input>
				</cell>
			</group>
			<group class="remark">
				<cell class="list-remark" title="备注"></cell>
				<x-textarea :max="200" name="remark" placeholder="请填写备注" v-model="remark" :value="remark" :height="100" :show-counter="false"></x-textarea>
		    </group>
		</div>
		<div class="tip">
			<div class="add-btn" @click="addCompany">保存</div>
		</div>
	</section>
</template>


<script>
	import settingHeader from '../../../components/setting_header'
	import { XInput, Actionsheet, Datetime } from 'vux'
	export default {
		components: {
			settingHeader,XInput,Actionsheet
		},
		data(){
        	return {
        		title:'企业加盟',
        		company: '',
        		name: '',
        		phone: '18523945843',
        		role: '行业服务商',
        		storesnum: '10000家',
        		remark: ''
        	}
        },
        methods: {
        	companyChange(val){},
        	nameChange(val){},
        	phoneChange(val){},
        	roleChange(val){},
        	storesnumChange(val){},
        	addCompany(){
        		var _this = this
        		if(!_this.mainApp.isphone(_this.phone) && _this.phone) {
        			_this.$vux.toast.show({
        				width: '50%',
        				type: 'text',
        				position: 'middle',
        				text: '手机号格式不正确'
        			})
        			return false
        		}

        		var data = {
        			company: _this.company,
        			name: _this.name,
        			phone: _this.phone,
        			role: _this.role,
        			storesnum: _this.storesnum,
        			remark: _this.remark,
        			userId: localStorage.getItem('userId')
        		}
        		console.log('--添加企业数据:',data)
        		// _this.$http.post(_this.url.user.changeUserInfo, data).then((res) => {
        		// 	if(res.data.status == '00000000') {
        		// 		_this.$vux.toast.show({
        		// 			width: '50%',
        		// 			type: 'text',
        		// 			position: 'middle',
        		// 			text: '添加成功'
        		// 		})
        		// 		_this.getUserInfo()
        		// 	}
        		// })
        	}
        },

	}
</script>

<style lang="less">
	.join{
		.list {
			.remark{
				.weui-cell:before{
					border-top: none;
				}
				.weui-textarea{
					font-size: 0.24rem;
					color: #1A2642;
				}
			} 
			.list-item {
				font-family: PingFangSC-Regular;
				font-size: 0.28rem;
				color: #1A2642;
				letter-spacing: 0;
				height: 1.02rem;
				padding-top: 0!important;
				padding-bottom: 0!important;
				.weui-cell__ft {
					color: rgba(26, 38, 66, 1);
				}
			}
			input::-webkit-input-placeholder{
	           color:#90A2C7;
	       	}
	       	textarea::-webkit-input-placeholder{color:#90A2C7;font-size: 0.24rem;}
	       	.list-remark {
				font-family: PingFangSC-Regular;
				font-size: 0.28rem;
				color: #1A2642;
				letter-spacing: 0;
				padding-top: 0.31rem !important;
				padding-bottom: 0!important;
				.weui-cell__ft {
					color: rgba(26, 38, 66, 1);
				}
			}
		}
		.tip{
			margin: auto;
    		width: 82.4%;
    		.add-btn {
    			position: fixed;
    			width: 82.4%;
    			height: 0.88rem;
    			line-height: 0.88rem;
    			background: rgba(51, 111, 255, 1);
    			font-size: 0.28rem;
    			text-align: center;
    			font-family: MicrosoftYaHei;
    			color: rgba(255, 255, 255, 1);
    			bottom: 0.68rem;
    		}
		}
		
	}
</style>
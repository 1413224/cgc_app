<template>
	<popup height="100%" v-model="options.showIntegralMode">
		<div class="integral_box">
			<!-- <settingHeader :title="title"></settingHeader> -->
			<!-- <span @click="closewin()">关闭</span> -->
			<div class="head">使用企业通用积分</div>
			<ul class="list_box">
				<li v-for="(item,index) in options.data.cardList">
					<div class="top">
						<div class="t_box">
							<img :src="item.canUseBalance > 0 ?'./static/images/yuanquan-in.png':'./static/images/yuanquan.png'" />
							<span>{{item.name}}</span>
						</div>
						<div class="b_box">
							<div class="input">
								<input ref="input" @keyup="setBalance($event,index,item)" placeholder="请输入使用金额" type="text" v-model="item.canUseBalance" />
							</div>
							<div @click="reset(index)">
								<img :src="'./static/images/gb.png'" /><span>修改金额</span>
							</div>
						</div>
					</div>
					<div class="bottom">
						<span>企业通用积分余额：</span><span>{{item.balance}}</span>
					</div>
				</li>
			</ul>
			<!-- 确认按钮 -->
		</div>
	</popup>
</template>

<script>
	import { Popup } from 'vux'
	import settingHeader from '@/components/setting_header.vue'
	export default {
		props: {
			payMoney:"",
			enterpriseIntegral:0,//企业通用积分（使用金额）
			totalUseEnterpriseBalance:0,//本次最多使用的企业通用积分总额
			newUseEnterpriseBalance:{//本次最多使用的企业通过积分总额（修改后的）
				type:Number,
				default:0
			},
			options: {
				type: Object,
				default: {
					showIntegralMode: false,
					data: {}
				}
			}
		},
		data() {
			return {
				title: '使用企业通用积分',
				cardList:[],
				list:[],//深度复制的初始化数组
				totalBalance:0,//输入企业通用积分总额
				nullBalance:"",//当输入框为空时
				starTotalBalance:0,//初始化企业通用积分总额（使用的）
				allBalance:0,//点击关闭输入框数字时
				newTopUseBalance:0
			}
		},
		created() {
		  //this.cardList = this.options.data.cardList
		  // console.log(this.options)
		},
		mounted() {
			var _this = this
			// _this.list = JSON.parse(JSON.stringify(this.options.data.cardList))
			/*this.list.forEach((value) => {
				_this.balance += value.canUseBalance
				_this.$emit('watch', _this.balance)
			})*/
			console.log(this.integralOptions)

		},
		watch:{
			value:function(val){
		        if(!val) return
		        if(!/^\d*\.?\d{0,2}$/.test(val)){
		            return ''
		        }
		    },
		    newUseEnterpriseBalance(curVal,oldVal){
		    	/*console.log("新数据"+curVal)
		    	console.log("旧数据"+oldVal)*/
		    	this.newTopUseBalance = curVal
		    }
		},
		methods: {
			setBalance(event,index, item) {
				console.log(item)
		    if(Number(item.canUseBalance) < 0) {
					item.canUseBalance = 0
				}

				var _this = this,
					reg,
					arr=[],
					arrdata=[],
					result=0,
					payMoney = Number(_this.payMoney);

				var keyValue = event.key
				if(_this.mainApp.isBackspace(keyValue) && _this.mainApp.isDot(keyValue) && _this.mainApp.isNumber(keyValue)){
					//其他按键
					event.preventDefault();
					event.stopPropagation();
					return false;
				}

				//当输入的值为空时
				_this.nullBalance = 0
				_this.arrdata=[]
				if(item.canUseBalance == ""){
					for(let m=0;m<_this.options.data.cardList.length;m++){
						_this.nullBalance += Number(_this.options.data.cardList[m].canUseBalance)
					}
					_this.$emit('reduceenterprise',_this.nullBalance)//设置企业通用积分的值
				}



				// reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
				reg=/^(([0-9][0-9]*)|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{1,2})))$/

				if(!reg.test(Number(item.canUseBalance)) && item.canUseBalance != ""){
					this.$vux.toast.show({
						text: '请输入正确的格式',
						type: 'text',
						position: 'top',
						width: '50%'
					})
					// console.log(_this.moneyNum)
					item.canUseBalance = item.canUseBalance.slice(0,item.canUseBalance.length-1)
					return
				}

					_this.totalBalance=0
				for(let i=0;i<_this.options.data.cardList.length;i++){
					//计算通用卡总金额
					_this.totalBalance += Number(_this.options.data.cardList[i].canUseBalance)	
				}

				if(item.canUseBalance > item.balance){
					_this.$vux.toast.show({
						text: '该卡最多金额为' + item.balance,
						type: 'text',
						position: 'top',
						width: '50%'
					})
					item.canUseBalance = item.canUseBalance.slice(0,item.canUseBalance.length-1)

				}

				if(_this.totalBalance > _this.newTopUseBalance){
					_this.$vux.toast.show({
						// text: '总使用金额最多为' + _this.options.data.totalUseEnterpriseBalance,
						text: '总使用金额最多为' + _this.newTopUseBalance,
						type: 'text',
						position: 'top',
						width: '50%'
					})
					// item.canUseBalance = item.canUseBalance.slice(0,item.canUseBalance.length-1)

					for(let j=0;j<_this.options.data.cardList.length;j++){
						if(j==index){
							continue;
						}else{
							arr.push(Number(_this.options.data.cardList[j].canUseBalance))
						}
					}

					for(let n=0;n<arr.length;n++){
						result += arr[n]
					}
					// console.log(result)
					// _this.options.data.totalUseEnterpriseBalance
					if(Number(_this.newTopUseBalance - result)>item.balance){
						item.canUseBalance = item.balance
					}else{
						item.canUseBalance = Number(_this.newTopUseBalance - result)
					}
					
					
				}
				_this.totalBalance=0
				_this.arrdata = []
				for(let i=0;i<_this.options.data.cardList.length;i++){
					//计算通用卡总金额
					_this.totalBalance += Number(_this.options.data.cardList[i].canUseBalance)	
					//在这里新增数组，保存卡与金额，，然后传出去
					if(_this.options.data.cardList[i].canUseBalance == 0){
						continue;
					}else{
						arrdata.push({
							userCardId:_this.options.data.cardList[i].userCardId,
							balance:Number(_this.options.data.cardList[i].canUseBalance)
						})
					}
					
				}		
				
				_this.$emit('reduceenterprise',_this.totalBalance)//设置企业通用积分的值
				_this.$emit('enterprisecards',arrdata)//使用的企业通用卡列表

			},

			//获取总的输入额
			getAllSbalance(){

			},
			//修改金额
			reset(index) {
				var _this = this
				_this.options.data.cardList[index].canUseBalance = ''
				_this.$refs.input[index].focus()

				_this.totalBalance = 0

				for(var j=0;j<_this.options.data.cardList.length;j++){
					// alert(_this.cardList[j].canUseBalanc)
					_this.totalBalance += Number(_this.options.data.cardList[j].canUseBalance)
					// alert(_this.totalBalance)
				}
				/*_this.cardList.forEach((value)=>{
					alert(JSON.stringify(value))
					_this.totalBalance += Number(value.canUseBalance)
				})*/

				_this.$emit('reduceenterprise',_this.totalBalance)//设置企业通用积分的值

				

			},
			//关闭
			closewin(){
				this.options.showIntegralMode = false
			}
		},
		components: {
			settingHeader,
			Popup
		}
	}
</script>
<style lang="less" scoped>
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}
	
	input[type="number"] {
		-moz-appearance: textfield;
	}
	.head{
		background: #fff;
		height: 46px;
		line-height: 46px;
		font-size: .32rem;
		color: #333;
		text-align: center;
		border-bottom: 1px solid #eee;
		span{
			display: inline-block;
			float: right;
			padding-right: .2rem;
			width: 1.5rem;
		}
	}
	.integral_box {
		/*		padding: 0.20rem 0;*/
		box-sizing: border-box;
		background-color: #F5F8F9;
		height: 100%;
		position: relative;
		z-index: 11;
		.list_box {
			background-color: #F5F8F9;
			padding-bottom: 1.60rem;
			li {
				padding-left: 0.30rem;
				box-sizing: border-box;
				background-color: white;
				.top {
					padding-top: 0.25rem;
					position: relative;
					.t_box {
						display: flex;
						align-items: center;
						font-size: 0.28rem;
						font-family: PingFangSC-Regular;
						color: rgba(26, 38, 66, 1);
						img {
							width: 0.36rem;
							height: 0.36rem;
							margin-right: 0.20rem;
						}
					}
					.b_box {
						padding-right: 0.30rem;
						box-sizing: border-box;
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-top: 0.20rem;
						div {
							height: 100%;
							display: flex;
							align-items: center;
							font-size: 0.28rem;
							font-family: PingFangSC-Regular;
							color: rgba(51, 111, 255, 1);
							img {
								width: 0.25rem;
								height: 0.25rem;
								margin-right: 0.15rem;
							}
						}
						.input {
							width: 5rem;
							padding: 0.20rem 0;
							input {
								width: 100%;
								font-size: 0.50rem;
								font-family: PingFangSC-Regular;
								color: rgba(26, 38, 66, 1);
							}
						}
					}
				}
				.top:after {
					content: " ";
					position: absolute;
					left: 0;
					bottom: 0;
					right: 0;
					height: 1px;
					border-top: 1px solid #E1E1E1;
					color: #E1E1E1;
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: scaleY(0.5);
					transform: scaleY(0.5);
					left: 0px;
				}
				.bottom {
					height: 0.88rem;
					line-height: 0.88rem;
					font-size: 0.28rem;
					font-family: PingFangSC-Regular;
					span:nth-child(1) {
						color: rgba(160, 160, 160, 1);
					}
					span:nth-child(2) {
						color: #1A2642;
					}
				}
			}
			li:not(:last-child) {
				margin-bottom: 0.20rem;
			}
		}
	}
</style>
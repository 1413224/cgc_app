<template>
	<div>微信支付</div>
</template>

<script>

	export default {
		data() {
			return {
				
			}
		},
		created() {
			if (typeof WeixinJSBridge == "undefined"){
			   if( document.addEventListener ){
			       document.addEventListener('WeixinJSBridgeReady', this.wxPay, false);
			   }else if (document.attachEvent){
			       document.attachEvent('WeixinJSBridgeReady', this.wxPay); 
			       document.attachEvent('onWeixinJSBridgeReady', this.wxPay);
			   }
			}else{
			   // onBridgeReady();
			   this.wxPay();
			}
			/*console.log(Math.random().toString(36).substr(2))
			this.wxPay();*/
		},

		methods: {
			wxPay(){
				console.log(window.location.href.split('#')[0])
				this.$http.post('/pay/v1/wechat/pay',{
					"appid": "wx7a4933a7a3c33ec8",
				    "attach": "",
				    "body": "cgc-wechatpaytest",
				    "detail": "",
				    "deviceInfo": "",
				    "feeType": "CNY",
				    "goodsTag": "",
				    "limitPay": "",
				    "mchId": "1388332102",
				    "nonceStr": "4YikgmsTL1Uz589Dj3qYVhFHriBnVKVE",
				    "notifyUrl": "https://new.cgc999.com/apigw/pay/thirdparty/wechat/payNotify",
				    "openId": "oWt0-v2aZpxag827DGfCz46xl-zU",
				    "outTradeNo": Math.random().toString(36).substr(2),
				    "productId": "",
				    "sceneInfo": "",
				    "sign": "",
				    "signType": "MD5",
				    "spbillCreateIp": "192.168.3.140",
				    "timeExpire": "",
				    "timeStart": "",
				    "totalFee": 1,
				    "tradeType": "JSAPI",
				    "requestUrl":window.location.href
				}).then((res)=>{
					console.log(res)
					let data=res.data.data
					console.log(data)



					wx.config({
						debug: true,
						appId:data.appId,
						timestamp:data.timeStamp,
						nonceStr:data.nonceStr,
						signature:data.signature,
						jsApiList:[
							'checkJsApi', 
							'startRecord', 
							'stopRecord',
							'translateVoice',
							'scanQRCode', 
							'openCard',
							'chooseWXPay'
						]
					});


					/*wx.ready(function(){
                         
                    });*/
     //                WeixinJSBridge.invoke(
					//    'getBrandWCPayRequest', {
					//        "appId":data.appId,     //公众号名称，由商户传入     
					//        "timeStamp":data.timeStamp,         //时间戳，自1970年以来的秒数     
					//        "nonceStr":data.nonceStr, //随机串     
					//        "package":data.package,     
					//        "signType":data.signType,         //微信签名方式：     
					//        "paySign":data.signature //微信签名 
					//    },
					//    function(res){  
					//    		console.log(res)
					//         if(res.err_msg == "get_brand_wcpay_request:ok" ) {
					//        		alert(200)
					//         }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
					//    }
					// );
					wx.chooseWXPay({  
					    appId: data.appId,   
					    timestamp:data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符  
					    nonceStr:data.nonceStr, // 支付签名随机串，不长于 32 位  
					    package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）  
					    signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'  
					    paySign: data.paySign, // 支付签名  
					    success: function (res) {  
					          alert(1)
					          console.log(res)
					    },  
					    cancel:function(res){  
					           console.log(res)
					    }  
					});  


					/*WeixinJSBridge.invoke(
					   'getBrandWCPayRequest', {
					       "appId":data.appId,     //公众号名称，由商户传入     
					       "timeStamp":data.timeStamp,         //时间戳，自1970年以来的秒数     
					       "nonceStr":data.nonceStr, //随机串     
					       "package":data.package,     
					       "signType":data.signType,         //微信签名方式：     
					       "paySign":data.paySign //微信签名 
					   },
					   function(res){  
					   		console.log(res)
					        if(res.err_msg == "get_brand_wcpay_request:ok" ) {
					       		// alert(res.err_msg)
					        }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
					   }
					); */

				})
			},


			
		},
		components: {

		}
	}
</script>

<style lang="less" scoped>

</style>
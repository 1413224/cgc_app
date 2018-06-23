<template>
	<div>微信支付</div>
</template>

<script>

	export default {
		data() {
			return {
				ip:""
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
			
			// this.getUserIP(function(ip){
			// 	this.ip = ip;
			// });
		},

		methods: {
			wxPay(){
				var _this = this;
				console.log(window.location.href.split('#')[0])
				var oid = sessionStorage['_openid_'];
				// alert(oid);

				this.getUserIP(function(ip){
					_this.ip = ip;
				});



				this.$http.post('/pay/v1/wechat/pay',{
					"appid": "wx7a4933a7a3c33ec8",
				    "attach": "",
				    "body": "cgc-wechatpaytest",
				    "detail": "",
				    "deviceInfo": "",
				    "feeType": "CNY",
				    "goodsTag": "",
				    "limitPay": "",
				    // "mchId": "",
				    // "nonceStr": "",
				    // "notifyUrl": "",
				    "openId": oid,
				    "outTradeNo": Math.random().toString(36).substr(2),
				    "productId": "",
				    "sceneInfo": "",
				    // "sign": "",
				    // "signType": "",
				    "spbillCreateIp": "192.168.3.142",
				    "timeExpire": "",
				    "timeStart": "",
				    "totalFee": 0.01,//金额
				    "tradeType": "JSAPI",
				    // "requestUrl":window.location.href
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

					wx.chooseWXPay({  
					    appId: data.appId,   
					    timestamp:data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符  
					    nonceStr:data.nonceStr, // 支付签名随机串，不长于 32 位  
					    package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）  
					    signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'  
					    paySign: data.paySign, // 支付签名  
					    success: function (res) {  
					        //   alert(1)
					          console.log(res)
					    },  
					    cancel:function(res){  
					           console.log(res)
					    }  
					});

				})
			},
			getUserIP(onNewIP){
				var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
				var pc = new myPeerConnection({
					iceServers: []
				}),
				noop = function() {},
				localIPs = {},
				ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
				key;

				function iterateIP(ip) {
					if (!localIPs[ip]) onNewIP(ip);
					localIPs[ip] = true;
				}

				pc.createDataChannel("");

				pc.createOffer().then(function(sdp) {
					sdp.sdp.split('\n').forEach(function(line) {
						if (line.indexOf('candidate') < 0) return;
						line.match(ipRegex).forEach(iterateIP);
					});
					
					pc.setLocalDescription(sdp, noop, noop);
				}).catch(function(reason) {
					// An error occurred, so handle the failure to connect
				});

				pc.onicecandidate = function(ice) {
					if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
					ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
				};


			}

			
		},
		components: {

		}
	}
</script>

<style lang="less" scoped>

</style>
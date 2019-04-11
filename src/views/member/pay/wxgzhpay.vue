<template>
	<div></div>
</template>

<script>
	export default {
		data() {
			return {
				ip: ""
			}
		},
		created() {
			if(typeof WeixinJSBridge == "undefined") {
				if(document.addEventListener) {
					document.addEventListener('WeixinJSBridgeReady', this.wxPay, false);
				} else if(document.attachEvent) {
					document.attachEvent('WeixinJSBridgeReady', this.wxPay);
					document.attachEvent('onWeixinJSBridgeReady', this.wxPay);
				}
			} else {
				this.wxPay()
			}
		},

		methods: {
			wxPay() {
				var _this = this;
				// console.log(window.location.href.split('#')[0])
				var oid = localStorage['_openid_']

				let openid = localStorage['_openid_']

				this.$http.post('/pay/body/v1/wechat/pay', {
					id: '200001',
					subMchId: '1511640641',
					body: _this.$route.params.body,
					feeType: 'CNY',
					outTotalFee: _this.$route.params.payPrice,
					// transformTotalFee:0.02,  '192.168.3.142'
					spbillCreateIp: _this.$route.params.ip,
					tradeType: 'JSAPI',
					openId: openid,
					parentOrderSn: _this.$route.params.parentOrderSn,
					attach: '成高成'
				}).then((res) => {
					console.log(res)
					var data = res.data.data
					wx.config({
						debug: true,
						appId: data.appId,
						timestamp: data.timeStamp,
						nonceStr: data.nonceStr,
						signature: data.signature,
						jsApiList: [
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
						timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符  
						nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位  
						package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）  
						signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'  
						paySign: data.paySign, // 支付签名  
						success: function(res) {
							//   alert(1)
							console.log(res)
						},
						cancel: function(res) {
							console.log(res)
						}
					})

				})
			},
			getUserIP(onNewIP) {
				var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
				var pc = new myPeerConnection({
						iceServers: []
					}),
					noop = function() {},
					localIPs = {},
					ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
					key;

				function iterateIP(ip) {
					if(!localIPs[ip]) onNewIP(ip);
					localIPs[ip] = true;
				}

				pc.createDataChannel("");

				pc.createOffer().then(function(sdp) {
					sdp.sdp.split('\n').forEach(function(line) {
						if(line.indexOf('candidate') < 0) return;
						line.match(ipRegex).forEach(iterateIP);
					});

					pc.setLocalDescription(sdp, noop, noop);
				}).catch(function(reason) {
					// An error occurred, so handle the failure to connect
				});

				pc.onicecandidate = function(ice) {
					if(!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
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
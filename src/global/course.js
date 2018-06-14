//加密
	export function base64_encode(info){

		// 保存加密字符串
		var str = ''; 
		// 字符串类型检查
		var isString = '|S|'; 
		// 对象类型检查
		var isObject = '|O|'; 
		// 加密随机前缀
		var profix = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		
		// 字符串
		if(typeof info == 'string') str = isString + info; 
		// object转字符串
		if(typeof info == 'object')	str = isObject + JSON.stringify(info); 
		// 如果不是string或object直接return null
		if(str === '') return null;
		
		var base = new Base64();

		// 第一层加密
		str = base.encode(str);
		
		// 拼接加密前缀
		var strLength = str.length;
		//randLength = Math.floor(strLength / 2) * 2;	
		var profixLength = profix.length - 1;
		var proStr = '';
		// 重新遍历加密的字符串
		for(var i=0; i<strLength; ++i){
			// 每隔两个字符 插入一个随机字符
			if(i % 2 == 0) {
				// 追加一个随机字符
				var randNum = Math.floor(Math.random() * profixLength)
				proStr += profix.substr(randNum, 1);
			}
			proStr += str.substr(i, 1);
		}

		// 再次加密
		str = base.encode(proStr);
		
		//清除前缀 保存随机生成的11位随机字符
		proStr = '';
		for(var i=0; i<11; ++i){
			var randNum = Math.floor(Math.random() * profixLength)
			proStr += profix.substr(randNum, 1);
		}
		
		proStr += str;
		var psLength = proStr.length;
		str = '';
		for(var i=0; i<psLength; ++i){
			// 每隔两个字符 插入一个随机字符
			if(i > 0 && i % 32 == 0) {
				// 追加一个随机字符
				str += '-';
			}
			str += proStr.substr(i, 1);
		}
		
		return str;
	}

	//解密
	export function base64_decode(str){

		// 字符串类型检查
		var isString = '|S|'; 
		// 对象类型检查
		var isObject = '|O|';
		
		// 不是string类型或为空字符串直接返回null
		if(typeof str != 'string' || str == '') return null;
		
		var base = new Base64();
		
		// 截取11位后面的字符串
		str = str.substr(11);
		
		// 最外层解密
		str = base.decode(str);
		
		// 拼接加密前缀
		strLength = str.length;
		//profixLength = Math.floor(strLength / 4) * 3;
		var proStr = '';
		for(var i=0; i<strLength; ++i){
			if(i % 3 != 0) proStr += str.substr(i, 1);
		}
		
		// 再次解密
		str = base.decode(proStr);
		proStr = null;
		
		// 解密字符串不少于3个字符
		if(str.length < 3) return null;	
		
		// 获取字符串类型 前三个字符决定返回类型 string/object
		var strType = str.slice(0, 3);
		str = str.slice(3);
		
		//检查字符串类型
		switch(strType){
			//字符串类型不需要操作
			case isString:
				break;
			
			// object类型 则转为object数据
			case isObject:
				str = JSON.parse(str);
				break;
				
			default:
				str = null;
				break;
		}
		
		return str;
	}

	function Base64() {
		// private property
		var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		// public method for encoding
		this.encode = function (input) {
			var output = "";
			var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			var i = 0;
			input = _utf8_encode(input);
			while (i < input.length) {
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);
				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;
				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				} else if (isNaN(chr3)) {
					enc4 = 64;
				}
				output = output +
				_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
				_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
			}
			return output;
		}
		// public method for decoding
		this.decode = function (input) {
			var output = "";
			var chr1, chr2, chr3;
			var enc1, enc2, enc3, enc4;
			var i = 0;
			input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
			while (i < input.length) {
				enc1 = _keyStr.indexOf(input.charAt(i++));
				enc2 = _keyStr.indexOf(input.charAt(i++));
				enc3 = _keyStr.indexOf(input.charAt(i++));
				enc4 = _keyStr.indexOf(input.charAt(i++));
				chr1 = (enc1 << 2) | (enc2 >> 4);
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				chr3 = ((enc3 & 3) << 6) | enc4;
				output = output + String.fromCharCode(chr1);
				if (enc3 != 64) {
					output = output + String.fromCharCode(chr2);
				}
				if (enc4 != 64) {
					output = output + String.fromCharCode(chr3);
				}
			}
			output = _utf8_decode(output);
			return output;
		}
		// private method for UTF-8 encoding
		var _utf8_encode = function (string) {
			string = string.replace(/\r\n/g,"\n");
			var utftext = "";
			for (var n = 0; n < string.length; n++) {
				var c = string.charCodeAt(n);
				if (c < 128) {
					utftext += String.fromCharCode(c);
				} else if((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				} else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
			}
			return utftext;
		}
		// private method for UTF-8 decoding
		var _utf8_decode = function (utftext) {
			var string = "";
			var i = 0;
			var c = 0,
				c1 = 0,
			    c2 = 0;
			while ( i < utftext.length ) {
				c = utftext.charCodeAt(i);
				if (c < 128) {
					string += String.fromCharCode(c);
					i++;
				} else if((c > 191) && (c < 224)) {
					c2 = utftext.charCodeAt(i+1);
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2;
				} else {
					c2 = utftext.charCodeAt(i+1);
					c3 = utftext.charCodeAt(i+2);
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}
			}
			return string;
		}
	}

	function aa(){
		alert(9)
	}

// export default {
// 	base64_encode,
// 	base64_decode
// }

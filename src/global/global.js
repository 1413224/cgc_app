import Vue from 'vue'
// console.log(Vue)

var mainApp = {
	frDateTimehp: {

		//时间戳转为日期
		getFormatTimesTamp: function(val) {
			if(val > 2554431132000) return '-';

			var date = new Date(val);
			var seperator1 = "-";
			var seperator2 = ":";
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			if(month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if(strDate >= 0 && strDate <= 9) {
				strDate = "0" + strDate;
			}

			var hours = date.getHours();
			if(hours >= 0 && hours <= 9) {
				hours = "0" + hours;
			}

			var min = date.getMinutes();
			if(min >= 0 && min <= 9) {
				min = "0" + min;
			}

			var seconds = date.getSeconds();
			if(seconds >= 0 && seconds <= 9) {
				seconds = "0" + seconds;
			}
			var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
				" " + hours + seperator2 + min + seperator2 + seconds;
			return currentdate;
		},

		//时间戳转为日期 不需要时间字段
		getFormatDateTamp: function(val, noDay) {
			if(val > 2554431132000) return '-';

			var date = new Date(val);
			var seperator1 = "-";
			var seperator2 = ":";
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			if(month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if(strDate >= 0 && strDate <= 9) {
				strDate = "0" + strDate;
			}
			if(noDay) {
				var currentdate = date.getFullYear() + '年' + month + '月'
			} else {
				var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
			}

			return currentdate;
		},

		//时间戳转日期  自定义日期
		getFormatDateTamps: function(val) {
			if(val > 2554431132000) return '-';

			var date = new Date(val);
			var seperator1 = "月";
			var seperator2 = ":";
			var seperator3 = '日';
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			if(month >= 1 && month <= 9) {
				//month = "0" + month;
				month = month;
			}
			if(strDate >= 0 && strDate <= 9) {
				//strDate = "0" + strDate;
				strDate = strDate;
			}

			var currentdate = month + seperator1 + strDate + seperator3

			return currentdate;
		},

		//时间戳转为日期 不需要年月日字段
		getFormatTamp: function(val) {
			if(val > 2554431132000) return '-';

			var date = new Date(val);

			var seperator2 = ":";

			var hours = date.getHours();

			if(hours >= 0 && hours <= 9) {
				hours = "0" + hours;
			}

			var min = date.getMinutes();
			if(min >= 0 && min <= 9) {
				min = "0" + min;
			}

			var currentdate = hours + seperator2 + min;
			return currentdate;
		},

		//日期转为时间戳
		getDateTimesTamp: function(date) {
			date = date.substring(0, 19);
			date = date.replace(/-/g, '/');
			return parseInt(new Date(date).getTime() / 1000);
		},

		getTodayTime: function(fmt) {
			var m = new Date();
			var o = {
				"M+": m.getMonth() + 1,
				"d+": m.getDate(),
				"h+": m.getHours(),
				"m+": m.getMinutes(),
				"s+": m.getSeconds(),
				"q+": Math.floor((m.getMonth() + 3) / 3),
				"S": m.getMilliseconds()
			};
			if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (m.getFullYear() + "").substr(4 - RegExp.$1.length));
			for(var k in o)
				if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			return fmt;
		},

		getNowDateTime: function(fmt) {
			var m = new Date();
			var o = {
				"M+": m.getMonth() + 1,
				"d+": m.getDate(),
				"h+": m.getHours(),
				"m+": m.getMinutes(),
				"s+": m.getSeconds(),
				"q+": Math.floor((m.getMonth() + 3) / 3),
				"S": m.getMilliseconds()
			};
			if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (m.getFullYear() + "").substr(4 - RegExp.$1.length));
			for(var k in o)
				if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			return fmt;
		},

		getMonthLastDay: function(year, month) {
			var date = new Date(year, month, 0);
			var count = date.getDate();
			return year + '-' + month + '-' + count;
		},

		getBeforeDate: function(n) {
			var d = new Date();
			var year = d.getFullYear();
			var mon = d.getMonth() + 1;
			var day = d.getDate();
			if(day <= n) {
				if(mon > 1) {
					mon = mon - 1;
				} else {
					year = year - 1;
					mon = 12;
				}
			}
			d.setDate(d.getDate() - n);
			year = d.getFullYear();
			mon = d.getMonth() + 1;
			day = d.getDate();
			s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
			return s;
		},

		compareDay: function(day1, day2) {

			var d1 = new Date(day1);
			var d2 = new Date(day2);

			if(d1.getTime() >= d2.getTime())
				return true;
			else
				return false;
		}
	},
	frDataCache: {

		keyValue: {
			org: 'org',
			user: 'user'
		},

		setCookie: function(name, value, day) {
			var exp = new Date();
			exp.setTime(exp.getTime() + day * 24 * 3600 * 1000);
			document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toGMTString();
		},

		getCookie: function(key) {

			var getCookie = document.cookie.replace(/[ ]/g, "");
			var arrCookie = getCookie.split(";")
			var tips; //声明变量tips
			for(var i = 0; i < arrCookie.length; i++) {
				var arr = arrCookie[i].split("=");
				if(key == arr[0]) {
					tips = arr[1];
					break;
				}
			}

			return decodeURIComponent(tips);

		},

		delCookie: function(name) {
			var exp = new Date();
			exp.setTime(exp.getTime() - 10000);
			var val = this.getCookie(name);
			document.cookie = name + '=v;expires=' + exp.toGMTString();
		},

		set: function(name, value) {
			var top = window.top,
				cache = top['_CACHE'] || {};
			top['_CACHE'] = cache;
			return value !== undefined ? cache[name] = value : cache[name];

		},

		remove: function(name) {
			var cache = window.top['_CACHE'];
			if(cache && cache[name]) delete cache[name];
		},

		get: function(name) {
			try {
				var top = window.top,
					cache = top['_CACHE'] || {};
				if(cache != undefined && cache != null)
					return cache[name];
				else
					return null;
			} catch(e) {
				console.log(e);
				return null;
			}
		}
	},

	getTrueUrl(){
		let trueUrl;
		if(location.host == "health.cgc999.com") {
      trueUrl = '//health.cgc999.com/web' // 演示环境
    } else if(location.host == "www.cgc999.com") {
      trueUrl = '//www.cgc999.com' // 测试环境
    } else if(location.host == "cgc.cgc999.com") {
      trueUrl = '//cgc.cgc999.com/web' // 线上环境
    }
    return trueUrl;
	},
	//获取授权链接
	getOrizaUrl() {
		let trueUrl = this.getTrueUrl();
		let orizaUrl = trueUrl+'/oriza/index.html#/member/oriza';
		return orizaUrl;
	},
	saveRegInfo(info){
		//默认注册信息仅保存30s
		info.expireTime = new Date()+30*1000;
		info.type = 'reg';
		localStorage.setItem('_regOrLoginInfo_', info);
	},
	saveLoginInfo(info){
		//默认登录信息仅保存30s
		info.expireTime = new Date()+30*1000;
		info.type = 'login';
		localStorage.setItem('_regOrLoginInfo_', info);
	},
	getRegOrLoginInfo(){
		let info = localStorage['_regOrLoginInfo_'];
		if(info && info.expireTime>=new Date()){
			//补充授权获取的openid
			info.unionid = localStorage['_openid_'];
			//去除对应的expireTime
			
		}
		else{
			localStorage.removeItem('_regOrLoginInfo_');
		}
		return '';
	},
	showMessage(text,position){
		Vue.$vux.toast.show({
			width: '50%',
			type: 'text',
			position: position ? position : 'top',
			text: text
		})
	},
	ischeckTax(number) {
		var reg = /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/
		if(!reg.test(number)) {
			return false
		} else {
			return true
		}
	},
	isbankcard(number) {
		var reg = /^([1-9]{1})([0-9]{14,18})$/
		if(!reg.test(number)) {
			return false
		} else {
			return true
		}
	},
	istel(tel) {
		var reg = /^0\d{2,3}-?\d{7,8}$/
		if(!reg.test(tel)) {
			return false
		} else {
			return true
		}
	},
	isphone(tel) {
		var reg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199)\d{8}$/

		if(!reg.test(tel)) {
			return false
		} else {
			return true
		}
	},
	isemail(email) {
		var reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/

		if(!reg.test(email)) {
			return false
		} else {
			return true
		}
	},
	isqq(qq) {
		var reg = /^[\d]{5,13}$/

		if(!reg.test(qq)) {
			return false
		} else {
			return true
		}
	},
	getCs(name) {
		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
	},
	xss: {
		//html节点内容,html属性
		escapeHtml: function(str) {
			if(!str) return '';
			str = str.replace(/&/g, '&amp;');
			str = str.replace(/</g, '&lt;');
			str = str.replace(/>/g, '&gt;');
			str = str.replace(/"/g, '&quto;');
			str = str.replace(/'/g, '&#39;');

			// str = str.replace(/ /g,'&#32;');
			return str;
		},
		escapeForJs: function(str) {
			if(!str) return '';
			str = str.replace(/\\/g, '\\\\');
			str = str.replace(/"/g, '\\"');
			return str;
		},
		xssFilter: function(html) {
			if(!html) return "";
			html = html.replace(/<\s*\/?script\s*>/g, '');
			html = html.replace(/javascript:[^'"]*/g, '');
			html = html.replace(/onerror\s*=\s*['"]?[^'"]*['"]?/g, '');
			return html;
		}
	},
	getServerDate() {
		var xhr = null;
		if(window.XMLHttpRequest) {
			xhr = new window.XMLHttpRequest();
		} else { // ie
			xhr = new ActiveObject("Microsoft")
		}

		xhr.open("GET", "/", false) //false不可变
		xhr.send(null);
		var date = xhr.getResponseHeader("Date");

		var time = Date.parse(new Date(date))

		return Number(time / 1000);
	},
	isBackspace(keyValue) {
		return keyValue === 'Backspace';
	},
	isDot(keyValue) {
		return keyValue === '.';
	},
	isNumber(keyValue) {
		return(keyValue >= 0 && keyValue <= 9);
	},
}
export default mainApp
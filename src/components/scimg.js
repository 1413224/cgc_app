import imgComponent from './scimg.vue'

let $scImg

export default {
	install(Vue, options) {
		//验证码
		if(!$scImg) {
			const codePlugin = Vue.extend(imgComponent);
			$scImg = new codePlugin()
			$scImg.$mount(document.createElement('div'))
			document.body.appendChild($scImg.$el);
		}
		let scImg = {
			show(obj){
				$scImg.panel = true
				$scImg.e = obj.e
				$scImg.hide = obj.hide
			},
		}
		
		
		if(!Vue.$scImg) {
			Vue.$scImg = scImg
		}
		
		Vue.prototype.$scImg = Vue.$scImg
	}
}
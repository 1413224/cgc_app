import imgComponent from './scimg.vue'
//https://github.com/fengyuanchen/cropperjs/blob/master/README.md 官方文档
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
				$scImg.Confirm = obj.Confirm
				$scImg.Cancel = obj.Cancel
			},
		}
		
		
		if(!Vue.$scImg) {
			Vue.$scImg = scImg
		}
		
		Vue.prototype.$scImg = Vue.$scImg
	}
}
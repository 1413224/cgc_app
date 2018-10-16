import PDF from './pdf.vue'

let $showPDF

export default {
	install(Vue, options) {
		//验证码
		if(!$showPDF) {
			const pdfPlugin = Vue.extend(PDF);
			$showPDF = new pdfPlugin()
			$showPDF.$mount(document.createElement('div'))
			document.body.appendChild($showPDF.$el);
		}
		let showPDF = {
			show(url){
				$showPDF.show = true
				$showPDF.uri = url
			},
			hide(){
				$showPDF.show = false
			}
		}
		
		
		if(!Vue.$showPDF) {
			Vue.$showPDF = showPDF
		}
		
		Vue.prototype.$showPDF = Vue.$showPDF
	}
}
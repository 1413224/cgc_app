import isloadComponent from './isload.vue'

let $isload

export default {
	install(Vue, options) {

		//弹窗
		if(!$isload) {
			const isloadPlugin = Vue.extend(isloadComponent);
			$isload = new isloadPlugin()
			$isload.$mount(document.createElement('div'))
			document.body.appendChild($isload.$el);
		}
		let isload = {
			show(obj) {
				$isload.show = true
				if(obj) {
					$isload.ishide = obj.ishide
				}
			},
			hide(obj) {
				$isload.show = false
			}
		}

		if(!Vue.$isload) {
			Vue.$isload = isload
		}

		Vue.prototype.$isload = Vue.$isload
	}
}
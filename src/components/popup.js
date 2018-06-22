import popupComponent from './popup.vue'

let $popup

export default {
	install(Vue, options) {
		//验证码
		if(!$popup) {
			const popupPlugin = Vue.extend(popupComponent);
			$popup = new popupPlugin()
			$popup.$mount(document.createElement('div'))
			document.body.appendChild($popup.$el);
		}
		let popup = {
			show(obj) {
				if(obj.showSr) {
					$popup.showSr = obj.showSr
				}
				if(obj.showZc) {
					$popup.showZc = obj.showZc
				}
			},
			hide() {
				$popup.showSr = false
				$popup.showZc = false
			}
		}

		if(!Vue.$popup) {
			Vue.$popup = popup
		}

		Vue.prototype.$popup = Vue.$popup
	}
}
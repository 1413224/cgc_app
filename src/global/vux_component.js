import Vue from 'vue'
import { Group, DatetimeRange, Cell, 
	XDialog, Tab, Card,TabItem, CellBox, XHeader, 
	LoadMore, Confirm, Popup, Toast, InlineXNumber, 
	CheckIcon, CellFormPreview, XSwitch, XNumber, 
	XInput,Qrcode, XButton,
	Marquee,MarqueeItem,Masker,ButtonTab, ButtonTabItem,
	Badge, Previewer, Timeline, TimelineItem, Rater, 
	XTextarea, Radio, ConfirmPlugin, TransferDom } 
	from 'vux'
import { LoadingPlugin, DatetimePlugin, ToastPlugin, BusPlugin } from 'vux' //全局load


Vue.component('group', Group)
Vue.component('datetime-range', DatetimeRange)
Vue.component('cell', Cell)
Vue.component('tab', Tab)
Vue.component('card', Card)
Vue.component('marquee', Marquee)
Vue.component('marqueeItem', MarqueeItem)
Vue.component('masker', Masker)
Vue.component('buttonTab', ButtonTab)
Vue.component('buttonTabItem', ButtonTabItem)
Vue.component('tab-item', TabItem)
Vue.component('cell-box', CellBox)
Vue.component('x-header', XHeader)
Vue.component('x-input', XInput)
Vue.component('x-button', XButton)
Vue.component('qrcode', Qrcode)


// Vue.component('scroller', Scroller)
Vue.component('load-more', LoadMore)
Vue.component('popup', Popup)
Vue.component('toast', Toast)
Vue.component('confirm', Confirm)
// Vue.component('swiper', Swiper)
Vue.component('inline-x-number', InlineXNumber)
Vue.component('check-icon', CheckIcon)
Vue.component('cell-form-preview', CellFormPreview)
Vue.component('x-switch', XSwitch)
Vue.component('x-number', XNumber)
Vue.component('badge', Badge)
Vue.component('previewer', Previewer)
Vue.component('timeline', Timeline)
Vue.component('timeline-item', TimelineItem)
Vue.component('rater', Rater)
Vue.component('x-textarea', XTextarea)
Vue.component('radio', Radio)
Vue.component('x-dialog', XDialog)
// Vue.component('swipeout', Swipeout)
// Vue.component('swipeout-item', SwipeoutItem)
Vue.directive('transfer-dom', TransferDom)
Vue.use(ConfirmPlugin)

//全局load
Vue.use(LoadingPlugin)
Vue.use(DatetimePlugin)
Vue.use(ToastPlugin)
Vue.use(BusPlugin)





export default {
	data(){
		return {

		}
	},
	methods:{
		//快速导航 
		down2() {
			this.flags = true;
			var touch;
			if(event.touches) {
				touch = event.touches[0];
			} else {
				touch = event;
			}
			this.position.x = touch.clientX;
			this.position.y = touch.clientY;
			this.dx = this.$refs.moveDiv2.offsetLeft;
			this.dy = this.$refs.moveDiv2.offsetTop;
		},
		move2() {
			if(this.flags) {
				var touch;
				if(event.touches) {
					touch = event.touches[0];
				} else {
					touch = event;
				}
				this.nx = touch.clientX - this.position.x;
				this.ny = touch.clientY - this.position.y;
				this.xPum = document.body.scrollWidth
				this.yPum = this.dy + this.ny;
				if(this.xPum == 0) {
					this.$refs.moveDiv2.style.left = this.xPum + "px";
				} else if(this.xPum < 0) {
					this.$refs.moveDiv2.style.left = document.body.scrollWidth + "px";
				}
				var h = this.$route.meta.navShow ? Number(document.body.clientHeight - 140) : Number(document.body.clientHeight - 70)
				if(this.yPum >= 0 && this.yPum < h) {
					this.$refs.moveDiv2.style.top = this.yPum + "px";
				} else if(this.yPum < 0) {
					this.$refs.moveDiv2.style.top = 0 + "px";
				}
				//阻止页面的滑动默认事件
				event.preventDefault();
			}
		},
		//鼠标释放时候的函数
		end2() {
			this.flags = false;
		},
	}
}

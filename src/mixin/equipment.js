let equipment ={
	data(){
		return {
			msg:''
		}
	},
	methods:{
		getEquipment() {
			var _this = this
			if(_this.$store.state.page.isLogin == 'true') {
				_this.$popup.hide()
				_this.$http.get(_this.url.share.getMyEquipmentNotice, {
					params: {
						userId: _this.$store.state.user.userId
					}
				}).then((res) => {
					if(res.data.status == "00000000") {
						if(res.data.data) {
							_this.equipmentNum = res.data.data.num
							_this.equipmentShow = res.data.data.num > 0 ? true : false

							_this.navList[1].tip = res.data.data.num
						}
					}
				})
			} else {
				_this.equipmentShow = false
			}
		},
		// 实现移动端拖拽   设备按钮
		down() {
			this.flags = true;
			var touch;
			if(event.touches) {
				touch = event.touches[0];
			} else {
				touch = event;
			}
			this.position.x = touch.clientX;
			this.position.y = touch.clientY;
			this.dx = this.$refs.moveDiv.offsetLeft;
			this.dy = this.$refs.moveDiv.offsetTop;
		},
		move() {
			if(this.flags) {
				var touch;
				if(event.touches) {
					touch = event.touches[0];
				} else {
					touch = event;
				}
				this.nx = touch.clientX - this.position.x;
				this.ny = touch.clientY - this.position.y;
				this.xPum = this.dx + this.nx;
				this.yPum = this.dy + this.ny;

				if(this.xPum >= Number(document.body.clientWidth / 6) && this.xPum < Number(document.body.clientWidth - 70)) {
					this.$refs.moveDiv.style.left = this.xPum + "px";
				} else if(this.xPum < 0) {
					this.$refs.moveDiv.style.left = Number(document.body.clientWidth / 6) + "px";
				}
				var h = this.$route.meta.navShow ? Number(document.body.clientHeight - 140) : Number(document.body.clientHeight - 70)
				if(this.yPum >= 0 && this.yPum < h) {
					this.$refs.moveDiv.style.top = this.yPum + "px";
				} else if(this.yPum < 0) {
					this.$refs.moveDiv.style.top = 0 + "px";
				}
				//阻止页面的滑动默认事件
				//					document.addEventListener("touchmove", function() {
				event.preventDefault();
				//					}, false);
			}
		},
		//鼠标释放时候的函数
		end() {
			this.flags = false;
		},



	}
}

export default equipment
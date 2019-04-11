<template>
	<ul class="video-box" v-if="show">
		<li v-for="(item,index) in videoList" :key="index" :style="styleObject(item.videoHeight)">
			<d-player ref="player" @fullscreen="fs" :options="item.options"></d-player>
		</li>
	</ul>
</template>

<script>
	import VueDPlayer from 'vue-dplayer'
	import 'vue-dplayer/dist/vue-dplayer.css'
	export default {
		components: {
			'd-player': VueDPlayer
		},
		props: {
            videoConfig:{
				type:Object,
				default:{}
			}
		},
		data() {
			return {
				show: false,
				videoList:[]
			}
		},
		computed: {
            configData () {
                return this.videoConfig.data
            }
		},
		watch: {
			'configData.num': {
				handler() {
					var vm = this
					this.show = false
					vm.videoList = JSON.parse(JSON.stringify(vm.configData.videoList))
					setTimeout(function() {
						vm.show = true
					}, 100)
				},
				deep: true
			}
		},
		mounted() {
			var vm = this
			vm.videoList = JSON.parse(JSON.stringify(vm.configData.videoList))
			vm.videoList.forEach((value) => {
				value.options = {
					autoplay: false, //自动播放
					theme: '#FADFA3', //主体颜色
					loop: false, //循环播放
					lang: 'zh-cn', //语言
					screenshot: false, //视频截图
					hotkey: false, //启动热键
					volume: 0.7, //音量
					mutex: true, //多个视频同时播放
					video: {
						url: value.videoUrl,
						pic: value.imgUrl
					}
				}
			})
			this.show = true
		},
		methods: {
            styleObject(height) {
                let temp = this.configData
                height = height > 0 ? height/50 + 'rem' : 'auto'
                return `background-color: ${temp.backgroundColor}; padding: ${temp.paddingVertical/50}rem ${temp.paddingHorizontal/50}rem; height: ${height};`
			},
			fs() {
				this.player.fullScreen.request('browser')
			}
		},

	}
</script>

<style lang="less" scoped>
	.video-box {
		li {
			.dplayer {
				height: 100%;
			}
		}
	}
</style>
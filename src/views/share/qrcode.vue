<template>
	<div>
		<setting-header :title="title"></setting-header>
		<qrcode :value="qrcodeVal" :size="250" type="img" class="qrcode"></qrcode>
	</div>
</template>

<script>
	import settingHeader from '../../components/setting_header'
	export default {
		data() {
			return {
				title: '二维码',
				qrcodeVal: ''
			}
		},
		components: {
			settingHeader
		},
		created() {
			this.qrcodeVal = 'http://192.168.3.145:8080/#/user/reg?parentId=' + this.$store.state.user.userId
		}
	}
</script>

<style lang="less" scoped>
	.qrcode {
		padding-top: 2rem;
		display: flex;
		justify-content: center;
	}
</style>
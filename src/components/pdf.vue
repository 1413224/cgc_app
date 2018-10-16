<template>
	<div class="pdf-box">
		<div v-if="show">
			<p id="container" :class="{'top46':vm.$store.state.page.isWx == false}">
				<canvas id="the-canvas"></canvas>
			</p>
			<div class="c-btn" @click="show = false">取消</div>
		</div>
	</div>
</template>
</div>

<script>
	import PDFJS from 'pdfjs-dist'

	export default {
		props: {
			show: Boolean,
			uri: ''
		},
		data() {
			return {
				pdfDoc: null,
				pageNum: 1,
				pageRendering: false,
				pageNumPending: null,
				scale: 1
			}
		},
		watch: {
			show() {
				if(this.show) {
					//					this.uri = 'data:application/pdf;base64,' + this.uri
					this.showPDF(this.uri)
				}
			}
		},
		methods: {
			showPDF(uri) {
				let _this = this
				var pdfData = atob(uri)
				const CMAP_URL = 'https://unpkg.com/pdfjs-dist@2.0.489/cmaps/'
				PDFJS.getDocument({
					data: pdfData,
					cMapUrl: CMAP_URL,
					cMapPacked: true,
				}).then(function(pdf) {
					console.log(pdf)
					_this.pdfDoc = pdf
					_this.renderPage(1)
				})
			},
			renderPage(num) {
				this.pageRendering = true
				let _this = this
				this.pdfDoc.getPage(num).then(function(page) {
					var viewport = page.getViewport(_this.scale)
					let canvas = document.getElementById('the-canvas')
					canvas.height = viewport.height
					canvas.width = viewport.width

					// Render PDF page into canvas context
					var renderContext = {
						canvasContext: canvas.getContext('2d'),
						viewport: viewport
					}
					var renderTask = page.render(renderContext)

					// Wait for rendering to finish
					renderTask.promise.then(function() {
						_this.pageRendering = false
						if(_this.pageNumPending !== null) {
							// New page rendering is pending
							this.renderPage(_this.pageNumPending)
							_this.pageNumPending = null
						}
					})
				})
			},
			queueRenderPage(num) {
				if(this.pageRendering) {
					this.pageNumPending = num
				} else {
					this.renderPage(num)
				}
			},
			onPrevPage() {
				if(this.pageNum <= 1) {
					return
				}
				this.pageNum--
					this.queueRenderPage(this.pageNum)
			},
			onNextPage() {
				if(this.pageNum >= this.pdfDoc.numPages) {
					return
				}
				this.pageNum++
					this.queueRenderPage(this.pageNum)
			}
		}
	}
</script>
<style>
	.c-btn {
		position: fixed;
		left: 50%;
		bottom: 3%;
		width: 2rem;
		height: 0.88rem;
		line-height: 0.88rem;
		border: none;
		border-radius: 3px;
		background: #336FFF;
		color: white;
		text-align: center;
		transform: translate(-50%, -3%);
		font-size: 0.30rem;
	}
	
	#container {
		background-color: rgba(0, 0, 0, 0.75);
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		text-align: center;
		padding: 5px;
		overflow: auto;
		box-sizing: border-box;
	}
	.top46{
		padding-top: 48px!important;
	}
	.pdf-page {}
	
	.foot {
		position: fixed;
		transform: translate(-50%, 0);
		left: 50%;
	}
</style>
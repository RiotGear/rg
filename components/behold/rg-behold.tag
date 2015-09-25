<rg-behold>

	<div class="container">
		<div class="controls">
			<input type="range" class="ranger" name="diff" value="0" min="0" max="1" step="0.01" oninput={ updateDiff } onchange={ updateDiff }>
		</div>
		<div class="images">
			<div class="image">
				<img class="image-2" src={ opts.image2 }>
			</div>
			<div class="image fallback">
				<img class="image-1" src={ opts.image1 }>
			</div>
		</div>
	</div>

	<script>
		opts.mode = opts.mode || 'fade'

		var image1, image2, fallback

		this.on('mount', () => {
			image1 = this.root.querySelector('.image-1')
			image2 = this.root.querySelector('.image-2')
			fallback = typeof image1.style.webkitClipPath == 'undefined'
			if (opts.mode == 'fade') {
				this.root.querySelector('.controls').style.direction = 'rtl'
				this.diff.value = 1
			}

			let img1Loaded, img2Loaded, img1H, img2H
			let img1 = new Image()
			let img2 = new Image()
			img1.onload = function() {
				img1Loaded = true
				img1H = this.height
				calculateMaxHeight()
			}
			img2.onload = function() {
				img2Loaded = true
				img2H = this.height
				calculateMaxHeight()
			}
			img1.src = opts.image1
			img2.src = opts.image2

			let _this = this
			function calculateMaxHeight() {
				if (img1Loaded && img2Loaded) {
					let container = _this.root.querySelector('.container')
					container.style.height = `${container.getBoundingClientRect().height + Math.max(img1H, img2H)}px`
					_this.updateDiff()
				}
			}
		})

		this.updateDiff = e => {
			if (opts.mode == 'fade') {
				image1.style.opacity = this.diff.value
			} else if (opts.mode == 'swipe') {
				if (!fallback) {
					image1.style.clipPath =
						image1.style.webkitClipPath =
						`inset(0 0 0 ${(image1.clientWidth * this.diff.value) - 1}px)`
				} else {
					var fallbackImg = this.root.querySelector('.fallback')
					fallbackImg.style.clip =
						`rect(auto, auto, auto, ${fallbackImg.clientWidth * this.diff.value}px)`
				}
			}
		}
	</script>

	<style scoped>
		.controls {
			text-align: center;
		}

		.ranger {
			width: 90%;
			max-width: 300px;
		}

		.images {
			position: relative;
		}

		.image {
			position: absolute;
			width: 100%;
			text-align: center;
		}

		.image img {
			max-width: 90%;
		}
	</style>

</rg-behold>

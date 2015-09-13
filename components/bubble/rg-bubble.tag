<rg-bubble>

	<div class="context">
		<div class="bubble { visible: visible }">
			{ text }
		</div>
		<div class="content" onmouseover="{ showBubble }" onmouseout="{ hideBubble }" onclick="{ toggleBubble }">
			<yield/>
		</div>
	</div>

	<script>

		this.text = opts.text
		this.visible = false
		this.showBubble = () => {
			clearTimeout(this.timer)
			this.visible = true
		}
		this.hideBubble = () => {
			this.timer = setTimeout(() => {
				this.visible = false
				this.update()
			}, 1000)
		}
		this.toggleBubble = () => {
			this.visible = !this.visible
		}

	</script>

	<style scoped>

		.context, .content {
			display: inline-block;
			position: relative;
		}

		.bubble {
			position: absolute;
			display: block;
			top: -27px;
			left: 50%;
			-webkit-transform: translate3d(-50%, 0, 0);
			transform: translate3d(-50%, 0, 0);
			padding: 5px 10px;
			background-color: rgba(0, 0, 0, 0.8);
			color: white;
			text-align: center;
			font-size: 12px;
			line-height: 1;
			white-space: nowrap;
			opacity: 0;
			transition: opacity 0.1s, top 0.1s;
		}

		.visible {
			top: -30px;
			opacity: 1;
		}

		.bubble:after {
			content: '';
			position: absolute;
			display: block;
			bottom: -10px;
			left: 50%;
			-webkit-transform: translate3d(-50%, 0, 0);
			transform: translate3d(-50%, 0, 0);
			width: 0;
			height: 0;
			border: 5px solid rgba(0, 0, 0, 0);
			border-top-color: rgba(0, 0, 0, 0.9);
		}

	</style>
</rg-bubble>

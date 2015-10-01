<rg-bubble>

	<div class="context">
		<div class="bubble { visible: visible }">
			<rg-raw content="{ opts.content }"></rg-raw>
		</div>
		<div class="content" onmouseover="{ showBubble }" onmouseout="{ hideBubble }" onclick="{ toggleBubble }">
			<yield/>
		</div>
	</div>

	<script>
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
			top: -50px;
			left: 50%;
			transform: translate3d(-50%, 0, 0);
			padding: 10px 15px;
			background-color: #000;
			color: white;
			text-align: center;
			font-size: 0.9em;
			line-height: 1;
			white-space: nowrap;
			opacity: 0;
		}

		.visible {
			display: block;
			opacity: 1;
		}

		.bubble:after {
			content: '';
			position: absolute;
			display: block;
			bottom: -20px;
			left: 50%;
			transform: translate3d(-50%, 0, 0);
			width: 0;
			height: 0;
			border: 10px solid transparent;
			border-top-color: #000;
		}
	</style>
</rg-bubble>

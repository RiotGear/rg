<rg-bubble>

	<div class="context">
		<div class="bubble { isvisible: isvisible }">
			{ opts.text }
		</div>
		<div class="content" onmouseover="{ showBubble }" onmouseout="{ hideBubble }" onclick="{ toggleBubble }">
			<yield/>
		</div>
	</div>

	<script>
		this.showBubble = () => {
			clearTimeout(this._timer)
			this.isvisible = true
		}

		this.hideBubble = () => {
			this._timer = setTimeout(() => {
				this.isvisible = false
				this.update()
			}, 1000)
		}

		this.toggleBubble = () => {
			this.isvisible = !this.isvisible
		}
	</script>

	<style scoped>
		.context,
		.content {
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
			display: none;
		}

		.isvisible {
			display: block;
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

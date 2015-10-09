<rg-toggle>

	<div class="wrapper">
		<label class="toggle">
			<input type="checkbox" checked="{ RgToggle.checked }" onclick="{ toggle }">

			<div class="track">
				<div class="handle"></div>
			</div>
		</label>
	</div>

	<script>
		this.on('mount', () => {
			this.RgToggle = opts.toggle || new RgToggle()
			this.RgToggle.on('checked', () => {
				this.update()
			})
			this.update()
		})

		this.toggle = () => {
			this.RgToggle.toggle()
		}

	</script>

	<style scoped>
		.wrapper {
			width: 60px;
			height: 20px;
			margin: 0;
			display: inline-block;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
		}

		.toggle {
			position: absolute;
			cursor: pointer;
		}

		input[type=checkbox] {
			display: none;
		}

		.track {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			width: 60px;
			height: 20px;
			padding: 2px;
			background-color: #b6c0c7;
			transition: background-color 0.1s linear;
			box-sizing: border-box;
		}

		input[type=checkbox]:checked + .track {
			background-color: #000;
		}

		.handle {
			position: relative;
			left: 0;
			width: 50%;
			height: 100%;
			background-color: white;
			transition: transform 0.1s linear;
		}

		input[type=checkbox]:checked + .track .handle {
			transform: translate3d(100%, 0, 0);
		}

	</style>
</rg-toggle>

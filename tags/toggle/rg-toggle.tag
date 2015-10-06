<rg-toggle>

	<div class="wrapper">
		<label class="toggle">
			<input type="checkbox" checked="{ checked }" onclick="{ toggle }">

			<div class="track">
				<div class="handle"></div>
			</div>
		</label>
	</div>

	<script>
		this.on('update', function() {
			this.checked = rg.toBoolean(opts.checked)
		})

		this.toggle = () => {
			this.checked = !this.checked
			if (rg.isFunction(opts.ontoggle)) opts.ontoggle(this.checked)
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

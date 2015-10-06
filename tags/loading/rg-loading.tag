<rg-loading>

	<div class="loading { visible: visible }">
		<div class="overlay"></div>
		<div class="content">
			<yield/>
		</div>
	</div>

	<script>
		this.on('update', () => {
			this.visible = rg.toBoolean(opts.visible)
		})
	</script>

	<style scoped>
		.loading {
			display: none;
		}

		.visible {
			display: block;
		}

		.overlay {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.8);
			z-index: 200;
		}

		.content {
			position: absolute;
			width: 95%;
			max-width: 420px;
			top: 50%;
			left: 50%;
			transform: translate3d(-50%, -50%, 0);
			background-color: transparent;
			color: #fff;
			text-align: center;
			z-index: 201;
		}
	</style>

</rg-loading>

<rg-loading>

	<div class="loading { visible: opts.visible }">
		<div class="overlay"></div>
		<div class="content">
			<yield/>
		</div>
	</div>

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
			-webkit-transform: translate3d(-50%, -50%, 0);
			-moz-transform: translate3d(-50%, -50%, 0);
			-ms-transform: translate3d(-50%, -50%, 0);
			-o-transform: translate3d(-50%, -50%, 0);
			transform: translate3d(-50%, -50%, 0);
			background-color: transparent;
			color: #fff;
			text-align: center;
			z-index: 201;
		}
	</style>

</rg-loading>

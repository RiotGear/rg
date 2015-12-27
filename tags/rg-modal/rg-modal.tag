<rg-modal>

	<div class="overlay { visible: RgModal.isvisible, ghost: RgModal.ghost, dismissable: RgModal.dismissable }" onclick="{ close }"></div>
	<div class="modal { visible: RgModal.isvisible, ghost: RgModal.ghost, dismissable: RgModal.dismissable }">
		<header class="header">
			<button if="{ RgModal.dismissable }" type="button" class="close" aria-label="Close" onclick="{ close }">
				<span aria-hidden="true">&times;</span>
			</button>
			<h3 class="heading"><rg-raw content="{ RgModal.heading }"></rg-raw></h3>
		</header>

		<div class="body">
			<yield/>
		</div>

		<footer class="footer">
			<button class="button" each="{ RgModal.buttons }" type="button" onclick="{ action }" style="{ style }">
				<rg-raw content="{ content }"></rg-raw>
			</button>
			<div class="clear"></div>
		</footer>
	</div>

	<script>
		this.on('mount', () => {
			this.RgModal = opts.modal || new rg.Modal(opts)
			this.RgModal.on('update', () => {
				this.update()
			})
			this.update()
		})

		this.close = () => {
			if (this.RgModal.dismissable) this.RgModal.isvisible = false
		}
	</script>

	<style scoped>
		.overlay {
			display: none;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.8);
			z-index: 100;
		}

		.overlay.dismissable {
			cursor: pointer;
		}

		.modal {
			display: none;
			position: absolute;
			width: 95%;
			max-width: 500px;
			font-size: 1.1em;
			top: 50%;
			left: 50%;
			transform: translate3d(-50%, -50%, 0);
			background-color: white;
			color: #252519;
			z-index: 101;
		}

		.modal.ghost {
			background-color: transparent;
			color: white;
		}

		.visible {
			display: block;
		}

		.header {
			position: relative;
			text-align: center;
		}

		.heading {
			padding: 20px 20px 0 20px;
			margin: 0;
			font-size: 1.2em;
		}

		.modal.ghost .heading {
			color: white;
		}

		.close {
			position: absolute;
			top: 5px;
			right: 10px;
			padding: 0;
			font-size: 1.2em;
			border: 0;
			background-color: transparent;
			color: #000;
			cursor: pointer;
			outline: none;
		}

		.modal.ghost .close {
			color: white;
		}

		.body {
			padding: 20px;
		}

		.footer {
			padding: 0 20px 20px 20px;
		}

		.button {
			float: right;
			padding: 10px;
			margin: 0 5px 0 0;
			border: none;
			font-size: 0.9em;
			text-transform: uppercase;
			cursor: pointer;
			outline: none;
			background-color: white;
		}

		.modal.ghost .button {
			color: white;
			background-color: transparent;
		}

		.clear {
			clear: both;
		}
	</style>

</rg-modal>

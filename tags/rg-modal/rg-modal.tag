<rg-modal>

	<div class="c-overlay { c-overlay--dismissable: opts.modal.dismissable }" if="{ opts.modal.isvisible }" onclick="{ close }"></div>
	<div class="c-modal { c-modal--ghost: opts.modal.ghost }" if="{ opts.modal.isvisible }">
		<header class="c-modal__header">
			<button if="{ opts.modal.dismissable }" type="button" class="c-button c-button--close" onclick="{ close }">
				&times;
			</button>
			<h3 class="c-heading c-heading--small">{ opts.modal.heading }</h3>
		</header>

		<div class="c-modal__body">
			<yield/>
		</div>

		<footer class="c-modal__footer { 'c-modal__footer--block': !opts.modal.ghost }">
			<button each="{ opts.modal.buttons }" type="button" class="c-button { 'c-button--' + type }" onclick="{ action }" style="{ style }">
				{ text }
			</button>
		</footer>
	</div>

	<script>
		this.on('mount', () => {
			if (!opts.modal) opts.modal = {}
		})

		this.close = () => {
			if (opts.modal.dismissable) {
				opts.modal.isvisible = false
				this.trigger('close')
			}
		}

	</script>

	<style scoped>
		.c-modal--ghost .c-modal__footer .c-button {
			margin: 0 .5em 0 0;
		}

	</style>

</rg-modal>

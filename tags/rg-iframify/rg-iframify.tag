<rg-iframify>

	<div class="iframify">
		<div class="frame">
			<yield></yield>
		</div>
	</div>

	<script>
		this.on('mount', () => {
			iframify(this.root.querySelector('.frame'), this.opts)
		})
	</script>

	<style scoped>
		.iframify {
			margin: 0;
			padding: 0;
		}

		iframe {
			position: relative;
			width: 100%;
			border: 0;
		}
	</style>

</rg-iframify>

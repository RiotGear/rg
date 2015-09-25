<rg-tab>

	<div class="tab { active: active }">
		<yield/>
	</div>

	<script>
			this.active = opts.active == 'true'
			this.disabled = opts.disabled == 'true'
	</script>

	<style>
		.tab {
			display: none;
			padding: 10px;
		}
		.tab.active {
			display: block;
		}
	</style>

</rg-tab>

<rg-include>

	{{ responseText }}

	<script>
		rg.xhr('get', opts.src, resp => {
			if (opts.unsafe) this.root.innerHTML = resp
			else this.responseText = resp
			this.update()
		})
	</script>

</rg-include>

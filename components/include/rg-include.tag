<rg-include>

	{{ responseText }}

	<script>
		var oReq = new XMLHttpRequest()
		oReq.onload = () => {
			if (opts.unsafe) this.root.innerHTML = oReq.responseText
			else this.responseText = oReq.responseText

			this.update()
		}
		oReq.open("get", opts.src, opts.async || true)
		oReq.send()
	</script>

</rg-include>

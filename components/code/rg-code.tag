<rg-code>

	<div class="editor"></div>

	<script>
		this.on('mount', () => {
			var editor = ace.edit(this.root.querySelector('.editor'))
			if (opts.theme) editor.setTheme(`ace/theme/${opts.theme}`)
			if (opts.mode) editor.getSession().setMode(`ace/mode/${opts.mode}`)
			editor.getSession().setTabSize(opts.tabsize || 2)
			if (opts.softtabs == "true") editor.getSession().setUseSoftTabs(true)
			if (opts.wordwrap == "true") editor.getSession().setUseWrapMode(true)
			if (opts.readonly == "true") editor.setReadOnly(true)
			editor.$blockScrolling = Infinity

			editor.getSession().on('change', e => {
				if (opts.onchange) opts.onchange(editor.getValue())
			})

			/* istanbul ignore next */
			if (opts.src) {
				let oReq = new XMLHttpRequest()
				oReq.onload = () => {
					editor.setValue(oReq.responseText, -1)
					this.update()
				}
				oReq.open('get', opts.src, true)
				oReq.send()
			} else {
				editor.setValue(opts.code)
			}
		})
	</script>

	<style scoped>
		.editor {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
		}
	</style>

</rg-code>

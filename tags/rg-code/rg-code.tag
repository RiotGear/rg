<rg-code>

	<div class="editor"></div>

	<script>
		if (!opts.editor) opts.editor = { code: '' }

		let editor

		const setupEditor = () => {
			editor.setTheme(`ace/theme/${opts.editor.theme || 'monokai'}`)
			editor.getSession().setMode(`ace/mode/${opts.editor.mode || 'html'}`)
			editor.getSession().setTabSize(opts.editor.tabsize || 2)
			editor.getSession().setUseSoftTabs(opts.editor.softtabs)
			editor.getSession().setUseWrapMode(opts.editor.wordwrap)
			editor.setReadOnly(opts.editor.readonly)
		}

		this.on('mount', () => {
			editor = ace.edit(this.root.querySelector('.editor'))
			editor.$blockScrolling = Infinity

			this.on('update', () => {
				setupEditor()
				if (opts.editor.code != editor.getValue())
					editor.setValue(opts.editor.code, 1)
			})
			if (opts.url) {
				const req = new XMLHttpRequest()
				req.onload = resp => {
					opts.editor.code = resp
					this.update()
				}
				req.open('get', opts.url, true)
				req.send()
			}
			editor.setValue(opts.editor.code, 1)
			editor.getSession().on('change', e => {
				opts.editor.code = editor.getValue()
				this.trigger('onchange', editor.getValue())
			})
			setupEditor()
			this.update()
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

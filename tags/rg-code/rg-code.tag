<rg-code>

	<div class="editor"></div>

	<script>
		let editor

		const setupEditor = () => {
			editor.setTheme(`ace/theme/${this.RgCode.theme}`)
			editor.getSession().setMode(`ace/mode/${this.RgCode.mode}`)
			editor.getSession().setTabSize(this.RgCode.tabsize)
			editor.getSession().setUseSoftTabs(this.RgCode.softtabs)
			editor.getSession().setUseWrapMode(this.RgCode.wordwrap)
			editor.setReadOnly(this.RgCode.readonly)
		}

		this.on('mount', () => {
			editor = ace.edit(this.root.querySelector('.editor'))
			editor.$blockScrolling = Infinity

			this.RgCode = opts.editor || new rg.Code(opts)
			this.RgCode.on('update', () => {
				this.update()
			})
			this.on('update', () => {
				setupEditor()
				if (this.RgCode.code != editor.getValue())
					editor.setValue(this.RgCode.code, 1)
			})
			if (this.RgCode.url) {

				const req = new XMLHttpRequest()
				req.onload = resp => {
					this.RgCode.code = resp
					this.update()
				}
				req.open('get', this.RgCode.url, true)
				req.send()
			}
			editor.setValue(this.RgCode.code, 1)
			editor.getSession().on('change', e => {
				this.RgCode.code = editor.getValue()
				this.RgCode.trigger('onchange', editor.getValue())
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

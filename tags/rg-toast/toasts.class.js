;(() => {
	window.rg = window.rg || {}
	rg.Toasts = class RgToasts {

		constructor(opts) {
			riot.observable(this)
			if (!opts) opts = {}
			this._uid = 1
			this._toasts = opts.toasts
			this._position = opts.position
			this._isvisible = opts.isvisible
		}

		update() {
			this.trigger('update')
		}

		uid() {
			return this._uid++
		}

		get toasts() {
			if (Array.isArray(this._toasts)) {
				this._toasts.forEach(toast => {
					if (typeof toast.isvisible == 'undefined') toast.isvisible = true
					toast.id = toast.id || this.uid()
					if (!toast.timer && !toast.sticky) {
						toast.startTimer = () => {
							toast.timer = window.setTimeout(() => {
								toast.isvisible = false
								this.trigger('close', toast)
								this.update()
							}, toast.timeout || 6000)
						}
						toast.startTimer()
					}
				})
				this.isvisible = this._toasts.filter(toast => toast.isvisible).length > 0
				return this._toasts
			}
			this._toats = []
			return this._toasts
		}

		set toasts(toasts) {
			this._toasts = toasts
		}

		get position() {
			return this._position || 'topright'
		}

		set position(position) {
			this._position = position
		}

		get isvisible() {
			return (this._isvisible == 'true' || this._isvisible === true)
		}

		set isvisible(isvisible) {
			this._isvisible = isvisible
		}

		add(toast) {
			this.toasts.push(toast)
			this.trigger('add', toast)
		}

		select(toast) {
			window.clearTimeout(toast.timer)
			toast.isvisible = false
			this.trigger('select', toast)
		}
	}
})()
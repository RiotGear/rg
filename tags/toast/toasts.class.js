class RgToasts extends RgTag {

  constructor(opts) {
    super()
    if (rg.isUndefined(opts)) opts = {}
    this._toasts = opts.toasts
    this._position = opts.position
    this._isvisible = opts.isvisible
  }

  get toasts() {
    if (rg.isArray(this._toasts)) {
      this._toasts.forEach(toast => {
        if (rg.isUndefined(toast.isvisible)) toast.isvisible = true
        toast.id = toast.id || rg.uid()
        if (!toast.timer && !toast.sticky) {
          toast.startTimer = () => {
            toast.timer = window.setTimeout(() => {
              toast.isvisible = false
              if (rg.isFunction(toast.onclose)) toast.onclose()
              this.update()
            }, rg.toNumber(toast.timeout) || 6000)
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
    return rg.toBoolean(this._isvisible)
  }
  set isvisible(isvisible) {
    this._isvisible = isvisible
  }

  add(toast) {
    this.toasts.push(toast)
  }
}

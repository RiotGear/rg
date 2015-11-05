class RgLoading extends RgTag {

  constructor(opts) {
    super()
    if (rg.isUndefined(opts)) opts = {}
    this._isvisible = opts.isvisible
  }

  get isvisible() {
    return rg.toBoolean(this._isvisible)
  }
  set isvisible(isvisible) {
    this._isvisible = isvisible
  }
}

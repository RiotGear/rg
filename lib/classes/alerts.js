class RgAlerts {

  constructor(opts) {
    riot.observable(this)
    this.alerts = []
    if (!rg.isArray(opts)) return
    opts.forEach((alert) => {
      this.add(alert)
    })
  }

  add(alert) {
    alert.id = Math.random().toString(36).substr(2, 8)
    if (rg.isUndefined(alert.isvisible)) alert.isvisible = true
    if (alert.timeout) {
      alert.startTimer = () => {
        alert.timer = setTimeout(() => {
          this.dismiss(alert)
        }, rg.toNumber(alert.timeout))
      }
      alert.startTimer()
    }
    this.alerts.push(alert)
    this.trigger('add', alert)
  }

  dismiss(alert) {
    alert.isvisible = false
    if (rg.isFunction(alert.onclose)) alert.onclose(alert)
    clearTimeout(alert.timer)
    this.trigger('dismiss', alert)
  }
}

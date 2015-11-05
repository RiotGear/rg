class RgTag {

  constructor() {
    riot.observable(this)
  }

  update() {
    this.trigger('update')
  }
}

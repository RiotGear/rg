describe('rg-toggle', function() {
  let tag, spy, toggle

  beforeEach(function() {
    spy = sinon.spy()
    toggle = {
      checked: false
    }
    $('body').append('<rg-toggle></rg-toggle>')
    tag = riot.mount('rg-toggle', {
      toggle
    })[0]
    tag.on('toggle', spy)
  })

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })

  it('has an unchecked checkbox', function() {
    $('rg-toggle input[type=checkbox]').is(':checked').should.be.false
  })

  it('has a checked checkbox', function() {
    toggle.checked = true
    riot.update()
    $('rg-toggle input[type=checkbox]').is(':checked').should.be.true
  })

  it('calls ontoggle when toggled', function() {
    $('rg-toggle input[type=checkbox]').click()
    spy.should.have.been.called
  })
})

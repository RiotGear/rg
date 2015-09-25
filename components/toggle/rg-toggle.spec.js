describe('rg-toggle', function() {
  let tag, spy

  beforeEach(function() {
    spy = sinon.spy()
    $('body').append('<rg-toggle></rg-toggle>')
    tag = riot.mount('rg-toggle', {
      checked: false,
      ontoggle: spy
    })[0]
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
    tag.unmount(true)
    tag = riot.mount('rg-toggle', {
        checked: true
    })[0]
    $('rg-toggle input[type=checkbox]').is(':checked').should.be.true
  })

  it('no ontoggle function', function() {
    tag.unmount(true)
    tag = riot.mount('rg-toggle')[0]
    $('rg-toggle input[type=checkbox]').click()
    spy.should.not.have.been.called
  })

  it('calls ontoggle when toggled', function() {
    $('rg-toggle input[type=checkbox]').click()
    spy.should.have.been.calledOnce
  })
})

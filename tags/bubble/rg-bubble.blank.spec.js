describe('rg-alerts', function() {
  let tag

  beforeEach(function() {

    $('body').append('<rg-alerts></rg-alerts>')
    tag = riot.mount('rg-alerts')[0]
  })

  after(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })
})

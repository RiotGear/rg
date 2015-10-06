describe('rg-code', function() {
  let tag

  beforeEach(function() {

    $('body').append('<rg-code></rg-code>')
    tag = riot.mount('rg-code')[0]
  })

  after(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })
})

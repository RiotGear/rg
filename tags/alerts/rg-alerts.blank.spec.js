describe('rg-bubble', function() {
  let tag

  beforeEach(function() {

    $('body').append('<rg-bubble></rg-bubble>')
    tag = riot.mount('rg-bubble')[0]
  })

  after(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })
})

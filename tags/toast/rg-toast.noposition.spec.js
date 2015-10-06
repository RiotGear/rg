describe('rg-toast', function() {
  let tag

  beforeEach(function() {
    $('body').append('<rg-toast></rg-toast>')
    tag = riot.mount('rg-toast', {
      toasts: [{
        content: 'Auto disappear',
        timeout: 500
      }]
    })[0]
  })

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })

  it('position is defaulted', function() {
    tag.opts.position.should.equal('topright')
  })
})

describe('rg-loading', function() {
  let tag

  beforeEach(function() {
    $('body').append('<rg-loading visible="true">Please wait...</rg-loading>')
    tag = riot.mount('rg-loading')[0]
  })

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })

  it('has an overlay', function() {
    $('rg-loading .overlay').length.should.be.equal(1)
  })

  it('injects the text', function() {
    $('rg-loading .loading').text().should.contain('Please wait...')
  })
})

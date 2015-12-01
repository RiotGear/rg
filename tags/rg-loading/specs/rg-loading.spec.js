describe('rg-loading', function() {
  let tag, loading

  beforeEach(function() {
    loading = new RgLoading({
      isvisible: true
    })
    $('body').append('<rg-loading>Please wait...</rg-loading>')
    tag = riot.mount('rg-loading', {
      loading
    })[0]
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

describe('rg-include', function() {
  let tag

  beforeEach(function() {
    $('body').append('<rg-include src="inc.html"></rg-include>')
    tag = riot.mount('rg-include')[0]
  })

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })

  it('handles unsafe', function(done) {
    setTimeout(function () {
      tag.root.innerHTML.should.equal('NOT FOUND')
      tag.responseText.should.equal('NOT FOUND')
      done()
    }, 1000)
  })
})

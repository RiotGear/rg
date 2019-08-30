describe('rg-raw', function() {
  it('is mounted', function() {
    const tag = newTag('rg-raw', {})
    tag.isMounted.should.be.true
  })

  it('contains the supplied html', function() {
    const tag = newTag('rg-raw', { content: '<strong>Hello there</strong>' })
    tag.root.innerHTML.should.be.equal('<strong>Hello there</strong>')
  })
})

describe('rg-iframify', function () {
  it('mounts', function() {
    const tag = newTag('rg-iframify')
    tag.isMounted.should.be.true
  })
})
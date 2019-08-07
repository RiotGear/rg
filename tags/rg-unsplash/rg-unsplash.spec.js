describe('rg-unsplash', function() {
  let tag

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag = newTag('rg-unsplash')
    tag.isMounted.should.be.true
  })

  it('compiles the correct src with all options', function() {
    const unsplash = {}
    unsplash.width = 200
    unsplash.height = 100
    unsplash.greyscale = true
    unsplash.random = true
    unsplash.blur = true
    unsplash.image = '491'
    unsplash.gravity = 'north'
    tag = newTag('rg-unsplash', { unsplash })
    $('rg-unsplash img').length.should.equal(1)
    const expected = 'https://unsplash.it/g/200/100/?random&blur&image=491&gravity=north'
    $('rg-unsplash img').attr('src').should.equal(expected)
  })

  it('compiles the correct src with no options', function() {
    tag = newTag('rg-unsplash')
    $('rg-unsplash img').attr('src').should.equal('https://unsplash.it/450/250/?')
  })
})

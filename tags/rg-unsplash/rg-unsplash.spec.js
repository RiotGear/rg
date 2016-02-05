describe('rg-unsplash', function() {
  let tag, unsplash

  beforeEach(function() {
    unsplash = {}
    unsplash.width = 200
    unsplash.height = 100
    unsplash.greyscale = true
    unsplash.random = true
    unsplash.blur = true
    unsplash.image = '491'
    unsplash.gravity = 'north'
    $('body').append('<rg-unsplash></rg-unsplash>')
    tag = riot.mount('rg-unsplash', {
      unsplash
    })[0]
  })

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })

  it('compiles the correct src with all options', function() {
    $('rg-unsplash img').length.should.equal(1)
    $('rg-unsplash img').attr('src').should.equal('https://unsplash.it/g/200/100/?random&blur&image=491&gravity=north')
  })
})

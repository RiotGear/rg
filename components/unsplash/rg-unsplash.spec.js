describe('rg-unsplash', function() {
  let tag

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    $('body').append('<rg-unsplash></rg-unsplash>')
    tag = riot.mount('rg-unsplash')[0]
    tag.isMounted.should.be.true
  })

  it('has an img tag', function() {
    $('body').append('<rg-unsplash></rg-unsplash>')
    tag = riot.mount('rg-unsplash')[0]
    $('rg-unsplash img').length.should.equal(1)
  })

  it('compiles the correct src with all options', function () {
    $('body').append(`<rg-unsplash width="200"
                                   height="100"
                                   greyscale="true"
                                   random="true"
                                   blur="true"
                                   image="491"
                                   gravity="north">
                      </rg-unsplash>`)
    tag = riot.mount('rg-unsplash')[0]
    $('rg-unsplash img').attr('src').should.equal('https://unsplash.it/g/200/100/?random&blur&image=491&gravity=north')
  })

  it('supports grayscale and greyscale', function () {
    $('body').append(`<rg-unsplash width="200"
                                   height="100"
                                   grayscale="true"
                                   random="true"
                                   blur="true"
                                   image="491"
                                   gravity="north">
                      </rg-unsplash>`)
    tag = riot.mount('rg-unsplash')[0]
    $('rg-unsplash img').attr('src').should.equal('https://unsplash.it/g/200/100/?random&blur&image=491&gravity=north')
  })

  it('defaults width and height', function () {
    $('body').append(`<rg-unsplash grayscale="true"
                                   random="true"
                                   blur="true"
                                   image="491"
                                   gravity="north">
                      </rg-unsplash>`)
    tag = riot.mount('rg-unsplash')[0]
    $('rg-unsplash img').attr('src').should.equal('https://unsplash.it/g/450/250/?random&blur&image=491&gravity=north')
  })

  it('doesnt add options if not specified', function () {
    $('body').append('<rg-unsplash></rg-unsplash>')
    tag = riot.mount('rg-unsplash')[0]
    $('rg-unsplash img').attr('src').should.equal('https://unsplash.it/450/250/?')
  })
})

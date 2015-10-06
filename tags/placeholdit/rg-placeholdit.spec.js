describe('rg-placeholdit', function() {
  let tag

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    $('body').append('<rg-placeholdit></rg-placeholdit>')
    tag = riot.mount('rg-placeholdit')[0]
    tag.isMounted.should.be.true
  })

  it('has an img tag', function() {
    $('body').append('<rg-placeholdit></rg-placeholdit>')
    tag = riot.mount('rg-placeholdit')[0]
    $('rg-placeholdit img').length.should.equal(1)
  })

  it('compiles the correct src with all options', function () {
    $('body').append(`<rg-placeholdit width="200"
                                      height="100"
                                      background-color="1fadc5"
                                      color="4df"
                                      font-size="50"
                                      text="JPEG"
                                      format="jpg">
                      </rg-placeholdit>`)
    tag = riot.mount('rg-placeholdit')[0]
    $('rg-placeholdit img').attr('src').should.equal('https://placeholdit.imgix.net/~text?bg=1fadc5&txtclr=4df&txt=JPEG&txtsize=50&w=200&h=100&fm=jpg')
  })

  it('defaults options', function () {
    $('body').append('<rg-placeholdit></rg-placeholdit>')
    tag = riot.mount('rg-placeholdit')[0]
    $('rg-placeholdit img').attr('src').should.equal('https://placeholdit.imgix.net/~text?bg=f01e52&txtclr=fff&txt=450 x 250&txtsize=30&w=450&h=250&fm=png')
  })
})

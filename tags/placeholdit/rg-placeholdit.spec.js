describe('rg-placeholdit', function() {
  let tag, placeholdit

  beforeEach(function() {
    placeholdit = new RgPlaceholdit()
    $('body').append('<rg-placeholdit></rg-placeholdit>')
    tag = riot.mount('rg-placeholdit', { placeholdit })[0]
  })

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })

  it('has an img tag', function() {
    $('rg-placeholdit img').length.should.equal(1)
  })

  it('compiles the correct src with all options', function () {
    placeholdit.width = 200
    placeholdit.height = 100
    placeholdit.background = '1fadc5'
    placeholdit.color = '4df'
    placeholdit.textsize = 50
    placeholdit.text = 'JPEG'
    placeholdit.format = 'jpg'

    $('rg-placeholdit img').attr('src').should.equal('https://placeholdit.imgix.net/~text?bg=1fadc5&txtclr=4df&txt=JPEG&txtsize=50&w=200&h=100&fm=jpg')
  })

  it('defaults options', function () {
    $('body').append('<rg-placeholdit></rg-placeholdit>')
    tag = riot.mount('rg-placeholdit')[0]
    $('rg-placeholdit img').attr('src').should.equal('https://placeholdit.imgix.net/~text?bg=f01e52&txtclr=fff&txt=450 x 250&txtsize=30&w=450&h=250&fm=png')
  })
})

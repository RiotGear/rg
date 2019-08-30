describe('rg-placeholdit', function() {
  let tag, placeholdit

  beforeEach(function() {
    $('body').append('<rg-placeholdit></rg-placeholdit>')
    tag = riot.mount('rg-placeholdit')[0]
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

  it('defaults options', function () {
    $('rg-placeholdit img').attr('src').should.equal('https://placeholdit.imgix.net/~text?bg=000&txtclr=fff&txt=450 x 250&txtsize=30&w=450&h=250&fm=png')
  })

  it('also alows specified options', function() {
    const tag2 = newTag("rg-placeholdit",{
      placeholdit: {
        width: 50,
        height: 60,
        background: "pink",
        color: "blue",
        text: "BOATS!",
        textsize: 35,
        format: "jpg",
      },
    })
    tag2.$('img').src.should.equal('https://placeholdit.imgix.net/~text?bg=pink&txtclr=blue&txt=BOATS!&txtsize=35&w=50&h=60&fm=jpg')
  })
})

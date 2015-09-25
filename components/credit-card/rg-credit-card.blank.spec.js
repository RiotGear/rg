describe('rg-credit-card', function() {
  let tag

  beforeEach(function() {

    $('body').append('<rg-credit-card></rg-credit-card>')
    tag = riot.mount('rg-credit-card')[0]
  })

  after(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })

  it('is blank when no cardNo is specified', function() {
    const textbox = $('rg-credit-card .card-no')
    textbox.val().should.equal('')
  })
})

describe('rg-credit-card-number', function() {
  let tag

  beforeEach(function() {

    $('body').append('<rg-credit-card-number></rg-credit-card-number>')
    tag = riot.mount('rg-credit-card-number')[0]
  })

  after(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })

  it('is blank when no cardNo is specified', function() {
    const textbox = $('rg-credit-card-number .card-no')
    textbox.val().should.equal('')
  })
})

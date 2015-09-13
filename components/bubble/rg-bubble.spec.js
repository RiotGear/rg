describe('rg-bubble', function() {
  let bubble

  beforeEach(function() {
    $('body').append('<rg-bubble text="Hello World!"></rg-bubble>')
    bubble = riot.mount('rg-bubble')[0]
  })

  it('is mounted', function() {
    bubble.isMounted.should.be.true
  })

  it('displays tooltip with correct text on click', function() {
    $('rg-bubble .content').trigger('click')
    const visible = $('rg-bubble .bubble').is('.visible')
    const text = $('rg-bubble .bubble').text()
    visible.should.be.true
    text.should.contain($('rg-bubble').attr('text'))
  })

  it('displays tooltip with correct text on mouse over', function() {
    $('rg-bubble .content').trigger('mouseover')
    const visible = $('rg-bubble .bubble').is('.visible')
    const text = $('rg-bubble .bubble').text()
    visible.should.be.true
    text.should.contain($('rg-bubble').attr('text'))
  })
})

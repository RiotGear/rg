describe('rg-bubble', function() {
  let bubble

  beforeEach(function() {
    $('body').append('<rg-bubble content="Hello World!"></rg-bubble>')
    bubble = riot.mount('rg-bubble')[0]
  })

  afterEach(function () {
    bubble.unmount()
  })

  it('is mounted', function() {
    bubble.isMounted.should.be.true
  })

  describe('displays tooltip with correct text', function() {
    it('on click', function() {
      $('rg-bubble .content').trigger('click')
      const visible = $('rg-bubble .bubble').is(':visible')
      const text = $('rg-bubble .bubble').text()
      visible.should.be.true
      text.should.contain($('rg-bubble').attr('content'))
    })

    it('on mouse over', function() {
      $('rg-bubble .content').trigger('mouseover')
      const visible = $('rg-bubble .bubble').is(':visible')
      const text = $('rg-bubble .bubble').text()
      visible.should.be.true
      text.should.contain($('rg-bubble').attr('content'))
    })
  })

  describe('hides tooltip', function() {
    beforeEach(function() {
      $('rg-bubble .content').trigger('click')
    })

    it('on click', function() {
      $('rg-bubble .content').trigger('click')
      $('rg-bubble .bubble.isvisible').length.should.equal(0)
    })

    describe('after 1 second', function() {
      it('on mouse out', function(done) {
        $('rg-bubble .content').trigger('mouseout')
        setTimeout(function() {
          $('rg-bubble .bubble.isvisible').length.should.equal(0)
          done()
        }, 1000)
      })
    })
  })
})

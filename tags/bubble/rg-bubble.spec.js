describe('rg-bubble', function() {
  let tag, bubble

  beforeEach(function() {
    $('body').append('<rg-bubble></rg-bubble>')
    bubble = new RgBubble({
      content: '<strong>Ping</strong>'
    })
    tag = riot.mount('rg-bubble', {
      bubble
    })[0]
  })

  afterEach(function () {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })

  describe('displays tooltip with correct text', function() {
    it('on click', function() {
      $('rg-bubble .content').trigger('click')
      $('rg-bubble .bubble').is(':visible').should.be.true
      $('rg-bubble .bubble').html().should.contain(bubble.content)
    })

    it('on mouse over', function() {
      $('rg-bubble .content').trigger('mouseover')
      $('rg-bubble .bubble').is(':visible').should.be.true
      $('rg-bubble .bubble').html().should.contain(bubble.content)
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

describe('rg-bubble no opts', function() {
  let tag

  beforeEach(function() {

    $('body').append('<rg-bubble></rg-bubble>')
    tag = riot.mount('rg-bubble')[0]
  })

  after(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })
})

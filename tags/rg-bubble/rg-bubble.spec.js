describe('rg-bubble', function() {
  let tag, bubble
  const text = 'This is a bubble'

  beforeEach(function() {
    $('body').append(`<rg-bubble></rg-bubble>`)
    tag = riot.mount('rg-bubble', {
      bubble: {
        text
      }
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
      $('rg-bubble .bubble').length.should.equal(1)
      $('rg-bubble .bubble').html().should.contain(text)
    })

    it('on mouse over', function() {
      $('rg-bubble .content').trigger('mouseover')
      $('rg-bubble .bubble').length.should.equal(1)
      $('rg-bubble .bubble').html().should.contain(text)
    })
  })

  describe('hides tooltip', function() {
    beforeEach(function() {
      $('rg-bubble .content').trigger('click')
    })

    it('on click', function() {
      $('rg-bubble .content').trigger('click')
      $('rg-bubble .bubble').length.should.equal(0)
    })

    describe('after 1 second', function() {
      it('on mouse out', function(done) {
        $('rg-bubble .content').trigger('mouseout')
        setTimeout(function() {
          $('rg-bubble .bubble').length.should.equal(0)
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

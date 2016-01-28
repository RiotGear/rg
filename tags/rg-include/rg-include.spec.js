describe('rg-include', function() {
  let tag, include

  beforeEach(function() {
    include = {
      url: 'inc.html'
    }

    $('body').append('<rg-include></rg-include>')
    tag = riot.mount('rg-include', {
      include
    })[0]
  })

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })

  it('handles unsafe', function(done) {
    setTimeout(function () {
      tag.responseText.should.equal('NOT FOUND')
      done()
    }, 1000)
  })
})

describe('rg-include unsafe', function() {
  let tag, include

  beforeEach(function() {
    include = {
      url: 'inc.html',
      unsafe: true
    }

    $('body').append('<rg-include></rg-include>')
    tag = riot.mount('rg-include', {
      include
    })[0]
  })

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })

  it('handles unsafe', function(done) {
    setTimeout(function () {
      tag.root.innerHTML.should.equal('NOT FOUND')
      expect(tag.responseText).to.not.exist
      done()
    }, 1000)
  })
})

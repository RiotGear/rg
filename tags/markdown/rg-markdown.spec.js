describe('rg-markdown', function() {
  let tag
  let spy = sinon.spy()

  beforeEach(function() {
    $('body').append('<rg-markdown content="# Heading"></rg-markdown>')
    tag = riot.mount('rg-markdown')[0]
  })

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })

  it('renders HTML', function () {
    $('rg-markdown').html().should.contain('<h1>Heading</h1>')
  })
})

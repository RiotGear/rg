describe('rg-raw', function() {
  let tag

  beforeEach(function() {
    $('body').append('<rg-raw content="<strong>Hello there</strong>"></rg-raw>')
    tag = riot.mount('rg-raw')[0]
  })

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })

  it('contains the supplied html', function() {
    $('rg-raw').html().should.be.equal('<strong>Hello there</strong>')
  })
})

describe('rg-time-ago', function() {
  let tag

  beforeEach(function() {
    $('body').append(`<rg-time-ago></rg-time-ago>`)
    tag = riot.mount('rg-time', { timestamp: moment.format() })[0]
  })

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })

  it('displays correct first time', function() {
    $('rg-time-ago').text().should.contain("ago")
  })
})

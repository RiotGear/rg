describe.only('rg-time-ago', function() {
  let tag

  beforeEach(function() {
    $('body').append(`<rg-time-ago></rg-time-ago>`)
    tag = riot.mount('rg-time-ago', { timestamp: moment().format() })[0]
  })

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })

  it('displays some caption when given proper timestamp', function() {
    $('rg-time-ago').text().should.contain("a few seconds ago")
  })

  it('displays no caption when not given a timestamp', function() {
    tag.unmount()
    tag = riot.mount('rg-time-ago', { })[0]
    $('rg-time-ago').text().should.eq('')
  })

  it('displays nothing when timestamp is in the future', function() {
    tag.unmount()
    tag = riot.mount('rg-time-ago', { timestamp: moment().add(1, 'days').format() })[0]
    $('rg-time-ago').text().should.eq('')
  })
})

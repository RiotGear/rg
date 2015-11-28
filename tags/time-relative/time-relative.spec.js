describe('rg-time-relative', function() {
  let tag

  beforeEach(function() {
    $('body').append(`<rg-time-relative></rg-time-relative>`)
  })

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag = riot.mount('rg-time-relative', { timestamp: moment().format() })[0]
    tag.isMounted.should.be.true
  })

  it('displays some caption when given proper timestamp', function() {
    tag = riot.mount('rg-time-relative', { timestamp: moment().format() })[0]
    $('rg-time-relative').text().should.contain("a few seconds ago")
  })

  it('displays no caption when not given a timestamp', function() {
    tag = riot.mount('rg-time-relative', { })[0]
    $('rg-time-relative').text().should.eq('')
  })

  it('displays nothing when timestamp is in the future', function() {
    tag = riot.mount('rg-time-relative', { timestamp: moment().add(1, 'days').format() })[0]
    $('rg-time-relative').text().should.eq('in a day')
  })

  it('handles malformed time stamp', function() {
    tag = riot.mount('rg-time-relative', { timestamp: "this is NOT a time stamp" })[0]
    $('rg-time-relative').text().should.eq('')
    tag = riot.mount('rg-time-relative', { timestamp: ".!|?~!@#$%" })[0]
    $('rg-time-relative').text().should.eq('')
  })

  it('accepts a refreshRate attribute', function() {
    tag = riot.mount('rg-time-relative', {
      timestamp: moment().format(),
      refreshRate: 5000
    })[0]
    tag.opts.refreshRate.should.eq(5000)
  })

  it('refreshRate attribute actually makes refreshes happen at the right time', function() {
    tag = riot.mount('rg-time-relative', {
      timestamp: moment().format(),
      refreshRate: 5000
    })[0]

    console.log($('rg-time-relative').text())

    var clock = sinon.useFakeTimers();
    clock.tick(5001)

    console.log($('rg-time-relative').text())
    clock.restore();

    $('rg-time-relative').text().should.eq('')
  })
})

describe('rg-time', function() {
  let tag, time
  let spy = sinon.spy()

  beforeEach(function() {
    time = new RgTime({
      ampm: true,
      step: 15,
      min: "00:00",
      max: "23:59"
    })
    $('body').append(`<rg-time></rg-time>`)
    tag = riot.mount('rg-time', { time })[0]
  })

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })

  it('displays correct first time', function() {
    $('rg-time .item:first-child').text().should.contain(moment().format('h:mm a'))
  })

  it('displays correct step', function() {
    $('rg-time .item:nth-child(1)').text().should.contain(moment().format('h:mm a'))
    $('rg-time .item:nth-child(2)').text().should.contain(moment().add(15, 'minutes').format('h:mm a'))
  })
})

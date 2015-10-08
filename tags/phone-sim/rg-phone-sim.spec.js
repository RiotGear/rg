describe('rg-phone-sim', function() {
  let tag, phonesim

  beforeEach(function() {
    phonesim = new RgPhoneSim({ src: 'http://riotjs.com/'})
    $('body').append('<rg-phone-sim></rg-phone-sim>')
    tag = riot.mount('rg-phone-sim', { phonesim })[0]
  })

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })

  it('has an iframe in an emulator', function() {
    $('rg-phone-sim .emulator iframe').length.should.be.equal(1)
  })

  it('iframe is pointed to src attribute', function() {
    $('rg-phone-sim iframe').attr('src').should.equal('http://riotjs.com/')
  })
})

describe('rg-phone-sim', function() {
  let tag, phonesim

  beforeEach(function() {
    $('body').append('<rg-phone-sim></rg-phone-sim>')
    tag = riot.mount('rg-phone-sim', {
      phonesim: {
        url: 'http://riotjs.com/'
      }
    })[0]
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

  it('iframe is pointed to url attribute', function() {
    $('rg-phone-sim iframe').attr('src').should.equal('http://riotjs.com/')
  })
})

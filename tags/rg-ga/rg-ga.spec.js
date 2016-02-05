describe('rg-ga', function() {
  let tag

  beforeEach(function() {
    window.ga = sinon.spy()
    $('body').append('<rg-ga property="a1b2c3d4"></rg-ga>')
    tag = riot.mount('rg-ga')[0]
  })

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })

  it('ga should have been called twice', function () {
    window.ga.should.have.been.calledTwice
    window.ga.should.have.been.calledWith('create', 'a1b2c3d4', 'auto')
    window.ga.should.have.been.calledWith('send', 'pageview')
  })
})

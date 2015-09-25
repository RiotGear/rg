describe('rg-toast', function() {
  let tag, onClickSpy, onCloseSpy

  beforeEach(function() {
    onClickSpy = sinon.spy()
    onCloseSpy = sinon.spy()
    $('body').append('<rg-toast></rg-toast>')
    tag = riot.mount('rg-toast', {
      toasts: [{
        text: 'Auto disappear',
        timeout: 500
      }, {
        text: 'Sticky toast',
        sticky: true
      }]
    })[0]
  })

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })

  it('onclose not called after timeout', function(done) {
    setTimeout(function() {
      $('rg-toast .toast.visible').length.should.equal(1)
      onCloseSpy.should.not.have.been.called
      done()
    }, 501)
  })

  it('onclick and onclose not called on click', function() {
    $('rg-toast .toast.visible:nth-child(3)').click()
    onClickSpy.should.not.have.been.calledOnce
    onCloseSpy.should.not.have.been.calledOnce
  })
})

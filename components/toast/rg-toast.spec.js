describe('rg-toast', function() {
  let tag, onClickSpy, onCloseSpy

  beforeEach(function() {
    onClickSpy = sinon.spy()
    onCloseSpy = sinon.spy()
    $('body').append('<rg-toast></rg-toast>')
    tag = riot.mount('rg-toast', {
      position: 'bottomleft',
      toasts: [{
        text: 'Auto disappear',
        timeout: 500
      }, {
        text: 'Auto disappear call onclose',
        timeout: 1000,
        onclose: onCloseSpy
      }, {
        text: 'Sticky toast',
        sticky: true,
        onclick: onClickSpy,
        onclose: onCloseSpy
      }]
    })[0]
  })

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })

  it('position can be set', function() {
    tag.opts.position.should.equal('bottomleft')
  })

  it('has correct number of toasts', function() {
    $('rg-toast .toast.visible').length.should.equal(3)
    $('rg-toast .toast.visible').text().should.contain('Auto disappear')
    $('rg-toast .toast.visible').text().should.contain('Auto disappear call onclose')
    $('rg-toast .toast.visible').text().should.contain('Sticky toast')
  })

  it('disappears automatically after timeout with on close', function(done) {
    setTimeout(function() {
      $('rg-toast .toast.visible').length.should.equal(1)
      onCloseSpy.should.have.been.calledOnce
      done()
    }, 1001)
  })

  it('disappears on click', function() {
    $('rg-toast .toast.visible:first-child').click()
    $('rg-toast .toast.visible').length.should.equal(2)
  })

  it('called onclick and onclose on click', function() {
    $('rg-toast .toast.visible:nth-child(3)').click()
    onClickSpy.should.have.been.calledOnce
    onCloseSpy.should.have.been.calledOnce
  })
})

describe('rg-toast', function() {
  let tag, onClickSpy, onCloseSpy, toasts

  beforeEach(function() {
    onClickSpy = sinon.spy()
    onCloseSpy = sinon.spy()
    toasts = new RgToasts({
      position: 'bottomleft',
      toasts: [{
        content: 'Auto disappear',
        timeout: 500
      }, {
        content: 'Auto disappear call onclose',
        timeout: 1000,
        onclose: onCloseSpy
      }, {
        content: 'Sticky toast',
        sticky: true,
        onclick: onClickSpy,
        onclose: onCloseSpy
      }]
    })
    $('body').append('<rg-toast></rg-toast>')
    tag = riot.mount('rg-toast', {
      toasts
    })[0]
  })

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })

  it('position can be set', function() {
    tag.RgToasts.position.should.equal('bottomleft')
  })

  it('has correct number of toasts', function() {
    $('rg-toast .toast.isvisible').length.should.equal(3)
    $('rg-toast .toast.isvisible').text().should.contain('Auto disappear')
    $('rg-toast .toast.isvisible').text().should.contain('Auto disappear call onclose')
    $('rg-toast .toast.isvisible').text().should.contain('Sticky toast')
  })

  it('disappears automatically after timeout with on close', function(done) {
    setTimeout(function() {
      $('rg-toast .toast.isvisible').length.should.equal(1)
      onCloseSpy.should.have.been.calledOnce
      done()
    }, 1001)
  })

  it('disappears on click', function() {
    $('rg-toast .toast.isvisible:first-child').click()
    $('rg-toast .toast.isvisible').length.should.equal(2)
  })

  it('called onclick and onclose on click', function() {
    $('rg-toast .toast.isvisible:nth-child(3)').click()
    onClickSpy.should.have.been.calledOnce
    onCloseSpy.should.have.been.calledOnce
  })
})

describe('rg-toast no position', function() {
  let tag, toasts

  beforeEach(function() {
    toasts = new RgToasts({
      toasts: [{
        content: 'Auto disappear',
        timeout: 500
      }]
    })
    $('body').append('<rg-toast></rg-toast>')
    tag = riot.mount('rg-toast', {
      toasts
    })[0]
  })

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })

  it('position is defaulted', function() {
    tag.RgToasts.position.should.equal('topright')
  })
})

describe('rg-toast no events', function() {
  let tag, onClickSpy, onCloseSpy, toasts

  beforeEach(function() {
    toasts = new RgToasts({
      toasts: [{
        content: 'Auto disappear',
        timeout: 500
      }, {
        content: 'Sticky toast',
        sticky: true
      }]
    })
    onClickSpy = sinon.spy()
    onCloseSpy = sinon.spy()
    $('body').append('<rg-toast></rg-toast>')
    tag = riot.mount('rg-toast', {
      toasts
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
      $('rg-toast .toast.isvisible').length.should.equal(1)
      onCloseSpy.should.not.have.been.called
      done()
    }, 501)
  })

  it('onclick and onclose not called on click', function() {
    $('rg-toast .toast.isvisible:nth-child(3)').click()
    onClickSpy.should.not.have.been.calledOnce
    onCloseSpy.should.not.have.been.calledOnce
  })
})

describe('rg-alert', function() {
  let tag, oncloseSpy
  const seconds = 500

  beforeEach(function() {
    oncloseSpy = sinon.spy()
    $('body').append('<rg-alert></rg-alert>')
    tag = riot.mount('rg-alert', {
      alerts: [{
        type: 'danger',
        content: 'Danger! Something bad happened.',
        dismissable: true,
        onclose: oncloseSpy
      }, {
        type: 'warning',
        content: 'Warning! Something sort of bad happened.',
        dismissable: false
      }, {
        type: 'information',
        content: 'Look! Something you should know about.',
        timeout: seconds
      }, {
        type: 'success',
        content: 'Success! Well done.',
        timeout: seconds,
        onclose: oncloseSpy
      }]
    })[0]
  })

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })

  it('displays correct number of alerts', function() {
    $('rg-alert .alert').length.should.equal(4)
  })

  it('displays correct type of alerts', function() {
    $('rg-alert .alert:nth-child(1)').is('.danger').should.be.true
    $('rg-alert .alert:nth-child(2)').is('.warning').should.be.true
    $('rg-alert .alert:nth-child(3)').is('.information').should.be.true
    $('rg-alert .alert:nth-child(4)').is('.success').should.be.true
  })

  it('can be dismissed', function() {
    $('rg-alert .alert:nth-child(3)').find('.close').click()
    $('rg-alert .alert').length.should.equal(4)
    $('rg-alert .alert.visible').length.should.equal(3)
  })

  it('can not be dismissed if set', function() {
    $('rg-alert .alert:nth-child(2)').find('.close').length.should.equal(0)
  })

  it('calls the onclose function when dismissed', function() {
    $('rg-alert .alert:nth-child(1)').find('.close').click()
    oncloseSpy.should.have.been.calledOnce
  })

  it('disappears after timer runs down', function(done) {
    setTimeout(function() {
      $('rg-alert .alert').length.should.equal(4)
      $('rg-alert .alert.visible').length.should.equal(2)
      done()
    }, seconds)
  })

  it('calls the onclose function when automatically dismissed', function(done) {
    setTimeout(function() {
      oncloseSpy.should.have.been.calledOnce
      done()
    }, seconds)
  })
})

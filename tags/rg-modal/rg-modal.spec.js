describe('rg-modal', function() {
  let tag
  let spyOnClose = sinon.spy()
  let spyOnClick = sinon.spy()
  let modal = {
    heading: 'Modal heading',
    isvisible: true,
    ghost: true,
    dismissable: false,
    buttons: [{
      action: spyOnClick,
      text: 'Save'
    }, {
      text: 'Cancel',
      style: 'color: cornflowerblue;'
    }]
  }

  beforeEach(function() {
    $('body').append('<rg-modal>This is the <strong>body</strong></rg-modal>')
    tag = riot.mount('rg-modal', { modal })[0]
    tag.on('close', spyOnClose)
  })

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })

  it('has correct heading', function() {
    $('rg-modal .heading').text().should.equal(modal.heading)
  })

  it('has the correct body', function() {
    $('rg-modal .modal__body').html().should.contain('This is the <strong>body</strong>')
  })

  it('can be a ghost modal', function() {
    $('rg-modal .modal').is('.modal--ghost').should.be.true
  })

  it('close button can be turned off', function() {
    $('rg-modal .button--close').length.should.equal(0)
  })

  it('has a footer with two buttons', function() {
    $('rg-modal .modal__footer button').length.should.equal(2)
    $('rg-modal .modal__footer button:nth-child(1)').text().should.contain(modal.buttons[0].text)
    $('rg-modal .modal__footer button:nth-child(2)').text().should.contain(modal.buttons[1].text)
  })

  it('buttons can be styled', function() {
    $('rg-modal .modal__footer button:nth-child(2)').css('color').should.equal('rgb(100, 149, 237)')
  })

  it('calls the action on button click', function() {
    spyOnClick.reset()
    $('rg-modal .modal__footer button:nth-child(1)').click()
    spyOnClick.should.have.been.calledOnce
  })

  it('click the close button calls the onclose callback', function() {
    spyOnClose.reset()
    modal.dismissable = true
    riot.update()
    $('rg-modal .button--close').click()
    $('rg-modal .modal').length.should.equal(0)
    spyOnClose.should.have.been.calledOnce
  })
})

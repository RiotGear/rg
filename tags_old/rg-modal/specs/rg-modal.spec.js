describe('rg-modal', function() {
  let tag
  let spyOnClose = sinon.spy()
  let spyOnClick = sinon.spy()
  let modal = new rg.Modal({
    heading: 'Modal heading',
    isvisible: true,
    ghost: true,
    dismissable: false,
    buttons: [{
      action: spyOnClick,
      content: 'Save'
    }, {
      content: 'Cancel',
      style: 'color: cornflowerblue;'
    }]
  }).on('close', spyOnClose)

  beforeEach(function() {
    $('body').append('<rg-modal>This is the <strong>body</strong></rg-modal>')
    tag = riot.mount('rg-modal', { modal })[0]
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
    $('rg-modal .body').html().should.contain('This is the <strong>body</strong>')
  })

  it('can be a ghost modal', function() {
    $('rg-modal .overlay').is('.ghost').should.be.true
    $('rg-modal .modal').is('.ghost').should.be.true
  })

  it('close button can be turned off', function() {
    $('rg-modal .close').length.should.equal(0)
  })

  it('has a footer with two buttons', function() {
    $('rg-modal .footer button').length.should.equal(2)
    $('rg-modal .footer button:nth-child(1)').text().should.contain(modal.buttons[0].content)
    $('rg-modal .footer button:nth-child(2)').text().should.contain(modal.buttons[1].content)
  })

  it('buttons can be styled', function() {
    $('rg-modal .footer button:nth-child(2)').css('color').should.equal('rgb(100, 149, 237)')
  })

  it('calls the action on button click', function() {
    spyOnClick.reset()
    $('rg-modal .footer button:nth-child(1)').click()
    spyOnClick.should.have.been.calledOnce
  })

  it('click the close button calls the onclose callback', function() {
    spyOnClose.reset()
    modal.dismissable = true
    modal.update()
    $('rg-modal .close').click()
    $('rg-modal .modal.isvisible').length.should.equal(0)
    spyOnClose.should.have.been.calledOnce
  })

  it('clicking the overlay calls the onclose callback', function() {
    spyOnClose.reset()
    $('rg-modal .overlay').click()
    $('rg-modal .modal.isvisible').length.should.equal(0)
    spyOnClose.should.have.been.calledOnce
  })
})

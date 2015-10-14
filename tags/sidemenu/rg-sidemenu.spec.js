describe('rg-sidemenu', function() {
  let tag, sidemenu
  let spy = sinon.spy()

  beforeEach(function() {
    $('body').append('<rg-sidemenu></rg-sidemenu>')
    sidemenu = new RgSidemenu({
      header: 'Side Menu',
      isvisible: true,
      onselect: function() { sidemenu.isvisible = false },
      items: [{
        content: 'Item 1',
        action: spy
      }, {
        content: 'Item 2'
      }]
    })
    tag = riot.mount('rg-sidemenu', sidemenu)[0]
  })

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })

  it('has an overlay', function() {
    $('rg-sidemenu .overlay').is('.visible').should.be.true
    $('rg-sidemenu .sidemenu').is('.visible').should.be.true
  })

  it('header is set correctly', function() {
    $('rg-sidemenu .header').text().should.contain('Side Menu')
  })

  it('has items', function() {
    $('rg-sidemenu .item').length.should.equal(2)
    $('rg-sidemenu .item:nth-child(1)').text().should.contain('Item 1')
    $('rg-sidemenu .item:nth-child(2)').text().should.contain('Item 2')
  })

  it('clicking an item activates it', function() {
    $('rg-sidemenu .item:nth-child(1)').is('.active').should.be.false
    $('rg-sidemenu .item:nth-child(2)').is('.active').should.be.false
    $('rg-sidemenu .item:nth-child(1)').click()
    $('rg-sidemenu .item:nth-child(1)').is('.active').should.be.true
    $('rg-sidemenu .item:nth-child(2)').is('.active').should.be.false
    $('rg-sidemenu .item:nth-child(2)').click()
    $('rg-sidemenu .item:nth-child(1)').is('.active').should.be.false
    $('rg-sidemenu .item:nth-child(2)').is('.active').should.be.true
  })

  it('clicking an item calls the action', function() {
    spy.reset()
    $('rg-sidemenu .item:nth-child(1)').click()
    spy.should.have.been.calledOnce
  })

  it('clicking overlay calls onclose', function() {
    $('rg-sidemenu .overlay').click()
    $('rg-sidemenu .overlay').is('.visible').should.be.false
    $('rg-sidemenu .sidemenu').is('.visible').should.be.false
  })
})

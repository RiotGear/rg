describe('rg-drawer', function() {
  let tag, drawer
  let spy = sinon.spy()

  beforeEach(function() {
    $('body').append('<rg-drawer></rg-drawer>')
    drawer = new RgDrawer({
      header: 'Side Menu',
      isvisible: true,
      onselect: function() { drawer.isvisible = false },
      items: [{
        content: 'Item 1',
        action: spy
      }, {
        content: 'Item 2'
      }]
    })
    tag = riot.mount('rg-drawer', drawer)[0]
  })

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })

  it('has an overlay', function() {
    $('rg-drawer .overlay').is('.visible').should.be.true
    $('rg-drawer .drawer').is('.visible').should.be.true
  })

  it('header is set correctly', function() {
    $('rg-drawer .header').text().should.contain('Side Menu')
  })

  it('has items', function() {
    $('rg-drawer .item').length.should.equal(2)
    $('rg-drawer .item:nth-child(1)').text().should.contain('Item 1')
    $('rg-drawer .item:nth-child(2)').text().should.contain('Item 2')
  })

  it('clicking an item activates it', function() {
    $('rg-drawer .item:nth-child(1)').is('.active').should.be.false
    $('rg-drawer .item:nth-child(2)').is('.active').should.be.false
    $('rg-drawer .item:nth-child(1)').click()
    $('rg-drawer .item:nth-child(1)').is('.active').should.be.true
    $('rg-drawer .item:nth-child(2)').is('.active').should.be.false
    $('rg-drawer .item:nth-child(2)').click()
    $('rg-drawer .item:nth-child(1)').is('.active').should.be.false
    $('rg-drawer .item:nth-child(2)').is('.active').should.be.true
  })

  it('clicking an item calls the action', function() {
    spy.reset()
    $('rg-drawer .item:nth-child(1)').click()
    spy.should.have.been.calledOnce
  })

  it('clicking overlay calls onclose', function() {
    $('rg-drawer .overlay').click()
    $('rg-drawer .overlay').is('.visible').should.be.false
    $('rg-drawer .drawer').is('.visible').should.be.false
  })
})

describe('rg-tabs', function() {
  let tag, tabs
  let spy = sinon.spy()

  beforeEach(function() {
    tabs = new RgTabs({
      onopen: spy,
      tabs: [{
        heading: 'Tab <em>one</em>',
        content: 'This is tab one'
      }, {
        heading: 'Tab two',
        content: 'This is tab two',
        active: true
      }, {
        heading: 'Disabled tab',
        disabled: true
      }, {
        heading: 'Tab three',
        content: 'This is tab three content',
        include: new RgInclude({
          url: 'tab.html',
          unsafe: true
        })
      }]
    })
    $('body').append('<rg-tabs></rg-tabs>')
    tag = riot.mount('rg-tabs', {
      tabs
    })[0]
  })

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })

  it('has correct number of tabs', function() {
    $('rg-tabs .tab').length.should.equal(4)
  })

  it('can preset tab as active', function() {
    $('rg-tabs .header:nth-child(2)').is('.active').should.be.true
  })

  it('can disable tabs', function() {
    $('rg-tabs .header:nth-child(3)').is('.disabled').should.be.true
  })

  it('heading renders text', function() {
    $('rg-tabs .header:nth-child(2)').text().should.contain('Tab two')
    $('rg-tabs .header:nth-child(3)').text().should.contain('Disabled tab')
    $('rg-tabs .header:nth-child(4)').text().should.contain('Tab three')
  })

  it('heading renders html', function() {
    $('rg-tabs .header:nth-child(1)').html().should.contain('Tab <em>one</em>')
  })

  it('clicking header actives tab', function() {
    $('rg-tabs .header:nth-child(4)').click()
    $('rg-tabs .header:nth-child(1)').is('.active').should.be.false
    $('rg-tabs .header:nth-child(2)').is('.active').should.be.false
  })

  it('tab is body is rendered', function() {
    $('rg-tabs .tab.active').html().should.contain('This is tab two')
  })

  it('clicking disabled tab does nothing', function() {
    $('rg-tabs .header:nth-child(3)').click()
    $('rg-tabs .header:nth-child(2)').is('.active').should.be.true
  })

  it('onopen callback is called on tab click', function() {
    $('rg-tabs .header:nth-child(2)').click()
    spy.should.have.been.called
  })
})

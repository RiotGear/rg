describe('rg-tabs', function() {
  let tag, tabs
  let spy = sinon.spy()

  beforeEach(function() {
    tabs = {
      tabs: [{
        heading: 'Tab one',
        text: 'This is tab one'
      }, {
        heading: 'Tab two',
        text: 'This is tab two',
        active: true
      }, {
        heading: 'Disabled tab',
        disabled: true
      }, {
        heading: 'Tab three',
        text: 'This is tab three content',
        include: 'tab.html'
      }]
    }
    $('body').append('<rg-tabs></rg-tabs>')
    tag = riot.mount('rg-tabs', {
      tabs
    })[0]
    tag.on('open', spy)
  })

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })

  it('has correct number of tabs', function() {
    $('rg-tabs .tabs__tab').length.should.equal(4)
  })

  it('can preset tab as active', function() {
    $('rg-tabs .tab-heading:nth-child(2)').is('.tab-heading--active').should.be.true
  })

  it('can disable tabs', function() {
    $('rg-tabs .tab-heading:nth-child(3)').is('.tab-heading--disabled').should.be.true
  })

  it('heading renders text', function() {
    $('rg-tabs .tab-heading:nth-child(2)').text().should.contain('Tab two')
    $('rg-tabs .tab-heading:nth-child(3)').text().should.contain('Disabled tab')
    $('rg-tabs .tab-heading:nth-child(4)').text().should.contain('Tab three')
  })

  it('clicking header actives tab', function() {
    $('rg-tabs .tab-heading:nth-child(4)').click()
    $('rg-tabs .tab-heading:nth-child(1)').is('.tab-heading--active').should.be.false
    $('rg-tabs .tab-heading:nth-child(2)').is('.tab-heading--active').should.be.false
  })

  it('tab is body is rendered', function() {
    $('rg-tabs .tabs__tab--active').html().should.contain('This is tab two')
  })

  it('clicking disabled tab does nothing', function() {
    $('rg-tabs .tab-heading:nth-child(3)').click()
    $('rg-tabs .tab-heading:nth-child(2)').is('.tab-heading--active').should.be.true
  })

  it('onopen callback is called on tab click', function() {
    $('rg-tabs .tab-heading:nth-child(2)').click()
    spy.should.have.been.called
  })
})

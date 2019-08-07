describe('rg-tabs', function() {
  const default_opts = {
    tabs: {
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
        include: 'yay.html'
      }]
    }
  }

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted (no opts)', function() {
    tag = newTag('rg-tabs')
    tag.isMounted.should.be.true
  })

  it('has correct number of tabs', function() {
    tag = newTag('rg-tabs', default_opts)
    $('rg-tabs .tabs__tab').length.should.equal(4)
  })

  it('can preset tab as active', function() {
    tag = newTag('rg-tabs', default_opts)
    $('rg-tabs .tab-heading:nth-child(2)').is('.tab-heading--active').should.be.true
  })

  it('can disable tabs', function() {
    tag = newTag('rg-tabs', default_opts)
    $('rg-tabs .tab-heading:nth-child(3)').is('.tab-heading--disabled').should.be.true
  })

  it('heading renders text', function() {
    tag = newTag('rg-tabs', default_opts)
    $('rg-tabs .tab-heading:nth-child(2)').text().should.contain('Tab two')
    $('rg-tabs .tab-heading:nth-child(3)').text().should.contain('Disabled tab')
    $('rg-tabs .tab-heading:nth-child(4)').text().should.contain('Tab three')
  })

  it('clicking header actives tab', function() {
    tag = newTag('rg-tabs', default_opts)
    $('rg-tabs .tab-heading:nth-child(4)').click()
    $('rg-tabs .tab-heading:nth-child(1)').is('.tab-heading--active').should.be.false
    $('rg-tabs .tab-heading:nth-child(2)').is('.tab-heading--active').should.be.false
  })

  it('tab is body is rendered', function() {
    tag = newTag('rg-tabs', default_opts)
    $('rg-tabs .tabs__tab--active').html().should.contain('This is tab two')
  })

  it('clicking disabled tab does nothing', function() {
    tag = newTag('rg-tabs', default_opts)
    $('rg-tabs .tab-heading:nth-child(3)').click()
    $('rg-tabs .tab-heading:nth-child(2)').is('.tab-heading--active').should.be.true
  })

  it('onopen callback is called on tab click', function() {
    tag = newTag('rg-tabs', default_opts)
    const spy = sinon.spy()
    tag.on('open', spy)
    $('rg-tabs .tab-heading:nth-child(1)').click()
    spy.should.have.been.called
  })

  it('loads content from ajax via opts.tabs.url', function(done) {
    mockAjax()
    tag = newTag('rg-tabs', default_opts)
    $('rg-tabs .tab-heading:nth-child(4)').click()
    setTimeout(() => {
      tag.root.querySelector(".tabs__tab--active").innerText.should.equal('Yay!')
      done()
    },0)
    unmockAjax()
  })
})

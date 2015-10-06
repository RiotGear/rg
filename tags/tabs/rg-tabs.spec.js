describe('rg-tabs', function() {
  let tag
  let spy = sinon.spy()

  beforeEach(function() {
    $('body').append(`<rg-tabs>
                        <rg-tab>
                          <rg-tab-heading>Tab <em>One</em></rg-tab-heading>
                          The first tab content
                        </rg-tab>

                        <rg-tab heading="Tab 2" active="true">
                          Tab two
                        </rg-tab>

                        <rg-tab heading="Tab 3">
                          Tab three
                        </rg-tab>

                        <rg-tab heading="Tab 4" disabled="true">
                          Tab four
                        </rg-tab>

                        <rg-tab heading="Tab 5">
                          Tab five
                        </rg-tab>
                      </rg-tabs>`)
    tag = riot.mount('rg-tabs', {
      onopen: spy
    })[0]
  })

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })

  it('has correct number of tabs', function() {
    $('rg-tab .tab').length.should.equal(5)
  })

  it('can preset tab as active', function() {
    $('rg-tabs .header:nth-child(2)').is('.active').should.be.true
    $('rg-tab[heading="Tab 2"] .tab').is(':visible').should.be.true
  })

  it('can disable tabs', function() {
    $('rg-tabs .header:nth-child(4)').is('.disabled').should.be.true
  })

  it('heading renders text', function() {
    $('rg-tabs .header:nth-child(2)').text().should.contain('Tab 2')
    $('rg-tabs .header:nth-child(3)').text().should.contain('Tab 3')
    $('rg-tabs .header:nth-child(4)').text().should.contain('Tab 4')
    $('rg-tabs .header:nth-child(5)').text().should.contain('Tab 5')
  })

  it('heading renders html', function() {
    $('rg-tabs .header:nth-child(1)').html().should.contain('Tab <em>One</em>')
  })

  it('clicking header actives tab', function() {
    $('rg-tabs .header:nth-child(3)').click()
    $('rg-tabs .header:nth-child(2)').is('.active').should.be.false
    $('rg-tabs .header:nth-child(3)').is('.active').should.be.true
    $('rg-tab[heading="Tab 2"] .tab').is(':visible').should.be.false
    $('rg-tab[heading="Tab 3"] .tab').is(':visible').should.be.true
  })

  it('tab is body is rendered', function() {
    $('rg-tab[heading="Tab 2"] .tab').html().should.contain('Tab two')
  })

  it('clicking disabled tab does nothing', function() {
    $('rg-tabs .header:nth-child(4)').click()
    $('rg-tabs .header:nth-child(2)').is('.active').should.be.true
    $('rg-tab[heading="Tab 2"] .tab').is(':visible').should.be.true
  })

  it('onopen callback is called on tab click', function() {
    $('rg-tabs .header:nth-child(3)').click()
    spy.should.have.been.called
  })

  it('onopen callback is called on tab click', function() {
    spy.reset()
    delete tag.onopen
    tag.update()
    $('rg-tabs .header:nth-child(3)').click()
    spy.should.not.have.been.called
  })
})

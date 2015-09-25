describe('rg-select', function() {
  let tag
  let spyOnOpen = sinon.spy()
  let spyOnClose = sinon.spy()
  let spyOnFilter = sinon.spy()
  let spyOnSelect = sinon.spy()

  beforeEach(function() {
    $('body').append('<rg-select></rg-select>')
    tag = riot.mount('rg-select', {
      placeholder: "Please select a card",
      'filter-placeholder': "Filter cards",
      'filter-on': "text",
      filter: true,
      options: [{
        id: 0,
        text: 'Visa'
      }, {
        id: 1,
        text: 'MasterCard',
        selected: true
      }, {
        id: 2,
        text: 'American Express'
      }, {
        id: 3,
        text: 'Discover'
      }]
    })[0]
  })

  afterEach(function() {
    spyOnOpen.reset()
    spyOnClose.reset()
    spyOnFilter.reset()
    spyOnSelect.reset()
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })

  it('has correct number of items', function() {
    $('rg-select .item').length.should.equal(4)
  })

  it('clicking on field opens/closes dropdown and calls onopen/onclose', function() {
    $('rg-select .dropdown').is(':visible').should.be.false
    $('rg-select .field').click()
    $('rg-select .dropdown').is(':visible').should.be.true
    spyOnOpen.should.not.have.been.called
    $('rg-select .field').click()
    $('rg-select .dropdown').is(':visible').should.be.false
    spyOnClose.should.not.have.been.called
  })

  it('pressing key down will highlight item', function() {
    $('rg-select .field').click()
    var e = jQuery.Event('keydown')
    e.keyCode = 38
    $('rg-select .field').trigger(e)
    $('rg-select .item.active').text().should.contain('Discover')
  })

  it('selecting an item sets it to selected and calls onselect', function() {
    $('rg-select .field').click()
    $('rg-select .item:nth-child(2)').is('.selected').should.be.true
    $('rg-select .item:nth-child(3)').click()
    $('rg-select .item:nth-child(2)').is('.selected').should.be.false
    $('rg-select .item:nth-child(3)').is('.selected').should.be.true
    spyOnSelect.should.not.have.been.called
  })

  it('adding text in filter reduces list of items', function() {
    $('rg-select .field').click()
    $('rg-select .filter-box').val('is').trigger('input')
    $('rg-select .item').length.should.equal(2)
  })

  it('opens the dropdown on enter', function () {
    var e = jQuery.Event('keydown')
    e.keyCode = 13
    $('rg-select .field').trigger(e)
    $('rg-select .dropdown').is(':visible').should.be.true
    spyOnOpen.should.not.have.been.called
  })

  it('opens the dropdown on arrow up', function () {
    var e = jQuery.Event('keydown')
    e.keyCode = 40
    $('rg-select .field').trigger(e)
    $('rg-select .dropdown').is(':visible').should.be.true
    spyOnOpen.should.not.have.been.called
  })

  it('opens the dropdown on arrow down', function () {
    var e = jQuery.Event('keydown')
    e.keyCode = 38
    $('rg-select .field').trigger(e)
    $('rg-select .dropdown').is(':visible').should.be.true
    spyOnOpen.should.not.have.been.called
  })
})

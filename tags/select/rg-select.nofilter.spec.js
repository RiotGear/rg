describe('rg-select', function() {
  let tag

  beforeEach(function() {
    $('body').append('<rg-select></rg-select>')
    tag = riot.mount('rg-select', {
      placeholder: 'Please select a card',
      'filter-placeholder': 'Filter cards',
      'filter-on': 'text',
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
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })

  it('has no filter box', function() {
    $('rg-select .filter-box').length.should.equal(0)
  })
})

describe('rg-pagination', function() {
  let tag
  let spyOnPageChange = sinon.spy()
  let pagination = {
    pages: 100,
    page: 3
  }

  beforeEach(function() {
    $('body').append('<rg-pagination></rg-pagination')
    tag = riot.mount('rg-pagination', { pagination })[0]
    tag.on('page', spyOnPageChange)
  })

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })

  // Todo more tests
})

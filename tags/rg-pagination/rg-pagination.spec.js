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

  it('pages properly', function() {
    const assertCurrent = i => {
      tag.root.querySelector('.pagination__page--current').innerText.should.equal(i)
    }
    const getNavButtons = () => tag.root.querySelectorAll(".pagination__control")
    assertCurrent('3')
    getNavButtons()[1].click() // back one
    assertCurrent('2')
    getNavButtons()[2].click() // forward one
    assertCurrent('3')
    getNavButtons()[0].click() // start
    assertCurrent('1')
    getNavButtons()[3].click() // end
    assertCurrent('100')
  })
})

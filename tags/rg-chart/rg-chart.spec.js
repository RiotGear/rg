// not the most thorough test. It only verifies that the charts in the demo don't throw errors

describe('rg-chart', function () {
  $('body').append('<rg-chart></rg-chart>')
  it('is mounted', function () {
    const tag2 = newTag("rg-chart")
    tag2.isMounted.should.be.true
  })

  Object.keys(window._charts).forEach( key => {
    it('is mounted: '+key, function () {
      const tag = riot.mount("rg-chart", { chart: window._charts[key] })[0]
      tag.isMounted.should.be.true
    })
  })
})
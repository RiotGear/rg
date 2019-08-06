describe('rg-chart', function () {
  let tag, oncloseSpy
  const seconds = 500
  oncloseSpy = sinon.spy()
  $('body').append('<rg-chart></rg-chart>')
  //console.log(Object.keys(window._charts))
  console.log(0)

  it('is mounted', function () {
    tag = riot.mount("rg-chart",{chart: _charts.linechart})[0]
    tag.isMounted.should.be.true
  })
})
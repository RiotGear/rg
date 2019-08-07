const newTag = (tagName, opts) => {
  const element = document.createElement(tagName)
  document.body.appendChild(element)
  return window.riot.mount(element, opts)[0]
}

describe('rg-date', function () {
  let tag

  afterEach(function() {
    tag.unmount()
    window.BEES = false
  })

  it('no opts', function () {
    tag = newTag('rg-date')
    tag.isMounted.should.be.true

    const dayObj = tag.dayObj()
    dayObj.today.should.be.true
    dayObj.selected.should.be.true
    should.equal(dayObj.disabled || false, false)
  })

  it('June 20th, 1999', function() {
    tag = newTag('rg-date', {
      date: {
        date: '1999-06-20',
        min: '1999-01-01',
        max: '1999-12-31',
      }
    })

    const dayObj = tag.dayObj()
    dayObj.today.should.be.true
    dayObj.selected.should.be.false
    dayObj.disabled.should.be.true // note: this test will fail if run in 1999

    window.BEES = 1
    const day2 = tag.dayObj('1999-06-20')
    day2.selected.should.be.true
    day2.disabled.should.be.false
    tag.dayObj('1998-12-31').disabled.should.be.true
    tag.dayObj('2000-01-01').disabled.should.be.true
  })

  it('detect triggers', function() {
    tag = newTag('rg-date', { date: { date: '1999-06-20'}})
    const validate = triggerSpy(tag, ['open','close','select'])
    tag.root.querySelector('input').click()
    validate({ open: 1})
    tag.root.querySelector(".calendar__date:nth-child(30)").click()
    validate({ select: 1, close: 1})
  })

  it('other functions', function() {
    const f = "YYYY-MM-DD"
    tag = newTag('rg-date', { date: { date: "1999-06-20" } })
    tag.prevYear()
    tag.opts.date.date.format(f).should.equal("1998-06-20")
    tag.nextYear()
    tag.opts.date.date.format(f).should.equal("1999-06-20")
    tag.prevMonth()
    tag.opts.date.date.format(f).should.equal("1999-05-20")
    tag.nextMonth()
    tag.opts.date.date.format(f).should.equal("1999-06-20")
    tag.setToday()
    tag.opts.date.date.format(f).should.equal(moment().format(f))
  })
})

const triggerSpy = (tag, events) => {
  let last = {}
  const spies = {}
  events.forEach( e => {
    spies[e] = sinon.spy()
    tag.on(e, spies[e])
  })
  return (values) => {
    Object.assign(last,values)
    events.forEach(e => {
      spies[e].callCount.should.equal(last[e] || 0)
    })
  }
}
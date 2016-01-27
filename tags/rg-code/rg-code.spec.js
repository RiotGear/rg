describe('rg-code', function() {
  let tag, spy, editor

  beforeEach(function() {
    spy = sinon.spy()
    editor = {
      code: '<h2>Hello world!</h2>',
      theme: 'monokai',
      mode: 'javascript',
      tabsize: '2',
      softtabs: 'true',
      wordwrap: 'true',
      readonly: 'true',
      onchange: spy
    }
    $('body').append('<rg-code></rg-code>')
    tag = riot.mount('rg-code', {
      editor
    })[0]
  })

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
    spy.should.not.have.been.called
  })
})

describe('rg-code no opts', function() {
  let tag

  beforeEach(function() {

    $('body').append('<rg-code></rg-code>')
    tag = riot.mount('rg-code')[0]
  })

  after(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })
})
